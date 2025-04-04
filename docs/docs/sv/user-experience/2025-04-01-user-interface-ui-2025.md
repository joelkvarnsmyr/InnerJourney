---
description: Beskriver designprinciper, visuella element, struktur och animeringsstrategi
  för Inner Journeys användargränssnitt, inspirerat av appar som Activations och Headspace.
id: anvndargrnssnitt-ui-2025
sidebar_label: Användargränssnitt (UI)
sidebar_position: 10
slug: anvndargrnssnitt-ui-2025
tags:
- ui
- design
- gsap
- frontend
- användargränssnitt
title: Användargränssnitt (UI)
---

# Användargränssnitt (UI) 🎨

Detta dokument beskriver användargränssnittet (UI) för Inner Journey. Designen siktar på en modern, fräsch look inspirerad av appar som `Activations` och `Headspace`, med integration av snygga animeringar via `GSAP` för att skapa en dynamisk och engagerande användarupplevelse, samtidigt som de ursprungliga designprinciperna bibehålls.

*   **Version:** 4.1
*   **Datum:** 2025-03-31
*   **Författare:** Bo Joel Kvarnsmyr
*   **Senast reviderad av:** Bo Joel Kvarnsmyr

## Syfte ✨

Användargränssnittet (GUI/UI) för `Inner Journey` är designat för att vara en förlängning av plattformens kärnvärde: en praktisk, engagerande och personlig självutvecklingsupplevelse.

Målet är att skapa en minimalistisk, intuitiv och flexibel design som gör det enkelt för användare att navigera och fokusera på sin resa, samtidigt som det känns modernt och fräscht.

För en bredare översikt av Inner Journeys vision, se [Projektbeskrivning: Inner Journey](/docs/project/projektbeskrivning-2025).

## Designprinciper 📐

*   🧹 **Minimalism:** Ren layout med fokus på funktionalitet. Inga onödiga dekorationer, men subtila gradienter och mjuka skuggor kan användas för att ge djup, inspirerat av `Activations` och `Headspace`.
*   ⚙️ **Anpassningsbarhet:** UI:t kan skifta stil – från en ljus, luftig design till en mörk, teknisk look – beroende på användarens behov eller profil.
*   🎯 **Tydlighet:** Användaren ska snabbt förstå nästa steg, oavsett om det är att starta en övning, logga en reflektion eller navigera i appen.
*   🔮 **Subtil Mystik:** En hint av intrig (t.ex. genom dynamisk text som `"Processing your input..."` eller en progressiv upplåsning av funktioner) förstärkt med mjuka animeringar för att skapa en känsla av rörelse och liv.
*   ⚖️ **Balans:** Kombination av struktur och luftighet, med en modern touch genom rundade hörn, gradienter och subtila animationer för att undvika både tråkighet och överväldigande komplexitet.

## Visuella Element 🖌️

### Färger 🎨

*   **Basfärger:** Inspirerat av `Activations` och `Headspace`:
    *   Ljusblå bakgrund (`#E6F0FA`) som standard för "Light Mode".
    *   Djup, mörkblå (`#1A2A44`) för "Dark Mode".
*   **Accentfärger:** 🔥
    *   En varm gradient (t.ex. från `#FF6F61` till `#FF9F43`, liknande `Activations`) för knappar, ikoner och framsteg.
    *   Alternativt en dämpad grön (`#00A676`) för en mer subtil känsla. 🌿
*   **Teman:**
    *   ☀️ **Light Mode:** Ljusblå bakgrund, vita kort (`#FFFFFF`) med mjuka skuggor, och gradient-accenter.
    *   🌙 **Dark Mode:** Mörkblå bakgrund, mörkgrå kort (`#2A3B5A`), och samma gradient-accenter för kontrast.

### Typsnitt 📰

*   **Rubriker:** Använd en modern sans-serif som `Inter Bold` (700) (används ofta av `Headspace`) för en ren och samtida känsla.
*   **Brödtext:** `Inter Regular` (400) – lättläst och modern, med en luftig känsla som passar för självutvecklingsappar.
*   **Storlekar:** `18pt` för rubriker, `14pt` för brödtext, `10pt` för sekundär text (t.ex. fotnoter eller statusmeddelanden).

### Ikoner & Grafik ✨

*   **Ikoner:** Fortsätt med enkla, linjebaserade ikoner i monokrom stil (t.ex. från Googles `Material Icons`), men lägg till en subtil gradient-fyllning (t.ex. `#FF6F61` till `#FF9F43`) för ikoner som är i fokus, för att matcha `Activations` estetik.
*   **Grafik:** Små, abstrakta former (cirklar, mjuka linjer) kan användas som bakgrundselement, liknande `Headspace`, för att ge en lekfull men minimalistisk känsla.

## Struktur & Layouter 🧱

### Startsida 🏠

