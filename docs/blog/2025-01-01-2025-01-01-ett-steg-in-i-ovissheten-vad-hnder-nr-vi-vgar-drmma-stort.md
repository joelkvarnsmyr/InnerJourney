Okay, här är det omformaterade innehållet för varje styrdokument och blogginlägget, strukturerat för Docusaurus och med förbättrad Markdown. Jag har behållit allt innehåll och dess innebörd, förbättrat struktur/läsbarhet och lagt till lämpliga emojis samt komplett Docusaurus-kompatibel front matter.

---

**Fil: `styrdokument-innerjourney-syfte-vision.md`**
```markdown
---
id: styrdokument-innerjourney-syfte-vision
title: "📜 Styrdokument: Syfte, Vision & Arkitektur"
description: "Övergripande styrdokument för InnerJourney som beskriver syfte, vision, arkitektur, utvecklingsmiljö, säkerhet och mer."
slug: /technical-docs/governance/purpose-vision-architecture
sidebar_label: "Styrdokument Översikt"
sidebar_position: 1
tags:
  - styrdokument
  - arkitektur
  - vision
  - backend
  - frontend
  - säkerhet
  - utvecklingsmiljö
  - testning
  - deployment
  - dokumentation
---

# 📜 Styrdokument: InnerJourney

Detta dokument beskriver de övergripande riktlinjerna och tekniska valen för InnerJourney-plattformen.

## 🎯 1. Syfte och Vision

-   **Syfte:** InnerJourney är en plattform för personlig utveckling som kombinerar astrologi och AI-interaktion för att hjälpa användare att reflektera över sina liv och växa som individer 🌱.
-   **Vision:** Att bli en ledande digital plattform för självreflektion och personlig tillväxt, tillgänglig för användare globalt 🌍, med en intuitiv och säker upplevelse ✨.

## 🏗️ 2. Arkitekturöversikt

### 🐍 Backend

-   **Ramverk:** `FastAPI` (Python) för snabb och effektiv API-utveckling.
-   **Datalagring:** Firebase `Firestore` 🔥 för flexibel och skalbar NoSQL-databas.
-   **Hosting:** Google `Cloud Run` ☁️ för automatisk skalning och containerbaserad deployment.
-   **Säkerhet:** Google `Cloud Secret Manager` 🔑 för hantering av API-nycklar och andra hemligheter.

### ⚛️ Frontend

-   **Ramverk:** `React` med `TypeScript` för robust och typad kod.
-   **Styling:** `Chakra UI` 🎨 för ett enhetligt och användarvänligt gränssnitt.
-   **Autentisering:** `Firebase Authentication` 🔒 för säker inloggning.
-   **Hosting:** `Firebase Hosting` 🌐 för enkel och snabb deployment.

### ↔️ Kommunikation

-   API-anrop sker via HTTPS.
-   En `proxy rewrite` i `Firebase Hosting` används för att hantera API-förfrågningar och undvika CORS-problem.

## 🛠️ 3. Utvecklingsmiljö och Verktyg

-   **Versionshantering:** `Git` med `GitHub` 🐙 som plattform. `main`-branchen används för stabil kod, och `feature`-branches skapas för nya funktioner.
-   **IDE:** Rekommenderade val är `VSCode` eller `PyCharm` för backend, `WebStorm` eller `VSCode` för frontend 💻.
-   **Kodkvalitet:**
    -   **Frontend:** `ESLint` och `Prettier` för kodformatering och linting.
    -   **Backend:** `Flake8` och `Black` för att säkerställa konsekvent kodstil.
-   **CI/CD:** `GitHub Actions` 🚀 för automatiserad testning och deployment vid varje push eller pull request.

## 🧩 4. Modulär design och Skalbarhet

### 🐍 Backend

-   **API-design:** `RESTful` endpoints, t.ex. `/init-birthdata` för att spara födelsedata och `/astro-data` för att hämta astrologisk information.
-   **Tjänster:** Logik separeras i moduler, exempelvis `gemini_service.py` för AI-integration och `firebase_service.py` för databasinteraktion.
-   **Framtida integrationer:** Förberedd arkitektur för integration med `Dialogflow` (chatbot 🤖) och `ElevenLabs` (röstgenerering 🗣️).

### ⚛️ Frontend

-   **Navigering:** `React Router` för smidig sidnavigering.
-   **Komponenter:** Fokus på återanvändbara komponenter som `ActivationForm.tsx` och `AstroResults.tsx`.
-   **State Management:** `React Context` eller `Redux` för global tillståndshantering.

## 🔒 5. Säkerhet

-   **Autentisering:** `Firebase Authentication` med e-post/lösenord. Planerad utökning till telefonverifiering 📱.
-   **API-säkerhet:** Validering av `id_token` i backend för att säkerställa att anrop kommer från autentiserade användare.
-   **Datahantering:** Kryptering av känslig data i `Firestore` och användning av `Secret Manager` för API-nycklar.
-   **GDPR:** Implementering av samtyckesformulär för användare och hantering av personuppgifter enligt gällande lagkrav 🇪🇺.

## ✅ 6. Testning och Kvalitetssäkring

-   **Enhetstester:**
    -   **Backend:** `pytest` för att testa API-logik och tjänster.
    -   **Frontend:** `Jest` och `React Testing Library` för komponenttester.
-   **Integrationstester:** Testa API-anrop och autentiseringsflöden end-to-end.
-   **Automatisering:** Tester körs automatiskt i `CI/CD`-pipelinen vid varje kodändring för att säkerställa kvalitet 👍.

## 🚀 7. Deployment och Underhåll

### ☁️ Deployment

-   **Backend:** Google `Cloud Run` med automatisk skalning baserat på trafik.
-   **Frontend:** `Firebase Hosting` med `proxy rewrite` för API-anrop.

### 👀 Övervakning

-   Google `Cloud Logging` för att spåra fel och prestanda.
-   `Firebase Analytics` för att analysera användarbeteende.

### 🔧 Underhåll

-   Regelbundna uppdateringar av beroenden och säkerhetspatchar.
-   Planerade granskningar av kodbasen för att säkerställa långsiktig hållbarhet och kvalitet.

## 📚 8. Dokumentation och Onboarding

-   **Teknisk dokumentation:** En central `README.md` och en `/docs`-mapp i repot med installationsinstruktioner, arkitekturöversikt och API-dokumentation.
-   **Onboarding-guide:** Steg-för-steg-instruktioner för nya utvecklare, inklusive hur man sätter upp miljön och kör projektet lokalt 🤝.
```

---

