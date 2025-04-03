// docs/src/components/GitHubCard/GitHubCard.tsx
import { useState } from 'react';
import Modal from 'react-modal';
import ReactMarkdown from 'react-markdown';
import clsx from 'clsx'; // Importera clsx för att hantera flera klasser
import {
    // Importera alla ikoner du behöver...
    FaRegClock, FaCheckSquare, FaCog, FaGlasses, FaCheckCircle, FaLightbulb, FaFireAlt,
    FaExclamationTriangle, FaMapPin, FaCompressArrowsAlt, FaArrowsAlt, FaExpandArrowsAlt,
    FaClock, FaUserFriends, FaCalendarAlt, FaFlagCheckered, FaRocket, FaTag, FaUser, FaUsers,
    FaUserTie, FaLink, FaGithub, FaSitemap, FaCodeBranch, FaDollarSign, FaUniversity,
    FaShieldAlt, FaExternalLinkAlt, FaEdit, FaTimes, FaTags, FaPaperclip, FaComments
} from 'react-icons/fa';
import styles from './githubCard.module.css';
import { ProjectItem } from '../../api/api'; // Justera sökvägen vid behov

// Modal.setAppElement körs bäst globalt eller här med check
if (typeof window !== 'undefined') { Modal.setAppElement('#__docusaurus'); }

interface GitHubCardProps {
    card: ProjectItem;
}

// --- Metadata Pill Komponent (ny) ---
interface MetadataPillProps {
    icon?: React.ReactNode;
    text: string | number;
    title?: string; // Tooltip
    colorClass?: string; // CSS klass för färg (t.ex. styles.priorityP0)
}
const MetadataPill: React.FC<MetadataPillProps> = ({ icon, text, title, colorClass }) => (
    <span className={clsx(styles.metadataPill, colorClass)} title={title}>
        {icon && <span className={styles.pillIcon}>{icon}</span>}
        {text}
    </span>
);
// --- Slut Metadata Pill Komponent ---


