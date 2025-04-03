# 🧱 Components Mapp (`components/`)

## 🎯 Syfte

Mappen `components/` innehåller återanvändbara UI-komponenter som utgör byggstenarna i ditt gränssnitt. Dessa komponenter ska vara självständiga, modulära och fokuserade på en specifik uppgift, så att de kan återanvändas på flera sidor eller i andra komponenter.

## ⚙️ Hur du använder `components/`

Följ dessa riktlinjer när du arbetar med komponenter i denna mapp:

*   **Skapa nya komponenter:** Placera UI-element som används på mer än en plats (t.ex. en knapp, ett formulär eller en chattbubbla) i denna mapp (`components/`).
*   **Importera komponenter:** Importera dem till sidor eller andra komponenter med:
    ```typescript
    import { Button } from '../components/Button';
    ```
*   **Props:** Designa komponenterna så att de tar emot data via `props` och är så generella som möjligt för att öka återanvändbarheten.
*   **Styling:** Använd `Chakra UI` (eller din valda stylinglösning) för att säkerställa ett konsekvent utseende.

## ✨ Exempel

Här är några exempel på komponenter som kan finnas i denna mapp:

*   `Button.tsx`: En generisk knapp som kan anpassas med `props` som `label` och `onClick`.
*   `ChatMessage.tsx`: En komponent för att visa ett enskilt chattmeddelande i en konversation.
*   `Header.tsx`: En header som visas högst upp på flera sidor.

## 👍 Bästa praxis

För att hålla komponenterna hanterbara och återanvändbara:

*   Håll komponenterna små och fokuserade på en specifik UI-uppgift.
*   Undvik affärslogik här; den hör hemma i `services/` eller custom hooks.
*   Använd `TypeScript` för att definiera `props` och `state` tydligt.