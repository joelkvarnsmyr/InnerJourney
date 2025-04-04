---
description: Teknisk dokumentation för InnerJourney
id: backend-teknisk-dokumentation-2025
sidebar_label: 'Backend: Teknisk Dok.'
sidebar_position: 10
slug: backend-teknisk-dokumentation-2025
tags:
- backend
- fastapi
- python
- google-cloud
- tech-spec
- docker
- gemini
- firestore
title: '"Backend: Teknisk Dokumentation"'
---

# ⚙️ Backend: Teknisk Dokumentation

Backend-systemet för InnerJourney är en API-tjänst utvecklad med `FastAPI` i `Python` 🐍. Dess primära syfte är att stödja plattformen för personlig utveckling genom att:

*   📥 Hantera API-anrop från frontend-applikationen.
*   🔥 Interagera med `Firebase Firestore` för datalagring.
*   🤖 Utnyttja `Google Gemini` för att generera AI-drivna insikter och utvecklingssteg.

Systemet är containeriserat med `Docker` 🐳 och driftsätts på `Google Cloud Run` ☁️, vilket möjliggör god skalbarhet och förenklad hantering.

Nedan följer en detaljerad genomgång av kodbasen, fil för fil, med beskrivningar av deras syfte och hur de samverkar.

## 🗂️ Översikt över Kodbasen

Kodbasen är strukturerad kring följande centrala filer:

*   📄 `main.py`: Initierar och startar FastAPI-applikationen samt inkluderar nödvändiga routers (t.ex. för Gemini).
*   📄 `gemini_service.py`: Ansvarar för kommunikationen med Google Gemini API för att generera innehåll.
*   📄 `firebase_service.py`: Hanterar all interaktion med databasen `Firebase Firestore` 🔥 (Detaljerad kod saknades i ursprunglig beskrivning, men filens existens och syfte antas).
*   📄 `gemini.py`: Definierar de API-endpoints som är specifika för Gemini-funktionalitet, exempelvis `/gemini/getActivation`.
*   📄 `activation.py`: Innehåller Pydantic-modeller som används för datavalidering och serialisering av API-förfrågningar och svar.
*   🐳 `Dockerfile`: Innehåller instruktionerna för att bygga Docker-imagen för backend-tjänsten.
*   📜 `requirements.txt`: Listar alla Python-beroenden som krävs för projektet.

## 📄 Fil-för-fil Beskrivning

Här beskrivs varje nyckelfil i backend-projektet mer ingående.

### `main.py`

**🎯 Syfte:** Detta är huvudfilen som ansvarar för att initiera FastAPI-applikationen, konfigurera grundläggande routing och starta webbservern.

**Innehåll:**

*   Importerar nödvändiga bibliotek: `FastAPI`, `uvicorn` samt specifik router, t.ex. Gemini-routern från `backend.routes.gemini`.
*   Skapar en instans av `FastAPI`, vanligtvis namngiven `app`.
*   Inkluderar definierade API-routers (som Gemini-routern) med `app.include_router(gemini.router)`.
*   Definierar en enkel rot-endpoint (`GET /`) som returnerar ett välkomstmeddelande, t.ex. `{"message": "Welcome to InnerJourney Backend"}`.
*   Hämtar portnumret från miljövariabeln `PORT`, med ett standardvärde (ofta `8080`).
*   Startar servern med `uvicorn` och konfigurerar den att lyssna på `host="0.0.0.0"`.

**💡 Viktigt:** Att sätta `host="0.0.0.0"` är avgörande för att göra servern tillgänglig utanför sin egen container, vilket är nödvändigt i miljöer som `Docker` och `Google Cloud Run`.

### `gemini_service.py`

**🎯 Syfte:** Denna service hanterar all logik för att interagera med `Google Gemini API` 🤖. Den tar emot indata (t.ex. användarens sinnesstämning och mål) och använder Gemini för att generera relevanta, personliga utvecklingssteg.

**Innehåll:**

*   Importerar nödvändiga bibliotek, inklusive `google.cloud.secretmanager` för säker hämtning av API-nycklar och `google.generativeai` för Gemini-interaktion.
*   Implementerar loggning med `logging`-biblioteket för att spåra operationer och felsöka.
*   Innehåller en funktion, `get_secret`, för att säkert hämta hemligheter (som Gemini API-nyckeln) från `Google Cloud Secret Manager` 🔑.
*   Konfigurerar `genai`-biblioteket (`google.generativeai`) med den hämtade API-nyckeln.
*   Initierar en specifik Gemini-modell, t.ex. `GenerativeModel("gemini-1.5-pro-latest")`.
*   Huvudfunktionen, `generate_activation`, tar emot parametrar som `mood` (`int`) och `goal` (`str`). Den skapar en prompt baserat på dessa och anropar sedan Gemini-modellen.
*   Returnerar svaret från Gemini, vanligtvis i JSON-format.
*   **🐞 Felhantering:** Inkluderar en fallback-mekanism. Om anropet till Gemini misslyckas, returneras ett fördefinierat mock-svar (t.ex. `{"title": "Mock Step", "description": "This is a mock step..."}`) för att säkerställa att applikationen inte kraschar.

