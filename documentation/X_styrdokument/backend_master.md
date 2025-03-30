# Teknisk Dokumentation: InnerJourney Backend

Backend för InnerJourney är en API-tjänst byggd med `FastAPI` i `Python`. Den är designad för att stödja en plattform för personlig utveckling genom att hantera API-anrop från frontend, integrera med `Firebase Firestore` för datalagring och använda `Google Gemini` för AI-genererade insikter. Backend är containeriserad med `Docker` och deployad på `Google Cloud Run` för skalbarhet och enkel hantering.

Nedan följer en genomgång av kodbasen fil för fil, dess syfte och hur allt hänger ihop.

## Översikt över Kodbasen

Kodbasen består av följande huvudsakliga filer:

*   `main.py`: Startar FastAPI-applikationen och kopplar in Gemini-routern.
*   `gemini_service.py`: Hanterar interaktionen med Google Gemini för att generera personliga utvecklingssteg.
*   `firebase_service.py`: Hanterar datalagring i Firebase Firestore (saknar kod i ursprunglig beskrivning, men antas finnas).
*   `gemini.py`: Definierar API-endpoints relaterade till Gemini, t.ex. `/gemini/getActivation`.
*   `activation.py`: Innehåller Pydantic-modeller för datavalidering och serialisering.
*   `Dockerfile`: Beskriver hur Docker-containern byggs.
*   `requirements.txt`: Listar alla Python-beroenden.

## Fil-för-fil Beskrivning

### `main.py`

**Syfte:** Huvudfilen som initierar och startar FastAPI-servern samt sätter upp grundläggande routing.

**Innehåll:**
*   Importerar nödvändiga bibliotek: `FastAPI`, `uvicorn` och Gemini-routern från `backend.routes.gemini`.
*   Skapar en `FastAPI`-instans (`app`).
*   Inkluderar Gemini-routern med `app.include_router(gemini.router)`.
*   Definierar en enkel rot-endpoint (`GET /`) som returnerar `{"message": "Welcome to InnerJourney Backend"}`.
*   Hämtar portnummer från miljövariabeln `PORT` (standard är `8080`).
*   Startar servern med `uvicorn` och lyssnar på `host="0.0.0.0"`.

**Viktigt:** Att sätta `host="0.0.0.0"` gör servern tillgänglig externt, vilket är nödvändigt i containeriserade miljöer som `Cloud Run`.

### `gemini_service.py`

**Syfte:** Ansvarar för att kommunicera med Google Gemini API för att generera personliga utvecklingssteg baserat på användarinput.

**Innehåll:**
*   Importerar bibliotek som `google.cloud.secretmanager` och `google.generativeai`.
*   Sätter upp loggning med `logging` för att spåra operationer och potentiella fel.
*   Funktionen `get_secret` hämtar hemligheter (t.ex. Gemini API-nyckel) från Google Cloud Secret Manager.
*   Konfigurerar `genai` med den hämtade API-nyckeln.
*   Initierar en `GenerativeModel` (specifikt `"gemini-1.5-pro-latest"`).
*   Funktionen `generate_activation` tar emot `mood` (int) och `goal` (str), skapar en prompt för Gemini, och anropar modellen.
*   Returnerar ett JSON-formaterat svar från Gemini.
*   **Felhantering:** Implementerar en fallback som returnerar ett mockat svar (t.ex. `{"title": "Mock Step", "description": "This is a mock step..."}`) om anropet till Gemini misslyckas.

### `firebase_service.py`

**Syfte:** Hanterar all interaktion med Firebase Firestore, inklusive att spara och hämta data.

**Innehåll:** (Baserat på antaganden då koden saknas i ursprungsbeskrivningen)
*   Förväntas innehålla funktioner som `save_to_firestore` för att lagra data (t.ex. genererade activations) i Firestore.
*   Initierar Firebase Admin SDK, troligtvis med autentiseringsuppgifter hämtade från Secret Manager för säkerhet.
*   **Säkerhet:** Använder `Secret Manager` för att skydda känsliga autentiseringsuppgifter till Firebase.

