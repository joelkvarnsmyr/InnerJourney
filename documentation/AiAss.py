# Filnamn: AiAss.py
# (Placeras i 'documentation'-mappen)

import google.generativeai as genai
import argparse
import os
import sys
import logging
import re
from pathlib import Path
from google.cloud import secretmanager
from google.api_core import exceptions as google_exceptions

# --- Grundläggande Konfiguration ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# --- Google Cloud & Gemini Konfiguration ---
GCP_PROJECT_ID = "innerjourney-c007e"
SECRET_NAME = "gemini-api-key"
MODEL_NAME = "gemini-2.5-pro-exp-03-25" # Experimentell
# Fallback: MODEL_NAME = "gemini-1.5-pro-latest"
logger.info(f"Använder Gemini-modell: {MODEL_NAME} (Experimentell)")
# ----------------------------------------

# --- Projektstruktur & Kontext ---
SCRIPT_DIR = Path(__file__).parent.resolve()
PROJECT_ROOT = SCRIPT_DIR.parent
MASTER_DOCS_DIR = SCRIPT_DIR / "X_styrdokument"
CATEGORY_MAP = {
    "1": Path("1_projektoversikt"), "projektoversikt": Path("1_projektoversikt"),
    "2": Path("2_anvandarupplevelse"), "anvandarupplevelse": Path("2_anvandarupplevelse"),
    "3": Path("3_teknisk_dokumentation"), "teknisk dokumentation": Path("3_teknisk_dokumentation"), "teknisk": Path("3_teknisk_dokumentation"),
    "4": Path("4_sakerhet_och_test"), "sakerhet och test": Path("4_sakerhet_och_test"), "säkerhet": Path("4_sakerhet_och_test"),
    "5": Path("5_loggar_och_backlog"), "loggar och backlog": Path("5_loggar_och_backlog"), "loggar": Path("5_loggar_och_backlog"),
    "6": Path("6_ekonomi_och_administration"), "ekonomi och administration": Path("6_ekonomi_och_administration"), "ekonomi": Path("6_ekonomi_och_administration"),
    "7": Path("7_marknadsstrategi"), "marknadsstrategi": Path("7_marknadsstrategi"), "marknad": Path("7_marknadsstrategi"),
    "8": Path("8_todo"), "todo": Path("8_todo"),
}
# Mappar/filer att ignorera vid sökning och i picker
IGNORE_DIRS_SEARCH = {'.git', 'venv', 'node_modules', '__pycache__', '.pytest_cache', 'build', 'dist', '.idea', '.vscode'}
IGNORE_FILES_SEARCH = {Path(__file__).name} # Ignorera scriptet självt
IGNORE_DIRS_PICKER = {MASTER_DOCS_DIR.name} # Ignorera master-mappen i pickern som standard
IGNORE_FILES_PICKER = {Path(__file__).name} # Ignorera scriptet självt i pickern
# -----------------------------------

# --- Funktion: Hämta Secret ---
def get_google_cloud_secret(project_id, secret_id, version_id="latest"):
    """Hämtar ett secret från Google Cloud Secret Manager."""
    try:
        client = secretmanager.SecretManagerServiceClient()
        name = f"projects/{project_id}/secrets/{secret_id}/versions/{version_id}"
        response = client.access_secret_version(request={"name": name})
        payload = response.payload.data.decode("UTF-8")
        logger.debug(f"Secret '{secret_id}' hämtad.")
        return payload
    except google_exceptions.NotFound:
        logger.error(f"Secret eller version hittades inte: {name}")
        return None
    except google_exceptions.PermissionDenied:
        logger.error(f"Behörighet nekad för secret: {name}.")
        return None
    except Exception as e:
        logger.error(f"Oväntat fel vid hämtning av secret '{secret_id}': {e}")
        return None

