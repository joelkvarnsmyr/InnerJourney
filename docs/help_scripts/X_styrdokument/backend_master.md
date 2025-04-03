# InnerJourney Backend: README 🚀

## Översikt 📜

Detta dokument beskriver backend-delen av **InnerJourney**, en plattform för personlig utveckling. Backend är byggd med `FastAPI` (Python 🐍) och integrerar med Firebase `Firestore` 🔥 för datalagring samt Google `Gemini` 🤖 för AI-genererade insikter.

Applikationen är containeriserad med `Docker` 🐳 och deployad på Google `Cloud Run` ☁️ för att säkerställa skalbarhet och enkel hantering. Vi använder Google `Cloud Build` 🔧 för att automatiskt bygga och distribuera backend vid ändringar i `Git`-repositoryt 📦. Denna README guidar dig genom uppsättning, lokal testning med `gcloud`-autentisering, och deployment till Google Cloud Run. Den innehåller även en API-beskrivning avsedd för frontend-utvecklare.

## Förutsättningar ✅

Innan du börjar, säkerställ att du har följande verktyg installerade:

*   🐍 **Python 3.10:** Krävs för att köra backend lokalt utan Docker.
*   🌐 **Git:** För versionshantering och kloning av projektet.
*   🐳 **Docker:** För att bygga och köra backend i en container.
*   ☁️ **Google Cloud SDK (`gcloud`):** För autentisering, lokal testning och deployment till Google Cloud Run.
*   📦 **Node.js och npm (valfritt):** Användbart om du vill köra frontend parallellt för att testa hela applikationen.
*   🔥 **Firebase-projekt:** Ett konfigurerat projekt med `Firestore` och `Authentication` aktiverat.
*   🌍 **Google Cloud-projekt:** Ett GCP-projekt (t.ex. `innerjourney-c007e`) med API:er för `Cloud Run`, `Cloud Build`, och `Secret Manager` aktiverade.

## Projektstruktur 🗂️

Backend-koden finns i `backend/`-mappen i projektets rot (`InnerJourney/`). Nedan följer en översikt över viktiga filer och mappar:

```text
backend/
├── models/              # 📋 Pydantic-modeller för datavalidering (t.ex. activation.py)
├── routes/              # 🛤️ API-routes/endpoints (t.ex. gemini.py)
├── services/            # 🛠️ Tjänster för affärslogik (t.ex. gemini_service.py, firebase_service.py)
├── __init__.py          # 📦 Gör mappen till ett Python-paket
├── main.py              # 🏁 Huvudfil för FastAPI-applikationen
├── requirements.txt     # 📜 Lista över Python-beroenden
├── Dockerfile           # 🐳 Instruktioner för att bygga Docker-containern
└── cloudbuild.yaml      # 🔧 Konfiguration för Google Cloud Build
```

## Sätta upp och testa lokalt med `gcloud`-autentisering 🖥️

Följ dessa steg för att köra och testa backend lokalt, med autentisering mot Google Cloud-tjänster som `Secret Manager`:

### 1. Klona repot 📥

Klona projektet från GitHub och navigera till `backend/`-mappen:

```bash
git clone git@github.com:joelkvarnsmyr/InnerJourney.git
cd InnerJourney/backend
```

### 2. Autentisera med `gcloud` 🔐

Logga in med `gcloud` för att skapa Application Default Credentials (ADC). Dessa används av containern för att autentisera mot Google Cloud-tjänster:

```bash
gcloud auth application-default login
```

### 3. Bygg Docker-imagen 🛠️

Bygg Docker-imagen från `backend/`-mappen:

```bash
docker build -t innerjourney-backend .
```

*   `-t innerjourney-backend`: Namnger (taggar) Docker-imagen som `innerjourney-backend`.

### 4. Kör containern med `gcloud`-autentisering 🚀

Kör containern och montera din lokala `gcloud`-konfiguration för att möjliggöra autentisering inifrån containern:

```bash
docker run -p 8080:8080 -e PORT=8080 \
-v $HOME/.config/gcloud:/root/.config/gcloud \
innerjourney-backend
```

*   🌐 `-p 8080:8080`: Mappar port `8080` på din lokala maskin till port `8080` i containern.
*   🔧 `-e PORT=8080`: Sätter miljövariabeln `PORT` inuti containern, vilken används av `main.py`.
*   📂 `-v $HOME/.config/gcloud:/root/.config/gcloud`: Monterar din lokala `gcloud`-konfigurationsmapp till containerns förväntade plats, vilket ger åtkomst till dina ADC.

API:et är nu tillgängligt lokalt på `http://localhost:8080`. Du kan testa en endpoint med `curl`:

```bash
curl -X POST "http://localhost:8080/gemini/getActivation" \
-H "Content-Type: application/json" \
-d '{"mood": 2, "goal": "komma igång"}'
```

## Deploya till Google Cloud Run med Git och Cloud Build 🌐

Vi använder `Cloud Build` för att automatisera byggnation och deployment till `Cloud Run` varje gång ändringar pushas till `main`-grenen på GitHub.

### 1. Committa och pusha ändringar till GitHub 📤

Verifiera dina ändringar, lägg till dem och committa:

```bash
git status
git add .
git commit -m "Beskriv dina ändringar här"
```

Pusha sedan ändringarna till `main`-grenen på GitHub:

```bash
git push origin main
```

