---
description: Beskriver den planerade databasstrukturen för Inner Journey med Firebase
  Firestore, inklusive samlingar för användare, övningar, loggar och sessioner.
id: databasstruktur-2025
sidebar_label: Databasstruktur
sidebar_position: 10
slug: databasstruktur-2025
tags:
- database
- firestore
- schema
- tech-spec
- users
- data-model
title: Databasstruktur
---

# 🗄️ Databasstruktur

**Version:** 5.0
**📅 Datum:** 2025-03-24
**👤 Författare:** Bo Joel Kvarnsmyr
**🔄 Senast reviderad av:** Bo Joel Kvarnsmyr

## 🎯 Syfte & Översikt

Databasstrukturen för Inner Journey är designad för att lagra och hantera användardata på ett säkert, skalbart och effektivt sätt via Firebase `Firestore`. Den stödjer appens kärnfunktioner:

-   👤 **Personlig profilering:** Baserad på astrologi, numerologi och talbaserade svar.
-   ✍️ **Loggning av övningar:** Inkluderar `"activations"`, live-interaktioner och AI-baserade analyser.
-   🤝 **Framtida funktioner:** Sociala interaktioner och coachverktyg.

> **📝 OBS:** För närvarande är Firebase `Firestore` *inte* implementerat i backend. Datalagring sker temporärt i en in-memory dictionary (`call_status`). Strukturen nedan är dock utformad för att passa `Firestore` när det implementeras.

