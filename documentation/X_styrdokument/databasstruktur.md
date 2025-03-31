# Databasstruktur

**Version:** 5.0
**Datum:** 2025-03-24
**Författare:** Bo Joel Kvarnsmyr
**Senast reviderad av:** Bo Joel Kvarnsmyr

## Syfte & Översikt

Databasstrukturen för Inner Journey är designad för att lagra och hantera användardata på ett säkert, skalbart och effektivt sätt. Den stödjer appens kärnfunktioner:

-   Personlig profilering baserad på astrologi, numerologi och talbaserade svar.
-   Loggning av övningar (s.k. `"activations"`), inklusive nya typer som live-interaktioner och AI-baserade analyser.
-   Framtida sociala interaktioner och coachverktyg.

För närvarande är Firebase `Firestore` inte implementerat, så datalagring sker temporärt i en in-memory dictionary (`call_status`). Strukturen är dock utformad för att passa `Firestore` när det implementeras.

För en bredare översikt av projektet, se [Projektbeskrivning: Inner Journey](#).

## Samlingar & Fält

### Samling: `users`

**Beskrivning:** Huvudsamling för användarprofiler.

**Dokument-ID:** Användarens UID (planerat från Firebase Auth, för tillfället `userId` som genereras av backend).

**Fält:**
- `userId`: `String` (t.ex. `"abc123"`).
- `birthDate`: `String` (ISO 8601, t.ex. `"1990-05-15"`) – För astrologi och numerologi.
- `birthTime`: `String` (t.ex. `"14:30"`) – För astrologi (ascendant).
- `birthLocation`: `String` (t.ex. `"Stockholm, Sweden"`) – För astrologi (ascendant).
- `phoneNumber`: `String` (t.ex. `"+447418631211"`) – Verifierat nummer.
- `createdAt`: `Timestamp` – Registreringsdatum.
- `uiStyle`: `String` (t.ex. `"clean"`, `"technical"`, `"professional"`) – Valt tema.
- `focusArea`: `String` (t.ex. `"stress_relief"`, `"focus"`, `"self_awareness"`) – Primärt mål från onboarding.
- `timeCommitment`: `Number` (t.ex. `5`, `15`, `30`) – Minuter per dag.
- `personalityType`: `Object` – Personlighetsprofil:
    - `traits`: `Array` (t.ex. `["introvert", "intuitive"]`) – Baserat på talfrågor.
    - `astroSign`: `String` (t.ex. `"Taurus"`) – Soltecken från födelsedatum.
    - `lifePathNumber`: `Number` (t.ex. `7`) – Numerologi från födelsedatum.
- `neuroTendencies`: `Object` – Neurologiska indikatorer:
    - `adhdScore`: `Number` (0-10) – Baserat på svar (t.ex. rutinpreferens).
    - `autismScore`: `Number` (0-10) – Baserat på svar (t.ex. fokus/stimuli).
- `wellbeingFlags`: `Object` – Välmåendemarkörer:
    - `depressionRisk`: `Boolean` – Flagg från svar om hopplöshet.
    - `suicideRisk`: `Boolean` – Flagg från svar om livsförändring.
- `answers`: `Array` – Rådata från 10 onboarding-frågor (t.ex. `[{"q1": "Draining"}, {"q2": "One task"}]`).

**Flexibilitet:** Kan utökas med fält som `moonSign`, `risingSign`, `progressLevel`, eller `achievementPoints`.

### Samling: `exercises`

**Beskrivning:** Fördefinierade övningar (activations) i appen.

**Dokument-ID:** Unikt ID (t.ex. `"hemisync_001"`, `"silent_eye_contact_001"`).

**Fält:**
- `title`: `String` (t.ex. `"The Sound of You"`, `"Tyst Ögonkontakt Live"`).
- `type`: `String` (t.ex. `"audio"`, `"video+text"`, `"live_interaction"`, `"ai_assessment"`).
- `description`: `String` – Kort intro (t.ex. `"A 10-min guided Hemisync meditation"`).
- `duration`: `Number` – Minuter (t.ex. `10`, `5`, `3`).
- `mediaUrl`: `String` – Länk till Firebase Storage (t.ex. ljudfil eller video), `null` för live eller AI-övningar.
- `category`: `String` (t.ex. `"awareness"`, `"social"`, `"physical"`).

**Flexibilitet:** Kan utökas med fält som `difficulty`, `tags`, eller `prerequisites`.

### Samling: `user_exercises`

**Beskrivning:** Användares framsteg och loggar kopplade till övningar.

**Dokument-ID:** Kombination av användar-UID och övnings-ID (t.ex. `"abc123_hemisync_001"`).

**Fält:**
- `userId`: `String` – Referens till `users`.
- `exerciseId`: `String` – Referens till `exercises`.
- `completedAt`: `Timestamp` – När övningen slutfördes.
- `log`: `Object` – Reflektion och loggar:
    - `text`: `String` (valfritt, t.ex. `"Felt connected after eye contact"`).
    - `audioUrl`: `String` (valfritt, länk till ljudlogg i Firebase Storage, planerat).
    - `videoUrl`: `String` (valfritt, länk till videologg i Firebase Storage, planerat).
    - `aiAnalysis`: `Object` (valfritt, för AI-övningar, t.ex. balanspoäng eller rapport).
- `sessionId`: `String` (valfritt, referens till `live_sessions` för live-interaktioner).
- `status`: `String` (t.ex. `"in_progress"`, `"completed"`).

**Flexibilitet:** Kan utökas med `rating`, `moodBefore`, eller `moodAfter`.

### Samling: `live_sessions`

**Beskrivning:** Hanterar live-interaktioner mellan användare (t.ex. `"Tyst Ögonkontakt Live"`).

**Dokument-ID:** Unikt ID för sessionen.

**Fält:**
- `participants`: `Array` av användar-UIDs (t.ex. `["abc123", "uid456"]`).
- `startTime`: `Timestamp` – När sessionen började.
- `endTime`: `Timestamp` – När sessionen slutade.
- `exerciseId`: `String` – Referens till `exercises` (t.ex. `"silent_eye_contact_001"`).
- `reflections`: `Array` av objekt:
    - `userId`: `String` – Användar-UID.
    - `text`: `String` – Reflektion efter sessionen (t.ex. `"Kände ett lugn"`).

**Flexibilitet:** Kan utökas med `sessionRecording` eller `technicalStatus`.

### Samling: `consents`

**Beskrivning:** GDPR-samtycken för spårbarhet.

**Dokument-ID:** Användar-UID.

**Fält:**
- `userId`: `String` – Referens till `users`.
- `agreedAt`: `Timestamp` – När samtycke gavs.
- `version`: `String` (t.ex. `"v1.0"`) – Samtyckesversion.

### Samling: `sessions`

**Beskrivning:** Hanterar samtalsstatus (ersätter temporär `call_status`-dictionary).

**Dokument-ID:** Unikt `sessionId` (t.ex. `"abc123"`).

**Fält:**
- `sessionId`: `String` – Unik identifierare.
- `callStatus`: `Object` – Status för samtalet (t.ex. `{"verificationCode": "123456", "status": "active"}`).
- `userId`: `String` – Referens till `users`.

## Exempeldata

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

## Datainmatning & Användning

### Onboarding
- `birthDate`, `birthTime`, `birthLocation`, och `phoneNumber` från Steg 1-2 sparas i `users`.
- Talbaserade svar från Steg 3 analyseras för att fylla `personalityType`, `neuroTendencies`, `wellbeingFlags`, och `answers`.
- Samtycke från Steg 2 sparas i `consents` (se [Onboarding-process](#)).

### Övningar
- `exercises` fylls med fördefinierat innehåll (se [Activations: Inner Journey](#)).
- `user_exercises` skapas vid slutförande av övningar, med loggar eller AI-resultat.
- `live_sessions` skapas för live-interaktioner med deltagare och reflektioner.

### Samtalsstatus
- `sessions` lagrar temporär data under samtalet (ersätter `call_status`).

## Teknisk Implementering

### Firebase Setup
- `Firestore` för samlingar; `Storage` för media; `Auth` för användarhantering (planerat).

### Skript
- Python i `FastAPI` för analys av `birthDate` och `birthTime` (astrologi, numerologi via `Flatlib`).

### AI-analys
- Onboarding-svar processas för `personalityType` och `neuroTendencies`.
- "Balans och Kroppsanalys" kommer att använda en AI-tjänst för rörelseanalys (ej implementerat).

### Live-interaktioner
- Integration med videotjänst (t.ex. `WebRTC`) för "Tyst Ögonkontakt Live" (ej implementerat).

### Synk
- Realtidsuppdateringar via `Firestore` för framsteg och sessioner (när implementerat).

## Säkerhet & GDPR

-   **Kryptering:** Planerat att kryptera data i vila via Firebase (när implementerat).
-   **Åtkomst:** Endast autentiserade användare kommer att kunna nå sina egna data (när Firebase `Auth` är implementerat).
-   **Radering:** Kontoradering rensar `users`, `user_exercises`, `live_sessions`, och `consents`.
-   **Loggar:** Ljud-/videologgar i Firebase `Storage` raderas efter 90 dagar om ej förnyat samtycke (när implementerat).
-   För mer detaljer om säkerhetsåtgärder, se [Säkerhetsdokument](#).

## Koppling till Övriga Dokument

-   [Projektbeskrivning: Inner Journey](#): Stödjer personalisering, loggning och live-interaktioner.
-   [Användargränssnitt: Inner Journey](#): Levererar data för teman (`uiStyle`), övningsvyer och live-sessioner.
-   [Utvecklingsplan: Inner Journey](#): Uppdateringar i Sprint 1 (setup), Sprint 4 (övningar), Sprint 5 (live/AI).
-   [Onboarding-process](#): Lagrar data från Steg 1-3 och nya övningsloggar.