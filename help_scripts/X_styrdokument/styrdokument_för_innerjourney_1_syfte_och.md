# 📜 Styrdokument

## 🎯 1. Syfte och vision

-   **Syfte:** InnerJourney är en plattform för personlig utveckling som kombinerar astrologi och AI-interaktion för att hjälpa användare att reflektera över sina liv och växa som individer.
-   **Vision:** Att bli en ledande digital plattform för självreflektion och personlig tillväxt, tillgänglig för användare globalt, med en intuitiv och säker upplevelse.

## 🏗️ 2. Arkitekturöversikt

### 🐍 Backend

-   **Ramverk:** `FastAPI` (Python) för snabb och effektiv API-utveckling.
-   **Datalagring:** Firebase `Firestore` för flexibel och skalbar NoSQL-databas.
-   **Hosting:** Google `Cloud Run` för automatisk skalning och containerbaserad deployment.
-   **Säkerhet:** Google `Cloud Secret Manager` för hantering av API-nycklar och andra hemligheter.

### ⚛️ Frontend

-   **Ramverk:** `React` med `TypeScript` för robust och typad kod.
-   **Styling:** `Chakra UI` för ett enhetligt och användarvänligt gränssnitt.
-   **Autentisering:** `Firebase Authentication` för säker inloggning.
-   **Hosting:** `Firebase Hosting` för enkel och snabb deployment.

### 🌐 Kommunikation

-   API-anrop sker via HTTPS, med en `proxy rewrite` i `Firebase Hosting` för att hantera API-förfrågningar och undvika CORS-problem.

## 🛠️ 3. Utvecklingsmiljö och verktyg

-   **Versionshantering:** `Git` med `GitHub` som plattform. `main`-branch används för stabil kod, och `feature`-branches skapas för nya funktioner.
-   **IDE:** `VSCode` eller `PyCharm` för backend, `WebStorm` eller `VSCode` för frontend.
-   **Kodkvalitet:**
    -   **Frontend:** `ESLint` och `Prettier` för kodformatering och linting.
    -   **Backend:** `Flake8` och `Black` för att säkerställa konsekvent kodstil.
-   **CI/CD:** `GitHub Actions` för automatiserad testning och deployment vid varje push eller pull request.

## 🧩 4. Modulär design och skalbarhet

### 🐍 Backend

-   **API-design:** `RESTful` endpoints, t.ex. `/init-birthdata` för att spara födelsedata och `/astro-data` för att hämta astrologisk information.
-   **Tjänster:** Separera logik i moduler, t.ex. `gemini_service.py` för AI-integration och `firebase_service.py` för databasinteraktion.
-   **Framtida integrationer:** Förbered för `Dialogflow` (chatbot) och `ElevenLabs` (röstgenerering).

### ⚛️ Frontend

-   **Navigering:** `React Router` för smidig sidnavigering.
-   **Komponenter:** Återanvändbara komponenter som `ActivationForm.tsx` och `AstroResults.tsx`.
-   **State management:** `React Context` eller `Redux` för global tillståndshantering.

## 🔒 5. Säkerhet

-   **Autentisering:** `Firebase Authentication` med e-post/lösenord, med planerad utökning till telefonverifiering.
-   **API-säkerhet:** Validering av `id_token` i backend för att säkerställa att anrop kommer från autentiserade användare.
-   **Datahantering:** Kryptering av känslig data i `Firestore` och användning av `Secret Manager` för API-nycklar.
-   **GDPR:** Samtyckesformulär för användare och hantering av personuppgifter enligt gällande lagkrav.

## ✅ 6. Testning och kvalitetssäkring

-   **Enhetstester:**
    -   **Backend:** `pytest` för att testa API-logik och tjänster.
    -   **Frontend:** `Jest` och `React Testing Library` för komponenttester.
-   **Integrationstester:** Testa API-anrop och autentiseringsflöden end-to-end.
-   **Automatisering:** Kör tester automatiskt i `CI/CD`-pipelinen vid varje kodändring.

## 🚀 7. Deployment och underhåll

### ☁️ Deployment

-   **Backend:** Google `Cloud Run` med automatisk skalning baserat på trafik.
-   **Frontend:** `Firebase Hosting` med `proxy rewrite` för API-anrop.

### 👀 Övervakning

-   Google `Cloud Logging` för att spåra fel och prestanda.
-   `Firebase Analytics` för att analysera användarbeteende.

### 🔧 Underhåll

-   Regelbundna uppdateringar av beroenden och säkerhetspatchar.
-   Planerade granskningar av kodbasen för att säkerställa långsiktig hållbarhet.

## 📚 8. Dokumentation och onboarding

-   **Teknisk dokumentation:** En `README.md` och en `/docs`-mapp med installationsinstruktioner, arkitekturöversikt och API-dokumentation.
-   **Onboarding-guide:** Steg-för-steg-instruktioner för nya utvecklare, inklusive hur man sätter upp miljön och kör projektet lokalt.