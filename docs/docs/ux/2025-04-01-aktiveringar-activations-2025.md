---
description: Definierar och beskriver 18 olika `activations` (uppdrag/övningar) inom
  projektet Inner Journey, kategoriserade och specificerade med tekniska detaljer
  och syfte.
id: aktiveringar-activations-2025
sidebar_label: Aktiveringar (Activations)
sidebar_position: 10
slug: aktiveringar-activations-2025
tags:
- activations
- exercises
- ui
- specification
- personal development
title: Aktiveringar (Activations)
---

# ✨ Aktiveringar (Activations)

## 🎯 Syfte och Översikt

Detta dokument definierar och beskriver de olika `activations` (uppdrag/övningar) som finns tillgängliga inom projektet Inner Journey. Dessa `activations` representerar små, hanterbara steg på användarens väg mot personlig och spirituell utveckling.

Genom en blandning av fysiska 🤸‍♂️, sociala 🗣️, meditativa 🧘‍♀️ och AI-drivna 🤖 övningar strävar vi efter att guida användaren på en resa som upplevs både jordnära och meningsfull.

Alla `activations` är utformade för att integreras smidigt med applikationens tekniska plattform och databasstruktur i Google `Firestore` 🔥.

Dokumentet presenterar 18 `activations`, indelade i kategorier som `inner_child`, `manifest`, `shadows`, `brainsync` och `sleep`. Varje `activation` specificeras med följande information:

*   **📌 Titel och beskrivning:** Formulerade för att vara engagerande och lättförståeliga.
*   **💾 Loggtyp:** Anger om loggningen sker via `text` 📝, `video` 📹 eller `audio` 🎙️, beroende på vad som bäst fångar upplevelsen.
*   **⚙️ Tekniska specifikationer:** Tydliga instruktioner och krav för övningen.
*   **📜 Backlog:** Förklarar syfte, motivation, fördelar, mål och träningsområde för övningen.

Användaren loggar sina upplevelser via appens terminalgränssnitt:

*   `text` 📝: För reflektioner, tankar och insikter.
*   `video` 📹: För att dokumentera rörelser eller visuella aspekter av en övning.
*   `audio` 🎙️: För att spela in talade reflektioner eller dialoger.

## 📋 Beskrivning av Aktiveringar

Här följer en detaljerad beskrivning av varje `activation`.

### 👀 Ögonkontakt

*   `activationId`: `eye_contact_001`
*   `title`: "Ögonkontakt"
*   `description`: Sitt framför skärmen och håll ögonkontakt med en annan person i 5 minuter. Prata inte, bara känn vad som händer inom dig. Skriv sen ner dina tankar.
*   `duration`: 5 minuter + tid för reflektion ⏱️
*   `activation_type`: `social` 🗣️
*   `category_id`: `inner_child`
*   `prompt`: Starta videolänken och håll ögonkontakt i 5 minuter. Logga sedan dina känslor.
*   `log_type`: `text` 📝
*   `prerequisite`: Ingen
*   `repetitions`: 1
*   `questions`:
    *   "Vad kände du i kroppen?"
    *   "Kände du en koppling eller obehag?"
*   `ai_assessment`: `False`
*   `coach_approval_required`: `False`
*   `net_enabled`: `True` 🌐
*   `introduction_message`: Förbered dig på att möta någon genom tystnad.
*   `preparation_message`: Se till att ha en stabil uppkoppling och en lugn plats.

#### Backlog
*   **Syfte:** Öva på närvaro och icke-verbal koppling genom ögonkontakt.
*   **Varför:** Bygger komfort med tystnad och stärker förmågan att vara närvarande med andra.
*   **Vad den är bra för:** Förbättrar social medvetenhet och emotionell resiliens.
*   **Vad vi vill att den ska leda till:** En djupare känsla av kontakt utan ord.
*   **Område som tränas:** Social koppling och mental närvaro.

### ☀️ Solhälsningar

*   `activationId`: `sun_salutations_001`
*   `title`: "Morgonhälsning"
*   `description`: Gör 9 solhälsningar varje morgon i 12 dagar. Skriv ner hur du känner dig före och efter varje dag.
*   `duration`: 15-20 minuter per dag ⏱️
*   `activation_type`: `physical` 🤸‍♀️
*   `category_id`: `brainsync`
*   `prompt`: Utför 9 solhälsningar och logga dina känslor.
*   `log_type`: `text` 📝
*   `prerequisite`: Ingen
*   `repetitions`: 12
*   `questions`:
    *   "Hur kändes din kropp efter dagens solhälsningar?"
    *   "Märkte du någon förändring i ditt sinne över tid?"