# --- Funktion: Läs in Styrdokument ---
def load_master_documents(master_docs_path: Path) -> str:
    """Läser innehållet från alla .md-filer i styrdokumentsmappen."""
    all_content = []
    logger.info(f"Letar efter styrdokument i: {master_docs_path}")
    if not master_docs_path.is_dir():
        logger.warning(f"Mapp för styrdokument '{master_docs_path}' ej hittad.")
        return ""
    found_files = sorted(list(master_docs_path.glob("*.md")))
    if not found_files:
        logger.warning(f"Inga .md-filer i '{master_docs_path}'.")
        return ""
    logger.info(f"Läser in följande styrdokument som master-kontext:")
    for md_file in found_files:
        try:
            logger.info(f"- {md_file.relative_to(SCRIPT_DIR)}")
            content = md_file.read_text(encoding='utf-8')
            all_content.append(f"\n\n{'='*10} START: {md_file.name} {'='*10}\n\n")
            all_content.append(content)
            all_content.append(f"\n\n{'='*10} END: {md_file.name} {'='*10}\n\n")
        except Exception as e: logger.error(f"Kunde inte läsa styrdokument '{md_file}': {e}")
    combined_content = "".join(all_content)
    logger.info(f"Totalt {len(combined_content):,} tecken master-kontext inläst.")
    if len(combined_content) > 750000: logger.warning("VARNING: Master-kontexten är mycket stor.")
    return combined_content

# --- Funktion: Generera Markdown (från topic) ---
def generate_doc_markdown(topic_prompt, target_filename, master_context):
    """Genererar Markdown för ett nytt dokument, med master-kontext."""
    logger.info(f"Genererar dokument om '{topic_prompt}' för filen '{target_filename}'...")
    full_prompt = f"""
**ROLL:** AI-assistent för teknisk dokumentation (projekt "InnerJourney").
**UPPDRAG:** Skapa en **ny**, välstrukturerad dokumentationsfil i Markdown (.md) om följande ämne. Innehållet ska vara professionellt, detaljerat och konsekvent med projektets styrdokument (bifogad kontext).
**ÄMNE ATT DOKUMENTERA:**
"{topic_prompt}"
**KONTEXT FRÅN STYRDOKUMENT:**
Använd denna information för att säkerställa korrekthet i terminologi, tekniska val och mål.
--- BEGIN MASTER CONTEXT ---
{master_context if master_context else "Inga styrdokument kunde laddas."}
--- END MASTER CONTEXT ---
**FORMATKRAV:**
*   Börja med en H1-rubrik (# Titel) som matchar ämnet.
*   Använd underubriker (##, ###), listor, kodblock (med språk), etc. logiskt.
*   Tonalitet: Klart, koncist, professionellt.
*   Output: Endast ren Markdown.
**GENERERAD MARKDOWN:**
"""
    try:
        gemini_model = genai.GenerativeModel(MODEL_NAME)
        response = gemini_model.generate_content(full_prompt)
        if response.parts:
            content = response.text.strip()
            if content.startswith("```markdown"): content = content[len("```markdown"):].strip()
            if content.endswith("```"): content = content[:-len("```")].strip()
            logger.info(f"Dokumentinnehåll ({len(content):,} tecken) genererat.")
            return content
        else:
             logger.warning("Gemini returnerade inget textinnehåll för dokumentet.")
             return None
    except Exception as e:
        logger.error(f"Fel vid anrop till Gemini API (dokumentgenerering): {e}", exc_info=True)
        if "model" in str(e).lower() and "not found" in str(e).lower():
             logger.error(f"Modellen '{MODEL_NAME}' hittades inte. Byt till fallback eller kontrollera åtkomst.")
        return None

