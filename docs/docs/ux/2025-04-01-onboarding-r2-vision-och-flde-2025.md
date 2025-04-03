---
description: Detaljerad beskrivning av vision, syfte och tekniskt flöde för onboarding
  R2 i InnerJourney
id: onboarding-r2-vision-och-flde-2025
sidebar_label: 'Onboarding R2: Vision och Flöde'
sidebar_position: 10
slug: onboarding-r2-vision-och-flde-2025
tags:
- onboarding
- user-flow
- vision
- technical-specification
- ui
title: '"Onboarding R2: Vision och Flöde"'
---

# ✨ Onboarding R2: Vision och Flöde

## 📄 Dokumentinformation

*   **Version:** 1.0 (Vision), 2.0 (Teknisk Process)
*   **Datum:** `2025-03-25`
*   **Författare:** Bo Joel Kvarnsmyr
*   **Senast reviderad av:** Bo Joel Kvarnsmyr

## 🌟 Vision och Syfte

### Vision 🔭

Onboarding-processen för InnerJourney är designad för att vara en **transformerande och engagerande introduktion** som sätter tonen för användarens resa mot självupptäckt och personlig utveckling.

Vår vision är att skapa en upplevelse som känns **intuitiv, trygg och personlig**, där varje användare känner sig sedd och förstådd från första stund. Genom att kombinera avancerad teknologi (som `AI` och `astrologiska insikter`) med en empatisk och naturlig interaktion, vill vi bygga en bro mellan användarens inre värld och de verktyg och uppdrag som kan hjälpa dem att växa. 🌱

### Syfte 🎯

Syftet med onboardingen är att:

1.  🤝 **Skapa en personlig koppling:** Genom att samla in grundläggande data (`födelsedetaljer`) och använda talbaserade frågor för att förstå användarens personlighet, preferenser och välmåendemarkörer, kan vi skapa en profil som gör att användaren känner sig sedd och förstådd.
2.  🎨 **Personifiera upplevelsen:** Använda profilen för att anpassa uppdrag, coaching och rekommendationer, så att varje användare får en resa som är skräddarsydd för deras unika behov, erfarenhetsnivå och spirituella utveckling.
3.  🛡️ **Bygga förtroende:** Genom en trygg och empatisk interaktion med en AI-agent, som ställer frågor på ett naturligt och icke-dömande sätt, vill vi etablera förtroende och uppmuntra användaren att fortsätta sin resa med InnerJourney.
4.  🩺 **Identifiera behov:** Upptäcka tendenser för depression, självmord, ADHD, autism eller liknande, samt bedöma användarens erfarenhet av spirituella praktiker (t.ex. meditation, breathwork) och nivå av uppvaknande, för att ge rätt stöd och resurser.

### Kärnvärden ❤️

*   💖 **Empati:** Onboardingen ska kännas varm, inbjudande och icke-dömande.
*   👤 **Personalisering:** Varje användares resa ska vara unik och anpassad.
*   ✅ **Enkelhet:** Processen ska vara intuitiv och fri från onödiga hinder.
*   🔍 **Transparens:** Användaren ska aldrig känna att något är dolt eller manipulerande.

## 🗺️ Översikt över Faser

Onboarding-processen består av följande huvudsakliga faser:

1.  🎂 **Insamling av grunddata:** Användaren anger födelsedatum, tid och plats via enkla formulär.
2.  📞 **Telefonverifiering:** Användaren verifierar sitt konto via ett telefonsamtal där en AI-agent läser upp en kod.
3.  🗣️ **Talbaserad profilering:** I samma samtal ställer AI-agenten personliga frågor och följdfrågor för att skapa en verifierad personlighetsprofil, inklusive erfarenhet av spirituella praktiker och nivå av uppvaknande.
4.  🎯 **Tilldelning av första uppdrag:** Baserat på profilen tilldelas användaren ett första uppdrag, anpassat till deras nivå och behov.

> ℹ️ För en mellanliggande översikt av processen, se dokumentet `Onboarding-process`. För en detaljerad beskrivning av stegen, se avsnittet nedan.

## 🚀 Detaljerat Onboarding-flöde

Detta avsnitt ger en detaljerad beskrivning av varje steg i onboardingen för InnerJourney, inklusive användarupplevelse och tekniska detaljer.

### Steg 1: Ange Födelsedatum 📅

**👤 Användarupplevelse:**

