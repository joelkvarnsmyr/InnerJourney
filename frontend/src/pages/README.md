# Dokumentation för `pages/`-katalogen 📁

## 🎯 Syfte

Mappen `pages/` innehåller React-komponenter som representerar hela sidor eller vyer i din InnerJourney-applikation. Varje fil i denna mapp motsvarar typiskt en specifik route (t.ex. `/home`, `/login`) och fungerar som en primär ingångspunkt för användarens navigering inom appen.

## 🛠️ Användning av `pages/`

Följ dessa riktlinjer när du arbetar med sidkomponenter:

*   **Skapa nya sidor:** För varje ny toppnivå-route i applikationen, skapa en motsvarande komponentfil här (t.ex. `HomePage.tsx`, `UserProfilePage.tsx`).
*   **Routing:** Koppla sidkomponenterna till din routerkonfiguration (oftast i `App.tsx` eller en dedikerad routing-fil). Exempelvis:
    ```typescript jsx
    <Route path="/home" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    ```
*   **State och logik:** Sidkomponenter *kan* innehålla eget state, affärslogik och API-anrop som är specifika för just den sidan.
    *   **Refaktorering:** För att hålla sidkomponenterna rena och fokuserade på layout och sammansättning, överväg att flytta mer komplex state-hantering, affärslogik eller återanvändbara API-anrop till dedikerade `services/` eller anpassade `hooks`.

## 📄 Exempel på sidkomponenter

*   `HomePage.tsx`: Applikationens huvudsakliga startsida efter inloggning.
*   `LoginPage.tsx`: Sidan där användare loggar in eller registrerar sig.
*   `OnboardingPage.tsx`: Sidan (eller sidorna) som guidar nya användare genom introduktionsprocessen.

## ✅ Bästa praxis

*   **En sida per route:** Sträva efter att varje fil i `pages/` motsvarar en unik, navigerbar route i applikationen.
*   **Komponentbaserad uppbyggnad:** Bygg upp sidorna genom att använda och kombinera mindre, återanvändbara komponenter från `components/`-katalogen. Detta främjar modularitet och underhållbarhet.
*   **Fokus på layout:** Sidkomponenternas primära ansvar bör vara att definiera sidans övergripande layout, struktur och vilka underkomponenter som ska visas. Hantera komplex datahämtning och affärslogik i separata moduler (`services`, `hooks`).