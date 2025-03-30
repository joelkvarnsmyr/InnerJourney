# InnerJourney Frontend: Setup, Utveckling och Deployment

## Översikt

Detta är frontend-delen av InnerJourney, en plattform för personlig utveckling. Frontend är byggd med `React` och `TypeScript`, och använder `Chakra UI` för styling. Den kommunicerar med backend via API-anrop och hanterar autentisering med `Firebase Authentication`. Applikationen deployas på `Firebase Hosting` för enkel och snabb åtkomst.

Denna README beskriver hur du sätter upp, kör och deployar frontend både lokalt och på `Firebase Hosting`.

## Förutsättningar

Innan du börjar, se till att följande verktyg är installerade:

*   **Node.js** (version 14 eller senare): För att köra och bygga frontend.
*   **npm** eller **yarn**: För att hantera paket och skript.
*   **Git**: För att klona och hantera projektet.
*   **Firebase CLI**: För att deploya till `Firebase Hosting`.
*   **Google Cloud SDK (gcloud)** (valfritt): Om du vill hantera Firebase-projektet via CLI.

## Projektstruktur

Frontend-koden finns i mappen `frontend/` i projektets rot (`InnerJourney/`). Här är en översikt över viktiga filer och mappar:

```text
frontend/
├── public/              # Statiska filer (t.ex. index.html)
├── src/                 # Källkod
│   ├── components/      # Återanvändbara React-komponenter
│   ├── pages/           # Sidkomponenter (t.ex. HomePage.tsx, LoginPage.tsx)
│   ├── services/        # API-anrop och tjänster (t.ex. api.ts)
│   ├── context/         # React Context (t.ex. AuthContext.tsx)
│   ├── App.tsx          # Huvudkomponent
│   └── index.tsx        # Entrypunkt
├── .env                 # Miljövariabler (t.ex. Firebase-konfiguration)
├── package.json         # Projektberoenden och skript
├── tsconfig.json        # TypeScript-konfiguration
└── firebase.json        # Firebase Hosting-konfiguration
```

## Sätta upp projektet lokalt

### 1. Klona repot

Klona projektet från GitHub och navigera till `frontend/`-mappen:

```bash
git clone git@github.com:joelkvarnsmyr/InnerJourney.git
cd InnerJourney/frontend
```

### 2. Installera beroenden

Installera alla Node.js-paket som anges i `package.json`:

```bash
npm install
# eller
# yarn install
```

### 3. Konfigurera miljövariabler

Skapa en `.env`-fil i `frontend/`-mappen med Firebase-konfigurationen. Du kan använda följande mall och fylla i dina egna värden från ditt Firebase-projekt:

```text
REACT_APP_FIREBASE_API_KEY="din-firebase-api-nyckel"
REACT_APP_FIREBASE_AUTH_DOMAIN="din-app.firebaseapp.com"
REACT_APP_FIREBASE_PROJECT_ID="din-projekt-id"
REACT_APP_FIREBASE_STORAGE_BUCKET="din-app.appspot.com"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="din-sender-id"
REACT_APP_FIREBASE_APP_ID="din-app-id"
```

**Notera:** Dessa variabler behövs för att koppla frontend till Firebase-tjänster som `Firebase Authentication`.

### 4. Kör frontend lokalt

Starta utvecklingsservern:

```bash
npm start
# eller
# yarn start
```

Servern körs normalt på `http://localhost:3000` och laddar om automatiskt vid kodändringar.
Se till att backend-tjänsten körs lokalt (vanligtvis på `http://localhost:8080`) eller att du har konfigurerat frontend att anropa en deployad backend-URL.

## Bygga och deploya till Firebase Hosting

### 1. Bygg projektet

Skapa en optimerad produktionsversion av frontend:

```bash
npm run build
# eller
# yarn build
```

Detta kommando genererar statiska filer i mappen `build/`.

### 2. Konfigurera Firebase Hosting

Om `Firebase Hosting` inte redan är konfigurerat för projektet, kör följande kommando i `frontend/`-mappen:

```bash
firebase init hosting
```

Följ instruktionerna:
*   Välj ditt Firebase-projekt.
*   Ange `build` som din "public directory".
*   Svara **Ja** (`y`) på frågan om att konfigurera som en "single-page app" (detta sätter upp en rewrite så att alla URL:er pekar till `/index.html`).

