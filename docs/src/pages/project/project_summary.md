# Projektkontext

**Genererad:** 2025-04-04 16:51:41  
**Rotmapp:** `/home/joelkvarnsmyr/projects/innerjourney/docs/src/pages/project`

## Fil- och Mappstruktur
```
project/
    project-boards/
        status-board/
            index.tsx
            status-board.module.css
        overview/
            index.tsx
            project-boards.module.css
        moscow-board/
            index.tsx
            moscow-board.module.css
```

## Filinnehåll (Max 150 KB per fil)
### `project-boards/status-board/index.tsx`
```tsx
// docs/src/pages/boards/status/index.tsx
import React from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './status.module.css'; // Importera Status-specifika stilar

// *** ENDAST DEN KORREKTA NAMED IMPORTEN ***
import { useGroupedGitHubData } from '../../../hooks/useGroupedGitHubData';

import GitHubCard from '../../../components/GitHubCard/GitHubCard'; // Samma kortkomponent
import { ProjectItem } from '../../../api/api';

// Definiera Status-kategoriernas ordning och namn
const statusCategories: string[] = [
    'Ideas',
    'Backlog',
    'Ready',
    'In progress',
    'In review',
    'Done',
    // 'Okategoriserad' // Lägg till om du vill visa denna
];

export default function StatusBoardPage(): ReactNode {
    // *** Använd hooken med 'status' som argument ***
    const { data: groupedData, loading, error } = useGroupedGitHubData('status');

    // Hantera laddning och fel
    if (loading) { return <Layout title="Status Board" description="Laddar..."><div className="container padding-vert--lg" style={{textAlign: 'center'}}>Laddar projektdata...</div></Layout>; }
    if (error) { return <Layout title="Fel" description="Fel vid laddning"><div className="container padding-vert--lg"><Heading as="h1" style={{textAlign: 'center'}}>Ett fel inträffade</Heading><p style={{textAlign: 'center'}}>{error}</p></div></Layout>; }
    // if (!groupedData || Object.keys(groupedData).length === 0) { /* Tomt meddelande? */ }

    return (
        <Layout
            title="Status Board"
            description="Funktioner och uppgifter grupperade efter deras nuvarande status."
        >
            <div className={styles.statusBoardTheme}>
                <div className={styles.pageHeader}>
                    <Heading as="h1">Status Board</Heading>
                    <p>Denna tavla visar uppgifter grupperade efter status (Idé, Backlog, Klar, etc.).</p>
                </div>

                <main className={styles.statusBoardGrid}>
                    {statusCategories.map((category) => {
                        const cardsInCategory = groupedData[category] || [];
                        const statusClass = category.toLowerCase().replace(/\s+/g, '');

                        return (
                            <div key={category} className={styles.statusColumn}>
                                <Heading
                                    as="h2"
                                    className={clsx(
                                        styles.categoryHeader,
                                        styles[`status${statusClass}`]
                                    )}
                                >
                                    {category}
                                    <span className={styles.count}>({cardsInCategory.length})</span>
                                </Heading>

                                <div className={styles.cardContainer}>
                                    {cardsInCategory.map((card: ProjectItem) => (
                                        <GitHubCard
                                            key={card.id}
                                            card={card}
                                            // viewOptions={{ showStatusPill: false }} // Om du implementerar detta
                                        />
                                    ))}
                                    {cardsInCategory.length === 0 && <p className={styles.noCards}>Inga kort.</p>}
                                </div>
                            </div>
                        );
                    })}
                </main>
            </div>
        </Layout>
    );
}
```