*   `ai_assessment`: `False`
*   `coach_approval_required`: `False`
*   `net_enabled`: `False`
*   `introduction_message`: Välkommen till en 12-dagars resa med kropp och själ.
*   `preparation_message`: Ha en yogamatta redo och terminalen tillgänglig.

#### Backlog
*   **Syfte:** Bygga fysisk och mental disciplin genom daglig rörelse.
*   **Varför:** Regelbundna solhälsningar synkar kropp och sinne över tid.
*   **Vad den är bra för:** Ökar energi, fokus och kroppsmedvetenhet.
*   **Vad vi vill att den ska leda till:** En rutin som stärker både kropp och sinne.
*   **Område som tränas:** Fysisk uthållighet och mental balans.

### 🖐️ Fingerkoordination

*   `activationId`: `finger_sync_001`
*   `title`: "Synkroniserade Rörelser"
*   `description`: Håll upp händerna framför terminalen och följ instruktionerna för att koordinera fingerrörelser. Rörelserna analyseras via kameran.
*   `duration`: 10 minuter ⏱️
*   `activation_type`: `ai_assessment` 🤖
*   `category_id`: `brainsync`
*   `prompt`: Följ instruktionerna på terminalen och låt kameran registrera dina rörelser.
*   `log_type`: `video` 📹
*   `prerequisite`: Ingen
*   `repetitions`: 1
*   `questions`: *(Inga specifika frågor)*
*   `ai_assessment`: `True` 🤖
*   `coach_approval_required`: `False`
*   `net_enabled`: `False`
*   `introduction_message`: Testa din hjärnas förmåga att synkronisera rörelser.
*   `preparation_message`: Se till att terminalens kamera är på och att du har tillräckligt med ljus.

#### Backlog
*   **Syfte:** Träna hjärnans koordination och motorik.
*   **Varför:** Förbättrar kopplingen mellan hjärna och kropp genom analys av rörelser.
*   **Vad den är bra för:** Ökar finmotorik och mental skärpa.
*   **Vad vi vill att den ska leda till:** Insikt i hjärnans synkroniseringsförmåga.
*   **Område som tränas:** Kognitiv och fysisk koordination.

### 🎧 Hemisync Meditation

*   `activationId`: `hemisync_intro_001`
*   `title`: "Hemisync Discovery"
*   `description`: Sätt på hörlurar och lyssna på en 20-minuters meditation som synkar dina hjärnhalvor. Reflektera sen över hur det kändes.
*   `duration`: 20 minuter ⏱️
*   `activation_type`: `meditation` 🧘‍♀️
*   `category_id`: `sleep` 😴
*   `prompt`: Lyssna på meditationen via terminalen och logga dina tankar efteråt.
*   `log_type`: `text` 📝
*   `prerequisite`: Ingen
*   `repetitions`: 1
*   `questions`:
    *   "Hur kändes det i ditt sinne efter meditationen?"
*   `ai_assessment`: `False`
*   `coach_approval_required`: `False`
*   `net_enabled`: `False`
*   `introduction_message`: Välkommen till en resa in i ditt undermedvetna.
*   `preparation_message`: Använd hörlurar för bästa upplevelse.

#### Backlog
*   **Syfte:** Använda ljud för att balansera hjärnan och främja avslappning.
*   **Varför:** Hemisync-toner hjälper till att synka hjärnhalvorna för djupare lugn.
*   **Vad den är bra för:** Förbättrar sömnkvalitet och mental klarhet.
*   **Vad vi vill att den ska leda till:** Ett lugnare sinne och bättre kontakt med det undermedvetna.
*   **Område som tränas:** Mental avslappning och hjärnsynkronisering.

### 📞 Telefonträning

