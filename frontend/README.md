# 🚀 InnerJourney Frontend: Setup, Utveckling och Deployment

## 📜 Översikt

Detta dokument beskriver processen för att sätta upp, utveckla och deploya frontend-delen av InnerJourney, en plattform för personlig utveckling. Frontend är byggd med `React` och `TypeScript`, och använder `Chakra UI` för komponenter och styling. Den kommunicerar med backend via API-anrop och hanterar användarautentisering med `Firebase Authentication`. Applikationen deployas på `Firebase Hosting` för enkel och global tillgänglighet.

Denna README guidar dig genom stegen för att köra frontend lokalt och hur du deployar den till `Firebase Hosting`.

## ✅ Förutsättningar

Innan du börjar, säkerställ att du har följande verktyg installerade på din dator:

*   💻 **Node.js:** Version 14 eller senare rekommenderas.
*   📦 **npm** eller **yarn:** Pakethanterare för Node.js (`npm` följer med Node.js).
*   🐙 **Git:** För versionshantering och kloning av projektet.
*   🔥 **Firebase CLI:** För att interagera med Firebase-tjänster och deploya till `Firebase Hosting`. Installeras via `npm install -g firebase-tools`.
*   ☁️ **Google Cloud SDK (`gcloud`):** Valfritt, men användbart om du vill hantera Firebase-projektet via kommandoraden.

## 🗂️ Projektstruktur

Frontend-koden återfinns i mappen `frontend/` inom projektets rotkatalog (`InnerJourney/`). Nedan följer en översikt över viktiga filer och mappar:

```text
frontend/
├── public/              # Statiska filer (t.ex. index.html, favicon)
├── src/                 # Källkoden för React-applikationen
│   ├── components/      # Återanvändbara UI-komponenter (t.ex. Button.tsx, ActivationCard.tsx)
│   ├── pages/           # Komponenter som representerar hela sidor/vyer (t.ex. HomePage.tsx, LoginPage.tsx)
│   ├── services/        # Logik för API-anrop och andra tjänster (t.ex. api.ts, firebase.ts)
│   ├── context/         # React Context för global state management (t.ex. AuthContext.tsx)
│   ├── App.tsx          # Applikationens huvudkomponent, hanterar routing
│   └── index.ts        # Ingångspunkt som renderar App-komponenten i DOM
├── .env                 # Lokala miljövariabler (ignoreras av Git)
├── package.json         # Projektets beroenden och npm-skript
├── tsconfig.json        # Konfiguration för TypeScript-kompilatorn
└── firebase.json        # Konfiguration för Firebase Hosting (inkl. rewrites)
```

## 🖥️ Sätta upp projektet lokalt

Följ dessa steg för att få igång frontend på din lokala utvecklingsmiljö:

### 1. Klona repot 📥

Öppna din terminal och klona projektet från GitHub. Navigera sedan in i `frontend`-mappen:

```bash
git clone git@github.com:joelkvarnsmyr/InnerJourney.git
cd InnerJourney/frontend
```

### 2. Installera beroenden 📦

Installera alla nödvändiga Node.js-paket som specificeras i `package.json`:

```bash
npm install
```

*eller om du använder `yarn`:*

```bash
yarn install
```

### 3. Konfigurera miljövariabler ⚙️

För att frontend ska kunna kommunicera med Firebase-tjänster behöver du konfigurera dina Firebase-projektuppgifter. Skapa en fil med namnet `.env` i `frontend/`-roten.

Kopiera innehållet nedan och ersätt platshållarna med dina faktiska Firebase-värden (dessa hittar du i ditt Firebase-projekts inställningar):

```text
# Firebase Configuration - Hämta från Firebase Console > Project Settings > General > Your apps > Web app
REACT_APP_FIREBASE_API_KEY="din-firebase-api-nyckel"
REACT_APP_FIREBASE_AUTH_DOMAIN="din-app.firebaseapp.com"
REACT_APP_FIREBASE_PROJECT_ID="din-projekt-id"
REACT_APP_FIREBASE_STORAGE_BUCKET="din-app.appspot.com"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="din-sender-id"
REACT_APP_FIREBASE_APP_ID="din-app-id"

# Valfritt: URL till backend (används om proxy inte täcker alla behov eller i produktion)
# REACT_APP_API_BASE_URL="http://localhost:8080" eller "https://din-backend-url.run.app"
```

