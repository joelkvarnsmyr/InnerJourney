// src/components/OverviewCard/overviewCard.tsx
import React from 'react';
import styles from './overviewCard.module.css';
import { ProjectItem } from '../../api/api';

interface OverviewCardProps {
    card: ProjectItem;
    onClick: (card: ProjectItem) => void;
    headerContent?: React.ReactNode;
    bodyContent?: React.ReactNode;
    footerContent?: React.ReactNode;
    className?: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({
                                                       card,
                                                       onClick,
                                                       headerContent,
                                                       bodyContent,
                                                       footerContent,
                                                       className = ''
                                                   }) => {
    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            onClick(card);
        }
    };

    return (
        <div
            className={`${styles.card} ${className}`}
            onClick={() => onClick(card)}
            role="button"
            tabIndex={0}
            onKeyPress={handleKeyPress}
        >
            {headerContent && <div className={styles.cardHeaderSlot}>{headerContent}</div>}
            {bodyContent && <div className={styles.cardBodySlot}>{bodyContent}</div>}
            {footerContent && <div className={styles.cardFooterSlot}>{footerContent}</div>}
        </div>
    );
};

export default OverviewCard;