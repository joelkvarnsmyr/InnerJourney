import React, { useMemo } from 'react'; // Importera useMemo
// ... andra importer ...
import getGitHubProjectData from '../../../api/getGitHubProjectData'; // Den befintliga hooken
import { ProjectItem } from '../../../api/api';

const statusCategories: { name: string; id: string }[] = [ /* ... definition ... */ ];

interface GroupedByStatusData {
    [key: string]: ProjectItem[];
}

export default function StatusBoardPage(): ReactNode {
    // Hämta den MoSCoW-grupperade datan
    const { data: moscowData, loading, error } = getGitHubProjectData();

    // Gruppera om datan efter Status med useMemo för prestanda
    const statusData = useMemo<GroupedByStatusData>(() => {
        if (!moscowData || loading || error) return {}; // Returnera tomt om ingen data

        const grouped: GroupedByStatusData = {};
        // Initiera alla statuskategorier
        statusCategories.forEach(cat => { grouped[cat.name] = []; });
        grouped['Uncategorized'] = []; // Lägg till fallback

        // Loopa igenom alla items från moscowData och gruppera om
        Object.values(moscowData).flat().forEach(item => { // Platta ut MoSCoW-datan till en lista
            const statusName = item.status || 'Uncategorized';
            if (!grouped[statusName]) {
                grouped[statusName] = []; // Hantera oväntad status
            }
            grouped[statusName].push(item);
        });
        return grouped;
    }, [moscowData, loading, error]); // Beräkna om när MoSCoW-data ändras

    // Hantera laddning och fel
    if (loading) { /* ... */ }
    if (error) { /* ... */ }
    // Notera: 'data' heter nu 'statusData' i resten av komponenten

    return (
        <Layout /* ... */ >
            <div className={styles.statusBoardTheme}>
                <div className={styles.pageHeader}> /* ... */ </div>
                <main className={styles.statusBoardGrid}>
                    {statusCategories.map((category) => {
                        // Använd statusData här istället för data
                        const cardsInCategory = statusData[category.name] || [];
                        const statusClass = category.name.toLowerCase().replace(/\s+/g, '');

                        return (
                            <div key={category.id} className={styles.statusColumn}>
                                <Heading /* ... className={clsx(..., styles[`status${statusClass}`])} */ >
                                    {category.name}
                                    <span className={styles.count}>({cardsInCategory.length})</span>
                                </Heading>
                                <div className={styles.cardContainer}>
                                    {cardsInCategory.map((card) => (
                                        <GitHubCard key={card.id} card={card} /* showStatusIcon={false} */ />
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