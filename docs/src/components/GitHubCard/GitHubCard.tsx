// docs/src/components/GitHubCard/GitHubCard.tsx
import React, { useState } from 'react';
import Modal from 'react-modal';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';
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
import { ProjectItem } from '../../api/api'; // Importera det nya interfacet

// Kör setAppElement endast på klientsidan
if (typeof window !== 'undefined') {
    Modal.setAppElement('#__docusaurus');
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

const GitHubCard: React.FC<{ card: ProjectItem }> = ({ card }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // --- Ikonmappningar & Klassfunktioner ---
    const statusIcons: Record<string, React.ReactNode> = {
        'Backlog': <FaRegClock />,
        'Ready': <FaCheckSquare />,
        'In progress': <FaCog />,
        'In review': <FaGlasses />,
        'Done': <FaCheckCircle />,
        'Ideas': <FaLightbulb />,
    };

    const priorityIcons: Record<string, React.ReactNode> = {
        'P0': <FaFireAlt />,
        'P1': <FaExclamationTriangle />,
        'P2': <FaMapPin />,
    };

    const sizeIcon = <FaArrowsAlt />;
    const estimateIcon = <FaClock />;
    const teamIcon = <FaUserFriends />;

    const priorityClasses: Record<string, string> = {
        'P0': styles.priorityPillP0,
        'P1': styles.priorityPillP1,
        'P2': styles.priorityPillP2,
    };

    const sizeClasses: Record<string, string> = {
        'XS': styles.sizePill,
        'S': styles.sizePill,
        'M': styles.sizePill,
        'L': styles.sizePillXL,
        'XL': styles.sizePillXL,
    };

    const estimateClass = styles.estimatePill;
    const teamClass = styles.teamPill;

    const modalStatusIcons: Record<string, React.ReactNode> = {
        'Backlog': <FaRegClock />,
        'Ready': <FaClipboardList />,
        'In progress': <FaCog className={styles.spin} />,
        'In review': <FaGlasses />,
        'Done': <FaCheckCircle />,
        'Ideas': <FaLightbulb />,
    };

    const modalPriorityIcons: Record<string, React.ReactNode> = {
        'P0': <FaFireAlt style={{ color: 'var(--ifm-color-danger)' }} />,
        'P1': <FaExclamationTriangle style={{ color: 'var(--ifm-color-warning)' }} />,
        'P2': <FaInfoCircle style={{ color: 'var(--ifm-color-info)' }} />,
    };

    const modalMoscowIcons: Record<string, React.ReactNode> = {
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
                        <span className={styles.statusIndicator} title={card.status}>
                            {statusIcons[card.status]}
                        </span>
                    )}
                    <h3 className={styles.cardTitle}>{card.title || translate({ id: 'githubCard.untitled', message: 'Untitled Card' })}</h3>
                </div>
                {card.url && (
                    <a
                        href={card.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.editIconLink}
                        title={translate({ id: 'githubCard.viewOnGitHub', message: 'View on GitHub' })}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <FaExternalLinkAlt />
                    </a>
                )}
            </div>
            <p className={styles.cardObjective}>{card.objective || translate({ id: 'githubCard.noObjective', message: 'No objective specified' })}</p>
            <div className={styles.cardData}>
                {card.priority && priorityIcons[card.priority] && (
                    <MetadataPill
                        icon={priorityIcons[card.priority]}
                        text={card.priority}
                        title={card.priority}
                        colorClass={priorityClasses[card.priority] || styles.priorityOther}
                    />
                )}
                {card.size && (
                    <MetadataPill
                        icon={sizeIcon}
                        text={card.size}
                        title={card.size}
                        colorClass={sizeClasses[card.size] || styles.sizePill}
                    />
                )}
                {card.estimate != null && (
                    <MetadataPill
                        icon={estimateIcon}
                        text={`${card.estimate} h`}
                        title={`${card.estimate} hours`}
                        colorClass={estimateClass}
                    />
                )}
                {card.team && (
                    <MetadataPill
                        icon={teamIcon}
                        text={card.team}
                        title={card.team}
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
            contentLabel={translate({ id: 'githubCard.modal.label', message: 'Details for {title}' }, { title: card.title || translate({ id: 'githubCard.untitled', message: 'Untitled Card' }) })}
        >
            <div className={styles.modalHeaderV2}>
                <div className={styles.modalHeaderMain}>
                    {card.moscow && modalMoscowIcons[card.moscow] && (
                        <span
                            className={clsx(styles.modalMoscowIndicator, styles[`moscow${card.moscow.replace(/\s+/g, '')}`])}
                            title={card.moscow}
                        >
                            {modalMoscowIcons[card.moscow]}
                        </span>
                    )}
                    <h2 className={styles.modalTitleV2}>{card.title || translate({ id: 'githubCard.untitled', message: 'Untitled Card' })}</h2>
                </div>
                <div className={styles.modalHeaderActions}>
                    {card.url && (
                        <a
                            href={card.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.modalGitHubButton}
                            title={translate({ id: 'githubCard.viewEditOnGitHub', message: 'View/Edit on GitHub' })}
                        >
                            <FaGithub /> {translate({ id: 'githubCard.github', message: 'GitHub' })}
                        </a>
                    )}
                    <button onClick={closeModal} className={styles.modalCloseButtonV2} aria-label={translate({ id: 'githubCard.close', message: 'Close' })}>
                        <FaTimes />
                    </button>
                </div>
            </div>
            <div className={styles.modalBodyV2}>
                <div className={styles.modalMainContentV2}>
                    {card.objective && (
                        <div className={styles.modalSectionV2}>
                            <h3 className={styles.sectionTitleV2}>
                                <FaTag /> {translate({ id: 'githubCard.modal.objective', message: 'Objective' })}
                            </h3>
                            <p className={styles.objectiveTextV2}>{card.objective}</p>
                        </div>
                    )}
                    <div className={styles.modalSectionV2}>
                        <h3 className={styles.sectionTitleV2}>
                            <FaAlignLeft /> {translate({ id: 'githubCard.modal.description', message: 'Description & Subtasks' })}
                        </h3>
                        <div className={styles.markdownContentV2}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {card.description || translate({ id: 'githubCard.modal.noDescription', message: '*No description*' })}
                            </ReactMarkdown>
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
                                <FaComments /> {translate({ id: 'githubCard.modal.viewDiscussion', message: 'View Discussion Thread' })}
                            </a>
                        </div>
                    )}
                </div>
                <div className={styles.modalSidebarV2}>
                    <div className={styles.modalSectionV2}>
                        <h3 className={styles.sectionTitleV2}>
                            <FaClipboardList /> {translate({ id: 'githubCard.modal.statusDetails', message: 'Status & Details' })}
                        </h3>
                        <MetaDataItem
                            icon={card.status ? modalStatusIcons[card.status] : <FaQuestionCircle />}
                            label={translate({ id: 'githubCard.modal.status', message: 'Status' })}
                            value={card.status}
                        />
                        <MetaDataItem
                            icon={card.priority ? modalPriorityIcons[card.priority] : <FaQuestionCircle />}
                            label={translate({ id: 'githubCard.modal.priority', message: 'Priority' })}
                            value={card.priority}
                        />
                        <MetaDataItem icon={<FaArrowsAlt />} label={translate({ id: 'githubCard.modal.size', message: 'Size' })} value={card.size} />
                        <MetaDataItem icon={<FaClock />} label={translate({ id: 'githubCard.modal.estimate', message: 'Estimate' })} value={card.estimate ? `${card.estimate}h` : null} />
                        <MetaDataItem icon={<FaTags />} label={translate({ id: 'githubCard.modal.labels', message: 'Labels' })} value={card.labels?.join(', ')} />
                    </div>
                    <div className={styles.modalSectionV2}>
                        <h3 className={styles.sectionTitleV2}>
                            <FaCalendarAlt /> {translate({ id: 'githubCard.modal.timeline', message: 'Timeline & Context' })}
                        </h3>
                        <MetaDataItem icon={<FaCalendarDay />} label={translate({ id: 'githubCard.modal.startDate', message: 'Start Date' })} value={card.startDate} />
                        <MetaDataItem icon={<FaCalendarWeek />} label={translate({ id: 'githubCard.modal.endDate', message: 'End Date' })} value={card.endDate} />
                        <MetaDataItem icon={<FaCalendarWeek />} label={translate({ id: 'githubCard.modal.deadline', message: 'Deadline' })} value={card.deadline} />
                        <MetaDataItem icon={<FaFlagCheckered />} label={translate({ id: 'githubCard.modal.iteration', message: 'Iteration' })} value={card.iteration?.title} />
                        <MetaDataItem icon={<FaRocket />} label={translate({ id: 'githubCard.modal.milestone', message: 'Milestone' })} value={card.milestone?.title} />
                        <MetaDataItem icon={<FaPaperclip />} label={translate({ id: 'githubCard.modal.release', message: 'Release' })} value={card.releaseVersion} />
                        <MetaDataItem
                            icon={<FaGithub />}
                            label={translate({ id: 'githubCard.modal.repository', message: 'Repository' })}
                            value={card.repository?.nameWithOwner}
                            isLink={!!card.repository?.url}
                        />
                        <MetaDataItem
                            icon={<FaSitemap />}
                            label={translate({ id: 'githubCard.modal.parent', message: 'Parent' })}
                            value={card.parentIssue?.title}
                            isLink={!!card.parentIssue?.url}
                        />
                        <MetaDataItem icon={<FaCodeBranch />} label={translate({ id: 'githubCard.modal.dependencies', message: 'Dependencies' })} value={card.dependencies} />
                        <MetaDataItem
                            icon={<FaCodeBranch />}
                            label={translate({ id: 'githubCard.modal.pullRequests', message: 'Pull Requests' })}
                            value={card.linkedPullRequests?.nodes?.length ? `${card.linkedPullRequests.nodes.length} st` : translate({ id: 'githubCard.modal.noPullRequests', message: 'None' })}
                        />
                    </div>
                    <div className={styles.modalSectionV2}>
                        <h3 className={styles.sectionTitleV2}>
                            <FaUsers /> {translate({ id: 'githubCard.modal.people', message: 'People & Team' })}
                        </h3>
                        <MetaDataItem icon={<FaUserFriends />} label={translate({ id: 'githubCard.modal.team', message: 'Team' })} value={card.team} />
                        <MetaDataItem
                            icon={<FaUsers />}
                            label={translate({ id: 'githubCard.modal.assignees', message: 'Assignees' })}
                            value={card.assignees?.join(', ')}
                        />
                        <MetaDataItem
                            icon={<FaGlasses />}
                            label={translate({ id: 'githubCard.modal.reviewers', message: 'Reviewers' })}
                            value={card.reviewers?.join(', ')}
                        />
                        <MetaDataItem icon={<FaUserTie />} label={translate({ id: 'githubCard.modal.stakeholder', message: 'Stakeholder' })} value={card.stakeholder} />
                    </div>
                    <div className={styles.modalSectionV2}>
                        <h3 className={styles.sectionTitleV2}>
                            <FaBalanceScale /> {translate({ id: 'githubCard.modal.valueImpact', message: 'Value & Impact' })}
                        </h3>
                        <MetaDataItem icon={<FaThumbsUp />} label={translate({ id: 'githubCard.modal.userValue', message: 'User Value' })} value={card.userValue} />
                        <MetaDataItem icon={<FaDollarSign />} label={translate({ id: 'githubCard.modal.financialImpact', message: 'Impact (SEK)' })} value={formatCurrency(card.financialImpact)} />
                        <MetaDataItem icon={<FaUniversity />} label={translate({ id: 'githubCard.modal.fundingSource', message: 'Funding Source' })} value={card.fundingSource} />
                        <MetaDataItem icon={<FaShieldAlt />} label={translate({ id: 'githubCard.modal.risk', message: 'Risk' })} value={card.risk} />
                        <MetaDataItem icon={<FaCalendarAlt />} label={translate({ id: 'githubCard.modal.quarter', message: 'Quarter' })} value={card.quarter} />
                    </div>
                    {card.ideaStatus && (
                        <div className={styles.modalSectionV2}>
                            <h3 className={styles.sectionTitleV2}>
                                <FaLightbulb /> {translate({ id: 'githubCard.modal.ideaStatus', message: 'Idea Status' })}
                            </h3>
                            <MetaDataItem icon={<FaInfoCircle />} label={translate({ id: 'githubCard.modal.ideaStatusLabel', message: 'Status (Idea)' })} value={card.ideaStatus} />
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