### `gemini.py`

**Syfte:** Definierar API-endpoints specifikt för Gemini-relaterade funktioner.

**Innehåll:**
*   Skapar en `APIRouter` med prefixet `/gemini`.
*   Definierar en endpoint `POST /gemini/getActivation`:
    *   Tar emot en `ActivationRequest` (valideras automatiskt av Pydantic).
    *   Anropar `generate_activation` från `gemini_service.py`.
    *   Parsar det returnerade JSON-svaret från Gemini.
    *   Anropar `save_to_firestore` (från `firebase_service.py`) för att spara resultatet.
    *   Returnerar ett `ActivationResponse`-objekt innehållande `title`, `description` och `activation_id`.
*   **Felhantering:** Inkluderar logik för att hantera potentiella JSON-parsningsfel och andra undantag, med loggning och meningsfulla felmeddelanden till klienten.

### `activation.py`

**Syfte:** Definierar datastrukturer (modeller) med Pydantic för att validera inkommande API-förfrågningar och serialisera utgående svar.

**Innehåll:**
*   `ActivationRequest`: Definierar strukturen och datatyperna för inkommande data till `/gemini/getActivation`. Innehåller fälten `mood` (int) och `goal` (str).
*   `ActivationResponse`: Definierar strukturen och datatyperna för det svar som skickas tillbaka från `/gemini/getActivation`. Innehåller fälten `title` (str), `description` (str) och `activation_id` (str).

### `Dockerfile`

**Syfte:** Innehåller instruktioner för att bygga en Docker-image för backend-applikationen.

**Innehåll:**
*   Anger basimage: `python:3.10-slim`.
*   Sätter arbetsmappen inuti containern till `/app`.
*   Kopierar `requirements.txt` till `/app`.
*   Installerar Python-beroenden listade i `requirements.txt` med `pip`.
*   Kopierar resten av backend-koden till `/app`.
*   Exponerar port `8080` (den port som `uvicorn` kommer att lyssna på).
*   Definierar kommandot för att starta applikationen: `uvicorn backend.main:app --host 0.0.0.0 --port 8080`.

### `requirements.txt`

**Syfte:** Listar alla externa Python-paket som projektet är beroende av.

**Viktiga paket:**
*   `fastapi`, `uvicorn[standard]`: För att bygga och köra API-servern.
*   `google-generativeai`: För interaktion med Google Gemini API.
*   `google-cloud-secret-manager`: För säker hantering av hemligheter.
*   `firebase-admin`: För interaktion med Firebase-tjänster (som Firestore).
*   `pydantic`: För datavalidering och modellering.

## Testa lokalt

Följ dessa steg för att köra och testa backend-tjänsten på din lokala maskin:

### 1. Klona projektet

```bash
git clone git@github.com:joelkvarnsmyr/InnerJourney.git
cd InnerJourney/backend
```

### 2. Skapa och aktivera en virtuell miljö

```bash
python3.10 -m venv venv
source venv/bin/activate  # På Windows: venv\Scripts\activate
```

### 3. Installera beroenden

```bash
pip install -r requirements.txt
```

### 4. Konfigurera miljövariabler

Skapa en `.env`-fil i `backend`-katalogen och lägg till nödvändiga miljövariabler, till exempel sökvägen till dina Google Cloud-autentiseringsuppgifter (`GOOGLE_APPLICATION_CREDENTIALS`) och eventuell Gemini API-nyckel om den inte hämtas via Secret Manager lokalt.

### 5. Starta servern

```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8080 --reload
```
*   `--reload`-flaggan gör att servern startar om automatiskt vid kodändringar, vilket är praktiskt under utveckling.

### 6. Testa API:et

