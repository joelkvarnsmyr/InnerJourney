// docs/src/pages/project/project-boards/ideas-board/index.tsx
import React from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './ideas-board.module.css';
import { useGroupedGitHubData } from '../../../../hooks/useGroupedGitHubData';
import GitHubCard from '../../../../components/GitHubCard/GitHubCard';
import { ProjectItem } from '../../../../api/api';

// Definiera Ideas-kategoriernas ordning och namn (baserat på de nya ideaStatus-värdena)
const ideaCategories: string[] = [
    'New Idea',
    'Under Discussion',
    'Evaluated',
    'Accepted',
    'Rejected',
];

export default function IdeasBoardPage(): ReactNode {
    // Använd hooken med 'ideaStatus' som argument för att gruppera efter idéstatus
    const { data: groupedData, loading, error } = useGroupedGitHubData('ideaStatus');

    // Hantera laddning och fel
    if (loading) {
        return (
            <Layout title="Ideas Board" description="Laddar...">
                <div className="container padding-vert--lg" style={{ textAlign: 'center' }}>
                    Laddar idédata...
                </div>
            </Layout>
        );
    }
    if (error) {
        return (
            <Layout title="Fel" description="Fel vid laddning">
                <div className="container padding-vert--lg">
                    <Heading as="h1" style={{ textAlign: 'center' }}>
                        Ett fel inträffade
                    </Heading>
                    <p style={{ textAlign: 'center' }}>{error}</p>
                    <p style={{ textAlign: 'center' }}>
                        Kontrollera att backend-tjänsten körs och är nåbar.
                    </p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout
            title="Ideas Board"
            description="En översikt över idéer för Inner Journey, grupperade efter status."
        >
            <div className={styles.ideasBoardTheme}>
                <div className={styles.pageHeader}>
                    <Heading as="h1">Ideas Board</Heading>
                    <p>En plats för att utforska och diskutera nya idéer för Inner Journey.</p>
                </div>

                <main className={styles.ideasBoardGrid}>
                    {ideaCategories.map((category) => {
                        const cardsInCategory = groupedData[category] || [];
                        const ideaClass = category.toLowerCase().replace(/\s+/g, '');

                        return (
                            <div key={category} className={styles.ideasColumn}>
                                <Heading
                                    as="h2"
                                    className={clsx(
                                        styles.categoryHeader,
                                        styles[`idea${ideaClass}`]
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
                                        />
                                    ))}
                                    {cardsInCategory.length === 0 && (
                                        <p className={styles.noCards}>Inga idéer i denna kategori.</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </main>
            </div>
        </Layout>
    );
}