**Fil: `projektbeskrivning-innerjourney.md`**
```markdown
---
id: projektbeskrivning-innerjourney
title: "📝 Projektbeskrivning: Inner Journey"
description: "Beskriver Inner Journey-projektets översikt, målgrupp, huvudfunktioner, betalningsmodeller, teknisk implementering och MVP-strategi."
slug: /docs/project/projektbeskrivning-2025
sidebar_label: "Projektbeskrivning"
sidebar_position: 2
tags:
  - projektbeskrivning
  - målgrupp
  - funktioner
  - mvp
  - strategi
  - coaching
  - betalningsmodell
---

# 📝 Projektbeskrivning: Inner Journey

**✨ Version:** 0.7
**📅 Datum:** 2025-03-24
**👤 Författare:** Bo Joel Kvarnsmyr
**🔄 Senast reviderad av:** Bo Joel Kvarnsmyr

## 💡 Översikt & Unikt Värdeerbjudande

Inner Journey är en plattform för självutveckling som kombinerar praktiska övningar, reflektion och social interaktion för att hjälpa användare att växa och hantera vardagens utmaningar – **utan fluffiga löften**. Genom en personlig startprocess och ett anpassningsbart gränssnitt blir upplevelsen skräddarsydd och engagerande.

Användare kan utforska övningar, logga reflektioner och koppla upp sig med andra, allt presenterat på ett modernt och användarvänligt sätt.

**För mer information, se:**

*   [Onboarding-process](#) (Länk till relevant dokument)
*   [Activations: Inner Journey](#) (Länk till relevant dokument)
*   [Teknisk dokumentation för backend](#) (Länk till relevant dokument)
*   [Teknisk dokumentation för frontend](#) (Länk till relevant dokument)

## 🎯 Definierad Målgrupp för Lansering

För att effektivt utveckla och nå ut med Inner Journey prioriteras följande målgrupper:

*   **Primär målgrupp:** Personer som aktivt arbetar med självförbättring – t.ex. coacher, entreprenörer eller individer som redan använder verktyg som meditation eller journaling. De uppskattar verktyg som gör vardagen mer meningsfull och effektiv.
*   **Sekundär målgrupp:** Individer som känner sig fast i rutinerna och söker konkreta sätt att bryta mönster, förbättra sitt mående eller hitta ny riktning – utan att nödvändigtvis vara "spirituella".

**Gemensamma Psykografiska Egenskaper:**

*   Praktiskt sinnade, nyfikna och öppna för att testa nya verktyg för personlig utveckling.
*   Attraheras av tydliga resultat, smart design och en känsla av kontroll över sin egen resa.
*   Värderar både individuell reflektion och möjligheten att koppla upp sig med andra.

## 🚀 Huvudfunktioner & Koncept

Inner Journey är byggd för att ge användare praktiska verktyg för självutveckling, anpassade efter deras liv och behov. Här är de tre huvudsakliga funktionerna vid lansering:

1.  **Personliga Resor:** Användare kan skapa skräddarsydda planer baserade på sina mål – oavsett om det är att minska stress, hitta fokus eller utforska nya vanor. Plattformen guidar dem steg för steg med övningar och reflektioner.
2.  **Dynamisk Journal:** En smart journalfunktion som föreslår frågor och teman baserat på användarens tidigare insikter, vilket gör reflektion både djupare och mer meningsfull ✍️.
3.  **Integrerade Verktyg:** Kombinerar meditation, målsättning och spårning av framsteg i en sömlös upplevelse – allt för att ge användaren kontroll över sin utveckling utan krångel.

**Konceptet i korthet:** Inner Journey är en flexibel följeslagare för självinsikt, designad för att möta användaren där de är och hjälpa dem ta nästa steg – utan pekpinnar eller fluff.

För tekniska detaljer, se [Funktionsspecifikation](#) (Länk till relevant dokument).

## 💰 Betalningsmodeller

Inner Journey erbjuder en flexibel betalningsstruktur för att passa olika användares behov:

*   **Gratisversion:** Ger tillgång till grundläggande övningar och journalfunktioner.
*   **Premiumversion:** Låser upp avancerade övningar och personliga planer för en djupare upplevelse.
*   **Prenumerationsbaserad betalning:** Månads- eller årsprenumerationer för premiumfunktioner, med rabatterade priser för längre åtaganden 🪙.

För mer information, se [Betalningsmodeller-dokumentet](#) (Länk till relevant dokument).

## 🤝 Coaching

Coaching är en naturlig del av resan i Inner Journey. Som användare kan du växa till att bli coach, där du stöttar nya eller befintliga användare utan coach – ett steg som både hjälper andra och fördjupar din egen utveckling.

Coacher arbetar tillsammans med sina användare genom gemensamma uppgifter, och certifierade coacher kan även guida andra coacher.

För mer information, se [Coaching-strategi](#) (Länk till relevant dokument).

## 📣 Strategi för Användarfeedback & Kommunikation

Inner Journey är byggd för att växa med sina användare. Vi samlar in feedback genom en enkel knapp i appen som länkar till ett kort formulär 📝, och vi håller kontakten via mejl och en community-kanal.

Detta ger oss möjlighet att snabbt fånga upp användarnas tankar och göra förbättringar löpande. Transparens och användarfokus är nyckeln till en engagerad användarbas.

För mer information, se [Användarfeedback-strategi](#) (Länk till relevant dokument).

## 💻 Teknisk Implementering (Sammanfattning)

Inner Journey är byggd för att vara smidig och säker. Vi använder:

*   **Backend:** `Python` (med `FastAPI`) 🐍
*   **Frontend:** `React` (med `TypeScript`) ⚛️
*   **App-format:** Progressive Web App (`PWA`) för tillgänglighet på alla enheter 📱💻.
*   **Infrastruktur:** `Firebase` för autentisering och datalagring 🔥.
*   **Extrafunktioner:** `AI` 🤖 och chattverktyg för att förstärka upplevelsen.

För mer information, se:

*   [Teknisk dokumentation för backend](#) (Länk till relevant dokument)
*   [Teknisk dokumentation för frontend](#) (Länk till relevant dokument)

## 🌱 Inledande Strategi för MVP-lansering

MVP:n (Minimum Viable Product) av Inner Journey fokuserar på en stabil grund med:

*   Säker `autentisering`.
*   Enkel `onboarding`.
*   Möjlighet till `daglig loggning`.

Vi lanserar med ett fåtal övningar, som andning för fokus och reflektionsuppgifter, och ett stilrent gränssnitt inspirerat av Typeform och Superhuman. Användarfeedback kommer att forma nästa steg i utvecklingen.

För mer information, se:

*   [Utvecklingsplan](#) (Länk till relevant dokument)
*   [Användargränssnitt: Inner Journey](#) (Länk till relevant dokument)

## 🌟 Framtidsvision & Tillväxtstrategi

Inner Journey siktar på att bli en ledande plattform för **praktisk självutveckling**, där användare kan ta kontroll över sitt mående och sina mål.

Vi vill växa genom att erbjuda flexibla prisalternativ och bygga en stark community som stöttar både nybörjare och erfarna coacher.

För mer information, se:

*   [Utvecklingsplan](#) (Länk till relevant dokument)
*   [Betalningsmodeller & Integrerad Coaching](#) (Länk till relevant dokument)
```

---

**Fil: `onboarding-backend.md`**
```markdown
---
id: onboarding-backend
title: "⚙️ Backend Onboarding: Setup, Utveckling & Deployment"
description: "Guide för att sätta upp, utveckla och deploya InnerJourney backend (FastAPI, Firebase, Docker, Cloud Run)."
slug: /technical-docs/backend/onboarding
sidebar_label: "Backend Onboarding"
sidebar_position: 3
tags:
  - backend
  - onboarding
  - setup
  - fastapi
  - docker
  - cloud-run
  - firebase
  - python
  - git
  - gcloud
  - secret-manager
---

# ⚙️ Backend: Setup, Utveckling och Deployment för InnerJourney

Detta dokument beskriver processen för att sätta upp, utveckla och deploya backend för InnerJourney. Backend är byggd med `FastAPI` (Python 🐍), integrerad med Firebase (`Firestore` 🔥) för datalagring och Google Cloud `Secret Manager` 🔑 för säker hantering av API-nycklar. Applikationen är containeriserad med `Docker` 🐳 och deployad till `Google Cloud Run` ☁️.

## 1. Lokal Miljö 💻

### 1.1 Installera Nödvändiga Verktyg 🛠️

För att sätta upp en fungerande lokal miljö behöver du följande verktyg:

-   **🐍 Python 3.10:** Installera denna version för kompatibilitet med projektets beroenden.
-   **📦 Virtualenv:** Skapa en virtuell miljö för att isolera projektets paket.
    ```bash
    # Skapa virtuell miljö
    python3.10 -m venv venv

    # Aktivera miljön (Linux/macOS)
    source venv/bin/activate

    # Aktivera miljön (Windows)
    # venv\Scripts\activate
    ```
-   **🐙 Git:** För versionshantering.
-   **🐳 Docker:** För att containerisera applikationen.
-   **☁️ Google Cloud SDK (`gcloud`):** För att hantera Google Cloud-tjänster lokalt.

### 1.2 Klona Projektet från GitHub 📥

Klona repot till din lokala maskin:

```bash
git clone git@github.com:joelkvarnsmyr/InnerJourney.git
cd InnerJourney
```

### 1.3 Installera Projektets Beroenden 📜

Aktivera din virtuella miljö och installera Python-paketen som anges i `requirements.txt`:

```bash
pip install -r requirements.txt
```

### 1.4 Konfigurera Lokala Miljövariabler 🔑

Skapa en `.env`-fil i projektets rotmapp för att lagra känsliga uppgifter lokalt. **Denna fil ska INTE checkas in i Git.**

```dotenv
# .env fil
GEMINI_API_KEY="din-gemini-api-nyckel"
FIREBASE_CREDENTIALS_PATH="~/.secrets/api-keys.json" # Eller annan säker sökväg
```

**Viktigt:** Placera din Firebase service account JSON-fil (`api-keys.json` i exemplet) i sökvägen du angav. Säkerställ att både `.env` och secrets-filen är listade i `.gitignore`.

### 1.5 Starta Servern Lokalt ▶️

Starta FastAPI-servern med `Uvicorn`. `--reload` gör att servern startar om automatiskt vid kodändringar.

```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8080 --reload
```

Servern är nu tillgänglig på `http://localhost:8080`.

Du kan testa en endpoint lokalt, till exempel `gemini/getActivation`:

```bash
curl -X POST "http://localhost:8080/gemini/getActivation" \
     -H "Content-Type: application/json" \
     -d '{"mood": 2, "goal": "komma igång"}'
```

## 2. Git och Versionshantering 🐙

-   **🔗 Git-repository:** Projektet finns på GitHub: `git@github.com:joelkvarnsmyr/InnerJourney.git`.
-   **🌿 Branch-strategi:**
    -   `main`: Stabil kod redo för deployment.
    -   `feature/<feature-name>`: Skapa nya branches för funktioner eller buggfixar (t.ex. `feature/new-activation-endpoint`).
    -   Merga till `main` via Pull Requests (PRs) efter code review.
-   **💬 Commit-rutiner:** Committa regelbundet med tydliga och beskrivande meddelanden. Följ gärna konventionen *Conventional Commits*. Exempel:
    -   `feat: Add gemini router to main.py`
    -   `fix: Correct Firestore query in user service`
    -   `docs: Update backend onboarding guide`
-   **🚫 Ignorera känsliga filer:** Säkerställ att filer och mappar som `.env`, `venv/`, `__pycache__/` och sökvägen till dina credentials (t.ex. `~/.secrets/`) finns i `.gitignore`.

## 3. Firebase-integration 🔥

-   **💾 Firestore:** Används som NoSQL-databas för att lagra data såsom användarprofiler, aktiveringar (`activations`), och loggar. Se [Databasstruktur](/docs/tech-spec/databasstruktur-2025) för detaljer.
-   **🔑 Firebase Admin SDK:** Används i backend för att interagera med Firebase-tjänster.
    -   **Produktion (Cloud Run):** SDK initieras med service account-uppgifter som hämtas säkert från `Google Cloud Secret Manager` vid körning.
    -   **Lokalt:** SDK använder sökvägen till credentials-filen specificerad i `.env`-filen.
