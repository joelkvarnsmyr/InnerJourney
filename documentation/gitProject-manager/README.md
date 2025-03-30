# GitHub Project Manager Scripts för InnerJourney

## Översikt

Detta repository är en del av projektet `InnerJourney`, en AI-driven plattform för självutveckling och välmående. Repositoryt innehåller backend, frontend och dokumentation för `InnerJourney`, samt en samling Python-skript som är utformade för att automatisera hanteringen av GitHub Projects (ProjectV2) med hjälp av GitHubs GraphQL API.

Skripten finns i mappen `gitProject-manager` och gör det möjligt att:

*   Skapa nya projekt eller använda befintliga projekt i ett GitHub-repository.
*   Ladda upp uppgifter från `JSON`-filer till GitHub Projects.
*   Hantera fältvärden för uppgifter, såsom single select-fält (t.ex. status), textfält, numeriska fält och datumfält.
*   Rensa befintliga kort från ett projekt om så önskas.

Tanken bakom dessa skript är att förenkla och effektivisera hanteringen av uppgifter i GitHub Projects för `InnerJourney`-projektet. Ändamålet är att automatisera repetitiva arbetsuppgifter och säkerställa att projektinformation hålls organiserad och uppdaterad över olika faser av projektet, såsom `MoSCoW`-prioritering, sprintplanering, bidragssökning och administrativa uppgifter.

## Projektstruktur

Repositoryt är organiserat enligt följande struktur:

*   `idea/`: Innehåller idéer och koncept för `InnerJourney`.
*   `backend/`: Innehåller backend-kod, inklusive:
    *   `models/`: Databasmodeller.
    *   `routes/`: API-rutter.
    *   `services/`: Tjänster och affärslogik.
    *   `__init__.py`, `Dockerfile`, `main.py`, `requirements.txt`: Konfigurationsfiler för backend.
*   `documentation/`: Dokumentation för projektet, indelad i:
    *   `1_projektöversikt/`: Översikt av projektet.
    *   `2_användarupplevelse/`: Användarupplevelser.
    *   `3_teknisk_dokumentation/`: Teknisk dokumentation.
    *   `4_sakerhet_och_test/`: Säkerhet och testdokumentation.
    *   `5_loggar_och_backlog/`: Loggar och backlog.
    *   `6_ekonomi_och_administration/`: Ekonomi- och administrationsdokument.
    *   `7_todo/`: Att göra-listor.
*   `gitProject-manager/`: Innehåller skript för att hantera GitHub Projects:
    *   `admin.json` och `admin.py`: Hanterar administrativa uppgifter.
    *   `development.json` och `development.py`: Hanterar utvecklingsuppgifter organiserade i sprintar.
    *   `moscow.json` och `moscow.py`: Hanterar `MoSCoW`-prioriterade uppgifter.
    *   `bidrag.json` och `bidrag.py`: Hanterar uppgifter relaterade till bidragssökning och finansiering.
*   `X_styrdokument/`: Styrdokument för projektet.
*   `frontend/`: Innehåller frontend-kod (ännu inte detaljerad i strukturen).
*   `venv/`: Virtuell miljö för Python.
*   `.gitignore`, `git/`, `git.pub`, `README.md`: Konfigurationsfiler och dokumentation för repositoryt.

## Hur skripten fungerar

Skripten använder GitHubs GraphQL API för att interagera med `ProjectV2`-projekt. De läser in uppgifter från `JSON`-filer, kommunicerar med GitHub via autentiserade API-anrop och uppdaterar projektkort med relevant information.

Varje skript är anpassat för ett specifikt användningsfall men följer samma grundläggande arbetsflöde:

1.  Autentisering med ett personligt åtkomsttoken (`PAT`).
2.  Hämtning av befintliga `ProjectV2`-projekt från ett angivet repository.
3.  Användarinteraktion för att välja projekt och konfigurera alternativ (t.ex. rensa befintliga kort).
4.  Uppladdning och konfiguration av uppgifter baserat på data i en `JSON`-fil.

## Förutsättningar

För att använda skripten behöver du:

*   Ett GitHub-konto med behörighet att skapa och hantera projekt i ditt repository (`inner-journey`).
*   Ett personligt åtkomsttoken (`PAT`) med behörigheterna `project` och `repo`. Läs mer om hur du skapar ett PAT i [GitHubs dokumentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).
*   `Python 3.6` eller senare installerat.
*   En `.env`-fil med dina GitHub-uppgifter (se "Konfiguration" nedan).

## Installation

1.  Klona repositoryt:
    ```bash
    git clone https://github.com/joelkvarnsmyr/inner-journey.git
    cd inner-journey
    ```
2.  Navigera till skriptmappen:
    ```bash
    cd gitProject-manager
    ```
3.  Installera nödvändiga Python-paket:
    ```bash
    pip install requests python-dotenv
    ```
4.  Skapa en `.env`-fil i `gitProject-manager`-mappen med följande innehåll:
    ```text
    GITHUB_TOKEN=ditt_personliga_åtkomsttoken
    REPO_OWNER=joelkvarnsmyr
    REPO_NAME=inner-journey
    ```
    Ersätt `ditt_personliga_åtkomsttoken` med ditt `PAT`.

## Användning

Repositoryt innehåller tre huvudsakliga skript i mappen `gitProject-manager`, var och en anpassad för ett specifikt ändamål:

*   `moscow.py`: Hanterar `MoSCoW`-prioriterade uppgifter från `moscow.json`.
*   `development.py`: Hanterar utvecklingsuppgifter organiserade i `sprintar` från `development.json`.
*   `admin.py`: Hanterar administrativa uppgifter från `admin.json` (som kan inkludera `bidragssökning`).

### Steg för att använda skripten

