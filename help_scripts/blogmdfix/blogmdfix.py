import os
import re
import frontmatter
import google.generativeai as genai
import logging
import time
from pathlib import Path
import random
import sys
from cryptography.fernet import Fernet

# --- Grundläggande Konfiguration ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# --- Konstanter ---
MODEL_NAME = "gemini-2.5-pro-exp-03-25"
MAX_CONTEXT_SIZE = 750000
API_TIMEOUT = 300
MAX_RETRIES = 3
RETRY_BACKOFF_FACTOR = 2

# Hämta den aktuella katalogen (där skriptet körs)
current_dir = os.path.dirname(os.path.abspath(__file__))

# Sökväg till styrdokumenten
STYRDOKUMENT_DIR = Path("/home/joelkvarnsmyr/projects/innerjourney/docs/help_scripts/X_styrdokument")

# Sökvägar för API-nyckel och krypteringsnyckel
HOME_DIR = Path.home()
API_KEY_FILE = HOME_DIR / ".my_api_key"
ENCRYPTION_KEY_FILE = HOME_DIR / ".my_encryption_key"


# --- Funktioner för API-nyckelhantering ---
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


# --- Funktion: Läs in styrdokument ---
def load_styrdokument():
    if not STYRDOKUMENT_DIR.exists():
        logger.warning(f"Styrdokumentmappen '{STYRDOKUMENT_DIR}' hittades inte.")
        return "Inga styrdokument tillgängliga."
    styrdokument_content = []
    for styrdokument_file in STYRDOKUMENT_DIR.glob("*.md"):
        try:
            content = styrdokument_file.read_text(encoding='utf-8')
            styrdokument_content.append(f"**Styrdokument: {styrdokument_file.name}**\n{content}\n")
        except Exception as e:
            logger.error(f"Kunde inte läsa styrdokument '{styrdokument_file}': {e}")
    if not styrdokument_content:
        return "Inga styrdokument tillgängliga."
    return "\n".join(styrdokument_content)


# --- Funktion: Separera front matter från innehåll ---
def split_front_matter(content: str) -> tuple[str, str]:
    front_matter_pattern = r'^---\s*\n(.*?)\n---\s*\n'
    match = re.match(front_matter_pattern, content, re.DOTALL)
    if match:
        front_matter = match.group(1).strip()
        body = content[match.end():].strip()
        return front_matter, body
    return "", content.strip()


# --- Funktion: Hämta den första rubriken från dokumentet ---
def get_first_heading(content):
    match = re.search(r'^# (.*?)$', content, re.MULTILINE)
    return match.group(1).strip() if match else None


# --- Funktion: Ta bort "Inner Journey" från titlar ---
def remove_inner_journey(text: str) -> str:
    inner_journey_variants = [
        "inner journey", "Inner Journey", "innerjourney",
        "InnerJourney", "inner-journey", "Inner-Journey"
    ]
    result = text
    for variant in inner_journey_variants:
        result = re.sub(r'\b' + re.escape(variant) + r'\b', '', result, flags=re.IGNORECASE)
    result = re.sub(r'\b(för|for)\b', '', result, flags=re.IGNORECASE)
    return re.sub(r'\s+', ' ', result).strip()


