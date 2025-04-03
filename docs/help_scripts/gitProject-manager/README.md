---
title: README
description: "Översikt över Python-skriptet `MarkDown-fix.py` för reformatering av Markdown-filer i InnerJourney-projektet."
slug: readme
tags: [readme, script, python, markdown, formatting, docusaurus]
---

# README 📖

## Översikt 📝

`MarkDown-fix.py` är ett Python-skript 🐍 som används för att reformatera Markdown-filer för Docusaurus-projektet "InnerJourney". Skriptet är särskilt utformat för att:

-   ⚙️ Konvertera dokument som saknar front matter och Markdown-formatering (t.ex. text kopierad från ett Word-dokument eller en AI-chatt) till korrekt formaterade Markdown-filer.
-   ✨ Formatera `README.md`-filer på ett enhetligt och snyggt sätt, med en anpassad struktur för att ge en tydlig översikt av projekt eller mappar.
-   📄 Bearbeta både blogginlägg (i `blog`-mappen) och dokument (i andra mappar) med korrekt front matter enligt Docusaurus riktlinjer.
-   📂 Körs i den mapp där det ligger och bearbetar rekursivt alla `.md`-filer i den mappen och dess undermappar.
-   🧐 Känner av om en fil är ett blogginlägg (i `blog`-mappen), ett dokument (i andra mappar), eller en `README.md`-fil och formaterar front matter därefter.
-   🤖 Använder Gemini API för att omvandla ren text till Markdown och reformatera befintligt Markdown-innehåll.
-   🧠 Använder styrdokument i `/home/joelkvarnsmyr/projects/innerjourney/docs/help_scripts/X_styrdokument` som kontext för att ge Gemini en förståelse för projektets helhet och formateringsriktlinjer.
-   📑 Genererar eller uppdaterar front matter enligt Docusaurus riktlinjer.
-   🏷️ Döper om filer (förutom `README.md`) till formatet `YYYY-MM-DD-slug.md`.

## Krav ✅

-   🐍 **Python 3.10+**
-   📦 **Beroenden**:
    -   `python-frontmatter`: För att hantera front matter i Markdown-filer.
    -   `google-generativeai`: För att använda Gemini API.
-   🔑 **API-nyckel**: En giltig API-nyckel för Gemini API (anges i variabeln `API_KEY` i skriptet).
-   📂 **Styrdokument**: Skriptet förväntar sig att styrdokument finns i `/home/joelkvarnsmyr/projects/innerjourney/docs/help_scripts/X_styrdokument`. Dessa används för att ge Gemini kontext om projektets struktur och formateringsriktlinjer.

Installera beroenden:
```bash
pip install python-frontmatter google-generativeai
```

## Användning ▶️

Du kan använda skriptet på två sätt beroende på om du vill bearbeta en enskild fil eller flera filer:

1.  **Alternativ 1: Bearbeta en enskild fil** 📄
    -   Placera den `.md`-fil du vill reformatera i samma mapp som skriptet (`MarkDown-fix.py`).
    -   Kör skriptet:
        ```bash
        python MarkDown-fix.py
        ```
    -   Skriptet kommer att reformatera den enskilda filen, lägga till front matter om det saknas, och döpa om den till `YYYY-MM-DD-slug.md` (förutom om det är en `README.md`-fil, som behåller sitt namn).

2.  **Alternativ 2: Bearbeta flera filer (rekommenderas för mappar med flera filer)** 🗂️
    -   Kopiera skriptet till den mapp där dina `.md`-filer finns (t.ex. `docs/hr/`).
    -   Kör skriptet:
        ```bash
        python MarkDown-fix.py
        ```
    -   Skriptet kommer att:
        -   Reformatera alla `.md`-filer i den aktuella mappen och dess undermappar.
        -   Omvandla ren text till Markdown om dokumentet saknar Markdown-formatering.
        -   Formatera `README.md`-filer med en enhetlig struktur.
        -   Generera eller uppdatera front matter enligt Docusaurus riktlinjer.
        -   Döpa om filer (förutom `README.md`) till `YYYY-MM-DD-slug.md`.

## Exempel ✨

### Exempel 1: Reformatera ett dokument utan front matter och Markdown-formatering

