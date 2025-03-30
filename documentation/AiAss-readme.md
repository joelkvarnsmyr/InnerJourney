# Användarmanual för AiAss.py

## Översikt

`AiAss.py` är ett Python-script utvecklat för projektet "InnerJourney". Det fungerar som en AI-assistent för att hantera teknisk dokumentation och besvara frågor relaterade till projektet. Scriptet använder Google Gemini API för att generera och formatera Markdown-dokument samt svara på frågor baserat på projektets kod och befintliga dokumentation.

Det är designat för att köras från kommandoraden och stödjer flera användningslägen för att underlätta dokumentationsarbetet. Denna manual beskriver hur du installerar, konfigurerar och använder scriptet, inklusive praktiska exempel för varje läge.

---

## Förutsättningar

### Krav

För att kunna köra `AiAss.py` behöver du följande:

*   **Python:** Version `3.10` eller högre.
*   **Google Cloud-projekt:** Ett aktivt projekt (t.ex. `innerjourney-c007e`) med `Secret Manager API` aktiverat.
*   **Gemini API-nyckel:** En giltig API-nyckel för Google Gemini, lagrad i Google Cloud Secret Manager under namnet `gemini-api-key` i ditt projekt.
*   **Beroenden:** Nödvändiga Python-bibliotek installerade (se nedan).

### Installation

Följ dessa steg för att sätta upp din miljö:

1.  **Klona projektet** (om du inte redan har det):
    ```bash
    git clone git@github.com:joelkvarnsmyr/InnerJourney.git
    cd InnerJourney
    ```

2.  **Skapa en virtuell miljö** (rekommenderas för att isolera beroenden):
    ```bash
    python3.10 -m venv venv
    source venv/bin/activate  # På Windows: venv\Scripts\activate
    ```

3.  **Installera beroenden:** Skapa en fil `requirements.txt` (om den inte redan finns) med följande innehåll:
    ```text
    google-generativeai
    google-cloud-secret-manager
    ```
    Kör sedan installationen:
    ```bash
    pip install -r requirements.txt
    ```

4.  **Placera scriptet:** Säkerställ att `AiAss.py` finns i mappen `documentation/` inom projektets rot.

### Konfiguration

*   **Google Cloud Secret Manager:** Lägg till din Gemini API-nyckel som ett secret med namnet `gemini-api-key` i ditt Google Cloud-projekt (t.ex. `innerjourney-c007e`).
*   **Behörigheter:** Se till att det servicekonto eller den användare som kör scriptet har IAM-rollen `Secret Manager Secret Accessor` för att kunna hämta API-nyckeln.
*   **Projektstruktur:** Scriptet förväntar sig att köras från projektets rotmapp (`InnerJourney/`) eller från `documentation/`-mappen. Det förutsätter också att styrdokument (master context) finns i undermappar till `documentation/` (t.ex. `documentation/X_styrdokument/`).

## Användning

`AiAss.py` körs från kommandoraden. Du anger vilket läge du vill använda med hjälp av olika flaggor. Det finns fyra huvudsakliga lägen:

*   `--create-doc`: Skapar ett nytt Markdown-dokument baserat på ett angivet ämne.
*   `--create-doc-from-text`: Skapar ett Markdown-dokument från text som matas in via `stdin`.
*   `--reformat-doc`: Formaterar om en befintlig Markdown-fil för bättre struktur och läsbarhet.
*   `--ask`: Ställer en fråga och får ett svar baserat på innehållet i specificerade kod- och dokumentationsfiler.

### Grundläggande syntax

```bash
python documentation/AiAss.py [läge] [argument]
```

Använd `--help` för att se en fullständig lista över tillgängliga flaggor och deras beskrivningar:

```bash
python documentation/AiAss.py --help
```

## Lägen och Exempel

### 1. Skapa Nytt Dokument från Ämne (`--create-doc`)

Genererar ett nytt Markdown-dokument baserat på ett ämne du anger och sparar det i en specificerad dokumentationskategori.

**Syntax:**

```bash
python documentation/AiAss.py --create-doc --category <kategori> --topic "<ämne>"
```

**Argument:**