# --- Funktion: Konvertera titel till en slug ---
def title_to_slug(title):
    slug = re.sub(r'[^a-zA-Z0-9\s-]', '', title)
    slug = slug.lower()
    slug = re.sub(r'\s+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    return slug.strip('-')


# --- Funktion: Generera ny titel med Gemini ---
def generate_new_title(original_title: str, timeout=API_TIMEOUT):
    prompt = f"""
**ROLL:** AI-assistent som är expert på att skapa engagerande och SEO-vänliga titlar för blogginlägg.
**UPPDRAG:** Skapa en ny titel baserat på den befintliga titeln nedan. Följ dessa riktlinjer:
- Håll titeln kort och fokuserad, under 60 tecken (inklusive mellanslag och tecken).
- Använd starka nyckelord som är relevanta för självutveckling, mental hälsa, AI, eller finansiering.
- Skapa nyfikenhet eller en känsla av värde för läsaren (t.ex. "Hur Gör Vi X?" eller "Upptäck X").
- Ta bort onödiga ord som "en", "och", "på" om möjligt.
- Ta bort "Inner Journey" (eller varianter som "inner journey", "InnerJourney") från titeln.
- Om titeln innehåller specialtecken (som Å, Ä, Ö), behåll dem men se till att titeln är läsbar.
**BEFINTLIG TITEL:** "{original_title}"
**OUTPUT:** Returnera den nya titeln som en sträng.
"""
    for attempt in range(MAX_RETRIES):
        try:
            gemini_model = genai.GenerativeModel(MODEL_NAME)
            response = gemini_model.generate_content(prompt, request_options={"timeout": timeout})
            if response.parts:
                new_title = response.text.strip().strip('"').strip("'").strip('`')
                logger.info(f"Genererade ny titel: '{new_title}' från '{original_title}'")
                return new_title
            else:
                logger.warning(f"Gemini returnerade ingen titel på försök {attempt + 1}.")
                time.sleep((RETRY_BACKOFF_FACTOR ** attempt) * 5 + random.uniform(0, 1))
        except Exception as e:
            logger.error(f"Fel vid titelgenerering på försök {attempt + 1}: {e}")
            if attempt == MAX_RETRIES - 1:
                return original_title
            time.sleep((RETRY_BACKOFF_FACTOR ** attempt) * 5 + random.uniform(0, 1))
    return original_title


# --- Funktion: Generera reformaterad Markdown med Gemini ---
def generate_reformatted_markdown(source_markdown: str, file_path: Path, timeout=API_TIMEOUT):
    if not source_markdown.strip():
        logger.warning(f"Filen {file_path} är tom. Hoppar över.")
        return None
    existing_front_matter, body_content = split_front_matter(source_markdown)
    date_match = re.match(r'(\d{4}-\d{2}-\d{2})', file_path.name)
    date = date_match.group(1) if date_match else "2025-01-01"
    original_title = get_first_heading(body_content) or file_path.stem
    new_title = generate_new_title(original_title)
    new_title = remove_inner_journey(new_title)
    new_slug = title_to_slug(new_title)
    styrdokument_content = load_styrdokument()

    front_matter_requirements = f"""
*   Generera en YAML-front matter (--- ... ---) med följande Docusaurus-nycklar för ett blogginlägg:
    - `title`: Sätt till den nya titeln: "{new_title}". Om titeln innehåller specialtecken, omge med dubbla citattecken (").
    - `description`: En kort sammanfattning (1-2 meningar) av innehållet. Om beskrivningen innehåller specialtecken, omge med dubbla citattecken.
    - `slug`: Använd den nya titeln för en logisk URL: "{new_slug}".
    - `authors`: Sätt till "joelkvarnsmyr" som standard.
    - `date`: Sätt till "{date}" (datumet från filnamnet eller standard).
    - `tags`: Förslag på 2-5 relevanta taggar baserat på innehållet.
"""
    format_requirements = """
**FORMATKRAV FÖR INNEHÅLL:**
*   Använd en tydlig H1-rubrik (# Titel). Sätt H1-rubriken till den nya titeln: "{new_title}".
*   Använd H2 (##) och H3 (###) logiskt för att skapa en hierarki.
*   Använd punktlistor (-) och numrerade listor (1.) korrekt.
*   Se till att kodblock (```språk ... ```) är korrekt formaterade.
*   Använd `inline-kod` konsekvent för filnamn, variabler, kommandon etc.
*   Förbättra styckesindelning för bättre läsflöde.
*   Lägg till emojis för att framhäva viktiga punkter, men håll det balanserat.
"""
    full_prompt = f"""
**ROLL:** AI-assistent som är expert på att strukturera blogginlägg i Markdown för Docusaurus.
**UPPDRAG:** Ta följande innehåll och formatera om det till korrekt Markdown för ett blogginlägg. **Behåll allt ursprungligt innehåll och dess innebörd**, men förbättra rubriker, listor, kodblock och styckesindelning. **Lägg till emojis på lämpliga ställen, men överdriv inte.** **Generera en komplett Docusaurus-kompatibel front matter.**
**STYRDOKUMENT:**
--- BEGIN STYRDOKUMENT ---
{styrdokument_content}
--- END STYRDOKUMENT ---
**URSPRUNGLIGT INNEHÅLL (Från fil: {file_path.name}):**
--- BEGIN SOURCE CONTENT ---
{source_markdown}
--- END SOURCE CONTENT ---
{format_requirements}
**FRONT MATTER-KRAV:**
{front_matter_requirements}
**OUTPUT:**
*   Returnera ren Markdown med front matter högst upp, följt av det omformaterade innehållet.
"""
    for attempt in range(MAX_RETRIES):
        try:
            gemini_model = genai.GenerativeModel(MODEL_NAME)
            response = gemini_model.generate_content(full_prompt, request_options={"timeout": timeout})
            if response.parts:
                content = response.text.strip()
                if content.startswith("```markdown"):
                    content = content[len("```markdown"):].strip()
                if content.endswith("```"):
                    content = content[:-len("```")].strip()
                logger.info(f"Innehåll omformaterat från '{file_path}'.")
                return content
            else:
                logger.warning(f"Gemini returnerade inget innehåll för '{file_path}' på försök {attempt + 1}.")
                time.sleep((RETRY_BACKOFF_FACTOR ** attempt) * 5 + random.uniform(0, 1))
        except Exception as e:
            logger.error(f"Fel vid Gemini API-anrop på försök {attempt + 1}: {e}")
            if attempt == MAX_RETRIES - 1:
                return None
            time.sleep((RETRY_BACKOFF_FACTOR ** attempt) * 5 + random.uniform(0, 1))
    return None


# --- Funktion: Döp om fil baserat på titel och datum ---
def rename_file(file_path: Path, content: str) -> Path:
    front_matter, _ = split_front_matter(content)
    if not front_matter:
        logger.warning(f"Ingen front matter i '{file_path}'. Använder filnamnet.")
        title = file_path.stem
    else:
        try:
            front_matter_data = frontmatter.loads(front_matter)
            title = front_matter_data.get('title', file_path.stem)
            title = remove_inner_journey(title)
        except Exception:
            title = file_path.stem
    date_match = re.match(r'(\d{4}-\d{2}-\d{2})', file_path.name)
    date = date_match.group(1) if date_match else "2025-01-01"
    title_slug = title_to_slug(title)
    new_filename = f"{date}-{title_slug}.md"
    new_file_path = file_path.parent / new_filename
    counter = 1
    while new_file_path.exists():
        new_filename = f"{date}-{title_slug}-{counter}.md"
        new_file_path = file_path.parent / new_filename
        counter += 1
    try:
        file_path.rename(new_file_path)
        logger.info(f"Döpte om '{file_path}' till '{new_file_path}'")
        return new_file_path
    except Exception as e:
        logger.error(f"Kunde inte döpa om '{file_path}' till '{new_file_path}': {e}")
        return file_path


# --- Huvudfunktion ---
def main():
    api_key = get_api_key()
    try:
        genai.configure(api_key=api_key)
        logger.info("Gemini API konfigurerad.")
    except Exception as e:
        logger.critical(f"API-konfig fel: {e}.")
        sys.exit(1)

    # Hämta alla .md-filer i samma mapp som skriptet (ej rekursivt)
    files = list(Path(current_dir).glob("*.md"))
    if not files:
        logger.warning(f"Inga .md-filer hittades i '{current_dir}'.")
        sys.exit(0)

    logger.info(f"Hittade {len(files)} .md-filer i '{current_dir}'.")
    file_mapping = {}
    reformatted_files = []

    for file_path in files:
        # Hoppa över själva skriptet om det är en .md-fil (osannolikt, men för säkerhets skull)
        if file_path.name == Path(__file__).name:
            continue
        try:
            source_content = file_path.read_text(encoding='utf-8')
            if not source_content.strip():
                logger.warning(f"Filen {file_path} är tom. Hoppar över.")
                continue
            reformatted_content = generate_reformatted_markdown(source_markdown=source_content, file_path=file_path)
            if reformatted_content:
                file_path.write_text(reformatted_content, encoding='utf-8')
                logger.info(f"Reformaterade och sparade '{file_path}'.")
                reformatted_files.append((file_path, reformatted_content))
            else:
                logger.warning(f"Kunde inte reformatera '{file_path}'.")
        except Exception as e:
            logger.error(f"Fel vid reformatering av '{file_path}': {e}")

    for file_path, content in reformatted_files:
        new_file_path = rename_file(file_path, content)
        file_mapping[file_path.name] = new_file_path.name

    print("\nFilnamnsmappning:")
    for old, new in file_mapping.items():
        print(f"{old} -> {new}")


# --- Kör Huvudfunktionen ---
if __name__ == "__main__":
    logger.info(f"Kör {Path(__file__).name} från '{Path.cwd()}'")
    main()