### `project-boards/status-board/status-board.module.css`
```css
/* docs/src/pages/boards/status/status.module.css */

/* --- Grundläggande Sidlayout (Liknar Moscow) --- */
.statusBoardTheme {
    background-color: #f6f8fa;
    color: #1f2328;
    min-height: 100vh;
    padding-bottom: 40px;
}

.pageHeader {
    text-align: center;
    padding: 40px 24px 24px 24px;
    margin-bottom: 16px;
}
.pageHeader h1 { font-size: 2rem; color: #1f2328; margin-bottom: 8px; }
.pageHeader p { font-size: 1rem; color: #57606a; max-width: 700px; margin: 0 auto; }

/* --- Grid för Kolumner (Kan behöva fler kolumner än Moscow) --- */
.statusBoardGrid {
    display: grid;
    /* auto-fit är bra här för att hantera 6+ kolumner */
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); /* Mindre min-bredd? */
    gap: 16px; /* Lite mindre gap? */
    padding: 0 24px;
}

/* --- Kolumn --- */
.statusColumn {
    background: #ffffff; /* Ge kolumnen en svag bakgrund? Eller behåll transparent? */
    border-radius: 8px;
    padding: 12px; /* Padding inuti kolumnen */
    box-shadow: var(--ifm-global-shadow-xs); /* Lätt skugga på kolumnen */
    display: flex;
    flex-direction: column;
}

/* --- Kolumnrubrik (Annan stil än Moscow) --- */
.categoryHeader {
    font-size: 0.95rem; /* Mindre */
    font-weight: 500;
    color: var(--ifm-font-color-secondary); /* Lite ljusare text */
    margin: 0 0 12px 0;
    padding: 6px 8px;
    border-radius: 4px;
    /* Ingen border-left här, använd bakgrund/textfärg för att skilja åt */
    text-align: center; /* Centrera? */
    background-color: var(--ifm-color-emphasis-100); /* Väldigt ljus bakgrund */
}

/* --- Färgkodning för Status-rubriker (Exempel) --- */
/* Anpassa färger för att passa ditt tema */
/* Använd t.ex. bakgrund, textfärg eller en liten prick */
.statusideas { background-color: #f3f3f3; color: #6a737d; }
.statusbacklog { background-color: #f3f3f3; color: #6a737d; }
.statusready { background-color: #dbf4ff; color: #0366d6; }
.statusinprogress { background-color: #fffbdd; color: #5d4a00; }
.statusinreview { background-color: #eedcff; color: #5a32a3; }
.statusdone { background-color: #dafbe1; color: #22863a; }
.statusokategoriserad { background-color: #f6f8fa; color: #6a737d; }


.count {
    font-size: 0.85rem;
    font-weight: normal;
    margin-left: 6px;
    color: var(--ifm-font-color-secondary);
}

/* --- Kortbehållare --- */
.cardContainer {
    display: flex;
    flex-direction: column;
    gap: 10px; /* Mellanrum mellan kort */
    min-height: 100px;
    /* Om kolumnen ska scrolla (istället för sidan): */
    /* overflow-y: auto; */
    /* flex-grow: 1; */
}

.noCards {
    font-size: 0.9rem;
    color: #6a737d;
    padding: 16px;
    text-align: center;
    font-style: italic;
}

/* Ingen specifik kortstyling här - det sköts av GitHubCard */
```

