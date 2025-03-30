# Backend: Setup, Utveckling och Deployment för InnerJourney

Detta dokument beskriver processen för att sätta upp, utveckla och deploya backend för InnerJourney. Backend är byggd med `FastAPI` (Python), integrerad med Firebase (`Firestore`) för datalagring och Google Cloud `Secret Manager` för säker hantering av API-nycklar. Applikationen är containeriserad med `Docker` och deployad till `Google Cloud Run`.

## 1. Lokal Miljö

### 1.1 Installera Nödvändiga Verktyg

För att sätta upp en fungerande lokal miljö behöver du följande verktyg:

*   **Python 3.10:** Installera denna version för kompatibilitet med projektets beroenden.
*   **Virtualenv:** Skapa en virtuell miljö för att isolera projektets paket.
    ```bash
    python3.10 -m venv venv
    source venv/bin/activate  # På Windows: venv\Scripts\activate
    ```
*   **Git:** För versionshantering.
*   **Docker:** För att containerisera applikationen.
*   **Google Cloud SDK (gcloud):** För att hantera Google Cloud-tjänster lokalt.

### 1.2 Klona Projektet från GitHub

Klona repot till din lokala maskin:

```bash
git clone git@github.com:joelkvarnsmyr/InnerJourney.git
cd InnerJourney
```

### 1.3 Installera Projektets Beroenden

Installera Python-paketen som anges i `requirements.txt`:

```bash
pip install -r requirements.txt
```

### 1.4 Konfigurera Lokala Miljövariabler

Skapa en `.env`-fil i projektets rotmapp för att lagra känsliga uppgifter:

```text
GEMINI_API_KEY="din-gemini-api-nyckel"
FIREBASE_CREDENTIALS_PATH="~/.secrets/api-keys.json"
```

Placera din Firebase service account JSON-fil i `~/.secrets/api-keys.json`.

### 1.5 Starta Servern Lokalt

Starta FastAPI-servern med Uvicorn:

```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8080 --reload
```

Testa en endpoint lokalt, till exempel `gemini/getActivation`:

```bash
curl -X POST "http://localhost:8080/gemini/getActivation" \
-H "Content-Type: application/json" \
-d '{"mood": 2, "goal": "komma igång"}'
```

## 2. Git och Versionshantering

*   **Git-repository:** Projektet finns på GitHub: `git@github.com:joelkvarnsmyr/InnerJourney.git`.
*   **Branch-strategi:** Använd `main`-branchen för stabil kod och skapa `feature-branches` för nya funktioner.
*   **Commit-rutiner:** Committa regelbundet med tydliga meddelanden, t.ex. `"Add gemini router to main.py"`.
*   **Ignorera känsliga filer:** Se till att `.env`, `venv/` och `~/.secrets/` finns i `.gitignore`.

## 3. Firebase-integration

*   **Firestore:** Används som databas för att lagra aktiveringar och annan användardata.
*   **Firebase Admin SDK:** Initieras med service account-uppgifter som hämtas säkert från `Google Cloud Secret Manager` vid körning.
*   **Kodexempel (från `firebase_service.py`):** Hämtning av hemligheter och initiering av Firebase.

    ```python
    from google.cloud import secretmanager
    import json
    import firebase_admin
    from firebase_admin import credentials, firestore

    def get_secret(secret_name):
        client = secretmanager.SecretManagerServiceClient()
        secret_version = f"projects/innerjourney-c007e/secrets/{secret_name}/versions/latest"
        response = client.access_secret_version(name=secret_version)
        return response.payload.data.decode("UTF-8")

    # Hämta Firebase-credentials från Secret Manager
    firebase_credentials_json = get_secret("firebase-credentials")
    cred = credentials.Certificate(json.loads(firebase_credentials_json))

    # Initiera Firebase Admin SDK
    firebase_admin.initialize_app(cred)
    db = firestore.client()

    def save_to_firestore(collection, doc_id, data):
        """Sparar data till en specifik Firestore-collection."""
        db.collection(collection).document(doc_id).set(data)
    ```

## 4. Deployment till Google Cloud Run

### 4.1 Förberedelser

*   **Google Cloud-projekt:** Projektet `innerjourney-c007e` är konfigurerat i Google Cloud Platform.
*   **Aktivera API:er:** Säkerställ att `Secret Manager API` och `Artifact Registry API` är aktiverade i ditt GCP-projekt.

### 4.2 Bygg och Pusha Docker-image

*   **Dockerfile:** Definierar hur applikationen containeriseras.

    ```dockerfile
    FROM python:3.10-slim
    WORKDIR /app
    COPY requirements.txt .
    RUN pip install --no-cache-dir -r requirements.txt
    COPY . .
    CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8080"]
    ```

*   **Bygg och pusha imagen:** Använd Google Cloud Artifact Registry.

    ```bash
    # Bygg Docker-imagen lokalt
    docker build -t gcr.io/innerjourney-c007e/innerjourney-backend .

    # Pusha imagen till Artifact Registry
    docker push gcr.io/innerjourney-c007e/innerjourney-backend
    ```

### 4.3 Deploya till Cloud Run

*   **Deploy-kommando:** Använd `gcloud` för att deploya den pushade imagen.

    ```bash
    gcloud run deploy innerjourney-backend \
      --image gcr.io/innerjourney-c007e/innerjourney-backend \
      --platform managed \
      --region europe-west1 \
      --allow-unauthenticated
    ```

*   **Service-URL:** Efter en lyckad deployment får du en publik URL för tjänsten, t.ex. `https://innerjourney-backend-xxxxxxxxxx.europe-west1.run.app`.

### 4.4 Hantera Hemligheter

*   **Secret Manager:** API-nycklar och andra hemligheter lagras säkert i Google Cloud Secret Manager. De primära hemligheterna är:
    *   `firebase-credentials` (innehåller service account JSON)
    *   `gemini-api-key`
*   **Behörigheter:** Cloud Run-tjänstens servicekonto (t.ex. `[PROJECT_NUMBER]-compute@developer.gserviceaccount.com`) måste ha rollen `Secret Manager Secret Accessor` för att kunna hämta hemligheterna vid körning.

## 5. Felsökning och Vanliga Problem

### 5.1 404 Not Found

*   **Orsak:** En specifik route/endpoint hittas inte. Ofta beror detta på att routern inte är korrekt importerad och registrerad i `backend/main.py`.
*   **Lösning:** Verifiera att raden `app.include_router(your_router_name.router)` finns i `main.py` för den relevanta routern (t.ex. `gemini.router`).

### 5.2 PermissionDenied vid Åtkomst till Secret Manager

*   **Orsak:** Cloud Run-tjänstens servicekonto saknar nödvändiga IAM-behörigheter för att läsa hemligheter från Secret Manager.
*   **Lösning:** Gå till IAM i Google Cloud Console och ge servicekontot (`[PROJECT_NUMBER]-compute@developer.gserviceaccount.com`) rollen `Secret Manager Secret Accessor`.

### 5.3 Container failed to start

*   **Orsak:** Applikationen kraschar direkt vid start inne i containern. Detta kan bero på syntaxfel i koden, saknade beroenden som inte installerats korrekt (fel i `requirements.txt` eller `Dockerfile`), eller konfigurationsfel (t.ex. problem med att läsa miljövariabler eller hemligheter).
*   **Lösning:**
    1.  Kontrollera loggarna för Cloud Run-tjänsten i Google Cloud Console för detaljerade felmeddelanden.
    2.  Försök att bygga och köra containern lokalt med `docker build` och `docker run` för att replikera och felsöka problemet i en kontrollerad miljö.