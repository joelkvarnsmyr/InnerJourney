Detaljerad Beskrivning av InnerJourney Backend
Backend för InnerJourney är en API-tjänst byggd med FastAPI i Python. Den är designad för att stödja en plattform för personlig utveckling genom att hantera API-anrop från frontend, integrera med Firebase Firestore för datalagring och använda Google Gemini för AI-genererade insikter. Backend är containeriserad med Docker och deployad på Google Cloud Run för skalbarhet och enkel hantering.

Nedan går jag igenom kodbasen fil för fil, dess syfte och hur allt hänger ihop.

1. Översikt över Kodbasen
   Kodbasen består av följande filer:

main.py: Startar FastAPI-applikationen och kopplar in Gemini-routern.
gemini_service.py: Hanterar interaktionen med Google Gemini för att generera personliga utvecklingssteg.
firebase_service.py: Hanterar datalagring i Firebase Firestore (saknar kod i din förfrågan, men antas finnas).
gemini.py: Definierar API-endpoints för Gemini, t.ex. /gemini/getActivation.
activation.py: Innehåller Pydantic-modeller för datavalidering och serialisering.
Dockerfile: Beskriver hur Docker-containern byggs.
requirements.txt: Listar alla Python-beroenden.
2. Fil-för-fil Beskrivning
   2.1 main.py
   Syfte: Huvudfilen som startar FastAPI-servern och sätter upp grundläggande endpoints.
   Innehåll:
   Importerar FastAPI, uvicorn och Gemini-routern från backend.routes.gemini.
   Skapar en FastAPI-instans (app) och inkluderar Gemini-routern med app.include_router(gemini.router).
   Definierar en enkel rot-endpoint (GET /) som returnerar {"message": "Welcome to InnerJourney Backend"}.
   Hämtar porten från miljövariabeln PORT (default 8080) och startar servern med uvicorn på host="0.0.0.0".
   Viktigt: host="0.0.0.0" gör att servern är tillgänglig externt, vilket krävs i containeriserade miljöer som Cloud Run.
   2.2 gemini_service.py
   Syfte: Ansvarar för att kommunicera med Google Gemini och generera personliga utvecklingssteg.
   Innehåll:
   Importerar bibliotek som google.cloud.secretmanager och google.generativeai.
   Sätter upp loggning med logging för att spåra operationer och fel.
   Funktion get_secret hämtar hemligheter (t.ex. Gemini API-nyckel) från Google Cloud Secret Manager.
   Konfigurerar genai med API-nyckeln och initierar en GenerativeModel ("gemini-1.5-pro-latest").
   Funktion generate_activation tar mood (int) och goal (str), genererar en prompt och returnerar ett JSON-formaterat svar från Gemini.
   Felhantering: Om Gemini-anropet misslyckas returneras ett mockat svar, t.ex. {"title": "Mock Step", "description": "This is a mock step..."}.
   2.3 firebase_service.py
   Syfte: Hanterar interaktion med Firebase Firestore (t.ex. spara och hämta data).
   Innehåll: (Saknas i din kod, men antas baserat på imports i gemini.py)
   Förväntas inkludera funktioner som save_to_firestore för att lagra data i Firestore.
   Initierar Firebase Admin SDK med autentiseringsuppgifter från Secret Manager.
   Säkerhet: Använder Secret Manager för att hantera känsliga autentiseringsuppgifter.
   2.4 gemini.py
   Syfte: Definierar API-endpoints för Gemini-relaterade förfrågningar.
   Innehåll:
   Skapar en APIRouter med prefixet /gemini.
   Endpoint POST /gemini/getActivation tar emot en ActivationRequest (validerad med Pydantic), anropar generate_activation, parsar svaret till JSON, och sparar det i Firestore med save_to_firestore.
   Returnerar ett ActivationResponse-objekt med title, description och activation_id.
   Felhantering: Hanterar JSON-parsningsfel och andra undantag med loggning och meningsfulla felmeddelanden.
   2.5 activation.py
   Syfte: Definierar datamodeller för API-förfrågningar och svar.
   Innehåll:
   ActivationRequest: Validerar inkommande data med fälten mood (int) och goal (str).
   ActivationResponse: Serialiserar utgående data med title (str), description (str) och activation_id (str).
   2.6 Dockerfile
   Syfte: Beskriver hur Docker-containern för backend byggs och körs.
   Innehåll:
   Baseras på python:3.10-slim.
   Sätter arbetsmappen till /app.
   Kopierar requirements.txt, installerar beroenden med pip, och kopierar resten av koden.
   Exponerar port 8080 och kör uvicorn backend.main:app --host 0.0.0.0 --port 8080.
   2.7 requirements.txt
   Syfte: Listar alla Python-beroenden.
   Viktiga paket:
   fastapi, uvicorn: För API och server.
   google-generativeai, google-cloud-secret-manager: För Gemini och hemligheter.
   firebase-admin: För Firestore.
   pydantic: För datavalidering.
3. Hur man testar lokalt
   Följ dessa steg för att testa backend lokalt:

Klona projektet:
bash


git clone git@github.com:joelkvarnsmyr/InnerJourney.git
cd InnerJourney/backend
Skapa en virtuell miljö:
bash


python3.10 -m venv venv
source venv/bin/activate  # På Windows: venv\Scripts\activate
Installera beroenden:
bash

pip install -r requirements.txt
Konfigurera miljövariabler:
Skapa en .env-fil med t.ex. GOOGLE_APPLICATION_CREDENTIALS och Gemini API-nyckel.
Starta servern:
bash


uvicorn backend.main:app --host 0.0.0.0 --port 8080 --reload
Testa API:
Använd curl eller Postman:
bash


curl -X POST "http://localhost:8080/gemini/getActivation" \
-H "Content-Type: application/json" \
-d '{"mood": 2, "goal": "komma igång"}'
4. Hur man bygger och kör containern med Docker
   Bygg Docker-imagen:
   bash


docker build -t innerjourney-backend .
Kör containern:
bash


docker run -p 8080:8080 -e PORT=8080 innerjourney-backend
Testa API:
Som ovan, t.ex. med curl mot http://localhost:8080.
5. Hur man deployar till Google Cloud Run
   Autentisera med Google Cloud:
   bash


gcloud auth login
gcloud config set project innerjourney-c007e
Bygg och pusha till Google Container Registry (GCR):
bash


docker build -t gcr.io/innerjourney-c007e/innerjourney-backend .
docker push gcr.io/innerjourney-c007e/innerjourney-backend
Deploya till Cloud Run:
bash


gcloud run deploy innerjourney-backend \
--image gcr.io/innerjourney-c007e/innerjourney-backend \
--platform managed \
--region europe-west1 \
--allow-unauthenticated
Testa den deployade tjänsten:
Använd URL:en från Cloud Run, t.ex.:
bash


curl -X POST "https://innerjourney-backend-xxxxxxxxxx-ew.a.run.app/gemini/getActivation" \
-H "Content-Type: application/json" \
-d '{"mood": 2, "goal": "komma igång"}'
6. Ytterligare Kommentarer
   Säkerhet: Hemligheter hanteras via Google Cloud Secret Manager.
   Felhantering: Loggning och fallbacks är implementerade för robusthet.
   Saknad kod: firebase_service.py saknas i din förfrågan men antas innehålla Firestore-logik.