# --- Funktion: Generera Markdown (från text) ---
def generate_doc_from_text_markdown(input_text, extracted_title, master_context):
    """Formaterar om befintlig text till Markdown, med hänsyn till master-kontext."""
    logger.info(f"Formaterar om text (titel: '{extracted_title}') till Markdown...")
    full_prompt = f"""
**ROLL:** AI-assistent specialiserad på att formatera och strukturera teknisk dokumentation för "InnerJourney".
**UPPDRAG:** Ta följande råtext och formatera om den till en professionell och välstrukturerad Markdown-fil (.md). Behåll kärninnehållet men förbättra struktur, rubriker, listor och kodblock enligt bästa praxis för Markdown. Se till att formateringen och eventuell terminologi är konsekvent med projektets styrdokument (bifogad kontext). **Fokusera på formatering, lägg inte till nytt innehåll som inte finns i råtexten.**
**KONTEXT FRÅN STYRDOKUMENT:**
Använd denna information för att säkerställa konsekvens.
--- BEGIN MASTER CONTEXT ---
{master_context if master_context else "Inga styrdokument kunde laddas."}
--- END MASTER CONTEXT ---
**RÅTEXT ATT FORMATERA:**
--- BEGIN INPUT TEXT ---
{input_text}
--- END INPUT TEXT ---
**FORMATKRAV:**
*   Använd den extraherade titeln "{extracted_title}" som H1-rubrik (# Titel). Om titeln är olämplig, justera den lätt.
*   Strukturera med underubriker (##, ###), punktlistor (-), numrerade listor (1.).
*   Formatera kodblock korrekt (```språk ... ```). Identifiera språk om möjligt.
*   Använd `inline-kod` för filnamn, kommandon etc.
*   Tonalitet: Klart, koncist, professionellt.
*   Output: Endast ren, välformaterad Markdown.
**FORMERAD MARKDOWN:**
"""
    try:
        gemini_model = genai.GenerativeModel(MODEL_NAME)
        response = gemini_model.generate_content(full_prompt)
        if response.parts:
            content = response.text.strip()
            if content.startswith("```markdown"): content = content[len("```markdown"):].strip()
            if content.endswith("```"): content = content[:-len("```")].strip()
            logger.info(f"Text ({len(content):,} tecken) formaterad till Markdown.")
            return content
        else:
            logger.warning("Gemini returnerade ingen formaterad text.")
            return None
    except Exception as e:
        logger.error(f"Fel vid anrop till Gemini API (textformatering): {e}", exc_info=True)
        if "model" in str(e).lower() and "not found" in str(e).lower():
             logger.error(f"Modellen '{MODEL_NAME}' hittades inte. Byt till fallback eller kontrollera åtkomst.")
        return None

# --- Funktion: Generera Svar (Q&A) ---
def generate_qa_answer(question, context_files_content):
    """Genererar svar på en fråga baserat på tillhandahållen kontext."""
    logger.info("Genererar svar på fråga med tillhandahållen kontext...")
    full_prompt = f"""
**ROLL:** AI-assistent som analyserar kod och dokumentation för projektet "InnerJourney".
**UPPDRAG:** Svara på användarens fråga baserat *endast* på den information som finns i den bifogade kontexten (kodfiler och/eller dokumentationsfiler). Var specifik och hänvisa gärna till relevanta delar av kontexten i ditt svar. Om informationen saknas i kontexten, ange det tydligt.
**BIFOGAD KONTEXT:**
{context_files_content if context_files_content else "VARNING: Ingen kontext från filer tillhandahölls."}
**FRÅGA FRÅN ANVÄNDAREN:**
"{question}"
**SVAR:**
"""
    try:
        gemini_model = genai.GenerativeModel(MODEL_NAME)
        response = gemini_model.generate_content(full_prompt)
        if response.parts:
            answer = response.text.strip()
            logger.info(f"Svar ({len(answer):,} tecken) genererat.")
            return answer
        else:
            logger.warning("Gemini returnerade inget textinnehåll för frågan.")
            return "Fel: Fick inget svar från AI-modellen."
    except Exception as e:
        logger.error(f"Fel vid anrop till Gemini API (Q&A): {e}", exc_info=True)
        if "model" in str(e).lower() and "not found" in str(e).lower():
             logger.error(f"Modellen '{MODEL_NAME}' hittades inte. Byt till fallback eller kontrollera åtkomst.")
        return f"Fel vid API-anrop: {e}"

