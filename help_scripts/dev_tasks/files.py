#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import sys
import argparse
from datetime import datetime
import logging
import time
import random
from pathlib import Path
from cryptography.fernet import Fernet
import google.generativeai as genai

# --- Konfiguration ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

DEFAULT_EXCLUDE_DIRS = {
    'node_modules', 'venv', '.venv', 'env', '.env', '__pycache__', '.git',
    '.vscode', '.idea', 'build', 'dist', 'target', 'coverage', '.DS_Store',
    '.mypy_cache', '.pytest_cache', '.ruff_cache', '*.egg-info'
}

DEFAULT_EXCLUDE_EXTENSIONS = {
    '.pyc', '.pyo', '.pyd', '.o', '.so', '.a', '.dll', '.lib', '.exe',
    '.class', '.jar', '.swp', '.swo', '.png', '.jpg', '.jpeg', '.gif',
    '.bmp', '.tiff', '.webp', '.mp3', '.wav', '.ogg', '.mp4', '.mov',
    '.avi', '.mkv', '.zip', '.tar', '.gz', '.rar', '.7z', '.pdf', '.doc',
    '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.lock', '.sqlite', '.db'
}

DEFAULT_MAX_FILE_SIZE_BYTES = 150 * 1024  # 150 KB
MODEL_NAME = "gemini-2.5-pro-exp-03-25"
MAX_CONTEXT_SIZE = 750000
API_TIMEOUT = 300
MAX_RETRIES = 3
RETRY_BACKOFF_FACTOR = 2
SMALL_PROJECT_THRESHOLD = 5  # Max antal filer för att anses "litet"
TOKEN_THRESHOLD = 10000  # Gräns för att inkludera allt istället för att sammanfatta

HOME_DIR = Path.home()
API_KEY_FILE = HOME_DIR / ".my_api_key"
ENCRYPTION_KEY_FILE = HOME_DIR / ".my_encryption_key"
STYRDOKUMENT_DIR = Path("/home/joelkvarnsmyr/projects/innerjourney/help_scripts/X_styrdokument")


# --- API-nyckelhantering ---
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
        logger.info("Använder sparad API-nyckel.")
        return saved_key
    api_key = input("Ange din Gemini API-nyckel: ").strip()
    if not api_key:
        logger.error("Ingen nyckel angiven. Avslutar.")
        sys.exit(1)
    save_choice = input("Vill du spara API-nyckeln? (ja/nej): ").strip().lower()
    if save_choice == "ja":
        encryption_key = generate_encryption_key()
        save_api_key(api_key, encryption_key)
        logger.info("API-nyckeln har sparats säkert.")
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
    for styrdokument_file in STYRDOKUMENT_DIR.glob("*.txt"):
        try:
            content = styrdokument_file.read_text(encoding='utf-8')
            styrdokument_content.append(f"**Styrdokument (text): {styrdokument_file.name}**\n{content}\n")
        except Exception as e:
            logger.error(f"Kunde inte läsa styrdokument '{styrdokument_file}': {e}")
    if not styrdokument_content:
        logger.warning(f"Inga styrdokument hittades i '{STYRDOKUMENT_DIR}'.")
        return "Inga styrdokument tillgängliga."
    return "\n".join(styrdokument_content)


# --- Funktioner ---
def is_likely_text_file(filename, exclude_extensions):
    return '.' not in filename or os.path.splitext(filename)[1].lower() not in exclude_extensions


def get_file_content(file_path, max_size):
    try:
        if os.path.getsize(file_path) > max_size:
            return f"[Innehåll utelämnat - filen är större än {max_size // 1024} KB]"
        encodings = ['utf-8', 'latin-1', 'cp1252']
        for enc in encodings:
            try:
                with open(file_path, 'r', encoding=enc) as f:
                    return f.read()
            except UnicodeDecodeError:
                continue
        return "[Fel: Kunde inte avkoda filen]"
    except Exception as e:
        return f"[Fel vid läsning: {e}]"


