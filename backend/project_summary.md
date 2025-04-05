# Projektkontext

**Genererad:** 2025-04-05 15:16:46  
**Rotmapp:** `/home/joelkvarnsmyr/projects/innerjourney/backend`

## Fil- och Mappstruktur
```
backend/
    Dockerfile
    README.md
    __init__.py
    backend.md
    cloudbuild.yaml
    main.py
    requirements.txt
    routes/
        __init__.py
        gemini.py
        github.py
        onboarding.py
    models/
        __init__.py
        activation.py
        onboarding.py
    services/
        __init__.py
        auth_service.py
        firebase_service.py
        gemini_service.py
        github_service.py
        onboarding_service.py
```

## Filinnehåll (Max 150 KB per fil)
### `Dockerfile`
```
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
ENV GOOGLE_APPLICATION_CREDENTIALS=/root/.config/gcloud/application_default_credentials.json
EXPOSE 8080
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
```

### `README.md`
```md
# InnerJourney Backend: README 🚀

## Översikt 📜

Detta är backend-delen av InnerJourney, en plattform för personlig utveckling. Backend är byggd med `FastAPI` (Python 🐍) och integrerar med Firebase `Firestore` 🔥 för datalagring och Google `Gemini` 🤖 för AI-genererade insikter. Applikationen är containeriserad med `Docker` 🐳 och deployad på Google `Cloud Run` ☁️ för skalbarhet och enkel hantering. Vi använder `Cloud Build` 🔧 för att automatiskt bygga och distribuera backend vid ändringar i Git. 📦

Denna README beskriver hur du sätter upp, kör och testar backend lokalt med `gcloud`-autentisering, samt hur du deployar till Google `Cloud Run`. Dessutom finns en detaljerad API-beskrivning för frontend-utvecklare.

## Förutsättningar ✅

Innan du börjar, se till att du har följande verktyg installerade:

*   🐍 **Python 3.10:** För att köra backend lokalt utan Docker.
*   🌐 **Git:** För att klona och hantera projektet.
*   🐳 **Docker:** För att bygga och köra backend i en container.
*   ☁️ **Google Cloud SDK (`gcloud`):** För autentisering, lokal testning och deployment till Google Cloud Run.
*   📦 **Node.js och npm (valfritt):** Om du vill köra frontend parallellt för att testa hela applikationen.
*   🔥 **Firebase-projekt:** Skapa ett projekt och aktivera `Firestore` och `Authentication`.
*   🌍 **Google Cloud-projekt:** Skapa ett projekt (t.ex. `innerjourney-c007e`) och aktivera API:er för `Cloud Run`, `Cloud Build`, och `Secret Manager`.

## Projektstruktur 🗂️

Backend-koden finns i `backend/`-mappen i projektets rot (`InnerJourney/`). Här är en översikt över viktiga filer:

```text
backend/
├── models/              # Pydantic-modeller för datavalidering (t.ex. activation.py) 📋
├── routes/              # API-routes (t.ex. gemini.py) 🛤️
├── services/            # Tjänster för logik (t.ex. gemini_service.py, firebase_service.py) 🛠️
├── __init__.py          # Gör mappen till ett Python-paket 📦
├── main.py              # Huvudfil för FastAPI-applikationen 🏁
├── requirements.txt     # Python-beroenden 📜
├── Dockerfile           # Instruktioner för att bygga Docker-containern 🐳
└── cloudbuild.yaml      # Konfiguration för Cloud Build 🔧
```

## Sätta upp och testa lokalt med gcloud-autentisering 🖥️

Följ dessa steg för att köra och testa backend lokalt med autentisering mot Google Cloud-tjänster (t.ex. `Secret Manager`):

### 1. Klona repot 📥

Klona projektet från GitHub och navigera till `backend/`-mappen:

```bash
git clone git@github.com:joelkvarnsmyr/InnerJourney.git
cd InnerJourney/backend
```

### 2. Autentisera med `gcloud` 🔐

Logga in med `gcloud` för att skapa Application Default Credentials (ADC) som containern kan använda:

```bash
gcloud auth application-default login
```

### 3. Bygg Docker-imagen 🛠️

Bygg Docker-imagen från `backend/`-mappen:

```bash
docker build -t innerjourney-backend .
```

*   `-t innerjourney-backend`: Namnger imagen som `innerjourney-backend`.

### 4. Kör containern med `gcloud`-autentisering 🚀

Kör containern och montera din lokala `gcloud`-konfiguration för autentisering:

```bash
docker run -p 8080:8080 -e PORT=8080 \
-v $HOME/.config/gcloud:/root/.config/gcloud \
innerjourney-backend
```

*   🌐 `-p 8080:8080`: Mappar port 8080 på din dator till containern.
*   🔧 `-e PORT=8080`: Sätter miljövariabeln `PORT` som används av `main.py`.
*   📂 `-v $HOME/.config/gcloud:/root/.config/gcloud`: Monterar din `gcloud`-konfiguration till containern för autentisering mot Google Cloud.

API:et är nu tillgängligt på `http://localhost:8080`. Testa det med `curl`:

```bash
curl -X POST "http://localhost:8080/gemini/getActivation" \
-H "Content-Type: application/json" \
-d '{"mood": 2, "goal": "komma igång"}'
```

## Deploya till Google Cloud Run med Git och Cloud Build 🌐

Vi använder `Cloud Build` för att automatisera deployment till Google `Cloud Run` vid varje push till `main`-grenen i GitHub.

### 1. Committa och pusha ändringar till GitHub 📤

Kontrollera ändringar:

```bash
git status
```

Lägg till ändringar:

```bash
git add .
```

Committa:

```bash
git commit -m "Beskriv ändringarna här"
```

Pusha till GitHub:

```bash
git push origin main
```

Detta triggar `Cloud Build` att bygga en ny Docker-image och deploya den till `Cloud Run`.

### 2. Följ byggprocessen i Cloud Build 🛠️

*   Gå till `Cloud Build > Build history` i Google Cloud Console.
*   Kontrollera att bygget slutförs utan fel via loggarna.

### 3. Testa i produktion ✅

När deploymenten är klar, testa endpointen på Cloud Run (ersätt URL med din faktiska URL):

```bash
curl -X POST "https://innerjourney-backend-975065734812.europe-west1.run.app/gemini/getActivation" \
-H "Content-Type: application/json" \
-d '{"mood": 2, "goal": "komma igång"}'
```

## API-dokumentation för frontend-utvecklare 📚

### Endpoint: `/gemini/getActivation`

Denna endpoint genererar en personlig aktivering baserat på användarens humör och mål. Aktiveringen sparas i `Firestore` och returneras till frontend.

*   **Metod:** `POST`
*   **URL:** `/gemini/getActivation`

#### Request Body

```json
{
  "mood": integer (1-5),
  "goal": string
}
```

*   `mood`: Användarens humör på en skala från 1 (lågt) till 5 (högt).
*   `goal`: Användarens mål (t.ex. "bli mer fokuserad", "komma igång").

#### Response

```json
{
  "title": string,
  "description": string,
  "duration": integer,
  "activation_type": string,
  "category_id": string,
  "prompt": string,
  "log_type": string,
  "prerequisite": string,
  "repetitions": integer,
  "questions": list of strings,
  "ai_assessment": boolean,
  "coach_approval_required": boolean,
  "net_enabled": boolean,
  "introduction_message": string,
  "preparation_message": string,
  "activation_id": string,
  "source": string
}
```

#### Exempel på svar:

```json
{
  "title": "Fokuserad Andning",
  "description": "En kort andningsövning för att öka fokus och klarhet.",
  "duration": 5,
  "activation_type": "meditation",
  "category_id": "brainsync",
  "prompt": "Sitt bekvämt och fokusera på din andning.",
  "log_type": "text",
  "prerequisite": "",
  "repetitions": 1,
  "questions": ["Hur kändes det att fokusera på din andning?"],
  "ai_assessment": false,
  "coach_approval_required": false,
  "net_enabled": false,
  "introduction_message": "Välkommen till denna fokusövning!",
  "preparation_message": "Hitta en lugn plats att sitta på.",
  "activation_id": "gemini_1743422072",
  "source": "AI"
}
```

#### Felhantering

*   `400 Bad Request`: Om `mood` eller `goal` saknas eller är ogiltiga.
*   `500 Internal Server Error`: Om Gemini-svaret inte kan parsas eller om obligatoriska fält saknas.

## Säkerhet och hemligheter 🔒

*   🔑 **API-nycklar:** Lagras i Google Cloud `Secret Manager`:
    *   `firebase-credentials`: Firebase service account JSON.
    *   `gemini-api-key`: Gemini API-nyckel.
*   🛡️ **Behörigheter:** Cloud Run-tjänstens servicekonto (`[PROJECT_NUMBER]-compute@developer.gserviceaccount.com`) måste ha rollen `Secret Manager Secret Accessor`. Lägg till detta i `IAM` i Google Cloud Console.

## Felsökning 🐞

### 1. 404 Not Found

*   **Orsak:** Endpoint hittas inte.
*   **Lösning:** Kontrollera att routern är importerad i `main.py` (t.ex. `app.include_router(gemini.router, prefix="/gemini")`).

### 2. PermissionDenied vid Secret Manager

*   **Orsak:** Saknade behörigheter för Cloud Run-tjänstens servicekonto.
*   **Lösning:** Ge servicekontot rollen `Secret Manager Secret Accessor` i `IAM`.

### 3. Container kraschar vid start

*   **Orsak:** Syntaxfel, saknade beroenden eller konfigurationsproblem.
*   **Lösning:**
    *   Kontrollera Cloud Run-loggar i Google Cloud Console.
    *   Bygg och kör lokalt med `docker build` och `docker run` för att felsöka.