*   `--category <kategori>`: Ange kategorins nummer eller namn (t.ex. `3` eller `teknisk`). Se listan nedan.
*   `--topic "<ämne>"`: Ämnet för dokumentet. Använd citattecken om ämnet innehåller mellanslag.

**Kategorier:**

*   `1` eller `projektoversikt`: Projektöversikt
*   `2` eller `anvandarupplevelse`: Användarupplevelse
*   `3` eller `teknisk`: Teknisk dokumentation
*   `4` eller `sakerhet`: Säkerhet och test
*   `5` eller `loggar`: Loggar och backlog
*   `6` eller `ekonomi`: Ekonomi och administration
*   `7` eller `marknad`: Marknadsstrategi
*   `8` eller `todo`: To-do

**Exempel:**

Skapa ett dokument om "API-design för InnerJourney" i kategorin "Teknisk dokumentation":

```bash
python documentation/AiAss.py --create-doc --category 3 --topic "API-design för InnerJourney"
```

*Resultat:* En fil med ett namn liknande `api-design_for_innerjourney.md` skapas i mappen `documentation/3_teknisk_dokumentation/`.

### 2. Skapa Dokument från Text (`--create-doc-from-text`)

Tar emot råtext via standard input (`stdin`), formaterar den till ett strukturerat Markdown-dokument och sparar det i en vald kategori.

**Syntax:**

```bash
echo "<text>" | python documentation/AiAss.py --create-doc-from-text --category <kategori>
```

**Argument:**

*   `--category <kategori>`: Ange kategorins nummer eller namn (samma som ovan).

**Exempel:**

Skapa ett dokument från en textsträng i kategorin "Projektöversikt":

```bash
echo "Detta är en översikt av projektet. Vi använder FastAPI och React." | python documentation/AiAss.py --create-doc-from-text --category 1
```

*Obs:* För längre texter kan du mata in text direkt i terminalen och avsluta med `Ctrl+D` (Unix/macOS) eller `Ctrl+Z` följt av `Enter` (Windows).

*Resultat:* En fil med ett namn baserat på textens början (t.ex. `detta_ar_en_oversikt_av_projektet.md`) skapas i `documentation/1_projektoversikt/`.

### 3. Reformatera Befintligt Dokument (`--reformat-doc`)

Läser en befintlig Markdown-fil, låter AI:n förbättra dess struktur och formatering baserat på projektets kontext, och skriver sedan över originalfilen med den förbättrade versionen.

**Syntax:**

```bash
python documentation/AiAss.py --reformat-doc [--source-file "<sökväg/till/fil.md>"]
```

**Argument:**

*   `--source-file "<sökväg/till/fil.md>"` (valfritt): Ange den exakta sökvägen till filen som ska reformateras (relativt från projektets rotmapp). Om denna flagga utelämnas, visas en interaktiv lista där du kan välja filen.

**Exempel 1: Reformatera en specifik fil**

```bash
python documentation/AiAss.py --reformat-doc --source-file "documentation/3_teknisk_dokumentation/api-design.md"
```

**Exempel 2: Reformatera med interaktiv väljare**

```bash
python documentation/AiAss.py --reformat-doc
```

Följ instruktionerna i terminalen för att välja en fil från den presenterade listan.

### 4. Ställ en Fråga (`--ask`)

Låter dig ställa en fråga på naturligt språk. AI:n använder innehållet från specificerade kodfiler och/eller dokumentationsfiler som kontext för att generera ett svar.

**Syntax:**

```bash
python documentation/AiAss.py --ask --question "<fråga>" [--code-file "<kodfil>"] [--doc-file "<dokumentfil>"] [--pick-doc]
```

**Argument:**

*   `--question "<fråga>"`: Frågan du vill ställa (inom citattecken).
*   `--code-file "<kodfil>"` (valfritt, kan upprepas): Sökväg till en kodfil (relativt från projektets rotmapp) som ska användas som kontext.
*   `--doc-file "<dokumentfil>"` (valfritt, kan upprepas): Sökväg till en dokumentationsfil (relativt från `documentation/`-mappen) som ska användas som kontext.
*   `--pick-doc` (valfritt): Visar en interaktiv lista där du kan välja en eller flera dokumentationsfiler att inkludera som kontext.