-   **💻 Kodexempel (`firebase_service.py`):** Visar hur hemligheter hämtas från Secret Manager och hur Firebase Admin SDK initieras i produktionsmiljön.

    ```python
    from google.cloud import secretmanager
    import json
    import firebase_admin
    from firebase_admin import credentials, firestore
    import os
    import logging # Använd logging istället för print för bättre spårbarhet

    logging.basicConfig(level=logging.INFO)

    def get_secret(secret_name, project_id="innerjourney-c007e"):
        """Hämtar den senaste versionen av en hemlighet från Google Secret Manager."""
        client = secretmanager.SecretManagerServiceClient()
        secret_version_name = f"projects/{project_id}/secrets/{secret_name}/versions/latest"
        try:
            response = client.access_secret_version(name=secret_version_name)
            payload = response.payload.data.decode("UTF-8")
            logging.info(f"Successfully fetched secret: {secret_name}")
            return payload
        except Exception as e:
            logging.error(f"Error fetching secret {secret_name}: {e}")
            return None

    # Försök initiera Firebase Admin SDK endast om det inte redan är gjort
    if not firebase_admin._apps:
        firebase_credentials_json = None
        # Försök hämta från Secret Manager (typiskt i produktion/Cloud Run)
        if os.getenv("GOOGLE_CLOUD_PROJECT"): # En indikator på att vi kör i GCP
             firebase_credentials_json = get_secret("firebase-credentials")
        # Fallback för lokal utveckling (om path finns i .env)
        elif os.getenv("FIREBASE_CREDENTIALS_PATH"):
            try:
                with open(os.path.expanduser(os.getenv("FIREBASE_CREDENTIALS_PATH")), "r") as f:
                    firebase_credentials_json = f.read()
                logging.info("Loaded Firebase credentials from local path specified in .env")
            except Exception as e:
                logging.error(f"Failed to load Firebase credentials from local path: {e}")

        if firebase_credentials_json:
            try:
                firebase_credentials_dict = json.loads(firebase_credentials_json)
                cred = credentials.Certificate(firebase_credentials_dict)
                firebase_admin.initialize_app(cred)
                db = firestore.client()
                logging.info("✅ Firebase Admin SDK initialized successfully.")
            except json.JSONDecodeError as e:
                logging.error(f"❌ Error parsing Firebase credentials JSON: {e}")
            except Exception as e:
                logging.error(f"❌ Unknown error initializing Firebase Admin SDK: {e}")
                db = None # Säkerställ att db inte är odefinierad
        else:
            logging.warning("❌ Firebase credentials not found. Firebase Admin SDK not initialized.")
            db = None # Säkerställ att db inte är odefinierad
    else:
        # Hämta den befintliga klienten om SDK redan är initierad
        db = firestore.client()
        logging.info("Firebase Admin SDK already initialized.")


    def save_to_firestore(collection, doc_id, data):
        """Sparar data till en specifik Firestore-collection."""
        if not db:
             logging.error("Firestore client is not available.")
             return False
        try:
            db.collection(collection).document(doc_id).set(data)
            logging.info(f"💾 Data saved to Firestore: {collection}/{doc_id}")
            return True
        except Exception as e:
            logging.error(f"❌ Error saving to Firestore ({collection}/{doc_id}): {e}")
            return False
    ```

## 4. Deployment till Google Cloud Run ☁️🚀

### 4.1 Förberedelser ✅

-   **🏗️ Google Cloud-projekt:** Projektet `innerjourney-c007e` (eller ditt projekt-ID) är konfigurerat i Google Cloud Platform (GCP).
-   **🔌 Aktivera API:er:** Säkerställ att följande API:er är aktiverade i ditt GCP-projekt:
    -   `Cloud Run API`
    -   `Secret Manager API`
    -   `Artifact Registry API` (rekommenderas över `Container Registry API`)
    -   `Cloud Build API` (om CI/CD via Cloud Build används)

### 4.2 Bygg och Pusha Docker-image 🐳

-   **📄 Dockerfile:** Definierar hur applikationen containeriseras.

    ```dockerfile
    # Använd en officiell Python 3.10 slim image som bas
    FROM python:3.10-slim

    # Sätt arbetskatalogen i containern
    WORKDIR /app

    # Installera systemberoenden vid behov (om t.ex. vissa bibliotek kräver det)
    # RUN apt-get update && apt-get install -y --no-install-recommends some-package && rm -rf /var/lib/apt/lists/*

    # Kopiera requirements-filen först för att dra nytta av Docker layer caching
    COPY requirements.txt .

    # Uppdatera pip och installera Python-beroenden
    # Använd --no-cache-dir för att minska image-storleken
    RUN pip install --no-cache-dir --upgrade pip && \
        pip install --no-cache-dir -r requirements.txt

    # Kopiera resten av applikationskoden till arbetskatalogen
    COPY . .

    # Exponera porten som applikationen kommer att lyssna på (matchar CMD nedan)
    # Denna är mer informativ, Cloud Run använder $PORT miljövariabeln
    EXPOSE 8080

    # Kör applikationen med Uvicorn när containern startar
    # Lyssna på porten specificerad av Cloud Run via $PORT miljövariabeln
    # Använd gunicorn för bättre prestanda i produktion med flera workers om det behövs
    # CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "backend.main:app", "--bind", "0.0.0.0:8080"]
    CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8080"]
    ```

-   **🏗️➡️☁️ Bygg och pusha imagen:** Använd Google Cloud Artifact Registry för att lagra dina Docker-images.
    *   Ersätt `innerjourney-c007e` med ditt projekt-ID.
    *   Ersätt `europe-west1` med din önskade region.
    *   Ersätt `innerjourney-repo` med namnet på ditt Artifact Registry repository.

    ```bash
    # (Första gången) Skapa ett Artifact Registry repository om det inte finns
    # gcloud artifacts repositories create innerjourney-repo --repository-format=docker \
    #   --location=europe-west1 --description="Docker repository for InnerJourney"

    # Konfigurera Docker att använda gcloud för autentisering mot Artifact Registry
    gcloud auth configure-docker europe-west1-docker.pkg.dev

    # Definiera variabler för enkelhet
    export PROJECT_ID="innerjourney-c007e"
    export REGION="europe-west1"
    export REPO_NAME="innerjourney-repo"
    export IMAGE_NAME="innerjourney-backend"
    export IMAGE_TAG="latest" # Eller en specifik version/commit hash

    export IMAGE_URI="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}/${IMAGE_NAME}:${IMAGE_TAG}"

    # Bygg Docker-imagen lokalt (se till att du är i katalogen med Dockerfile)
    docker build -t $IMAGE_URI .

    # Pusha imagen till Artifact Registry
    docker push $IMAGE_URI
    ```

### 4.3 Deploya till Cloud Run 🚀

-   **⌨️ Deploy-kommando:** Använd `gcloud` för att deploya den pushade imagen till Cloud Run.

    ```bash
    # Använd variablerna från föregående steg
    gcloud run deploy ${IMAGE_NAME} \
      --image ${IMAGE_URI} \
      --platform managed \
      --region ${REGION} \
      --allow-unauthenticated \
      --service-account=[SERVICE_ACCOUNT_EMAIL] \
      --set-secrets=FIREBASE_CREDENTIALS=firebase-credentials:latest,GEMINI_API_KEY=gemini-api-key:latest
      # Lägg till andra miljövariabler vid behov:
      # --set-env-vars=GOOGLE_CLOUD_PROJECT=${PROJECT_ID}
      # Anpassa servicekontot och hemlighetsnamnen!
    ```
    *   **🚨 Viktigt:** `--allow-unauthenticated` gör tjänsten publikt tillgänglig. För produktion, ta bort detta och implementera autentisering/auktorisering (t.ex. via Firebase Auth token validation i din kod eller via API Gateway/Cloudflare).
    *   Ersätt `[SERVICE_ACCOUNT_EMAIL]` med e-postadressen för det servicekonto som Cloud Run-tjänsten ska köra som. Detta konto behöver rätt behörigheter (se nästa punkt).
    *   `--set-secrets`: Mappar Secret Manager-hemligheter till miljövariabler inuti Cloud Run-containern. Format: `ENV_VAR_NAME=SECRET_NAME:VERSION`. Detta är det rekommenderade sättet att hantera hemligheter. Koden behöver då bara läsa miljövariablerna `FIREBASE_CREDENTIALS` och `GEMINI_API_KEY`. *Notera att detta kräver en liten justering i Python-koden ovan för att läsa hemligheter från miljövariabler istället för att direkt anropa Secret Manager API för varje hemlighet om man vill förenkla.*

-   **🔗 Service-URL:** Efter en lyckad deployment får du en publik URL för tjänsten, t.ex. `https://${IMAGE_NAME}-<hash>-${REGION}.a.run.app`.

### 4.4 Hantera Hemligheter i Cloud Run 🔒

-   **🔑 Secret Manager:** API-nycklar och andra hemligheter lagras säkert i Google Cloud Secret Manager. De primära hemligheterna för backend är:
    -   `firebase-credentials` (innehåller service account JSON-strängen)
    -   `gemini-api-key`
-   **🛡️ Behörigheter:** Servicekontot som Cloud Run-tjänsten kör som (antingen det du angav med `--service-account` eller standardkontot `[PROJECT_NUMBER]-compute@developer.gserviceaccount.com`) måste ha IAM-rollen `Secret Manager Secret Accessor` för att kunna hämta hemligheterna vid körning (om du använder `--set-secrets` behöver kontot denna roll vid deploy-tid, och Cloud Run hanterar åtkomsten åt dig). Konfigurera detta i GCP Console under `IAM & Admin` > `IAM`.

## 5. Felsökning och Vanliga Problem 🐞

### 5.1 `404 Not Found`

-   🤔 **Orsak:** En specifik route/endpoint (t.ex. `/gemini/getActivation`, `/users/profile`) hittas inte av `FastAPI`. Vanligaste orsaken är att routern inte är korrekt importerad och inkluderad i huvudapplikationen (`backend/main.py`).
-   ✅ **Lösning:**
    1.  Verifiera att raden `app.include_router(your_router_module.router, prefix="/your_prefix", tags=["Your Tag"])` finns i `backend/main.py` för den relevanta routern (t.ex. `app.include_router(gemini_router.router, prefix="/gemini", tags=["Gemini"])`).
    2.  Dubbelkolla stavfel i prefixet (`/your_prefix`) och i endpoint-definitionen (t.ex. `@router.post("/getActivation")`) i router-filen.
    3.  Kontrollera att URL:en du anropar matchar exakt (inklusive eventuell `/` på slutet).

### 5.2 `PermissionDenied` vid Åtkomst till Secret Manager (eller andra GCP-tjänster)

