import React from 'react'; // Importera React
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
// *** KORREKT CSS-IMPORT FÖR DENNA SIDA ***
import styles from './moscow.module.css';
import getGitHubProjectData from '../../../api/getGitHubProjectData';
import GitHubCard from '../../../components/GitHubCard/GitHubCard'; // Importera kort-komponenten
import { ProjectItem } from '../../../api/api';

export default function MoscowPage(): ReactNode {
    // Hämta data
    const { data, loading, error } = getGitHubProjectData();

    // Hantera laddning och fel
    if (loading) { return <Layout><div className="container padding-vert--lg" style={{textAlign: 'center'}}>Laddar...</div></Layout>; }
    if (error) { return <Layout><div className="container padding-vert--lg" style={{textAlign: 'center'}}>Fel: {error}</div></Layout>; }
    if (!data) { return <Layout><div className="container padding-vert--lg" style={{textAlign: 'center'}}>Ingen data.</div></Layout>; }

    const categories: Array<'Must have' | 'Should have' | 'Could have' | "Won't have"> = ['Must have', 'Should have', 'Could have', "Won't have"];

    return (
        <Layout
            title="MoSCoW Översikt för R1"
            description="Visa prioriterade funktioner för Release 1 av Inner Journey"
        >
            {/* Använd klasser från ./moscow.module.css */}
            <div className={styles.moscowTheme}>
                <div className={styles.pageHeader}>
                    <Heading as="h1">MoSCoW Översikt för R1</Heading>
                    <p>Denna MoSCoW-tavla visar prioriterade funktioner för Release 1 av Inner Journey.</p>
                </div>
                <main className={styles.moscowGrid}>
                    {categories.map((category) => (
                        <div key={category} className={styles.moscowColumn}>
                            <Heading
                                as="h2"
                                className={clsx(
                                    styles.categoryHeader, // Använder Moscow-stil
                                    { // Klasser från Moscow-stil
                                        [styles.mustHave]: category === 'Must have',
                                        [styles.shouldHave]: category === 'Should have',
                                        [styles.couldHave]: category === 'Could have',
                                        [styles.wontHave]: category === "Won't have",
                                    }
                                )}
                            >
                                {category}
                                <span className={styles.count}>({(data[category] || []).length})</span>
                            </Heading>
                            <div className={styles.cardContainer}>
                                {(data[category] || []).map((card) => (
                                    // Rendera GitHubCard-komponenten
                                    <GitHubCard key={card.id} card={card} />
                                ))}
                                {(data[category] || []).length === 0 && <p className={styles.noCards}>Inga kort.</p>}
                            </div>
                        </div>
                    ))}
                </main>
            </div>
            {/* Ingen modal här, den finns i GitHubCard */}
        </Layout>
    );
}

// *** INGEN CSS-KOD SKA FINNAS HÄR NEDANFÖR ***