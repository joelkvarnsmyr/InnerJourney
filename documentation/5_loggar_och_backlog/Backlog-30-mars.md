# Backlog: InnerJourney Första Version/Prototyp (Status 30 Mars)

## 1. Beslut om Arkitektur och Verktyg

### Beskrivning
Vi valde `FastAPI` för backend på grund av dess snabbhet och enkelhet att bygga RESTful API:er. För frontend valdes `React` med `TypeScript` för att säkerställa typkontroll och underlätta skalbarhet. `Firebase` användes för autentisering (`Firebase Authentication`) och datalagring (`Firestore`), tack vare dess enkla integration med `Google Cloud`. `Google Cloud Run` valdes för hosting av backend och `Firebase Hosting` för frontend, för att möjliggöra automatisk skalning och smidig deployment.

### Motivering
Dessa verktyg erbjuder en bra balans mellan snabb utveckling och framtida skalbarhet. De är designade för att fungera väl tillsammans i ett ekosystem (`Google Cloud`, `Firebase`).

## 2. Förändring i Onboarding-process

### Beskrivning
Ursprungsplanen var en mer avancerad onboarding-process i flera steg, inklusive inmatning av födelsedata, telefonverifiering och GDPR-samtycke. För den första versionen/prototypen beslutade vi att förenkla detta till att endast inkludera grundläggande autentisering (inloggning och registrering via `Firebase Authentication`) samt ett formulär för att mata in födelsedata.

### Motivering
En förenklad onboarding möjliggör snabbare lansering av en fungerande prototyp. Detta gör att vi kan testa kärnfunktionaliteten och samla in värdefull användarfeedback tidigare. Mer avancerade funktioner, som telefonverifiering och detaljerat GDPR-samtycke, kan implementeras i senare iterationer baserat på behov och feedback.

## 3. Backend-utveckling

### Genomförda Punkter
*   **API-endpoint:** Skapade endpointen `/gemini/getActivation`. Den tar emot `mood` (humör) och `goal` (mål) som input, anropar `Google Gemini` för att generera ett personligt utvecklingssteg, och sparar resultatet i `Firestore`.
*   **Säkerhet:** Integrerade `Google Cloud Secret Manager` för säker hantering av API-nycklar (t.ex. för `Gemini`) och `Firebase`-autentiseringsuppgifter.
*   **Datalagring:** Använde `Firebase Firestore` för att lagra användardata (som födelsedata) och genererade reflektioner/utvecklingssteg.
*   **Autentisering:** Implementerade `Firebase Authentication` för att hantera användarregistrering och inloggning.
*   **Deployment:** Containeriserade backend-applikationen med en `Dockerfile`. Deployade containern till `Google Cloud Run` för att dra nytta av automatisk skalning och hanterad infrastruktur.

### Status
Backend-tjänsten är fullt fungerande och deployad till `Google Cloud Run`.

## 4. Frontend-utveckling

### Genomförda Punkter
*   **Grundläggande sidor:**
    *   Skapade `HomePage.tsx` som innehåller ett formulär för inmatning av födelsedata.
    *   Byggde `LoginPage.tsx` och `RegisterPage.tsx` för användarautentisering.
*   **Autentisering:** Integrerade `Firebase Authentication` för att hantera inloggning och registrering. Skapade `AuthContext.tsx` för att globalt hantera användarens autentiseringstillstånd i applikationen.
*   **Routing:** Satte upp grundläggande navigation mellan de olika sidorna med hjälp av biblioteket `react-router-dom`.
*   **Styling:** Använde komponentbiblioteket `Chakra UI` för att skapa ett enhetligt, responsivt och modernt gränssnitt.
*   **API-anrop:** Skapade en service-fil (`api.ts`) för att centralisera och hantera anrop till backend-API:et (implementationen av specifika anrop är ännu inte fullständig).

### Status
Frontend-applikationen har grundläggande funktionalitet för autentisering och inmatning av födelsedata. Den är redo för vidareutveckling och integration med fler backend-endpoints.

## 5. Git och Versionshantering

### Genomförda Punkter
*   **Repository:** Använder `Git`-repositoryt `https://github.com/joelkvarnsmyr/InnerJourney` för att hantera källkoden för både backend och frontend.
*   **Struktur:** Organiserade projektet i monorepo-stil med separata undermappar: `backend/` och `frontend/`.
*   **Konfiguration:** Satte upp en `.gitignore`-fil för att exkludera onödiga filer och mappar från versionshantering (t.ex. `node_modules/`, `venv/`, `.env`).
*   **Grenar:** Bytte namn på den lokala huvudgrenen från `master` till `main` för att följa modern praxis och matcha standardnamnet på `GitHub`.

### Status
`Git` är korrekt konfigurerat för projektet. Alla relevanta ändringar är versionshanterade och pushade till `GitHub`-repositoryt.

## 6. Deployment och Hosting

### Genomförda Punkter
*   **Backend:** Deployad på `Google Cloud Run`. Den publika URL:en är: `https://innerjourney-backend-975065734812.europe-west1.run.app`.
*   **Frontend:** Konfigurerade `Firebase Hosting` för deployment av frontend-applikationen. Detta inkluderade att sätta upp en `proxy rewrite` i `firebase.json` för att smidigt dirigera API-anrop (t.ex. till `/gemini/getActivation`) från frontend till backend-tjänsten på `Cloud Run`, vilket undviker CORS-problem. Körde kommandot `firebase init hosting` för att slutföra konfigurationen.

### Status
Backend är live och tillgänglig via sin `Cloud Run`-URL. Frontend är konfigurerad och redo att deployas till `Firebase Hosting`.

## 7. Nästa Steg

### Att Göra
*   Bygg och deploya den nuvarande versionen av frontend till `Firebase Hosting` genom att köra kommandona `npm run build` (i `frontend/`-mappen) följt av `firebase deploy --only hosting`.
*   Slutför implementationen av API-anrop i `frontend/src/api.ts` och integrera dessa med relevanta frontend-komponenter (t.ex., koppla anropet för att spara födelsedata till formuläret i `BirthdayInput.tsx` eller motsvarande komponent).
*   Planera och implementera ytterligare funktioner i nästa iteration, såsom:
    *   Telefonverifiering under onboarding.
    *   Sidor/komponenter för att visa sparade reflektioner eller astrologisk data hämtad från backend.