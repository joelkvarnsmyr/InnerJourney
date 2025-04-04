import os
import re
import frontmatter
import google.generativeai as genai
import logging
import time
from pathlib import Path
import random
import yaml
import sys
from cryptography.fernet import Fernet

# Grundläggande konfiguration
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Konstanter
MODEL_NAME = "gemini-2.5-pro-exp-03-25"
MAX_CONTEXT_SIZE = 750000
API_TIMEOUT = 300
MAX_RETRIES = 3
RETRY_BACKOFF_FACTOR = 2

current_dir = os.path.dirname(os.path.abspath(__file__))
TAGS_FILE = Path("/home/joelkvarnsmyr/projects/innerjourney/docs/blog/tags.yml")
AUTHORS_FILE = Path("/home/joelkvarnsmyr/projects/innerjourney/docs/blog/authors.yml")
HOME_DIR = Path.home()
API_KEY_FILE = HOME_DIR / ".my_api_key"
ENCRYPTION_KEY_FILE = HOME_DIR / ".my_encryption_key"

# Funktioner för API-nyckelhantering
def generate_encryption_key():
    key = Fernet.generate_key()
    with open(ENCRYPTION_KEY_FILE, 'wb') as f:
        f.write(key)
    os.chmod(ENCRYPTION_KEY_FILE, 0o600)
    return key

def save_api_key(api_key, encryption_key):
    fernet = Fernet(encryption_key)
    encrypted_key = fernet.encrypt(api_key.encode())
    with open(API_KEY_FILE, 'wb') as f:
        f.write(encrypted_key)
    os.chmod(API_KEY_FILE, 0o600)

def load_api_key():
    if not ENCRYPTION_KEY_FILE.exists() or not API_KEY_FILE.exists():
        return None
    try:
        with open(ENCRYPTION_KEY_FILE, 'rb') as f:
            encryption_key = f.read()
        fernet = Fernet(encryption_key)
        with open(API_KEY_FILE, 'rb') as f:
            encrypted_key = f.read()
        return fernet.decrypt(encrypted_key).decode()
    except Exception:
        return None

def get_api_key():
    saved_key = load_api_key()
    if saved_key:
        print("Använder sparad API-nyckel.")
        return saved_key
    else:
        api_key = input("Ange din API-nyckel: ").strip()
        if not api_key:
            print("Ingen nyckel angiven. Avslutar.")
            sys.exit(1)
        save_choice = input("Vill du spara API-nyckeln för framtida användning? (ja/nej): ").strip().lower()
        if save_choice == "ja":
            encryption_key = generate_encryption_key()
            save_api_key(api_key, encryption_key)
            print("API-nyckeln har sparats säkert.")
        return api_key

# Funktion för att läsa taggar och författare
def load_tags_and_authors():
    tags = []
    authors = {}
    if TAGS_FILE.exists():
        try:
            with open(TAGS_FILE, 'r', encoding='utf-8') as f:
                tags_data = yaml.safe_load(f)
                if tags_data and isinstance(tags_data, dict):
                    tags = list(tags_data.keys())
        except Exception as e:
            logger.error(f"Kunde inte läsa taggar från '{TAGS_FILE}': {e}")
    if AUTHORS_FILE.exists():
        try:
            with open(AUTHORS_FILE, 'r', encoding='utf-8') as f:
                authors_data = yaml.safe_load(f)
                if authors_data and isinstance(authors_data, dict):
                    authors = authors_data
        except Exception as e:
            logger.error(f"Kunde inte läsa författare från '{AUTHORS_FILE}': {e}")
    return tags, authors

# Funktioner för översättning
def split_front_matter(content: str) -> tuple[str, str]:
    front_matter_pattern = r'^---\s*\n(.*?)\n---\s*\n'
    match = re.match(front_matter_pattern, content, re.DOTALL)
    if match:
        front_matter = match.group(1).strip()
        body = content[match.end():].strip()
        return front_matter, body
    return "", content.strip()

