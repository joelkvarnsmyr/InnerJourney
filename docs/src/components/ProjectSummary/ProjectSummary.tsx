// src/components/ProjectSummary/ProjectSummary.tsx
import React from 'react';
import { GroupedData } from '../../hooks/useGroupedGitHubData';
import { summarizeProjectProgress } from '../../utils/projectUtils';
import styles from './ProjectSummary.module.css';

interface ProjectSummaryProps {
    groupedData: GroupedData;
    groupBy: 'status' | 'moscow'; // Begränsa till de två huvudsakliga grupperingsnycklarna för nu
}

const ProjectSummary: React.FC<ProjectSummaryProps> = ({ groupedData, groupBy }) => {
    const summary = summarizeProjectProgress(groupedData, groupBy);

    return (
        <div className={styles.summaryContainer}>
            <h2 className={styles.summaryTitle}>Project Progress Overview</h2>
            <div className={styles.summaryStats}>
                <div className={styles.statItem}>
                    <span className={styles.statLabel}>Total Items:</span>
                    <span className={styles.statValue}>{summary.totalItems}</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statLabel}>Completed:</span>
                    <span className={styles.statValue}>{summary.completedItems} ({summary.completionPercentage}%)</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statLabel}>In Progress:</span>
                    <span className={styles.statValue}>{summary.inProgressItems}</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statLabel}>Backlog:</span>
                    <span className={styles.statValue}>{summary.backlogItems}</span>
                </div>
            </div>
            <h3 className={styles.breakdownTitle}>Category Breakdown</h3>
            <ul className={styles.breakdownList}>
                {Object.entries(summary.categoryBreakdown).map(([category, count]) => (
                    <li key={category} className={styles.breakdownItem}>
                        <span className={styles.categoryName}>{category}:</span>
                        <span className={styles.categoryCount}>{count}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectSummary;