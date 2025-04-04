// docs/src/pages/project/project-boards/moscow-board/index.tsx
import React from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './moscow-board.module.css';
import { useGroupedGitHubData } from '../../../../hooks/useGroupedGitHubData';
import GitHubCard from '../../../../components/GitHubCard/GitHubCard';
import { ProjectItem } from '../../../api/api';

// Definiera MoSCoW-kategoriernas ordning och namn
const moscowCategories: string[] = ['Must have', 'Should have', 'Could have', "Won't have"];

export default function MoscowPage(): ReactNode {
    // Använd hooken med 'moscow' som argument för att gruppera efter MoSCoW
    const { data: groupedData, loading, error } = useGroupedGitHubData('moscow');

    // Hantera laddning och fel
    if (loading) {
        return (
            <Layout title="MoSCoW Översikt" description="Laddar...">
                <div className="container padding-vert--lg" style={{ textAlign: 'center' }}>
                    Laddar projektdata...
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
                        const categoryClass = category.toLowerCase().replace(/[\s']/g, '');

                        return (
                            <div key={category} className={styles.moscowColumn}>
                                <Heading
                                    as="h2"
                                    className={clsx(
                                        styles.categoryHeader,
                                        styles[categoryClass]
                                    )}
                                >
                                    {category}
                                    <span className={styles.count}>({cardsInCategory.length})</span>
                                </Heading>

                                <div className={styles.cardContainer}>
                                    {cardsInCategory.map((card: ProjectItem) => (
                                        <GitHubCard key={card.id} card={card} />
                                    ))}
                                    {cardsInCategory.length === 0 && (
                                        <p className={styles.noCards}>Inga kort.</p>
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