1.  **Förbered en JSON-fil:**
    *   Skapa eller redigera `JSON`-filen (t.ex. `moscow.json`) med de uppgifter du vill ladda upp. Se "Konfiguration" för detaljer om filstrukturen.
    *   Se till att fälten i `JSON`-filen matchar de fält som finns i ditt GitHub Project.
2.  **Kör skriptet:**
    *   Öppna en terminal och navigera till `gitProject-manager`-mappen.
    *   Kör önskat skript, t.ex.:
        ```bash
        python moscow.py
        ```
3.  **Följ instruktionerna i terminalen:**
    *   Skriptet listar alla `ProjectV2`-projekt i ditt repository (`joelkvarnsmyr/inner-journey`). Välj ett projekt genom att ange dess nummer.
    *   Välj om du vill rensa befintliga kort från projektet (valfritt).
    *   Skriptet laddar sedan upp uppgifterna från `JSON`-filen och uppdaterar fältvärdena.

### Exempel på användning

*   **MoSCoW-prioritering:** Kör `moscow.py` för att ladda upp uppgifter från `moscow.json`. Skriptet sätter `status`-fältet till värden som `"Must have"`, `"Should have"`, etc., för att organisera uppgifter efter prioritet.
*   **Sprintplanering:** Kör `development.py` för att hantera uppgifter från `development.json`. Skriptet organiserar uppgifter i `sprintar` som `"Sprint 1"`, `"Sprint 2"`, etc., och sätter `status`-fältet till den aktuella sprinten.
*   **Administrativa uppgifter (inkl. bidragssökning):** Kör `admin.py` för att hantera administrativa uppgifter från `admin.json`, inklusive uppgifter för bidragssökning med fält som `funding_source` och `deadline`.

## Konfiguration

### JSON-filstruktur

`JSON`-filen måste innehålla uppgifter i ett format som matchar fälten i ditt GitHub Project. Här är exempel på strukturen för varje skript:

*   För `moscow.json` (`MoSCoW`-prioritering):
    ```json
    {
      "id": "task1",
      "title": "Implementera formulär för födelsedata",
      "description": "Skapa ett formulär där användaren anger födelsedatum, tid och plats.",
      "status": "Must have",
      "todos": "Todo",
      "estimate": 8,
      "start_date": "2025-04-29"
    }
    ```
*   För `development.json` (Sprintplanering):
    ```json
    {
      "id": "dev1",
      "title": "Sätta upp projektstruktur för backend",
      "description": "Skapa en grundläggande projektstruktur för backend med Node.js, Express och Firestore.",
      "status": "Sprint 1",
      "todos": "Todo",
      "estimate": 10,
      "start_date": "2025-04-01"
    }
    ```
*   För `admin.json` (Administrativa uppgifter och bidragssökning):
    ```json
    {
      "id": "bidrag1",
      "title": "Ansök om projektbidrag från Forte",
      "description": "Förbered och skicka en ansökan till Forte för forskning inom hälsa och välfärd.",
      "status": "Must have",
      "todos": "Todo",
      "funding_source": "Forte",
      "potential_amount": "2 000 000 SEK",
      "deadline": "2025-06-30"
    }
    ```

**Notera:** Anpassa fälten efter ditt projekts behov. För `Single select`-fält (t.ex. `status`), använd exakta värden som matchar alternativen i GitHub.

### Konfigurera GitHub Project

Ditt GitHub Project måste ha fält som motsvarar `JSON`-filens struktur. Exempel på fält:

*   `Status` (`Single select`):
    *   För `MoSCoW`: `"Must have"`, `"Should have"`, `"Could have"`, `"Won't have"`.
    *   För Development: `"Sprint 1"`, `"Sprint 2"`, `"Sprint 3"`, osv.
*   `Todos` (`Single select`): `"Todo"`, `"In Progress"`, `"Done"`.
*   `Estimate` (`Number`): För tidsskattningar.
*   `Start date` (`Date`): För startdatum.
*   `Funding Source` (`Text`): För bidragssökning (endast i `admin.json`).
*   `Potential Amount` (`Text`): För bidragssökning (endast i `admin.json`).
*   `Deadline` (`Date`): För bidragssökning (endast i `admin.json`).

Skapa eller redigera fält i GitHub:

1.  Gå till ditt projekt i GitHub.
2.  Klicka på `Settings` > `Custom fields`.
3.  Lägg till fält enligt dina behov.

## Felsökning

*   **"Saknar miljövariabler"**: Kontrollera att `.env`-filen i `gitProject-manager`-mappen innehåller `GITHUB_TOKEN`, `REPO_OWNER` och `REPO_NAME`.
*   **"401 Unauthorized"**: Ditt `PAT` saknar behörigheter (`project`, `repo`) eller är ogiltigt. Skapa ett nytt `PAT`.
*   **"Kunde inte hitta alternativet..."**: Värden i `JSON` matchar inte GitHubs fältalternativ. Kontrollera stavning och skiftläge (case sensitivity).
*   **Inga projekt hittades**: Se till att du har skapat ett `ProjectV2`-projekt i ditt repository (`joelkvarnsmyr/inner-journey`).

För mer hjälp, kontrollera terminalutskrifter från skriptet.

## Bidrag

Vill du bidra? Gör så här:

1.  Forka repositoryt.
2.  Skapa en ny branch för dina ändringar (`git checkout -b feature/din-feature`).
3.  Gör dina ändringar och committa dem (`git commit -m 'Add some feature'`).
4.  Pusha till branchen (`git push origin feature/din-feature`).
5.  Skicka en pull request med en tydlig beskrivning av dina ändringar.

För frågor, öppna ett issue i repositoryt eller kontakta projektägaren (`joelkvarnsmyr`).