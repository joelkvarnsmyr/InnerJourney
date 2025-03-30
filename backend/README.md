# InnerJourney Backend: README

## Översikt

Detta är backend-delen av InnerJourney, en plattform för personlig utveckling. Backend är byggd med `FastAPI` (`Python`) och integrerar med `Firebase Firestore` för datalagring och `Google Gemini` för AI-genererade insikter. Applikationen är containeriserad med `Docker` och deployad på `Google Cloud Run` för skalbarhet och enkel hantering.

Denna README beskriver hur du sätter upp, kör, bygger och deployar backend lokalt och på `Google Cloud Run`.

## Förutsättningar

Innan du börjar, se till att du har följande verktyg installerade:

*   **Python 3.10:** För att köra backend lokalt utan Docker.
*   **Git:** För att klona och hantera projektet.
*   **Docker:** För att bygga och köra backend i en container.
*   **Google Cloud SDK (`gcloud`):** För att deploya till Google Cloud Run.
*   **Node.js och npm (valfritt):** Om du behöver köra frontend parallellt för att testa hela applikationen.
*   **Firebase-projekt:** Konfigurera ett Firebase-projekt och aktivera `Firestore` och `Authentication`.
*   **Google Cloud-projekt:** Skapa ett projekt (t.ex. `innerjourney-c007e`) och aktivera API:er för `Cloud Run` och `Secret Manager`.

## Projektstruktur

Backend-koden ligger i `backend/`-mappen i projektets rot (`innerjourney/`). Här är en översikt över viktiga filer:

```
backend/
├── models/              # Pydantic-modeller för datavalidering (t.ex. activation.py)
├── routes/              # API-routes (t.ex. gemini.py)
├── services/            # Tjänster för att hantera logik (t.ex. gemini_service.py, firebase_service.py)
├── __init__.py          # Gör mappen till ett Python-paket
├── main.py              # Huvudfil för FastAPI-applikationen
├── requirements.txt     # Python-beroenden
└── Dockerfile           # Instruktioner för att bygga Docker-containern
```

## Sätta upp projektet lokalt

### 1. Klona repot

Klona projektet från GitHub och navigera till `backend/`-mappen:

```bash
git clone git@github.com:joelkvarnsmyr/InnerJourney.git
cd InnerJourney/backend
```

### 2. Skapa en virtuell miljö (valfritt, om du kör utan Docker)

Skapa och aktivera en virtuell miljö för att isolera beroenden:

```bash
python3.10 -m venv venv
source venv/bin/activate  # På Windows: venv\Scripts\activate
```

### 3. Installera beroenden

Installera Python-beroendena som anges i `requirements.txt`:

```bash
pip install -r requirements.txt
```

### 4. Konfigurera miljövariabler (valfritt, för lokal körning)

Om du kör lokalt utan att använda `Google Cloud Secret Manager` (t.ex. under utveckling), skapa en `.env`-fil i `backend/`-mappen med följande variabler:

```text
# Exempel på .env-fil
GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/firebase-service-account.json"
GEMINI_API_KEY="din-gemini-api-nyckel"
```

**Notera:** I produktion används `Google Cloud Secret Manager` för att hantera känsliga nycklar, så `.env` behövs inte vid deployment.

### 5. Kör backend lokalt (utan Docker)

Starta FastAPI-servern med `Uvicorn`:

```bash
uvicorn main:app --host 0.0.0.0 --port 8080 --reload
```

*   `--reload`: Gör att servern startar om automatiskt vid kodändringar (bra för utveckling).

Servern körs på `http://localhost:8080`.

Testa en endpoint, t.ex. `/gemini/getActivation`:

```bash
curl -X POST "http://localhost:8080/gemini/getActivation" \
-H "Content-Type: application/json" \
-d '{"mood": 2, "goal": "komma igång"}'
```

## Bygga och köra med Docker

### 1. Bygg Docker-imagen

Navigera till `backend/`-mappen och bygg Docker-imagen:

```bash
cd InnerJourney/backend
docker build -t innerjourney-backend .
```

*   `-t innerjourney-backend`: Namnger imagen som `innerjourney-backend`.

### 2. Kör containern lokalt