def translate_text(text: str, timeout=API_TIMEOUT) -> str:
    prompt = f"""
    **ROLL:** AI-assistent som är expert på att översätta text från svenska till engelska.
    **UPPDRAG:** Översätt följande text från svenska till engelska. Behåll strukturen och formateringen (t.ex. Markdown-syntax, rubriker, listor, kodblock), men översätt all text till korrekt och naturlig engelska. **Lägg inte till eller ta bort information, ändra bara språket.**
    **TEXT ATT ÖVERSÄTTA:**
    --- BEGIN TEXT ---
    {text}
    --- END TEXT ---
    **OUTPUT:**
    *   Returnera den översatta texten i samma format som indata.
    """
    for attempt in range(MAX_RETRIES):
        try:
            gemini_model = genai.GenerativeModel(MODEL_NAME)
            response = gemini_model.generate_content(prompt, request_options={"timeout": timeout})
            if response.parts:
                translated_text = response.text.strip()
                if translated_text.startswith("```markdown"):
                    translated_text = translated_text[len("```markdown"):].strip()
                if translated_text.endswith("```"):
                    translated_text = translated_text[:-len("```")].strip()
                logger.info(f"Översatte text ({len(text):,} tecken) till engelska.")
                return translated_text
            else:
                logger.warning(f"Gemini returnerade ingen översättning på försök {attempt + 1}.")
                if attempt < MAX_RETRIES - 1:
                    wait_time = (RETRY_BACKOFF_FACTOR ** attempt) * 5 + random.uniform(0, 1)
                    logger.info(f"Försöker igen om {wait_time:.2f} sekunder...")
                    time.sleep(wait_time)
        except Exception as e:
            logger.error(f"Fel vid översättning på försök {attempt + 1}: {e}")
            if attempt < MAX_RETRIES - 1:
                wait_time = (RETRY_BACKOFF_FACTOR ** attempt) * 5 + random.uniform(0, 1)
                logger.info(f"Försöker igen om {wait_time:.2f} sekunder...")
                time.sleep(wait_time)
            else:
                logger.error(f"Maximalt antal försök ({MAX_RETRIES}) uppnått. Ger upp.")
                return text
    return text

def translate_front_matter(front_matter: str, tags: list, authors: dict) -> str:
    try:
        front_matter_data = frontmatter.loads(front_matter)
        if not front_matter_data.metadata:
            return front_matter
        for key, value in front_matter_data.metadata.items():
            if isinstance(value, str) and key in ['title', 'description', 'sidebar_label']:
                front_matter_data[key] = translate_text(value)
        if 'tags' in front_matter_data.metadata:
            existing_tags = front_matter_data.metadata['tags']
            front_matter_data['tags'] = [tag for tag in existing_tags if tag in tags]
        if 'authors' in front_matter_data.metadata:
            existing_authors = front_matter_data.metadata['authors']
            if isinstance(existing_authors, list):
                front_matter_data['authors'] = [author for author in existing_authors if author in authors]
            elif isinstance(existing_authors, str):
                if existing_authors in authors:
                    front_matter_data['authors'] = existing_authors
                else:
                    front_matter_data['authors'] = 'joelkvarnsmyr'
        return frontmatter.dumps(front_matter_data)
    except Exception as e:
        logger.error(f"Fel vid översättning av front matter: {e}")
        return front_matter

def translate_and_save_document(source_path: Path, tags: list, authors: dict):
    try:
        source_content = source_path.read_text(encoding='utf-8')
    except Exception as e:
        logger.error(f"Kunde inte läsa filen '{source_path}': {e}")
        return
    if not source_content.strip():
        logger.warning(f"Filen {source_path} är tom. Hoppar över.")
        return
    front_matter, body = split_front_matter(source_content)
    if front_matter:
        translated_front_matter = translate_front_matter(front_matter, tags, authors)
    else:
        translated_front_matter = ""
    translated_body = translate_text(body)
    if translated_front_matter:
        translated_content = f"---\n{translated_front_matter}---\n{translated_body}"
    else:
        translated_content = translated_body
    target_path = source_path.with_name(f"{source_path.stem}_en.md")
    try:
        target_path.write_text(translated_content, encoding='utf-8')
        logger.info(f"Sparade översatt dokument: '{target_path}'")
    except Exception as e:
        logger.error(f"Kunde inte spara '{target_path}': {e}")

# Huvudfunktion
def main():
    api_key = get_api_key()
    genai.configure(api_key=api_key)
    tags, authors = load_tags_and_authors()
    files = list(Path(current_dir).rglob("*.md"))
    if not files:
        logger.warning(f"Inga .md-filer hittades i '{current_dir}'.")
        sys.exit(0)
    for file_path in files:
        if file_path.name.endswith("_en.md"):
            logger.info(f"Hoppar över redan översatt fil: '{file_path}'")
            continue
        translate_and_save_document(file_path, tags, authors)

if __name__ == "__main__":
    main()