# --- Funktion: Läs Filer för Kontext (Q&A) ---
def read_context_files(resolved_file_paths: list[Path]) -> str:
    """Läser innehållet från en lista med färdig-resolverade Path-objekt."""
    all_content = []; files_read_count = 0; total_chars = 0
    if not resolved_file_paths: return ""
    logger.info("Läser följande filer för Q&A-kontext:")
    for file_abs_path in resolved_file_paths:
        try: display_path = file_abs_path.relative_to(PROJECT_ROOT)
        except ValueError:
            try: display_path = file_abs_path.relative_to(SCRIPT_DIR)
            except ValueError: display_path = file_abs_path
        logger.info(f"- {display_path}")
        try:
            content = file_abs_path.read_text(encoding='utf-8')
            marker_path = display_path
            all_content.append(f"\n\n{'='*10} START: {marker_path} {'='*10}\n\n{content}\n\n{'='*10} END: {marker_path} {'='*10}\n\n")
            files_read_count += 1; total_chars += len(content)
        except Exception as e: logger.error(f"Kunde inte läsa kontextfil '{file_abs_path}': {e}")
    combined_content = "".join(all_content)
    logger.info(f"{files_read_count} kontextfiler inlästa ({total_chars:,} tecken).")
    if total_chars > 750000: logger.warning("VARNING: Den kombinerade Q&A-kontexten är mycket stor.")
    return combined_content

# --- Funktion: Hitta och Välj Fil ---
def find_and_select_file(filename_or_path: str, search_root: Path, file_type_desc: str, relative_to: Path = None) -> Path | None:
    """
    Hittar en fil baserat på namn eller sökväg.
    Om flera hittas, uppmanas användaren att välja.
    Returnerar det valda Path-objektet eller None.
    """
    relative_to = relative_to or search_root
    potential_path = (search_root / filename_or_path).resolve()
    if (os.path.sep in filename_or_path or Path(filename_or_path).is_absolute()) and potential_path.is_file():
        logger.info(f"Använder direkt angiven sökväg för {file_type_desc}: {potential_path.relative_to(relative_to)}")
        if potential_path.name in IGNORE_FILES_SEARCH or any(part in IGNORE_DIRS_SEARCH for part in potential_path.parts):
            logger.warning(f"Ignorerad fil angiven: '{potential_path.relative_to(relative_to)}'")
            return None
        return potential_path
    base_filename = Path(filename_or_path).name
    logger.info(f"Söker efter {file_type_desc}-fil med namn '{base_filename}' i '{search_root}'...")
    found_files = [item for item in search_root.rglob(base_filename) if item.is_file() and item.name not in IGNORE_FILES_SEARCH and not any(part in IGNORE_DIRS_SEARCH for part in item.parts)]
    if not found_files: logger.error(f"Ingen {file_type_desc}-fil med namnet '{base_filename}' hittades."); return None
    if len(found_files) == 1: selected_file = found_files[0]; logger.info(f"Hittade exakt en match: {selected_file.relative_to(relative_to)}"); return selected_file
    print(f"\nFlera {file_type_desc}-filer hittades för '{base_filename}':"); [print(f"  {i+1}: {f.relative_to(relative_to)}") for i, f in enumerate(found_files)]
    while True:
        try:
            choice_str = input(f"Vilken fil menar du? (1-{len(found_files)}, Enter för att avbryta): ").strip()
            if not choice_str: logger.warning("Val avbrutet."); return None
            choice_int = int(choice_str)
            if 1 <= choice_int <= len(found_files): selected_file = found_files[choice_int - 1]; logger.info(f"Valde: {selected_file.relative_to(relative_to)}"); return selected_file
            else: print("Ogiltigt nummer.")
        except ValueError: print("Ange ett nummer.")
        except EOFError: logger.warning("\nInput avbruten (EOF)."); return None

# --- Funktion: Interaktiv Dokumentväljare (för --ask --pick-doc) ---
def interactive_doc_picker(search_root: Path) -> list[Path]:
    """Listar .md-filer och låter användaren välja en eller flera."""
    logger.info(f"Söker efter dokumentationsfiler (.md) i '{search_root}' (ignorerar {IGNORE_DIRS_PICKER})...")
    all_md_files = []
    for item in search_root.rglob("*.md"):
         if item.name in IGNORE_FILES_PICKER or any(part in IGNORE_DIRS_PICKER for part in item.relative_to(search_root).parts): continue
         if item.is_file(): all_md_files.append(item)
    if not all_md_files: logger.warning("Hittade inga .md-filer att välja från."); return []
    all_md_files.sort(key=lambda p: p.relative_to(search_root).as_posix())
    print("\nTillgängliga dokumentationsfiler:"); [print(f"  {i+1}: {f.relative_to(search_root)}") for i, f in enumerate(all_md_files)]
    chosen_files = []
    while True:
        try:
            choice_str = input(f"Ange nummer på filer att inkludera som kontext (t.ex. 1,3,5), Enter för att hoppa över: ").strip()
            if not choice_str: logger.info("Inga filer valda från listan."); break
            chosen_indices = set()
            parts = choice_str.split(','); valid_input = True
            for part in parts:
                part = part.strip();
                if not part: continue
                choice_int = int(part)
                if 1 <= choice_int <= len(all_md_files): chosen_indices.add(choice_int - 1)
                else: print(f"Ogiltigt nummer: {choice_int}."); valid_input = False; break
            if valid_input:
                for index in sorted(list(chosen_indices)): chosen_files.append(all_md_files[index])
                logger.info(f"Valde {len(chosen_files)} fil(er) från listan."); break
        except ValueError: print("Ogiltigt format. Ange nummer separerade med kommatecken.")
        except EOFError: logger.warning("\nInput avbruten (EOF)."); break
    return chosen_files