**Exempel 1: Fråga om en specifik kodfil**

```bash
python documentation/AiAss.py --ask --question "Vad gör funktionen generate_doc_markdown?" --code-file "documentation/AiAss.py"
```

**Exempel 2: Fråga med både dokumentfil och interaktivt val**

```bash
python documentation/AiAss.py --ask --question "Hur deployar man backend till Cloud Run?" --doc-file "documentation/3_teknisk_dokumentation/OnboardingBackend.md" --pick-doc
```

*Resultat:* Scriptet skriver ut AI:ns svar på din fråga i terminalen.

## Tips och Felsökning

### Allmänna Tips

*   **Loggning:** Scriptet skriver loggar till terminalen (standardnivå är `INFO`). För mer detaljerad output (t.ex. för felsökning), kör scriptet och pipelinera `stderr` till `grep` för `DEBUG`:
    ```bash
    python documentation/AiAss.py --<läge> ... 2>&1 | grep DEBUG
    ```
*   **Kategorier:** Om du är osäker på vilken kategori ett dokument tillhör, använd det nummer eller namn som känns mest relevant. Du kan alltid flytta filen manuellt senare.
*   **Filnamn:** Genererade filnamn baseras på ämnet (för `--create-doc`) eller textens början (för `--create-doc-from-text`). De konverteras automatiskt till ett "slug-format" (små bokstäver, bindestreck istället för mellanslag, t.ex. `api-design.md`).

### Vanliga Problem

*   **"API-nyckel saknas eller är ogiltig"**:
    *   Kontrollera att ett secret med namnet `gemini-api-key` existerar i ditt Google Cloud-projekts Secret Manager.
    *   Verifiera att det servicekonto eller den användare som kör scriptet har rollen `Secret Manager Secret Accessor`.
    *   Se till att du är korrekt autentiserad mot Google Cloud (`gcloud auth login` eller motsvarande).
*   **"Modellen hittades inte"**:
    *   Scriptet kan vara konfigurerat att använda en specifik Gemini-modell (t.ex. en experimentell version). Kontrollera modellnamnet i `AiAss.py`-koden och byt eventuellt till en stabil version som `gemini-1.5-pro-latest` om problem uppstår.
*   **"Ingen fil hittades" (för `--reformat-doc` eller `--ask`)**:
    *   Kontrollera att sökvägen till filen (`--source-file`, `--code-file`, `--doc-file`) är korrekt angiven relativt till projektets rotmapp eller `documentation/`-mappen.
    *   Använd den interaktiva väljaren (`--reformat-doc` utan `--source-file`, eller `--ask` med `--pick-doc`) för att säkerställa att du väljer en existerande fil.
*   **"Permission denied"**:
    *   Se till att du har skrivrättigheter i den mapp där scriptet försöker skapa eller modifiera filer (vanligtvis under `documentation/`).
    *   Undvik att köra scriptet med `sudo` om det inte är absolut nödvändigt.

## Tekniska Detaljer

*   **Gemini API:** Interaktion med AI:n sker via `google-generativeai`-biblioteket.
*   **Master Context:** Scriptet läser automatiskt innehållet i filer under `documentation/X_styrdokument/` för att ge AI:n en övergripande kontext om projektets riktlinjer och terminologi, vilket säkerställer mer konsekventa resultat.
*   **Ignorerade Filer/Mappar:** Vid filsökning (t.ex. för interaktiva val) ignorerar scriptet automatiskt vanliga mappar och filer som `.git`, `venv`, `node_modules`, `__pycache__`, `.DS_Store`, etc.

För en djupare förståelse av scriptets implementation, se källkoden direkt i `documentation/AiAss.py`.

## Kontakt och Support

Om du har frågor, stöter på problem eller har förslag på förbättringar för `AiAss.py`, vänligen skapa ett ärende (Issue) i projektets GitHub-repository: [https://github.com/joelkvarnsmyr/InnerJourney/issues](https://github.com/joelkvarnsmyr/InnerJourney/issues).

---
*Senast uppdaterad: 2025-03-30*