*   `activationId`: `phone_dialogue_001`
*   `title`: "Rösten Inom"
*   `description`: Ring från terminalen och prata med en AI-agent i 30 minuter om ditt ‘Inner Child’. Låt rösten guida dig och spela in samtalet.
*   `duration`: 30 minuter ⏱️
*   `activation_type`: `ai_assessment` 🤖
*   `category_id`: `inner_child`
*   `prompt`: Ring numret och ha ett samtal med AI-agenten. Samtalet spelas in automatiskt.
*   `log_type`: `audio` 🎙️
*   `prerequisite`: Ingen
*   `repetitions`: 1
*   `questions`: *(Inga specifika frågor)*
*   `ai_assessment`: `True` 🤖
*   `coach_approval_required`: `False`
*   `net_enabled`: `False`
*   `introduction_message`: Övervinn rädslor och möt dig själv genom rösten.
*   `preparation_message`: Ha terminalen redo och testa mikrofonen innan.

#### Backlog
*   **Syfte:** Utforska det inre barnet genom verbal dialog med AI-stöd.
*   **Varför:** Rösten kan låsa upp känslor och minnen kopplade till barndomen.
*   **Vad den är bra för:** Ökar självinsikt och känslomässig bearbetning.
*   **Vad vi vill att den ska leda till:** Djupare förståelse för det inre barnet.
*   **Område som tränas:** Emotionell medvetenhet och självreflektion.

### 🌬️ Grundläggande Breathwork

*   `activationId`: `breathwork_basic_001`
*   `title`: "Andningens Kraft"
*   `description`: Följ en guidad breathwork-övning i terminalen och skriv ner hur det påverkade din energi.
*   `duration`: 15 minuter ⏱️
*   `activation_type`: `meditation` 🧘‍♀️
*   `category_id`: `manifest`
*   `prompt`: Lyssna på ljudfilen och utför övningen. Logga sedan dina känslor.
*   `log_type`: `text` 📝
*   `prerequisite`: Ingen
*   `repetitions`: 1
*   `questions`:
    *   "Hur påverkade andningen din energi?"
*   `ai_assessment`: `False`
*   `coach_approval_required`: `False`
*   `net_enabled`: `False`
*   `introduction_message`: Andas in livet, andas ut spänningar.
*   `preparation_message`: Sitt bekvämt framför terminalen.

#### Backlog
*   **Syfte:** Använda andning för att öka energi och minska stress.
*   **Varför:** Medveten andning är ett enkelt sätt att påverka kropp och sinne positivt.
*   **Vad den är bra för:** Förbättrar energinivåer och emotionell balans.
*   **Vad vi vill att den ska leda till:** En känsla av lätthet och närvaro.
*   **Område som tränas:** Emotionell och fysisk balans.

### 👥 Live Breathwork Ceremoni

*   `activationId`: `breathwork_live_001`
*   `title`: "Andningens Ceremoni"
*   `description`: Delta i en live-streamad breathwork-ceremoni via terminalen. Reflektera över upplevelsen efteråt.
*   `duration`: 45 minuter ⏱️
*   `activation_type`: `live_event` 🔴
*   `category_id`: `manifest`
*   `prompt`: Anslut till live-eventet och följ instruktionerna. Logga dina tankar efteråt.
*   `log_type`: `text` 📝
*   `prerequisite`: `breathwork_basic_001`
*   `repetitions`: 1
*   `questions`:
    *   "Vad upplevde du under ceremonin?"
*   `ai_assessment`: `False`
*   `coach_approval_required`: `False`
*   `net_enabled`: `True` 🌐
*   `event_date`: `2025-04-01 19:00 CET` 📅
*   `event_link`: `[Länk till livestream]` 🔗
*   `introduction_message`: En kollektiv resa genom andningen väntar.
*   `preparation_message`: Ha en stabil internetuppkoppling och sitt bekvämt.

#### Backlog
*   **Syfte:** Fördjupa andningspraktiken i en grupp för kollektiv energi.
*   **Varför:** En gemensam upplevelse förstärker effekten av andning.
*   **Vad den är bra för:** Stärker känsla av gemenskap och emotionell frigörelse.
*   **Vad vi vill att den ska leda till:** En kraftfull känsla av samhörighet och lättnad.
*   **Område som tränas:** Social och emotionell koppling.

### ☯️ Tai Chi/Yoga