**Viktigt:** Filen `.env` ska **inte** checkas in i Git. Se till att den finns i din `.gitignore`-fil. Du kan behöva starta om utvecklingsservern för att nya miljövariabler ska läsas in.

### 4. Kör frontend lokalt ▶️

Starta den lokala utvecklingsservern:

```bash
npm start
```

*eller om du använder `yarn`:*

```bash
yarn start
```

Applikationen bör nu vara tillgänglig i din webbläsare på `http://localhost:3000`. Servern uppdaterar automatiskt sidan när du gör ändringar i koden.

**Notera:** För att funktioner som kräver backend-kommunikation (t.ex. inloggning, hämtning av data) ska fungera, behöver du antingen ha backend-tjänsten igång lokalt (vanligtvis på `http://localhost:8080`) eller konfigurera frontend att anropa en deployad backend-URL (se `REACT_APP_API_BASE_URL` i `.env`).

## ☁️ Bygga och deploya till Firebase Hosting

När du är redo att publicera din frontend gör du följande:

### 1. Bygg projektet 🏗️

Kompilera och optimera din React-applikation för produktion:

```bash
npm run build
```

*eller om du använder `yarn`:*

```bash
yarn build
```

Detta kommando skapar en `build/`-mapp som innehåller alla statiska filer (HTML, CSS, JavaScript) redo för deployment.

### 2. Konfigurera Firebase Hosting 🔥

Om detta är första gången du deployar detta projekt till Firebase Hosting, behöver du initiera det. Kör följande kommandon i `frontend/`-mappen:

```bash
# Logga in på ditt Firebase-konto om du inte redan gjort det
firebase login

# Initiera hosting för projektet
firebase init hosting
```

Följ instruktionerna i terminalen:

1.  Välj ditt befintliga Firebase-projekt.
2.  Ange `build` som din publika katalog (den mapp som innehåller de byggda filerna).
3.  Svara **Ja** (`y`) på frågan om att konfigurera som en "single-page app". Detta är viktigt för att `React Router` ska fungera korrekt genom att alla sökvägar dirigeras till `index.html`.

Detta skapar eller uppdaterar filerna `firebase.json` och `.firebaserc`. Din `firebase.json` bör likna detta:

```json
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### 3. Deploya till Firebase Hosting 🚀

När konfigurationen är klar och projektet är byggt, deploya till Firebase Hosting:

```bash
firebase deploy --only hosting
```

Efter en lyckad deployment visas den publika URL:en där din applikation nu är live (t.ex. `https://ditt-projekt-id.web.app` eller en anpassad domän om du konfigurerat det).

## ↔️ Proxy och API-anrop

Under lokal utveckling uppstår ofta `CORS`-problem (Cross-Origin Resource Sharing) när frontend (som körs på `http://localhost:3000`) försöker anropa backend (som körs på `http://localhost:8080`).

För att hantera detta använder `create-react-app` en inbyggd proxyfunktion. Den konfigureras i filen `package.json`:

```json
{
  // ... andra inställningar
  "proxy": "http://localhost:8080"
}
```

Detta innebär att alla okända anrop från frontend (de som inte matchar statiska filer) automatiskt skickas vidare till `http://localhost:8080`. Du kan då göra API-anrop i din kod med relativa sökvägar, t.ex. `fetch('/api/users')` istället för `fetch('http://localhost:8080/api/users')`.

**Viktigt för produktion:** Denna `proxy`-inställning i `package.json` fungerar **endast** i den lokala utvecklingsmiljön (`npm start` / `yarn start`). När applikationen är deployad till `Firebase Hosting` måste frontend anropa den *faktiska*, deployade backend-URL:en. Detta hanteras oftast genom att använda en miljövariabel (t.ex. `REACT_APP_API_BASE_URL`) som sätts till den publika backend-URL:en i produktionsmiljön.

