# docs/rename_to_english.py
import os
import re
from pathlib import Path

# Rotmapp för projektet
root_dir = Path("/home/joelkvarnsmyr/projects/innerjourney/docs")

# Mappning av svenska namn till engelska
name_mapping = {
    # Mappar i src/pages/
    "investeringsmojligheter": "investment-opportunities",
    "partners-och-medarbetare": "partners-and-team",
    # Blogginlägg i blog/ (efter att ha fixat dubbla datum)
    "2025-01-01-att-stiga-vidare-nr-drmmar-blir-verklighet.md": "2025-01-01-moving-forward-when-dreams-become-reality.md",
    "2025-01-01-en-stabil-grund-och-en-blick-mot-framtiden.md": "2025-01-01-a-solid-foundation-and-a-look-to-the-future.md",
    "2025-01-01-ett-steg-in-i-ovissheten-vad-hnder-nr-vi-vgar-drmma-stort.md": "2025-01-01-a-step-into-the-unknown-what-happens-when-we-dare-to-dream-big.md",
    "2025-01-01-frn-kod-till-knsla-hur-vi-byggde-inner-journeys-hjrta.md": "2025-01-01-from-code-to-feeling-how-we-built-inner-journeys-heart.md",
    "2025-01-01-jakten-p-de-bsta-bgarna-hur-finansierar-vi-en-drm.md": "2025-01-01-the-hunt-for-the-best-start-how-do-we-finance-a-dream.md",
    "2025-01-01-nr-koden-fr-liv-en-prototyp-fds.md": "2025-01-01-when-the-code-comes-to-life-a-prototype-is-born.md",
    "2025-01-01-rsta-versionprototyp-nr-drmmen-blev-digital.md": "2025-01-01-first-version-prototype-when-dreams-became-digital.md",
    "2025-01-01-skomakarens-barn-varfr-det-r-viktigt-att-leva-som-man-lr.md": "2025-01-01-the-cobblers-children-why-its-important-to-live-as-you-preach.md",
    "2025-01-01-urfar-p-framtidens-vg-hur-ser-marknaden-ut.md": "2025-01-01-exploring-the-path-to-the-future-what-does-the-market-look-like.md",
    # Dokument i docs/docs/tech-spec/
    "2025-04-01-backend-teknisk-dokumentation-2025.md": "2025-04-01-backend-technical-documentation-2025.md",
    "2025-04-01-databasstruktur-2025.md": "2025-04-01-database-structure-2025.md",
    "2025-04-01-frontend-setup-utveckling-och-deployment-2025.md": "2025-04-01-frontend-setup-development-and-deployment-2025.md",
    # Dokument i docs/docs/marketing/
    "2025-04-01-konkurrensanalys-2-marknadsposition-fr-innerjourney-2025.md": "2025-04-01-competitive-analysis-2-market-position-for-innerjourney-2025.md",
    "2025-04-01-konkurrentanalys-1-2025.md": "2025-04-01-competitor-analysis-1-2025.md",
    "2025-04-01-marknadsanalys-innerjourney-2025.md": "2025-04-01-market-analysis-innerjourney-2025.md",
    "2025-04-01-snabba-hisspichar-2025.md": "2025-04-01-quick-elevator-pitches-2025.md",
    "2025-04-01-swot-analys-fr-innerjourney-2025.md": "2025-04-01-swot-analysis-for-innerjourney-2025.md",
    "2025-04-01-unikt-vrdeerbjudande-usp-2025.md": "2025-04-01-unique-value-proposition-usp-2025.md",
    # Dokument i docs/docs/hr/
    "2025-04-01-arbetsmilj-och-vrderingar-2025.md": "2025-04-01-work-environment-and-values-2025.md",
    "2025-04-01-coaching-certifieringsprogram-2025.md": "2025-04-01-coaching-certification-program-2025.md",
    "2025-04-01-medarbetarutvecklingsplan-2025.md": "2025-04-01-employee-development-plan-2025.md",
    "2025-04-01-onboarding-process-fr-nya-medarbetare-2025.md": "2025-04-01-onboarding-process-for-new-employees-2025.md",
    "2025-04-01-policy-fr-distansarbete-2025.md": "2025-04-01-remote-work-policy-2025.md",
    "2025-04-01-prestationshantering-och-feedback-2025.md": "2025-04-01-performance-management-and-feedback-2025.md",
    "2025-04-01-rekryteringsguide-2025.md": "2025-04-01-recruitment-guide-2025.md",
    "2025-04-01-riktlinjer-fr-community-interaktion-2025.md": "2025-04-01-guidelines-for-community-interaction-2025.md",
    # Dokument i docs/docs/ux/
    "2025-04-01-aktiveringar-activations-2025.md": "2025-04-01-activations-2025.md",
    "2025-04-01-anvndarflde-r1-2025.md": "2025-04-01-user-flow-r1-2025.md",
    "2025-04-01-anvndargrnssnitt-ui-2025.md": "2025-04-01-user-interface-ui-2025.md",
    "2025-04-01-onboarding-r2-vision-och-flde-2025.md": "2025-04-01-onboarding-r2-vision-and-flow-2025.md",
    # Dokument i docs/docs/project/
    "2025-04-01-coaching-strategi-2025.md": "2025-04-01-coaching-strategy-2025.md",
    "2025-04-01-forskningsinitiativ-2025.md": "2025-04-01-research-initiatives-2025.md",
    "2025-04-01-projektbeskrivning-2025.md": "2025-04-01-project-description-2025.md",
    "2025-04-01-utvecklingsstrategi-2025.md": "2025-04-01-development-strategy-2025.md",
    "2025-04-01-visionar-grund-1.md": "2025-04-01-visionary-foundation-1.md",
    # Dokument i docs/docs/security-test/
    "2025-04-01-skerhetsdokument-2025.md": "2025-04-01-security-document-2025.md",
    "2025-04-01-testplan-2025.md": "2025-04-01-test-plan-2025.md",
    # Dokument i docs/docs/finance/
    "2025-04-01-budget-mvp-frsta-rets-drift-2025.md": "2025-04-01-budget-mvp-first-year-operations-2025.md",
    "2025-04-01-finansieringsmjligheter-2025.md": "2025-04-01-financing-opportunities-2025.md",
    "2025-04-01-finansieringsstrategi-2025.md": "2025-04-01-financing-strategy-2025.md",
    "2025-04-01-handlingsplan-2025.md": "2025-04-01-action-plan-2025.md",
    "2025-04-01-intktsmodell-och-roi-2025.md": "2025-04-01-revenue-model-and-roi-2025.md",
    "2025-04-01-investerarrapport-v15-2025.md": "2025-04-01-investor-report-v15-2025.md",
    "2025-04-01-kapitalbehov-2025.md": "2025-04-01-capital-needs-2025.md",
}