-   🤔 **Orsak:** Cloud Run-tjänstens servicekonto saknar nödvändiga IAM-behörigheter för att komma åt den begärda resursen (t.ex. Secret Manager, Firestore). Felet syns ofta i Cloud Run-loggarna (`LOGS`-fliken i GCP Console).
-   ✅ **Lösning:**
    1.  Gå till `IAM & Admin` > `IAM` i Google Cloud Console.
    2.  Hitta det servicekonto som din Cloud Run-tjänst använder (står i Cloud Run-tjänstens detaljer).
    3.  Klicka på redigeringspennan (Edit principal / Redigera huvudkonto).
    4.  Lägg till den nödvändiga rollen (t.ex. `Secret Manager Secret Accessor`, `Cloud Datastore User` för Firestore).
    5.  Spara ändringarna.
    6.  Du kan behöva skapa en ny revision av Cloud Run-tjänsten (t.ex. genom att deploya om med samma image) för att ändringen ska slå igenom direkt.

### 5.3 Container failed to start / Application Error

-   🤔 **Orsak:** Applikationen kraschar direkt vid start inne i containern. Detta kan bero på:
    -   Syntaxfel i Python-koden.
    -   Saknade beroenden som inte installerats korrekt (fel i `requirements.txt` eller `Dockerfile` `RUN pip install` steg).
    -   Konfigurationsfel (t.ex. problem med att läsa miljövariabler, initiera Firebase SDK, felaktiga sökvägar, saknade hemligheter).
    -   Problem med att binda till porten (kontrollera att `CMD` i `Dockerfile` använder rätt port, t.ex. `8080`, som Cloud Run förväntar sig).
    -   Otillräckligt med minne eller CPU allokerat till Cloud Run-tjänsten.
-   ✅ **Lösning:**
    1.  **Kontrollera loggarna:** Gå till Cloud Run-tjänsten i Google Cloud Console och klicka på fliken `LOGS`. Undersök felmeddelandena noggrant för att identifiera den exakta orsaken (traceback).
    2.  **Testa lokalt (Docker):** Försök att bygga och köra containern lokalt med `docker build` och `docker run` för att replikera och felsöka problemet i en kontrollerad miljö. Se till att du mappar portar och skickar med nödvändiga miljövariabler.
        ```bash
        # Bygg lokalt
        docker build -t innerjourney-backend-local .
        # Kör lokalt (ersätt med nödvändiga miljövariabler, mappa port)
        # Exempel: docker run -p 8080:8080 -e PORT=8080 -e GEMINI_API_KEY="din-lokala-nyckel" ... innerjourney-backend-local
        docker run -p 8080:8080 -e PORT=8080 innerjourney-backend-local
        ```
    3.  **Verifiera `Dockerfile` och `requirements.txt`:** Dubbelkolla att alla nödvändiga paket finns i `requirements.txt` och att `Dockerfile` kopierar all nödvändig kod och kör installationsstegen korrekt. Kontrollera `CMD`-raden.
    4.  **Öka resurser:** Om loggarna indikerar minnesproblem (OOMKilled), prova att öka minnet för Cloud Run-tjänsten i dess inställningar.
```

---

**Fil: `backend-readme.md`**
```markdown
---
id: backend-readme
title: "🚀 InnerJourney Backend: README"
description: "README för InnerJourney backend, som täcker översikt, lokal setup, deployment med Cloud Build, API-dokumentation och felsökning."
slug: /technical-docs/backend/readme
sidebar_label: "Backend README"
sidebar_position: 4
tags:
  - backend
  - readme
  - fastapi
  - docker
  - cloud-run
  - cloud-build
  - api
  - python
  - firebase
  - gemini
  - gcloud
  - setup
---

# InnerJourney Backend: README 🚀

## Översikt 📜

Välkommen till backend-delen av **InnerJourney**, en plattform för personlig utveckling 🌱. Backend är byggd med det moderna Python-ramverket `FastAPI` 🐍 och integrerar med:

*   **Firebase `Firestore`** 🔥: För flexibel och skalbar datalagring (användarprofiler, övningar, loggar).
*   **Google `Gemini`** 🤖: För AI-genererade insikter och personliga aktiveringar.
*   **Google `Cloud Secret Manager`** 🔑: För säker hantering av API-nycklar och konfiguration.

Applikationen är containeriserad med `Docker` 🐳 och designad för att deployas på **Google `Cloud Run`** ☁️, vilket säkerställer skalbarhet och enkel hantering. Vi använder **Google `Cloud Build`** 🔧 (via `cloudbuild.yaml`) för att automatisera byggnation och distribution av backend vid ändringar i `Git`-repositoryt 📦.

Denna README guidar dig genom:
1.  Nödvändiga förutsättningar.
2.  Projektstruktur.
3.  Uppsättning och lokal testning med `gcloud`-autentisering.
4.  Deployment till Google Cloud Run via Git och Cloud Build.
5.  API-dokumentation (avsedd för frontend-utvecklare).
6.  Säkerhetshantering.
7.  Felsökningstips.

## Förutsättningar ✅

Innan du börjar, säkerställ att du har följande verktyg installerade och konfigurerade:

*   🐍 **Python 3.10:** Krävs för att köra backend lokalt (utanför Docker) och för kompatibilitet.
*   🐙 **Git:** För versionshantering och kloning av projektet.
*   🐳 **Docker:** För att bygga och köra backend i en container.
*   ☁️ **Google Cloud SDK (`gcloud`):** För autentisering, lokal testning och interaktion med GCP-tjänster (inklusive deployment).
*   📦 **Node.js och npm (valfritt):** Användbart om du vill köra frontend parallellt för att testa hela applikationen.
*   🔥 **Firebase-projekt:** Ett konfigurerat Firebase-projekt med `Firestore` och `Authentication` aktiverat. Du behöver åtkomst till Service Account-nycklar (JSON).
*   🌍 **Google Cloud-projekt:** Ett GCP-projekt (t.ex. `innerjourney-c007e`) med följande API:er aktiverade:
    *   `Cloud Run API`
    *   `Cloud Build API`
    *   `Secret Manager API`
    *   `Artifact Registry API`

## Projektstruktur 🗂️

Backend-koden finns i `backend/`-mappen i projektets rot (`InnerJourney/`). Viktiga filer och mappar inkluderar:

```text
InnerJourney/
└── backend/
    ├── models/              # 📋 Pydantic-modeller för datavalidering (t.ex. activation.py, user.py)
    ├── routes/              # 🛤️ API-routes/endpoints (t.ex. gemini.py, users.py)
    ├── services/            # 🛠️ Tjänster för affärslogik (t.ex. gemini_service.py, firebase_service.py)
    ├── tests/               # 🧪 Enhetstester och integrationstester (med pytest)
    ├── __init__.py          # 📦 Gör mappen till ett Python-paket
    ├── main.py              # 🏁 Huvudfil för FastAPI-applikationen (initierar app, inkluderar routers)
    ├── requirements.txt     # 📜 Lista över Python-beroenden
    ├── Dockerfile           # 🐳 Instruktioner för att bygga Docker-containern
    └── cloudbuild.yaml      # 🔧 Konfiguration för Google Cloud Build (automatiserad build & deploy)
```

## Sätta upp och testa lokalt med `gcloud`-autentisering 🖥️

Följ dessa steg för att köra och testa backend lokalt i en Docker-container, med autentisering mot Google Cloud-tjänster (som `Secret Manager`) via dina lokala `gcloud`-credentials.

### 1. Klona repot 📥

Klona projektet från GitHub och navigera till projektets rotmapp:

```bash
git clone git@github.com:joelkvarnsmyr/InnerJourney.git
cd InnerJourney
```

### 2. Autentisera med `gcloud` 🔐

Logga in med `gcloud` för att skapa Application Default Credentials (ADC). Dessa används av Google Cloud-klientbibliotek (som de för Secret Manager) för att autentisera när de körs lokalt.

```bash
gcloud auth application-default login
```
Följ instruktionerna i din webbläsare för att logga in och godkänna.

### 3. Bygg Docker-imagen 🛠️

Bygg Docker-imagen från `backend/`-mappen (där `Dockerfile` finns):

```bash
docker build -t innerjourney-backend ./backend
```
*   `-t innerjourney-backend`: Namnger (taggar) Docker-imagen som `innerjourney-backend`.
*   `./backend`: Anger kontexten för bygget (mappen som innehåller `Dockerfile` och källkoden).

### 4. Kör containern med `gcloud`-autentisering 🚀

Kör containern och montera din lokala `gcloud`-konfigurationsmapp. Detta tillåter kod inuti containern att använda dina ADC för autentisering mot GCP.

```bash
docker run --rm -p 8080:8080 \
-e PORT=8080 \
-v ${HOME}/.config/gcloud:/root/.config/gcloud \
innerjourney-backend
```

*   `--rm`: Tar bort containern automatiskt när den stoppas.
*   🌐 `-p 8080:8080`: Mappar port `8080` på din lokala maskin till port `8080` i containern (där Uvicorn lyssnar).
*   🔧 `-e PORT=8080`: Sätter miljövariabeln `PORT` inuti containern (även om Uvicorn i detta fall har porten hårdkodad i `CMD`, är det bra praxis).
*   📂 `-v ${HOME}/.config/gcloud:/root/.config/gcloud`: Monterar din lokala `gcloud`-konfigurationsmapp (som innehåller ADC) till containerns förväntade plats (`/root/.config/gcloud`). **Notera:** Sökvägen kan variera på Windows.

API:et ska nu vara tillgängligt lokalt på `http://localhost:8080`. Du kan testa en endpoint med `curl` eller ett API-verktyg som Postman/Insomnia:

```bash
curl -X POST "http://localhost:8080/gemini/getActivation" \
     -H "Content-Type: application/json" \
     -d '{"mood": 2, "goal": "komma igång"}'
```

Du kan också komma åt den automatiskt genererade API-dokumentationen (Swagger UI) via din webbläsare på `http://localhost:8080/docs`.

## Deploya till Google Cloud Run med Git och Cloud Build 🌐 CI/CD