*   Användaren landar på startsidan (`/`) på `innerjourney.kvarnsmyr.se`.
*   Ett formulär visas direkt för att fylla i födelsedatum (format: `DD/MM/YYYY`).
*   Efter ifyllnad klickar användaren på knappen "Begin" för att gå vidare.
*   *Sidnot (inloggning):* Klick på logotypen visar en inloggningsvy (`/login`) för befintliga användare.

**💡 Tekniskt:**

*   **Frontend:**
    *   Routen `/` renderar komponenten `BirthDatePage.tsx` (byggd med `React`, `TypeScript`, `Chakra UI`).
    *   Formuläret använder `react-input-mask` för datumformatering.
    *   Knappen "Begin" aktiveras när ett giltigt datum har angetts (lokal validering).
    *   Inga API-anrop görs i detta steg.
    *   Vid klick på "Begin" navigeras användaren till routen `/birth-time` (Steg 2).
    *   *Sidnot (inloggning):* Klick på logotypen navigerar till `/login` (komponenten `LoginPage.tsx`) som använder `Firebase Authentication`.
*   **Backend:** Inga anrop.
*   **Firebase:** `Firebase Authentication` är konfigurerad i `firebase.ts`, men används endast för inloggning via logotyp-klicket i detta skede.

### Steg 2: Ange Födelsetid ⏰

**👤 Användarupplevelse:**

*   Användaren navigeras till sidan `/birth-time`.
*   Ett formulär visas med två dropdown-menyer: en för timme (00–23) och en för minut (00–59).
*   Användaren väljer tid och klickar på knappen "Next".

**💡 Tekniskt:**

*   **Frontend:**
    *   Routen `/birth-time` renderar komponenten `BirthTimePage.tsx` (`React`, `TypeScript`, `Chakra UI`).
    *   Dropdown-menyerna implementeras med `<Select>`-komponenten från `Chakra UI`.
    *   Födelsedatum från Steg 1 sparas temporärt i `SessionContext.tsx`.
    *   Knappen "Next" är alltid aktiv efter att ett val har gjorts.
    *   Vid klick på "Next" navigeras användaren till routen `/birth-location` (Steg 3).
    *   Inga API-anrop görs i detta steg.
*   **Backend:** Inga anrop.
*   **Firebase:** Ingen autentisering krävs i detta steg.

### Steg 3: Ange Födelseplats 📍

**👤 Användarupplevelse:**

*   Användaren navigeras till sidan `/birth-location`.
*   Ett formulär visas med ett textfält för att ange födelseplats (t.ex. "Stockholm, Sweden").
*   En autocomplete-funktion föreslår giltiga städer medan användaren skriver.
*   Användaren väljer en plats från förslagen och klickar på "Confirm".

**💡 Tekniskt:**

*   **Frontend:**
    *   Routen `/birth-location` renderar komponenten `BirthLocationPage.tsx` (`React`, `TypeScript`, `Chakra UI`).
    *   Textfältet (`<Input>`) integreras med `react-places-autocomplete` (eller motsvarande `Google Places API`-integration).
    *   Vid val av plats sparas platsnamn och koordinater temporärt i `SessionContext.tsx`, tillsammans med data från tidigare steg (datum och tid).
    *   Knappen "Confirm" aktiveras när en giltig plats har valts.
    *   Vid klick på "Confirm" navigeras användaren till routen `/verify` (Steg 4).
    *   Inga API-anrop görs i detta steg.
*   **Backend:** Inga anrop.
*   **Firebase:** Ingen autentisering krävs i detta steg.

### Steg 4: Telefonverifiering 📞

**👤 Användarupplevelse:**

*   Användaren navigeras till sidan `/verify`.
*   Ett klickbart telefonnummer (t.ex. `+46701234567`) visas, formaterat som en `href="tel:..."`-länk.
*   Ett textfält visas där användaren ska ange en verifieringskod.
*   Användaren ringer det angivna numret. En AI-agent svarar: "Ditt samtal är väntat." och frågar sedan "Du kommer få en kod av mig att skriva in i din webbläsare, är du redo att göra det?".
*   Vid bekräftelse (t.ex. genom att säga "Ja") läser agenten upp koden (t.ex. "123456").
*   Användaren anger den upplästa koden i textfältet på webbsidan och klickar på "Verify".

**💡 Tekniskt:**

