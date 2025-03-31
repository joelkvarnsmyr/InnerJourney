# InnerJourney

InnerJourney är en plattform för personlig utveckling som blandar praktiska övningar, reflektion och social interaktion för att stötta användare i att växa och tackla vardagens utmaningar. Plattformen är byggd med `FastAPI` (backend) och `React` (frontend), och är hostad på `Google Cloud Run` samt `Firebase Hosting`.

## 🛠️ Installation

Följ stegen nedan för att sätta upp och köra projektet lokalt.

### Backend

1.  **Klona repositoryt:**
    ```bash
    git clone https://github.com/joelkvarnsmyr/InnerJourney.git
    ```

2.  **Navigera till backend-mappen:**
    ```bash
    cd InnerJourney/backend
    ```

3.  **Installera beroenden:**
    Se till att du har Python och pip installerat. Installera sedan projektets Python-paket från `requirements.txt`:
    ```bash
    pip install -r requirements.txt
    ```

4.  **Starta servern:**
    Kör FastAPI-applikationen med `uvicorn`. `--reload`-flaggan startar om servern automatiskt vid kodändringar.
    ```bash
    uvicorn main:app --reload
    ```
    Servern är nu tillgänglig på `http://localhost:8000` (eller den port `uvicorn` anger).

### Frontend

1.  **Navigera till frontend-mappen:**
    ```bash
    cd InnerJourney/frontend
    ```
    *(Observera: Se till att du är i rätt mapp från projektets rot)*

2.  **Installera beroenden:**
    Se till att du har Node.js och npm (eller Yarn) installerat. Installera projektets JavaScript-paket:
    ```bash
    npm install
    ```

3.  **Kör applikationen:**
    Starta React-utvecklingsservern:
    ```bash
    npm start
    ```
    Applikationen är nu tillgänglig i din webbläsare på `http://localhost:3000`.

## 🚀 Användning

### Backend

Du kan testa backend-API:et direkt med verktyg som `curl`. Här är ett exempel på hur du anropar endpointen `/gemini/getActivation`:

```bash
curl -X POST "http://localhost:8000/gemini/getActivation" \
-H "Content-Type: application/json" \
-d '{"mood": 3, "goal": "find focus"}'
```

### Frontend

Öppna din webbläsare och navigera till `http://localhost:3000` för att interagera med InnerJourneys gränssnitt.

## 📚 Dokumentation

All detaljerad teknisk dokumentation, arkitekturbeskrivningar och ytterligare projektinformation finns samlad i mappen `/documentation`.

## 🤝 Bidrag

Vill du hjälpa till att förbättra InnerJourney? Skapa en *issue* för att rapportera buggar eller föreslå nya funktioner, eller skicka in en *pull request* med dina ändringar på GitHub. Alla bidrag är varmt välkomna!

## 📝 Licens

Projektet är licensierat under .

## 📧 Kontakt

Har du frågor eller funderingar kring projektet? Du kan nå mig (projektansvarig) via GitHub.