## Nästa steg 🌟

*   📈 Lägg till fler endpoints (t.ex. för telefonverifiering eller reflektioner).
*   🧪 Implementera enhetstester med `pytest`.
*   🔐 Förbättra säkerheten genom att ta bort `--allow-unauthenticated` och lägga till API-nyckelvalidering eller annan autentisering.

## Kontakt 📬

För frågor eller bidrag, skapa ett issue på GitHub: `joelkvarnsmyr/InnerJourney`.
```

### `__init__.py`
```py

```

### `backend.md`
```md
# Projektkontext

**Genererad:** 2025-04-04 15:46:01  
**Rotmapp:** `/home/joelkvarnsmyr/projects/innerjourney/backend`

## Fil- och Mappstruktur
```
backend/
    Dockerfile
    README.md
    __init__.py
    cloudbuild.yaml
    main.py
    requirements.txt
    routes/
        __init__.py
        gemini.py
        github.py
        onboarding.py
    models/
        __init__.py
        activation.py
        onboarding.py
    services/
        __init__.py
        auth_service.py
        firebase_service.py
        gemini_service.py
        github_service.py
        onboarding_service.py
```

## Filinnehåll (Max 150 KB per fil)
### `Dockerfile`
```
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
ENV GOOGLE_APPLICATION_CREDENTIALS=/root/.config/gcloud/application_default_credentials.json
EXPOSE 8080
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
```

### `README.md`
```md
# InnerJourney Backend: README 🚀

## Översikt 📜

Detta är backend-delen av InnerJourney, en plattform för personlig utveckling. Backend är byggd med `FastAPI` (Python 🐍) och integrerar med Firebase `Firestore` 🔥 för datalagring och Google `Gemini` 🤖 för AI-genererade insikter. Applikationen är containeriserad med `Docker` 🐳 och deployad på Google `Cloud Run` ☁️ för skalbarhet och enkel hantering. Vi använder `Cloud Build` 🔧 för att automatiskt bygga och distribuera backend vid ändringar i Git. 📦

Denna README beskriver hur du sätter upp, kör och testar backend lokalt med `gcloud`-autentisering, samt hur du deployar till Google `Cloud Run`. Dessutom finns en detaljerad API-beskrivning för frontend-utvecklare.

## Förutsättningar ✅

Innan du börjar, se till att du har följande verktyg installerade:

*   🐍 **Python 3.10:** För att köra backend lokalt utan Docker.
*   🌐 **Git:** För att klona och hantera projektet.
*   🐳 **Docker:** För att bygga och köra backend i en container.
*   ☁️ **Google Cloud SDK (`gcloud`):** För autentisering, lokal testning och deployment till Google Cloud Run.
*   📦 **Node.js och npm (valfritt):** Om du vill köra frontend parallellt för att testa hela applikationen.
*   🔥 **Firebase-projekt:** Skapa ett projekt och aktivera `Firestore` och `Authentication`.
*   🌍 **Google Cloud-projekt:** Skapa ett projekt (t.ex. `innerjourney-c007e`) och aktivera API:er för `Cloud Run`, `Cloud Build`, och `Secret Manager`.

## Projektstruktur 🗂️

Backend-koden finns i `backend/`-mappen i projektets rot (`InnerJourney/`). Här är en översikt över viktiga filer:

```text
backend/
├── models/              # Pydantic-modeller för datavalidering (t.ex. activation.py) 📋
├── routes/              # API-routes (t.ex. gemini.py) 🛤️
├── services/            # Tjänster för logik (t.ex. gemini_service.py, firebase_service.py) 🛠️
├── __init__.py          # Gör mappen till ett Python-paket 📦
├── main.py              # Huvudfil för FastAPI-applikationen 🏁
├── requirements.txt     # Python-beroenden 📜
├── Dockerfile           # Instruktioner för att bygga Docker-containern 🐳
└── cloudbuild.yaml      # Konfiguration för Cloud Build 🔧
```

## Sätta upp och testa lokalt med gcloud-autentisering 🖥️

Följ dessa steg för att köra och testa backend lokalt med autentisering mot Google Cloud-tjänster (t.ex. `Secret Manager`):

### 1. Klona repot 📥

Klona projektet från GitHub och navigera till `backend/`-mappen:

```bash
git clone git@github.com:joelkvarnsmyr/InnerJourney.git
cd InnerJourney/backend
```

### 2. Autentisera med `gcloud` 🔐

Logga in med `gcloud` för att skapa Application Default Credentials (ADC) som containern kan använda:

```bash
gcloud auth application-default login
```

### 3. Bygg Docker-imagen 🛠️

Bygg Docker-imagen från `backend/`-mappen:

```bash
docker build -t innerjourney-backend .
```

*   `-t innerjourney-backend`: Namnger imagen som `innerjourney-backend`.

### 4. Kör containern med `gcloud`-autentisering 🚀

Kör containern och montera din lokala `gcloud`-konfiguration för autentisering:

```bash
docker run -p 8080:8080 -e PORT=8080 \
-v $HOME/.config/gcloud:/root/.config/gcloud \
innerjourney-backend
```

*   🌐 `-p 8080:8080`: Mappar port 8080 på din dator till containern.
*   🔧 `-e PORT=8080`: Sätter miljövariabeln `PORT` som används av `main.py`.
*   📂 `-v $HOME/.config/gcloud:/root/.config/gcloud`: Monterar din `gcloud`-konfiguration till containern för autentisering mot Google Cloud.

API:et är nu tillgängligt på `http://localhost:8080`. Testa det med `curl`:

```bash
curl -X POST "http://localhost:8080/gemini/getActivation" \
-H "Content-Type: application/json" \
-d '{"mood": 2, "goal": "komma igång"}'
```

## Deploya till Google Cloud Run med Git och Cloud Build 🌐

Vi använder `Cloud Build` för att automatisera deployment till Google `Cloud Run` vid varje push till `main`-grenen i GitHub.

### 1. Committa och pusha ändringar till GitHub 📤

Kontrollera ändringar:

```bash
git status
```

Lägg till ändringar:

```bash
git add .
```

Committa:

```bash
git commit -m "Beskriv ändringarna här"
```

Pusha till GitHub:

```bash
git push origin main
```

Detta triggar `Cloud Build` att bygga en ny Docker-image och deploya den till `Cloud Run`.

### 2. Följ byggprocessen i Cloud Build 🛠️

*   Gå till `Cloud Build > Build history` i Google Cloud Console.
*   Kontrollera att bygget slutförs utan fel via loggarna.

### 3. Testa i produktion ✅

När deploymenten är klar, testa endpointen på Cloud Run (ersätt URL med din faktiska URL):

```bash
curl -X POST "https://innerjourney-backend-975065734812.europe-west1.run.app/gemini/getActivation" \
-H "Content-Type: application/json" \
-d '{"mood": 2, "goal": "komma igång"}'
```

## API-dokumentation för frontend-utvecklare 📚

### Endpoint: `/gemini/getActivation`

Denna endpoint genererar en personlig aktivering baserat på användarens humör och mål. Aktiveringen sparas i `Firestore` och returneras till frontend.

*   **Metod:** `POST`
*   **URL:** `/gemini/getActivation`

#### Request Body

```json
{
  "mood": integer (1-5),
  "goal": string
}
```

*   `mood`: Användarens humör på en skala från 1 (lågt) till 5 (högt).
*   `goal`: Användarens mål (t.ex. "bli mer fokuserad", "komma igång").

#### Response

```json
{
  "title": string,
  "description": string,
  "duration": integer,
  "activation_type": string,
  "category_id": string,
  "prompt": string,
  "log_type": string,
  "prerequisite": string,
  "repetitions": integer,
  "questions": list of strings,
  "ai_assessment": boolean,
  "coach_approval_required": boolean,
  "net_enabled": boolean,
  "introduction_message": string,
  "preparation_message": string,
  "activation_id": string,
  "source": string
}
```

#### Exempel på svar:

```json
{
  "title": "Fokuserad Andning",
  "description": "En kort andningsövning för att öka fokus och klarhet.",
  "duration": 5,
  "activation_type": "meditation",
  "category_id": "brainsync",
  "prompt": "Sitt bekvämt och fokusera på din andning.",
  "log_type": "text",
  "prerequisite": "",
  "repetitions": 1,
  "questions": ["Hur kändes det att fokusera på din andning?"],
  "ai_assessment": false,
  "coach_approval_required": false,
  "net_enabled": false,
  "introduction_message": "Välkommen till denna fokusövning!",
  "preparation_message": "Hitta en lugn plats att sitta på.",
  "activation_id": "gemini_1743422072",
  "source": "AI"
}
```

#### Felhantering

*   `400 Bad Request`: Om `mood` eller `goal` saknas eller är ogiltiga.
*   `500 Internal Server Error`: Om Gemini-svaret inte kan parsas eller om obligatoriska fält saknas.

## Säkerhet och hemligheter 🔒

*   🔑 **API-nycklar:** Lagras i Google Cloud `Secret Manager`:
    *   `firebase-credentials`: Firebase service account JSON.
    *   `gemini-api-key`: Gemini API-nyckel.
*   🛡️ **Behörigheter:** Cloud Run-tjänstens servicekonto (`[PROJECT_NUMBER]-compute@developer.gserviceaccount.com`) måste ha rollen `Secret Manager Secret Accessor`. Lägg till detta i `IAM` i Google Cloud Console.

## Felsökning 🐞

### 1. 404 Not Found

*   **Orsak:** Endpoint hittas inte.
*   **Lösning:** Kontrollera att routern är importerad i `main.py` (t.ex. `app.include_router(gemini.router, prefix="/gemini")`).

### 2. PermissionDenied vid Secret Manager