*   **Frontend:**
    *   Routen `/verify` renderar komponenten `VerificationPage.tsx` (`React`, `TypeScript`, `Chakra UI`).
    *   Vid sidladdning görs 3 API-anrop till backend:
        1.  **`/init-birthdata`**:
            ```text
            - Request Body: { birth_date, birth_time, birth_location }
            - Response Body: { session_id: "abc123" }
            - Syfte: Spara födelsedata i Firestore (samlingen `sessions`).
            ```
        2.  **`/astro-data`**:
            ```text
            - Request Body: { birth_date, birth_time, birth_location }
            - Response Body: { /* Astrologiska data (planeter, hus etc.) */ }
            - Syfte: Hämta och spara astrodata i Firestore (t.ex. `users/abc123/astroData`).
            ```
        3.  **`/get-verification-number`**:
            ```text
            - Request Body: { session_id: "abc123", country: "SE" }
            - Response Body: { phone_number: "+46701234567" }
            - Syfte: Hämta verifieringsnummer och initiera kodgenerering på backend.
            ```
    *   Telefonnumret från `/get-verification-number` visas som en klickbar `<a>`-länk. Ett `<Input>`-fält visas för koden.
    *   Returnerat `session_id` sparas i `SessionContext.tsx`.
    *   Vid klick på "Verify" görs ett API-anrop till `/phone/verify`:
        ```text
        - Request Body: { session_id: "abc123", verification_code: "123456" }
        - Response Body: { status: "SUCCESS" }
        - Syfte: Verifiera koden och koppla telefonnummer till användaren.
        ```
    *   Om verifieringen lyckas (`status === "SUCCESS"`), navigeras användaren till `/profile-questions` (Steg 5).

*   **Backend:**
    *   Endpoint `/init-birthdata`: Sparar mottagen data i `Firestore` under `sessions/{session_id}`.
    *   Endpoint `/astro-data`: Anropar externt `VedAstro API`, bearbetar svaret och sparar resultatet i `Firestore` under `users/{session_id}/astroData`.
    *   Endpoint `/get-verification-number`: Returnerar ett telefonnummer (t.ex. via `Sinch`), genererar en verifieringskod och sparar den (hashad) i `Firestore` under `sessions/{session_id}/verificationCode`. Initierar förväntan på inkommande samtal.
    *   Samtalshantering: Inkommande samtal tilldelas via `Sinch Voice API` till ett `Dialogflow CX`-flöde.
    *   Endpoint `/phone/verify`: Verifierar den inskickade koden mot den lagrade koden för `session_id`. Om korrekt, kopplas det inringande numret (från samtalsinformationen) till användaren i `Firestore` (t.ex. `users/{session_id}/phoneNumber`).

*   **Firebase:**
    *   `sessions`-samlingen: Lagrar temporär sessionsdata (födelsedata, verifieringskod). Kan rensas efter en viss tid.
    *   `users`-samlingen: Lagrar permanent användardata (astrodata, telefonnummer efter verifiering). `session_id` blir användarens initiala ID.

### Steg 5: Talbaserad Profilering 🗣️

**👤 Användarupplevelse:**

*   Användaren navigeras till sidan `/profile-questions`.
*   Text på skärmen uppdateras för att visa status: "Verification under progress..." -> "Call under progress...".
*   Telefonsamtalet fortsätter direkt efter verifieringen. AI-agenten säger: "Thank you for verifying. Now, let's get to know you. Answer naturally, and I'll guide you through some questions to understand you better."
*   Agenten ställer cirka 10 personliga frågor. Dessa baseras på användarens astrologiska data men presenteras som neutrala påståenden eller frågor (t.ex. "Stämmer det att du känner dig trygg i bekanta miljöer, eller föredrar du att utforska nya platser?").
*   Dynamiska följdfrågor kan ställas baserat på användarens svar.
*   Specifika frågor ställs också för att bedöma:
    *   **Spirituell erfarenhet:** (t.ex. "Praktiserar du meditation eller breathwork regelbundet?")
    *   **Nivå av uppvaknande:** (t.ex. "Känner du att du har en djup förståelse för dig själv och din plats i världen?")