# --- Funktion: Interaktiv Väljare för EN Fil (för --reformat-doc) ---
def interactive_single_doc_picker(search_root: Path, prompt_message: str) -> Path | None:
    """Listar .md-filer och låter användaren välja exakt en fil."""
    logger.info(f"Söker efter dokumentationsfiler (.md) i '{search_root}' (ignorerar {IGNORE_DIRS_PICKER})...")
    all_md_files = []
    for item in search_root.rglob("*.md"):
        if item.name in IGNORE_FILES_PICKER or any(part in IGNORE_DIRS_PICKER for part in item.relative_to(search_root).parts): continue
        if item.is_file(): all_md_files.append(item)
    if not all_md_files: logger.error("Hittade inga .md-filer att välja från."); return None
    all_md_files.sort(key=lambda p: p.relative_to(search_root).as_posix())
    print(f"\n{prompt_message}"); print("Tillgängliga dokumentationsfiler:")
    [print(f"  {i+1}: {f.relative_to(search_root)}") for i, f in enumerate(all_md_files)]
    while True:
        try:
            choice_str = input(f"Ange numret på filen du vill välja (1-{len(all_md_files)}), Enter för att avbryta: ").strip()
            if not choice_str: logger.warning("Val avbrutet."); return None
            choice_int = int(choice_str)
            if 1 <= choice_int <= len(all_md_files): selected_file = all_md_files[choice_int - 1]; logger.info(f"Valde: {selected_file.relative_to(search_root)}"); return selected_file
            else: print(f"Ogiltigt nummer.")
        except ValueError: print("Ogiltigt format. Ange ett enda nummer.")
        except EOFError: logger.warning("\nInput avbruten (EOF)."); return None

# --- Funktion: Generera Reformaterad Markdown ---
def generate_reformatted_markdown(source_markdown: str, source_filename: str, master_context: str):
    """Formaterar om befintlig Markdown, bevarar innehåll, förbättrar struktur."""
    logger.info(f"Reformaterar innehåll från '{source_filename}'...")
    full_prompt = f"""
**ROLL:** AI-assistent som är expert på att strukturera och snygga till teknisk dokumentation i Markdown för projektet "InnerJourney".
**UPPDRAG:** Ta följande befintliga Markdown-innehåll och formatera om det för att förbättra läsbarhet och struktur. **Behåll allt ursprungligt innehåll och dess innebörd**, men förbättra användningen av rubriker (H1, H2, H3...), listor, kodblock, inline-kod och styckesindelning. Säkerställ att terminologi och stil är konsekvent med projektets styrdokument (bifogad kontext). **Lägg inte till ny information.**
**KONTEXT FRÅN STYRDOKUMENT (För konsistens):**
--- BEGIN MASTER CONTEXT ---
{master_context if master_context else "Inga styrdokument kunde laddas."}
--- END MASTER CONTEXT ---
**URSPRUNGLIGT MARKDOWN-INNEHÅLL ATT REFORMATERA (Från fil: {source_filename}):**
--- BEGIN SOURCE MARKDOWN ---
{source_markdown}
--- END SOURCE MARKDOWN ---
**FORMATKRAV:**
*   Använd en tydlig H1-rubrik (# Titel). Justera den ursprungliga om nödvändigt för tydlighet.
*   Använd H2 (##) och H3 (###) logiskt för att skapa en hierarki.
*   Använd punktlistor (-) och numrerade listor (1.) korrekt.
*   Se till att kodblock (```språk ... ```) är korrekt formaterade och har språkindikering om möjligt.
*   Använd `inline-kod` konsekvent för filnamn, variabler, kommandon etc.
*   Förbättra styckesindelning för bättre läsflöde.
*   Output: Endast ren, välformaterad Markdown.
**REFORMATERAD MARKDOWN:**
"""
    try:
        gemini_model = genai.GenerativeModel(MODEL_NAME)
        response = gemini_model.generate_content(full_prompt)
        if response.parts:
            content = response.text.strip()
            if content.startswith("```markdown"): content = content[len("```markdown"):].strip()
            if content.endswith("```"): content = content[:-len("```")].strip()
            logger.info(f"Innehåll ({len(content):,} tecken) omformaterat från '{source_filename}'.")
            return content
        else: logger.warning(f"Gemini returnerade inget omformaterat innehåll för '{source_filename}'."); return None
    except Exception as e:
        logger.error(f"Fel vid anrop till Gemini API (reformatering): {e}", exc_info=True)
        if "model" in str(e).lower() and "not found" in str(e).lower(): logger.error(f"Modellen '{MODEL_NAME}' hittades inte.")
        return None

