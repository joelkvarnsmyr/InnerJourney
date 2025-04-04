# ⚙️ Backend: Setup, Utveckling och Deployment för InnerJourney

Detta dokument beskriver processen för att sätta upp, utveckla och deploya backend för InnerJourney. Backend är byggd med `FastAPI` (Python 🐍), integrerad med Firebase (`Firestore` 🔥) för datalagring och Google Cloud `Secret Manager` 🔑 för säker hantering av API-nycklar. Applikationen är containeriserad med `Docker` 🐳 och deployad till `Google Cloud Run` ☁️. 📜

## 1. Lokal Miljö 💻

### 1.1 Installera Nödvändiga Verktyg 🛠️

För att sätta upp en fungerande lokal miljö behöver du följande verktyg:

-   🐍 **Python 3.10:** Installera denna version för kompatibilitet med projektets beroenden.
-   📦 **Virtualenv:** Skapa en virtuell miljö för att isolera projektets paket.
    ```bash
    # Skapa virtuell miljö
    python3.10 -m venv venv
    # Aktivera miljön (Linux/macOS)
    source venv/bin/activate
    # Aktivera miljön (Windows)
    # venv\Scripts\activate
    ```
-   🐙 **Git:** För versionshantering.
-   🐳 **Docker:** För att containerisera applikationen.
-   ☁️ **Google Cloud SDK (`gcloud`):** För att hantera Google Cloud-tjänster lokalt.

### 1.2 Klona Projektet från GitHub 📥

Klona repot till din lokala maskin:

```bash
git clone git@github.com:joelkvarnsmyr/InnerJourney.git
cd InnerJourney
```

### 1.3 Installera Projektets Beroenden 📜

Installera Python-paketen som anges i `requirements.txt`:

```bash
pip install -r requirements.txt
```

### 1.4 Konfigurera Lokala Miljövariabler 🔑

Skapa en `.env`-fil i projektets rotmapp för att lagra känsliga uppgifter lokalt:

```text
# .env fil
GEMINI_API_KEY="din-gemini-api-nyckel"
FIREBASE_CREDENTIALS_PATH="~/.secrets/api-keys.json"
```

**Viktigt:** Placera din Firebase service account JSON-fil i sökvägen du angav, t.ex. `~/.secrets/api-keys.json`. Denna fil och `.env`-filen ska **inte** checkas in i Git (se `.gitignore`).

### 1.5 Starta Servern Lokalt ▶️

Starta FastAPI-servern med Uvicorn:

```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8080 --reload
```

Servern är nu tillgänglig på `http://localhost:8080`.

Testa en endpoint lokalt, till exempel `gemini/getActivation`:

```bash
curl -X POST "http://localhost:8080/gemini/getActivation" \
-H "Content-Type: application/json" \
-d '{"mood": 2, "goal": "komma igång"}'
```

## 2. Git och Versionshantering 🐙

-   🔗 **Git-repository:** Projektet finns på GitHub: `git@github.com:joelkvarnsmyr/InnerJourney.git`.
-   🌿 **Branch-strategi:** Använd `main`-branchen för stabil kod som är redo för deployment. Skapa `feature-branches` (t.ex. `feature/new-activation-endpoint`) för nya funktioner eller buggfixar. Merga via Pull Requests.
-   💬 **Commit-rutiner:** Committa regelbundet med tydliga och beskrivande meddelanden, t.ex. `"feat: Add gemini router to main.py"` eller `"fix: Correct Firestore query in user service"`.
-   🚫 **Ignorera känsliga filer:** Säkerställ att filer och mappar som `.env`, `venv/`, `__pycache__/` och `~/.secrets/` (eller motsvarande sökväg för credentials) finns i `.gitignore` för att undvika att checka in känslig information eller lokala konfigurationer.

## 3. Firebase-integration 🔥

