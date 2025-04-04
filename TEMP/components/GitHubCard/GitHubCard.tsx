// docs/src/components/GitHubCard/GitHubCard.tsx
import React, { useState } from 'react';
import Modal from 'react-modal';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import clsx from 'clsx';
import {
    FaRegClock, FaCheckSquare, FaCog, FaGlasses, FaCheckCircle, FaLightbulb, FaFireAlt,
    FaExclamationTriangle, FaMapPin, FaArrowsAlt, FaClock, FaUserFriends, FaCalendarAlt,
    FaFlagCheckered, FaRocket, FaTag, FaUser, FaUsers, FaUserTie, FaLink, FaGithub,
    FaSitemap, FaCodeBranch, FaDollarSign, FaUniversity, FaShieldAlt, FaExternalLinkAlt,
    FaEdit, FaTimes, FaTags, FaPaperclip, FaComments, FaListOl, FaClipboardList, FaAlignLeft,
    FaCalendarDay, FaCalendarWeek, FaTasks, FaInfoCircle, FaThumbsUp, FaExclamationCircle,
    FaQuestionCircle, FaBan, FaCheck, FaBalanceScale
} from 'react-icons/fa';
import styles from './githubCard.module.css';

// Kör setAppElement endast på klientsidan
if (typeof window !== 'undefined') {
    Modal.setAppElement('#__docusaurus');
}

// Definiera typer för ProjectItem och relaterade gränssnitt
interface Assignee {
    login: string;
}

interface Repository {
    nameWithOwner: string;
    url?: string;
}

interface Milestone {
    title: string;
}

interface Iteration {
    title: string;
}

interface ParentIssue {
    title: string;
    url?: string;
}

interface PullRequest {
    nodes?: Array<{ id: string }>;
}

type Status = 'Backlog' | 'Ready' | 'In progress' | 'In review' | 'Done' | 'Ideas';
type Priority = 'P0' | 'P1' | 'P2';
type Size = 'XS' | 'S' | 'M' | 'L' | 'XL';
type Moscow = 'Must have' | 'Should have' | 'Could have' | "Won't have";

interface ProjectItem {
    title: string;
    objective?: string;
    description?: string;
    url?: string;
    discussionUrl?: string;
    status?: Status;
    priority?: Priority;
    size?: Size;
    estimate?: number;
    team?: string;
    moscow?: Moscow;
    assignees?: { nodes?: Assignee[] };
    reviewers?: { nodes?: Assignee[] };
    labels?: string[];
    startDate?: string;
    endDate?: string;
    deadline?: string;
    iteration?: Iteration;
    milestone?: Milestone;
    releaseVersion?: string;
    repository?: Repository;
    parentIssue?: ParentIssue;
    dependencies?: string;
    linkedPullRequests?: PullRequest;
    stakeholder?: string;
    userValue?: number;
    financialImpact?: number;
    fundingSource?: string;
    risk?: string;
    quarter?: string;
    ideaStatus?: string;
}

interface GitHubCardProps {
    card: ProjectItem;
}

// --- Metadata Pill Komponent ---
interface MetadataPillProps {
    icon?: React.ReactNode;
    text: string | number;
    title?: string;
    colorClass?: string;
}

const MetadataPill: React.FC<MetadataPillProps> = ({ icon, text, title, colorClass }) => (
    <span className={clsx(styles.metadataPill, colorClass)} title={title}>
    {icon && <span className={styles.pillIcon}>{icon}</span>}
        {text}
  </span>
);

// --- Förbättrad MetaDataItem för Modal ---
interface MetaDataItemProps {
    icon: React.ReactNode;
    label: string;
    value?: string | number | null;
    children?: React.ReactNode;
    className?: string;
    isLink?: boolean;
}