För en bredare översikt av projektet, se [`Projektbeskrivning: Inner Journey`](#).

## 🗂️ Samlingar & Fält (Firestore Struktur)

Nedan beskrivs de planerade samlingarna (`collections`) och deras fält i `Firestore`.

### 👤 Samling: `users`

**Beskrivning:** Huvudsamling för användarprofiler.

**Dokument-ID:** Användarens UID (planerat från `Firebase Auth`, för tillfället `userId` som genereras av backend).

**Fält:**

-   `userId`: `String` - Unik identifierare (t.ex. `"abc123"`).
-   `birthDate`: `String` - Födelsedatum i ISO 8601-format (t.ex. `"1990-05-15"`). Används för astrologi och numerologi.
-   `birthTime`: `String` - Födelsetid (t.ex. `"14:30"`). Används för astrologi (ascendant).
-   `birthLocation`: `String` - Födelseort (t.ex. `"Stockholm, Sweden"`). Används för astrologi (ascendant).
-   `phoneNumber`: `String` - Verifierat telefonnummer (t.ex. `"+447418631211"`).
-   `createdAt`: `Timestamp` - Tidsstämpel för när användaren registrerades.
-   `uiStyle`: `String` - Användarens valda UI-tema (t.ex. `"clean"`, `"technical"`, `"professional"`).
-   `focusArea`: `String` - Primärt mål från onboarding (t.ex. `"stress_relief"`, `"focus"`, `"self_awareness"`).
-   `timeCommitment`: `Number` - Önskad tid per dag i minuter (t.ex. `5`, `15`, `30`).
-   `personalityType`: `Object` - Genererad personlighetsprofil:
    -   `traits`: `Array` - Egenskaper baserade på talfrågor (t.ex. `["introvert", "intuitive"]`).
    -   `astroSign`: `String` - Soltecken från `birthDate` (t.ex. `"Taurus"`).
    -   `lifePathNumber`: `Number` - Livsvägstal från `birthDate` (numerologi) (t.ex. `7`).
-   `neuroTendencies`: `Object` - Indikatorer baserade på onboarding-svar:
    -   `adhdScore`: `Number` - Poäng (0-10) baserat på svar (t.ex. rutinpreferens).
    -   `autismScore`: `Number` - Poäng (0-10) baserat på svar (t.ex. fokus/stimuli).
-   `wellbeingFlags`: `Object` - Välmåendemarkörer baserade på onboarding-svar:
    -   `depressionRisk`: `Boolean` - Flagg från svar om hopplöshet.
    -   `suicideRisk`: `Boolean` - Flagg från svar om livsförändring.
-   `answers`: `Array` - Rådata från onboarding-frågor (t.ex. `[{"q1": "Draining"}, {"q2": "One task"}]`).

**💡 Flexibilitet:** Kan utökas med fält som `moonSign`, `risingSign`, `progressLevel`, eller `achievementPoints`.

### 💪 Samling: `exercises`

**Beskrivning:** Fördefinierade övningar (`activations`) i appen.

**Dokument-ID:** Unikt ID för övningen (t.ex. `"hemisync_001"`, `"silent_eye_contact_001"`).

**Fält:**

-   `title`: `String` - Övningens titel (t.ex. `"The Sound of You"`, `"Tyst Ögonkontakt Live"`).
-   `type`: `String` - Typ av övning (t.ex. `"audio"`, `"video+text"`, `"live_interaction"`, `"ai_assessment"`).
-   `description`: `String` - Kort introduktion (t.ex. `"A 10-min guided Hemisync meditation"`).
-   `duration`: `Number` - Ungefärlig varaktighet i minuter (t.ex. `10`, `5`, `3`).
-   `mediaUrl`: `String` - Länk till mediafil i Firebase Storage (t.ex. ljudfil, video). Kan vara `null` för live- eller AI-övningar.
-   `category`: `String` - Kategori för övningen (t.ex. `"awareness"`, `"social"`, `"physical"`).

**💡 Flexibilitet:** Kan utökas med fält som `difficulty`, `tags`, eller `prerequisites`.

### 📝 Samling: `user_exercises`

**Beskrivning:** Loggar användares framsteg och reflektioner kopplade till specifika övningar.

**Dokument-ID:** Kombination av användar-UID och övnings-ID (t.ex. `"abc123_hemisync_001"`).

**Fält:**

-   `userId`: `String` - Referens till `users` samlingen.
-   `exerciseId`: `String` - Referens till `exercises` samlingen.
-   `completedAt`: `Timestamp` - Tidsstämpel för när övningen slutfördes.
-   `log`: `Object` - Användarens reflektion och loggdata:
    -   `text`: `String` (valfritt) - Skriven reflektion (t.ex. `"Felt connected after eye contact"`).
    -   `audioUrl`: `String` (valfritt) - Länk till ljudlogg i Firebase Storage (planerat).
    -   `videoUrl`: `String` (valfritt) - Länk till videologg i Firebase Storage (planerat).
    -   `aiAnalysis`: `Object` (valfritt) - Resultat från AI-analys (t.ex. balanspoäng, rapport).
-   `sessionId`: `String` (valfritt) - Referens till `live_sessions` om övningen var en live-interaktion.
-   `status`: `String` - Status för övningen (t.ex. `"in_progress"`, `"completed"`).

**💡 Flexibilitet:** Kan utökas med fält som `rating`, `moodBefore`, eller `moodAfter`.

### 👥 Samling: `live_sessions`

**Beskrivning:** Hanterar data för live-interaktioner mellan användare (t.ex. för övningen `"Tyst Ögonkontakt Live"`).

**Dokument-ID:** Unikt ID för sessionen (t.ex. `"live123"`).

**Fält:**

-   `participants`: `Array` - Lista med `userId` för deltagande användare (t.ex. `["abc123", "uid456"]`).
-   `startTime`: `Timestamp` - När sessionen startade.
-   `endTime`: `Timestamp` - När sessionen avslutades.
-   `exerciseId`: `String` - Referens till den associerade övningen i `exercises` (t.ex. `"silent_eye_contact_001"`).
-   `reflections`: `Array` - Samling av deltagarnas reflektioner efter sessionen:
    -   `userId`: `String` - Användarens ID.
    -   `text`: `String` - Användarens skriftliga reflektion (t.ex. `"Kände ett lugn"`).

**💡 Flexibilitet:** Kan utökas med fält som `sessionRecording` (länk till inspelning) eller `technicalStatus`.

### ✅ Samling: `consents`

**Beskrivning:** Lagrar GDPR-samtycken för spårbarhet.

**Dokument-ID:** Användarens UID (`userId`).

**Fält:**

-   `userId`: `String` - Referens till `users` samlingen.
-   `agreedAt`: `Timestamp` - När samtycket gavs.
-   `version`: `String` - Version av användarvillkor/integritetspolicy som godkändes (t.ex. `"v1.0"`).

### 📞 Samling: `sessions`

**Beskrivning:** Hanterar temporär samtalsstatus (ersätter den nuvarande in-memory `call_status`-dictionaryn när `Firestore` implementeras).

**Dokument-ID:** Unikt `sessionId` (t.ex. `"abc123"`).

**Fält:**

-   `sessionId`: `String` - Unik identifierare för sessionen.
-   `callStatus`: `Object` - Aktuell status för samtalet (t.ex. `{"verificationCode": "123456", "status": "active"}`).
-   `userId`: `String` - Referens till den associerade användaren i `users`.

## 📊 Exempeldata

Nedan visas exempel på hur data kan se ut i de olika samlingarna.

### `users`

```json
{
  "userId": "firebase-uid-123",
  "birthDate": "1988-12-06",
  "birthTime": "14:30",
  "birthLocation": "Stockholm, Sweden",
  "phoneNumber": "+46701234567",
  "createdAt": "2025-03-24T10:00:00Z",
  "uiStyle": "clean",
  "focusArea": "stress_relief",
  "timeCommitment": 15,
  "personalityType": {
    "traits": ["introvert", "intuitive"],
    "astroSign": "Taurus",
    "lifePathNumber": 7
  },
  "neuroTendencies": {
    "adhdScore": 3,
    "autismScore": 2
  },
  "wellbeingFlags": {
    "depressionRisk": false,
    "suicideRisk": false
  },
  "answers": [{"q1": "Draining"}, {"q2": "One task"}]
}
```

### `exercises`

```json
{
  "exerciseId": "hemisync_001",
  "title": "The Sound of You",
  "type": "audio",
  "description": "A 10-min guided Hemisync meditation",
  "duration": 10,
  "mediaUrl": "[länk till ljudfil, planerat]",
  "category": "awareness"
}
```

### `user_exercises`

```json
{
  "userExerciseId": "abc123_hemisync_001",
  "userId": "firebase-uid-123",
  "exerciseId": "hemisync_001",
  "completedAt": "2025-03-24T10:30:00Z",
  "log": {
    "text": "I felt calm and focused after the meditation."
  },
  "status": "completed"
}
```

### `live_sessions`

```json
{
  "sessionId": "live123",
  "participants": ["abc123", "uid456"],
  "startTime": "2025-03-24T11:00:00Z",
  "endTime": "2025-03-24T11:05:00Z",
  "exerciseId": "silent_eye_contact_001",
  "reflections": [
    {"userId": "abc123", "text": "Kände ett lugn"},
    {"userId": "uid456", "text": "Lite obekvämt men intressant"}
  ]
}
```

### `consents`

```json
{
  "userId": "firebase-uid-123",
  "agreedAt": "2025-03-24T10:05:00Z",
  "version": "v1.0"
}
```

### `sessions`

```json
{
  "sessionId": "abc123",
  "callStatus": {
    "verificationCode": "123456",
    "status": "active"
  },
  "userId": "firebase-uid-123"
}
```

## ✏️ Datainmatning & Användning

### 🌱 Onboarding

-   Fält som `birthDate`, `birthTime`, `birthLocation`, och `phoneNumber` från `Steg 1-2` sparas i samlingen `users`.
-   Talbaserade svar från `Steg 3` analyseras för att fylla `personalityType`, `neuroTendencies`, `wellbeingFlags`, och `answers` i `users`.
-   Samtycke från `Steg 2` sparas i samlingen `consents` (se [`Onboarding-process`](#)).

### 💪 Övningar (`activations`)

-   Samlingen `exercises` fylls med fördefinierat innehåll (se [`Activations: Inner Journey`](#)).
-   Samlingen `user_exercises` skapas/uppdateras när användare slutför övningar, inklusive loggar eller AI-resultat.
-   Samlingen `live_sessions` skapas när en live-interaktionsövning startar och uppdateras med deltagare och reflektioner.

### 📞 Samtalsstatus

-   Samlingen `sessions` lagrar temporär data under samtalet (ersätter nuvarande `call_status`-dictionary när `Firestore` implementeras).

## 💻 Teknisk Implementering

### 🔥 Firebase Setup

-   **Firestore:** Används för datalagring (samlingar).
-   **Storage:** Planeras för lagring av mediafiler (ljud/video).
-   **Auth:** Planeras för användarhantering och autentisering.

### 🐍 Backend-skript (`FastAPI`)

-   Python-logik i `FastAPI` används för analys av `birthDate` och `birthTime` (astrologi, numerologi via `Flatlib`) för att fylla `personalityType`.

### 🤖 AI-analys

-   Onboarding-svar processas av backend-logik för att generera `personalityType` och `neuroTendencies`.
-   Framtida "Balans och Kroppsanalys"-övning kommer att använda en extern AI-tjänst för rörelseanalys (ej implementerat).

### 🎬 Live-interaktioner

-   Integration med en videotjänst (t.ex. `WebRTC`) krävs för övningar som "Tyst Ögonkontakt Live" (ej implementerat).

### 🔄 Synkronisering

-   Realtidsuppdateringar via `Firestore` (med lyssnare i frontend) kommer att användas för att visa framsteg och sessionstatus (när implementerat).

## 🛡️ Säkerhet & GDPR

-   🔒 **Kryptering:** Data i vila (`data at rest`) krypteras automatiskt av `Firestore` (standardfunktion).
-   🔑 **Åtkomstkontroll:** Endast autentiserade användare ska kunna nå sina egna data via `Firebase Auth` och `Firestore`-säkerhetsregler (planerat).
-   🗑️ **Radering:** Funktion för kontoradering ska implementeras för att rensa all relaterad data i `users`, `user_exercises`, `live_sessions`, och `consents`.
-   ⏳ **Lagringstid för Loggar:** Ljud-/videologgar i `Firebase Storage` bör raderas efter en definierad policy (t.ex. 90 dagar) om ej förnyat samtycke (planerat).
-   För mer detaljer om säkerhetsåtgärder, se [`Säkerhetsdokument`](#).

## 🔗 Koppling till Övriga Dokument

Denna databasstruktur stödjer funktioner och krav beskrivna i följande dokument:

-   [`Projektbeskrivning: Inner Journey`](#): Möjliggör personalisering, loggning av övningar och live-interaktioner.
-   [`Användargränssnitt: Inner Journey`](#): Levererar data för UI-teman (`uiStyle`), visning av övningar och hantering av live-sessioner.
-   [`Utvecklingsplan: Inner Journey`](#): Implementation av databasinteraktioner sker enligt plan, t.ex. grundläggande setup (`Sprint 1`), övningar (`Sprint 4`), live/AI (`Sprint 5`).
-   [`Onboarding-process`](#): Lagrar indata från onboarding-stegen (`Steg 1-3`) och resultat från nya övningsloggar.