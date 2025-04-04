#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import argparse
import sys

# --- Konfiguration ---
# Mappar att alltid ignorera
DEFAULT_EXCLUDE_DIRS = {
    'node_modules',
    'venv',
    '.venv',
    'env',
    '.env',
    '__pycache__',
    '.git',
    '.vscode',
    '.idea',
    'build',
    'dist',
    'target',
    'coverage',
    '.DS_Store',
    '.mypy_cache',
    '.pytest_cache',
    '.ruff_cache',
    '*.egg-info' # Ignorera python package build metadata
}

# Filändelser att generellt ignorera (binära, stora mediafiler etc.)
DEFAULT_EXCLUDE_EXTENSIONS = {
    '.pyc', '.pyo', '.pyd', # Python compiled
    '.o', '.so', '.a', '.dll', '.lib', '.exe', # Compiled objects/libs
    '.class', '.jar', # Java
    '.swp', '.swo', # Vim swap files
    # Media/Binärt (kan utökas)
    '.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.webp',
    '.mp3', '.wav', '.ogg', '.mp4', '.mov', '.avi', '.mkv',
    '.zip', '.tar', '.gz', '.rar', '.7z',
    '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
    '.lock', # Beroendelåsfiler (kan vara stora/onödiga för ren kodförståelse)
    '.sqlite', '.db', # Databaser
}

# Max filstorlek att läsa (i bytes) för att undvika för stora kontexter
MAX_FILE_SIZE_BYTES = 1500 * 1024  # 100 KB

# Filändelser som troligen är text och bör inkluderas (om inte för stora)
# Detta är en *inkluderings*-lista om vi vill vara mer restriktiva,
# men vi använder just nu exkluderingslistan ovan. Kan användas för prioritering.
# LIKELY_TEXT_EXTENSIONS = {'.py', '.js', ...}

# --- Funktioner ---

def is_likely_text_file(filename, exclude_extensions):
    """Kollar om filen troligen är en textfil baserat på ändelse."""
    if '.' not in filename:
        # Filer utan ändelse (t.ex. Dockerfile, Makefile) är ofta text
        return True
    ext = os.path.splitext(filename)[1].lower()
    return ext not in exclude_extensions

def get_file_content(file_path, max_size):
    """Läser innehållet från en fil, med storleksgräns och felhantering."""
    try:
        if os.path.getsize(file_path) > max_size:
            return f"[Innehåll utelämnat - filen är större än {max_size // 1024} KB]"

        # Försök läsa med de vanligaste kodningarna
        encodings_to_try = ['utf-8', 'latin-1', 'cp1252']
        content = None
        last_exception = None

        for enc in encodings_to_try:
            try:
                with open(file_path, 'r', encoding=enc) as f:
                    content = f.read()
                break # Lyckades läsa
            except UnicodeDecodeError as e:
                last_exception = e
                continue # Försök med nästa kodning
            except Exception as e:
                # Andra läsfel
                return f"[Fel vid läsning av fil: {e}]"

        if content is None:
             return f"[Fel: Kunde inte avkoda filen med {', '.join(encodings_to_try)}. Senaste fel: {last_exception}]"
        return content

    except OSError as e:
        return f"[Fel: Kunde inte komma åt fil: {e}]"
    except Exception as e:
        return f"[Oväntat fel vid hantering av fil: {e}]"


