Sammanfattning av backend-sättning för InnerJourney
Detta dokument beskriver processen för att sätta upp, utveckla och deploya backend för innerjourney. Backend är byggd med FastAPI (Python), integrerad med Firebase (Firestore) för datalagring och Google Cloud Secret Manager för säker hantering av API-nycklar. Applikationen är containeriserad med Docker och deployad till Google Cloud Run.

1. Lokalmiljö
   1.1 Installera nödvändiga verktyg
   För att sätta upp en fungerande lokalmiljö behöver du följande verktyg:

Python 3.10: Installera denna version för kompatibilitet med projektets beroenden.
Virtualenv: Skapa en virtuell miljö för att isolera projektets paket:
bash

Collapse

Wrap

Copy
python3.10 -m venv venv
source venv/bin/activate  # På Windows: venv\Scripts\activate
Git: För versionshantering.
Docker: För att containerisera applikationen.
Google Cloud SDK (gcloud): För att hantera Google Cloud-tjänster lokalt.
1.2 Klona projektet från GitHub
Klona repot till din lokala maskin:
bash

Collapse

Wrap

Copy
git clone git@github.com:joelkvarnsmyr/InnerJourney.git
cd InnerJourney
1.3 Installera projektets beroenden
Installera Python-paketen som anges i requirements.txt:
bash

Collapse

Wrap

Copy
pip install -r requirements.txt
1.4 Konfigurera lokala miljövariabler
Skapa en .env-fil i projektets rotmapp för att lagra känsliga uppgifter:
text

Collapse

Wrap

Copy
GEMINI_API_KEY="din-gemini-api-nyckel"
FIREBASE_CREDENTIALS_PATH="~/.secrets/api-keys.json"
Placera din Firebase service account JSON-fil i ~/.secrets/api-keys.json.
1.5 Starta servern lokalt
Starta FastAPI-servern med Uvicorn:
bash

Collapse

Wrap

Copy
uvicorn backend.main:app --host 0.0.0.0 --port 8080 --reload
Testa en endpoint lokalt:
bash

Collapse

Wrap

Copy
curl -X POST "http://localhost:8080/gemini/getActivation" \
-H "Content-Type: application/json" \
-d '{"mood": 2, "goal": "komma igång"}'
2. Git och versionshantering
   Git-repository: Projektet finns på GitHub: git@github.com:joelkvarnsmyr/InnerJourney.git.
   Branch-strategi: Använd main-branchen för stabil kod och skapa feature-branches för nya funktioner.
   Commit-rutiner: Committa regelbundet med tydliga meddelanden, t.ex. "Add gemini router to main.py".
   Ignorera känsliga filer: Se till att .env, venv/ och ~/.secrets/ finns i .gitignore.
3. Firebase-integration
   Firestore: Används som databas för att lagra aktiveringar.
   Firebase Admin SDK: Initieras med service account-uppgifter från Google Cloud Secret Manager.
   Kodexempel (från firebase_service.py):
   python

Collapse

Wrap

Copy
from google.cloud import secretmanager
import json
import firebase_admin
from firebase_admin import credentials, firestore

def get_secret(secret_name):
client = secretmanager.SecretManagerServiceClient()
secret_version = f"projects/innerjourney-c007e/secrets/{secret_name}/versions/latest"
response = client.access_secret_version(name=secret_version)
return response.payload.data.decode("UTF-8")

firebase_credentials_json = get_secret("firebase-credentials")
cred = credentials.Certificate(json.loads(firebase_credentials_json))
firebase_admin.initialize_app(cred)
db = firestore.client()

def save_to_firestore(collection, doc_id, data):
db.collection(collection).document(doc_id).set(data)
4. Deployment till Google Cloud Run
   4.1 Förberedelser
   Google Cloud-projekt: Projektet innerjourney-c007e är konfigurerat i Google Cloud.
   Aktivera API:er: Aktivera Secret Manager API och Artifact Registry API i projektet.
   4.2 Bygg och pusha Docker-image
   Dockerfile: Definierar hur applikationen containeriseras:
   dockerfile

Collapse

Wrap

Copy
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8080"]
Bygg och pusha imagen:
bash

Collapse

Wrap

Copy
docker build -t gcr.io/innerjourney-c007e/innerjourney-backend .
docker push gcr.io/innerjourney-c007e/innerjourney-backend
4.3 Deploya till Cloud Run
Deploy-kommando:
bash

Collapse

Wrap

Copy
gcloud run deploy innerjourney-backend \
--image gcr.io/innerjourney-c007e/innerjourney-backend \
--platform managed \
--region europe-west1 \
--allow-unauthenticated
Service-URL: Efter deployment får du en URL, t.ex. https://innerjourney-backend-975065734812.europe-west1.run.app.
4.4 Hantera hemligheter
Secret Manager: Nycklar lagras under namnen firebase-credentials och gemini-api-key.
Behörigheter: Cloud Run-tjänstens servicekonto (t.ex. 975065734812-compute@developer.gserviceaccount.com) har rollen Secret Manager Secret Accessor.
5. Felsökning och vanliga problem
   404 Not Found:
   Orsak: Routern är inte korrekt importerad i main.py.
   Lösning: Kontrollera att app.include_router(gemini.router) finns i main.py.
   PermissionDenied vid åtkomst till Secret Manager:
   Orsak: Servicekontot saknar behörighet.
   Lösning: Ge servicekontot rollen Secret Manager Secret Accessor.
   Container failed to start:
   Orsak: Applikationen kraschar vid start p.g.a. saknade beroenden eller kodfel.
   Lösning: Kontrollera loggarna i Cloud Run och testa lokalt med Docker.