Detta steg triggar automatiskt en `Cloud Build`-process som bygger en ny Docker-image och deployar den till `Cloud Run`.

### 2. Följ byggprocessen i Cloud Build 🛠️

*   Navigera till **Cloud Build > Build history** i Google Cloud Console för ditt projekt.
*   Övervaka byggloggarna för att säkerställa att processen slutförs utan fel.

### 3. Testa i produktion ✅

När deploymenten är klar kan du testa den deployade tjänstens endpoint. Ersätt URL:en nedan med din faktiska `Cloud Run`-tjänsts URL:

```bash
curl -X POST "https://innerjourney-backend-975065734812.europe-west1.run.app/gemini/getActivation" \
-H "Content-Type: application/json" \
-d '{"mood": 2, "goal": "komma igång"}'
```

## API-dokumentation för frontend-utvecklare 📚

### Endpoint: `/gemini/getActivation`

Denna endpoint genererar en personlig "aktivering" (övning) baserat på användarens angivna humör och mål. Aktiveringen sparas i `Firestore` och returneras sedan till frontend.

*   **Metod:** `POST`
*   **URL:** `/gemini/getActivation`

### Request Body

Förväntar sig ett JSON-objekt med följande struktur:

```json
{
  "mood": integer, // (1-5)
  "goal": string
}
```

*   `mood`: Användarens humör på en skala från 1 (lågt) till 5 (högt).
*   `goal`: En textsträng som beskriver användarens mål (t.ex. `"bli mer fokuserad"`, `"komma igång"`).

### Response

Returnerar ett JSON-objekt med aktiveringens detaljer:

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
  "questions": list[string],
  "ai_assessment": boolean,
  "coach_approval_required": boolean,
  "net_enabled": boolean,
  "introduction_message": string,
  "preparation_message": string,
  "activation_id": string,
  "source": string
}
```

### Exempel på svar

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

### Felhantering

*   `400 Bad Request`: Returneras om `mood` eller `goal` saknas i request body, eller om värdena är ogiltiga.
*   `500 Internal Server Error`: Returneras vid interna serverfel, t.ex. om Gemini-svaret inte kan parsas korrekt eller om obligatoriska fält saknas i det genererade svaret.

## Säkerhet och hemligheter 🔒

*   🔑 **API-nycklar:** Känsliga nycklar och konfigurationer lagras säkert i Google `Cloud Secret Manager`. De primära hemligheterna är:
    *   `firebase-credentials`: Innehåller Firebase service account JSON-nyckeln.
    *   `gemini-api-key`: API-nyckeln för Google Gemini.
*   🛡️ **Behörigheter:** `Cloud Run`-tjänstens servicekonto (format: `[PROJECT_NUMBER]-compute@developer.gserviceaccount.com`) måste ha IAM-rollen `Secret Manager Secret Accessor`. Detta konfigureras under **IAM & Admin > IAM** i Google Cloud Console.

## Felsökning 🐞

Här är några vanliga problem och deras lösningar:

### 1. `404 Not Found`

*   **Orsak:** En specifik API-endpoint (route) kan inte hittas av `FastAPI`. Ofta beror detta på att routern inte har importerats och registrerats korrekt i `backend/main.py`.
*   **Lösning:** Verifiera att raden `app.include_router(your_router_name.router, prefix="/your_prefix")` finns i `main.py` för den relevanta routern (t.ex. `app.include_router(gemini.router, prefix="/gemini")`).

### 2. `PermissionDenied` vid åtkomst till Secret Manager

*   **Orsak:** `Cloud Run`-tjänstens servicekonto saknar nödvändiga IAM-behörigheter för att läsa hemligheter från `Secret Manager`.
*   **Lösning:** Gå till **IAM & Admin > IAM** i Google Cloud Console och tilldela rollen `Secret Manager Secret Accessor` till servicekontot (`[PROJECT_NUMBER]-compute@developer.gserviceaccount.com`).

### 3. Container kraschar vid start

*   **Orsak:** Applikationen misslyckas med att starta inuti containern. Detta kan bero på:
    *   Syntaxfel i Python-koden.
    *   Saknade beroenden (fel i `requirements.txt` eller `Dockerfile`).
    *   Konfigurationsfel (t.ex. problem med att läsa miljövariabler eller hämta hemligheter).
*   **Lösning:**
    1.  Kontrollera loggarna för `Cloud Run`-tjänsten i Google Cloud Console för detaljerade felmeddelanden.
    2.  Försök bygga och köra containern lokalt med `docker build .` och `docker run ...` (se steg 3 & 4 ovan) för att replikera och felsöka problemet i en kontrollerad miljö.

## Nästa steg 🌟

*   📈 **Utöka API:et:** Lägg till fler endpoints, t.ex. för telefonverifiering, användarprofilhantering eller loggning av reflektioner.
*   🧪 **Implementera tester:** Skriv enhetstester med `pytest` för att säkerställa kodkvalitet och funktionalitet.
*   🔐 **Förbättra säkerheten:** Överväg att ta bort flaggan `--allow-unauthenticated` vid deployment till `Cloud Run` och implementera autentisering (t.ex. validering av Firebase `id_token` eller API-nyckel) för att skydda dina endpoints.

## Kontakt 📬

För frågor, förslag eller om du vill bidra till projektet, vänligen skapa ett issue i GitHub-repositoryt: `joelkvarnsmyr/InnerJourney`.