def generate_context(start_path, exclude_dirs, exclude_extensions, include_content=False, specific_file=None):
    """Genererar kontext-strängen (trädstruktur och ev. filinnehåll)."""
    output = []
    files_to_include_content = []
    real_start_path = os.path.abspath(start_path)

    output.append(f"Projektets Rotmapp: {real_start_path}\n")
    output.append("=" * 30)
    output.append(" FIL- OCH MAPPSTRUKTUR")
    output.append("=" * 30)

    # Bygg trädstruktur
    tree = []
    for root, dirs, files in os.walk(real_start_path, topdown=True):
        # Filtrera bort ignorerade mappar *innan* vi går ner i dem
        dirs[:] = [d for d in dirs if d not in exclude_dirs and not d.startswith('.')] # Ignorerar även dolda mappar

        level = root.replace(real_start_path, '').count(os.sep)
        indent = ' ' * 4 * level
        tree.append(f"{indent}{os.path.basename(root)}/")
        subindent = ' ' * 4 * (level + 1)

        # Filtrera filer
        valid_files = [
            f for f in files
            if not f.startswith('.') # Ignorera dolda filer
            and is_likely_text_file(f, exclude_extensions)
        ]

        for f in sorted(valid_files): # Sortera filer för konsekvent ordning
            tree.append(f"{subindent}{f}")
            if include_content:
                 # Lägg till i listan för att hämta innehåll senare
                 files_to_include_content.append(os.path.join(root, f))

    output.append("\n".join(tree))
    output.append("\n" + "=" * 30 + "\n")

    # Inkludera filinnehåll om flaggan är satt eller specifik fil efterfrågas
    if specific_file:
        file_path = os.path.abspath(os.path.join(start_path, specific_file))
        if not os.path.exists(file_path):
             output.append(f"FEL: Den specifika filen '{specific_file}' hittades inte i '{start_path}'.")
        elif not os.path.isfile(file_path):
             output.append(f"FEL: Sökvägen '{specific_file}' är inte en fil.")
        elif not is_likely_text_file(os.path.basename(file_path), exclude_extensions):
             output.append(f"INFO: Filen '{specific_file}' verkar inte vara en textfil (baserat på ändelse), innehåll inkluderas ej.")
        else:
            output.append(f"INNEHÅLL FÖR SPECIFIK FIL:\n")
            output.append("-" * 30)
            # Använd relativ sökväg för tydlighet i outputen
            relative_path = os.path.relpath(file_path, real_start_path)
            output.append(f"Fil: {relative_path}")
            output.append("-" * 30 + "\n")
            # Bestäm språk för markdown-syntax highlighting (förenklad)
            lang = os.path.splitext(relative_path)[1].lower().lstrip('.')
            output.append(f"```{lang if lang else ''}") # Lägg till språktagg om ändelse finns
            output.append(get_file_content(file_path, MAX_FILE_SIZE_BYTES))
            output.append("```")
            output.append("\n" + "=" * 30 + "\n")

    elif include_content:
        if not files_to_include_content:
             output.append("INFO: Inga textfiler hittades att inkludera innehåll från.")
        else:
            output.append(f"FILINNEHÅLL (Max {MAX_FILE_SIZE_BYTES // 1024} KB per fil):\n")
            for file_path in sorted(files_to_include_content): # Sortera för konsekvent ordning
                relative_path = os.path.relpath(file_path, real_start_path)
                output.append("-" * 30)
                output.append(f"Fil: {relative_path}")
                output.append("-" * 30 + "\n")
                 # Bestäm språk för markdown-syntax highlighting (förenklad)
                lang = os.path.splitext(relative_path)[1].lower().lstrip('.')
                output.append(f"```{lang if lang else ''}")
                output.append(get_file_content(file_path, MAX_FILE_SIZE_BYTES))
                output.append("```\n")
            output.append("\n" + "=" * 30 + "\n")


    # Lägg till en mall för prompten till Gemini
    output.append("UPPGIFT TILL GEMINI:")
    output.append("-" * 30)
    output.append("[Beskriv här vad du vill att Gemini ska göra med ovanstående kontext.]")
    output.append("Exempel:")
    output.append("- Sammanfatta projektets syfte och huvudkomponenter.")
    output.append("- Identifiera alla dependencies listade i [filnamn, t.ex. package.json].")
    output.append("- Förklara funktionen [funktionsnamn] i filen [filnamn].")
    output.append("- Ge förslag på refaktorering av koden i [filnamn].")
    output.append("- Baserat på strukturen, hur skulle jag implementera [ny funktion]?")
    output.append("-" * 30)


    return "\n".join(output)

