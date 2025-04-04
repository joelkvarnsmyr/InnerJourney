// docs/src/pages/boards/status/index.tsx
import React from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './status.module.css'; // Importera Status-specifika stilar
import useGroupedGitHubData from '../../../hooks/useGroupedGitHubData'; // Samma hook!
import GitHubCard from '../../../components/GitHubCard/GitHubCard'; // Samma kortkomponent
import { ProjectItem } from '../../../api/api';

// Definiera Status-kategoriernas ordning och namn
// (Matcha nycklarna i defaultCategoryLists i hooken)
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
    // *** ANVÄND HOOKEN med 'status' som argument ***
    const { data: groupedData, loading, error } = useGroupedGitHubData('status');

    // Hantera laddning och fel (Samma som MoscowPage)
    if (loading) { return <Layout title="Status Board" description="Laddar..."><div className="container padding-vert--lg" style={{textAlign: 'center'}}>Laddar projektdata...</div></Layout>; }
    if (error) { return <Layout title="Fel" description="Fel vid laddning"><div className="container padding-vert--lg"><Heading as="h1" style={{textAlign: 'center'}}>Ett fel inträffade</Heading><p style={{textAlign: 'center'}}>{error}</p></div></Layout>; }
    // if (!groupedData || Object.keys(groupedData).length === 0) { /* Tomt meddelande? */ }

    return (
        <Layout
            title="Status Board" // Anpassad titel
            description="Funktioner och uppgifter grupperade efter deras nuvarande status." // Anpassad beskrivning
        >
            <div className={styles.statusBoardTheme}> {/* Egen tema-klass */}
                <div className={styles.pageHeader}>
                    <Heading as="h1">Status Board</Heading>
                    <p>Denna tavla visar uppgifter grupperade efter status (Idé, Backlog, Klar, etc.).</p>
                </div>

                <main className={styles.statusBoardGrid}>
                    {/* Loopa igenom DEFINIERADE statuskategorier för ordning */}
                    {statusCategories.map((category) => {
                        const cardsInCategory = groupedData[category] || [];
                        // Skapa en CSS-vänlig klass från statusnamnet
                        const statusClass = category.toLowerCase().replace(/\s+/g, ''); // t.ex. 'inprogress', 'inreview'

                        return (
                            <div key={category} className={styles.statusColumn}>
                                <Heading
                                    as="h2"
                                    // Sätt basklass och dynamisk statusklass
                                    className={clsx(
                                        styles.categoryHeader, // Basklass för alla rubriker
                                        styles[`status${statusClass}`] // Specifik klass, t.ex. styles.statusinprogress
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
                                            // Här kan vi dölja status-pillret/ikonen på kortet
                                            // eftersom alla i kolumnen har samma status.
                                            // Detta kräver att GitHubCard stödjer en sådan prop.
                                            // viewOptions={{ showStatusPill: false }}
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