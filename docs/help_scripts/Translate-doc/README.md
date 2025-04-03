# translate_to_english.py

## Översikt

`translate_to_english.py` är ett Python-skript som används för att översätta Markdown-filer från svenska till engelska för Docusaurus-projektet "InnerJourney". Skriptet är utformat för att:

- Översätta både front matter och innehållet i `.md`-filer till korrekt och naturlig engelska.
- Behålla Markdown-formateringen (t.ex. rubriker, listor, kodblock) under översättningen.
- Behålla befintliga taggar och författare från `tags.yml` och `authors.yml` för blogginlägg.
- Spara de översatta filerna i samma mapp som originalfilen, men med suffixet `_en.md` (t.ex. `dokument.md` blir `dokument_en.md`).

### Funktioner
- Körs i den mapp där det ligger och bearbetar rekursivt alla `.md`-filer i den mappen och dess undermappar.
- Använder Gemini API för att översätta text från svenska till engelska.
- Använder styrdokument i `/home/joelkvarnsmyr/projects/innerjourney/docs/help_scripts/X_styrdokument` som kontext för att ge Gemini en förståelse för projektets helhet och formateringsriktlinjer.
- Läser in befintliga taggar och författare från `/home/joelkvarnsmyr/projects/innerjourney/docs/blog/tags.yml` och `/home/joelkvarnsmyr/projects/innerjourney/docs/blog/authors.yml` för att säkerställa att blogginlägg behåller korrekta metadata.
- Hoppar över redan översatta filer (filer som slutar med `_en.md`).

## Krav

- **Python 3.10+**
- **Beroenden**:
  - `python-frontmatter`: För att hantera front matter i Markdown-filer.
  - `google-generativeai`: För att använda Gemini API.
  - `pyyaml`: För att läsa in taggar och författare från YAML-filer.
- **API-nyckel**: En giltig API-nyckel för Gemini API, som du hämtar från Google AI Studio (se instruktioner nedan).
- **Styrdokument**: Skriptet förväntar sig att styrdokument finns i `/home/joelkvarnsmyr/projects/innerjourney/docs/help_scripts/X_styrdokument`. Dessa används för att ge Gemini kontext om projektets struktur och formateringsriktlinjer.
- **Taggar och författare**: Skriptet förväntar sig att taggar och författare finns i `/home/joelkvarnsmyr/projects/innerjourney/docs/blog/tags.yml` och `/home/joelkvarnsmyr/projects/innerjourney/docs/blog/authors.yml` för blogginlägg.