Kör den byggda imagen i en container:

```bash
docker run -p 8080:8080 -e PORT=8080 innerjourney-backend
```

*   `-p 8080:8080`: Mappar port 8080 på din dator till port 8080 i containern.
*   `-e PORT=8080`: Sätter miljövariabeln `PORT` som används av `main.py`.

API:et är nu tillgängligt på `http://localhost:8080`. Testa det med samma `curl`-kommando som i föregående steg.

## Deploya till Google Cloud Run

### 1. Autentisera med Google Cloud

Se till att du har `gcloud` CLI installerat och autentisera dig:

```bash
gcloud auth login
gcloud config set project innerjourney-c007e
```

*   Ersätt `innerjourney-c007e` med ditt Google Cloud-projekt-ID.

### 2. Bygg och pusha till Google Container Registry (GCR)

Navigera till `backend/` och bygg/pusha Docker-imagen:

```bash
cd InnerJourney/backend
docker build -t gcr.io/innerjourney-c007e/innerjourney-backend .
docker push gcr.io/innerjourney-c007e/innerjourney-backend
```

*   Du kan behöva konfigurera Docker för att autentisera mot GCR:

    ```bash
    gcloud auth configure-docker
    ```

### 3. Deploya till Cloud Run

Deploya den pushade imagen till `Cloud Run`:

```bash
gcloud run deploy innerjourney-backend \
--image gcr.io/innerjourney-c007e/innerjourney-backend \
--platform managed \
--region europe-west1 \
--allow-unauthenticated
```

*   `--platform managed`: Använder den hanterade versionen av `Cloud Run`.
*   `--region europe-west1`: Välj en region nära dina användare (t.ex. `europe-west1`).
*   `--allow-unauthenticated`: Tillåter oautentiserade anrop (justera detta baserat på säkerhetskrav).

Efter deployment får du en publik URL, t.ex. `https://innerjourney-backend-xxxxxxxxxx.europe-west1.run.app`. Testa den:

```bash
curl -X POST "https://innerjourney-backend-xxxxxxxxxx.europe-west1.run.app/gemini/getActivation" \
-H "Content-Type: application/json" \
-d '{"mood": 2, "goal": "komma igång"}'
```

## Säkerhet och hemligheter

*   **API-nycklar:** API-nycklar (t.ex. för Gemini och Firebase) lagras i `Google Cloud Secret Manager` under följande namn:
    *   `firebase-credentials`: Innehåller Firebase service account JSON.
    *   `gemini-api-key`: Gemini API-nyckel.
*   **Behörigheter:** Cloud Run-tjänstens servicekonto (`[PROJECT_NUMBER]-compute@developer.gserviceaccount.com`) måste ha rollen `Secret Manager Secret Accessor` för att kunna hämta hemligheter. Lägg till rollen via `Google Cloud Console` under `IAM`.

## Felsökning

### 1. 404 Not Found

*   **Orsak:** En endpoint hittas inte.
*   **Lösning:** Kontrollera att routern är korrekt importerad i `main.py` (t.ex. `app.include_router(gemini.router)`).

### 2. PermissionDenied vid åtkomst till Secret Manager

*   **Orsak:** Cloud Run-tjänsten saknar behörigheter.
*   **Lösning:** Ge servicekontot rollen `Secret Manager Secret Accessor` i `IAM`.

### 3. Container failed to start

*   **Orsak:** Applikationen kraschar vid start (t.ex. syntaxfel, saknade beroenden, eller konfigurationsproblem).
*   **Lösning:**
    1.  Kontrollera `Cloud Run`-loggorna i `Google Cloud Console`.
    2.  Bygg och kör containern lokalt (`docker build` och `docker run`) för att felsöka.

## Nästa steg

*   Implementera fler API-endpoints för ytterligare funktionalitet (t.ex. telefonverifiering, hämta sparade reflektioner).
*   Lägg till enhetstester med `pytest` för att säkerställa kodkvalitet.
*   Förbättra säkerheten genom att begränsa `--allow-unauthenticated` och implementera API-nyckelvalidering.

## Kontakt

För frågor eller bidrag, skapa ett issue i `GitHub`-repot: `joelkvarnsmyr/InnerJourney`.