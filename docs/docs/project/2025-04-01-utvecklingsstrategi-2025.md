---
id: utvecklingsstrategi-2025
title: "🧭 Utvecklingsstrategi"
description: "Beskriver den övergripande planen och tekniska valen för att bygga InnerJourney"
slug: utvecklingsstrategi-2025
sidebar_label: Utvecklingsstrategi
sidebar_position: 10
tags:
  - development
  - strategy
  - tech-stack
  - deployment
  - mvp
  - project
---

# 🧭 Utvecklingsstrategi

📄 **Dokumentinformation**

*   **Version:** 4.0
*   **Datum:** 2025-03-24
*   **Författare:** Bo Joel Kvarnsmyr
*   **Senast reviderad av:** Bo Joel Kvarnsmyr

## 🎯 Syfte

Denna utvecklingsstrategi beskriver den övergripande planen och de tekniska valen för att bygga och lansera InnerJourney-plattformen. Fokus ligger på att leverera en stabil, skalbar och användarvänlig produkt genom att prioritera nyckelfunktioner, följa definierade principer och använda iterativa metoder.

För en bredare översikt av projektet, se `Projektbeskrivning: Inner Journey`. Strategin baseras på projektets syfte och vision, som definieras i `Styrdokument för InnerJourney` och `Projektbeskrivning`.

## 🧬 Kärnprinciper och Filosofi

Utvecklingen av InnerJourney följer dessa grundläggande principer:

*   🎯 **Användarfokus:** Prioritera funktioner och upplevelser som ger direkt värde till slutanvändaren, baserat på definierad målgrupp och feedback.
*   🧱 **Modularitet och Skalbarhet:** Bygg systemet med tydligt avgränsade moduler (backend-tjänster, frontend-komponenter) och använd skalbara molntjänster (`Cloud Run`, `Firestore`) för att hantera tillväxt.
*   🔒 **Säkerhet by Design:** Integrera säkerhetstänk från början, inklusive säker hantering av hemligheter (`Secret Manager`), robust autentisering (`Firebase Auth`) och skydd av användardata.
*   ⚙️ **Automation:** Automatisera repetitiva uppgifter som testning, byggnation och deployment (`CI/CD`) för att öka effektivitet och minska fel.
*   🌱 **Iterativ Utveckling (MVP Först):** Lansera en Minimal Viable Product (`MVP`) med kärnfunktionalitet och bygg sedan vidare baserat på användarfeedback och affärsmål.

## ✅ Prioriterade Funktioner (Initial Fokus)

Dessa funktioner prioriteras initialt för att snabbt leverera kärnvärde:

*   🚀 **Onboarding:** Skapa en smidig onboarding-process som samlar data och verifierar användaren (se `Onboarding-process`).
*   🧘 **Övningar:** Implementera grundläggande övningar (`activations`) för att visa plattformens värde (se `Activations: Inner Journey`).
*   🎨 **Användargränssnitt:** Bygga ett minimalistiskt och anpassningsbart `UI` (se `Användargränssnitt: Inner Journey`).
*   🤝 **Coaching:** Integrera grundläggande coaching-element som en naturlig del av resan (se `Coaching-strategi`).
*   🛡️ **Säkerhet:** Säkerställa grundläggande dataskydd och `GDPR`-efterlevnad (se `Säkerhetsdokument`).

## 💻 Teknologistack

Vald teknologistack för att uppnå projektets mål:

### 🐍 Backend

*   **Ramverk:** `FastAPI` (`Python 3.10`) - För snabb `API`-utveckling och automatisk dokumentation.
*   **Datalagring:** Firebase `Firestore` - `NoSQL`-databas för flexibel och skalbar datalagring.
*   **Hosting:** Google `Cloud Run` - Serverless containerplattform för automatisk skalning och enkel deployment.
*   **Säkerhet:** Google `Cloud Secret Manager` - För säker hantering av `API`-nycklar och andra känsliga data.
*   **Containerisering:** `Docker` - För att paketera applikationen och dess beroenden.

### ⚛️ Frontend

*   **Ramverk/Bibliotek:** `React` med `TypeScript` - För robust, typ-säker och komponentbaserad `UI`-utveckling.
*   **Styling:** `Chakra UI` - Komponentbibliotek för ett konsekvent och tillgängligt gränssnitt.
*   **Autentisering:** `Firebase Authentication` - För säker användarhantering och inloggning (e-post/lösenord, planerad telefonverifiering).
*   **Hosting:** `Firebase Hosting` - För snabb och global leverans av frontend-applikationen (`PWA`).
*   **State Management:** `React Context` eller `Redux` (beroende på komplexitet).