Installera beroenden:
```bash
pip install python-frontmatter google-generativeai pyyaml
Hämta API-nyckel från Google AI Studio
Gå till Google AI Studio.
Logga in med ditt Google-konto.
Skapa en ny API-nyckel eller kopiera en befintlig.
När du kör skriptet kommer du att bli ombedd att ange denna nyckel.
Användning
Du kan använda skriptet på två sätt beroende på om du vill översätta en enskild fil eller flera filer:

Alternativ 1: Översätta en enskild fil
Placera den .md-fil du vill översätta i samma mapp som skriptet (translate_to_english.py).
Kör skriptet:
bash

Collapse

Wrap

Copy
python translate_to_english.py
Ange din API-nyckel från Google AI Studio när du uppmanas.
Skriptet kommer att översätta den enskilda filen och spara den översatta versionen med suffixet _en.md (t.ex. dokument.md blir dokument_en.md).
Alternativ 2: Översätta flera filer (rekommenderas för mappar med flera filer)
Kopiera skriptet till den mapp där dina .md-filer finns (t.ex. docs/hr/).
Kör skriptet:
bash

Collapse

Wrap

Copy
python translate_to_english.py
Ange din API-nyckel från Google AI Studio när du uppmanas.
Skriptet kommer att:
Översätta alla .md-filer i den aktuella mappen och dess undermappar.
Spara de översatta filerna med suffixet _en.md i samma mapp som originalfilen.
Hoppa över redan översatta filer (filer som slutar med _en.md).
Exempel
Exempel 1: Översätta ett dokument utan front matter och Markdown-formatering
Innan:
Fil: 2025-04-01-arbetsmiljo-och-varderingar.md

text

Collapse

Wrap

Copy
Arbetsmiljö och värderingar

Version: 1.0
Datum: 2025-04-01
Författare: Bo Joel Kvarnsmyr
Senast reviderad av: Bo Joel Kvarnsmyr

Översikt

Arbetsmiljö och värderingar för Inner Journey definierar hur vi arbetar tillsammans som ett team – inklusive utvecklare, coacher och finansieringsansvariga – och hur vi säkerställer en miljö som främjar både produktivitet och välmående.
Efter:
Fil: 2025-04-01-arbetsmiljo-och-varderingar_en.md

text

Collapse

Wrap

Copy
Work Environment and Values

Version: 1.0
Date: 2025-04-01
Author: Bo Joel Kvarnsmyr
Last revised by: Bo Joel Kvarnsmyr

Overview

The work environment and values for Inner Journey define how we work together as a team – including developers, coaches, and funding managers – and how we ensure an environment that promotes both productivity and well-being.
Exempel 2: Översätta ett blogginlägg med front matter
Innan:
Fil: 2025-03-01-startskottet-for-inner-journey.md

text

Collapse

Wrap

Copy
---
id: startskottet-for-inner-journey
title: Startskottet för Inner Journey
description: Vårt första blogginlägg om hur projektet startade och vad vi siktar på.
slug: startskottet-for-inner-journey
authors: joelkvarnsmyr
date: 2025-03-01
tags: [inner-journey, start, vision]
---
# Startskottet för Inner Journey

## Introduktion

Vi är glada att lansera Inner Journey, ett projekt som syftar till att göra personlig utveckling tillgänglig för alla.
Efter:
Fil: 2025-03-01-startskottet-for-inner-journey_en.md

text

Collapse

Wrap

Copy
---
id: startskottet-for-inner-journey
title: The Launch of Inner Journey
description: Our first blog post about how the project started and what we aim for.
slug: startskottet-for-inner-journey
authors: joelkvarnsmyr
date: 2025-03-01
tags: [inner-journey, start, vision]
---
# The Launch of Inner Journey

## Introduction

We are excited to launch Inner Journey, a project aimed at making personal development accessible to everyone.
Begränsningar
Skriptet kräver en internetanslutning för att använda Gemini API.
Om Gemini API inte kan översätta texten korrekt, kan skriptet returnera originaltexten.
Om styrdokumenten i /home/joelkvarnsmyr/projects/innerjourney/docs/help_scripts/X_styrdokument är stora, kan prompten bli för lång för Gemini API, vilket kan leda till fel.
Skriptet översätter inte kodblock eller inline-kod, eftersom dessa antas vara språkoberoende.
Felsökning
API-fel: Kontrollera att API-nyckeln är korrekt och att du har en stabil internetanslutning.
Filnamnskonflikter: Skriptet lägger till suffixet _en.md för att undvika konflikter, men om en fil redan finns med det namnet kan du behöva ta bort den först.
Ogiltig front matter: Skriptet loggar felmeddelanden om front matter inte kan parsas.
Tomma filer: Skriptet hoppar över tomma filer eller filer som bara innehåller whitespace.
Styrdokument saknas: Kontrollera att mappen /home/joelkvarnsmyr/projects/innerjourney/docs/help_scripts/X_styrdokument finns och innehåller relevanta styrdokument.
Taggar eller författare saknas: Kontrollera att filerna /home/joelkvarnsmyr/projects/innerjourney/docs/blog/tags.yml och /home/joelkvarnsmyr/projects/innerjourney/docs/blog/authors.yml finns och är korrekt formaterade.
text

Collapse

Wrap

Copy

---

### **Testa och verifiera**

För att testa att det nya skriptet fungerar:

1. Skapa en undermapp i `docs/hr/` (t.ex. `docs/hr/subfolder/`) och placera en `.md`-fil där, t.ex.:
   **Fil:** `docs/hr/subfolder/policy-distansarbete.md`
Policy för distansarbete

Version: 1.0
Datum: 2025-04-01
Författare: Bo Joel Kvarnsmyr

Översikt

Denna policy definierar riktlinjer för distansarbete inom Inner Journey-teamet.

text

Collapse

Wrap

Copy

2. Kopiera `translate_to_english.py` till `docs/hr/`:
```bash
cp translate_to_english.py ~/projects/innerjourney/docs/hr/
Kör skriptet:
bash

Collapse

Wrap

Copy
cd ~/projects/innerjourney/docs/hr
/home/joelkvarnsmyr/projects/innerjourney/venv/bin/python translate_to_english.py
När du uppmanas, ange din API-nyckel från Google AI Studio.
Kontrollera att filen policy-distansarbete.md har översatts och sparats som policy-distansarbete_en.md i samma mapp.