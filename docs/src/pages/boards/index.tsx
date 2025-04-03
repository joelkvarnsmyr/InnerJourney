import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import { FaList, FaSortAmountDown, FaTasks, FaLightbulb } from 'react-icons/fa';  // Importera ikoner
import styles from './boards.module.css';

export default function Index(): ReactNode {
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
                    <Link to="/moscow" className={styles.boardCard}>
                        <div className={styles.boardIcon} style={{ background: '#ff5630' }}>
                            <FaList />
                        </div>
                        <Heading as="h2">MoSCoW Översikt</Heading>
                        <p>Visa prioriterade funktioner grupperade efter MoSCoW-kategorier (Must have, Should have, Could have, Won't have).</p>
                    </Link>
                    <Link to="/prioritizedbacklog" className={styles.boardCard}>
                        <div className={styles.boardIcon} style={{ background: '#36b37e' }}>
                            <FaSortAmountDown />
                        </div>
                        <Heading as="h2">Prioriterad Backlog</Heading>
                        <p>Visa en sorterad lista över prioriterade funktioner, grupperade efter prioritet (P0, P1, P2).</p>
                    </Link>
                    <Link to="/statusboard" className={styles.boardCard}>
                        <div className={styles.boardIcon} style={{ background: '#0052cc' }}>
                            <FaTasks />
                        </div>
                        <Heading as="h2">Status Board</Heading>
                        <p>Visa funktioner grupperade efter status (Backlog, Ready, In progress, etc.).</p>
                    </Link>
                    <Link to="/ideas" className={styles.boardCard}>
                        <div className={styles.boardIcon} style={{ background: '#e67e22' }}>
                            <FaLightbulb />
                        </div>
                        <Heading as="h2">Idéer</Heading>
                        <p>Visa alla idéer för Inner Journey, med filter och sortering efter status, prioritet och team.</p>
                    </Link>
                </main>
            </div>
        </Layout>
    );
}