### `firebase_service.py`

**🎯 Syfte:** Denna service centraliserar all interaktion med `Firebase Firestore` 🔥. Den ansvarar för att spara, hämta och potentiellt uppdatera data i databasen.

**Innehåll:** *(Baserat på antaganden, då specifik kod saknades i ursprungsbeskrivningen)*

*   Förväntas innehålla funktioner som `save_to_firestore` som tar emot data (t.ex. en genererad "activation") och lagrar den i en lämplig `Firestore`-collection.
*   Initierar troligtvis Firebase Admin SDK vid start, med autentiseringsuppgifter som säkert hämtas från `Google Cloud Secret Manager` 🔑.
*   **🔒 Säkerhet:** Använder `Google Cloud Secret Manager` för att hantera känsliga Firebase-autentiseringsuppgifter och undvika att hårdkoda dem.

### `gemini.py`

**🎯 Syfte:** Denna fil definierar de specifika API-endpoints (routes) som är relaterade till Gemini-funktionaliteten, och kopplar ihop inkommande anrop med logiken i `gemini_service.py` och `firebase_service.py`.

**Innehåll:**

*   Skapar en `APIRouter`-instans från FastAPI, ofta med ett prefix som `/gemini` för att gruppera relaterade endpoints.
*   Definierar en `POST`-endpoint, t.ex. `/gemini/getActivation`:
    *   Tar emot data i request body, validerad mot Pydantic-modellen `ActivationRequest`.
    *   Anropar funktionen `generate_activation` i `gemini_service.py` med indata från requesten.
    *   Parsar JSON-svaret som returneras från `gemini_service.py`.
    *   Anropar funktionen `save_to_firestore` i `firebase_service.py` för att spara det genererade resultatet.
    *   Returnerar ett svar till klienten, formaterat enligt Pydantic-modellen `ActivationResponse`, innehållande fält som `title`, `description` och `activation_id`.
*   **🐞 Felhantering:** Implementerar `try-except`-block för att hantera potentiella fel, såsom JSON-parsningsfel eller problem vid interaktion med externa tjänster. Loggar fel och returnerar meningsfulla HTTP-felkoder och meddelanden till klienten.

### `activation.py`

**🎯 Syfte:** Innehåller datamodeller definierade med `Pydantic`. Dessa modeller används av FastAPI för automatisk datavalidering av inkommande requests och för serialisering (formatering) av utgående responses.

**Innehåll:**

*   `ActivationRequest`: Definierar den förväntade strukturen och datatyperna för JSON-data som skickas till endpointen `/gemini/getActivation`. Typiska fält är `mood` (av typen `int`) och `goal` (av typen `str`).
*   `ActivationResponse`: Definierar strukturen och datatyperna för det JSON-svar som skickas tillbaka från `/gemini/getActivation`. Typiska fält är `title` (av typen `str`), `description` (av typen `str`) och `activation_id` (av typen `str`).

### `Dockerfile` 🐳

**🎯 Syfte:** Denna fil innehåller instruktioner för `Docker` för att bygga en container-image 🐳 som innehåller backend-applikationen och alla dess beroenden.

**Innehåll:**

```dockerfile title="Dockerfile"
# Anger en basimage
FROM python:3.10-slim

# Sätter en arbetsmapp inuti containern
WORKDIR /app

# Kopierar requirements.txt till arbetsmappen
COPY requirements.txt /app/

# Installerar Python-beroenden specificerade i requirements.txt med pip
RUN pip install --no-cache-dir -r requirements.txt

# Kopierar resten av applikationskoden till arbetsmappen
COPY . /app

# Exponerar den port som applikationen kommer att lyssna på inuti containern
EXPOSE 8080

# Definierar startkommandot för applikationen
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8080"]
```

### `requirements.txt` 📜

**🎯 Syfte:** Listar alla externa Python-paket 🐍 som projektet behöver för att fungera. `pip` använder denna fil för att installera beroendena.

**Viktiga paket inkluderar vanligtvis:**

*   `fastapi`: Kärnramverket för att bygga API:et.
*   `uvicorn[standard]`: ASGI-server för att köra FastAPI-applikationen.
*   `google-generativeai`: Klientbibliotek för att interagera med Google Gemini API 🤖.
*   `google-cloud-secret-manager`: För att säkert hämta hemligheter från Google Cloud 🔑.
*   `firebase-admin`: För att interagera med Firebase-tjänster som `Firestore` 🔥.
*   `pydantic`: För datavalidering och modellering.