Din `firebase.json`-fil bör se ut ungefär så här efter konfigurationen:

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

### 3. Deploya till Firebase Hosting

Deploya den byggda applikationen till `Firebase Hosting`:

```bash
firebase deploy --only hosting
```

Efter en lyckad deployment får du en publik URL till din live-applikation, till exempel `https://innerjourney-frontend.web.app`.

## Proxy och API-anrop

För att underlätta lokal utveckling och undvika CORS-problem (Cross-Origin Resource Sharing) när frontend (`localhost:3000`) anropar backend (`localhost:8080`), används en proxy. Denna är konfigurerad i `package.json`:

```json
"proxy": "http://localhost:8080"
```

Detta innebär att lokala anrop från frontend till relativa sökvägar som `/api/*` automatiskt proxas vidare till `http://localhost:8080/api/*`.

**I produktion:** När applikationen är deployad, ska frontend konfigureras att anropa den deployade backend-URL:en direkt (t.ex. via en miljövariabel), eftersom proxyn i `package.json` endast fungerar i den lokala utvecklingsmiljön.

## Autentisering

Frontend använder `Firebase Authentication` för att hantera användare:

*   **Inloggning:** Användare kan logga in med e-post och lösenord.
*   **Registrering:** Nya användare kan skapa ett konto.
*   **Tokenhantering:** Efter en lyckad inloggning hämtas ett `id_token` från Firebase. Detta token sparas (t.ex. i `localStorage` eller `sessionStorage`) och inkluderas som en `Authorization: Bearer <token>`-header i API-anrop till den skyddade backend-tjänsten för att verifiera användaren.
*   **Globalt tillstånd:** Autentiseringstillståndet (om användaren är inloggad eller inte) hanteras ofta globalt i applikationen med hjälp av `React Context` (t.ex. via en `AuthContext.tsx`).

## Felsökning

### 1. CORS-fel

*   **Orsak:** Frontend försöker göra ett direkt anrop till en backend på en annan domän/port (t.ex. från `localhost:3000` till `localhost:8080`) utan att backend tillåter det (saknar rätt CORS-headers) eller utan att proxy används korrekt lokalt.
*   **Lösning:**
    *   **Lokalt:** Säkerställ att `proxy`-inställningen i `package.json` är korrekt konfigurerad och att utvecklingsservern startats om efter ändring. Använd relativa URL:er (t.ex. `/api/users`) i dina API-anrop.
    *   **Produktion:** Se till att din backend-tjänst (t.ex. i Google Cloud Run) är konfigurerad att skicka korrekta CORS-headers som tillåter anrop från din frontend-domän (`https://din-app.web.app`).

### 2. Autentiseringsfel

*   **Orsak:** Felaktig Firebase-konfiguration i frontend. Detta kan leda till att inloggning misslyckas eller att kommunikationen med Firebase-tjänster inte fungerar.
*   **Lösning:** Dubbelkolla att alla `REACT_APP_FIREBASE_*`-variabler i din `.env`-fil är korrekta och matchar konfigurationen för ditt Firebase-projekt. Säkerställ att filen läses in korrekt (du kan behöva starta om utvecklingsservern efter ändringar i `.env`).

### 3. Build-fel

*   **Orsak:** Kan bero på syntaxfel i koden (`TypeScript`- eller `JSX`-fel), saknade beroenden eller konfigurationsproblem i `tsconfig.json` eller build-processen.
*   **Lösning:** Kör `npm run build` (eller `yarn build`) och granska noggrant felmeddelandena som skrivs ut i terminalen. Ofta pekar de direkt på filen och radnumret där felet finns. Om det gäller saknade paket, kör `npm install` (eller `yarn install`).

## Nästa steg

*   Lägg till fler sidor och komponenter för att implementera funktioner som att visa användardata, hantera övningar och visa reflektioner.
*   Implementera enhetstester och integrationstester med verktyg som `Jest` och `React Testing Library`.
*   Förbättra användarupplevelsen (UX) med genomtänkta animationer, laddningsindikatorer och tydligare felmeddelanden.

## Kontakt

För frågor, förslag eller om du vill bidra till projektet, vänligen skapa ett issue i projektets GitHub-repository: `joelkvarnsmyr/InnerJourney`.