def count_text_files(start_path, exclude_dirs, exclude_extensions):
    count = 0
    for root, dirs, files in os.walk(start_path):
        dirs[:] = [d for d in dirs if d not in exclude_dirs and not d.startswith('.')]
        count += len([f for f in files if not f.startswith('.') and is_likely_text_file(f, exclude_extensions)])
    return count


def estimate_tokens(text):
    # Grov uppskattning: 1 token ≈ 4 tecken i genomsnitt (inkl. mellanslag och punkt)
    return len(text) // 4


def generate_context(start_path, exclude_dirs, exclude_extensions, include_content=False, specific_file=None,
                     max_size=DEFAULT_MAX_FILE_SIZE_BYTES):
    output = []
    real_start_path = os.path.abspath(start_path)
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    output.append(f"# Projektkontext\n")
    output.append(f"**Genererad:** {timestamp}  ")
    output.append(f"**Rotmapp:** `{real_start_path}`\n")
    output.append("## Fil- och Mappstruktur")
    output.append("```")

    for root, dirs, files in os.walk(real_start_path, topdown=True):
        dirs[:] = [d for d in dirs if d not in exclude_dirs and not d.startswith('.')]
        level = root.replace(real_start_path, '').count(os.sep)
        indent = ' ' * 4 * level
        output.append(f"{indent}{os.path.basename(root)}/")
        subindent = ' ' * 4 * (level + 1)
        valid_files = sorted([f for f in files if not f.startswith('.') and is_likely_text_file(f, exclude_extensions)])
        for f in valid_files:
            output.append(f"{subindent}{f}")
    output.append("```\n")

    if specific_file:
        file_path = os.path.join(real_start_path, specific_file)
        if not os.path.isfile(file_path):
            output.append(f"**Fel:** `{specific_file}` hittades inte eller är ingen fil.\n")
        elif not is_likely_text_file(os.path.basename(file_path), exclude_extensions):
            output.append(f"**Info:** `{specific_file}` verkar inte vara en textfil.\n")
        else:
            output.append(f"## Innehåll för `{specific_file}`")
            output.append(f"```{(os.path.splitext(specific_file)[1].lstrip('.') or '')}")
            output.append(get_file_content(file_path, max_size))
            output.append("```\n")
    elif include_content:
        output.append(f"## Filinnehåll (Max {max_size // 1024} KB per fil)")
        files_to_include = []
        for root, _, files in os.walk(real_start_path):
            files_to_include.extend(
                os.path.join(root, f) for f in sorted(files)
                if not f.startswith('.') and is_likely_text_file(f, exclude_extensions)
            )
        if not files_to_include:
            output.append("**Info:** Inga textfiler hittades.\n")
        else:
            for file_path in files_to_include:
                relative_path = os.path.relpath(file_path, real_start_path)
                output.append(f"### `{relative_path}`")
                output.append(f"```{(os.path.splitext(relative_path)[1].lstrip('.') or '')}")
                output.append(get_file_content(file_path, max_size))
                output.append("```\n")

    output.append("## Uppdrag till Gemini 2.5")
    output.append("_(Se nedan för analys eller sammanfattning beroende på val)_")
    output.append("\n## Resultat från Gemini 2.5")
    output.append("_(Väntar på generering om vald)_")

    return "\n".join(output)