*   Efter varje svar ger agenten en kort bekräftelse (t.ex. "Interesting, thank you.").
*   Webbsidan uppdateras inte med frågor/svar under samtalet (endast statusindikatorn syns). Svaren transkriberas i bakgrunden.
*   När AI-agenten har samlat in tillräckligt med data, avslutar den samtalet: "Thank you for sharing, it's exactly like I thought. Are you ready for your first activation? I'll send it to your screen now. I wish you the best journey, good luck and goodbye."
*   Samtidigt som agenten säger detta, laddas det första uppdraget i bakgrunden, och webbsidan navigeras automatiskt till Steg 6 (`/activations`).

**🎯 Profileringens Syfte & Mål:**

*   **Huvudsyfte:** Skapa en verifierad personlighetsprofil via en naturlig, talbaserad frågestund för att kunna personifiera uppdrag, coaching och rekommendationer i InnerJourney. Identifiera även tendenser relaterade till välmående och spirituell utvecklingsnivå.
*   **Primärt Mål:** Förstå användarens grundläggande personlighetstyp, preferenser och emotionella tendenser.
*   **Sekundärt Mål:** Identifiera eventuella tendenser för depression, självmordstankar, ADHD, autism eller liknande för att kunna erbjuda lämpligt stöd (eller flagga för mänsklig uppföljning vid behov).
*   **Data att samla in:**
    *   Personlighetsdrag (t.ex. introvert/extrovert, intuitiv/analytisk).
    *   Uttalade preferenser (t.ex. `I prefer familiar settings`).
    *   Välmåendemarkörer (t.ex. uttalanden som `I often feel hopeless`).
    *   Information om spirituell erfarenhet och uppvaknandenivå.
*   **Utvärdering:** En språkmodell (t.ex. `BERT` eller `GPT`, finjusterad för uppgiften) analyserar den transkriberade texten från samtalet för att generera en strukturerad profil. Denna profil sparas i `Firestore` med fält som `personalityType`, `neuroTendencies`, `wellbeingFlags`, `spiritualExperience`, `awakeningLevel`.
*   **Personifiering:** Den genererade profilen används sedan för att:
    *   Välja relevanta **uppdrag** (t.ex. om användaren är introvert -> rekommendera "The Sound of You"; om extrovert -> rekommendera "Tyst Ögonkontakt Live").
    *   Anpassa **coaching** (t.ex. om `depressionRisk: true` -> matcha med en coach specialiserad på mental hälsa).
    *   Ge skräddarsydda **rekommendationer** (t.ex. om `adhdScore: 8` -> föreslå korta, fokuserade mindfulnessövningar).

**💡 Tekniskt:**

*   **Frontend:**
    *   Routen `/profile-questions` renderar komponenten `ProfileQuestionsPage.tsx` (`React`, `TypeScript`, `Chakra UI`).
    *   Visar statusindikator ("Verification under progress..." -> "Call under progress...").
    *   *Alternativ 1 (Transkribering i Frontend):* Använder `Web Speech API` (eller liknande bibliotek) för att potentiellt fånga och transkribera användarens svar lokalt.
    *   *Alternativ 2 (Transkribering i Backend/Dialogflow):* Frontend gör ingenting aktivt med ljudet, utan förlitar sig på att backend/Dialogflow hanterar transkribering via telefonsamtalet. (Detta är mer troligt givet flödet).
    *   Om svar skickas löpande från Dialogflow till backend via webhook:
        ```http
        # Webhook från Dialogflow till Backend (exempel)
        POST /webhook/save-answer
        - Request Body: { session_id, question_id, transcript_segment, timestamp }
        ```
    *   När backend signalerar att samtalet är avslutat och profileringen klar (t.ex. via `WebSocket` eller polling), gör frontend ett API-anrop för att hämta första uppdraget:
        ```http
        GET /get-first-activation?session_id={session_id}
        ```
        (Se Steg 6 för detaljer om detta anrop).
    *   Efter att ha mottagit svar från `/get-first-activation`, sker automatisk navigering till `/activations` (Steg 6).

*   **Backend:**
    *   Genererar en dynamisk prompt för `Dialogflow CX` baserad på användarens `VedAstro`-data (hämtad i Steg 4). Prompten innehåller de initiala frågorna och logik för följdfrågor.
    *   Webhook Endpoint (t.ex. `/webhook/save-answer`): Tar emot transkriberade svar från `Dialogflow CX`, ackumulerar dem och sparar dem (eventuellt) i `Firestore` under `users/{session_id}/answers`.
    *   Efter att `Dialogflow CX` signalerar att alla frågor är besvarade:
        1.  Initierar analys av den samlade transkriptionen med en språkmodell (`BERT`/`GPT`).
        2.  Genererar den strukturerade användarprofilen.
        3.  Sparar profilen i `Firestore` under `users/{session_id}` (uppdaterar befintligt dokument med fält som `personalityType`, `neuroTendencies`, etc.).
    *   Endpoint `/get-first-activation`: Används av frontend för att hämta det första uppdraget. Logiken väljer ett uppdrag baserat på den nyss genererade profilen i `Firestore`.