Vi använder `Cloud Build` och en trigger kopplad till vårt GitHub-repository för att automatisera byggnation och deployment till `Cloud Run`. När ändringar pushas till `main`-grenen, exekveras stegen definierade i `backend/cloudbuild.yaml`.

### 1. Committa och pusha ändringar till GitHub 📤

Efter att ha gjort och testat dina kodändringar lokalt:

```bash
# Steg 1: Granska ändringar
git status

# Steg 2: Lägg till ändrade filer
git add . # Eller specificera filer

# Steg 3: Committa med ett beskrivande meddelande
git commit -m "feat: Implement user profile endpoint"

# Steg 4: Pusha till main-grenen på GitHub
git push origin main
```
Detta steg triggar automatiskt `Cloud Build`-processen (om triggern är korrekt konfigurerad i GCP).

### 2. Följ byggprocessen i Cloud Build 🛠️👀

*   Navigera till **Cloud Build > Historik (History)** i Google Cloud Console för ditt projekt.
*   Hitta den senaste byggnationen (triggad av din push).
*   Övervaka byggloggarna i realtid för att se till att varje steg (bygga image, pusha image, deploya till Cloud Run) slutförs utan fel.

### 3. Verifiera Deploymenten ✅

När `Cloud Build` rapporterar att byggnationen och deploymenten är klara (`SUCCESS`):

*   Hämta URL:en till din deployade `Cloud Run`-tjänst. Du hittar den i Cloud Run-konsolen eller i slutet av `gcloud run deploy`-steget i Cloud Build-loggarna.
*   Testa en endpoint på den deployade tjänsten. Ersätt `<YOUR_CLOUD_RUN_URL>` med din faktiska URL:

    ```bash
    curl -X POST "<YOUR_CLOUD_RUN_URL>/gemini/getActivation" \
         -H "Content-Type: application/json" \
         -d '{"mood": 2, "goal": "komma igång"}'
    ```
*   Kontrollera även tjänstens loggar i Cloud Run-konsolen om något inte fungerar som förväntat.

## API-dokumentation för frontend-utvecklare 📚

Backend exponerar ett `RESTful` API. Dokumentationen genereras automatiskt av `FastAPI` och är tillgänglig via Swagger UI på `/docs` endpointen (t.ex. `http://localhost:8080/docs` lokalt, eller `<YOUR_CLOUD_RUN_URL>/docs` i produktion).

### Huvudendpoint: `/gemini/getActivation`

Denna endpoint används för att generera en personlig "aktivering" (övning) baserat på användarens angivna humör och mål. Informationen skickas till Google Gemini, svaret bearbetas, sparas i `Firestore` och returneras sedan till frontend.

*   **Metod:** `POST`
*   **URL:** `/gemini/getActivation` (Relativt till bas-URL:en)

#### Request Body (JSON)

Förväntar sig ett JSON-objekt med följande struktur:

```json
{
  "mood": integer, // Obligatorisk: Användarens humör (1=lågt, 5=högt)
  "goal": string   // Obligatorisk: Användarens mål/intention (t.ex. "komma igång", "få mer fokus")
}
```

*   `mood`: Heltal mellan 1 och 5.
*   `goal`: En textsträng som beskriver användarens mål.

#### Response Body (JSON - vid framgång, 200 OK)

Returnerar ett JSON-objekt som representerar den genererade aktiveringen. Strukturen baseras på `Activation` Pydantic-modellen (se `backend/models/activation.py`).

```json
{
  "title": "Fokuserad Andning", // Titel på aktiveringen
  "description": "En kort andningsövning för att öka fokus och klarhet.", // Beskrivning
  "duration": 5, // Uppskattad tid i minuter
  "activation_type": "meditation", // Typ av aktivering (t.ex. 'meditation', 'journaling')
  "category_id": "brainsync", // Kategori (kopplat till ev. fördefinierade kategorier)
  "prompt": "Sitt bekvämt och fokusera på din andning under 5 minuter.", // Instruktion för användaren
  "log_type": "text", // Vilken typ av loggning som förväntas ('text', 'audio', 'none')
  "prerequisite": "", // Eventuella förkunskaper/krav (oftast tom)
  "repetitions": 1, // Antal repetitioner (oftast 1)
  "questions": [ // Eventuella reflektionsfrågor
    "Hur kändes det att fokusera på din andning?",
    "Vilka tankar dök upp under övningen?"
  ],
  "ai_assessment": false, // Om AI ska analysera loggen
  "coach_approval_required": false, // Om en coach behöver godkänna
  "net_enabled": false, // Om övningen involverar nätverksinteraktion
  "introduction_message": "Välkommen till denna fokusövning! Den hjälper dig att samla tankarna.", // Introduktion
  "preparation_message": "Hitta en lugn plats där du kan sitta ostört i 5 minuter.", // Förberedelser
  "activation_id": "gemini_1743422072", // Unikt ID för denna specifika aktivering
  "source": "AI" // Källa (oftast 'AI' för Gemini-genererade)
}
```

#### Felhantering

*   `400 Bad Request`: Returneras om request body saknar obligatoriska fält (`mood`, `goal`) eller om värdena är ogiltiga (t.ex. `mood` utanför 1-5). Responsen innehåller detaljer om felet.
*   `422 Unprocessable Entity`: Returneras av FastAPI om request body inte matchar Pydantic-modellen (t.ex. fel datatyp).
*   `500 Internal Server Error`: Returneras vid oväntade serverfel, t.ex.:
    *   Problem med att kommunicera med Gemini API.
    *   Fel vid parsning av Gemini-svaret.
    *   Problem med att spara till Firestore.
    *   Saknade obligatoriska fält i det genererade svaret från AI:n.
    Detaljer loggas på servern (kolla Cloud Run-loggarna).

**(Fler endpoints som `/users/profile`, `/activations/log` etc. bör dokumenteras här på liknande sätt när de implementeras.)**

## Säkerhet och Hemligheter 🔒

*   🔑 **API-nycklar & Credentials:** Känsliga nycklar (Gemini API Key) och konfigurationer (Firebase Service Account JSON) lagras **aldrig** i kod eller versionshantering. De hanteras säkert via **Google `Cloud Secret Manager`**.
    *   Primära hemligheter: `firebase-credentials`, `gemini-api-key`.
*   🛡️ **Åtkomst i Cloud Run:**
    *   Vi använder `--set-secrets`-flaggan vid `gcloud run deploy` för att säkert mappa hemligheter från Secret Manager till miljövariabler inuti Cloud Run-containern.
    *   Cloud Run-tjänstens **servicekonto** måste ha IAM-rollen `Secret Manager Secret Accessor` för att kunna hämta dessa hemligheter vid deploy-tidpunkten. Detta konfigureras under **IAM & Admin > IAM** i Google Cloud Console.
*   🛡️ **API-åtkomst:** För närvarande är Cloud Run-tjänsten konfigurerad med `--allow-unauthenticated`. **Detta MÅSTE ändras för produktion.** Implementera autentisering, t.ex. genom att:
    1.  Kräva ett Firebase Auth `id_token` i `Authorization: Bearer <token>`-headern.
    2.  Verifiera tokenet i backend med Firebase Admin SDK för varje skyddad endpoint.
    3.  Ta bort `--allow-unauthenticated` och konfigurera IAM för Cloud Run-anropare eller använd en API Gateway framför.

## Felsökning 🐞

Här är några vanliga problem och deras lösningar:

### 1. `404 Not Found` för en endpoint

*   **Orsak:** Routern för endpointen är inte korrekt registrerad i `backend/main.py`, eller det är ett stavfel i URL:en eller prefixet.
*   **Lösning:** Dubbelkolla `app.include_router(...)` i `main.py` och `@router.get/post/put/delete(...)`-definitionen i din router-fil. Verifiera anropets URL.

### 2. `PermissionDenied` vid åtkomst till Secret Manager/Firestore etc.

*   **Orsak:** Cloud Run-tjänstens servicekonto saknar nödvändiga IAM-behörigheter.
*   **Lösning:** Gå till **IAM & Admin > IAM** i GCP Console. Hitta servicekontot och ge det rätt roll (t.ex. `Secret Manager Secret Accessor`, `Cloud Datastore User`). Skapa en ny revision av tjänsten.

### 3. Container kraschar vid start ("Container failed to start", "Application Error")

*   **Orsak:** Ofta ett fel i koden som inträffar vid initiering, saknade beroenden, konfigurationsfel (kan inte läsa env vars/secrets), eller portkonflikt/fel `CMD` i `Dockerfile`.
*   **Lösning:**
    1.  **Kolla loggarna!** Gå till Cloud Run-tjänsten > `LOGS`-fliken. Leta efter Python tracebacks eller andra felmeddelanden vid starttiden.
    2.  **Testa lokalt med Docker:** Kör `docker build` och `docker run` (se steg 3 & 4 ovan) för att se om felet kan reproduceras lokalt. Detta ger en snabbare felsökningsloop.
    3.  Verifiera `Dockerfile`, `requirements.txt` och `CMD`-instruktionen.
    4.  Säkerställ att alla nödvändiga hemligheter/miljövariabler är korrekt konfigurerade för Cloud Run-tjänsten.

## Nästa steg 🌟

*   📈 **Utöka API:et:** Lägg till fler endpoints för användarhantering, loggning av övningar, hämtning av historik etc.
*   🧪 **Implementera tester:** Skriv enhetstester (`pytest`) för services och routes, samt integrationstester för att säkerställa att allt fungerar ihop. Sikta på god testtäckning.
*   🔐 **Implementera autentisering:** Skydda dina endpoints genom att kräva och validera Firebase Auth `id_token`. Ta bort `--allow-unauthenticated`.
*   📊 **Övervakning & Loggning:** Förbättra loggningen i applikationen och sätt upp mer detaljerad övervakning i Google Cloud Operations (tidigare Stackdriver).

## Kontakt 📬