### 🤖 AI & Integrationer

*   **AI:** Google `Gemini` - För AI-genererade insikter och aktiveringar.
*   **Planerade Integrationer:** `Dialogflow` (chatbot), `ElevenLabs` (röstgenerering).

## ⚙️ Utvecklingsflöde

Processen från idé till fungerande kod i produktion:

### 🐙 Versionshantering (Git & GitHub)

*   **Repository:** `joelkvarnsmyr/InnerJourney` på `GitHub`.
*   **Branch-strategi:**
    *   `main`: Innehåller stabil, deploybar kod.
    *   `feature/*`: Skapas för nya funktioner eller buggfixar (t.ex. `feature/new-activation-endpoint`).
    *   Merge till `main` sker via Pull Requests (`PRs`) efter kodgranskning.
*   **Commit-rutiner:** Tydliga och beskrivande commit-meddelanden (t.ex. `feat: Add user profile route`, `fix: Correct Firestore query`).
*   **Ignorera filer:** Använd `.gitignore` för att exkludera känsliga filer (`.env`, credentials), lokala konfigurationer (`venv/`) och autogenererade filer (`__pycache__/`).

### 🖥️ Lokal Utvecklingsmiljö

*   **Nödvändiga Verktyg:** `Python 3.10`, `Git`, `Docker`, `gcloud` SDK, `Node.js`/`npm` (för frontend).
*   **Setup:**
    1.  Klona repot: `git clone <repo-url>`
    2.  Skapa virtuell miljö: `python -m venv venv` och aktivera den (`source venv/bin/activate` på Linux/macOS, `.\venv\Scripts\activate` på Windows).
    3.  Installera beroenden: `pip install -r requirements.txt`
*   **Konfiguration:** Använd en `.env`-fil för lokala hemligheter (`API`-nycklar, filvägar). Denna fil ska **inte** checkas in i `Git` (se `.gitignore`).
*   **Testning:** Kör backend lokalt med `uvicorn` eller via `Docker`. Använd `gcloud`-autentisering för att testa integrationer mot Google Cloud-tjänster lokalt.

```bash title="Exempel: Starta backend lokalt med uvicorn"
uvicorn main:app --reload
```

### ✍️ Kodkvalitet och Standarder

*   **Backend (Python):** `Flake8` för linting och `Black` för automatisk formatering.
*   **Frontend (TypeScript/React):** `ESLint` för linting och `Prettier` för automatisk formatering.
*   **Konsekvens:** Följ etablerade mönster inom respektive ramverk (`FastAPI`-routers/services, `React`-komponenter/hooks).

### ✅ Testning

*   **Backend:** Enhetstester med `pytest` för `API`-logik och tjänster.
*   **Frontend:** Enhetstester med `Jest` och `React Testing Library` för komponenter.
*   **Integrationstester:** Testa flöden end-to-end, inklusive `API`-anrop och autentisering.
*   **Automatisering:** Tester körs automatiskt i `CI/CD`-pipelinen (se `Testplan för Inner Journey`).

### 🚀 CI/CD (Continuous Integration / Continuous Deployment)

*   **Verktyg:** `GitHub Actions` eller Google `Cloud Build`.
*   **Triggers:** Körs automatiskt vid push till `main` eller vid skapande/uppdatering av Pull Requests (`PRs`).
*   **Flöde:**
    1.  📥 Checka ut kod.
    2.  📦 Installera beroenden.
    3.  🧹 Kör linters och formatcheckar.
    4.  🧪 Kör automatiska tester.
    5.  🏗️ Bygg `Docker`-image (för backend).
    6.  ☁️ Pusha image till Google `Artifact Registry`.
    7.  🚀 Deploya till Google `Cloud Run` (backend) och `Firebase Hosting` (frontend).

## 🔄 Iterativ Utveckling

*   **Sprintar:** Projektet är uppdelat i sprintar som fokuserar på specifika leveranser. Varje sprint varar 2-3 veckor och avslutas med en testfas (se `Testplan för Inner Journey`).
*   **Feedback:** Användarfeedback samlas in efter varje sprint för att forma nästa iteration (se `Strategi för Användarfeedback & Kommunikation` i `Projektbeskrivning: Inner Journey`).
*   **Backloggar:** Dagliga framsteg och prioriteringar dokumenteras i backloggar (se `Backlog 1: 21 mars 2025`).