## 🔐 Autentisering

Frontend använder `Firebase Authentication` för att hantera användarregistrering och inloggning:

*   **Registrering & Inloggning:** Stöd för att skapa konto och logga in med e-post och lösenord (eller andra metoder som konfigureras i Firebase).
*   **Tokenhantering:**
    *   Efter lyckad inloggning skickar Firebase tillbaka ett `id_token` (JWT).
    *   Detta token bör sparas säkert (t.ex. via Firebase SDK:s inbyggda persistence eller i `sessionStorage`).
    *   För att komma åt skyddade backend-endpoints, måste detta `id_token` inkluderas i `Authorization`-headern för varje API-anrop: `Authorization: Bearer <id_token>`. Backend verifierar sedan detta token.
*   **Globalt tillstånd:** Information om den inloggade användaren (eller om ingen är inloggad) hanteras globalt i applikationen, typiskt med `React Context` (t.ex. en `AuthContext` som wrappar hela appen i `src/App.tsx` eller `src/index.ts`).

## 🐞 Felsökning

Här är några vanliga problem och deras lösningar:

### 1. CORS-fel 🚧

*   **Orsak (Lokalt):** `proxy`-inställningen i `package.json` är felaktig, saknas, eller utvecklingsservern har inte startats om efter ändring. Anrop görs med absolut URL till `http://localhost:8080` istället för relativ sökväg.
*   **Orsak (Produktion):** Backend-tjänsten (t.ex. Google Cloud Run) är inte konfigurerad att skicka korrekta CORS-headers som tillåter anrop från din frontend-domän (t.ex. `https://ditt-projekt-id.web.app`).
*   **Lösning (Lokalt):** Kontrollera `proxy`-inställningen i `package.json`. Starta om servern (`npm start` eller `yarn start`). Använd relativa sökvägar (t.ex. `/gemini/getActivation`) i API-anrop.
*   **Lösning (Produktion):** Konfigurera CORS på din backend. För `FastAPI` kan detta göras med `CORSMiddleware`. Se till att din frontend-URL finns med i listan över tillåtna origins.

### 2. Autentiseringsfel 🔑

*   **Orsak:** Felaktiga Firebase-konfigurationsvärden (`REACT_APP_FIREBASE_*`) i `.env`-filen. Firebase-appen i konsolen är inte korrekt konfigurerad (t.ex. felaktiga auktoriserade domäner). Utvecklingsservern har inte startats om efter ändringar i `.env`.
*   **Lösning:** Dubbelkolla alla Firebase-nycklar och ID:n i `.env` mot Firebase Console. Kontrollera att `localhost` är en auktoriserad domän under `Authentication > Settings > Authorized domains` i Firebase Console för lokal utveckling. Starta om utvecklingsservern (`npm start` eller `yarn start`).

### 3. Build-fel 🧱

*   **Orsak:** Syntaxfel i `TypeScript`- eller `JSX`-kod. Saknade paket (kör `npm install` eller `yarn install`). Felaktig `TypeScript`-konfiguration (`tsconfig.json`). Problem med någon specifik loader eller plugin i build-processen.
*   **Lösning:** Läs felmeddelandet noggrant i terminalen efter att ha kört `npm run build` (eller `yarn build`). Det brukar peka ut fil och radnummer. Åtgärda syntaxfel. Installera eventuella saknade paket. Granska `tsconfig.json` om felet är relaterat till TypeScript-typer eller konfiguration.

## 🌟 Nästa steg

*   Implementera återstående sidor och komponenter enligt designspecifikationerna (t.ex. profilsida, övningsvyer, journal).
*   Utveckla enhetstester för komponenter och tjänster med `Jest` och `React Testing Library`.
*   Förbättra UI/UX med animationer, laddningsindikatorer och robust felhantering.
*   Optimera prestanda genom koddelning (code splitting), lazy loading av komponenter och optimering av bilder.

## 📬 Kontakt

Om du har frågor, hittar buggar, har förslag på förbättringar eller vill bidra till projektet, vänligen skapa ett issue i projektets GitHub-repository: `joelkvarnsmyr/InnerJourney`.