## 💻 Testa lokalt

Följ dessa steg för att köra och testa backend-tjänsten på din lokala utvecklingsmaskin:

### 1. Klona projektet 📥

Klona repot och navigera till backend-katalogen:

```bash
git clone git@github.com:joelkvarnsmyr/InnerJourney.git
cd InnerJourney/backend
```

### 2. Skapa och aktivera en virtuell miljö 🐍📦

Det rekommenderas starkt att använda en virtuell miljö för att isolera projektets beroenden.

```bash
# Skapa miljön (använd din Python 3.10+ installation)
python3.10 -m venv venv

# Aktivera miljön
# På macOS/Linux:
source venv/bin/activate
# På Windows (cmd/powershell):
.\venv\Scripts\activate
```

### 3. Installera beroenden 📜

Med den virtuella miljön aktiverad, installera paketen från `requirements.txt`:

```bash
pip install -r requirements.txt
```

### 4. Konfigurera miljövariabler 🔑

Vissa delar av koden (t.ex. anslutning till Google Cloud-tjänster) kan kräva miljövariabler.

1.  Skapa en fil med namnet `.env` i `backend`-katalogen.
2.  Lägg till nödvändiga variabler, t.ex. sökvägen till dina Google Cloud-autentiseringsuppgifter:

    ```dotenv title=".env"
    GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/keyfile.json"
    # Eventuellt andra variabler som GEMINI_API_KEY om den inte hämtas via Secret Manager lokalt
    ```
3.  *Notera:* `FastAPI` eller `uvicorn` läser inte `.env`-filer automatiskt. Du kan behöva ladda dem i din kod (t.ex. med `python-dotenv`) eller sätta dem i din terminalsession innan start.

### 5. Starta servern ▶️

Kör `uvicorn` för att starta utvecklingsservern:

```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8080 --reload
```

*   🔄 Flaggan `--reload` gör att servern automatiskt startar om när du sparar ändringar i koden, vilket är mycket användbart under utveckling.

### 6. Testa API:et ✅

Använd ett verktyg som `curl`, Postman eller Insomnia för att skicka en `POST`-förfrågan till din lokalt körande tjänst:

```bash
curl -X POST "http://localhost:8080/gemini/getActivation" \
-H "Content-Type: application/json" \
-d '{"mood": 2, "goal": "komma igång"}'
```

Du bör få ett JSON-svar tillbaka från API:et.

## 🐳 Bygga och köra med Docker

Så här bygger du en Docker-image och kör backend-tjänsten i en isolerad container-miljö:

### 1. Bygg Docker-image 🛠️

Se till att du har Docker installerat och körande. Navigera till `backend`-katalogen i din terminal och kör byggkommandot:

```bash
docker build -t innerjourney-backend .
```

*   🏷️ Kommandot använder instruktionerna i `Dockerfile` för att bygga en image och ger den namnet (taggen) `innerjourney-backend`. Punkten `.` anger att byggkontexten är den nuvarande katalogen.

### 2. Kör containern ▶️

Starta en container baserad på den nyss byggda imagen:

```bash
docker run -p 8080:8080 -e PORT=8080 --env-file .env innerjourney-backend
```

*   🔗 `-p 8080:8080`: Mappar port `8080` på din lokala maskin (värden) till port `8080` inuti containern, där `uvicorn` lyssnar.
*   🔧 `-e PORT=8080`: Sätter miljövariabeln `PORT` inuti containern till `8080`, vilket matchar värdet som `main.py` förväntar sig och `Dockerfile` exponerar.
*   🔑 `--env-file .env`: (Valfritt men ofta nödvändigt) Laddar miljövariabler från din lokala `.env`-fil in i containern. Se till att sökvägar som `GOOGLE_APPLICATION_CREDENTIALS` är giltiga *inuti* containern eller montera filen som en volym om det behövs.

### 3. Testa API:et ✅

API:et ska nu vara tillgängligt på `http://localhost:8080` via Docker-containern. Du kan testa det på exakt samma sätt som i det lokala testet (steg 6 ovan) med `curl` eller annat verktyg.

## ☁️🚀 Deployment till Google Cloud Run

Följ dessa steg för att driftsätta din containeriserade backend-tjänst till `Google Cloud Run`, en fullständigt hanterad serverless-plattform.

### 1. Autentisera med Google Cloud 🔑

Se till att du har `gcloud` CLI (kommandoradsverktyget för Google Cloud) installerat och konfigurerat.

```bash
# Logga in på ditt Google Cloud-konto
gcloud auth login

# Ställ in ditt standardprojekt (ersätt med ditt projekt-ID)
gcloud config set project innerjourney-c007e
```

### 2. Bygg och pusha till Artifact Registry (eller GCR) 🏗️➡️☁️