För frågor, förslag eller om du vill bidra till projektet, vänligen skapa ett issue i GitHub-repositoryt: `joelkvarnsmyr/InnerJourney`.
```

---

**Fil: `visionar-grund.md`** (Använder den uppdaterade front mattern från din ursprungliga fil)
```markdown
---
id: visionar-grund
title: "🧭 Visionär Grund"
description: "Ett levande dokument som beskriver Inner Journeys vision, värderingar och syfte, med rötter i Rising Beyond."
slug: /project-docs/visionary-foundation # Anpassad för tydligare struktur
sidebar_label: "Visionär Grund"
sidebar_position: 10 # Behåller positionen
tags:
  - vision
  - värderingar
  - syfte
  - strategi
  - grunddokument
  - "rising beyond" # Citerad pga mellanslag
---

# Visionär Grund 🧭

Detta dokument, daterat **April 2025**, utgör en levande grund för *Inner Journeys* vision, värderingar och väg framåt. Det är fött ur en dröm om enhet och hållbar förändring, ursprungligen formulerad av **Joel Kvarnsmyr & Ulrika af Klint**.

## 🌱 Introduktion: Historien Bakom

För många år sedan satte sig två vänner, Joel och Ulrika, ner med en gemensam längtan: att skapa en värld där hjärtats intelligens kunde överbrygga splittring och väcka en hållbar framtid. Ur de samtalen föddes *Rising Beyond* – en vision om empati, kärlek och transformation som sprider sig som ringar på vattnet.

Idag lever den drömmen vidare i *Inner Journey*. Detta dokument, *Visionär Grund*, är vår kompass – en påminnelse om varför vi gör det här och hur vi vill forma framtiden.

## 🌍 Vision: En Värld av Enhet

Vi ser en värld där:

-   ❤️ Människor lever från hjärtats visdom och känner en djup samhörighet med varandra och planeten.
-   ✨ Kärlek och empati blir en viral kraft som driver hållbar förändring.
-   🤝 Individer, organisationer och samhällen blomstrar genom autenticitet och samarbete.

*Inner Journey* är verktyget för att göra detta möjligt – en inre resa som skapar yttre vågor.

## 🎯 Syfte: Varför Vi Finns

Vi finns för att:

-   🧠 Väcka hjärtats intelligens och medvetande hos människor över hela världen.
-   🛠️ Erbjuda verktyg som gör personlig och kollektiv transformation enkel, tillgänglig och meningsfull.
-   🌱 Bygga broar mellan det inre och det yttre – för en friskare planet och ett bättre liv för kommande generationer.

Med rötterna i *Rising Beyond* strävar vi efter en radikal förändring som börjar i hjärtat och når globalt.

## 🛡️ Värderingar: Vad Vi Står För

Våra kärnvärderingar är:

1.  🌐 **Enhet** – Allt hänger samman, och vi agerar från den insikten.
2.  ❤️ **Hjärtintelligens** – Vi litar på hjärtats visdom bortom intellektets gränser.
3.  ✨ **Autenticitet** – Vi uppmuntrar äkthet i varje steg av resan.
4.  🤗 **Medkänsla** – Kärlek och empati är drivkraften i allt vi gör.
5.  🌳 **Hållbarhet** – Vi bygger för framtiden, inte bara för idag.

Dessa värderingar är vår ryggrad, hämtade från drömmen om *Rising Beyond* och levandegjorda i *Inner Journey*.

## 🛠️ Metod: Hur Vi Gör Det

*Inner Journey* förverkligar den *Visionära Grunden* genom:

-   🧘 **Guidad Meditation & Övningar**: Kopplar människor till deras inre visdom och en känsla av enhet.
-   📱 **Tillgängliga Verktyg**: Digitala lösningar som gör transformation enkelt för alla – oavsett var, när eller vem.
-   🧑‍🤝‍🧑 **Gemenskap**: Skapar nätverk där individer och organisationer kan mötas, dela och växa tillsammans.
-   ❤️ + 🤖 **Hjärta och Teknik**: Kombinerar hjärtcentrerade metoder med modern AI för att guida varje resa unikt.
-   🌟 **Inspiration i Handling**: Visar konkreta resultat som inspirerar till mer engagemang och förändring.

Vi gör det inte genom att tänka oss fram – vi känner oss fram, steg för steg, från hjärtat.

## ❓ Frågor Som Leder Oss Framåt

Precis som i *Rising Beyond* låter vi frågor guida oss:

-   🤔 Hur kan vi öppna människors ögon och hjärtan för en större helhet?
-   🤔 Vad händer om vi gör enhet och medkänsla till nya sociala normer?
-   🤔 Hur kan vi skapa verktyg som gör det enkelt att leva från hjärtat på en global skala?

Dessa frågor är inte bara retorik – de är vår drivkraft.

## 📖 Slutord: En Levande Grund

*Visionär Grund* är inte ett statiskt dokument – det är en levande källa som vi återvänder till, anpassar och växer med. Det hedrar ursprunget i *Rising Beyond*, Ulrikas visionära anda och *Inner Journeys* resa framåt.

Tillsammans med dig – vår gemenskap – kan vi stiga vidare och göra drömmen till verklighet.

**Vad betyder den här visionen för dig?** Låt oss bygga den tillsammans.

---

**Med hjärtat som kompass,** ❤️
Joel Kvarnsmyr & Team Inner Journey
```

---

**Fil: `database-structure.md`**
```markdown
---
id: database-structure
title: "🗄️ Databasstruktur: InnerJourney (Firestore)"
description: "Beskriver den planerade Firestore-databasstrukturen för InnerJourney, inklusive samlingar för användare, övningar, loggar och sessioner."
slug: /docs/tech-spec/databasstruktur-2025
sidebar_label: "Databasstruktur"
sidebar_position: 5
tags:
  - databas
  - firestore
  - struktur
  - backend
  - nosql
  - firebase
  - gdpr
  - datamodell
---

# 🗄️ Databasstruktur: InnerJourney

**Version:** 5.0
**Datum:** 2025-03-24
**Författare:** Bo Joel Kvarnsmyr
**Senast reviderad av:** Bo Joel Kvarnsmyr

## 🎯 Syfte & Översikt

Databasstrukturen för Inner Journey är designad för att lagra och hantera användardata på ett säkert, skalbart och effektivt sätt med **Firebase `Firestore`** 🔥 som NoSQL-databas. Den stödjer appens kärnfunktioner, inklusive:

-   Personlig profilering baserad på astrologi, numerologi och användarens svar.
-   Loggning av genomförda övningar (s.k. `"activations"`), inklusive nya typer som live-interaktioner och AI-baserade analyser.
-   Framtida sociala interaktioner och coachverktyg.

> **📝 OBS:** För närvarande (enligt dokumentets datum) är Firebase `Firestore` *inte* fullt implementerat i backend. Initial datalagring kan ske temporärt (t.ex. in-memory). Strukturen nedan representerar **målstrukturen** för `Firestore` när det implementeras fullt ut.

För en bredare översikt av projektet, se [Projektbeskrivning: Inner Journey](/docs/project/projektbeskrivning-2025).

## 🗂️ Samlingar & Fält (Firestore Struktur)

Nedan beskrivs de planerade samlingarna (`collections`) och deras dokumentstruktur i `Firestore`.

### 👤 Samling: `users`

**Beskrivning:** Huvudsamling för användarprofiler. Varje dokument representerar en unik användare.
**Dokument-ID:** Användarens unika UID från `Firebase Authentication`.

**Fält:**

-   `userId`: `String` - Samma som dokument-ID (UID från Firebase Auth). Används ofta för enkel referens.
-   `birthDate`: `String` - Födelsedatum i ISO 8601-format (t.ex. `"1990-05-15"`). Används för astrologi och numerologi.
-   `birthTime`: `String` - Födelsetid (t.ex. `"14:30"`). Används för astrologi (ascendant).
-   `birthLocation`: `String` - Födelseort (t.ex. `"Stockholm, Sweden"`). Används för astrologi (ascendant).
-   `phoneNumber`: `String` - (Valfritt) Verifierat telefonnummer (t.ex. `"+447418631211"`).
-   `createdAt`: `Timestamp` - Tidsstämpel för när användarkontot skapades i Firestore.
-   `lastLoginAt`: `Timestamp` - Tidsstämpel för senaste inloggning (uppdateras vid behov).
-   `onboardingCompleted`: `Boolean` - Indikerar om användaren slutfört onboarding-processen.
-   `profile`: `Object` - Grundläggande profilinformation:
    -   `displayName`: `String` - Användarens valda visningsnamn.
    -   `avatarUrl`: `String` - (Valfritt) URL till profilbild.
-   `preferences`: `Object` - Användarinställningar:
    -   `uiStyle`: `String` - Användarens valda UI-tema (t.ex. `"clean"`, `"technical"`, `"professional"`).
    -   `timeCommitment`: `Number` - Önskad tid per dag i minuter (t.ex. `5`, `15`, `30`).
    -   `focusArea`: `String` - Primärt mål från onboarding (t.ex. `"stress_relief"`, `"focus"`, `"self_awareness"`).
-   `insights`: `Object` - Genererade insikter baserade på input:
    -   `personalityType`: `Object` - Genererad personlighetsprofil:
        -   `traits`: `Array<String>` - Egenskaper baserade på talfrågor (t.ex. `["introvert", "intuitive"]`).
        -   `astroSign`: `String` - Soltecken från `birthDate` (t.ex. `"Taurus"`).
        -   `lifePathNumber`: `Number` - Livsvägstal från `birthDate` (numerologi) (t.ex. `7`).
        -   `moonSign`: `String` - (Framtid) Månens tecken.
        -   `risingSign`: `String` - (Framtid) Ascendantens tecken.
    -   `neuroTendencies`: `Object` - Indikatorer baserade på onboarding-svar:
        -   `adhdScore`: `Number` - Poäng (0-10) baserat på svar (t.ex. rutinpreferens).
        -   `autismScore`: `Number` - Poäng (0-10) baserat på svar (t.ex. fokus/stimuli).
    -   `wellbeingFlags`: `Object` - Välmåendemarkörer baserade på onboarding-svar:
        -   `depressionRisk`: `Boolean` - Flagg från svar om hopplöshet.
        -   `suicideRisk`: `Boolean` - Flagg från svar om livsförändring.