const GitHubCard = ({ card }: GitHubCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // --- Ikonmappningar (Kan förenklas om de inte används direkt i kortvyn) ---
    // Behåll om du vill ha statusikonen bredvid titeln
    const statusIcons = {
        'Backlog': <FaRegClock />, 'Ready': <FaCheckSquare />, 'In Progress': <FaCog />,
        'In Review': <FaGlasses />, 'Done': <FaCheckCircle />, 'Ideas': <FaLightbulb />,
    };
    // Ikoner för pills
    const priorityIcons = { 'P0': <FaFireAlt />, 'P1': <FaExclamationTriangle />, 'P2': <FaMapPin /> };
    const sizeIcons = { 'XS': <FaArrowsAlt />, 'S': <FaArrowsAlt />, 'M': <FaArrowsAlt />, 'L': <FaArrowsAlt />, 'XL': <FaArrowsAlt /> }; // Samma ikon för alla storlekar i pill

    // --- Funktioner för att hämta pill-klasser ---
    const getPriorityClass = (priority: string | undefined) => {
        if (!priority) return '';
        switch (priority) {
            case 'P0': return styles.priorityP0;
            case 'P1': return styles.priorityP1;
            case 'P2': return styles.priorityP2;
            default: return styles.priorityOther; // Fallback-klass
        }
    };
    const getSizeClass = (size: string | undefined) => {
        if (!size) return '';
        // Använd samma klass för alla för gul färg, eller differentiera om du vill
        return styles.sizePill;
    };


    return (
        <>
            {/* --- Kortets Synliga Del --- */}
            <div className={styles.card} onClick={openModal} role="button" tabIndex={0} onKeyPress={(e) => e.key === 'Enter' && openModal()}>
                <div className={styles.cardHeader}>
                    {/* Vänster del av headern: Ikon + Titel */}
                    <div className={styles.cardTitleWrap}>
                        {/* Statusikonen från bilden (valfri) */}
                        {card.status && statusIcons[card.status] && (
                            <span className={styles.statusIndicator} title={`Status: ${card.status}`}>
                                {statusIcons[card.status]}
                             </span>
                        )}
                        <h3 className={styles.cardTitle}>
                            {card.title}
                        </h3>
                    </div>
                    {/* Höger del av headern: Edit-länk */}
                    {card.url && (
                        <a
                            href={card.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.editIconLink}
                            title="Visa på GitHub"
                            onClick={(e) => e.stopPropagation()} // Förhindra att modalen öppnas vid klick på ikonen
                        >
                            <FaExternalLinkAlt />
                        </a>
                    )}
                </div>
                {/* Objective-text */}
                <p className={styles.cardObjective}>
                    {card.objective || 'Inget mål angivet'}
                </p>
                {/* Metadata Pills */}
                <div className={styles.cardData}>
                    {card.priority && (
                        <MetadataPill
                            icon={priorityIcons[card.priority]}
                            text={card.priority}
                            title={`Prioritet: ${card.priority}`}
                            colorClass={getPriorityClass(card.priority)}
                        />
                    )}
                    {card.size && (
                        <MetadataPill
                            icon={sizeIcons[card.size]} // Du kan ta bort ikonen om du vill
                            text={card.size}
                            title={`Storlek: ${card.size}`}
                            colorClass={getSizeClass(card.size)}
                        />
                    )}
                    {card.estimate && (
                        <MetadataPill
                            icon={<FaClock />}
                            text={`${card.estimate} h`}
                            title={`Uppskattning: ${card.estimate} timmar`}
                            colorClass={styles.estimatePill}
                        />
                    )}
                    {card.team && (
                        <MetadataPill
                            icon={<FaUserFriends />}
                            text={card.team}
                            title={`Team: ${card.team}`}
                            colorClass={styles.teamPill}
                        />
                    )}
                </div>
            </div>
            {/* --- Slut Kortets Synliga Del --- */}


            {/* === Modal (Samma som tidigare) === */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className={styles.modal}
                overlayClassName={styles.modalOverlay}
                contentLabel={`Detaljer för ${card.title}`}
            >
                {/* Hela modal-innehållet från föregående svar */}
                {/* ... (Modal Header, Modal Body med kolumner, ReactMarkdown etc.) ... */}
                {/* --- Modal Header --- */}
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>{card.title}</h2>
                    <div className={styles.modalActions}>
                        {card.discussionUrl && ( <a href={card.discussionUrl} /*...*/ > <FaComments /> Diskussion </a> )}
                        {card.url && ( <a href={card.url} /*...*/ > <FaGithub /> GitHub </a> )}
                        <button onClick={closeModal} className={styles.modalCloseButton} aria-label="Stäng"> <FaTimes /> </button>
                    </div>
                </div>
                {/* --- Modal Body (med kolumner) --- */}
                <div className={styles.modalBody}>
                    {/* Vänster Kolumn */}
                    <div className={styles.modalMainContent}>
                        {/* Objective & Description (med ReactMarkdown i div) */}
                        {card.objective && ( <div className={styles.modalSection}><h3>Mål (Objective)</h3><p>{card.objective}</p></div> )}
                        <div className={styles.modalSection}><h3>Beskrivning</h3><div className={styles.markdownContent}><ReactMarkdown>{card.description || '*Ingen beskrivning*'}</ReactMarkdown></div></div>
                    </div>
                    {/* Höger Kolumn (Sidebar) */}
                    <div className={styles.modalSidebar}>
                        {/* Detaljer, Tidslinje, Personer, Affärsdata - Använd MetaDataItem */}
                        <div className={styles.modalSection}><h3>Detaljer</h3> {/* ... MetaDataItem för status, prio, size etc ... */} </div>
                        <div className={styles.modalSection}><h3>Tidslinje & Kontext</h3> {/* ... MetaDataItem för datum, iteration etc ... */} </div>
                        <div className={styles.modalSection}><h3>Personer & Team</h3> {/* ... MetaDataItem för team, assignees etc ... */} </div>
                        {/* ... Affärsdata sektion ... */}
                    </div>
                </div>
            </Modal>
            {/* === Slut Modal === */}
        </>
    );
};

// Hjälpfunktion för MetaDataItem (Samma som tidigare)
const MetaDataItem = ({ icon, label, value, isLink = false }) => {
    if (value === null || typeof value === 'undefined' || value === '') return null;
    return ( <div className={styles.metaItem}> {/* ... innehåll ... */} </div> );
};

export default GitHubCard;