*   **Firebase:** Användarens transkriberade svar och den genererade profilen lagras i `Firestore` under `users/{session_id}`.
*   **Dialogflow CX:** Hanterar samtalsflödet. Ställer frågor baserat på den dynamiska prompten från backend. Fångar användarens svar, hanterar transkribering och skickar data (transkription, samtalsstatus) till backend via webhooks.

### Steg 6: Första Uppdraget och Start på Resan 🌱

**👤 Användarupplevelse:**

*   Direkt efter att AI-agenten avslutat samtalet i Steg 5, navigeras användarens webbläsare automatiskt till sidan `/activations`.
*   Det första anpassade uppdraget visas på skärmen. (Initialt, under utveckling/testning, kan detta vara ett fast uppdrag som "The Sound of You" för alla).
*   Exempel på visning:
    *   **Titel:** "Your First Task: The Sound of You"
    *   **Beskrivning:** "A reflective exercise to connect with your inner self through sound and mindfulness."
    *   **Knapp:** "Start Now" (med accentfärg `#00A676`).
*   Ett klick på knappen "Start Now" initierar själva uppdraget (visar uppdragsinstruktioner, startar eventuell timer eller mediespelare etc.).

**💡 Tekniskt:**

*   **Frontend:**
    *   API-anropet till `/get-first-activation` (triggat i slutet av Steg 5) returnerar uppdragsdetaljer:
        ```json
        // GET /get-first-activation?session_id={session_id} Response Body
        {
          "id": "sound-of-you",
          "title": "The Sound of You",
          "description": "A reflective exercise to connect with your inner self through sound and mindfulness.",
          // ... andra uppdragsdetaljer
        }
        ```
    *   Routen `/activations` renderar komponenten `ActivationsPage.tsx` (`React`, `TypeScript`, `Chakra UI`).
    *   Visar titel, beskrivning och "Start Now"-knapp baserat på data från API-anropet.
    *   Vid klick på "Start Now":
        *   Navigerar till en specifik uppdragsvy (t.ex. `/activations/sound-of-you`).
        *   Komponenten för det specifika uppdraget renderas.
        *   Ett API-anrop kan göras för att markera uppdraget som påbörjat, t.ex. `POST /mark-activation-started`.

*   **Backend:**
    *   Endpoint `/get-first-activation`: Hämtar användarens profil från `Firestore`, väljer ett lämpligt första uppdrag baserat på profilens data (eller returnerar standarduppdraget), och returnerar uppdragsinformationen.
    *   (Eventuell) Endpoint `/mark-activation-started`: Loggar att användaren har påbörjat ett specifikt uppdrag i `Firestore` (t.ex. i en `userActivations`-subsamling eller genom att uppdatera status i `users/{session_id}`).

*   **Firebase:** Användarens framsteg och status för uppdrag sparas i `Firestore`, troligtvis under `users/{session_id}` eller en relaterad subsamling.

## 📚 Nästa Steg och Referenser

För planerade förbättringar och vidare utveckling av onboarding-processen, se följande dokument:

*   🔗 `Backlog 4: 23 mars 2025`
*   🔗 `Utvecklingsplan: Inner Journey`

För mer kontext och relaterad information om projektet och dess komponenter:

*   🔗 `Onboarding-vision` (Den övergripande visionen, mindre teknisk)
*   🔗 `Onboarding-process` (En mellanliggande, mer processorienterad översikt)
*   🔗 `Projektbeskrivning: Inner Journey` (Övergripande projektinformation)
*   🔗 `Teknisk dokumentation för backend` (Detaljer om backend-arkitektur och API:er)
*   🔗 `Teknisk dokumentation för frontend` (Detaljer om frontend-arkitektur och komponenter)
*   🔗 `Databasstruktur` (Beskrivning av Firestore-datamodellen, se `databasstruktur.md`)