*   Enkel vy med en tydlig uppmaning, t.ex. `"Start Your Journey"` eller `"Continue"`, på ett kort med en mjuk gradient (`#FF6F61` till `#FF9F43`).
*   Subtil animation (t.ex. text som skrivs ut stegvis: `"> Loading your profile..."`) med `GSAP` för att ge en känsla av progression. ⏳
*   Minimal navigering: fem ikoner i en fast bottenmeny (Hem, Övningar, Logg, Socialt, Profil) med en subtil skalningsanimation vid hover/tap. 👆

### Onboarding 🚀

*   Stegvis process inspirerad av `Typeform`: ett steg per skärm (t.ex. `"Enter birth date"`, `"Verify phone"`).
*   Använd `GSAP` för att animera övergångar mellan steg (t.ex. en mjuk fade-in och slide-up för varje nytt steg).
*   Bakgrund med en subtil gradient och små, flytande cirklar (som i `Activations`) som animeras långsamt med `GSAP` för att skapa en dynamisk känsla. 💧
*   Tunn progressbar i accentfärgen som fylls på med en mjuk animation. 📈

### Övningar 🧘

*   Kortliknande layout för varje övning (t.ex. `"Breathing for Focus"`) med rundade hörn och en mjuk skugga. 🃏
*   Tydliga instruktioner, en startknapp med gradient (`#FF6F61` till `#FF9F43`), och en timer – allt på en skärm för enkelhet. ▶️
*   Framsteg visas med en cirkulär mätare som animeras med `GSAP` (t.ex. fylls på gradvis när användaren gör framsteg). 🔄

### Journalföring ✍️

*   En ren texteditor med rundade kanter och alternativ för ljud- eller videoinspelning (ikoner i en tunn verktygsrad). 🎙️📹
*   Subtila prompts från AI, t.ex. `"What did you notice today?"` i grå text, som fade:ar in med `GSAP`. 🤔
*   Spara-knappen animeras med en mjuk skalning och färgskift (från grå till gradient) när text skrivs. ✅

### Socialt Nätverk ("The Net") 💬

*   Chattvy med en lista över kontakter eller grupper, inspirerad av `Superhumans` snabba gränssnitt.
*   Enkel trådstruktur för konversationer, med kort som slide:ar in från höger med `GSAP` vid nya meddelanden. ➡️
*   Subtila gradient-accenter på aktiva chattar för att dra uppmärksamhet. ✨

## Anpassningsbara Teman 🎭

UI:t byggs med dynamiska teman för att matcha olika användarprofiler:

*   🫧 **Clean (Standard):** Ljusblå bakgrund, vita kort, gradient-accenter, fokus på enkelhet. Passar pragmatiska användare eller nybörjare.
*   💻 **Technical:** Mörkblå bakgrund, monospace-text (t.ex. `"Roboto Mono"`), gröna accenter. Inspirerat av terminaler, för teknikvana eller "gamer"-profiler.
*   👔 **Professional:** Gråtoner, strukturerade sektioner, saklig ton. `Nordea`-liknande för användare som vill ha en seriös känsla.

## Animeringsstrategi (med GSAP) ✨

För att ge `Inner Journey` en modern och engagerande känsla, används `GSAP` (GreenSock Animation Platform) för att implementera funktionella och subtila animeringar:

*   💨 **Övergångar:** Mjuka fade-ins och slide-ups för nya skärmar eller element.
    ```javascript
    gsap.from(element, { opacity: 0, y: 20, duration: 0.5 });
    ```
*   🖱️ **Interaktiva element:** Knappar skalas och lyser upp vid hover/tap.
    ```javascript
    gsap.to(button, { scale: 1.05, duration: 0.3 });
    ```
*   🔄 **Progression:** Cirkulära framstegsmätare fylls på gradvis (t.ex. med `GSAP:s` `drawSVG`-plugin för SVG-element).
*   ✨ **Bakgrundselement:** Små cirklar eller former i bakgrunden rör sig långsamt.
    ```javascript
    gsap.to(circle, { x: 20, y: -10, repeat: -1, yoyo: true, duration: 3 });
    ```
*   ✍️ **Dynamisk text:** Text som `"Processing your input..."` skrivs ut stegvis med `GSAP:s` text-plugin för en skrivmaskinseffekt.

## Nästa Steg 🚀

*   🎨 Bygg en uppdaterad `"Clean"`-version med den nya färgpaletten, gradienter och animeringar för att testa användarflödet.
*   🎬 Implementera `GSAP`-animeringar för onboarding, övningar och journalföring i `Sprint 6`.
*   🗣️ Samla feedback från tidiga användare om den nya estetiken, animeringarna och teman, justera därefter.
*   🛠️ Lägg till `"Technical"` och `"Professional"` som valbara teman i `Sprint 7` eller `Sprint 8`.

---

För mer information, se relevanta dokument:

*   [Projektbeskrivning: Inner Journey](/docs/project/projektbeskrivning-2025)
*   [Activations: Inner Journey](/docs/ux/aktiveringar-activations-2025)
*   [Teknisk dokumentation för frontend](/docs/tech-spec/frontend-setup-utveckling-och-deployment-2025)