# --- Funktion: Skapa Filnamn från Topic/Title ---
def slugify(text):
    """Skapar ett enkelt filnamns-vänligt 'slug' från en textsträng."""
    text = text.lower(); text = re.sub(r'\s+', '_', text); text = re.sub(r'[^\w-]', '', text)
    text = re.sub(r'[_]+', '_', text); text = text.strip('_'); return text if text else "untitled"

# --- Funktion: Spara Fil ---
def save_file(filename, content, target_dir_path):
    """Sparar innehållet till en fil i angiven målmapp (Path-objekt)."""
    logger.info(f"Försöker spara fil i målmapp: {target_dir_path}")
    try: target_dir_path.mkdir(parents=True, exist_ok=True)
    except OSError as e: logger.error(f"Kunde inte skapa mapp: {e}"); return False
    file_path = target_dir_path / filename
    logger.info(f"Fullständig sökväg: {file_path}")
    try: file_path.write_text(content, encoding='utf-8'); return True
    except IOError as e: logger.error(f"Skrivfel: {e}"); return False

# --- Funktion: Extrahera Titel från Text ---
def extract_title_from_text(text):
    """Försöker hitta den första H1 (# Titel) eller H2 (## Titel) i texten."""
    lines = text.splitlines(); title = None
    for line in lines:
        line = line.strip()
        if line.startswith('# '): title = line[2:].strip(); break
        elif line.startswith('## '): title = line[3:].strip(); break
    if title: return title
    fallback_title = ' '.join(text.split()[:6])
    logger.warning(f"Ingen H1/H2-rubrik hittad, använder fallback: '{fallback_title}'")
    return fallback_title if fallback_title else "Okänt Ämne"