# --- Huvudlogik & Interaktiv Meny ---
def main():
    parser = argparse.ArgumentParser(
        description="""Genererar kontext för ett kodprojekt (filstruktur och innehåll)
                     för att enkelt kunna klistra in i en AI-chatt (t.ex. Gemini).
                     Ignorerar vanliga ointressanta mappar och filer.""",
        formatter_class=argparse.RawTextHelpFormatter
    )
    parser.add_argument(
        "directory",
        nargs='?', # Gör argumentet valfritt för att kunna visa meny först
        help="Sökvägen till mappen som ska analyseras."
    )
    parser.add_argument(
        "--exclude-dirs",
        nargs='+',
        default=list(DEFAULT_EXCLUDE_DIRS),
        help=f"Extra mappar att ignorera. Standard: {', '.join(DEFAULT_EXCLUDE_DIRS)}"
    )
    parser.add_argument(
        "--exclude-exts",
        nargs='+',
        default=list(DEFAULT_EXCLUDE_EXTENSIONS),
        help=f"Extra filändelser att ignorera. Standard: {', '.join(DEFAULT_EXCLUDE_EXTENSIONS)}"
    )
    parser.add_argument(
        "-o", "--output",
        help="Valfri fil att spara utdatan till (istället för att skriva till terminalen)."
    )

    args = parser.parse_args()

    target_dir = args.directory
    exclude_dirs_set = set(args.exclude_dirs)
    exclude_exts_set = set(args.exclude_exts)

    # Om ingen mapp angavs, fråga efter den
    if not target_dir:
        try:
            target_dir = input("Ange sökvägen till mappen du vill analysera: ").strip()
        except EOFError: # Hantera om input stream stängs (t.ex. Ctrl+D)
             print("\nAvslutar.")
             sys.exit(0)
        except KeyboardInterrupt:
             print("\nAvbrutet av användare.")
             sys.exit(0)


    # Validera mappen
    if not target_dir or not os.path.isdir(target_dir):
        print(f"FEL: Mappen '{target_dir}' hittades inte eller är inte en giltig mapp.", file=sys.stderr)
        sys.exit(1)

    # Interaktiv meny
    while True:
        print("\n--- Vad vill du generera? ---")
        print("1. Endast fil- och mappstruktur (Trädvy)")
        print("2. Struktur + Allt textinnehåll (VARNING: Kan bli mycket stort!)")
        print("3. Struktur + Innehåll från en specifik fil")
        print("q. Avsluta")

        try:
            choice = input("Ditt val: ").strip().lower()
        except EOFError:
            choice = 'q'
        except KeyboardInterrupt:
            print("\nAvbrutet av användare.")
            sys.exit(0)


        output_content = None
        specific_file_rel_path = None # Relativ sökväg från target_dir

        if choice == '1':
            output_content = generate_context(target_dir, exclude_dirs_set, exclude_exts_set, include_content=False)
            break
        elif choice == '2':
            print("\nVARNING: Detta kan generera en mycket stor mängd text.")
            confirm = input("Är du säker på att du vill fortsätta? (j/n): ").strip().lower()
            if confirm == 'j' or confirm == 'y':
                 print("Genererar struktur och allt textinnehåll...")
                 output_content = generate_context(target_dir, exclude_dirs_set, exclude_exts_set, include_content=True)
                 break
            else:
                 print("Avbryter.")
                 continue # Tillbaka till menyn
        elif choice == '3':
            try:
                 specific_file_rel_path = input(f"Ange relativ sökväg till filen inom '{os.path.basename(target_dir)}' (t.ex. src/main.py): ").strip()
            except EOFError:
                 print("\nAvslutar.")
                 sys.exit(0)
            except KeyboardInterrupt:
                 print("\nAvbrutet av användare.")
                 sys.exit(0)

            if specific_file_rel_path:
                 output_content = generate_context(target_dir, exclude_dirs_set, exclude_exts_set, include_content=False, specific_file=specific_file_rel_path)
                 break
            else:
                 print("Ingen fil angiven.")
                 continue # Tillbaka till menyn
        elif choice == 'q':
            print("Avslutar.")
            sys.exit(0)
        else:
            print("Ogiltigt val, försök igen.")

    # Skriv ut eller spara resultatet
    if output_content:
        if args.output:
            try:
                with open(args.output, 'w', encoding='utf-8') as f:
                    f.write(output_content)
                print(f"\nKontext sparad till filen: {args.output}")
            except IOError as e:
                print(f"\nFEL: Kunde inte skriva till filen {args.output}: {e}", file=sys.stderr)
                # Skriv ut till terminalen istället som fallback
                print("\n--- Genererad Kontext ---")
                print(output_content)
        else:
            print("\n--- Genererad Kontext (redo att kopieras till Gemini) ---")
            print(output_content)
            print("\nTips: Markera och kopiera texten ovanför.")

if __name__ == "__main__":
    main()