*   `activationId`: `tai_chi_flow_001`
*   `title`: "Flödets Dans"
*   `description`: Följ en 30-minuters Tai Chi- eller yoga-sekvens via video i terminalen. Skriv ner hur det kändes i kroppen.
*   `duration`: 30 minuter ⏱️
*   `activation_type`: `physical` 🤸‍♀️
*   `category_id`: `shadows`
*   `prompt`: Följ videon och logga din upplevelse efteråt.
*   `log_type`: `text` 📝
*   `prerequisite`: Ingen
*   `repetitions`: 1
*   `questions`:
    *   "Hur kändes rörelserna i din kropp?"
*   `ai_assessment`: `False`
*   `coach_approval_required`: `False`
*   `net_enabled`: `False`
*   `introduction_message`: Låt kroppen flöda i harmoni med ditt sinne.
*   `preparation_message`: Ha en matta redo och terminalen uppställd.

#### Backlog
*   **Syfte:** Träna kropp och sinne genom mjuka, medvetna rörelser.
*   **Varför:** Tai Chi och yoga balanserar energi och minskar spänningar.
*   **Vad den är bra för:** Ökar rörlighet och inre lugn.
*   **Vad vi vill att den ska leda till:** En känsla av harmoni och fysisk lätthet.
*   **Område som tränas:** Fysisk balans och mental avslappning.

### 👣 Tåslag och Quakers Silence

*   `activationId`: `silence_toes_001`
*   `title`: "Tystnadens Rörelse"
*   `description`: Ligg i sängen och slå tårna mot varandra i 5 minuter, följt av 5 minuters tystnad. Reflektera över vad du hörde och kände.
*   `duration`: 10 minuter (5 min tåslag + 5 min tystnad) ⏱️
*   `activation_type`: `meditation` 🧘‍♀️
*   `category_id`: `sleep` 😴
*   `prompt`: Ligg ner, slå tårna i 5 minuter och lyssna sedan i tystnad i 5 minuter. Logga dina tankar.
*   `log_type`: `text` 📝
*   `prerequisite`: Ingen
*   `repetitions`: 1
*   `questions`:
    *   "Vad hörde du i tystnaden?"
    *   "Hur påverkade tårörelsen ditt sinne?"
*   `ai_assessment`: `False`
*   `coach_approval_required`: `False`
*   `net_enabled`: `False`
*   `introduction_message`: Avsluta dagen med rörelse och tystnad.
*   `preparation_message`: Ha terminalen nära sängen.

#### Backlog
*   **Syfte:** Förbereda kroppen och sinnet för sömn genom rörelse och stillhet.
*   **Varför:** Kombinationen lugnar nervsystemet och ökar medvetenhet.
*   **Vad den är bra för:** Förbättrar sömnkvalitet och avslappning.
*   **Vad vi vill att den ska leda till:** En lugn övergång till vila.
*   **Område som tränas:** Mental avslappning och sömnberedskap.

### 🧸 Inner Child Meditation

*   `activationId`: `inner_child_med_001`
*   `title`: "Mötet med Ditt Inre Barn"
*   `description`: Lyssna på en 36-minuters guidad meditation för att möta och läka ditt inre barn. Skriv ner dina känslor efteråt.
*   `duration`: 36 minuter ⏱️
*   `activation_type`: `meditation` 🧘‍♀️
*   `category_id`: `inner_child`
*   `prompt`: Lyssna på meditationen och logga dina känslor.
*   `log_type`: `text` 📝
*   `prerequisite`: Ingen
*   `repetitions`: 1
*   `questions`:
    *   "Vad kände du när du mötte ditt inre barn?"
    *   "Vilka barndomsminnen dök upp?"
*   `ai_assessment`: `False`
*   `coach_approval_required`: `False`
*   `net_enabled`: `False`
*   `introduction_message`: Välkommen till en resa för att läka det som format dig.
*   `preparation_message`: Använd hörlurar och sitt bekvämt.

#### Backlog
*   **Syfte:** Bearbeta och läka känslor kopplade till barndomen.
*   **Varför:** Att möta det inre barnet kan frigöra gamla blockeringar.
*   **Vad den är bra för:** Ökar självacceptans och emotionell läkning.
*   **Vad vi vill att den ska leda till:** En känsla av frid med det förflutna.
*   **Område som tränas:** Emotionell bearbetning och självmedvetenhet.

### ⛓️ Transcending Limiting Beliefs