-   💾 **Firestore:** Används som NoSQL-databas för att lagra data såsom användarprofiler, aktiveringar (`activations`), och loggar. Se [Databasstruktur](databasstruktur.md) för detaljer.
-   🔑 **Firebase Admin SDK:** Används i backend för att interagera med Firebase-tjänster. SDK initieras med service account-uppgifter som hämtas säkert från `Google Cloud Secret Manager` vid körning i den deployade miljön (Cloud Run). Lokalt används sökvägen från `.env`.
-   💻 **Kodexempel (från `firebase_service.py`):** Visar hur hemligheter hämtas från Secret Manager och hur Firebase Admin SDK initieras i produktionsmiljön.

    ```python
    from google.cloud import secretmanager
    import json
    import firebase_admin
    from firebase_admin import credentials, firestore
    import os

    def get_secret(secret_name):
        """Hämtar den senaste versionen av en hemlighet från Google Secret Manager."""
        client = secretmanager.SecretManagerServiceClient()
        # Anpassa project_id vid behov
        project_id = "innerjourney-c007e"
        secret_version_name = f"projects/{project_id}/secrets/{secret_name}/versions/latest"
        try:
            response = client.access_secret_version(name=secret_version_name)
            payload = response.payload.data.decode("UTF-8")
            return payload
        except Exception as e:
            print(f"Error fetching secret {secret_name}: {e}")
            return None

    # Hämta Firebase-credentials JSON-sträng från Secret Manager
    firebase_credentials_json = get_secret("firebase-credentials")

    if firebase_credentials_json:
        try:
            # Konvertera JSON-strängen till ett dictionary
            firebase_credentials_dict = json.loads(firebase_credentials_json)
            cred = credentials.Certificate(firebase_credentials_dict)

            # Initiera Firebase Admin SDK (endast en gång)
            if not firebase_admin._apps:
                firebase_admin.initialize_app(cred)

            db = firestore.client()
            print("✅ Firebase Admin SDK initierat framgångsrikt.")

        except json.JSONDecodeError as e:
            print(f"❌ Fel vid tolkning av Firebase credentials JSON: {e}")
        except Exception as e:
            print(f"❌ Okänt fel vid initiering av Firebase Admin SDK: {e}")
    else:
        print("❌ Kunde inte hämta Firebase credentials från Secret Manager.")


    def save_to_firestore(collection, doc_id, data):
        """Sparar data till en specifik Firestore-collection."""
        try:
            db.collection(collection).document(doc_id).set(data)
            print(f"💾 Data sparad till Firestore: {collection}/{doc_id}")
            return True
        except Exception as e:
            print(f"❌ Fel vid sparande till Firestore ({collection}/{doc_id}): {e}")
            return False
    ```

## 4. Deployment till Google Cloud Run ☁️

### 4.1 Förberedelser ✅

-   🏗️ **Google Cloud-projekt:** Projektet `innerjourney-c007e` är konfigurerat i Google Cloud Platform (GCP).
-   🔌 **Aktivera API:er:** Säkerställ att följande API:er är aktiverade i ditt GCP-projekt:
    -   `Cloud Run API`
    -   `Secret Manager API`
    -   `Artifact Registry API` (eller `Container Registry API`)
    -   `Cloud Build API` (om CI/CD används)

### 4.2 Bygg och Pusha Docker-image 🐳

-   📄 **Dockerfile:** Definierar hur applikationen containeriseras.

    ```dockerfile
    # Använd en officiell Python runtime som basimage
    FROM python:3.10-slim

    # Sätt arbetskatalogen i containern
    WORKDIR /app

    # Kopiera requirements-filen och installera beroenden
    COPY requirements.txt .
    # Uppdatera pip och installera utan cache för att hålla imagen liten
    RUN pip install --no-cache-dir --upgrade pip && \
        pip install --no-cache-dir -r requirements.txt

    # Kopiera resten av applikationskoden till arbetskatalogen
    COPY . .

    # Kör applikationen med Uvicorn när containern startar
    # Lyssna på porten specificerad av Cloud Run via $PORT miljövariabeln
    CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8080"]
    ```

-   🏗️➡️☁️ **Bygg och pusha imagen:** Använd Google Cloud Artifact Registry för att lagra dina Docker-images. Ersätt `innerjourney-c007e` med ditt projekt-ID och välj en region (t.ex. `europe-west1`).

    ```bash
    # Konfigurera Docker att använda gcloud för autentisering mot Artifact Registry
    gcloud auth configure-docker europe-west1-docker.pkg.dev

    # Bygg Docker-imagen lokalt (se till att du är i katalogen med Dockerfile)
    docker build -t europe-west1-docker.pkg.dev/innerjourney-c007e/innerjourney-repo/innerjourney-backend:latest .

    # Pusha imagen till Artifact Registry
    docker push europe-west1-docker.pkg.dev/innerjourney-c007e/innerjourney-repo/innerjourney-backend:latest
    ```
    *(Notera: Anpassa `innerjourney-repo` till namnet på ditt Artifact Registry repository)*

### 4.3 Deploya till Cloud Run 🚀