## ☁️ Deployeringsstrategi

Hur applikationen driftsätts och görs tillgänglig:

### Backend (Google Cloud Run)

*   **Process:** `Docker`-imagen byggs och pushas till `Artifact Registry` via `CI/CD`-flödet. Kommandot `gcloud run deploy` används för att driftsätta den nya versionen.

    ```bash title="Exempel: Deploya till Cloud Run"
    gcloud run deploy <SERVICE_NAME> \
      --image <REGION>-docker.pkg.dev/<PROJECT_ID>/<REPO_NAME>/<IMAGE_NAME>:<TAG> \
      --region <REGION> \
      --platform managed \
      --allow-unauthenticated # OBS: Ska ersättas med autentisering!
    ```

*   **Konfiguration:**
    *   Tjänsten körs som en `managed` service.
    *   Region: `europe-west1`.
    *   Servicekonto med nödvändiga `IAM`-roller (minst `Secret Manager Secret Accessor`).
    *   Miljövariabler sätts vid behov (t.ex. `GOOGLE_CLOUD_PROJECT`).
    *   **Säkerhet:** Initialt används `--allow-unauthenticated` för enkelhet under utveckling. Detta **måste** ersättas med autentiseringskrav (t.ex. validering av Firebase `id_token`) innan bredare lansering.

### Frontend (Firebase Hosting)

*   **Process:** Den byggda `React`-applikationen deployas via `firebase-cli`.

    ```bash title="Exempel: Deploya frontend"
    npm run build # Eller motsvarande byggkommando
    firebase deploy --only hosting
    ```

*   **Proxy till Backend:** Filen `firebase.json` konfigureras med en `rewrite` för att dirigera `API`-anrop (t.ex. `/api/**`) till backend-tjänsten på `Cloud Run`. Detta undviker `CORS`-problem och döljer backend-URL:en.

    ```json title="firebase.json (example rewrite)"
    {
      "hosting": {
        // ... andra hosting-inställningar
        "rewrites": [
          {
            "source": "/api/**",
            "run": {
              "serviceId": "<CLOUDRUN_SERVICE_ID>",
              "region": "europe-west1" // Matcha din Cloud Run region
            }
          },
          {
            "source": "**",
            "destination": "/index.html" // För Single Page Application (SPA) routing
          }
        ]
      }
    }
    ```
*   **PWA:** Konfigurerad som en Progressive Web App (`PWA`) för bättre användarupplevelse, offline-kapabilitet (initialt) och installationsmöjlighet på enheter.

## 🌱 MVP och Fasad Utveckling

Strategin för lansering och vidareutveckling:

### MVP-fokus

*   ✅ **Kärnfunktioner:** Stabil `autentisering`, enkel `onboarding`-process, grundläggande `daglig loggning`.
*   📜 **Innehåll:** Ett fåtal initiala övningar (`activations`), t.ex. andningsövning för fokus, reflektionsuppgifter.
*   🎨 **Gränssnitt:** Ett rent och funktionellt `UI`, inspirerat av `Typeform` och `Superhuman`.
*   🗣️ **Feedback:** Enkel mekanism för användarfeedback inbyggd i appen.

### Fasad Utvecklingsplan (Exempel baserat på sprints)

*   **Sprint 1 (Grund):** Setup av projekt, `CI/CD`, grundläggande `autentisering`, databasstruktur (`Firestore`).
*   **Sprint 2-3 (Onboarding & Kärna):** Implementera hela `onboarding`-flödet, spara användardata, grundläggande journal/loggning.
*   **Sprint 4 (Övningar):** Implementera system för övningar (`activations`), lägg till första uppsättningen övningar (inkl. `Gemini`-integration).
*   **Sprint 5+ (Expansion):** Utveckla live-interaktioner, AI-analys, coachningsfunktioner, fler övningstyper, förbättra `UI`/`UX` baserat på feedback.

### 🗣️ Feedback och Iteration

*   Aktivt samla in och analysera användarfeedback via inbyggda formulär och community-kanaler.
*   Prioritera och implementera förbättringar och nya funktioner i efterföljande iterationer baserat på insikter.