*   `activationId`: `limit_beliefs_001`
*   `title`: "Bryta Begränsande Övertygelser"
*   `description`: Följ instruktionerna och besvara AI-frågor för att identifiera och omforma begränsande övertygelser.
*   `duration`: 30 minuter ⏱️
*   `activation_type`: `ai_assessment` 🤖
*   `category_id`: `manifest`
*   `prompt`: Svara på frågorna och logga dina insikter.
*   `log_type`: `text` 📝
*   `prerequisite`: Ingen
*   `repetitions`: 1
*   `questions`:
    *   "Vilken begränsande övertygelse identifierade du?"
    *   "Hur kan du omformulera den till något stärkande?"
*   `ai_assessment`: `True` 🤖
*   `coach_approval_required`: `False`
*   `net_enabled`: `False`
*   `introduction_message`: Släpp det som håller dig tillbaka.
*   `preparation_message`: Sitt vid terminalen redo att reflektera.

#### Backlog
*   **Syfte:** Identifiera och förändra tankemönster som begränsar.
*   **Varför:** Övertygelser formar verkligheten, och omformulering öppnar nya möjligheter.
*   **Vad den är bra för:** Ökar självförtroende och mental frihet.
*   **Vad vi vill att den ska leda till:** En mer positiv och stärkande livssyn.
*   **Område som tränas:** Mental omprogrammering och självförtroende.

### 🕊️ Finding Peace with Your Past

*   `activationId`: `peace_past_001`
*   `title`: "Fred med Ditt Förflutna"
*   `description`: Skriv om hur ditt förflutna har stärkt dig och dela en insikt i 'The Net'.
*   `duration`: 20 minuter ⏱️
*   `activation_type`: `social` 💬
*   `category_id`: `shadows`
*   `prompt`: Skriv om ditt förflutna och dela med `#PeaceWithMyPast`.
*   `log_type`: `text` 📝
*   `prerequisite`: Ingen
*   `repetitions`: 1
*   `questions`:
    *   "Vilken positiv lärdom har ditt förflutna gett dig?"
*   `ai_assessment`: `False`
*   `coach_approval_required`: `False`
*   `net_enabled`: `True` 🌐
*   `introduction_message`: Förvandla ditt förflutna till styrka.
*   `preparation_message`: Ha terminalen redo för att skriva.

#### Backlog
*   **Syfte:** Omforma relationen till det förflutna för att hitta styrka.
*   **Varför:** Att se det positiva i det förflutna minskar dess tyngd.
*   **Vad den är bra för:** Främjar förlåtelse och självacceptans.
*   **Vad vi vill att den ska leda till:** Inre frid och en stärkt självbild.
*   **Område som tränas:** Emotionell läkning och social delning.

### ❤️‍🩹 Somatic Release Breathwork

*   `activationId`: `somatic_breath_001`
*   `title`: "Somatisk Andningsfrigöring"
*   `description`: Delta i en breathwork-session via terminalen för att frigöra trauma. Reflektera över vad du kände i kroppen.
*   `duration`: 45 minuter ⏱️
*   `activation_type`: `live_event` 🔴
*   `category_id`: `shadows`
*   `prompt`: Följ sessionen och logga dina känslor efteråt.
*   `log_type`: `text` 📝
*   `prerequisite`: `peace_past_001`
*   `repetitions`: 1
*   `questions`:
    *   "Vad kände du i kroppen under andningen?"
*   `ai_assessment`: `False`
*   `coach_approval_required`: `False`
*   `net_enabled`: `True` 🌐
*   `event_date`: `2025-04-15 19:00 CET` 📅
*   `event_link`: `[Länk till livestream]` 🔗
*   `introduction_message`: Släpp det som tynger dig.
*   `preparation_message`: Ät lätt innan och ha terminalen redo.

#### Backlog
*   **Syfte:** Frigöra lagrade spänningar och trauman genom andning.
*   **Varför:** Kroppsbaserad andning når djupare än tankar ensamma.
*   **Vad den är bra för:** Minskar fysisk och emotionell stress.
*   **Vad vi vill att den ska leda till:** En känsla av lättnad och frihet.
*   **Område som tränas:** Fysisk och emotionell läkning.

### 🌉 Bridge the Gap (Original)