-   `onboardingAnswers`: `Array<Object>` - Rådata från onboarding-frågor för spårbarhet och framtida analys (t.ex. `[{"questionId": "q1", "answer": "Draining"}, {"questionId": "q2", "answer": "One task"}]`).

**💡 Flexibilitet:** Kan utökas med fält som `progressLevel`, `achievementPoints`, `coachId` (om användaren har en coach).

### 💪 Samling: `exercises` (`activations`)

**Beskrivning:** Fördefinierade övningar (`activations`) som finns tillgängliga i appen.
**Dokument-ID:** Ett unikt ID för övningen (t.ex. `"hemisync_focus_001"`, `"live_eye_contact_001"`).

**Fält:**

-   `exerciseId`: `String` - Samma som dokument-ID.
-   `title`: `String` - Övningens titel (t.ex. `"Hemisync: Fokusera Ljudet"`, `"Tyst Ögonkontakt Live"`).
-   `description`: `String` - Kort introduktion eller beskrivning av övningen.
-   `type`: `String` - Typ av övning (t.ex. `"audio"`, `"video_guided"`, `"text_journal"`, `"live_interaction"`, `"ai_assessment"`).
-   `category`: `String` - Kategori för övningen (t.ex. `"awareness"`, `"social"`, `"focus"`, `"relaxation"`).
-   `duration`: `Number` - Ungefärlig varaktighet i minuter (t.ex. `10`, `5`, `3`). Kan vara `null` för vissa typer.
-   `media`: `Object` - (Valfritt) Information om mediafiler:
    -   `audioUrl`: `String` - URL till ljudfil (t.ex. i Firebase Storage).
    -   `videoUrl`: `String` - URL till videofil.
    -   `imageUrl`: `String` - URL till en representativ bild.
-   `instructions`: `Object` - Detaljerade instruktioner:
    -   `preparation`: `String` - Vad användaren behöver förbereda.
    -   `steps`: `Array<String>` - Steg-för-steg-guide.
    -   `prompt`: `String` - Central uppmaning eller fokus för övningen.
-   `logConfig`: `Object` - Konfiguration för loggning efter övningen:
    -   `logType`: `String` - Förväntad loggtyp (`"text"`, `"audio"`, `"video"`, `"rating"`, `"none"`).
    -   `questions`: `Array<String>` - Förslag på reflektionsfrågor.
-   `flags`: `Object` - Egenskaper för övningen:
    -   `aiAssessment`: `Boolean` - Om AI ska analysera resultatet/loggen.
    -   `coachApprovalRequired`: `Boolean` - Om en coach behöver godkänna slutförandet.
    -   `netEnabled`: `Boolean` - Kräver interaktion med andra användare.
-   `tags`: `Array<String>` - (Valfritt) Sökbara taggar (t.ex. `["breathing", "mindfulness", "beginner"]`).

**💡 Flexibilitet:** Kan utökas med fält som `difficultyLevel`, `requiredEquipment`.

### 📝 Samling: `user_exercise_logs`

**Beskrivning:** Loggar användares genomförda övningar, deras framsteg och reflektioner. Ett dokument per genomförd övning.
**Dokument-ID:** Ett unikt auto-genererat ID för varje loggpost.

**Fält:**

-   `logId`: `String` - Samma som dokument-ID.
-   `userId`: `String` - Referens till användaren (UID från `users`).
-   `exerciseId`: `String` - Referens till övningen (ID från `exercises`).
-   `completedAt`: `Timestamp` - Tidsstämpel för när övningen slutfördes.
-   `durationTaken`: `Number` - (Valfritt) Faktisk tid i minuter som användaren spenderade.
-   `logData`: `Object` - Användarens reflektion och loggdata (beroende på `logConfig.logType`):
    -   `text`: `String` (om `logType` är `"text"`) - Skriven reflektion.
    -   `rating`: `Number` (om `logType` är `"rating"`) - T.ex. en skala 1-5.
    -   `audioLogUrl`: `String` (om `logType` är `"audio"`) - Länk till ljudlogg i Firebase Storage.
    -   `videoLogUrl`: `String` (om `logType` är `"video"`) - Länk till videologg i Firebase Storage.
    -   `aiAnalysisResult`: `Object` (om `flags.aiAssessment` är `true`) - Resultat från AI-analys (t.ex. `{ "balanceScore": 7.5, "report": "..." }`).
-   `sessionId`: `String` (valfritt) - Referens till `live_sessions` om övningen var en live-interaktion.
-   `status`: `String` - Status (t.ex. `"completed"`, `"skipped"`, `"in_progress"` - om loggning sker löpande).
-   `moodBefore`: `Number` - (Valfritt) Humör före övningen (skala 1-5).
-   `moodAfter`: `Number` - (Valfritt) Humör efter övningen (skala 1-5).

**💡 Strukturval:** Att ha en separat samling för loggar (`user_exercise_logs`) istället för en subcollection under `users` eller `exercises` gör det enklare att göra övergripande analyser och frågor över alla loggar, men kräver indexering på `userId` och `exerciseId` för effektiva sökningar per användare/övning.

### 👥 Samling: `live_sessions`

**Beskrivning:** Hanterar data för pågående eller avslutade live-interaktioner mellan användare (t.ex. för övningen `"Tyst Ögonkontakt Live"`).
**Dokument-ID:** Unikt ID för sessionen (t.ex. auto-genererat eller baserat på t.ex. ett mötesrums-ID).

**Fält:**

-   `sessionId`: `String` - Samma som dokument-ID.
-   `exerciseId`: `String` - Referens till den associerade övningen i `exercises` (t.ex. `"live_eye_contact_001"`).
-   `participants`: `Array<String>` - Lista med `userId` för deltagande användare (t.ex. `["user-uid-123", "user-uid-456"]`).
-   `status`: `String` - Sessionens status (t.ex. `"pending"`, `"active"`, `"completed"`, `"cancelled"`).
-   `startTime`: `Timestamp` - När sessionen startade eller är planerad att starta.
-   `endTime`: `Timestamp` - (Valfritt) När sessionen avslutades.
-   `videoCallInfo`: `Object` - (Valfritt) Information för att ansluta till videosamtalet (t.ex. rum-ID, token för WebRTC-tjänst).
-   `sessionData`: `Object` - (Valfritt) Data som genereras under sessionen (beroende på övning).

**💡 Koppling:** När en live-session avslutas, kan varje deltagares `user_exercise_logs` uppdateras med en referens (`sessionId`) till detta dokument.

### ✅ Samling: `consents`

**Beskrivning:** Lagrar användares samtycken (t.ex. GDPR, användarvillkor) för spårbarhet och efterlevnad.
**Dokument-ID:** Användarens UID (`userId`).

**Fält:**

-   `userId`: `String` - Samma som dokument-ID. Referens till `users`.
-   `consentHistory`: `Array<Object>` - En lista över givna samtycken:
    -   `type`: `String` - Typ av samtycke (t.ex. `"terms_of_service"`, `"privacy_policy"`, `"data_processing"`).
    -   `version`: `String` - Version av dokumentet som godkändes (t.ex. `"v1.0"`, `"2025-03-15"`).
    -   `agreedAt`: `Timestamp` - När samtycket gavs.
    -   `status`: `String` - Status (`"granted"`, `"revoked"`).

### 📞 Samling: `temp_sessions` (Tidigare `sessions`)

**Beskrivning:** Ersätter den temporära in-memory `call_status` dictionaryn. Används för att hantera kortlivad sessionsdata, t.ex. under ett pågående telefonsamtal eller en specifik interaktionsflöde. Dokument bör ha en TTL (Time-To-Live) policy satt i Firestore för automatisk rensning.
**Dokument-ID:** Unikt `sessionId` (t.ex. auto-genererat, eller telefonnummer vid verifiering).

**Fält:**

-   `sessionId`: `String` - Samma som dokument-ID.
-   `type`: `String` - Typ av temporär session (t.ex. `"phone_verification"`, `"live_matchmaking"`).
-   `userId`: `String` - (Valfritt) Referens till den associerade användaren i `users`.
-   `status`: `String` - Aktuell status för flödet (t.ex. `"initiated"`, `"code_sent"`, `"verified"`, `"failed"`).
-   `data`: `Object` - Sessionsspecifik data (t.ex. `{"verificationCode": "123456", "attempts": 1}`).
-   `createdAt`: `Timestamp` - När sessionen skapades (för TTL).
-   `expiresAt`: `Timestamp` - När dokumentet automatiskt ska tas bort av Firestore TTL policy.

## 📊 Exempeldata (Illustrativt)

### `users` (`/users/user-uid-123`)
```json
{
  "userId": "user-uid-123",
  "birthDate": "1988-12-06",
  "birthTime": "14:30",
  "birthLocation": "Stockholm, Sweden",
  "createdAt": "2025-03-24T10:00:00Z",
  "onboardingCompleted": true,
  "profile": { "displayName": "Joel K" },
  "preferences": {
    "uiStyle": "clean",
    "timeCommitment": 15,
    "focusArea": "stress_relief"
  },
  "insights": {
    "personalityType": {
      "traits": ["introvert", "intuitive"],
      "astroSign": "Sagittarius", // Korrigerat från Taurus
      "lifePathNumber": 8 // Korrigerat från 7
    },
    "neuroTendencies": { "adhdScore": 3, "autismScore": 2 },
    "wellbeingFlags": { "depressionRisk": false, "suicideRisk": false }
  },
  "onboardingAnswers": [{"qId": "q1", "a": "Draining"}, {"qId": "q2", "a": "One task"}]
}
```

