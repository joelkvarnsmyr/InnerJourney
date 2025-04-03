---
title: "Skapa AI-prototyp: Så gör du"
description: "Berättelsen om hur den första fungerande prototypen av Inner Journey byggdes, från AI-idé och tekniska val till den första lyckade API-interaktionen."
slug: skapa-ai-prototyp-s-gr-du
authors: joelkvarnsmyr
date: 2025-01-01
tags:
  - prototyp
  - teknik
  - backend
  - frontend
  - ai
---

# Skapa AI-prototyp: Så gör du ✨

**📅 Datum: 31 mars 2025**

Hej Inner Journey-vänner! 👋

Tänk dig att du skriver ett brev till ditt framtida jag – fyller det med drömmar, planer och en nypa mod – och sedan, en dag, får du svar. Det är så det känns just nu. För en månad sedan sparkade vi igång *Inner Journey* med stora visioner om en plattform för självutveckling. 💡

Idag, den `30 mars 2025`, har vi en första prototyp som inte bara existerar – den fungerar! 🚀

Här är berättelsen om hur vi tog våra idéer från whiteboard till webben, med en liten hook som fick oss att inse: det här är på riktigt.

## “Hej, Välkommen Till Din Resa!” 💬

Efter veckor av kodande, deployande och kaffedrickande ☕ körde vi ett test i förrgår. Vi loggade in på vår frontend, matade in födelsedata (bara för skojs skull: `"1990-05-15, 14:30, Stockholm"`), och klickade på “Skicka”.

Sekunden senare dök ett meddelande upp från vår backend via API-endpointen `/gemini/getActivation`: *"Hej, välkommen till din resa! Ditt nästa steg är att ta tre djupa andetag och sätta en intention för dagen."*

Det var som om appen sträckte ut en hand och sa “Jag ser dig”. Vi satt tysta en stund – sen bröt vi ut i skratt och applåder. Prototypen lever! 🎉

## Resan Hit: Från Val till Verklighet 🛤️

### 💻 Tekniken Tar Form

Redan från start visste vi att vi ville ha en snabb och skalbar grund. Vi valde:

-   🐍 **Backend:** `FastAPI` – det är som Python på steroider för API:er.
-   ⚛️ **Frontend:** `React` med `TypeScript` – för att hålla koden säker och framtidssäkrad.
-   🔥 **Tjänster:** `Firebase` blev vår bästa vän för både autentisering (`Firebase Authentication`) och datalagring med `Firestore`.
-   ☁️ **Hosting:** Vi parkerade allt i Google-molnet: `Cloud Run` för backend och `Firebase Hosting` för frontend.

Varför? För att det är smidigt, skalbart och spelar fint tillsammans.

### 🌱 Enkelhet Över Ambition

Vår första plan för `onboarding` var storslagen – födelsedata, telefonverifiering med röst, GDPR-samtycken i flera steg. Men vi insåg att vi behövde komma ut ur startblocken snabbare.

Så vi skalade ner: nu är det bara inloggning/registrering via `Firebase Authentication` och ett enkelt formulär för födelsedata. Det ger oss en prototyp vi kan testa med er, och sen bygga vidare på baserat på vad ni tycker. 🙏

### ❤️ Backend: Hjärtat Börjar Slå

På backend-sidan har vi byggt en motor som tickar. Endpointen `/gemini/getActivation` är stjärnan – den tar ditt humör och mål, snackar med `Google Gemini` 🤖 och spottar ut ett personligt steg, som sedan (planerat) sparas i `Firestore`.

Vi har säkrat allt med `Google Cloud Secret Manager` 🔑 för nycklar och deployat det hela till `Cloud Run` med `Docker` 🐳. Resultatet? En publik URL – `https://innerjourney-backend-975065734812.europe-west1.run.app` – som är redo att ta emot er!

### 🖥️ Frontend: Ansiktet Utåt

Frontend är fortfarande ung, men den står på egna ben. Vi har sidor som:

-   `HomePage.tsx`: Där du kan mata in födelsedata.
-   `LoginPage.tsx` & `RegisterPage.tsx`: För att logga in eller registrera dig.

Med `react-router-dom` hoppar du mellan dem, och `Chakra UI` gör det snyggt och responsivt. `AuthContext.tsx` håller koll på vem du är, och snart kopplar vi in fler API-anrop via `api.ts`. Den är redo att deployas till `Firebase Hosting` – ett `npm run build` och `firebase deploy` bort!

### 🐙 Git: Vår Tidsmaskin

All kod bor i vårt Git-repo på `https://github.com/joelkvarnsmyr/InnerJourney`, uppdelat i `backend/` och `frontend/`. Vi har städat upp med en `.gitignore` (hej då, `node_modules`!) och döpt om huvudgrenen till `main` för att hänga med i tiden. Varje steg är sparat, så vi kan alltid backa om något går snett. 💾

## 🤔 Vad Vi Lärt Oss

-   ⚡ **Snabbhet Slår Perfektion:** Att förenkla onboarding var ett vinnande drag – vi får ut något *nu* och kan växa sen.
-   ☁️ **Molnet Är Magiskt:** `Cloud Run` och `Firebase Hosting` gör deployment till en dans, inte en kamp.
-   🤝 **Teamwork Gör Drömmen:** Från kaotiska backloggar till en körbar prototyp – vi har hittat rytmen tillsammans.

## 🚀 Nästa Steg: Mot Himlen!

Vi är inte klara – långt ifrån. Frontend ska deployas till `Firebase Hosting` (bara ett kommando bort!), och vi måste koppla in fler `API-anrop` så att födelsedata och insikter flyter smidigt. Sen vill vi lägga till `telefonverifiering` och sidor för att visa vad du sparat.

Men just nu? Vi har en prototyp som säger “Hej” – och det är en början vi är stolta över. 😊

Vad vill ni se i nästa version? Hör av er på [kontakt@innerjourney.se](mailto:kontakt@innerjourney.se) – er röst formar resan!

Med glädje och kod,
Team Inner Journey 🌟