*   **Orsak:** Saknade behörigheter för Cloud Run-tjänstens servicekonto.
*   **Lösning:** Ge servicekontot rollen `Secret Manager Secret Accessor` i `IAM`.

### 3. Container kraschar vid start

*   **Orsak:** Syntaxfel, saknade beroenden eller konfigurationsproblem.
*   **Lösning:**
    *   Kontrollera Cloud Run-loggar i Google Cloud Console.
    *   Bygg och kör lokalt med `docker build` och `docker run` för att felsöka.

## Nästa steg 🌟

*   📈 Lägg till fler endpoints (t.ex. för telefonverifiering eller reflektioner).
*   🧪 Implementera enhetstester med `pytest`.
*   🔐 Förbättra säkerheten genom att ta bort `--allow-unauthenticated` och lägga till API-nyckelvalidering eller annan autentisering.

## Kontakt 📬

För frågor eller bidrag, skapa ett issue på GitHub: `joelkvarnsmyr/InnerJourney`.
```

### `__init__.py`
```py

```

### `cloudbuild.yaml`
```yaml
steps:
  # Steg 1: Bygg Docker-imagen för backend
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/innerjourney-backend', '.']
    dir: 'backend'

  # Steg 2: Pusha Docker-imagen till Artifact Registry
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/innerjourney-backend']

  # Steg 3: Distribuera till Cloud Run
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    args:
      - 'run'
      - 'deploy'
      - 'innerjourney-backend'
      - '--image=gcr.io/$PROJECT_ID/innerjourney-backend'
      - '--platform=managed'
      - '--region=europe-west1'
      - '--allow-unauthenticated'
    entrypoint: 'gcloud'

# Artifacts som skapas
images:
  - 'gcr.io/$PROJECT_ID/innerjourney-backend'
```

### `main.py`
```py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.gemini import router as gemini_router
from routes.onboarding import router as onboarding_router
from routes.github import router as github_router
import firebase_admin
from firebase_admin import credentials

# Initiera Firebase Admin SDK med ADC
if not firebase_admin._apps:
    firebase_admin.initialize_app()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inkludera routrarna med explicit namn
app.include_router(gemini_router, prefix="/gemini")
app.include_router(onboarding_router, prefix="/onboarding")
app.include_router(github_router, prefix="/api/github")  # Ändra prefix till /api/github

@app.get("/")
async def root():
    return {"message": "Welcome to InnerJourney Backend"}
```

### `requirements.txt`
```txt
annotated-types==0.7.0
anyio==4.9.0
CacheControl==0.14.2
cachetools==5.5.2
certifi==2025.1.31
cffi==1.17.1
charset-normalizer==3.4.1
click==8.1.8
cryptography==44.0.2
exceptiongroup==1.2.2
fastapi==0.115.12
firebase-admin==6.7.0
google-ai-generativelanguage==0.6.15
google-api-core==2.24.2
google-api-python-client==2.166.0
google-auth==2.38.0
google-auth-httplib2==0.2.0
google-cloud-core==2.4.3
google-cloud-firestore==2.20.1
google-cloud-storage==3.1.0
google-crc32c==1.7.1
google-generativeai==0.8.4
google-resumable-media==2.7.2
googleapis-common-protos==1.69.2
grpcio==1.71.0
grpcio-status==1.71.0
h11==0.14.0
httplib2==0.22.0
idna==3.10
msgpack==1.1.0
proto-plus==1.26.1
protobuf==5.29.4
pyasn1==0.6.1
pyasn1_modules==0.4.2
pycparser==2.22
pydantic==2.11.0
pydantic_core==2.33.0
PyJWT==2.10.1
pyparsing==3.2.3
python-dotenv==1.1.0
requests==2.32.3
rsa==4.9
sniffio==1.3.1
starlette==0.46.1
tqdm==4.67.1
typing-inspection==0.4.0
typing_extensions==4.13.0
uritemplate==4.1.1
urllib3==2.3.0
uvicorn==0.34.0
aiohttp==3.10.5
google-cloud-secret-manager

```

### `routes/__init__.py`
```py
from .gemini import router as gemini
from .onboarding import router as onboarding_chat  # Ändra från onboarding_chat till onboarding
```

### `routes/gemini.py`
```py
from fastapi import APIRouter, HTTPException, Depends
import json
import logging
from datetime import datetime
from models.activation import ActivationRequest, ActivationResponse
from services.gemini_service import generate_activation
from services.firebase_service import save_to_firestore
from services.auth_service import verify_token  # Uppdaterad import

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/getActivation", response_model=ActivationResponse)
async def get_activation(request: ActivationRequest, user: dict = Depends(verify_token)):
    try:
        logger.info(f"Received request: {request}")
        mood = request.mood
        goal = request.goal
        profile = request.profile if request.profile else {}

        if not mood or not goal:
            logger.error("Mood and goal are required")
            raise HTTPException(status_code=400, detail="Mood and goal are required")

        # Generera aktivering med profildata
        activation_json = generate_activation(mood, goal, profile)
        logger.info(f"Generated activation JSON: {activation_json}")

        # Rensa svaret från markdown-formatering
        activation_json = activation_json.strip()
        if activation_json.startswith("```json"):
            activation_json = activation_json[7:]
        if activation_json.endswith("```"):
            activation_json = activation_json[:-3]
        activation_json = activation_json.strip()

        # Parsa JSON
        activation = json.loads(activation_json)
        logger.info(f"Parsed activation: {activation}")

        # Validera obligatoriska fält
        required_fields = [
            "title", "description", "duration", "activation_type", "category_id",
            "prompt", "log_type", "prerequisite", "repetitions", "questions",
            "ai_assessment", "coach_approval_required", "net_enabled",
            "introduction_message", "preparation_message"
        ]
        for field in required_fields:
            if field not in activation:
                logger.error(f"Missing required field: {field}")
                raise HTTPException(status_code=400, detail=f"Activation JSON must contain '{field}'")

        # Lägg till ett unikt ID, tagg som AI-genererat och metadata
        user_id = user.get("uid")
        activation_id = f"gemini_{int(__import__('time').time())}"
        activation["activation_id"] = activation_id
        activation["source"] = "AI"
        activation["created_at"] = datetime.now().isoformat()
        activation["user_id"] = user_id

        # Spara till Firestore
        save_to_firestore("activations", user_id, activation)

        # Returnera svar till frontend
        return ActivationResponse(**activation)

    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse activation JSON: {e}")
        raise HTTPException(status_code=500, detail=f"Invalid JSON response from Gemini: {str(e)}")
    except ValueError as e:
        logger.error(f"Validation error: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error in get_activation: {e}")
        raise HTTPException(status_code=500, detail=f"Error generating activation: {str(e)}")
```

### `routes/github.py`
```py
# routes/github.py
from fastapi import APIRouter, HTTPException, Depends # Importera Depends om du behöver auth senare
from typing import List, Dict, Any # Importera typer
import logging
# Importera BÅDA service-funktionerna
from services.github_service import fetch_all_project_items_from_github, fetch_moscow_data_grouped
# Importera eventuell autentiseringsfunktion om du återinför den
# from utils.auth import verify_token # Exempel

router = APIRouter()
logger = logging.getLogger(__name__)