`Cloud Run` behöver hämta din container-image från ett container registry. Google rekommenderar `Artifact Registry`.

1.  **Konfigurera Docker-autentisering:**
    ```bash
    # Anpassa [REGION] till din Artifact Registry-region, t.ex. europe-west1
    gcloud auth configure-docker europe-west1-docker.pkg.dev
    ```

2.  **Bygg och tagga imagen:**
    ```bash
    # Anpassa REGION, PROJECT_ID, REPO_NAME
    # Exempel med Artifact Registry:
    docker build -t europe-west1-docker.pkg.dev/innerjourney-c007e/innerjourney-repo/innerjourney-backend:latest .

    # Alternativ GCR-tagg:
    # docker build -t gcr.io/innerjourney-c007e/innerjourney-backend:latest .
    ```

3.  **Pusha imagen till registryt:**
    ```bash
    # Anpassa REGION, PROJECT_ID, REPO_NAME
    # Exempel med Artifact Registry:
    docker push europe-west1-docker.pkg.dev/innerjourney-c007e/innerjourney-repo/innerjourney-backend:latest

    # Alternativ GCR-push:
    # docker push gcr.io/innerjourney-c007e/innerjourney-backend:latest
    ```

### 3. Deploya till Cloud Run 🚀

Använd `gcloud` för att deploya din image till `Cloud Run`.

```bash
# Ersätt [IMAGE_PATH], [REGION], [SERVICE_ACCOUNT_EMAIL], [PROJECT_ID], [SECRET_NAME] med dina värden
gcloud run deploy innerjourney-backend \
  --image [IMAGE_PATH] \
  --platform managed \
  --region [REGION] \
  --allow-unauthenticated \
  --service-account=[SERVICE_ACCOUNT_EMAIL] \
  --set-secrets=GEMINI_API_KEY=projects/[PROJECT_ID]/secrets/[SECRET_NAME]:latest
```

*   🖼️ `--image`: Ange den fullständiga sökvägen till din container-image i registryt (t.ex. `europe-west1-docker.pkg.dev/innerjourney-c007e/innerjourney-repo/innerjourney-backend:latest`).
*   ⚙️ `--platform managed`: Specificerar att du använder den fullständigt hanterade `Cloud Run`-miljön.
*   📍 `--region`: Ange i vilken Google Cloud-region tjänsten ska köras (t.ex. `europe-west1`).
*   🌐 `--allow-unauthenticated`: Tillåter att tjänsten anropas publikt utan IAM-autentisering. **⚠️ Granska dina säkerhetsbehov!** För interna API:er bör du använda `--no-allow-unauthenticated` och konfigurera IAM eller Identity Platform/Firebase Auth.
*   👤 `--service-account`: **Rekommenderas starkt!** Ange det specifika servicekonto som din `Cloud Run`-tjänst ska köra som. Detta konto behöver behörigheter till andra Google Cloud-tjänster, som `Secret Manager` och `Firestore`.
*   🔑 `--set-secrets`: (Valfritt men rekommenderat) Monterar hemligheter från `Secret Manager` som miljövariabler. Detta är säkrare än att använda `--set-env-vars` för känslig data. Anpassa nyckel (`GEMINI_API_KEY`), projekt-ID (`[PROJECT_ID]`) och hemlighetsnamn (`[SECRET_NAME]`).

### 4. Testa den deployade tjänsten ✅

Efter att deploymenten är klar (det kan ta någon minut) kommer `gcloud`-kommandot att skriva ut URL:en till din nyligen deployade `Cloud Run`-tjänst. Använd denna URL för att testa API:et:

```bash
# Ersätt [DIN-CLOUD-RUN-URL] med den faktiska URL:en
curl -X POST "https://[DIN-CLOUD-RUN-URL]/gemini/getActivation" \
-H "Content-Type: application/json" \
-d '{"mood": 2, "goal": "komma igång"}'
```

## 📝 Ytterligare Kommentarer

*   🔒 **Säkerhet:** Hantering av känslig information som API-nycklar och databas-autentiseringsuppgifter bör *alltid* ske via en säker mekanism som `Google Cloud Secret Manager` 🔑. Undvik att lagra dessa direkt i koden, konfigurationsfiler eller Docker-imagen.
*   🐞 **Felhantering och Loggning:** Grundläggande felhantering (som fallback för Gemini) och loggning är implementerat. `Cloud Run` integreras automatiskt med `Google Cloud Logging`, vilket underlättar felsökning i produktionsmiljön.
*   ❓ **Antaganden om `firebase_service.py`:** Denna dokumentation antar att `firebase_service.py` innehåller nödvändig logik för att ansluta till och interagera med `Firebase Firestore` 🔥, även om den specifika koden inte fanns i den ursprungliga källan.