## 👥 Team och Roller

*   🧑‍💼 **Projektledare:** Ansvarar för planering, koordinering och uppföljning av sprintar.
*   💻 **Utvecklare:** Bygger och testar backend, frontend och integrationer.
*   🎨 **Designers:** Skapar och itererar på `UI`/`UX`-designen.
*   🧪 **Testare:** Genomför manuella och automatiserade tester för att säkerställa kvalitet.

## ⚠️ Risker och Beroenden

*   **Risker:**
    *   Förseningar i tredjepartsintegrationer (t.ex. `Dialogflow CX`, `ElevenLabs`) kan påverka tidslinjen.
    *   Tekniska problem, som serveravbrott eller oväntade skalningsproblem, kan uppstå.
*   **Beroenden:**
    *   Onboarding-processen är beroende av extern `API` (t.ex. `Sinch Voice API`) och `Firebase Authentication`.
    *   Kärnfunktioner som övningar kräver att både `UI` och backend är stabila och driftsatta.
*   **Mitigering:**
    *   Prioritera att testa kritiska integrationer tidigt i utvecklingscykeln.
    *   Ha en incidenthanteringsplan på plats (se `Säkerhetsdokument`).
    *   Använd molntjänster med hög tillgänglighet och övervakning.

## 🌟 Framtida Utveckling och Integrationer

Långsiktiga mål och planerade tillägg för att expandera plattformen:

*   **Utökat API:** Fler endpoints för t.ex. telefonverifiering, avancerad användarprofilhantering, loggning av olika typer av reflektioner.
*   **Förbättrad Testning:** Öka testtäckningen, särskilt för integrationstester och end-to-end-flöden.
*   **Förbättrad Säkerhet:** Implementera striktare `API`-åtkomstkontroll (t.ex. `id_token`-validering på alla skyddade endpoints), regelbundna säkerhetsgranskningar.
*   **Nya Integrationer:** `Dialogflow` för chatt-baserade interaktioner, `ElevenLabs` för röstbaserade övningar och feedback.
*   **Coaching-plattform:** Bygga ut funktioner för användare att agera som coacher och interagera med andra användare inom plattformen.
*   **Sociala Funktioner:** Möjlighet för användare att (valfritt) dela framsteg eller delta i gruppövningar/utmaningar.

## 📚 Dokumentation och Kunskapsdelning

Säkerställa att projektet är väl dokumenterat för både nuvarande och framtida teammedlemmar:

*   **Teknisk Dokumentation:** `README.md`-filer i projektets rot samt i viktiga mappar (`backend/`, `frontend/`). En dedikerad `/docs`-mapp i repot för mer djupgående dokumentation (arkitekturdiagram, `API`-specifikationer, databasstruktur).
*   **API-dokumentation:** Auto-genererad dokumentation via `FastAPI` (Swagger UI/ReDoc), kompletterad med manuella beskrivningar och exempel vid behov, särskilt för frontend-konsumenter.
*   **Onboarding Guide:** Ett specifikt dokument som guidar nya utvecklare genom processen att sätta upp den lokala utvecklingsmiljön, förstå kodbasens arkitektur och bidra effektivt till projektet.
*   **Styrdokument:** Regelbunden granskning och uppdatering av detta dokument (`utvecklingsstrategi-2025.md`) och andra centrala styrdokument för att säkerställa att de reflekterar projektets nuvarande status och framtida riktning.

## 👉 Nästa Steg

*   Planera innehållet och målen för **Sprint 1**, med fokus på att implementera grundläggande onboarding och de första övningarna (`activations`).
*   Utveckla en detaljerad teststrategi och initiala testfall för att validera leveranserna från varje sprint (se `Testplan för Inner Journey`).
*   Förbered mekanismer för att samla in feedback från tidiga användare (t.ex. beta-testare) efter **Sprint 2** för att informera och prioritera nästa utvecklingsiteration.

## 🔗 Referenser

För mer detaljerad information, se följande relaterade dokument:

*   `Projektbeskrivning: Inner Journey`
*   `Styrdokument för InnerJourney`
*   `Onboarding-process`
*   `Activations: Inner Journey`
*   `Användargränssnitt: Inner Journey`
*   `Coaching-strategi`
*   `Säkerhetsdokument`
*   `Testplan för Inner Journey`
*   `Backlog 1: 21 mars 2025` (och efterföljande backlogs)