-   ⌨️ **Deploy-kommando:** Använd `gcloud` för att deploya den pushade imagen till Cloud Run.

    ```bash
    gcloud run deploy innerjourney-backend \
      --image europe-west1-docker.pkg.dev/innerjourney-c007e/innerjourney-repo/innerjourney-backend:latest \
      --platform managed \
      --region europe-west1 \
      --allow-unauthenticated \
      --service-account=[SERVICE_ACCOUNT_EMAIL] # Ange servicekontot som ska användas
      # Lägg till miljövariabler vid behov, t.ex.:
      # --set-env-vars=GOOGLE_CLOUD_PROJECT=innerjourney-c007e
    ```
    * **Viktigt:** `--allow-unauthenticated` gör tjänsten publik. För produktion, överväg att ta bort detta och implementera autentisering (t.ex. via Firebase Auth eller API Gateway).
    * Ersätt `[SERVICE_ACCOUNT_EMAIL]` med e-postadressen för det servicekonto som Cloud Run-tjänsten ska köra som. Detta konto behöver rätt behörigheter (se nästa punkt).

-   🔗 **Service-URL:** Efter en lyckad deployment får du en publik URL för tjänsten, t.ex. `https://innerjourney-backend-xxxxxxxxxx-ew.a.run.app`.

### 4.4 Hantera Hemligheter i Cloud Run 🔒

-   🔑 **Secret Manager:** API-nycklar och andra hemligheter lagras säkert i Google Cloud Secret Manager. De primära hemligheterna för backend är:
    -   `firebase-credentials` (innehåller service account JSON-strängen)
    -   `gemini-api-key`
-   🛡️ **Behörigheter:** Cloud Run-tjänstens servicekonto (det du angav med `--service-account` vid deploy, eller standardkontot `[PROJECT_NUMBER]-compute@developer.gserviceaccount.com`) måste ha IAM-rollen `Secret Manager Secret Accessor` för att kunna hämta hemligheterna vid körning. Detta konfigureras i GCP Console under `IAM & Admin` > `IAM`.

## 5. Felsökning och Vanliga Problem 🐞

### 5.1 `404 Not Found`

-   🤔 **Orsak:** En specifik route/endpoint (`/gemini/getActivation`, `/users/profile`, etc.) hittas inte av FastAPI. Ofta beror detta på att routern inte är korrekt importerad och registrerad i `backend/main.py`.
-   ✅ **Lösning:** Verifiera att raden `app.include_router(your_router_module.router, prefix="/your_prefix", tags=["Your Tag"])` finns i `backend/main.py` för den relevanta routern (t.ex. `app.include_router(gemini.router, prefix="/gemini", tags=["Gemini"])`). Kontrollera även stavfel i prefix och endpoint-definitioner.

### 5.2 `PermissionDenied` vid Åtkomst till Secret Manager

-   🤔 **Orsak:** Cloud Run-tjänstens servicekonto saknar nödvändiga IAM-behörigheter för att läsa hemligheter från Secret Manager. Felet syns ofta i Cloud Run-loggarna.
-   ✅ **Lösning:** Gå till `IAM & Admin` > `IAM` i Google Cloud Console. Hitta det servicekonto som din Cloud Run-tjänst använder. Klicka på redigeringspennan (Edit principal) och lägg till rollen `Secret Manager Secret Accessor`. Spara ändringarna. Du kan behöva deploya om tjänsten för att ändringen ska slå igenom direkt.

### 5.3 Container failed to start / Application Error

-   🤔 **Orsak:** Applikationen kraschar direkt vid start inne i containern. Detta kan bero på:
    -   Syntaxfel i Python-koden.
    -   Saknade beroenden som inte installerats korrekt (fel i `requirements.txt` eller `Dockerfile` `RUN pip install` steg).
    -   Konfigurationsfel (t.ex. problem med att läsa miljövariabler, initiera Firebase SDK, eller felaktiga sökvägar).
    -   Problem med att binda till porten (kontrollera att `CMD` i `Dockerfile` använder rätt port, ofta via `$PORT` miljövariabeln från Cloud Run).
-   ✅ **Lösning:**
    1.  **Kontrollera loggarna:** Gå till Cloud Run-tjänsten i Google Cloud Console och klicka på fliken `LOGS`. Undersök felmeddelandena noggrant för att identifiera orsaken.
    2.  **Testa lokalt:** Försök att bygga och köra containern lokalt med `docker build` och `docker run` för att replikera och felsöka problemet i en mer kontrollerad miljö. Se till att du mappar portar och eventuellt skickar med miljövariabler som behövs.
        ```bash
        # Bygg lokalt
        docker build -t innerjourney-backend-local .
        # Kör lokalt (ersätt med nödvändiga miljövariabler)
        docker run -p 8080:8080 -e PORT=8080 innerjourney-backend-local
        ```
    3.  **Verifiera `Dockerfile` och `requirements.txt`:** Dubbelkolla att alla nödvändiga paket finns i `requirements.txt` och att `Dockerfile` kopierar all nödvändig kod och kör installationsstegen korrekt.