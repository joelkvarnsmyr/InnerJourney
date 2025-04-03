# Tjänster (/services/) 🛠️

## Syfte 🎯

Mappen `/services/` är avsedd för affärslogik och kommunikation med backend eller externa tjänster (t.ex. API-anrop). Här samlas funktioner som hämtar eller skickar data, vilket hjälper till att hålla din UI-kod ren och återanvändbar.

## Användning ⚙️

Följ dessa riktlinjer när du arbetar med tjänster:

*   **Lägg till tjänster:** Skapa specifika filer för logik, exempelvis `api.ts` för API-interaktioner eller `auth.ts` för autentisering.
*   **Använd i koden:** Importera nödvändiga funktioner där de behövs i dina komponenter eller sidor, t.ex. `import { fetchData } from '../services/api';`.
*   **Håll det separat:** Sträva efter att flytta komplex logik och datahämtning från UI-komponenter (`.tsx`-filer) till denna mapp för bättre struktur och underhållbarhet.

## Exempelkod ✨

### `api.ts`

Ett exempel på en funktion i `api.ts` för att hämta användardata:

```typescript
export const fetchUserData = async () => {
  const response = await fetch('/api/user');
  // Lägg till felhantering här vid behov
  return response.json();
};
```

### `auth.ts`

Denna fil kan innehålla funktioner som `login()` och `logout()` för att hantera användarautentisering.

## Tips för framgång ✅

*   Använd standardiserade bibliotek som `Axios` eller den inbyggda `Fetch API` för att göra API-anrop på ett konsekvent sätt.
*   Implementera tydlig felhantering, antingen direkt i tjänstefunktionerna eller i de komponenter som anropar dem, för att ge användaren bra feedback vid problem.
*   Håll tjänsterna fokuserade på sin specifika uppgift (t.ex. datahantering, extern kommunikation). Undvik att inkludera UI-specifik logik här.