def summarize_with_gemini(content, styrdokument_content, is_small_project=False, timeout=API_TIMEOUT):
    if is_small_project:
        prompt = f"""
**ROLL:** AI-assistent specialiserad på att analysera små tekniska projekt i detalj med fokus på styrdokument och rådata.  
**UPPDRAG:** Analysera följande projektkontext tillsammans med de medföljande styrdokumenten och ge en detaljerad förklaring av innehållet (5-10 meningar).  
- Använd styrdokumenten för att ge kontext till projektets syfte och mål.  
- Beskriv vad varje fil gör och hur de hänger ihop (t.ex. TSX och CSS-filer i ett webbprojekt).  
- Identifiera teknologier (t.ex. TypeScript, CSS) och deras användning.  
- För mappar med rådata eller README-dokument, ge en mer detaljerad förklaring av deras innehåll och syfte baserat på styrdokumenten.  
- Ignorera tekniska felmeddelanden som "[Fel vid läsning...]".  
- Använd en användarvänlig ton som förklarar hur filerna samverkar på ett begripligt sätt.  
**STYRDOKUMENT:**  
{styrdokument_content}  
**KONTEXT:**  
{content}  
**OUTPUT:** Returnera analysen som ren text utan formatering eller extra rubriker.
"""
    else:
        prompt = f"""
**ROLL:** AI-assistent specialiserad på att sammanfatta tekniska projekt med fokus på styrdokument och rådata.  
**UPPDRAG:** Analysera följande projektkontext tillsammans med de medföljande styrdokumenten och ge en kortfattad sammanfattning (2-5 meningar) av projektets struktur och huvudsakliga innehåll.  
- Använd styrdokumenten för att ge kontext till projektets syfte och mål.  
- Identifiera huvudsakliga komponenter (t.ex. mappar/filer) och eventuella mönster (t.ex. språk eller teknologier).  
- Notera särskilt mappar med rådata eller README-dokument och ge en kort beskrivning av deras syfte baserat på styrdokumenten.  
- Ignorera tekniska felmeddelanden som "[Fel vid läsning...]".  
- Håll det koncist och undvik onödig detaljrikedom.  
**STYRDOKUMENT:**  
{styrdokument_content}  
**KONTEXT:**  
{content}  
**OUTPUT:** Returnera sammanfattningen som ren text utan formatering eller extra rubriker.
"""
    if len(prompt) > MAX_CONTEXT_SIZE:
        logger.warning(f"Kontexten är för stor ({len(prompt)} tecken). Trunkerar till {MAX_CONTEXT_SIZE} tecken.")
        prompt = prompt[:MAX_CONTEXT_SIZE]

    for attempt in range(MAX_RETRIES):
        try:
            gemini_model = genai.GenerativeModel(MODEL_NAME)
            response = gemini_model.generate_content(prompt, request_options={"timeout": timeout})
            if response.parts:
                result = response.text.strip()
                logger.info(f"Genererade resultat: {result}")
                return result
            logger.warning(f"Gemini returnerade inget resultat på försök {attempt + 1}.")
            if attempt < MAX_RETRIES - 1:
                wait_time = (RETRY_BACKOFF_FACTOR ** attempt) * 5 + random.uniform(0, 1)
                logger.info(f"Försöker igen om {wait_time:.2f} sekunder...")
                time.sleep(wait_time)
        except Exception as e:
            logger.error(f"Fel vid Gemini-anrop på försök {attempt + 1}: {e}")
            if attempt < MAX_RETRIES - 1:
                wait_time = (RETRY_BACKOFF_FACTOR ** attempt) * 5 + random.uniform(0, 1)
                logger.info(f"Försöker igen om {wait_time:.2f} sekunder...")
                time.sleep(wait_time)
            else:
                logger.error("Misslyckades med att generera resultat.")
                return "Kunde inte generera resultat pga API-fel."
    return "Kunde inte generera resultat efter flera försök."


