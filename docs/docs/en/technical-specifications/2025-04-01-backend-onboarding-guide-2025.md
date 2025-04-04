# Backend Onboarding Guide 🚀

Detta dokument beskriver processen för att sätta upp, utveckla och deploya backend för projektet "InnerJourney".

Backend är byggd med en modern teknikstack:

-   🐍 `FastAPI` (Python) för API-ramverket.
-   🔥 `Firestore` (Firebase) för NoSQL-datalagring.
-   🔑 Google Cloud `Secret Manager` för säker hantering av API-nycklar och känsliga data.
-   🐳 `Docker` för containerisering av applikationen.
-   ☁️ `Google Cloud Run` för serverless deployment.

## Lokal Miljö 💻

Att sätta upp en fungerande lokal miljö är det första steget för att kunna bidra till backend-utvecklingen.

### Installera Nödvändiga Verktyg 🛠️

Se till att du har följande verktyg installerade på din utvecklingsmaskin:

-   🐍 **`Python 3.10`**: Installera specifikt denna version för att säkerställa kompatibilitet med projektets beroenden.
-   📦 **`Virtualenv`**: Används för att skapa en isolerad virtuell miljö för projektets Python-paket.

    ```bash title="Skapa och aktivera virtuell miljö"
    # Skapa virtuell miljö (i projektets rotmapp)
    python3.10 -m venv venv

    # Aktivera miljön (Linux/macOS)
    source venv/bin/activate

    # Aktivera miljön (Windows - Git Bash/WSL)
    # source venv/Scripts/activate
    # Aktivera miljön (Windows - Cmd/PowerShell)
    # venv\Scripts\activate
    ```

-   🐙 **`Git`**: Krävs för versionshantering och för att klona projektet.
-   🐳 **`Docker`**: Nödvändigt för att bygga och köra applikationen i en container, vilket speglar produktionsmiljön.
-   ☁️ **`Google Cloud SDK (gcloud)`**: Används för att interagera med Google Cloud-tjänster från kommandoraden, t.ex. för deployment och autentisering mot Artifact Registry.

### Klona Projektet från GitHub 📥

Klona `InnerJourney`-repositoryt till din lokala maskin:

```bash
git clone git@github.com:joelkvarnsmyr/InnerJourney.git
cd InnerJourney
```

### Installera Projektets Beroenden 📜

Med den virtuella miljön aktiverad (`venv`), installera alla Python-paket som definieras i `requirements.txt`:

```bash
pip install -r requirements.txt
```

### Konfigurera Lokala Miljövariabler 🔑

För att köra backend lokalt behöver du konfigurera känsliga uppgifter. Skapa en fil med namnet `.env` i projektets rotkatalog (`InnerJourney/`) och lägg till följande variabler:

```text title=".env fil"
GEMINI_API_KEY="din-gemini-api-nyckel"
FIREBASE_CREDENTIALS_PATH="~/.secrets/api-keys.json"
# Lägg till eventuella andra lokala miljövariabler här
```

⚠️ **Viktigt:**

*   Ersätt `"din-gemini-api-nyckel"` med din faktiska Gemini API-nyckel.
*   Placera din Firebase service account JSON-fil (som du döpt till `api-keys.json` i exemplet) i den absoluta sökväg du angav i `FIREBASE_CREDENTIALS_PATH`.
*   Filerna `.env` och din service account-fil (`api-keys.json` i exemplet) ska **aldrig** checkas in i Git. Se till att de (eller sökvägen till dem) finns med i `.gitignore`-filen.

### Starta Servern Lokalt ▶️

Starta `FastAPI`-utvecklingsservern med `Uvicorn`. Kommandot ska köras från projektets rotmapp med den virtuella miljön aktiverad:

```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8080 --reload
```

Förklaring av flaggor:
*   `--host 0.0.0.0`: Gör servern tillgänglig från ditt lokala nätverk (inte bara `localhost`).
*   `--port 8080`: Standardporten som även används i Cloud Run-konfigurationen.
*   `--reload`: Startar om servern automatiskt när kodändringar upptäcks.

Servern är nu tillgänglig på `http://localhost:8080`. Du kan öppna API-dokumentationen (genererad av FastAPI) i din webbläsare på `http://localhost:8080/docs`.