# Funktion för att fixa dubbla datum i filnamn
def fix_double_dates(filename):
    # Matcha mönster som 2025-01-01-2025-01-01-
    match = re.match(r"(\d{4}-\d{2}-\d{2})-(\d{4}-\d{2}-\d{2})-(.+)", filename)
    if match:
        # Behåll bara det första datumet
        return f"{match.group(1)}-{match.group(3)}"
    return filename

# Funktion för att byta namn på en fil eller mapp
def rename_file_or_dir(old_path, new_path):
    try:
        os.rename(old_path, new_path)
        print(f"Renamed: {old_path} -> {new_path}")
    except Exception as e:
        print(f"Error renaming {old_path} to {new_path}: {e}")

# Funktion för att rekursivt gå igenom mappar och byta namn
def process_directory(directory):
    for entry in os.scandir(directory):
        old_path = Path(entry.path)
        # Fixa dubbla datum i filnamn
        fixed_name = fix_double_dates(entry.name)
        if fixed_name != entry.name:
            fixed_path = old_path.parent / fixed_name
            rename_file_or_dir(old_path, fixed_path)
            # Uppdatera old_path till det nya namnet efter att ha fixat datumet
            old_path = fixed_path
            # Uppdatera entry.name för att matcha det nya namnet
            entry_name = fixed_name
        else:
            entry_name = entry.name

        # Kontrollera om det nya namnet (efter att ha fixat datum) finns i mappningen
        new_name = name_mapping.get(entry_name)
        if new_name:
            new_path = old_path.parent / new_name
            rename_file_or_dir(old_path, new_path)
        else:
            # Om det inte finns i mappningen, behåll det fixade namnet
            new_path = old_path

        # Om det är en mapp, gå rekursivt in i den
        if os.path.isdir(new_path):
            process_directory(new_path)

# Huvudfunktion för att köra skriptet
def main():
    print("Starting renaming process...")
    process_directory(root_dir)
    print("Renaming process completed.")

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"Error in renaming process: {e}")
        exit(1)