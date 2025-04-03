---
title: "Så bygger du din bästa framtid"
description: "Reflektioner kring teknisk förenkling, framsteg och framtidsplaner för Inner Journey-projektet i mars 2025, med fokus på en stabil grund och den personliga känslan."
slug: sa-bygger-du-din-basta-framtid
authors: joelkvarnsmyr
date: 2025-01-01
tags:
  - inner-journey
  - teknik
  - reflektion
  - framsteg
  - utveckling
---

# Så bygger du din bästa framtid 🏗️

**📅 Ursprungligt datum: 30 mars 2025**

Hej Inner Journey-community! 👋

Vad gör du när du bygger ett hus och inser att ritningarna är lite väl ambitiösa? Du stärker grunden och bygger vidare – ett rum i taget. Det är precis vad vi gjort med *Inner Journey* den här månaden.

Sedan starten den 1 mars har vi gått från ett blankt papper till en prototyp med stadiga ben. Men det är en detalj här som fått oss att stanna upp och le: vår app börjar kännas som en vän. 😊

## Bygga Ett Hem för Resan 🏡

För tio dagar sedan skrev vi om hur koden fick liv – ett första “Hej” från `Google Gemini` 🤖 som gav oss gåshud. Sedan dess har vi jobbat hårt. `Backlog 5` (daterad 23 mars) visar framstegen: en backend med endpoints som `/astro-data` och `/phone/verify`, en frontend som börjar ta form, och en tydligare struktur.

Men vi hade fortfarande för många idéer – `Sinch`, `Dialogflow`, `VedAstro` – som hotade att välta bygget. Så vi förenklade.

Vår tekniska stack ser nu ut så här:
*   **Backend:** En `FastAPI`-app 🐍 som körs på `Google Cloud Run` ☁️, containeriserad med `Docker` 🐳.
*   **Datalagring:** `Firebase Firestore` 🔥 hanterar datan.
*   **AI-insikter:** `Google Gemini` 🤖 tillhandahåller personliga insikter.
*   **Frontend:** Byggd med `React` ⚛️ och `Chakra UI`, deployad på `Firebase Hosting`.

Inget mer jonglerande med för många bollar – bara en stabil grund att bygga vidare på. 💪

## "Välkommen Tillbaka!" 🎉

Här är det som fick oss att le: efter att ha deployat till `Google Cloud Run` och `Firebase Hosting` körde vi ett test. Vi loggade in (än så länge bara lokalt), skickade ett API-anrop, och fick tillbaka: “Välkommen tillbaka! Din nästa steg är att andas djupt i fem minuter.”

Det var inte bara en teknisk seger – det kändes som att *Inner Journey* hälsade på oss, som en vän som minns dig. Den känslan är precis vad vi vill ge er användare. ❤️

## Lärdomar Från Månaden 💡

*   🎯 **Fokus Slår Allt**: Att skära bort extra verktyg (hej då, `Sinch` för nu! 👋) gav oss tid att polera det som verkligen räknas.
*   ✅ **Test Är Livsviktigt**: Kraven på dokumentation och tester från `Backlog 4` räddade oss från att drunkna i buggar. 🐛➡️✅
*   ✨ **Enkelt Är Vackert**: Ett formulär istället för röstsamtal (beslut från `Backlog 5`) visade att mindre ofta kan vara mer effektivt.

## Framtiden Lockar ✨

Vi har ett hus med en stark grund – men det saknar ännu möbler. Backend behöver riktig autentisering (`Firebase UID` är nästa steg), och frontend ska få sidor för inloggning och visning av resultat. Kanske plockar vi upp astrologidelen igen lite senare. 🔮

Men just nu? Vi är stolta. Prototypen är inte bara kod – det är en startpunkt för *din* resa. 🚀

Vad vill ni att vi bygger härnäst? Mejla oss på [kontakt@innerjourney.se](mailto:kontakt@innerjourney.se) – vi lyssnar! 👂

Med värme och framtidstro,
Team Inner Journey 🙏🏡