Använd ett verktyg som `curl` eller Postman för att skicka en POST-förfrågan till endpointen:

```bash
curl -X POST "http://localhost:8080/gemini/getActivation" \
-H "Content-Type: application/json" \
-d '{"mood": 2, "goal": "komma igång"}'
```

## Bygga och köra med Docker

Så här bygger du en Docker-image och kör backend-tjänsten i en container:

### 1. Bygg Docker-image

Navigera till `backend`-katalogen i terminalen och kör:

```bash
docker build -t innerjourney-backend .
```
*   Detta kommando bygger en image baserat på instruktionerna i `Dockerfile` och taggar den som `innerjourney-backend`.

### 2. Kör containern

```bash
docker run -p 8080:8080 -e PORT=8080 innerjourney-backend
```
*   `-p 8080:8080`: Mappar port 8080 på din värddator till port 8080 inuti containern.
*   `-e PORT=8080`: Sätter miljövariabeln `PORT` inuti containern (krävs av `main.py`).

### 3. Testa API:et

API:et är nu tillgängligt på `http://localhost:8080`. Testa det på samma sätt som i det lokala testet (steg 6 ovan).

## Deployment till Google Cloud Run

Följ dessa steg för att deploya backend-tjänsten till Google Cloud Run:

### 1. Autentisera med Google Cloud

Se till att du har `gcloud` CLI installerat och konfigurerat.

```bash
gcloud auth login
gcloud config set project innerjourney-c007e
```
*   Ersätt `innerjourney-c007e` med ditt faktiska Google Cloud-projekt-ID.

### 2. Bygg och pusha till Google Container Registry (GCR)

```bash
# Bygg imagen med GCR-tagg
docker build -t gcr.io/innerjourney-c007e/innerjourney-backend .

# Pusha imagen till GCR
docker push gcr.io/innerjourney-c007e/innerjourney-backend
```
*   Se till att ersätta `innerjourney-c007e` med ditt projekt-ID. Du kan behöva konfigurera Docker för att autentisera mot GCR (`gcloud auth configure-docker`).

### 3. Deploya till Cloud Run

```bash
gcloud run deploy innerjourney-backend \
--image gcr.io/innerjourney-c007e/innerjourney-backend \
--platform managed \
--region europe-west1 \
--allow-unauthenticated
```
*   `--image`: Anger vilken container-image som ska deployas.
*   `--platform managed`: Använder den fullständigt hanterade versionen av Cloud Run.
*   `--region`: Anger i vilken region tjänsten ska deployas (välj en lämplig region).
*   `--allow-unauthenticated`: Tillåter att tjänsten anropas utan autentisering (justera detta baserat på dina säkerhetskrav).

### 4. Testa den deployade tjänsten

Efter en lyckad deployment kommer `gcloud` att skriva ut URL:en till din tjänst. Använd denna URL för att testa API:et, t.ex.:

```bash
curl -X POST "https://[DIN-CLOUD-RUN-URL]/gemini/getActivation" \
-H "Content-Type: application/json" \
-d '{"mood": 2, "goal": "komma igång"}'
```
*   Ersätt `[DIN-CLOUD-RUN-URL]` med den faktiska URL:en som du fick från `gcloud run deploy`-kommandot.

## Ytterligare Kommentarer

*   **Säkerhet:** Hantering av API-nycklar och autentiseringsuppgifter sker företrädesvis via `Google Cloud Secret Manager` för att undvika att lagra känslig information direkt i koden eller konfigurationsfiler.
*   **Felhantering:** Grundläggande felhantering och loggning är implementerade, inklusive en fallback för Gemini-anrop, för att öka tjänstens robusthet.
*   **Saknad kod:** Beskrivningen av `firebase_service.py` baseras på antaganden om dess funktion, då specifik kod för denna fil inte fanns i den ursprungliga genomgången. Den antas innehålla nödvändig logik för `Firestore`-interaktion.