def main():
    parser = argparse.ArgumentParser(description="Genererar en .md-fil med projektkontext och valfri Gemini-analys.")
    parser.add_argument("directory", nargs='?', help="Sökvägen till mappen som ska analyseras.")
    parser.add_argument("--exclude-dirs", nargs='+', default=list(DEFAULT_EXCLUDE_DIRS))
    parser.add_argument("--exclude-exts", nargs='+', default=list(DEFAULT_EXCLUDE_EXTENSIONS))
    parser.add_argument("-o", "--output", help="Utdatafil (.md), standard är 'project_summary.md'.")
    parser.add_argument("--max-size", type=int, default=DEFAULT_MAX_FILE_SIZE_BYTES, help="Max filstorlek i bytes.")
    args = parser.parse_args()

    target_dir = args.directory or input("Ange sökvägen till mappen: ").strip()
    if not os.path.isdir(target_dir):
        logger.error(f"'{target_dir}' är inte en giltig mapp.")
        sys.exit(1)

    exclude_dirs_set = set(args.exclude_dirs)
    exclude_exts_set = set(args.exclude_exts)
    output_file = args.output or os.path.join(target_dir, "project_summary.md")
    file_count = count_text_files(target_dir, exclude_dirs_set, exclude_exts_set)

    while True:
        print("\n--- Vad vill du generera? ---")
        print(f"Textfiler i mappen: {file_count}")
        print("1. Endast struktur")
        print("2. Struktur + allt innehåll")
        print("3. Struktur + innehåll för specifik fil")
        print("q. Avsluta")
        choice = input("Ditt val: ").strip().lower()

        if choice == '1':
            content = generate_context(target_dir, exclude_dirs_set, exclude_exts_set, max_size=args.max_size)
            break
        elif choice == '2':
            confirm = input("Kan bli stort, fortsätta? (j/n): ").strip().lower()
            if confirm in ('j', 'y'):
                content = generate_context(target_dir, exclude_dirs_set, exclude_exts_set, include_content=True,
                                           max_size=args.max_size)
                break
        elif choice == '3':
            specific_file = input("Relativ sökväg till fil: ").strip()
            content = generate_context(target_dir, exclude_dirs_set, exclude_exts_set, specific_file=specific_file,
                                       max_size=args.max_size)
            break
        elif choice == 'q':
            sys.exit(0)
        else:
            print("Ogiltigt val.")

    # Räkna tokens och avgör om det är ett litet projekt
    token_count = estimate_tokens(content)
    is_small_project = file_count <= SMALL_PROJECT_THRESHOLD and token_count <= TOKEN_THRESHOLD
    print(f"\nUppskattat antal tokens: {token_count}")
    if is_small_project:
        print(f"Projektet är litet ({file_count} filer, {token_count} tokens).")

    # Fråga om Gemini-analys
    summarize = input("\nVill du att Gemini 2.5 analyserar eller sammanfattar innehållet? (ja/nej): ").strip().lower()
    if summarize in ('ja', 'y'):
        api_key = get_api_key()
        try:
            genai.configure(api_key=api_key)
            logger.info("Gemini API konfigurerad.")
        except Exception as e:
            logger.error(f"Misslyckades med att konfigurera Gemini API: {e}")
            content = content.replace("_(Se nedan för analys eller sammanfattning beroende på val)_",
                                      "Ingen analys pga API-fel.")
            content = content.replace("_(Väntar på generering om vald)_", "Kunde inte konfigurera Gemini API.")
        else:
            styrdokument_content = load_styrdokument()
            if is_small_project:
                content = content.replace("_(Se nedan för analys eller sammanfattning beroende på val)_",
                                          "Detaljerad analys av det lilla projektet.")
            else:
                content = content.replace("_(Se nedan för analys eller sammanfattning beroende på val)_",
                                          "Kortfattad sammanfattning av projektet.")
            result = summarize_with_gemini(content, styrdokument_content, is_small_project)
            content = content.replace("_(Väntar på generering om vald)_", result)
    else:
        content = content.replace("_(Se nedan för analys eller sammanfattning beroende på val)_", "Ingen analys vald.")
        content = content.replace("_(Väntar på generering om vald)_", "Ingen analys genererad (valdes bort).")

    # Spara till fil
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)
    logger.info(f"Sparad till: {output_file}")
    print(f"Resultatet har sparats till: {output_file}")


if __name__ == "__main__":
    main()