**Innan:**
Fil: `2025-04-01-arbetsmiljo-och-varderingar.md`
```text
Arbetsmiljö och värderingar

Version: 1.0
Datum: 2025-04-01
Författare: Bo Joel Kvarnsmyr
Senast reviderad av: Bo Joel Kvarnsmyr

Översikt

Arbetsmiljö och värderingar för Inner Journey definierar hur vi arbetar tillsammans som ett team – inklusive utvecklare, coacher och finansieringsansvariga – och hur vi säkerställer en miljö som främjar både produktivitet och välmående.
```

**Efter:**
Fil: `2025-04-01-arbetsmiljo-och-varderingar-2025.md`
```markdown
---
id: arbetsmiljo-och-varderingar-2025
title: Arbetsmiljö och värderingar
description: Definierar hur Inner Journey-teamet arbetar tillsammans och säkerställer en produktiv och välmående miljö, grundad i projektets värderingar.
slug: arbetsmiljo-och-varderingar-2025
sidebar_label: Arbetsmiljö och värderingar
sidebar_position: 10
tags: [hr, arbetsmiljo, varderingar]
---
# Arbetsmiljö och värderingar 📜

## Dokumentinformation

- **Version:** 1.0
- **Datum:** 2025-04-01 📅
- **Författare:** Bo Joel Kvarnsmyr ✍️
- **Senast reviderad av:** Bo Joel Kvarnsmyr 🔄

## Översikt

Arbetsmiljö och värderingar för Inner Journey definierar hur vi arbetar tillsammans som ett team – inklusive utvecklare, coacher och finansieringsansvariga – och hur vi säkerställer en miljö som främjar både produktivitet och välmående. 🌟
```

### Exempel 2: Formatera en `README.md`-fil

**Innan:**
Fil: `README.md`
```text
Projektöversikt

Detta är en README för mappen hr.

Syfte

Dokumenten i denna mapp beskriver HR-processer för Inner Journey-teamet.
```

**Efter:**
Fil: `README.md`
```markdown
---
id: readme
title: README
description: "Översikt över mappen hr."
slug: readme
tags: [readme, overview, hr]
---
# README 📖

## Översikt

Detta är en README för mappen `hr`. 📁

## Syfte

Dokumenten i denna mapp beskriver HR-processer för Inner Journey-teamet. 📝
```

## Begränsningar ⚠️

-   🌐 Skriptet kräver en internetanslutning för att använda Gemini API.
-   🤖 Om Gemini API inte kan generera en korrekt front matter, kan skriptet misslyckas för vissa filer.
-   📏 Om styrdokumenten i `/home/joelkvarnsmyr/projects/innerjourney/docs/help_scripts/X_styrdokument` är stora, kan prompten bli för lång för Gemini API, vilket kan leda till fel.
-   ❓ Om styrdokumentmappen inte finns, kommer skriptet att logga en varning och fortsätta utan styrdokumentens kontext.

## Felsökning 🐞

-   **API-fel:** Kontrollera att API-nyckeln är korrekt och att du har en stabil internetanslutning.
-   **Filnamnskonflikter:** Skriptet lägger till ett suffix (t.ex. `-1`, `-2`) om en fil redan finns med det nya namnet (gäller inte `README.md`-filer).
-   **Ogiltig front matter:** Skriptet loggar felmeddelanden om front matter inte kan parsas.
-   **Tomma filer:** Skriptet hoppar över tomma filer eller filer som bara innehåller whitespace.
-   **Styrdokument saknas:** Kontrollera att mappen `/home/joelkvarnsmyr/projects/innerjourney/docs/help_scripts/X_styrdokument` finns och innehåller relevanta styrdokument.

### Testa och verifiera ✅

För att testa att det uppdaterade skriptet fungerar med den nya absoluta sökvägen till styrdokumenten:

1.  Se till att styrdokumentmappen `/home/joelkvarnsmyr/projects/innerjourney/docs/help_scripts/X_styrdokument` finns och innehåller relevanta filer.
2.  Kör skriptet igen från mappen där `.md`-filerna finns (t.ex. `docs/docs/project/`):
    ```bash
    cd ~/projects/innerjourney/docs/docs/project
    /home/joelkvarnsmyr/projects/innerjourney/venv/bin/python MarkDown-fix.py
    ```
3.  Kontrollera att skriptet inte längre loggar en varning om att styrdokumentmappen inte hittades och att det kan fortsätta med att reformatera filerna.