### `project-boards/overview/index.tsx`
```tsx
// src/pages/boards/index.tsx
import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import { usePluginData } from '@docusaurus/useGlobalData';
import { FaList, FaSortAmountDown, FaTasks, FaLightbulb, FaQuestionCircle } from 'react-icons/fa';
import styles from './boards.module.css';

// Typ för datan från pluginet
interface BoardInfo {
    id: string;
    path: string;
    label: string;
    description: string;
    icon: string;
}

interface BoardsData {
    boards: BoardInfo[];
}

// Mappa ikonsträngar till faktiska ikoner
const iconMap = {
    FaList: <FaList />,
    FaSortAmountDown: <FaSortAmountDown />,
    FaTasks: <FaTasks />,
    FaLightbulb: <FaLightbulb />,
    FaQuestionCircle: <FaQuestionCircle />,
};

// Färger för varje board (samma som i den statiska versionen)
const boardColors: { [key: string]: string } = {
    moscow: '#ff5630',
    prioritizedbacklog: '#36b37e',
    status: '#0052cc',
    ideas: '#e67e22',
};

export default function BoardsOverview(): JSX.Element {
    // Hämta global data från pluginet
    const { boards } = usePluginData('docusaurus-plugin-boards-data') as BoardsData;

    return (
        <Layout
            title="Index för Inner Journey"
            description="En översikt över boards för Inner Journey, inklusive MoSCoW-översikt, prioriterad backlog, status-tavla och idéer."
        >
            <div className={styles.boardsTheme}>
                <div className={styles.pageHeader}>
                    <Heading as="h1">Index för Inner Journey</Heading>
                    <p>Välj en board för att se prioriterade funktioner, backlog och idéer för Inner Journey.</p>
                </div>
                <main className={styles.boardsGrid}>
                    {boards && boards.length > 0 ? (
                        boards.map(board => (
                            <Link to={board.path} className={styles.boardCard} key={board.id}>
                                <div
                                    className={styles.boardIcon}
                                    style={{ background: boardColors[board.id] || '#cccccc' }}
                                >
                                    {iconMap[board.icon] || <FaQuestionCircle />}
                                </div>
                                <Heading as="h2">{board.label}</Heading>
                                <p>{board.description}</p>
                            </Link>
                        ))
                    ) : (
                        <p>Inga boards hittades.</p>
                    )}
                </main>
            </div>
        </Layout>
    );
}
```

### `project-boards/overview/project-boards.module.css`
```css
/* Ljus tema-klass för /boards-sidan */
.boardsTheme {
    background-color: #f4f5f7; /* Ljusgrå bakgrund */
    color: #172b4d; /* Mörk text för bättre läsbarhet */
    min-height: 100vh;
    padding: 24px;
}

/* Grid för att visa kort */
.boardsGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    max-width: 1200px;
    margin: 0 auto;
}

/* Kort för varje board */
.boardCard {
    background: #ffffff; /* Vit bakgrund */
    border: 1px solid #dfe1e6; /* Ljusgrå kant */
    border-radius: 8px;
    padding: 24px;
    text-align: center;
    text-decoration: none;
    color: #172b4d;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.boardCard:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}

.boardIcon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    color: #fff;
    font-size: 1.5rem;
    margin: 0 auto;
}

.boardCard h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
}

.boardCard p {
    font-size: 1rem;
    color: #5e6c84;
    margin: 0;
}

/* Sidhuvud */
.pageHeader {
    text-align: center;
    margin-bottom: 32px;
}

.pageHeader h1 {
    font-size: 2rem;
    color: #172b4d;
    margin-bottom: 8px;
}

.pageHeader p {
    font-size: 1rem;
    color: #5e6c84;
}
```

