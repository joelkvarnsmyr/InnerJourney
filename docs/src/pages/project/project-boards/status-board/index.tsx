// src/pages/project/project-boards/status-board/index.tsx
import React from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './status-board.module.css';
import { useGroupedGitHubData } from '../../../../hooks/useGroupedGitHubData';
import GitHubCard from '../../../../components/GitHubCard/GitHubCard';
import ProjectSummary from '../../../../components/ProjectSummary/ProjectSummary'; // Ny import
import { ProjectItem } from '../../../api/api';

// Definiera Status-kategoriernas ordning och namn
const statusCategories: string[] = [
    'Ideas',
    'Backlog',
    'Ready',
    'In progress',
    'In review',
    'Done',
];

export default function StatusBoardPage(): ReactNode {
    const { data: groupedData, loading, error } = useGroupedGitHubData('status');

    if (loading) {
        return (
            <Layout title="Status Board" description="Laddar...">
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
            title="Status Board"
            description="Funktioner och uppgifter grupperade efter deras nuvarande status."
        >
            <div className={styles.statusBoardTheme}>
                <div className={styles.pageHeader}>
                    <Heading as="h1">Status Board</Heading>
                    <p>Denna tavla visar uppgifter grupperade efter status (Idé, Backlog, Klar, etc.).</p>
                </div>

                {/* Lägg till ProjectSummary här */}
                <ProjectSummary groupedData={groupedData} groupBy="status" />

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