Du kan även testa en specifik endpoint lokalt med `curl` eller ett API-verktyg som Postman/Insomnia:

```bash title="Exempelanrop med curl"
# Exempel: Anropa /gemini/getActivation
curl -X POST "http://localhost:8080/gemini/getActivation" \
-H "Content-Type: application/json" \
-d '{"mood": 2, "goal": "komma igång"}'
```

## Git och Versionshantering 🐙

Följ dessa riktlinjer för att hålla kodbasen organiserad och underlätta samarbete:

-   🔗 **Git-repository:** Källkoden hanteras på GitHub: `git@github.com:joelkvarnsmyr/InnerJourney.git`.
-   🌱 **Branch-strategi:**
    *   `main`-branchen representerar den stabila koden som är deployad eller redo för deployment. Direktcommits till `main` är inte tillåtna.
    *   Skapa `feature-branches` för allt nytt arbete (nya funktioner, buggfixar, refaktorering). Namnge dem beskrivande, t.ex. `feature/new-user-profile`, `fix/login-error`.
    *   När en feature är klar, skapa en Pull Request (PR) mot `main`. PR:en bör granskas av minst en annan teammedlem innan den mergas.
-   💬 **Commit-rutiner:**
    *   Committa ofta och i små, logiska steg.
    *   Skriv tydliga och beskrivande commit-meddelanden. Följ gärna [Conventional Commits](https://www.conventionalcommits.org/)-standarden:
        *   `feat: Add password reset endpoint`
        *   `fix: Correct Firestore query logic in user service`
        *   `docs: Update backend onboarding guide with Docker details`
        *   `refactor: Improve error handling in gemini service`
        *   `ci: Add linting step to GitHub Actions workflow`
-   🚫 **Ignorera känsliga filer:** Säkerställ att `.gitignore`-filen inkluderar alla filer och mappar som inte ska versionshanteras. Detta inkluderar:
    *   Lokala konfigurationsfiler: `.env`
    *   Virtuella miljöer: `venv/`
    *   Python cache-filer: `__pycache__/`, `*.pyc`
    *   Lokala hemligheter/credentials: Sökvägen du använder för `FIREBASE_CREDENTIALS_PATH` (t.ex. `~/.secrets/`, `*.json` om den ligger i projektet – vilket inte rekommenderas).
    *   IDE-specifika mappar: `.vscode/`, `.idea/`

## Firebase-integration 🔥

Backend använder Firebase för flera centrala funktioner:

-   💾 **`Firestore`:** Används som primär NoSQL-databas. Här lagras data som:
    *   Användarprofiler
    *   Genererade "aktiveringar" (`activations`)
    *   Applikationsloggar och annan relevant data.
    *   (Se eventuellt ett separat dokument `Databasstruktur.md` för en detaljerad beskrivning av datamodellerna).
-   🔑 **`Firebase Admin SDK`:** Backend interagerar med Firebase-tjänster (främst `Firestore`) via `Firebase Admin SDK` för Python. Initieringen av SDK:t hanteras säkert beroende på miljön:
    *   **Produktion (Cloud Run):** Service account-uppgifterna (credentials) hämtas dynamiskt från Google Cloud `Secret Manager`. Detta undviker att ha känsliga filer i kodbasen eller containern.
    *   **Lokalt:** Sökvägen till den lokalt sparade service account JSON-filen läses från miljövariabeln `FIREBASE_CREDENTIALS_PATH` i `.env`-filen.
-   💻 **Kodexempel (`firebase_service.py`):** Nedan visas ett förenklat utdrag från `firebase_service.py` som illustrerar hur hemligheter hämtas från Secret Manager och hur Firebase Admin SDK initieras när applikationen körs i Google Cloud.

    ```python title="firebase_service.py (Utdrag - Initiering & Spara)"
    import firebase_admin
    from firebase_admin import credentials, firestore
    from google.cloud import secretmanager
    import json
    import os
    import logging

    # Konfigurera grundläggande loggning
    logging.basicConfig(level=logging.INFO)

    # Initiera db som None globalt
    db = None

    def get_secret(secret_id, project_id="innerjourney-c007e", version_id="latest"):
        """Hämtar en hemlighet från Google Secret Manager."""
        try:
            client = secretmanager.SecretManagerServiceClient()
            name = f"projects/{project_id}/secrets/{secret_id}/versions/{version_id}"
            response = client.access_secret_version(request={"name": name})
            payload = response.payload.data.decode("UTF-8")
            logging.info(f"🔑 Hemlighet '{secret_id}' hämtad från Secret Manager.")
            return payload
        except Exception as e:
            logging.error(f"❌ Fel vid hämtning av hemlighet '{secret_id}': {e}")
            return None

    def initialize_firebase():
        """Initierar Firebase Admin SDK."""
        global db
        if firebase_admin._apps:
            logging.info("Firebase Admin SDK redan initierad.")
            if db is None: # Säkerställ att db är satt om SDK redan är initierad
                 db = firestore.client()
            return

        try:
            # Försök hämta från Secret Manager (Produktion/Cloud Run)
            firebase_credentials_json = get_secret("firebase-credentials")
            if firebase_credentials_json:
                firebase_credentials_dict = json.loads(firebase_credentials_json)
                cred = credentials.Certificate(firebase_credentials_dict)
                firebase_admin.initialize_app(cred)
                db = firestore.client()
                logging.info("✅ Firebase Admin SDK initierat framgångsrikt via Secret Manager.")
            else:
                # Fallback till lokal fil via miljövariabel (Lokal utveckling)
                local_creds_path = os.getenv("FIREBASE_CREDENTIALS_PATH")
                if local_creds_path:
                    expanded_path = os.path.expanduser(local_creds_path) # Hanterar '~'
                    if os.path.exists(expanded_path):
                        cred = credentials.Certificate(expanded_path)
                        firebase_admin.initialize_app(cred)
                        db = firestore.client()
                        logging.info(f"✅ Firebase Admin SDK initierat framgångsrikt via lokal fil: {expanded_path}")
                    else:
                        logging.error(f"❌ Lokal Firebase credentials-fil hittades inte på: {expanded_path}")
                else:
                    logging.error("❌ Ingen Firebase credentials-källa (Secret Manager eller lokal fil) kunde hittas.")

        except json.JSONDecodeError as e:
            logging.error(f"❌ Fel vid tolkning av Firebase credentials JSON från Secret Manager: {e}")
        except Exception as e:
            logging.error(f"❌ Okänt fel vid initiering av Firebase Admin SDK: {e}")

    # Anropa initieringen vid modulimport
    initialize_firebase()

    def save_to_firestore(collection: str, doc_id: str, data: dict):
        """Sparar data till en specifik Firestore-collection."""
        if db:  # Kontrollera att db är initierad
            try:
                doc_ref = db.collection(collection).document(doc_id)
                doc_ref.set(data)
                logging.info(f"💾 Data sparad till Firestore: {collection}/{doc_id}")
                return True
            except Exception as e:
                logging.error(f"❌ Fel vid sparande till Firestore ({collection}/{doc_id}): {e}")
                return False
        else:
            logging.error("❌ Firestore client (db) är inte initierad. Kan inte spara data.")
            return False
    ```

## Deployment till Google Cloud Run ☁️

Backend-applikationen deployas som en containeriserad tjänst till Google Cloud Run.

### Förberedelser ✅

Innan du kan deploya, säkerställ följande:

-   🏗️ **Google Cloud-projekt:** Du behöver ha tillgång till GCP-projektet `innerjourney-c007e` med tillräckliga behörigheter (t.ex. `Cloud Run Admin`, `Service Account User`, `Storage Admin` för Artifact Registry).
-   🔌 **Aktiverade API:er:** Följande Google Cloud API:er måste vara aktiverade i projektet:
    -   `Cloud Run API`
    -   `Secret Manager API`
    -   `Artifact Registry API` (används för att lagra Docker-images)
    -   `Cloud Build API` (om du planerar att använda Cloud Build för CI/CD)
    -   `Identity and Access Management (IAM) API`

### Bygg och Pusha Docker-image 🐳

Applikationen paketeras i en Docker-container med hjälp av `Dockerfile`.

-   📄 **`Dockerfile`:** Definitionen för hur container-imagen ska byggas.

    ```dockerfile title="Dockerfile"
    # Använd en officiell Python 3.10 slim-image som bas
    FROM python:3.10-slim

    # Sätt arbetskatalogen inne i containern
    WORKDIR /app

    # Installera systemberoenden om nödvändigt (t.ex. för vissa Python-paket)
    # RUN apt-get update && apt-get install -y --no-install-recommends gcc && rm -rf /var/lib/apt/lists/*

    # Kopiera endast requirements.txt först för att utnyttja Docker layer caching
    COPY requirements.txt .

    # Uppdatera pip och installera Python-beroenden
    # Använd --no-cache-dir för att hålla imagen mindre
    RUN pip install --no-cache-dir --upgrade pip && \
        pip install --no-cache-dir -r requirements.txt

    # Kopiera resten av applikationskoden till arbetskatalogen
    COPY . .

    # Exponera porten som Uvicorn kommer att lyssna på (Cloud Run sätter $PORT)
    EXPOSE 8080

    # Kommando för att starta applikationen när containern körs
    # Lyssna på 0.0.0.0 och porten specificerad av Cloud Run ($PORT, default 8080)
    CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8080"]
    ```

-   🏗️➡️☁️ **Bygg och pusha imagen till Artifact Registry:** Använd `gcloud` och `docker` för att bygga och ladda upp imagen. Ersätt `europe-west1` med din region om den är annorlunda, och `innerjourney-repo` med namnet på ditt Artifact Registry repository.

    1.  **Konfigurera Docker:** Autentisera mot Artifact Registry i din region (ersätt `europe-west1` vid behov).
        ```bash
        gcloud auth configure-docker europe-west1-docker.pkg.dev
        ```
    2.  **Bygg Docker-imagen:** Körs från projektets rotmapp där `Dockerfile` finns. Tagga imagen med formatet: `REGION-docker.pkg.dev/PROJECT-ID/REPO-NAME/IMAGE-NAME:TAG`.
        ```bash
        # Exempel:
        docker build -t europe-west1-docker.pkg.dev/innerjourney-c007e/innerjourney-repo/innerjourney-backend:latest .
        ```
    3.  **Pusha imagen:** Ladda upp den byggda imagen till Artifact Registry.
        ```bash
        docker push europe-west1-docker.pkg.dev/innerjourney-c007e/innerjourney-repo/innerjourney-backend:latest
        ```
    ✨ *Notera: Säkerställ att Artifact Registry-repositoryt (`innerjourney-repo` i exemplet) existerar i ditt GCP-projekt och din region.*

### Deploya till Cloud Run 🚀

Använd `gcloud` för att deploya den nyligen pushade Docker-imagen som en Cloud Run-tjänst.

-   ⌨️ **Deploy-kommando:**

    ```bash
    # Ersätt [SERVICE_ACCOUNT_EMAIL] med e-postadressen för servicekontot
    gcloud run deploy innerjourney-backend \
      --image europe-west1-docker.pkg.dev/innerjourney-c007e/innerjourney-repo/innerjourney-backend:latest \
      --platform managed \
      --region europe-west1 \
      --service-account=[SERVICE_ACCOUNT_EMAIL] \
      --allow-unauthenticated \
      # Lägg till eventuella miljövariabler som INTE är hemligheter här
      # Exempelvis: --set-env-vars=LOG_LEVEL=INFO
      # Hemligheter monteras separat (se nästa avsnitt)
    ```
    *   **Servicekonto (`--service-account`):** Ange e-postadressen för det **specifika servicekonto** som Cloud Run-tjänsten ska köra som. Detta konto behöver noggrant konfigurerade IAM-behörigheter för att få åtkomst till andra GCP-tjänster (som Secret Manager, Firestore etc.). Använd **inte** det bredare default Compute Engine service account om möjligt.
    *   ⚠️ **Varning (`--allow-unauthenticated`):** Denna flagga gör din tjänst publikt tillgänglig på internet utan krav på autentisering. För de flesta produktionsapplikationer bör du **ta bort** denna flagga och implementera autentisering/auktorisering, t.ex. via Google Cloud IAM, Identity Platform, Firebase Auth, eller en API Gateway framför tjänsten.

-   🔗 **Service-URL:** Efter en lyckad deployment kommer `gcloud` att skriva ut den publika URL:en för din tjänst, t.ex. `https://innerjourney-backend-xxxxxxxxxx-ew.a.run.app`.

### Hantera Hemligheter i Cloud Run 🔒

Känsliga data som API-nycklar och databas-credentials ska **aldrig** bakas in i Docker-imagen eller sättas som vanliga miljövariabler. Använd istället Google Cloud `Secret Manager`.

-   🔑 **Lagrade Hemligheter:** De primära hemligheterna som backend behöver är lagrade i Secret Manager under följande namn (secrets):
    -   `firebase-credentials`: Innehåller hela innehållet i Firebase service account JSON-filen som en textsträng.
    -   `gemini-api-key`: Innehåller API-nyckeln för Gemini.
-   ⚙️ **Montera Hemligheter i Cloud Run:** När du deployar (eller uppdaterar) din Cloud Run-tjänst kan du konfigurera den att montera hemligheter som miljövariabler eller som filer i containerns filsystem. Att montera som miljövariabler är ofta enklast:

    ```bash title="Exempel: Montera hemligheter som miljövariabler"
    # Exempel på att montera hemligheter som miljövariabler vid deployment
    gcloud run deploy innerjourney-backend \
      --image ... \
      --region ... \
      --service-account ... \
      # Ta bort --allow-unauthenticated om autentisering krävs
      # Montera firebase-credentials som miljövariabel FIREBASE_CREDENTIALS_JSON
      --update-secrets=FIREBASE_CREDENTIALS_JSON=firebase-credentials:latest \
      # Montera gemini-api-key som miljövariabel GEMINI_API_KEY
      --update-secrets=GEMINI_API_KEY=gemini-api-key:latest
      # ... andra flaggor ...
    ```
    Applikationskoden (som i `firebase_service.py`-exemplet ovan) kan sedan läsa dessa miljövariabler.

-   🛡️ **Behörigheter för Servicekontot:** Det servicekonto som anges i `--service-account` **måste** ha IAM-rollen `Secret Manager Secret Accessor` för att få läsa värdena från Secret Manager. Konfigurera detta i GCP Console:
    1.  Navigera till `IAM & Admin` -> `IAM`.
    2.  Hitta e-postadressen för servicekontot som används av Cloud Run-tjänsten.
    3.  Klicka på pennikonen (Edit principal) för det kontot.
    4.  Klicka på `+ ADD ANOTHER ROLE`.
    5.  Sök efter och välj rollen `Secret Manager Secret Accessor`.
    6.  Klicka på `SAVE`.

## Felsökning och Vanliga Problem 🐞

Här är lösningar på några vanliga problem som kan uppstå under utveckling eller deployment.

### `404 Not Found` vid Anrop till Endpoint

-   🤔 **Orsak:** `FastAPI` hittar inte den specifika route (URL-sökväg) du försöker anropa, t.ex. `/gemini/getActivation` eller `/users/profile`. Oftast beror detta på att routern för den specifika funktionaliteten (t.ex. `gemini_router`, `users_router`) inte har blivit korrekt importerad och inkluderad i huvudapplikationsobjektet i `backend/main.py`.
-   ✅ **Lösning:**
    1.  Öppna filen `backend/main.py`.
    2.  Verifiera att routern för den saknade endpointen är importerad högst upp (t.ex. `from .routers import gemini, users`).
    3.  Kontrollera att `app.include_router()` anropas för routern, med korrekt `prefix` och `tags`. Exempel:
        ```python title="backend/main.py (Router Inclusion)"
        # ... importer ...
        from .routers import gemini, users # Se till att din router är här

        app = FastAPI(title="InnerJourney Backend")

        # ... middleware etc. ...

        # Inkludera routers
        app.include_router(gemini.router, prefix="/gemini", tags=["Gemini"])
        app.include_router(users.router, prefix="/users", tags=["Users"])
        # ... inkludera andra routers ...
        ```
    4.  Dubbelkolla stavningen av prefixet (t.ex. `/gemini`) och endpoint-definitionen i själva router-filen (t.ex. `@router.post("/getActivation", ...)`).

### `PermissionDenied` vid Åtkomst till Secret Manager eller Firestore

-   🤔 **Orsak:** Detta inträffar nästan alltid när Cloud Run-tjänsten körs. Felet betyder att servicekontot som tjänsten kör som (`--service-account`) saknar nödvändiga IAM-behörigheter för att komma åt den specifika GCP-tjänsten (Secret Manager eller Firestore/Datastore). Felet syns tydligt i Cloud Run-tjänstens loggar i GCP Console.
    *   För Secret Manager är den vanligaste saknade behörigheten `secretmanager.versions.access` (ingår i rollen `Secret Manager Secret Accessor`).
    *   För Firestore krävs roller som `Cloud Datastore User` eller mer specifika Firestore-roller.
-   ✅ **Lösning:**
    1.  Identifiera exakt vilket servicekonto din Cloud Run-tjänst använder. Du kan använda `gcloud` eller kolla i GCP Console:
        ```bash
        gcloud run services describe innerjourney-backend --region=europe-west1 --format='value(spec.template.spec.serviceAccountName)'
        ```
    2.  Gå till `IAM & Admin` > `IAM` i Google Cloud Console.
    3.  Hitta servicekontot i listan över principals.
    4.  Klicka på redigeringspennan (Edit principal).
    5.  **Lägg till** de nödvändiga rollerna:
        *   För Secret Manager: Lägg till rollen `Secret Manager Secret Accessor`.
        *   För Firestore: Lägg till rollen `Cloud Datastore User` (ger bred åtkomst) eller en mer begränsad roll om möjligt.
    6.  Klicka `SAVE`.
    7.  Det kan krävas en ny deployment av Cloud Run-tjänsten för att ändringarna ska plockas upp omedelbart (`gcloud run deploy ...` med samma image).

### Container Failed to Start / Application Error

-   🤔 **Orsak:** Applikationen kraschar omedelbart när containern försöker starta i Cloud Run. Detta kan ha många orsaker:
    *   **Syntaxfel:** Ett fel i Python-koden som hindrar den från att ens laddas.
    *   **Saknade Beroenden:** Ett paket som används i koden finns inte specificerat i `requirements.txt` eller misslyckades att installeras under `docker build`.
    *   **Konfigurationsfel:** Problem med att läsa miljövariabler, initiera Firebase SDK (t.ex. ogiltiga credentials, felaktig sökväg), eller andra startkonfigurationer.
    *   **Portproblem:** `Uvicorn`-kommandot i `Dockerfile` (`CMD`) är felaktigt eller försöker binda till fel port (Cloud Run förväntar sig att appen lyssnar på porten angiven i `$PORT`-miljövariabeln, vilket ofta är `8080`).
    *   **Importfel:** Problem med relativa eller absoluta importer i Python-koden.
-   ✅ **Lösning:**
    1.  **Kontrollera Loggarna:** 🔍 Detta är det viktigaste steget. Gå till din Cloud Run-tjänst i GCP Console och välj fliken `LOGS`. Granska loggarna (särskilt de markerade som Error) noggrant. De innehåller oftast en Python traceback eller ett felmeddelande som pekar på den exakta orsaken till kraschen.
    2.  **Testa Lokalt med Docker:** 💻 Bygg och kör exakt samma Docker-image lokalt för att felsöka i en kontrollerad miljö. Detta hjälper till att isolera om problemet ligger i koden/containern eller i Cloud Run-konfigurationen.
        ```bash title="Kör container lokalt för felsökning"
        # 1. Bygg imagen lokalt (om du inte redan gjort det)
        docker build -t innerjourney-backend-local .

        # 2. Kör containern lokalt, mappa port 8080 och skicka med miljövariabler
        # Använd --env-file för att läsa från din lokala .env-fil:
        # docker run --rm -p 8080:8080 --env-file .env innerjourney-backend-local

        # Alternativt, sätt variabler manuellt (anpassa värden):
        docker run --rm -p 8080:8080 \
          -e PORT=8080 \
          -e FIREBASE_CREDENTIALS_PATH="/app/path/to/your/local-or-mock-credentials.json" \
          -e GEMINI_API_KEY="your-local-key" \
          innerjourney-backend-local
        ```
        Se om containern startar och om du får några felmeddelanden i terminalen.
    3.  **Verifiera `Dockerfile` och `requirements.txt`:** ✨ Dubbelkolla att alla nödvändiga paket finns i `requirements.txt`. Säkerställ att `Dockerfile` korrekt kopierar all nödvändig kod (`COPY . .`) *efter* `pip install` och att `CMD`-instruktionen är korrekt (`uvicorn backend.main:app --host 0.0.0.0 --port 8080`).