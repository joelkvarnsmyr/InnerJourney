# Tema-hantering (`/theme/`) 🎨

## Syfte 🎯

Mappen `/theme/` innehåller allt som rör applikationens visuella stil – färger, typsnitt och specifika stilar för UI-komponenter. Syftet är att centralisera temat för att göra det enkelt och konsekvent att uppdatera applikationens utseende.

## Användning 🛠️

Följ dessa steg för att implementera och använda temat:

1.  **Definiera temat:** Skapa och konfigurera din temafil, vanligtvis `theme.ts`. Här definierar du projektets färgpalett, typografi, brytpunkter och eventuella komponent-specifika stilar.
2.  **Koppla till appen:** Importera temat i din applikations rot (ofta `App.tsx` eller motsvarande) och applicera det globalt via `ChakraProvider`. Exempel: `<ChakraProvider theme={theme}>`.
3.  **Använd temavärden:** När du stylar komponenter, referera till värdena som definierats i temat istället för att hårdkoda dem. Exempel: `color='primary'` eller `bg='background'` (om `primary` och `background` är definierade i `theme.colors`).

## Exempel ✨

### `theme.ts`
Ett grundläggande exempel på hur `theme.ts` kan struktureras:

```typescript
// /theme/theme.ts
export const theme = {
  colors: {
    primary: '#4A90E2',      // Exempel primärfärg
    background: '#F5F5F5', // Exempel bakgrundsfärg
  },
  fonts: {
    body: 'Arial, sans-serif', // Exempel typsnitt för brödtext
    // heading: 'Georgia, serif', // Exempel typsnitt för rubriker (kan läggas till)
  },
  // Andra tema-inställningar kan läggas till här (t.ex. breakpoints, component styles)
};
```

### `global.css`
Filen `global.css` (eller motsvarande) kan användas för att definiera globala CSS-regler som kompletterar temat från `Chakra UI`, till exempel grundläggande stilar för `html`, `body` eller specifika CSS-resets.

## Tips för Framgång 🌟

*   **Centralisera:** Håll alla beslut gällande visuell stil samlade inom `/theme/` för en tydlig överblick och enklare underhåll.
*   **Använd variabler:** Referera konsekvent till temats variabler i dina komponentstilar (t.ex. `color: theme.colors.primary` eller via Chakras prop-syntax `color='primary'`). Detta gör applikationen enklare att skala och anpassa visuellt.
*   **Var konsekvent:** Sträva efter ett minimalistiskt och enhetligt uttryck genom hela applikationen för bästa användarupplevelse.