*   `activationId`: `bridge_gap_001`
*   `title`: "Bygga Bron"
*   `description`: Skriv om din nuvarande och framtida identitet för att se vad som skiljer dem åt.
*   `duration`: 25 minuter ⏱️
*   `activation_type`: `meditation` 🧘‍♀️ (*Obs: Originaltyp var `meditation`, kan behöva ses över*)
*   `category_id`: `manifest`
*   `prompt`: Skriv om din nuvarande och framtida identitet.
*   `log_type`: `text` 📝
*   `prerequisite`: Ingen
*   `repetitions`: 1
*   `questions`:
    *   "Vad skiljer din nuvarande identitet från din framtida?"
*   `ai_assessment`: `False`
*   `coach_approval_required`: `False`
*   `net_enabled`: `False`
*   `introduction_message`: Börja resan mot din högsta potential.
*   `preparation_message`: Sitt vid terminalen med arbetsbladet.

#### Backlog
*   **Syfte:** Skapa medvetenhet om skillnaden mellan nuet och framtida mål.
*   **Varför:** Att kartlägga gapet ger riktning för personlig utveckling.
*   **Vad den är bra för:** Ökar självinsikt och målfokusering.
*   **Vad vi vill att den ska leda till:** Ett tydligt steg mot transformation.
*   **Område som tränas:** Självmedvetenhet och intention.

### 💰 Healing Your Money Mindset

*   `activationId`: `money_mindset_001`
*   `title`: "Läka Ditt Pengasinne"
*   `description`: Lyssna på en guidad meditation för att omforma ditt förhållande till pengar. Skriv ner dina tankar efteråt.
*   `duration`: 30 minuter ⏱️
*   `activation_type`: `meditation` 🧘‍♀️
*   `category_id`: `manifest`
*   `prompt`: Lyssna på meditationen och logga dina reflektioner.
*   `log_type`: `text` 📝
*   `prerequisite`: Ingen
*   `repetitions`: 1
*   `questions`:
    *   "Vilka pengamyter bär du på?"
    *   "Hur kan du välkomna pengar med tacksamhet?"
*   `ai_assessment`: `False`
*   `coach_approval_required`: `False`
*   `net_enabled`: `False`
*   `introduction_message`: Omfamna pengar som en kraft för gott.
*   `preparation_message`: Använd hörlurar med terminalen.

#### Backlog
*   **Syfte:** Förändra negativa tankar om pengar till positiva.
*   **Varför:** Ett sunt pengasinne stödjer personlig frihet och välmående.
*   **Vad den är bra för:** Minskar stress kring ekonomi och ökar tacksamhet.
*   **Vad vi vill att den ska leda till:** Ett positivt förhållningssätt till pengar.
*   **Område som tränas:** Mental omprogrammering och välståndsmedvetenhet.

### 🧭 The Purpose Journey

*   `activationId`: `purpose_journey_001`
*   `title`: "Syftets Resa"
*   `description`: Skriv om din fas i syftets resa och dela dina tankar i 'The Net'.
*   `duration`: 25 minuter ⏱️
*   `activation_type`: `social` 💬
*   `category_id`: `manifest`
*   `prompt`: Skriv om din resa och dela med `#MyPurposeJourney`.
*   `log_type`: `text` 📝
*   `prerequisite`: Ingen
*   `repetitions`: 1
*   `questions`:
    *   "Vilka tecken har lett dig hit?"
    *   "Vilka utmaningar möter du nu?"
*   `ai_assessment`: `False`
*   `coach_approval_required`: `False`
*   `net_enabled`: `True` 🌐
*   `introduction_message`: Upptäck din väg till ett meningsfullt liv.
*   `preparation_message`: Ha terminalen redo för att skriva.

#### Backlog
*   **Syfte:** Reflektera över livets mening och dela med andra.
*   **Varför:** Att artikulera syfte stärker motivation och gemenskap.
*   **Vad den är bra för:** Ökar klarhet kring personliga mål och värderingar.
*   **Vad vi vill att den ska leda till:** En tydligare känsla av riktning i livet.
*   **Område som tränas:** Självreflektion och social koppling.

### 👀 Tyst ögonkontakt live

