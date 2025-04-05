// src/utils/projectUtils.ts
import { GroupedData, ProjectItem } from '../hooks/useGroupedGitHubData';

interface ProjectSummary {
    totalItems: number;
    completedItems: number;
    inProgressItems: number;
    backlogItems: number;
    completionPercentage: number;
    categoryBreakdown: { [key: string]: number };
}

/**
 * Sammanfattar projektets framsteg baserat på grupperad GitHub-data
 * @param groupedData - Grupperad data från useGroupedGitHubData
 * @param groupBy - Nyckeln som datan är grupperad efter (t.ex. 'status', 'moscow')
 * @returns Ett objekt med sammanfattad statistik
 */
export function summarizeProjectProgress(groupedData: GroupedData, groupBy: string): ProjectSummary {
    const summary: ProjectSummary = {
        totalItems: 0,
        completedItems: 0,
        inProgressItems: 0,
        backlogItems: 0,
        completionPercentage: 0,
        categoryBreakdown: {},
    };

    // Definiera kategorier baserat på groupBy-nyckeln
    const completedCategories = groupBy === 'status' ? ['Done'] : groupBy === 'moscow' ? ['Must have'] : [];
    const inProgressCategories = groupBy === 'status' ? ['In progress', 'In review'] : groupBy === 'moscow' ? ['Should have'] : [];

    // Räkna items och kategorisera
    Object.entries(groupedData).forEach(([category, items]) => {
        const itemCount = items.length;
        summary.totalItems += itemCount;
        summary.categoryBreakdown[category] = itemCount;

        if (completedCategories.includes(category)) {
            summary.completedItems += itemCount;
        } else if (inProgressCategories.includes(category)) {
            summary.inProgressItems += itemCount;
        } else {
            summary.backlogItems += itemCount;
        }
    });

    // Beräkna procent färdigt
    summary.completionPercentage = summary.totalItems > 0
        ? Math.round((summary.completedItems / summary.totalItems) * 100)
        : 0;

    return summary;
}