# --- Huvudfunktion (Main) ---
def main():
    """Hanterar kommandoradsargument och dirigerar till rätt åtgärd."""
    api_key = get_google_cloud_secret(GCP_PROJECT_ID, SECRET_NAME)
    if not api_key: logger.critical("API-nyckel saknas."); sys.exit(1)
    try: genai.configure(api_key=api_key); logger.info("Gemini API konfigurerad.")
    except Exception as e: logger.critical(f"API-konfig fel: {e}."); sys.exit(1)
    master_context = ""

    # --- Steg 1: Parsa Argument ---
    parser = argparse.ArgumentParser(
        description="AI Assistant för InnerJourney.",
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    mode_group = parser.add_argument_group('Lägen (välj ett)')
    mode_group.add_argument('--create-doc', action='store_true', help='Läge: Skapa nytt dokument från ämne.')
    mode_group.add_argument('--create-doc-from-text', action='store_true', help='Läge: Skapa dokument från text via stdin.')
    mode_group.add_argument('--reformat-doc', action='store_true', help='Läge: Formatera om befintlig dokumentfil (SKRIVER ÖVER!).')
    mode_group.add_argument('--ask', action='store_true', help='Läge: Ställ fråga om kod/dokument.')

    doc_common_group = parser.add_argument_group('Argument för --create-doc*')
    doc_common_group.add_argument('--category', help='Dokumentkategori (t.ex. "3"). Krävs för --create-doc*.')

    doc_topic_group = parser.add_argument_group('Argument specifikt för --create-doc')
    doc_topic_group.add_argument('--topic', help='Ämnet för det nya dokumentet.')

    reformat_group = parser.add_argument_group('Argument för --reformat-doc')
    reformat_group.add_argument('--source-file', help='(Valfri) Fil att reformatera. Om utelämnad visas väljare.')

    qa_group = parser.add_argument_group('Argument för --ask')
    qa_group.add_argument('--question', help='Frågan du vill ställa.')
    qa_group.add_argument('--code-file', action='append', default=[], help='Kodfil som kontext (namn/rel. sökväg från projekt).')
    qa_group.add_argument('--doc-file', action='append', default=[], help='Dokumentfil som kontext (namn/rel. sökväg från ./documentation).')
    qa_group.add_argument('--pick-doc', action='store_true', help='Visa interaktiv lista för att välja DOKUMENT-filer för --ask.')

    args = parser.parse_args()
    # -----------------------------

    # --- Steg 2: Validera Läge och Kör Åtgärd ---

    # Läge: Skapa Dokument från Ämne (--create-doc)
    if args.create_doc:
        if not args.category or not args.topic: parser.error("--category och --topic krävs.")
        master_context = load_master_documents(MASTER_DOCS_DIR)
        category_key = args.category.lower().strip()
        target_subpath = CATEGORY_MAP.get(category_key)
        if not target_subpath: logger.error(f"Okänd kategori: '{args.category}'."); sys.exit(1)
        target_dir_resolved = (SCRIPT_DIR / target_subpath).resolve()
        actual_filename = slugify(args.topic) + ".md"
        logger.info(f"Genererar filnamn: '{actual_filename}'")
        markdown_content = generate_doc_markdown(args.topic, actual_filename, master_context)
        if markdown_content:
            target_file_path = target_dir_resolved / actual_filename
            if target_file_path.exists(): logger.warning(f"Filen '{target_file_path}' finns, skrivs över.")
            else: logger.info(f"Försöker skapa filen '{target_file_path}'.")
            if save_file(actual_filename, markdown_content, target_dir_resolved): logger.info(f"Filen '{target_file_path}' sparades.")
            else: logger.error("Filsparandet misslyckades.")
        else: logger.error("Ingen fil skapades (genereringsfel).")

    # Läge: Skapa Dokument från Text via stdin (--create-doc-from-text)
    elif args.create_doc_from_text:
         if not args.category: parser.error("--category krävs.")
         logger.info("Väntar på text från stdin (Avsluta med Ctrl+D/Ctrl+Z+Enter).")
         try: input_text = sys.stdin.read()
         except Exception as e: logger.error(f"Kunde inte läsa från stdin: {e}"); sys.exit(1)
         if not input_text: logger.error("Ingen text mottogs från stdin."); sys.exit(1)
         logger.info(f"Mottog {len(input_text):,} tecken från stdin.")
         master_context = load_master_documents(MASTER_DOCS_DIR)
         category_key = args.category.lower().strip()
         target_subpath = CATEGORY_MAP.get(category_key)
         if not target_subpath: logger.error(f"Okänd kategori: '{args.category}'."); sys.exit(1)
         target_dir_resolved = (SCRIPT_DIR / target_subpath).resolve()
         extracted_title = extract_title_from_text(input_text)
         actual_filename = slugify(extracted_title) + ".md"
         logger.info(f"Extraherad titel: '{extracted_title}', Filnamn: '{actual_filename}'")
         markdown_content = generate_doc_from_text_markdown(input_text, extracted_title, master_context)
         if markdown_content:
             target_file_path = target_dir_resolved / actual_filename
             if target_file_path.exists(): logger.warning(f"Filen '{target_file_path}' finns, skrivs över.")
             else: logger.info(f"Försöker skapa filen '{target_file_path}'.")
             if save_file(actual_filename, markdown_content, target_dir_resolved): logger.info(f"Filen '{target_file_path}' sparades.")
             else: logger.error("Filsparandet misslyckades.")
         else: logger.error("Ingen fil skapades (formaterings-/genereringsfel).")

    # Läge: Reformatera Befintligt Dokument (--reformat-doc)
    elif args.reformat_doc:
        source_path = None
        if args.source_file:
            logger.info(f"Försöker hitta källfil specificerad via --source-file: '{args.source_file}'")
            source_path = find_and_select_file(args.source_file, SCRIPT_DIR, "käll", relative_to=SCRIPT_DIR)
        if not source_path:
            logger.info("Ingen giltig --source-file angiven/vald, visar interaktiv väljare...")
            source_path = interactive_single_doc_picker(SCRIPT_DIR, "Vilken dokumentationsfil vill du formatera om?")
        if not source_path: logger.error("Ingen källfil att reformatera kunde bestämmas."); sys.exit(1)

        try: source_content = source_path.read_text(encoding='utf-8'); logger.info(f"Läste {len(source_content):,} tecken från: {source_path.relative_to(SCRIPT_DIR)}")
        except Exception as e: logger.error(f"Kunde inte läsa källfil '{source_path}': {e}"); sys.exit(1)

        master_context = load_master_documents(MASTER_DOCS_DIR)
        reformatted_content = generate_reformatted_markdown(source_content, source_path.name, master_context)

        if reformatted_content:
            original_filename = source_path.name; original_dir = source_path.parent
            logger.warning(f"Försöker skriva över originalfilen '{source_path}'...")
            if save_file(original_filename, reformatted_content, original_dir): logger.info(f"Originalfilen '{source_path}' skrevs över.")
            else: logger.error(f"Misslyckades med att skriva över '{source_path}'.")
        else: logger.error("Ingen reformaterad fil skapades. Originalfilen är oförändrad.")

    # Läge: Ställ Fråga (Q&A) (--ask)
    elif args.ask:
        if not args.question: parser.error("--question krävs.")
        resolved_code_files = []; resolved_doc_files = []
        for file_input in args.code_file:
            selected_path = find_and_select_file(file_input, PROJECT_ROOT, "kod", relative_to=PROJECT_ROOT)
            if selected_path: resolved_code_files.append(selected_path)
        for file_input in args.doc_file:
            selected_path = find_and_select_file(file_input, SCRIPT_DIR, "dokumentations", relative_to=SCRIPT_DIR)
            if selected_path and selected_path not in resolved_code_files: resolved_doc_files.append(selected_path); manually_specified_docs.add(selected_path) # Glömde lägga till detta set tidigare, men behövs nog inte nu
            elif selected_path: logger.warning(f"Filen '{selected_path.relative_to(SCRIPT_DIR)}' angavs troligen dubbelt.")
        picked_doc_files = []
        if args.pick_doc: picked_doc_files = interactive_doc_picker(search_root=SCRIPT_DIR)
        for picked_file in picked_doc_files:
             if picked_file not in resolved_doc_files and picked_file not in resolved_code_files: resolved_doc_files.append(picked_file)
             else: logger.info(f"Ignorerar vald fil '{picked_file.relative_to(SCRIPT_DIR)}' då den redan specificerats.")
        all_context_files = resolved_code_files + resolved_doc_files
        if not all_context_files and (args.code_file or args.doc_file or args.pick_doc): logger.error("Inga giltiga kontextfiler hittades/valdes."); sys.exit(1)
        elif not all_context_files: logger.warning("Ställer fråga utan filkontext.")
        context_content = read_context_files(all_context_files)
        answer = generate_qa_answer(args.question, context_content)
        print("\n===== Svar från AI Assistant ====="); print(answer); print("==================================")

    # Inget giltigt läge valt
    else:
        parser.print_help()
        print("\nFel: Du måste ange ett läge (--create-doc, --create-doc-from-text, --reformat-doc, eller --ask).")
        sys.exit(1)

# --- Kör Huvudfunktionen ---
if __name__ == "__main__":
    logger.info(f"Kör {Path(__file__).name} från '{Path.cwd()}'")
    main()
# ---------------------------