### `project-boards/moscow-board/index.tsx`
```tsx
// docs/src/pages/boards/moscow/index.tsx
import React from 'react'; // Importera React
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './moscow.module.css'; // Moscow sid-layout stilar
import { useGroupedGitHubData } from '../../../hooks/useGroupedGitHubData';
import GitHubCard from '../../../components/GitHubCard/GitHubCard'; // Kortkomponenten
import { ProjectItem } from '../../../api/api'; // Typdefinition

// Definiera Moscow-kategoriernas ordning och namn
const moscowCategories: string[] = ['Must have', 'Should have', 'Could have', "Won't have"];
// const moscowCategories: string[] = ['Must have', 'Should have', 'Could have', "Won't have", 'Okategoriserad']; // Om du vill visa okategoriserade

export default function MoscowPage(): ReactNode {
    // Använd den nya hooken med 'moscow' som argument
    const { data: groupedData, loading, error } = useGroupedGitHubData('moscow');

    // Hantera laddning och fel
    if (loading) { return <Layout title="MoSCoW Översikt" description="Laddar..."><div className="container padding-vert--lg" style={{textAlign: 'center'}}>Laddar projektdata...</div></Layout>; }
    if (error) { return <Layout title="Fel" description="Fel vid laddning"><div className="container padding-vert--lg"><Heading as="h1" style={{textAlign: 'center'}}>Ett fel inträffade</Heading><p style={{textAlign: 'center'}}>{error}</p><p style={{textAlign: 'center'}}>Kontrollera att backend-tjänsten körs och är nåbar.</p></div></Layout>; }
    // if (!groupedData || Object.keys(groupedData).length === 0) { /* Kan visa tomt meddelande, men kolumnerna visas ändå */ }

    return (
        <Layout
            title="MoSCoW Översikt för R1"
            description="Visa prioriterade funktioner för Release 1 av Inner Journey"
        >
            <div className={styles.moscowTheme}>
                <div className={styles.pageHeader}>
                    <Heading as="h1">MoSCoW Översikt för R1</Heading>
                    <p>Denna MoSCoW-tavla visar prioriterade funktioner för Release 1 av Inner Journey.</p>
                </div>

                <main className={styles.moscowGrid}>
                    {moscowCategories.map((category) => {
                        const cardsInCategory = groupedData[category] || [];
                        // *** Generera gemen klass utan mellanslag/apostrof ***
                        const categoryClass = category.toLowerCase().replace(/[\s']/g, '');

                        return (
                            <div key={category} className={styles.moscowColumn}>
                                <Heading
                                    as="h2"
                                    className={clsx(
                                        styles.categoryHeader,
                                        styles[categoryClass] // Använd den genererade klassen (t.ex. styles.musthave)
                                    )}
                                >
                                    {category}
                                    <span className={styles.count}>({cardsInCategory.length})</span>
                                </Heading>

                                <div className={styles.cardContainer}>
                                    {cardsInCategory.map((card: ProjectItem) => (
                                        <GitHubCard key={card.id} card={card} />
                                    ))}
                                    {cardsInCategory.length === 0 && <p className={styles.noCards}>Inga kort.</p>}
                                </div>
                            </div>
                        );
                    })}
                </main>
            </div>
        </Layout>
    );
}
```

### `project-boards/moscow-board/moscow-board.module.css`
```css
/* docs/src/pages/boards/moscow/moscow.module.css */

/* --- Grundläggande Sidlayout --- */
.moscowTheme {
    background-color: #f6f8fa; /* Ljusgrå bakgrund */
    color: #1f2328;
    min-height: 100vh;
    padding-bottom: 40px;
}

.pageHeader {
    text-align: center;
    padding: 40px 24px 24px 24px;
    margin-bottom: 16px;
}
.pageHeader h1 { font-size: 2rem; color: #1f2328; margin-bottom: 8px; }
.pageHeader p { font-size: 1rem; color: #57606a; max-width: 700px; margin: 0 auto; }

/* --- Grid för Kolumner --- */
.moscowGrid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
    gap: 24px;
    padding: 0 24px;
}
@media (max-width: 1200px) { .moscowGrid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) { .moscowGrid { grid-template-columns: 1fr; } }


/* --- Kolumn --- */
.moscowColumn { background: transparent; border-radius: 8px; display: flex; flex-direction: column; }

/* --- Kolumnrubrik (Accentlinje-stil) --- */
.categoryHeader {
    font-size: 1.1rem; font-weight: 600; color: #1f2328;
    margin: 0 0 16px 0; padding: 8px 0 8px 12px;
    border-left: 4px solid; /* Accentlinje */
}

/* --- Klassnamn med GEMENER för accentfärger --- */
.musthave { border-color: #d9363e; }      /* Röd */
.shouldhave { border-color: #f6a13a; }    /* Orange/Gul */
.couldhave { border-color: #1a7f37; }     /* Grön */
.wonthave { border-color: #adb5bd; }      /* Ljusgrå */
/* Eventuell klass för okategoriserade om du lägger till den kolumnen */
/* .okategoriserad { border-color: #e2e8f0; } */

.count { font-size: 0.9rem; font-weight: normal; margin-left: 8px; color: #57606a; }

/* --- Kortbehållare --- */
.cardContainer { display: flex; flex-direction: column; gap: 12px; min-height: 100px; }
.noCards { font-size: 0.9rem; color: #57606a; padding: 16px; text-align: center; font-style: italic; }

/* Kortstyling hanteras av GitHubCard/githubCard.module.css */
```