### `exercises` (`/exercises/hemisync_focus_001`)
```json
{
  "exerciseId": "hemisync_focus_001",
  "title": "Hemisync: Fokusera Ljudet",
  "description": "En 10-minuters guidad Hemisync-meditation för ökat fokus.",
  "type": "audio",
  "category": "focus",
  "duration": 10,
  "media": { "audioUrl": "gs://innerjourney-bucket/audio/hemisync_focus_001.mp3" },
  "instructions": {
    "preparation": "Använd hörlurar och hitta en tyst plats.",
    "steps": ["Lyssna på ljudet.", "Följ instruktionerna.", "Andas lugnt."],
    "prompt": "Fokusera på ljudlandskapet och låt tankarna passera."
  },
  "logConfig": { "logType": "rating", "questions": ["Hur fokuserad känner du dig nu? (1-5)"] },
  "flags": { "aiAssessment": false, "coachApprovalRequired": false, "netEnabled": false },
  "tags": ["hemisync", "focus", "meditation"]
}
```

### `user_exercise_logs` (`/user_exercise_logs/log-xyz789`)
```json
{
  "logId": "log-xyz789",
  "userId": "user-uid-123",
  "exerciseId": "hemisync_focus_001",
  "completedAt": "2025-03-24T10:30:00Z",
  "logData": {
    "rating": 4 // Svar på frågan i logConfig
  },
  "status": "completed",
  "moodBefore": 3,
  "moodAfter": 4
}
```

## ✏️ Datainmatning & Användning

-   **Onboarding:** Användardata (`birthDate`, svar etc.) samlas in och sparas i `users`-dokumentet. Insikter (`insights`) genereras av backend och sparas där. Samtycken loggas i `consents`.
-   **Övningar:** Appen hämtar tillgängliga övningar från `exercises`. När en användare slutför en övning skapas en ny post i `user_exercise_logs`.
-   **Live Sessioner:** En post i `live_sessions` skapas när en session initieras. Deltagare läggs till, och status uppdateras.
-   **Temporära Flöden:** `temp_sessions` används för kortlivade processer som telefonverifiering.

## 💻 Teknisk Implementering

-   **Firebase:** `Firestore` för databasen, `Firebase Storage` för mediafiler, `Firebase Authentication` för användarhantering.
-   **Backend (`FastAPI`):** Hanterar logik för att skapa/uppdatera dokument, anropa externa API:er (t.ex. `Gemini`, astrologibibliotek som `Flatlib` eller liknande), och generera insikter.
-   **AI-analys:** Backend anropar relevanta AI-tjänster (Gemini för text/insikter, potentiellt andra för bild/rörelseanalys) och sparar resultaten i `user_exercise_logs`.
-   **Live-interaktioner:** Kräver integration med en WebRTC-tjänst eller liknande för video/ljud-kommunikation. `live_sessions` hanterar metadata.
-   **Realtid:** Frontend kan använda Firestore realtidslyssnare (`onSnapshot`) för att uppdatera UI:t när data ändras (t.ex. status för en live-session).

## 🛡️ Säkerhet & GDPR

-   **Kryptering:** Data i vila krypteras automatiskt av `Firestore`. Data i transit skyddas av HTTPS.
-   **Åtkomstkontroll:** `Firestore Security Rules` **måste** implementeras för att säkerställa att:
    -   Användare endast kan läsa/skriva sin egen data i `users`, `user_exercise_logs`, `consents`.
    -   Användare endast kan läsa data från `exercises`.
    -   Åtkomst till `live_sessions` och `temp_sessions` begränsas korrekt baserat på deltagande/status.
-   **Radering:** En funktion för kontoradering ska implementeras som tar bort användarens dokument i `users`, `consents` och alla relaterade loggar i `user_exercise_logs`. Anonymisering kan vara ett alternativ för vissa data om det är nödvändigt för statistik.
-   **Lagringstid:** Överväg TTL-policyer för `temp_sessions`. Definiera policyer för hur länge mediafiler (ljud/video-loggar) i `Firebase Storage` ska sparas.
-   **Samtycke:** `consents`-samlingen används för att spåra givna samtycken.
-   För mer detaljer, se det övergripande [Säkerhetsdokumentet](#) (länk till relevant dokument).

## 🔗 Koppling till Övriga Dokument

Denna databasstruktur stödjer funktioner och krav beskrivna i:

-   [Projektbeskrivning: Inner Journey](/docs/project/projektbeskrivning-2025)
-   [Användargränssnitt: Inner Journey](#) (länk)
-   [Utvecklingsplan: Inner Journey](#) (länk)
-   [Onboarding-process](#) (länk)
```

---

**Fil: `hur-du-forverkligar-drommar.md`** (Blogginlägget med ny titel och front matter)
```markdown
---
title: "Hur Du Förverkligar Drömmar"
description: "Reflektioner kring hur man tar sig an stora projektidéer, baserat på de första stegen i Inner Journey-projektet som kombinerar astrologi och AI."
slug: hur-du-frverkligar-drmmar # Ingen /blog/ prefix här
authors: joelkvarnsmyr
date: 2025-01-01
tags:
  - vision
  - projektstart
  - teknik
  - ai
  - lärdomar
  - "inner journey" # Citerad pga mellanslag
  - fastapi
  - react
---

# Hur Du Förverkligar Drömmar 🚀

**📅 Datum: 10 mars 2025**

Hej Inner Journey-vänner! 👋

🌱 Tänk dig att du står vid kanten av ett blankt papper, med en penna i handen och en idé som sprakar i huvudet – men ingen aning om var du ska börja rita. Så kändes det för oss för tio dagar sedan när vi sparkade igång *Inner Journey*.

I vårt första inlägg pratade vi om visionen: en plattform för självreflektion och utveckling. Nu har vi kastat oss ut i det okända – och oj, vad det har satt fart på oss!

## 💡 Drömmen Som Blev ett Kaos av Möjligheter

Vi började med att brainstorma allt vi kunde tänkas vilja ha med. Tänk dig en digital kompass för livet – något som både guidar och inspirerar. ✨

Vi landade i en spännande idé: vad om vi kombinerar vedisk astrologi med modern AI för att ge användarna personliga insikter? Inte bara "Saturnus i kvadrat med Venus", utan snarare insikter som *"Du finner lugn i rutiner, men spänning i relationer"*.

För att få till det började vi skissa på en teknisk arkitektur:
-   **Backend:** `FastAPI` (Python) för snabbhet och enkelhet.
-   **Frontend:** `React` (TypeScript) för ett modernt gränssnitt.
-   **Infrastruktur:** `Firebase` för datalagring och autentisering.
-   **Astrologi:** Integration med bibliotek som `VedAstro` (eller liknande).
-   **AI:** Google Gemini eller annan lämplig modell.

🛠️ Den 1 mars var vi fulla av energi. Nu, den 10 mars, har vi redan:
-   Satt upp en första testmiljö i `Google Cloud`.
-   Kopplat ett domännamn (hej, `api.innerjourney.se`!).
-   Börjat koda ett grundläggande flöde där användaren matar in födelsedata – datum, tid och plats – via frontend.

Vi har till och med testat `Sinch Voice API` för att potentiellt ringa upp och verifiera användare med en röstagent. Det är som science fiction – fast vi bygger det själva! 🧑‍🔬

## 📞 En Röst Från Framtiden (och en Lärdom)

Här är grejen som fick oss att haja till: under ett test ringde vår prototyp upp en av oss och sa, med en kusligt lugn röst: *“Välkommen till din inre resa. Ange din kod.”* 🗣️

Det var första gången vi hörde *Inner Journey* tala – och det gav oss gåshud. Plötsligt kändes det inte bara som kod och servrar, utan som något levande.

Men det avslöjade också en viktig fråga: **Hur gör vi detta så enkelt som möjligt för användaren?** Att använda `DTMF`-toner (knapptryckningar) under samtalet kändes lite klumpigt och daterat. Kanske ett enkelt formulär i frontend är en smidigare lösning för verifiering initialt? 🤔 Vi lutar åt det senare just nu.

## ✅ Vad Vi Lärt Oss (Redan!)

Här är några insikter från våra första tio dagar i projektets "kaosfas":

1.  **✨ Stora Drömmar Kräver Små, Fokuserade Steg:** Vi vill bygga allt på en gång – astrologi, AI, röstinteraktion, community – men vi inser att vi måste prioritera brutalt. Just nu är fokus 100% på att få grundflödet att fungera:
    *   Ta emot födelsedata från frontend.
    *   Skicka data till backend.
    *   Generera en första enkel astrologisk/AI-baserad insikt.
    *   Visa insikten för användaren.
2.  **🧑‍💻 Teknik Är Kul, Men Användaren Är Kung (eller Drottning):** `Sinch Voice API` är en häftig teknik, men om den komplicerar användarupplevelsen i ett tidigt skede, är den kanske inte värd det *just nu*. Vi behöver ständigt väga innovation mot användarvänlighet och välja det som ger mest värde för användaren *här och nu*.

## ➡️ Nästa Kapitel

Vi är mitt i ett spännande experiment – ett steg in i ovissheten med en vision som ledstjärna. Nästa veckas mål:

*   Testa kopplingen till `VedAstro` (eller motsvarande) i vår backend.
*   Se om vi kan få ut astrologisk rådata som “Månen i fjärde huset”.
*   Börja experimentera med att låta AI:n (t.ex. Gemini) omvandla denna rådata till meningsfulla, lättförståeliga insikter för användaren. 🧪

Häng med oss på resan – det här är bara början på något som vi hoppas kan bli riktigt stort och meningsfullt!

Vad tror ni – är kombinationen astrologi och AI spännande? Har ni egna erfarenheter av att starta stora, lite "galna" projekt? Mejla oss gärna era tankar på [kontakt@innerjourney.se](mailto:kontakt@innerjourney.se)!

Med spänning och en gnutta kreativt kaos, ✨
Team Inner Journey