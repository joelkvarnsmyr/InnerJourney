// src/i18n/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        lng: 'sv', // Standardspråk (svenska)
        fallbackLng: 'sv', // Om en översättning saknas, används svenska
        ns: [
            'home',               // För index.tsx (hemsidan)
            'project_summary',    // För project_summary.md eller ProjectSummary.tsx
            'for-work',           // För about/for-work/index.tsx
            'coaches',            // För about/coaches/index.tsx
            'investment-opportunities', // För about/investment-opportunities/index.tsx
            'partners-and-team',  // För about/partners-and-team/index.tsx
            'for-school',         // För about/for-school/index.tsx
            'common'              // För gemensamma texter (t.ex. knappar, footer)
        ],
        defaultNS: 'home', // Standard-namespace om inget anges
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json', // Sökväg till JSON-filer
        },
    });

export default i18n;