# --- NY ENDPOINT för att hämta alla items ---
@router.get("/items", response_model=List[Dict[str, Any]])
# Lägg tillbaka Depends(verify_token) om du behöver autentisering
async def get_all_items(): # user: dict = Depends(verify_token)):
    """Hämtar alla projekt-items som en platt lista."""
    try:
        logger.info(f"Anrop till {router.prefix}/items mottaget")
        all_items = await fetch_all_project_items_from_github()
        logger.info(f"Returnerar {len(all_items)} items från {router.prefix}/items")
        return all_items
    except Exception as e:
        logger.error(f"Fel i {router.prefix}/items endpoint: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))


# --- Uppdaterad ENDPOINT för MoSCoW ---
@router.get("/moscow", response_model=Dict[str, List[Dict[str, Any]]])
# Lägg tillbaka Depends(verify_token) om du behöver autentisering
async def get_moscow_data(): # user: dict = Depends(verify_token)):
    """Hämtar MoSCoW-data, grupperad i backend."""
    try:
        logger.info(f"Anrop till {router.prefix}/moscow (grupperad) mottaget")
        # Anropa den nya funktionen som först hämtar allt och sedan grupperar
        grouped_data = await fetch_moscow_data_grouped()
        logger.info(f"Returnerar MoSCoW-grupperad data.")
        return grouped_data
    except Exception as e:
        logger.error(f"Fel i {router.prefix}/moscow (grupperad) endpoint: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))
```

### `routes/onboarding.py`
```py
from fastapi import APIRouter, HTTPException, Depends  # Lägg till Depends
import logging
from datetime import datetime
from typing import List, Dict
from models.onboarding import OnboardingChatRequest, OnboardingChatResponse
from services.firebase_service import save_to_firestore
from services.auth_service import verify_token

router = APIRouter()
logger = logging.getLogger(__name__)

# Frågor som Gemini ska ställa
QUESTIONS = [
    "Hej! Jag är din onboarding-assistent. För att skräddarsy din upplevelse, kan du berätta när du är född? (Ange i formatet ÅÅÅÅ-MM-DD, t.ex. 1990-05-15)",
    "Vad är ditt primära mål med InnerJourney? Välj ett av följande: Stresslindring, Fokus, Självmedvetenhet.",
    "Hur skulle du beskriva dig själv? Är du mer introvert (gillar att vara ensam) eller extrovert (gillar sociala situationer)?",
    "Hur föredrar du att arbeta? En uppgift i taget eller flera uppgifter samtidigt?",
    "Hur känner du dig inför framtiden just nu? Hoppfull eller hopplös?"
]

@router.post("/chat", response_model=OnboardingChatResponse)
async def onboarding_chat(request: OnboardingChatRequest, user: dict = Depends(verify_token)):
    try:
        # Hämta användarens UID från token
        user_id = user.get("uid", request.userId or f"user_{int(datetime.now().timestamp())}")

        # Hämta eller initiera konversationstillstånd
        conversation = request.conversation or []

        # Lägg till användarens svar i konversationen (om det finns)
        if request.userResponse:
            conversation.append({"role": "user", "message": request.userResponse})

        # Kontrollera om vi har ställt alla frågor
        if len(conversation) >= len(QUESTIONS) * 2:  # Varje fråga + svar = 2 meddelanden
            # Alla frågor är besvarade, analysera och spara
            user_data = analyze_conversation(conversation, user_id)
            save_to_firestore("users", user_id, user_data)

            # Spara samtycke (GDPR)
            consent_data = {
                "userId": user_id,
                "agreedAt": datetime.now().isoformat(),
                "version": "v1.0",
            }
            save_to_firestore("consents", user_id, consent_data)

            return OnboardingChatResponse(
                userId=user_id,
                message="Tack för att du slutförde onboardingen! Du kan nu börja din resa med InnerJourney.",
                conversation=conversation,
                isComplete=True
            )

        # Beräkna nästa fråga baserat på konversationens längd
        next_question_index = len(conversation) // 2
        next_question = QUESTIONS[next_question_index]

        # Lägg till nästa fråga i konversationen
        conversation.append({"role": "assistant", "message": next_question})

        return OnboardingChatResponse(
            userId=user_id,
            message=next_question,
            conversation=conversation,
            isComplete=False
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Analysera konversationen och skapa användarprofil
def analyze_conversation(conversation: List[Dict[str, str]], user_id: str) -> Dict[str, any]:
    # Extrahera svaren (varannan rad är ett användarsvar)
    answers = [msg["message"] for msg in conversation if msg["role"] == "user"]

    # Skapa en enkel personlighetsprofil
    personality_type = {
        "traits": [],
        "astroSign": "Taurus",  # Placeholder, kan beräknas från birthDate
        "lifePathNumber": 7,    # Placeholder, kan beräknas från birthDate
    }
    if "introvert" in answers[2].lower():
        personality_type["traits"].append("introvert")
    elif "extrovert" in answers[2].lower():
        personality_type["traits"].append("extrovert")

    # Skapa neurologiska indikatorer
    neuro_tendencies = {
        "adhdScore": 3 if "många" in answers[3].lower() else 0,
        "autismScore": 0,  # Kan utökas i framtiden
    }

    # Skapa välmåendemarkörer
    wellbeing_flags = {
        "depressionRisk": False,  # Kan utökas i framtiden
        "suicideRisk": "hopplös" in answers[4].lower(),
    }

    return {
        "userId": user_id,
        "birthDate": answers[0],
        "createdAt": datetime.now().isoformat(),
        "focusArea": "stress_relief" if "stresslindring" in answers[1].lower() else
                     "focus" if "fokus" in answers[1].lower() else
                     "self_awareness",
        "personalityType": personality_type,
        "neuroTendencies": neuro_tendencies,
        "wellbeingFlags": wellbeing_flags,
        "answers": [
            {"q1": answers[2]},  # Introvert/extrovert
            {"q2": answers[3]},  # Arbetsstil
            {"q3": answers[4]},  # Framtidsutsikter
        ],
    }
```

### `models/__init__.py`
```py

```

### `models/activation.py`
```py
from pydantic import BaseModel
from typing import List

class ActivationRequest(BaseModel):
    mood: int
    goal: str

class ActivationResponse(BaseModel):
    title: str
    description: str
    duration: int
    activation_type: str
    category_id: str
    prompt: str
    log_type: str
    prerequisite: str
    repetitions: int
    questions: List[str]
    ai_assessment: bool
    coach_approval_required: bool
    net_enabled: bool
    introduction_message: str
    preparation_message: str
    activation_id: str
    source: str
```

### `models/onboarding.py`
```py
from pydantic import BaseModel
from typing import List, Dict, Optional

class OnboardingChatRequest(BaseModel):
    userId: Optional[str] = None
    userResponse: Optional[str] = None
    conversation: Optional[List[Dict[str, str]]] = None

class OnboardingChatResponse(BaseModel):
    userId: str
    message: str
    conversation: List[Dict[str, str]]
    isComplete: bool
```

### `services/__init__.py`
```py

```

### `services/auth_service.py`
```py
from fastapi import Request, HTTPException
from firebase_admin import auth


def verify_token(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authorization header missing or invalid")

    token = auth_header.split("Bearer ")[1]
    try:
        decoded_token = auth.verify_id_token(token)
        request.state.user = decoded_token
        return decoded_token
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")
```

### `services/firebase_service.py`
```py
import json
from google.cloud import secretmanager
import firebase_admin
from firebase_admin import credentials, firestore

# Hämta hemligheter från Secret Manager
def get_secret(secret_name):
    client = secretmanager.SecretManagerServiceClient()
    secret_version = f"projects/innerjourney-c007e/secrets/{secret_name}/versions/latest"
    response = client.access_secret_version(name=secret_version)
    return response.payload.data.decode("UTF-8")

# Hämta Firebase-uppgifter
firebase_credentials_json = get_secret("firebase-credentials")
cred = credentials.Certificate(json.loads(firebase_credentials_json))
firebase_admin.initialize_app(cred)
db = firestore.client()

# Spara data till Firestore
def save_to_firestore(collection, doc_id, data):
    db.collection(collection).document(doc_id).set(data)
```

### `services/gemini_service.py`
```py
import os
import logging
from google.cloud import secretmanager
from google.generativeai import GenerativeModel
import google.generativeai as genai

# Sätt upp loggning
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Hämta hemligheter från Secret Manager
def get_secret(secret_name):
    try:
        client = secretmanager.SecretManagerServiceClient()
        secret_version = f"projects/innerjourney-c007e/secrets/{secret_name}/versions/latest"
        logger.info(f"Fetching secret: {secret_name}")
        response = client.access_secret_version(name=secret_version)
        return response.payload.data.decode("UTF-8")
    except Exception as e:
        logger.error(f"Failed to fetch secret {secret_name}: {e}")
        raise

# Hämta Gemini API-nyckel
try:
    api_key = get_secret("gemini-api-key")
    genai.configure(api_key=api_key)
except Exception as e:
    logger.error(f"Failed to configure Gemini API: {e}")
    raise

# Definiera modellen
model = GenerativeModel("gemini-1.5-pro-latest")

def generate_activation(mood: int, goal: str, profile: dict = {}):
    try:
        # Skapa en prompt som inkluderar profildata
        prompt = f"""
Givet användarens humör {mood}/5 och mål '{goal}', samt följande profilinformation:
- Fokusområde: {profile.get('focusArea', 'unknown')}
- Personlighet: {profile.get('personalityType', {}).get('traits', ['unknown'])[0]}
- Neurologiska tendenser: ADHD-poäng {profile.get('neuroTendencies', {}).get('adhdScore', 0)}
- Välmåendeflaggor: Självmordsrisk {'Ja' if profile.get('wellbeingFlags', {}).get('suicideRisk', False) else 'Nej'}

Generera en personlig aktivering för personlig utveckling. Aktiveringen ska följa InnerJourney-arkitekturen och inkludera följande fält i JSON-format:

- "title": En kort, engagerande titel för aktiveringen.
- "description": En kort beskrivning av vad användaren ska göra.
- "duration": Uppskattad tid i minuter för aktiveringen.
- "activation_type": Typ av aktivering (t.ex. "meditation", "physical", "social", "ai_assessment", "live_event").
- "category_id": Kategori för aktiveringen (t.ex. "inner_child", "manifest", "shadows", "brainsync", "sleep").
- "prompt": En kort instruktion eller uppmaning till användaren.
- "log_type": Hur användaren ska logga sin upplevelse (t.ex. "text", "video", "audio").
- "prerequisite": Eventuella förkrav för aktiveringen (lämna tomt om inga finns).
- "repetitions": Hur många gånger användaren ska upprepa aktiveringen.
- "questions": En lista med reflektionsfrågor för användaren efter aktiveringen.
- "ai_assessment": Om aktiveringen involverar AI-bedömning (true eller false).
- "coach_approval_required": Om coachgodkännande krävs (true eller false).
- "net_enabled": Om aktiveringen kräver internet (true eller false).
- "introduction_message": Ett meddelande för att introducera aktiveringen.
- "preparation_message": Ett meddelande för att förbereda användaren.

Se till att svaret är ett giltigt JSON-objekt med alla dessa fält.
"""
        logger.info(f"Generating activation with prompt: {prompt}")
        response = model.generate_content(prompt)
        logger.info(f"Received response: {response.text}")
        return response.text
    except Exception as e:
        logger.error(f"Failed to generate activation: {e}")
        return '{"title": "Mock Step", "description": "This is a mock step due to an error: ' + str(e) + '"}'
```

### `services/github_service.py`
```py
# github_service.py
import logging
import aiohttp
from functools import lru_cache # Behåll cache för rådata
from google.cloud import secretmanager
from typing import List, Dict, Any # Lägg till typ-hintar

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- get_secret och github_token (Oförändrat) ---
def get_secret(secret_name): # ... (samma kod)
# Hämta GitHub-token (Oförändrat)
try:
    github_token = get_secret("github-pat")
except Exception as e: # ... (samma kod)


# --- NY Generell Funktion för att Hämta och Transformera ALL Data ---
@lru_cache(maxsize=1) # Cache det transformerade resultatet
async def fetch_all_project_items_from_github() -> List[Dict[str, Any]]:
    """Hämtar ALLA items från GitHub för projekt 24 och transformerar dem till dictionaries."""
    try:
        # Samma GraphQL-query som tidigare (hämtar all nödvändig info)
        query = """
        query GetProjectItems($owner: String! = "joelkvarnsmyr", $projectNumber: Int! = 24, $firstItems: Int = 100, $firstAssignees: Int = 10, $firstLabels: Int = 10, $firstFields: Int = 25) {
          user(login: $owner) {
            projectV2(number: $projectNumber) {
              items(first: $firstItems) {
                nodes {
                  id
                  type # Lägg till typ (ISSUE, DRAFT_ISSUE, PULL_REQUEST)
                  content {
                    ... on Issue {
                      title
                      body
                      url
                      number # Bra att ha issue-nummer
                      state # OPEN / CLOSED
                      assignees(first: $firstAssignees) { nodes { login id } }
                      labels(first: $firstLabels) { nodes { name color id } }
                      milestone { title url number state }
                      repository { nameWithOwner url id }
                      # Hämta parent om det är en Tasklist i en Issue Body?
                      # För "Parent issue" fältet - se fieldValues
                    }
                    ... on DraftIssue {
                      title
                      body
                      assignees(first: $firstAssignees) { nodes { login id } }
                    }
                    ... on PullRequest {
                        title
                        body
                        url
                        number # PR nummer
                        state # OPEN / CLOSED / MERGED
                        assignees(first: $firstAssignees) { nodes { login id } }
                        labels(first: $firstLabels) { nodes { name color id } }
                        milestone { title url number state }
                        repository { nameWithOwner url id }
                        reviewers(first: 10) { nodes { ... on User { login id } } } # Exempel
                    }
                  }
                  # Öka first för fieldValues om du har fler än 25 fält
                  fieldValues(first: $firstFields) {
                    nodes {
                      __typename # Bra att ha typnamnet för felsökning
                      ... on ProjectV2ItemFieldTextValue { text field { ... on ProjectV2Field { name id } } }
                      ... on ProjectV2ItemFieldNumberValue { number field { ... on ProjectV2Field { name id } } }
                      ... on ProjectV2ItemFieldDateValue { date field { ... on ProjectV2Field { name id } } }
                      ... on ProjectV2ItemFieldSingleSelectValue { name id field { ... on ProjectV2SingleSelectField { name id } } }
                      ... on ProjectV2ItemFieldIterationValue { title startDate field { ... on ProjectV2IterationField { name id } } }
                       # Lägg till fler fälttyper här om du använder dem (t.ex. Users, Labels som projektfält)
                       ... on ProjectV2ItemFieldUserValue { users(first: 5) { nodes { login id } } field { ... on ProjectV2Field { name id } } }
                       ... on ProjectV2ItemFieldLabelValue { labels(first: 10) { nodes { name id color } } field { ... on ProjectV2Field { name id } } }
                    }
                  }
                }
                pageInfo { # För framtida paginering om 100 inte räcker
                    endCursor
                    hasNextPage
                }
              }
            }
          }
        }
        """
        headers = { "Authorization": f"Bearer {github_token}", "Content-Type": "application/json" }

        logger.info("Fetching ALL GitHub project items...")
        async with aiohttp.ClientSession() as session:
            async with session.post("https://api.github.com/graphql", json={"query": query}, headers=headers) as response:
                response.raise_for_status()
                data = await response.json()
                logger.debug(f"Rådata från GitHub: {data}") # Debug-logg

        if "errors" in data:
            logger.error(f"GraphQL error: {data['errors']}")
            raise Exception(f"GraphQL error: {data['errors']}")

        raw_items = data["data"]["user"]["projectV2"]["items"]["nodes"]
        all_project_items: List[Dict[str, Any]] = [] # Lista för transformerade items

        logger.info(f"Transformerar {len(raw_items)} items...")
        for item in raw_items:
            # Mappa fältvärden för enkel åtkomst
            field_map = {}
            if item.get("fieldValues"):
                for fv in item["fieldValues"]["nodes"]:
                    field_name = fv.get("field", {}).get("name")
                    if field_name:
                        # Hantera olika fälttyper korrekt
                        value = None
                        if fv.get("__typename") == "ProjectV2ItemFieldSingleSelectValue": value = fv.get("name")
                        elif fv.get("__typename") == "ProjectV2ItemFieldTextValue": value = fv.get("text")
                        elif fv.get("__typename") == "ProjectV2ItemFieldNumberValue": value = fv.get("number")
                        elif fv.get("__typename") == "ProjectV2ItemFieldDateValue": value = fv.get("date")
                        elif fv.get("__typename") == "ProjectV2ItemFieldIterationValue": value = {"title": fv.get("title"), "startDate": fv.get("startDate")} # Returnera objekt
                        # Lägg till fler typer här...
                        elif fv.get("__typename") == "ProjectV2ItemFieldUserValue": value = [u.get("login") for u in fv.get("users", {}).get("nodes", [])] # Exempel: lista med logins
                        elif fv.get("__typename") == "ProjectV2ItemFieldLabelValue": value = [l.get("name") for l in fv.get("labels", {}).get("nodes", [])] # Exempel: lista med namn

                        if value is not None: # Lägg bara till om vi har ett värde
                             field_map[field_name] = value
                         else:
                             logger.warning(f"Fält '{field_name}' i item {item.get('id')} har okänd/tom typ: {fv.get('__typename')}")


            # Hämta data från 'content' (Issue, DraftIssue, PullRequest)
            content = item.get("content", {}) or {} # Säkerställ att content är en dict

            # Skapa det slutgiltiga projektitem-objektet
            # Använd .get() med fallback för att undvika KeyError
            project_item = {
                "id": item.get("id"),
                "itemType": item.get("type"), # ISSUE, DRAFT_ISSUE, PULL_REQUEST
                "title": content.get("title", "Titel saknas"),
                "description": content.get("body"),
                "url": content.get("url"),
                "issueOrPrNumber": content.get("number"), # Nummer för Issue/PR
                "state": content.get("state"), # OPEN/CLOSED/MERGED

                # Hämta värden från field_map
                "status": field_map.get("Status"),
                "priority": field_map.get("Priority"),
                "size": field_map.get("Size"),
                "estimate": field_map.get("Estimate"),
                "moscow": field_map.get("MoSCoW"),
                "team": field_map.get("Team"),
                "userValue": field_map.get("User Value"),
                "releaseVersion": field_map.get("Release version"),
                "financialImpact": field_map.get("Financial Impact"),
                "quarter": field_map.get("Quarter"),
                "risk": field_map.get("Risk"),
                "stakeholder": field_map.get("Stakeholder"),
                "fundingSource": field_map.get("Funding Source"),
                "dependencies": field_map.get("Dependencies"),
                "objective": field_map.get("Objective"),
                "discussionUrl": field_map.get("Discussion URL"), # Kolla exakt fältnamn
                "ideaStatus": field_map.get("Idea Status"),
                "startDate": field_map.get("Start date"),
                "endDate": field_map.get("End date"), # Kolla om du fortfarande vill ha detta
                "deadline": field_map.get("Deadline"), # Kolla exakt fältnamn

                # Hämta nästlade objekt/listor direkt från content om möjligt
                "assignees": [a.get("login") for a in content.get("assignees", {}).get("nodes", [])],
                "labels": [l.get("name") for l in content.get("labels", {}).get("nodes", [])],
                "milestone": content.get("milestone"), # Hela objektet
                "repository": content.get("repository"), # Hela objektet

                 # Hämta reviewers specifikt från PR
                 "reviewers": [r.get("login") for r in content.get("reviewers", {}).get("nodes", [])] if item.get("type") == "PULL_REQUEST" else [],

                 # Parent issue - detta fält verkar inte finnas direkt i GraphQL för project items?
                 # Du kan behöva hämta detta separat eller om det är ett anpassat fält.
                 "parentIssue": field_map.get("Parent issue"), # Om det är ett anpassat textfält
            }
            all_project_items.append(project_item)

        logger.info(f"Transformering klar. {len(all_project_items)} items.")
        return all_project_items

    except aiohttp.ClientResponseError as e:
        logger.error(f"HTTP error fetching GitHub data: {e.status} {e.message}", exc_info=True)
        raise Exception(f"HTTP-fel ({e.status}) vid hämtning från GitHub.")
    except Exception as e:
        logger.error(f"Failed to fetch/transform GitHub project items: {e}", exc_info=True)
        raise Exception(f"Fel vid hämtning/transformering av GitHub-data: {str(e)}")


# --- Modifierad funktion för att GRUPPERA MoSCoW-data ---
# Använder nu den generella funktionen för att hämta rådatan.
async def fetch_moscow_data_grouped() -> Dict[str, List[Dict[str, Any]]]:
    """Hämtar alla items och grupperar dem sedan efter MoSCoW-kategori."""
    try:
        logger.info("Fetching all items to group by MoSCoW...")
        all_items = await fetch_all_project_items_from_github() # Anropa den nya funktionen

        # Initiera kategorier
        project_data = { "Must have": [], "Should have": [], "Could have": [], "Won't have": [], "Okategoriserad": [] }

        logger.info("Grouping items by MoSCoW...")
        for item in all_items:
            category = item.get("moscow", "Okategoriserad") or "Okategoriserad" # Fånga upp None eller tom sträng
            if category not in project_data:
                logger.warning(f"Oväntad MoSCoW-kategori: {category}. Lägger till i Okategoriserad.")
                category = "Okategoriserad"
            project_data[category].append(item)

        # Ta bort tomma kategorier (valfritt)
        project_data = {k: v for k, v in project_data.items() if v or k == "Okategoriserad"} # Behåll Okategoriserad även om tom?
        if not project_data["Okategoriserad"]:
             del project_data["Okategoriserad"]

        logger.info("Items grouped by MoSCoW successfully.")
        return project_data

    except Exception as e:
        logger.error(f"Failed to group data by MoSCoW: {e}", exc_info=True)
        # Kasta vidare felet så att FastAPI-endpointen kan hantera det
        raise Exception(f"Fel vid gruppering av MoSCoW-data: {str(e)}")


# Ta bort den gamla fetch_moscow_data om du inte behöver den
# @lru_cache(maxsize=1)
# async def fetch_moscow_data(): ... (den gamla koden)
```

### `services/onboarding_service.py`
```py
import logging
from datetime import datetime
from typing import Dict, List
from models.onboarding import OnboardingChatRequest  # Assuming this is defined in models/onboarding.py
from services.firebase_service import save_to_firestore  # Assuming this is defined in services/firebase_service.py

logger = logging.getLogger(__name__)

# Lista med frågor som assistenten ställer under onboardingen
QUESTIONS = [
    "När är du född? (ÅÅÅÅ-MM-DD)",
    "Vad är ditt primära mål med din inre resa? Stresslindring, Fokus eller Självmedvetenhet?",
    "Är du introvert eller extrovert?",
    "Hur föredrar du att arbeta? En uppgift i taget eller flera samtidigt?",
    "Hur känner du dig inför framtiden? Hoppfull eller hopplös?"
]


def handle_onboarding_chat(request: OnboardingChatRequest) -> Dict:
    """
    Hanterar onboardingsamtalet och returnerar nästa steg i konversationen.

    :param request: Ett OnboardingChatRequest-objekt med userId, userResponse och conversation.
    :return: Ett dictionary med userId, message, conversation och isComplete.
    """
    # Sätt conversation till tom lista om den är None
    conversation = request.conversation if request.conversation is not None else []

    # Generera user_id om det inte finns
    user_id = request.userId or f"user_{int(datetime.now().timestamp())}"

    # Hämta användarens svar om det finns
    user_response = request.userResponse

    # Lägg till användarens svar i konversationen om det finns
    if user_response:
        conversation.append({"role": "user", "message": user_response})

    # Kontrollera om alla frågor är besvarade (antal meddelanden >= antal frågor * 2)
    if len(conversation) >= len(QUESTIONS) * 2:
        # Analysera konversationen och spara användardata
        user_data = analyze_conversation(conversation, user_id)
        save_to_firestore("users", user_id, user_data)
        return {
            "userId": user_id,
            "message": "Tack! Nu kan du börja din resa.",
            "conversation": conversation,
            "isComplete": True
        }

    # Beräkna index för nästa fråga
    next_question_index = len(conversation) // 2
    next_question = QUESTIONS[next_question_index]

    # Lägg till nästa fråga i konversationen
    conversation.append({"role": "assistant", "message": next_question})

    # Returnera svaret
    return {
        "userId": user_id,
        "message": next_question,
        "conversation": conversation,
        "isComplete": False
    }


def analyze_conversation(conversation: List[Dict[str, str]], user_id: str) -> Dict:
    """
    Analyserar användarens svar och skapar en profil.

    :param conversation: Lista med konversationsmeddelanden.
    :param user_id: Användarens ID.
    :return: Ett dictionary med användarprofilen.
    """
    # Extrahera användarens svar (varannan meddelande är ett användarsvar)
    answers = [msg["message"] for msg in conversation if msg["role"] == "user"]

    # Skapa profil baserat på svaren
    return {
        "userId": user_id,
        "birthDate": answers[0],
        "focusArea": answers[1].lower(),
        "personality": "introvert" if "introvert" in answers[2].lower() else "extrovert",
        "workStyle": answers[3],
        "outlook": answers[4]
    }
```

```

### `cloudbuild.yaml`
```yaml
steps:
  # Steg 1: Bygg Docker-imagen för backend
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/innerjourney-backend', '.']
    dir: 'backend'

  # Steg 2: Pusha Docker-imagen till Artifact Registry
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/innerjourney-backend']

  # Steg 3: Distribuera till Cloud Run
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    args:
      - 'run'
      - 'deploy'
      - 'innerjourney-backend'
      - '--image=gcr.io/$PROJECT_ID/innerjourney-backend'
      - '--platform=managed'
      - '--region=europe-west1'
      - '--allow-unauthenticated'
    entrypoint: 'gcloud'

# Artifacts som skapas
images:
  - 'gcr.io/$PROJECT_ID/innerjourney-backend'
```

### `main.py`
```py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.gemini import router as gemini_router
from routes.onboarding import router as onboarding_router
from routes.github import router as github_router
import firebase_admin
from firebase_admin import credentials

# Initiera Firebase Admin SDK med ADC
if not firebase_admin._apps:
    firebase_admin.initialize_app()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inkludera routrarna med explicit namn
app.include_router(gemini_router, prefix="/gemini")
app.include_router(onboarding_router, prefix="/onboarding")
app.include_router(github_router, prefix="/api/github")  # Ändra prefix till /api/github

@app.get("/")
async def root():
    return {"message": "Welcome to InnerJourney Backend"}
```

### `requirements.txt`
```txt
annotated-types==0.7.0
anyio==4.9.0
CacheControl==0.14.2
cachetools==5.5.2
certifi==2025.1.31
cffi==1.17.1
charset-normalizer==3.4.1
click==8.1.8
cryptography==44.0.2
exceptiongroup==1.2.2
fastapi==0.115.12
firebase-admin==6.7.0
google-ai-generativelanguage==0.6.15
google-api-core==2.24.2
google-api-python-client==2.166.0
google-auth==2.38.0
google-auth-httplib2==0.2.0
google-cloud-core==2.4.3
google-cloud-firestore==2.20.1
google-cloud-storage==3.1.0
google-crc32c==1.7.1
google-generativeai==0.8.4
google-resumable-media==2.7.2
googleapis-common-protos==1.69.2
grpcio==1.71.0
grpcio-status==1.71.0
h11==0.14.0
httplib2==0.22.0
idna==3.10
msgpack==1.1.0
proto-plus==1.26.1
protobuf==5.29.4
pyasn1==0.6.1
pyasn1_modules==0.4.2
pycparser==2.22
pydantic==2.11.0
pydantic_core==2.33.0
PyJWT==2.10.1
pyparsing==3.2.3
python-dotenv==1.1.0
requests==2.32.3
rsa==4.9
sniffio==1.3.1
starlette==0.46.1
tqdm==4.67.1
typing-inspection==0.4.0
typing_extensions==4.13.0
uritemplate==4.1.1
urllib3==2.3.0
uvicorn==0.34.0
aiohttp==3.10.5
google-cloud-secret-manager

```

### `routes/__init__.py`
```py
from .gemini import router as gemini
from .onboarding import router as onboarding_chat  # Ändra från onboarding_chat till onboarding
```

### `routes/gemini.py`
```py
from fastapi import APIRouter, HTTPException, Depends
import json
import logging
from datetime import datetime
from models.activation import ActivationRequest, ActivationResponse
from services.gemini_service import generate_activation
from services.firebase_service import save_to_firestore
from services.auth_service import verify_token  # Uppdaterad import

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/getActivation", response_model=ActivationResponse)
async def get_activation(request: ActivationRequest, user: dict = Depends(verify_token)):
    try:
        logger.info(f"Received request: {request}")
        mood = request.mood
        goal = request.goal
        profile = request.profile if request.profile else {}

        if not mood or not goal:
            logger.error("Mood and goal are required")
            raise HTTPException(status_code=400, detail="Mood and goal are required")

        # Generera aktivering med profildata
        activation_json = generate_activation(mood, goal, profile)
        logger.info(f"Generated activation JSON: {activation_json}")

        # Rensa svaret från markdown-formatering
        activation_json = activation_json.strip()
        if activation_json.startswith("```json"):
            activation_json = activation_json[7:]
        if activation_json.endswith("```"):
            activation_json = activation_json[:-3]
        activation_json = activation_json.strip()

        # Parsa JSON
        activation = json.loads(activation_json)
        logger.info(f"Parsed activation: {activation}")

        # Validera obligatoriska fält
        required_fields = [
            "title", "description", "duration", "activation_type", "category_id",
            "prompt", "log_type", "prerequisite", "repetitions", "questions",
            "ai_assessment", "coach_approval_required", "net_enabled",
            "introduction_message", "preparation_message"
        ]
        for field in required_fields:
            if field not in activation:
                logger.error(f"Missing required field: {field}")
                raise HTTPException(status_code=400, detail=f"Activation JSON must contain '{field}'")

        # Lägg till ett unikt ID, tagg som AI-genererat och metadata
        user_id = user.get("uid")
        activation_id = f"gemini_{int(__import__('time').time())}"
        activation["activation_id"] = activation_id
        activation["source"] = "AI"
        activation["created_at"] = datetime.now().isoformat()
        activation["user_id"] = user_id

        # Spara till Firestore
        save_to_firestore("activations", user_id, activation)

        # Returnera svar till frontend
        return ActivationResponse(**activation)

    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse activation JSON: {e}")
        raise HTTPException(status_code=500, detail=f"Invalid JSON response from Gemini: {str(e)}")
    except ValueError as e:
        logger.error(f"Validation error: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error in get_activation: {e}")
        raise HTTPException(status_code=500, detail=f"Error generating activation: {str(e)}")
```

### `routes/github.py`
```py
# routes/github.py
from fastapi import APIRouter, HTTPException
from typing import Dict, Any
import logging
from services.github_service import fetch_all_project_data_from_github

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/project",
            response_model=Dict[str, Any],
            summary="Hämta all projekt-data",
            description="Hämtar all rådata för projekt 24 från GitHub.")
async def get_project_data():
    try:
        logger.info("Anrop till /api/github/project mottaget")
        project_data = await fetch_all_project_data_from_github()
        logger.info("Returnerar projekt-data")
        return project_data
    except Exception as e:
        logger.error(f"Fel i /api/github/project: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Fel vid hämtning av projektdata: {str(e)}")
```

### `routes/onboarding.py`
```py
from fastapi import APIRouter, HTTPException, Depends  # Lägg till Depends
import logging
from datetime import datetime
from typing import List, Dict
from models.onboarding import OnboardingChatRequest, OnboardingChatResponse
from services.firebase_service import save_to_firestore
from services.auth_service import verify_token

router = APIRouter()
logger = logging.getLogger(__name__)

# Frågor som Gemini ska ställa
QUESTIONS = [
    "Hej! Jag är din onboarding-assistent. För att skräddarsy din upplevelse, kan du berätta när du är född? (Ange i formatet ÅÅÅÅ-MM-DD, t.ex. 1990-05-15)",
    "Vad är ditt primära mål med InnerJourney? Välj ett av följande: Stresslindring, Fokus, Självmedvetenhet.",
    "Hur skulle du beskriva dig själv? Är du mer introvert (gillar att vara ensam) eller extrovert (gillar sociala situationer)?",
    "Hur föredrar du att arbeta? En uppgift i taget eller flera uppgifter samtidigt?",
    "Hur känner du dig inför framtiden just nu? Hoppfull eller hopplös?"
]

@router.post("/chat", response_model=OnboardingChatResponse)
async def onboarding_chat(request: OnboardingChatRequest, user: dict = Depends(verify_token)):
    try:
        # Hämta användarens UID från token
        user_id = user.get("uid", request.userId or f"user_{int(datetime.now().timestamp())}")

        # Hämta eller initiera konversationstillstånd
        conversation = request.conversation or []

        # Lägg till användarens svar i konversationen (om det finns)
        if request.userResponse:
            conversation.append({"role": "user", "message": request.userResponse})

        # Kontrollera om vi har ställt alla frågor
        if len(conversation) >= len(QUESTIONS) * 2:  # Varje fråga + svar = 2 meddelanden
            # Alla frågor är besvarade, analysera och spara
            user_data = analyze_conversation(conversation, user_id)
            save_to_firestore("users", user_id, user_data)

            # Spara samtycke (GDPR)
            consent_data = {
                "userId": user_id,
                "agreedAt": datetime.now().isoformat(),
                "version": "v1.0",
            }
            save_to_firestore("consents", user_id, consent_data)

            return OnboardingChatResponse(
                userId=user_id,
                message="Tack för att du slutförde onboardingen! Du kan nu börja din resa med InnerJourney.",
                conversation=conversation,
                isComplete=True
            )

        # Beräkna nästa fråga baserat på konversationens längd
        next_question_index = len(conversation) // 2
        next_question = QUESTIONS[next_question_index]

        # Lägg till nästa fråga i konversationen
        conversation.append({"role": "assistant", "message": next_question})

        return OnboardingChatResponse(
            userId=user_id,
            message=next_question,
            conversation=conversation,
            isComplete=False
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Analysera konversationen och skapa användarprofil
def analyze_conversation(conversation: List[Dict[str, str]], user_id: str) -> Dict[str, any]:
    # Extrahera svaren (varannan rad är ett användarsvar)
    answers = [msg["message"] for msg in conversation if msg["role"] == "user"]

    # Skapa en enkel personlighetsprofil
    personality_type = {
        "traits": [],
        "astroSign": "Taurus",  # Placeholder, kan beräknas från birthDate
        "lifePathNumber": 7,    # Placeholder, kan beräknas från birthDate
    }
    if "introvert" in answers[2].lower():
        personality_type["traits"].append("introvert")
    elif "extrovert" in answers[2].lower():
        personality_type["traits"].append("extrovert")

    # Skapa neurologiska indikatorer
    neuro_tendencies = {
        "adhdScore": 3 if "många" in answers[3].lower() else 0,
        "autismScore": 0,  # Kan utökas i framtiden
    }

    # Skapa välmåendemarkörer
    wellbeing_flags = {
        "depressionRisk": False,  # Kan utökas i framtiden
        "suicideRisk": "hopplös" in answers[4].lower(),
    }

    return {
        "userId": user_id,
        "birthDate": answers[0],
        "createdAt": datetime.now().isoformat(),
        "focusArea": "stress_relief" if "stresslindring" in answers[1].lower() else
                     "focus" if "fokus" in answers[1].lower() else
                     "self_awareness",
        "personalityType": personality_type,
        "neuroTendencies": neuro_tendencies,
        "wellbeingFlags": wellbeing_flags,
        "answers": [
            {"q1": answers[2]},  # Introvert/extrovert
            {"q2": answers[3]},  # Arbetsstil
            {"q3": answers[4]},  # Framtidsutsikter
        ],
    }
```

### `models/__init__.py`
```py

```

### `models/activation.py`
```py
from pydantic import BaseModel
from typing import List

class ActivationRequest(BaseModel):
    mood: int
    goal: str

class ActivationResponse(BaseModel):
    title: str
    description: str
    duration: int
    activation_type: str
    category_id: str
    prompt: str
    log_type: str
    prerequisite: str
    repetitions: int
    questions: List[str]
    ai_assessment: bool
    coach_approval_required: bool
    net_enabled: bool
    introduction_message: str
    preparation_message: str
    activation_id: str
    source: str
```

### `models/onboarding.py`
```py
from pydantic import BaseModel
from typing import List, Dict, Optional

class OnboardingChatRequest(BaseModel):
    userId: Optional[str] = None
    userResponse: Optional[str] = None
    conversation: Optional[List[Dict[str, str]]] = None

class OnboardingChatResponse(BaseModel):
    userId: str
    message: str
    conversation: List[Dict[str, str]]
    isComplete: bool
```

### `services/__init__.py`
```py

```

### `services/auth_service.py`
```py
from fastapi import Request, HTTPException
from firebase_admin import auth


def verify_token(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authorization header missing or invalid")

    token = auth_header.split("Bearer ")[1]
    try:
        decoded_token = auth.verify_id_token(token)
        request.state.user = decoded_token
        return decoded_token
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")
```

### `services/firebase_service.py`
```py
import json
from google.cloud import secretmanager
import firebase_admin
from firebase_admin import credentials, firestore

# Hämta hemligheter från Secret Manager
def get_secret(secret_name):
    client = secretmanager.SecretManagerServiceClient()
    secret_version = f"projects/innerjourney-c007e/secrets/{secret_name}/versions/latest"
    response = client.access_secret_version(name=secret_version)
    return response.payload.data.decode("UTF-8")

# Hämta Firebase-uppgifter
firebase_credentials_json = get_secret("firebase-credentials")
cred = credentials.Certificate(json.loads(firebase_credentials_json))
firebase_admin.initialize_app(cred)
db = firestore.client()

# Spara data till Firestore
def save_to_firestore(collection, doc_id, data):
    db.collection(collection).document(doc_id).set(data)
```

### `services/gemini_service.py`
```py
import os
import logging
from google.cloud import secretmanager
from google.generativeai import GenerativeModel
import google.generativeai as genai

# Sätt upp loggning
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Hämta hemligheter från Secret Manager
def get_secret(secret_name):
    try:
        client = secretmanager.SecretManagerServiceClient()
        secret_version = f"projects/innerjourney-c007e/secrets/{secret_name}/versions/latest"
        logger.info(f"Fetching secret: {secret_name}")
        response = client.access_secret_version(name=secret_version)
        return response.payload.data.decode("UTF-8")
    except Exception as e:
        logger.error(f"Failed to fetch secret {secret_name}: {e}")
        raise

# Hämta Gemini API-nyckel
try:
    api_key = get_secret("gemini-api-key")
    genai.configure(api_key=api_key)
except Exception as e:
    logger.error(f"Failed to configure Gemini API: {e}")
    raise

# Definiera modellen
model = GenerativeModel("gemini-1.5-pro-latest")

def generate_activation(mood: int, goal: str, profile: dict = {}):
    try:
        # Skapa en prompt som inkluderar profildata
        prompt = f"""
Givet användarens humör {mood}/5 och mål '{goal}', samt följande profilinformation:
- Fokusområde: {profile.get('focusArea', 'unknown')}
- Personlighet: {profile.get('personalityType', {}).get('traits', ['unknown'])[0]}
- Neurologiska tendenser: ADHD-poäng {profile.get('neuroTendencies', {}).get('adhdScore', 0)}
- Välmåendeflaggor: Självmordsrisk {'Ja' if profile.get('wellbeingFlags', {}).get('suicideRisk', False) else 'Nej'}

Generera en personlig aktivering för personlig utveckling. Aktiveringen ska följa InnerJourney-arkitekturen och inkludera följande fält i JSON-format:

- "title": En kort, engagerande titel för aktiveringen.
- "description": En kort beskrivning av vad användaren ska göra.
- "duration": Uppskattad tid i minuter för aktiveringen.
- "activation_type": Typ av aktivering (t.ex. "meditation", "physical", "social", "ai_assessment", "live_event").
- "category_id": Kategori för aktiveringen (t.ex. "inner_child", "manifest", "shadows", "brainsync", "sleep").
- "prompt": En kort instruktion eller uppmaning till användaren.
- "log_type": Hur användaren ska logga sin upplevelse (t.ex. "text", "video", "audio").
- "prerequisite": Eventuella förkrav för aktiveringen (lämna tomt om inga finns).
- "repetitions": Hur många gånger användaren ska upprepa aktiveringen.
- "questions": En lista med reflektionsfrågor för användaren efter aktiveringen.
- "ai_assessment": Om aktiveringen involverar AI-bedömning (true eller false).
- "coach_approval_required": Om coachgodkännande krävs (true eller false).
- "net_enabled": Om aktiveringen kräver internet (true eller false).
- "introduction_message": Ett meddelande för att introducera aktiveringen.
- "preparation_message": Ett meddelande för att förbereda användaren.

Se till att svaret är ett giltigt JSON-objekt med alla dessa fält.
"""
        logger.info(f"Generating activation with prompt: {prompt}")
        response = model.generate_content(prompt)
        logger.info(f"Received response: {response.text}")
        return response.text
    except Exception as e:
        logger.error(f"Failed to generate activation: {e}")
        return '{"title": "Mock Step", "description": "This is a mock step due to an error: ' + str(e) + '"}'
```

### `services/github_service.py`
```py
# services/github_service.py
import logging
import aiohttp
from functools import lru_cache
from google.cloud import secretmanager
from typing import Dict, Any

# Sätt upp loggning
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# --- Hämta hemligheter från Google Cloud Secret Manager ---
def get_secret(secret_name):
    """Hämtar en hemlighet från Google Cloud Secret Manager."""
    try:
        client = secretmanager.SecretManagerServiceClient()
        project_id = "innerjourney-c007e"
        secret_version_name = f"projects/{project_id}/secrets/{secret_name}/versions/latest"
        logger.info(f"Fetching secret version: {secret_version_name}")
        response = client.access_secret_version(name=secret_version_name)
        secret_value = response.payload.data.decode("UTF-8")
        logger.info(f"Successfully fetched secret: {secret_name}")
        return secret_value
    except Exception as e:
        logger.error(f"Failed to fetch secret {secret_name}: {e}", exc_info=True)
        raise RuntimeError(f"Could not fetch secret: {secret_name}") from e

try:
    github_token = get_secret("github-pat")
    if not github_token:
        raise ValueError("GitHub token fetched from Secret Manager is empty.")
except Exception as e:
    logger.critical(f"CRITICAL: Failed to fetch GitHub token on startup: {e}")
    raise

# --- Hämta all data från GitHub-projektet ---
@lru_cache(maxsize=1)
async def fetch_all_project_data_from_github() -> Dict[str, Any]:
    """Hämtar ALL data från GitHub för projekt 24 under användaren joelkvarnsmyr och returnerar den råa strukturen."""
    if not github_token:
        logger.error("GitHub token is not available.")
        raise Exception("GitHub token är inte konfigurerad.")

    try:
        query = """
        query {
          user(login: "joelkvarnsmyr") {
            projectV2(number: 24) {
              id
              title
              url
              shortDescription
              public
              closed
              readme
              owner {
                ... on User { login }
                ... on Organization { login }
              }
              createdAt
              updatedAt
              fields(first: 100) {
                totalCount
                nodes {
                  ... on ProjectV2Field {
                    id
                    name
                    dataType
                  }
                  ... on ProjectV2SingleSelectField {
                    id
                    name
                    dataType
                    options { id, name, color, description }
                  }
                  ... on ProjectV2IterationField {
                    id
                    name
                    dataType
                    configuration {
                      startDay
                      duration
                      iterations { id, title, startDate, duration }
                      completedIterations { id, title, startDate, duration }
                    }
                  }
                }
                pageInfo { hasNextPage, endCursor }
              }
              items(first: 100) {
                totalCount
                nodes {
                  id
                  type
                  isArchived
                  createdAt
                  updatedAt
                  fieldValues(first: 100) {
                    totalCount
                    nodes {
                      ... on ProjectV2ItemFieldTextValue {
                        text
                        field {
                          ... on ProjectV2Field { id, name, dataType }
                        }
                      }
                      ... on ProjectV2ItemFieldNumberValue {
                        number
                        field {
                          ... on ProjectV2Field { id, name, dataType }
                        }
                      }
                      ... on ProjectV2ItemFieldDateValue {
                        date
                        field {
                          ... on ProjectV2Field { id, name, dataType }
                        }
                      }
                      ... on ProjectV2ItemFieldSingleSelectValue {
                        name
                        optionId
                        field {
                          ... on ProjectV2SingleSelectField { id, name, dataType, options { id, name } }
                        }
                      }
                      ... on ProjectV2ItemFieldIterationValue {
                        title
                        iterationId
                        startDate
                        duration
                        field {
                          ... on ProjectV2IterationField { id, name, dataType }
                        }
                      }
                    }
                    pageInfo { hasNextPage, endCursor }
                  }
                  content {
                    ... on Issue {
                      id
                      title
                      url
                      body
                      state
                      number
                      createdAt
                      updatedAt
                      closedAt
                      author { login }
                      assignees(first: 100) { totalCount, nodes { login } }
                      labels(first: 100) { totalCount, nodes { id, name, color } }
                      milestone { id, title, dueOn, state }
                      repository { id, name, owner { login } }
                    }
                    ... on PullRequest {
                      id
                      title
                      url
                      body
                      state
                      number
                      createdAt
                      updatedAt
                      closedAt
                      merged
                      mergedAt
                      author { login }
                      assignees(first: 100) { totalCount, nodes { login } }
                      labels(first: 100) { totalCount, nodes { id, name, color } }
                      milestone { id, title, dueOn, state }
                      repository { id, name, owner { login } }
                    }
                    ... on DraftIssue {
                      id
                      title
                      body
                      createdAt
                      updatedAt
                      creator { login }
                    }
                  }
                }
                pageInfo { hasNextPage, endCursor }
              }
            }
          }
        }
        """
        headers = {"Authorization": f"Bearer {github_token}", "Content-Type": "application/json"}
        logger.info("Fetching ALL data from GitHub for project 24 under user joelkvarnsmyr...")
        async with aiohttp.ClientSession() as session:
            async with session.post("https://api.github.com/graphql", json={"query": query}, headers=headers) as response:
                if response.status != 200:
                    logger.error(f"GitHub API returned status {response.status}: {await response.text()}")
                    raise Exception(f"GitHub API error: {response.status}")
                data = await response.json()
        if "errors" in data:
            logger.error(f"GraphQL errors: {data['errors']}")
            raise Exception(f"GraphQL error: {data['errors']}")
        if not data.get("data") or not data["data"]["user"] or not data["data"]["user"]["projectV2"]:
            logger.error(f"Unexpected data structure: {data}")
            raise Exception("Kunde inte hitta projektdata.")
        return data["data"]["user"]["projectV2"]
    except Exception as e:
        logger.error(f"Failed to fetch GitHub data: {e}", exc_info=True)
        raise Exception(f"Fel vid hämtning av GitHub-data: {str(e)}")
```

### `services/onboarding_service.py`
```py
import logging
from datetime import datetime
from typing import Dict, List
from models.onboarding import OnboardingChatRequest  # Assuming this is defined in models/onboarding.py
from services.firebase_service import save_to_firestore  # Assuming this is defined in services/firebase_service.py

logger = logging.getLogger(__name__)

# Lista med frågor som assistenten ställer under onboardingen
QUESTIONS = [
    "När är du född? (ÅÅÅÅ-MM-DD)",
    "Vad är ditt primära mål med din inre resa? Stresslindring, Fokus eller Självmedvetenhet?",
    "Är du introvert eller extrovert?",
    "Hur föredrar du att arbeta? En uppgift i taget eller flera samtidigt?",
    "Hur känner du dig inför framtiden? Hoppfull eller hopplös?"
]


def handle_onboarding_chat(request: OnboardingChatRequest) -> Dict:
    """
    Hanterar onboardingsamtalet och returnerar nästa steg i konversationen.

    :param request: Ett OnboardingChatRequest-objekt med userId, userResponse och conversation.
    :return: Ett dictionary med userId, message, conversation och isComplete.
    """
    # Sätt conversation till tom lista om den är None
    conversation = request.conversation if request.conversation is not None else []

    # Generera user_id om det inte finns
    user_id = request.userId or f"user_{int(datetime.now().timestamp())}"

    # Hämta användarens svar om det finns
    user_response = request.userResponse

    # Lägg till användarens svar i konversationen om det finns
    if user_response:
        conversation.append({"role": "user", "message": user_response})

    # Kontrollera om alla frågor är besvarade (antal meddelanden >= antal frågor * 2)
    if len(conversation) >= len(QUESTIONS) * 2:
        # Analysera konversationen och spara användardata
        user_data = analyze_conversation(conversation, user_id)
        save_to_firestore("users", user_id, user_data)
        return {
            "userId": user_id,
            "message": "Tack! Nu kan du börja din resa.",
            "conversation": conversation,
            "isComplete": True
        }

    # Beräkna index för nästa fråga
    next_question_index = len(conversation) // 2
    next_question = QUESTIONS[next_question_index]

    # Lägg till nästa fråga i konversationen
    conversation.append({"role": "assistant", "message": next_question})

    # Returnera svaret
    return {
        "userId": user_id,
        "message": next_question,
        "conversation": conversation,
        "isComplete": False
    }


def analyze_conversation(conversation: List[Dict[str, str]], user_id: str) -> Dict:
    """
    Analyserar användarens svar och skapar en profil.

    :param conversation: Lista med konversationsmeddelanden.
    :param user_id: Användarens ID.
    :return: Ett dictionary med användarprofilen.
    """
    # Extrahera användarens svar (varannan meddelande är ett användarsvar)
    answers = [msg["message"] for msg in conversation if msg["role"] == "user"]

    # Skapa profil baserat på svaren
    return {
        "userId": user_id,
        "birthDate": answers[0],
        "focusArea": answers[1].lower(),
        "personality": "introvert" if "introvert" in answers[2].lower() else "extrovert",
        "workStyle": answers[3],
        "outlook": answers[4]
    }
```