const MetaDataItem: React.FC<MetaDataItemProps> = ({ icon, label, value, children = null, className = '', isLink = false }) => {
    if ((value === null || typeof value === 'undefined' || value === '') && !children) return null;

    return (
        <div className={clsx(styles.metaItem, className)}>
            <span className={styles.metaIcon} title={label}>{icon}</span>
            <div className={styles.metaContent}>
                <span className={styles.metaLabel}>{label}</span>
                <span className={styles.metaValue}>
          {isLink && typeof value === 'string' ? (
              <a href={value} target="_blank" rel="noopener noreferrer" className={styles.metaValueLink}>
                  {value.includes('/') ? value.substring(value.lastIndexOf('/') + 1) || value : value}
              </a>
          ) : (
              value != null ? String(value) : ''
          )}
                    {children}
        </span>
            </div>
        </div>
    );
};

// --- Helper för att formatera valuta ---
const formatCurrency = (value: number | undefined | null): string | null => {
    if (value == null) return null;
    return new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
};

const GitHubCard: React.FC<GitHubCardProps> = ({ card }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        if (card) setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

    // --- Ikonmappningar & Klassfunktioner ---
    const statusIcons: Record<Status, React.ReactNode> = {
        'Backlog': <FaRegClock />,
        'Ready': <FaCheckSquare />,
        'In progress': <FaCog />,
        'In review': <FaGlasses />,
        'Done': <FaCheckCircle />,
        'Ideas': <FaLightbulb />,
    };

    const priorityIcons: Record<Priority, React.ReactNode> = {
        'P0': <FaFireAlt />,
        'P1': <FaExclamationTriangle />,
        'P2': <FaMapPin />,
    };

    const sizeIcon = <FaArrowsAlt />;
    const estimateIcon = <FaClock />;
    const teamIcon = <FaUserFriends />;

    const priorityClasses: Record<Priority, string> = {
        'P0': styles.priorityPillP0,
        'P1': styles.priorityPillP1,
        'P2': styles.priorityPillP2,
    };

    const sizeClasses: Record<Size, string> = {
        'XS': styles.sizePill,
        'S': styles.sizePill,
        'M': styles.sizePill,
        'L': styles.sizePillXL,
        'XL': styles.sizePillXL,
    };

    const estimateClass = styles.estimatePill;
    const teamClass = styles.teamPill;

    const modalStatusIcons: Record<Status, React.ReactNode> = {
        'Backlog': <FaRegClock />,
        'Ready': <FaClipboardList />,
        'In progress': <FaCog className={styles.spin} />,
        'In review': <FaGlasses />,
        'Done': <FaCheckCircle />,
        'Ideas': <FaLightbulb />,
    };

    const modalPriorityIcons: Record<Priority, React.ReactNode> = {
        'P0': <FaFireAlt style={{ color: 'var(--ifm-color-danger)' }} />,
        'P1': <FaExclamationTriangle style={{ color: 'var(--ifm-color-warning)' }} />,
        'P2': <FaInfoCircle style={{ color: 'var(--ifm-color-info)' }} />,
    };

    const modalMoscowIcons: Record<Moscow, React.ReactNode> = {
        'Must have': <FaExclamationCircle style={{ color: 'var(--ifm-color-danger)' }} />,
        'Should have': <FaCheck style={{ color: 'var(--ifm-color-warning)' }} />,
        'Could have': <FaThumbsUp style={{ color: 'var(--ifm-color-success)' }} />,
        "Won't have": <FaBan style={{ color: 'var(--ifm-color-secondary-darkest)' }} />,
    };

    if (!card) {
        console.warn("GitHubCard mottog ingen card prop.");
        return null;
    }

    // Funktion för att rendera kortets innehåll
    const renderCardContent = () => (
        <div className={styles.card} onClick={openModal} role="button" tabIndex={0} onKeyPress={(e) => e.key === 'Enter' && openModal()}>
            <div className={styles.cardHeader}>
                <div className={styles.cardTitleWrap}>
                    {card.status && statusIcons[card.status] && (
                        <span className={styles.statusIndicator} title={`Status: ${card.status}`}>
              {statusIcons[card.status]}
            </span>
                    )}
                    <h3 className={styles.cardTitle}>{card.title || "Namnlöst Kort"}</h3>
                </div>
                {card.url && (
                    <a
                        href={card.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.editIconLink}
                        title="Visa på GitHub"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <FaExternalLinkAlt />
                    </a>
                )}
            </div>
            <p className={styles.cardObjective}>{card.objective || 'Inget mål angivet'}</p>
            <div className={styles.cardData}>
                {card.priority && priorityIcons[card.priority] && (
                    <MetadataPill
                        icon={priorityIcons[card.priority]}
                        text={card.priority}
                        title={`Prioritet: ${card.priority}`}
                        colorClass={priorityClasses[card.priority] || styles.priorityOther}
                    />
                )}
                {card.size && (
                    <MetadataPill
                        icon={sizeIcon}
                        text={card.size}
                        title={`Storlek: ${card.size}`}
                        colorClass={sizeClasses[card.size] || styles.sizePill}
                    />
                )}
                {card.estimate != null && (
                    <MetadataPill
                        icon={estimateIcon}
                        text={`${card.estimate} h`}
                        title={`Uppskattning: ${card.estimate} timmar`}
                        colorClass={estimateClass}
                    />
                )}
                {card.team && (
                    <MetadataPill
                        icon={teamIcon}
                        text={card.team}
                        title={`Team: ${card.team}`}
                        colorClass={teamClass}
                    />
                )}
            </div>
        </div>
    );

    // Funktion för att rendera modalens innehåll
    const renderModalContent = () => (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            className={styles.modalV2}
            overlayClassName={styles.modalOverlayV2}
            contentLabel={`Detaljer för ${card.title || "Kort"}`}
        >
            {/* --- Modal Header --- */}
            <div className={styles.modalHeaderV2}>
                <div className={styles.modalHeaderMain}>
                    {card.moscow && modalMoscowIcons[card.moscow] && (
                        <span
                            className={clsx(styles.modalMoscowIndicator, styles[`moscow${card.moscow.replace(/\s+/g, '')}`])}
                            title={`MoSCoW: ${card.moscow}`}
                        >
              {modalMoscowIcons[card.moscow]}
            </span>
                    )}
                    <h2 className={styles.modalTitleV2}>{card.title || "Namnlöst Kort"}</h2>
                </div>
                <div className={styles.modalHeaderActions}>
                    {card.url && (
                        <a
                            href={card.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.modalGitHubButton}
                            title="Visa/Redigera på GitHub"
                        >
                            <FaGithub /> GitHub
                        </a>
                    )}
                    <button onClick={closeModal} className={styles.modalCloseButtonV2} aria-label="Stäng">
                        <FaTimes />
                    </button>
                </div>
            </div>
            {/* --- Modal Body --- */}
            <div className={styles.modalBodyV2}>
                {/* Vänster Kolumn */}
                <div className={styles.modalMainContentV2}>
                    {card.objective && (
                        <div className={styles.modalSectionV2}>
                            <h3 className={styles.sectionTitleV2}>
                                <FaTag /> Mål (Objective)
                            </h3>
                            <p className={styles.objectiveTextV2}>{card.objective}</p>
                        </div>
                    )}
                    <div className={styles.modalSectionV2}>
                        <h3 className={styles.sectionTitleV2}>
                            <FaAlignLeft /> Beskrivning & Underuppgifter
                        </h3>
                        <div className={styles.markdownContentV2}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{card.description || '*Ingen beskrivning*'}</ReactMarkdown>
                        </div>
                    </div>
                    {card.discussionUrl && (
                        <div className={styles.modalSectionV2}>
                            <a
                                href={card.discussionUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.discussionLink}
                            >
                                <FaComments /> Visa Diskussionstråd
                            </a>
                        </div>
                    )}
                </div>
                {/* Höger Kolumn (Sidebar) */}
                <div className={styles.modalSidebarV2}>
                    <div className={styles.modalSectionV2}>
                        <h3 className={styles.sectionTitleV2}>
                            <FaClipboardList /> Status & Detaljer
                        </h3>
                        <MetaDataItem
                            icon={card.status ? modalStatusIcons[card.status] : <FaQuestionCircle />}
                            label="Status"
                            value={card.status}
                        />
                        <MetaDataItem
                            icon={card.priority ? modalPriorityIcons[card.priority] : <FaQuestionCircle />}
                            label="Prioritet"
                            value={card.priority}
                        />
                        <MetaDataItem icon={<FaArrowsAlt />} label="Storlek" value={card.size} />
                        <MetaDataItem icon={<FaClock />} label="Uppskattning" value={card.estimate ? `${card.estimate}h` : null} />
                        <MetaDataItem icon={<FaTags />} label="Etiketter" value={card.labels?.join(', ')} />
                    </div>
                    <div className={styles.modalSectionV2}>
                        <h3 className={styles.sectionTitleV2}>
                            <FaCalendarAlt /> Tidslinje & Kontext
                        </h3>
                        <MetaDataItem icon={<FaCalendarDay />} label="Startdatum" value={card.startDate} />
                        <MetaDataItem icon={<FaCalendarWeek />} label="Slutdatum" value={card.endDate} />
                        <MetaDataItem icon={<FaCalendarWeek />} label="Deadline" value={card.deadline} />
                        <MetaDataItem icon={<FaFlagCheckered />} label="Iteration" value={card.iteration?.title} />
                        <MetaDataItem icon={<FaRocket />} label="Milestone" value={card.milestone?.title} />
                        <MetaDataItem icon={<FaPaperclip />} label="Release" value={card.releaseVersion} />
                        <MetaDataItem
                            icon={<FaGithub />}
                            label="Repository"
                            value={card.repository?.nameWithOwner}
                            isLink={!!card.repository?.url}
                        />
                        <MetaDataItem
                            icon={<FaSitemap />}
                            label="Parent"
                            value={card.parentIssue?.title}
                            isLink={!!card.parentIssue?.url}
                        />
                        <MetaDataItem icon={<FaCodeBranch />} label="Dependencies" value={card.dependencies} />
                        <MetaDataItem
                            icon={<FaCodeBranch />}
                            label="Pull Requests"
                            value={card.linkedPullRequests?.nodes?.length ? `${card.linkedPullRequests.nodes.length} st` : 'Inga'}
                        />
                    </div>
                    <div className={styles.modalSectionV2}>
                        <h3 className={styles.sectionTitleV2}>
                            <FaUsers /> Personer & Team
                        </h3>
                        <MetaDataItem icon={<FaUserFriends />} label="Team" value={card.team} />
                        <MetaDataItem
                            icon={<FaUsers />}
                            label="Tilldelade"
                            value={card.assignees?.nodes?.map(a => a.login).join(', ')}
                        />
                        <MetaDataItem
                            icon={<FaGlasses />}
                            label="Granskare"
                            value={card.reviewers?.nodes?.map(r => r.login).join(', ')}
                        />
                        <MetaDataItem icon={<FaUserTie />} label="Intressent" value={card.stakeholder} />
                    </div>
                    <div className={styles.modalSectionV2}>
                        <h3 className={styles.sectionTitleV2}>
                            <FaBalanceScale /> Värde & Påverkan
                        </h3>
                        <MetaDataItem icon={<FaThumbsUp />} label="Användarvärde" value={card.userValue ? ` ${card.userValue} / 5` : null} />
                        <MetaDataItem icon={<FaDollarSign />} label="Påverkan (SEK)" value={formatCurrency(card.financialImpact)} />
                        <MetaDataItem icon={<FaUniversity />} label="Finansiering" value={card.fundingSource} />
                        <MetaDataItem icon={<FaShieldAlt />} label="Risk" value={card.risk} />
                        <MetaDataItem icon={<FaCalendarAlt />} label="Kvartal" value={card.quarter} />
                    </div>
                    {card.ideaStatus && (
                        <div className={styles.modalSectionV2}>
                            <h3 className={styles.sectionTitleV2}>
                                <FaLightbulb /> Idéstatus
                            </h3>
                            <MetaDataItem icon={<FaInfoCircle />} label="Status (Idé)" value={card.ideaStatus} />
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );

    return (
        <>
            {renderCardContent()}
            {isModalOpen && renderModalContent()}
        </>
    );
};

export default GitHubCard;