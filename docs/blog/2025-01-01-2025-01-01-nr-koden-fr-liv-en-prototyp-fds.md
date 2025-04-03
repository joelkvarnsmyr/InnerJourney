---
title: "Snabb AI Prototyp: Så Gör Du"
description: "En guide och reflektion över de första stegen i att snabbt bygga en AI-prototyp för Inner Journey, från kodstruktur och FastAPI till Gemini-integration och lärdomar."
slug: snabb-ai-prototyp-s-gr-du
authors: joelkvarnsmyr
date: 2025-01-01
tags:
  - prototyp
  - ai
  - fastapi
  - gemini
  - utveckling
---

# Snabb AI Prototyp: Så Gör Du 🚀

**📅 Datum: 20 mars 2025**

Hej igen, Inner Journey-gäng! 👋

Kommer ni ihåg när vi sa att vi stod vid kanten av ett blankt papper? Tja, nu har vi ritat de första strecken – och plötsligt har vår skiss börjat andas! Efter två intensiva veckor sedan starten har vi gått från drömmar till en första prototyp av *Inner Journey*. Men det är inte utan sina växtvärk.

Här är resan hittills – och en liten överraskning som fick oss att jubla. 🎉

## Från Kaos till Struktur 🌪️➡️🏗️

För tio dagar sedan skrev vi om vårt steg in i ovissheten – en backend med `FastAPI`, tester med `Sinch` och `VedAstro`, och en vision om AI-drivna insikter. Men vi insåg snabbt att vi försökte springa innan vi kunde gå.

Backlog 1 (21 mars) visar kaoset: `SSL-certifikat` fixade, `Google Cloud` igång, men kod som spretade åt alla håll. Vi hade en `main.py` som försökte göra allt – från att ringa samtal till att hämta astrologidata. 😵‍💫

Så vi tog ett steg tillbaka och strukturerade om. Vi delade upp koden i tydliga moduler:

-   Rutter hamnade i `api/`
-   Tjänster för affärslogik i `services/`
-   Datamodeller i `models/`

Vi testade att skicka födelsedata (t.ex. `"1990-05-15, 14:30, Stockholm"`) till `VedAstro` och fick tillbaka svar som “Månen i fjärde huset”. Men istället för att fastna helt i astrologins detaljer bytte vi fokus: vi ville använda datan för att ge *praktiska* insikter.

Därför kopplade vi in Google `Gemini` 🤖 för att omvandla data till något användbart. Och det är här det spännande händer.

## “Din Energi Är På Topp!” ✨

Efter att ha brottats med `API-nycklar` och `CORS`-problem (ja, vi glömde konfigurera det korrekt från början 🤦), körde vi äntligen ett skarpt test. Vi skickade in ett humör (`"3 av 5"`) och ett mål (`"få mer fokus"`) till vår nya endpoint `/gemini/getActivation`.

Svaret vi fick tillbaka?

> “Din energi är på topp när du organiserar din dag – prova en kort lista nu.”

För första gången kändes det som att *Inner Journey* inte bara var kod, utan en röst som faktiskt kunde guida användaren. Vi jublade högt på kontoret – och lyckades spilla kaffe över en laptop i farten! 😅☕

## Växtvärk och Insikter 🌱

Utvecklingsresan hittills har gett oss värdefulla lärdomar:

-   💡 **Modularitet Är Vår Räddning**: Att bryta ut logik i separata filer som `gemini_service.py` och `firebase_service.py` (som nu sparar resultaten i `Firestore` 🔥) gjorde koden mycket lättare att hantera och förstå.
-   👤 **Användarupplevelsen Först**: Vi insåg att den ursprungliga `DTMF`-idén (tonval) var för krånglig för användaren. Vi bytte till ett enkelt formulär i frontend istället – mycket smidigare!
-   🧪 **Testa Tidigt och Ofta**: Backlog 3:s varning om otestad kod visade sig stämma. Problemen hopade sig tills vi började testa varje endpoint systematiskt med verktyg som `curl`, till exempel:

    ```bash
    curl -X POST "http://localhost:8080/gemini/getActivation" \
    -H "Content-Type: application/json" \
    -d '{"mood": 3, "goal": "få mer fokus"}'
    ```

## Vad Nu? ➡️

Prototypen lever och andas, men den är fortfarande i ett tidigt skede och ganska skör. Frontend är fortfarande en byggarbetsplats – `React` ⚛️ och `Chakra UI` är implementerade, men vi har bara en grundläggande sida än så länge.

Nästa viktiga steg är att få frontend och backend att kommunicera smidigt och sedan deploya hela applikationen till `Firebase Hosting` och `Cloud Run` ☁️.

Vi är på väg – och trots utmaningarna känns det magiskt att se visionen ta form. ✨

Vad vill ni se härnäst i *Inner Journey*? Har ni idéer eller feedback? Skriv till oss på [kontakt@innerjourney.se](mailto:kontakt@innerjourney.se)!

Med kaffefläckar och fortsatt entusiasm, ☕
Team Inner Journey