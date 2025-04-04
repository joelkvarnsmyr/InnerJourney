import React from 'react';
import styles from './overviewCard.module.css'; // Ny CSS-fil
import { ProjectItem } from '../../api/api'; // Importera typen

interface OverviewCardProps {
    card: ProjectItem;
    onClick: (card: ProjectItem) => void; // Funktion för att öppna modalen
    // "Slots" för anpassat innehåll från föräldern
    headerContent?: React.ReactNode;
    bodyContent?: React.ReactNode;
    footerContent?: React.ReactNode;
    className?: string; // För extra klasser om det behövs
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
            className={`${styles.card} ${className}`} // Grundstil + ev. extra klass
            onClick={() => onClick(card)}
            role="button"
            tabIndex={0}
            onKeyPress={handleKeyPress}
        >
            {/* Rendera innehållet för varje slot om det finns */}
            {headerContent && <div className={styles.cardHeaderSlot}>{headerContent}</div>}
            {bodyContent && <div className={styles.cardBodySlot}>{bodyContent}</div>}
            {footerContent && <div className={styles.cardFooterSlot}>{footerContent}</div>}
        </div>
    );
};

export default OverviewCard;