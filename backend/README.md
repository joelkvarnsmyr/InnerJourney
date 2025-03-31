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