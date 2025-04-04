// src/pages/boards/index.tsx
import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import { usePluginData } from '@docusaurus/useGlobalData';
import { FaList, FaSortAmountDown, FaTasks, FaLightbulb, FaQuestionCircle } from 'react-icons/fa';
import styles from './project-boards.module.css';

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