*   `activationId`: `silent_eye_contact_001`
*   `title`: "Tyst Ögonkontakt Live"
*   `description`: Koppla upp dig live med en annan användare via webbkamera. Sitt tyst och titta på varandra i 5 minuter utan att prata. Skriv sen ner dina tankar i ett separat reflektionssteg.
*   `duration`: 5 minuter + reflektionstid ⏱️
*   `activation_type`: `live_interaction` 🤝
*   `category_id`: `inner_child`
*   `prompt`: Sitt tyst och titta på den andra personen via webbkameran i fem minuter. Prata inte. Logga sen vad du kände.
*   `log_type`: `text` 📝
*   `prerequisite`: Ingen
*   `repetitions`: 1
*   `questions`:
    *   "Vad kände du eller märkte du under övningen?"
*   `ai_assessment`: `False`
*   `coach_approval_required`: `False`
*   `net_enabled`: `True` 🌐
*   `introduction_message`: Förbered dig på att möta en annan person i tystnad – ett kraftfullt sätt att bygga närvaro.
*   `preparation_message`: Se till att ha en stabil uppkoppling och webbkameran på.

#### Backlog
*   **Syfte:** Öva på närvaro och social koppling genom tystnad.
*   **Varför:** Att möta någon i tystnad bygger icke-verbal förståelse och närvaro.
*   **Vad den är bra för:** Förbättrar social medvetenhet och emotionell resiliens.
*   **Vad vi vill att den ska leda till:** En starkare känsla av kontakt utan ord.
*   **Område som tränas:** Social koppling och mental närvaro.

### 🤸‍♀️ Balans och kroppsanalys

*   `activationId`: `balance_body_001`
*   `title`: "Balans och Kroppsanalys"
*   `description`: Ligg på rygg, för benen mot magen, håll i benen och gunga fram och tillbaka i 3 minuter. Rörelsen analyseras via kameran för att ge insikt i kroppens balans och muskelanvändning.
*   `duration`: 3 minuter ⏱️
*   `activation_type`: `ai_assessment` 🤖
*   `category_id`: `brainsync`
*   `prompt`: Ligg på rygg, för benen mot magen och gunga fram och tillbaka. Låt kameran registrera din rörelse.
*   `log_type`: `video` 📹
*   `prerequisite`: Ingen
*   `repetitions`: 1
*   `questions`: *(Inga specifika frågor)*
*   `ai_assessment`: `True` 🤖
*   `coach_approval_required`: `False`
*   `net_enabled`: `False`
*   `introduction_message`: Testa din kropps balans och muskelanvändning.
*   `preparation_message`: Se till att terminalens kamera är på och att du har tillräckligt med utrymme.

#### Backlog
*   **Syfte:** Analysera kroppens balans och muskelanvändning genom rörelse.
*   **Varför:** Ger insikt i fysiska mönster och styrkor/svagheter.
*   **Vad den är bra för:** Förbättrar kroppsmedvetenhet och kan guida fysisk utveckling.
*   **Vad vi vill att den ska leda till:** Tydligare förståelse av kroppens balans.
*   **Område som tränas:** Fysisk balans och kroppsmedvetenhet.

## 🔧 Tekniska detaljer

*   **💻 Terminalen:** Används för att logga upplevelser (`text` 📝, `video` 📹, `audio` 🎙️) och stödjer textinmatning samt användning av kamera 📸 och mikrofon 🎤.
*   **💾 Media:** Ljudfiler för meditationer 🎵 och videofiler för instruktioner 🎬 lagras i Firebase `Storage` och streamas direkt i terminalgränssnittet.
*   **🧠 AI-integration:** Övningar markerade med `ai_assessment: True` 🤖 använder terminalens inbyggda AI-kapacitet för att analysera data (t.ex. rörelser i "Fingerkoordination" och "Balans och kroppsanalys").
*   **🔴 Live-event:** Terminalen hanterar anslutning till livestream-länkar 🔗 för schemalagda `live_event` som "Andningens Ceremoni" och "Somatisk Andningsfrigöring".

## ✅ Slutsats

Detta dokument sammanställer 18 `activations` som utgör kärnan i InnerJourneys övningsbibliotek vid denna tidpunkt. De täcker ett brett spektrum av personlig utveckling, från social koppling och självreflektion till fysisk balans och emotionell läkning.

Varje `activation` är noggrant utformad för att passa appens tekniska ramverk och ge användaren en meningsfull och engagerande upplevelse. Nästa steg involverar implementering av dessa `activations` inom applikationen. 🚀