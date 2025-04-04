# Projektkontext

**Genererad:** 2025-04-04 17:39:26  
**Rotmapp:** `/home/joelkvarnsmyr/projects/innerjourney/docs/src`

## Fil- och Mappstruktur
```
src/
    components/
        OverviewCard/
            overviewCard.module.css
            overviewCard.tsx
        HomepageHeader/
            HomepageHeader.module.css
            index.tsx
        GitHubCard/
            GitHubCard.tsx
            githubCard.module.css
        AnimatedLogo/
            AnimatedLogo.module.css
            AnimatedLogo.tsx
        BlogHighlights/
            BlogHighlights.module.css
            BlogHighlights.tsx
    api/
        api.ts
    pages/
        index.module.css
        index.tsx
        project/
            project_summary.md
            project-boards/
                status-board/
                    index.tsx
                    status-board.module.css
                overview/
                    index.tsx
                    project-boards.module.css
                ideas-board/
                    ideas-board.module.css
                    index.tsx
                moscow-board/
                    index.tsx
                    moscow-board.module.css
        about/
            partners-and-team/
                index.tsx
                partners-and-team.module.css
            for-school/
                for-school.module.css
                index.tsx
            investment-opportunities/
                index.tsx
                investment-opportunities.module.css
            coaches/
                coaches.module.css
                index.tsx
            for-work/
                for-work.module.css
                index.tsx
    hooks/
        useGroupedGitHubData.ts
    css/
        custom.css
    theme/
        NavbarItem/
            index.tsx
```

## Filinnehåll (Max 150 KB per fil)
### `components/OverviewCard/overviewCard.module.css`
```css
/* Grundläggande styling för kortets *skal* */
.card {
    background-color: var(--ifm-card-background-color); /* Använd tema */
    border: 1px solid var(--ifm-toc-border-color); /* Använd tema */
    border-radius: 8px; /* Mer rundning */
    padding: 12px 16px;
    cursor: pointer;
    transition: box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out;
    box-shadow: var(--ifm-global-shadow-xs); /* Tema-skugga */
    display: flex;
    flex-direction: column; /* Stapla slots */
    gap: 8px; /* Mellanrum mellan slots */
}

.card:hover,
.card:focus { /* Lägg till focus-state */
    box-shadow: var(--ifm-global-shadow-lw);
    border-color: var(--ifm-color-primary-light); /* Highlight-ram vid hover/focus */
    outline: none; /* Ta bort ful standard-outline */
}

/* Grundläggande styling för slots (kan justeras) */
.cardHeaderSlot {
    /* t.ex. display: flex; justify-content: space-between; */
}

.cardBodySlot {
    /* t.ex. font-size: 0.9rem; color: var(--ifm-font-color-secondary); */
}

.cardFooterSlot {
    /* t.ex. display: flex; flex-wrap: wrap; gap: 6px; */
}
```

### `components/OverviewCard/overviewCard.tsx`
```tsx
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
```

### `components/HomepageHeader/HomepageHeader.module.css`
```css
/* docs/src/components/HomepageHeader/HomepageHeader.module.css */

.heroBanner {
    padding: 5rem 0;
    text-align: center;
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #ff6f61 0%, #ff9f43 100%);
    color: #2d2d2d;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* Huvudcontainer för hero: Staplar logo, text, knappar vertikalt */
.heroContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 0 1rem;
    /* Ta bort container-stilar som hör till sektioner (vit bakgrund etc.) */
    /* Dessa appliceras via pageStyles.container i index.tsx */
    /* background: none; */ /* Tas bort om inte absolut nödvändigt */
    /* box-shadow: none; */ /* Tas bort om inte absolut nödvändigt */
    /* border-radius: 0; */ /* Tas bort om inte absolut nödvändigt */
    max-width: 1140px; /* Behåll max-bredd om önskvärt */
    margin-left: auto;
    margin-right: auto;
}


/* Hero Text Styling (används via headerStyles.title/subtitle) */
/* Observera: Docusaurus standardklasser .hero__title/.hero_subtitle finns kvar i TSX för grundläggande struktur */
.title {
    color: #2d2d2d;
    font-size: 4rem;
    font-weight: 700;
    margin: 0;
    text-shadow: none;
}

.subtitle {
    color: #2d2d2d;
    font-size: 1.8rem;
    font-weight: 400;
    margin: 0;
    text-shadow: none;
    max-width: 700px;
}

/* Knappar inom headern */
.buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin: 0;
}

.heroButton {
    background: #ffffff;
    color: #ff6f61;
    border: none;
    padding: 1rem 2rem;
    font-weight: 600;
    font-size: 1.1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    cursor: pointer;
}

.heroButton:hover {
    background: #ff9f43;
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.secondaryButton {
    background: transparent;
    color: #2d2d2d;
    border: 2px solid #2d2d2d;
    padding: 1rem 2rem;
    font-weight: 600;
    font-size: 1.1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    cursor: pointer;
}

.secondaryButton:hover {
    background: #ffffff;
    color: #ff6f61;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}


/* --- Media Queries för Header --- */
@media screen and (max-width: 996px) {
    .heroBanner {
        padding: 3rem 1rem;
    }

    .title {
        font-size: 2.8rem;
    }

    .subtitle {
        font-size: 1.4rem;
    }

    .heroContainer {
        gap: 1rem;
    }

    /* Om du vill att loggans storlek *bara* ska ändras i headern */
    /* :global(.logoWrapper) kan behövas om .logoWrapper är i AnimatedLogo.module.css */
    /* .heroContainer :global(.logoWrapper) {
       width: 90px;
       height: 90px;
     } */
    /* Alternativt, låt AnimatedLogo.module.css hantera detta globalt */
}

@media screen and (max-width: 768px) {
    .title {
        font-size: 2.2rem;
    }
    .subtitle {
        font-size: 1.2rem;
    }

    .buttons {
        flex-direction: column;
        gap: 0.8rem;
        width: 100%;
        align-items: center;
    }
    .heroButton, .secondaryButton {
        width: 80%;
        max-width: 300px;
        text-align: center;
    }
}
```

### `components/HomepageHeader/index.tsx`
```tsx
// src/components/BlogHighlights/BlogHighlights.tsx
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { motion } from 'framer-motion';
import { usePluginData } from '@docusaurus/useGlobalData';
import { translate } from '@docusaurus/Translate'; // Importera translate
import styles from './HomepageHeader.module.css';

// --- Animationsvarianter (Behåll från tidigare) ---
const fadeInYProps = (delay = 0, y = 20, duration = 0.6) => ({
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration, delay, ease: 'easeOut' },
});

const sectionTitleProps = {
    initial: { opacity: 0, y: -15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.5, ease: 'easeOut' },
};

const staggerContainerProps = (staggerChildren = 0.1) => ({
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, amount: 0.1 },
    variants: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren, delayChildren: 0.1 } },
    },
});

const itemFadeInProps = {
    variants: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    },
};

const innerItemFadeInProps = (delay = 0) => ({
    variants: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: 'easeOut' } },
    },
});

// Typ för bloggpost-metadata (kan behöva justeras baserat på exakt struktur)
interface BlogPost {
    id: string;
    metadata: {
        permalink: string;
        title: string;
        description: string;
        date: string;
        tags: { label: string; permalink: string }[];
    };
}

interface BlogPluginData {
    posts: BlogPost[];
}

const BlogHighlights: React.FC = () => {
    const blogData = usePluginData('docusaurus-plugin-content-blog') as BlogPluginData;

    const highlightedPosts = blogData?.posts
        ?.filter(post =>
            post.metadata.tags.some(tag => tag.label.toLowerCase() === 'highlights')
        )
        .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime())
        .slice(0, 3) ?? [];

    if (highlightedPosts.length === 0) {
        return null;
    }

    return (
        <motion.section className={styles.blogHighlightsSection} {...fadeInYProps()}>
            <div className="container">
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'blogHighlights.title', message: 'From Our Blog: Featured Insights' })}
                    </Heading>
                </motion.div>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.1)} style={{marginBottom: "3rem"}}>
                    {translate({ id: 'blogHighlights.text', message: 'Explore some of our most-read articles and gain deeper insights into our methodology and vision.' })}
                </motion.p>

                <motion.div className={styles.blogPostPreviewGrid} {...staggerContainerProps(0.1)}>
                    {highlightedPosts.map((post) => (
                        <motion.div key={post.id} className={styles.blogPostPreviewCard} variants={itemFadeInProps} whileHover={{ y: -4, transition:{ duration: 0.2 }}}>
                            <motion.div {...innerItemFadeInProps(0.1)}>
                                <Heading as="h3" className={styles.blogPostPreviewTitle}>
                                    <Link to={post.metadata.permalink}>{post.metadata.title}</Link>
                                </Heading>
                            </motion.div>
                            <motion.p className={styles.blogPostPreviewExcerpt} {...innerItemFadeInProps(0.2)}>
                                {post.metadata.description}
                            </motion.p>
                            <motion.div {...innerItemFadeInProps(0.3)}>
                                <Link className={styles.blogPostReadMore} to={post.metadata.permalink}>
                                    {translate({ id: 'blogHighlights.readMore', message: 'Read More' })} <span className={styles.arrowIcon}>→</span>
                                </Link>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div {...fadeInYProps(0.3)} style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <Link className={clsx('button', styles.viewAllPostsButton)} to="/blog">
                        {translate({ id: 'blogHighlights.viewAll', message: 'Explore All Blog Posts' })}
                    </Link>
                </motion.div>
            </div>
        </motion.section>
    );
}

export default BlogHighlights;
```

### `components/GitHubCard/GitHubCard.tsx`
```tsx
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
```

### `components/GitHubCard/githubCard.module.css`
```css
/* docs/src/components/GitHubCard/githubCard.module.css */

/* --- Kortstyling (Uppdaterad för mockup) --- */
.card {
    background-color: #fff; /* Vit bakgrund */
    border: 1px solid #e1e4e8; /* Subtil ram */
    border-radius: 6px; /* Lite mindre rundning än förr */
    padding: 12px 16px;
    cursor: pointer;
    transition: box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out;
    box-shadow: 0 1px 3px rgba(27, 31, 36, 0.06); /* Lite mer skugga */
    display: flex; /* För att kunna använda flex-gap */
    flex-direction: column;
    gap: 8px; /* Mellanrum mellan header, objective, data */
}
.card:hover, .card:focus {
    box-shadow: 0 4px 8px rgba(27, 31, 36, 0.08);
    border-color: #c8d1d9; /* Lite mörkare ram vid hover */
    outline: none;
}

/* Header inom kortet */
.cardHeader { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
.cardTitleWrap { display: flex; align-items: center; gap: 6px; min-width: 0; /* Förhindra overflow */ }
.statusIndicator { color: #57606a; flex-shrink: 0; margin-top: 1px; /* Justera */ font-size: 0.9em; }
.cardTitle { margin: 0; font-size: 0.9rem; font-weight: 500; line-height: 1.4; color: #1f2328; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.editIconLink { color: #57606a; flex-shrink: 0; padding: 2px; margin-top: -1px; font-size: 0.85em; transition: color 0.2s ease; }
.editIconLink:hover { color: #0969da; }

/* Objective inom kortet */
.cardObjective {
    font-size: 0.85rem; color: #57606a; margin: 0; line-height: 1.5;
    /* Behåll begränsning av rader */
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;
}

/* Container för pills längst ner på kortet */
.cardData { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }

/* --- Metadata Pill Styling (Generell + Specifik för Mockup) --- */
.metadataPill {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 8px; /* Lite mer padding vertikalt */
    border-radius: 4px; /* Mindre rundning */
    font-size: 0.75rem; font-weight: 500; line-height: 1.3;
    white-space: nowrap; border: 1px solid transparent; /* Förbered för ev. ram */
}
.pillIcon { margin-right: 2px; font-size: 0.9em; } /* Lite mindre ikon */

/* Specifika färger/stilar för Mockup-pills */
.priorityPillP0 { background-color: #FFEBE9; color: #DB2828; border-color: #FFCBC6;} /* Rödaktig */
.priorityPillP1 { background-color: #FFF3D9; color: #B47300; border-color: #FFE5A6;} /* Gul/Orange */
.priorityPillP2 { background-color: #E7F5E8; color: #218540; border-color: #C0EBC2;} /* Grön */
.priorityOther { background-color: #f1f1f1; color: #586069; border-color: #e1e4e8;} /* Grå */

.sizePill { background-color: #FFF3D9; color: #B47300; border-color: #FFE5A6;} /* Samma som P1 enligt mockup */
.sizePillXL { background-color: #FFEBE9; color: #DB2828; border-color: #FFCBC6;} /* L/XL annan färg? Röd */

.estimatePill { background-color: #f1f1f1; color: #586069; border-color: #e1e4e8;} /* Grå */
.teamPill { background-color: #f1f1f1; color: #586069; border-color: #e1e4e8;} /* Grå */


/* --- Modal Styling (V2 - Behåll ALLT från förra korrekta svaret) --- */
.modalOverlayV2 { /* ... */ }
.modalV2 { /* ... */ }
.modalHeaderV2 { /* ... */ }
.modalHeaderMain { /* ... */ }
.modalMoscowIndicator { /* ... */ }
.moscowMusthave { /* ... */ }
.moscowShouldhave { /* ... */ }
.moscowCouldhave { /* ... */ }
.moscowWonthave { /* ... */ }
.modalTitleV2 { /* ... */ }
.modalHeaderActions { /* ... */ }
.modalGitHubButton { /* ... */ }
.modalCloseButtonV2 { /* ... */ }
.modalBodyV2 { /* ... */ }
.modalMainContentV2 { /* ... */ }
.modalSidebarV2 { /* ... */ }
.modalSectionV2 { /* ... */ }
.sectionTitleV2 { /* ... */ }
.objectiveTextV2 { /* ... */ }
.metaItem { /* ... */ }
.metaIcon { /* ... */ }
.metaContent { /* ... */ }
.metaLabel { /* ... */ }
.metaValue { /* ... */ }
.metaValueLink { /* ... */ }
.markdownContentV2 { /* ... */ }
.markdownContentV2 p { /* ... */ }
.markdownContentV2 ul { /* ... */ }
/* ... alla andra markdown-stilar ... */
/* --- Checklist Styling --- */
.markdownContentV2 ul li.task-list-item { /* ... */ }
.markdownContentV2 li.task-list-item > input[type="checkbox"] { /* ... */ }
.markdownContentV2 li.task-list-item::before { /* ... */ }
.markdownContentV2 li.task-list-item > input[type="checkbox"]:checked::before { /* ... */ }
.markdownContentV2 li.task-list-item > input[type="checkbox"]:checked::after { /* ... */ }
.markdownContentV2 li.task-list-item > input[type="checkbox"]:checked + * { /* ... */ }
/* --- Övriga Stilar --- */
.spin { /* ... */ }
@keyframes spin { /* ... */ }
.discussionLink { /* ... */ }
```

### `components/AnimatedLogo/AnimatedLogo.module.css`
```css
/* docs/src/components/AnimatedLogo/AnimatedLogo.module.css */

.logoContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
}

.logoWrapper {
    position: relative; /* Viktigt för z-index och absoluta barn */
    width: 112px;
    height: 112px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.logoMotionWrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-origin: center center;
    /* === NYCKEL FÖR LAGERORDNING === */
    position: relative; /* Etablerar stacking context */
    z-index: 1;         /* Placerar denna *ovanför* z-index 0 */
}

.logo {
    display: block;
    width: 100%;
    height: 100%;
    /* Flyttat filter till wrapper eller ta bort om det stör */
}

.effectsSvg {
    /* === NYCKEL FÖR LAGERORDNING === */
    position: absolute; /* Placeras relativt .logoWrapper */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
    z-index: 0;         /* Placeras *under* z-index 1 */
}

.variantLabel {
    font-size: 0.8rem;
    color: #aaa; /* Lite ljusare grå */
    margin-top: 0.5rem;
}

/* --- Variant-specifika stilar --- */

/* Stil för Variant 4: Orbiting Dots med Blur */
.orbitingDot {
    filter: blur(1.5px); /* Justera blur-styrkan här */
}

/* Inga specifika klasser behövs för Variant 5:s shimmerRing just nu,
   stilen (stroke-dasharray) sätts direkt i TSX och animeras. */
```

### `components/AnimatedLogo/AnimatedLogo.tsx`
```tsx
// docs/src/components/AnimatedLogo/AnimatedLogo.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AnimatedLogo.module.css'; // Importera den egna CSS-modulen
import SymbolDark from '@site/static/img/SymbolDark.svg'; // Dubbelkolla/justera sökvägen!

// Komponenten tar inte längre emot någon 'variant'-prop
const AnimatedLogo: React.FC = () => {
    // --- Partikelhantering ---
    const [particles, setParticles] = useState<{ id: number; angle: number; startRadius: number; duration: number }[]>([]);

    useEffect(() => {
        // Funktion för att skapa en partikel med Variant 1's egenskaper
        const createParticle = () => {
            const duration = 3.5 + Math.random(); // Längre livslängd med lite variation
            setParticles((prev) => [
                ...prev,
                {
                    id: Date.now() + Math.random(), // Unik nyckel
                    angle: Math.random() * 360,      // Slumpmässig startvinkel
                    startRadius: 85 + Math.random() * 30, // Startar lite längre ut, varierat
                    duration: duration,               // Individuell livslängd
                },
            ]);
        };

        // Skapa partiklar med intervall
        const intervalId = setInterval(createParticle, 700); // Långsammare intervall

        // Städa upp gamla partiklar för prestanda
        const cleanupInterval = setInterval(() => {
            const now = Date.now();
            // Ta bort partiklar äldre än 6 sekunder
            setParticles(prev => prev.filter(p => now - p.id < 6000));
        }, 6000);

        // Städa upp intervall när komponenten unmountas
        return () => {
            clearInterval(intervalId);
            clearInterval(cleanupInterval);
        };
    }, []); // Körs bara en gång vid mount

    // --- Animationsdefinitioner (Endast Variant 1) ---
    // useMemo används för att undvika att objektet återskapas vid varje render
    const anims = useMemo(() => ({
        logo: { // Långsam, subtil puls för huvudloggan
            scale: [1, 1.03, 1],
            transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' }
        },
        ring: { // Långsam, kontinuerlig rotation för ringen
            rotate: 360,
            transition: { duration: 25, repeat: Infinity, ease: 'linear' }
        },
        glow: { // Subtil puls för glöden i mitten
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
            transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' }
        },
        particle: { // Egenskaper för hur partiklar animeras mot mitten
            targetScale: 0.3, // Skalas ner till 30%
            ease: 'easeIn'    // Accelererar mot slutet
        }
    }), []);

    // --- Partikelanimationsvarianter ---
    const particleVariants = {
        // Startposition och utseende
        initial: (particle: { angle: number, startRadius: number }) => ({
            x: 75 + particle.startRadius * Math.cos((particle.angle * Math.PI) / 180), // Position på cirkelns kant
            y: 75 + particle.startRadius * Math.sin((particle.angle * Math.PI) / 180),
            opacity: 0.7, // Lite genomskinlig start
            scale: 1,
        }),
        // Animation mot centrum
        animate: (particle: { duration: number }) => ({
            x: 75, // Mål X-position (centrum)
            y: 75, // Mål Y-position (centrum)
            opacity: 0, // Tona ut helt
            scale: anims.particle.targetScale, // Skala ner enligt definition
            transition: {
                duration: particle.duration, // Använd partikelns unika livslängd
                ease: anims.particle.ease as any, // Använd definierad easing
            },
        }),
        // Hur partikeln försvinner när den tas bort från state
        exit: { opacity: 0, transition: { duration: 0.1 } }, // Snabb fade out
    };

    return (
        // Huvudwrapper för logotypen och dess effekter
        <div className={styles.logoWrapper}>
            {/* Motion wrapper för huvudlogotypen */}
            <motion.div
                className={styles.logoMotionWrapper} // Innehåller z-index: 1
                animate={anims.logo} // Applicera logotypanimationen
            >
                {/* Försök rendera SVG som komponent, annars fallback till <img> */}
                {typeof SymbolDark === 'function' ? (
                    <SymbolDark className={styles.logo} />
                ) : (
                    <img src="/img/SymbolDark.svg" alt="Inner Journey Logo" className={styles.logo} />
                )}
            </motion.div>

            {/* SVG-behållare för visuella effekter (glöd, ring, partiklar) */}
            <svg
                className={styles.effectsSvg} // Innehåller z-index: 0
                viewBox="0 0 150 150" // Koordinatsystem för effekterna
            >
                {/* Glöd i mitten */}
                <motion.circle
                    cx="75" // Centrum X
                    cy="75" // Centrum Y
                    r="20"  // Radie på glöden
                    fill="url(#glowGradient)" // Använder gradient definierad nedan
                    style={{ transformOrigin: 'center center' }} // Säkerställ skalning från mitten
                    animate={anims.glow} // Applicera glödanimationen
                />
                {/* Definition av gradienten för glöden */}
                <defs>
                    <radialGradient id="glowGradient">
                        {/* Från rödaktig i mitten till orange/gulaktig i kanten, med varierande opacitet */}
                        <stop offset="0%" stopColor="#ff6f61" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#ff9f43" stopOpacity="0.2" />
                    </radialGradient>
                </defs>

                {/* Roterande ringen */}
                <motion.circle
                    cx="75"
                    cy="75"
                    r="55" // Radie på ringen
                    stroke="#ff9f43" // Färg på ringen
                    strokeWidth="4" // Tjocklek på ringen
                    fill="none" // Ingen fyllning
                    opacity="0.4" // Lite genomskinlig
                    style={{ transformOrigin: 'center center' }} // Säkerställ rotation runt mitten
                    animate={anims.ring} // Applicera ringanimationen
                />

                {/* Behållare för partiklar, hanterar in/ut-animationer */}
                <AnimatePresence>
                    {/* Mappa igenom nuvarande partiklar i state */}
                    {particles.map((particle) => (
                        // Skapa en animerbar cirkel för varje partikel
                        <motion.circle
                            key={particle.id} // Unik nyckel för React och Framer Motion
                            cx="0" // Start X (relativt till initial transform)
                            cy="0" // Start Y (relativt till initial transform)
                            r={Math.random() * 2 + 1} // Liten, slumpmässig radie
                            fill="#ffeedd" // Ljus, nästan vit färg
                            custom={particle} // Skicka partikeldata till variants (initial, animate)
                            variants={particleVariants} // Använd de definierade animationsvarianterna
                            initial="initial" // Starta i 'initial'-läget
                            animate="animate" // Animera till 'animate'-läget
                            exit="exit" // Använd 'exit'-animationen när partikeln tas bort
                        />
                    ))}
                </AnimatePresence>
            </svg>
            {/* Ingen variantLabel här */}
        </div>
    );
};

export default AnimatedLogo;
```

### `components/BlogHighlights/BlogHighlights.module.css`
```css
/* docs/src/components/BlogHighlights/BlogHighlights.module.css */

.blogHighlightsSection {
    padding: 5.5rem 1rem;
    background-color: #ffffff; /* Vit bakgrund som standard för denna komponent */
    overflow: hidden;
}

/* Basstilar för rubrik och text inom denna komponent */
.sectionTitle {
    color: #ff6f61;
    font-size: 2.6rem; /* Anpassa efter behov */
    margin-bottom: 1.5rem;
    text-align: center;
    font-weight: 700;
    line-height: 1.3;
}

.sectionText {
    color: #444;
    font-size: 1.15rem; /* Anpassa efter behov */
    line-height: 1.8;
    text-align: center;
    max-width: 780px;
    margin: 0 auto 1.5rem auto;
}


/* Specifika stilar för blogg-highlights */
.blogPostPreviewGrid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    max-width: 1140px; /* Matchar standard container */
    margin: 3rem auto 0 auto; /* Centrera grid */
}
@media screen and (min-width: 768px) {
    .blogPostPreviewGrid { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
}

.blogPostPreviewCard {
    background-color: #fffaf7; /* Ljus orange bakgrund för korten */
    border-radius: 10px;
    padding: 1.8rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid #fff0e8;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease-out, box-shadow 0.2s ease-out; /* För CSS fallback/komplement */
}
/* Framer Motion hanterar hover-transform */
.blogPostPreviewCard:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08); /* Subtil förstärkt skugga */
}


.blogPostPreviewTitle {
    font-size: 1.2rem;
    color: #333;
    margin-top: 0;
    margin-bottom: 0.8rem;
    font-weight: 600;
    line-height: 1.4;
}
.blogPostPreviewTitle a { color: inherit; text-decoration: none; transition: color 0.2s ease; }
.blogPostPreviewTitle a:hover { color: #ff6f61; text-decoration: underline; }

.blogPostPreviewExcerpt {
    font-size: 0.95rem;
    color: #555;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    flex-grow: 1;
    display: -webkit-box;
    -webkit-line-clamp: 4; /* Max 4 rader */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.blogPostReadMore {
    color: #ff6f61;
    font-weight: 500;
    font-size: 0.95rem;
    text-decoration: none;
    margin-top: auto;
    align-self: flex-start;
    transition: color 0.2s ease;
    display: inline-flex;
    align-items: center;
}
.blogPostReadMore:hover { color: #e15a4f; text-decoration: underline; }
.arrowIcon {
    margin-left: 0.4em;
    transition: transform 0.2s ease-out;
}
.blogPostReadMore:hover .arrowIcon {
    transform: translateX(3px);
}

.viewAllPostsButton { /* Knappen längst ner */
    background: #ff6f61;
    color: #ffffff;
    border: none;
    padding: 0.9rem 2rem;
    font-weight: 500;
    font-size: 1.05rem;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    display: inline-block;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.viewAllPostsButton:hover { background: #e15a4f; transform: scale(1.03); box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); }


/* --- Media Queries för Blog Highlights --- */
@media screen and (max-width: 996px) {
    .sectionTitle { font-size: 2.2rem; } /* Anpassa rubrikstorlek inom komponenten */
}

@media screen and (max-width: 768px) {
    .sectionTitle { font-size: 2rem; }
    .blogPostPreviewGrid { grid-template-columns: 1fr; } /* Stapla alltid på små skärmar */
    .blogPostPreviewTitle { font-size: 1.1rem; }
    .blogPostPreviewExcerpt { -webkit-line-clamp: 3; }
}
```

### `components/BlogHighlights/BlogHighlights.tsx`
```tsx
// src/components/BlogHighlights/BlogHighlights.tsx
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { motion } from 'framer-motion';
import { usePluginData } from '@docusaurus/useGlobalData';
import { translate } from '@docusaurus/Translate'; // Importera translate
import styles from './BlogHighlights.module.css';

// --- Animationsvarianter (Behåll från tidigare) ---
const fadeInYProps = (delay = 0, y = 20, duration = 0.6) => ({
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration, delay, ease: 'easeOut' },
});

const sectionTitleProps = {
    initial: { opacity: 0, y: -15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.5, ease: 'easeOut' },
};

const staggerContainerProps = (staggerChildren = 0.1) => ({
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, amount: 0.1 },
    variants: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren, delayChildren: 0.1 } },
    },
});

const itemFadeInProps = {
    variants: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    },
};

const innerItemFadeInProps = (delay = 0) => ({
    variants: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: 'easeOut' } },
    },
});

// Typ för bloggpost-metadata (kan behöva justeras baserat på exakt struktur)
interface BlogPost {
    id: string;
    metadata: {
        permalink: string;
        title: string;
        description: string;
        date: string;
        tags: { label: string; permalink: string }[];
    };
}

interface BlogPluginData {
    posts: BlogPost[];
}

const BlogHighlights: React.FC = () => {
    const blogData = usePluginData('docusaurus-plugin-content-blog') as BlogPluginData;

    const highlightedPosts = blogData?.posts
        ?.filter(post =>
            post.metadata.tags.some(tag => tag.label.toLowerCase() === 'highlights')
        )
        .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime())
        .slice(0, 3) ?? [];

    if (highlightedPosts.length === 0) {
        return null;
    }

    return (
        <motion.section className={styles.blogHighlightsSection} {...fadeInYProps()}>
            <div className="container">
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'blogHighlights.title', message: 'From Our Blog: Featured Insights' })}
                    </Heading>
                </motion.div>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.1)} style={{marginBottom: "3rem"}}>
                    {translate({ id: 'blogHighlights.text', message: 'Explore some of our most-read articles and gain deeper insights into our methodology and vision.' })}
                </motion.p>

                <motion.div className={styles.blogPostPreviewGrid} {...staggerContainerProps(0.1)}>
                    {highlightedPosts.map((post) => (
                        <motion.div key={post.id} className={styles.blogPostPreviewCard} variants={itemFadeInProps} whileHover={{ y: -4, transition:{ duration: 0.2 }}}>
                            <motion.div {...innerItemFadeInProps(0.1)}>
                                <Heading as="h3" className={styles.blogPostPreviewTitle}>
                                    <Link to={post.metadata.permalink}>{post.metadata.title}</Link>
                                </Heading>
                            </motion.div>
                            <motion.p className={styles.blogPostPreviewExcerpt} {...innerItemFadeInProps(0.2)}>
                                {post.metadata.description}
                            </motion.p>
                            <motion.div {...innerItemFadeInProps(0.3)}>
                                <Link className={styles.blogPostReadMore} to={post.metadata.permalink}>
                                    {translate({ id: 'blogHighlights.readMore', message: 'Read More' })} <span className={styles.arrowIcon}>→</span>
                                </Link>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div {...fadeInYProps(0.3)} style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <Link className={clsx('button', styles.viewAllPostsButton)} to="/blog">
                        {translate({ id: 'blogHighlights.viewAll', message: 'Explore All Blog Posts' })}
                    </Link>
                </motion.div>
            </div>
        </motion.section>
    );
}

export default BlogHighlights;
```

### `api/api.ts`
```ts
// docs/src/api/api.ts
import axios from 'axios';

// Sätt upp en bas-URL för API-anrop
const apiClient = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000,
});

/**
 * Interface för ett fält i ProjectV2
 */
interface ProjectField {
    id: string;
    name: string;
    dataType: string;
    options?: { id: string; name: string; color: string; description?: string }[];
    configuration?: {
        startDay?: number;
        duration?: number;
        iterations?: { id: string; title: string; startDate: string; duration: number }[];
        completedIterations?: { id: string; title: string; startDate: string; duration: number }[];
    };
}

/**
 * Interface för ett fältvärde i ett item
 */
interface FieldValue {
    text?: string;
    number?: number;
    date?: string;
    name?: string;
    optionId?: string;
    title?: string;
    iterationId?: string;
    startDate?: string;
    duration?: number;
    field: {
        id: string;
        name: string;
        dataType: string;
        options?: { id: string; name: string }[];
    };
}

/**
 * Interface för ett item i ProjectV2
 */
interface ProjectItem {
    id: string;
    type: 'ISSUE' | 'PULL_REQUEST' | 'DRAFT_ISSUE';
    isArchived: boolean;
    createdAt: string;
    updatedAt: string;
    fieldValues: {
        totalCount: number;
        nodes: FieldValue[];
        pageInfo: { hasNextPage: boolean; endCursor: string };
    };
    content: {
        id: string;
        title: string;
        body?: string;
        url?: string;
        state?: 'OPEN' | 'CLOSED';
        number?: number;
        createdAt?: string;
        updatedAt?: string;
        closedAt?: string | null;
        merged?: boolean;
        mergedAt?: string | null;
        author?: { login: string };
        creator?: { login: string };
        assignees?: { totalCount: number; nodes: { login: string }[] };
        labels?: { totalCount: number; nodes: { id: string; name: string; color: string }[] };
        milestone?: { id: string; title: string; dueOn?: string; state?: string } | null;
        repository?: { id: string; name: string; owner: { login: string } };
    };
}

/**
 * Interface för hela ProjectV2-svaret från backend
 */
export interface GitHubProjectData {
    id: string;
    title: string;
    url: string;
    shortDescription: string | null;
    public: boolean;
    closed: boolean;
    readme: string | null;
    owner: { login: string };
    createdAt: string;
    updatedAt: string;
    fields: {
        totalCount: number;
        nodes: ProjectField[];
        pageInfo: { hasNextPage: boolean; endCursor: string };
    };
    items: {
        totalCount: number;
        nodes: ProjectItem[];
        pageInfo: { hasNextPage: boolean; endCursor: string };
    };
}

/**
 * Hämtar all rådata för projektet från backend
 */
export const fetchGitHubProjectData = async (): Promise<GitHubProjectData> => {
    try {
        console.log('Frontend: Anropar /github/project...');
        const response = await apiClient.get('/github/project');
        console.log('Frontend: Mottog svar från /github/project:', response.status);

        if (!response.data || typeof response.data !== 'object') {
            console.error('Frontend: Data från backend är inte ett objekt!', response.data);
            throw new Error('Oväntat dataformat från backend.');
        }

        console.log(`Frontend: Mottog projekt med ${response.data.items.totalCount} items.`);
        return response.data as GitHubProjectData;
    } catch (error: any) {
        console.error('Frontend: Fel i fetchGitHubProjectData:', error);
        let message = 'Kunde inte hämta projektdata från servern.';
        if (axios.isAxiosError(error)) {
            if (error.response) {
                message = `Serverfel (${error.response.status}): ${error.response.data?.detail || 'Okänt serverfel'}`;
            } else if (error.request) {
                message = 'Inget svar från servern. Kontrollera att backend körs och är nåbar.';
            } else {
                message = `Fel vid anrop: ${error.message}`;
            }
        } else {
            message = `Oväntat fel: ${error.message || String(error)}`;
        }
        throw new Error(message);
    }
};
```

### `pages/index.module.css`
```css
/* docs/src/pages/index.module.css */

/* --- Generella Sektionsstilar --- */
/* Appliceras på CorePhilosophy, Concept, Pathways, CommunityCTA */
.coreSection, .conceptSection, .pathwaysSection, .communityCtaSection {
  padding: 5.5rem 1rem;
  overflow: hidden;
}

/* Växlande bakgrunder för de aktiva sektionerna */
.coreSection, .pathwaysSection { background-color: #ffffff; }
.conceptSection, .communityCtaSection { background-color: #fffaf7; } /* Ljus orange/beige */

/* Generell container-stil för INNEHÅLLET inom sektionerna */
/* Notera: Docusaurus 'container'-klass används ofta också via clsx */
.sectionContainer {
  padding: 2rem 0;
  max-width: 1140px; /* Standardbredd */
  margin: 0 auto;
}

/* Generell rubrikstil H2 inom sektionerna */
.sectionTitle {
  color: #ff6f61; /* Primär accent */
  font-size: 2.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 700;
  line-height: 1.3;
}

/* Generell textstil P inom sektionerna */
.sectionText {
  color: #444;
  font-size: 1.2rem;
  line-height: 1.8;
  text-align: center;
  max-width: 780px;
  margin: 0 auto 1.5rem auto;
}
/* Stil för fet text (<strong>) */
.sectionText strong {
  font-weight: 600;
  color: #333;
}
/* Stil för länkar inuti text */
.sectionText a, .linkStyled {
  color: #ff6f61;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}
.sectionText a:hover, .linkStyled:hover {
  text-decoration: underline;
  color: #e15a4f;
}


/* --- Core Philosophy Section --- */
.coreSection { padding-bottom: 4.5rem; }
.coreContainer { max-width: 880px; } /* Specifik smalare container */
.coreSection .sectionTitle { font-size: 2.6rem; margin-bottom: 2rem;}
.coreSection .sectionText { font-size: 1.25rem; }


/* --- Concept Section --- */
.conceptGrid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  margin-top: 3rem;
  max-width: 960px; /* Begränsa bredden på grid */
  margin-left: auto;
  margin-right: auto;
}
@media screen and (min-width: 768px) {
  .conceptGrid { grid-template-columns: 1fr 1fr; } /* Två kolumner */
}

.conceptItem {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  text-align: left;
  padding: 1.5rem;
  background-color: #ffffff; /* Vit bakgrund för korten */
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #ffb36b; /* Sekundär accent */
}
.conceptIcon {
  font-size: 2.2rem;
  color: #ff9f43; /* Matchar kantlinje */
  margin-top: 0.2rem;
  line-height: 1;
}
.conceptItemTitle { /* Klassnamn från TSX */
  font-size: 1.25rem;
  color: #333;
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-weight: 600;
}
.conceptItemText { /* Klassnamn från TSX */
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 0;
}


/* --- Pathways Section --- */
.pathwaysSection { background-color: #ffffff; }
.pathwaysGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}
.pathwayCard {
  background-color: #fffaf7; /* Ljus orange bakgrund för korten */
  border-radius: 12px;
  padding: 2.5rem 1.8rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.07);
  border: 1px solid #fff0e8;
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
}
/* Hover hanteras av Framer Motion */
.pathwayIcon { font-size: 2.8rem; margin-bottom: 1.25rem; color: #ff6f61; line-height: 1; }
.pathwayTitle { color: #333; font-size: 1.5rem; margin-bottom: 1rem; font-weight: 600; }
.pathwayText { color: #555; font-size: 1rem; line-height: 1.7; margin-bottom: 1.8rem; flex-grow: 1; }
.pathwayButton {
  background: #ff6f61; color: #ffffff; border: none; padding: 0.8rem 1.8rem;
  font-weight: 500; font-size: 1rem; border-radius: 50px; cursor: pointer;
  transition: all 0.2s ease; text-decoration: none; display: inline-block; margin-top: auto;
}
.pathwayButton:hover { background: #e15a4f; transform: scale(1.03); }

/* --- Blog Highlights Section --- */
/* === STILAR FÖR BLOG HIGHLIGHTS ÄR BORTTAGNA HÄRIFRÅN === */
/* === De finns nu i BlogHighlights.module.css === */


/* --- Community CTA Section --- */
.communityCtaSection { background-color: #fffaf7; }
.communityContainer { max-width: 800px; } /* Specifik smalare container */
.communityCtaSection .sectionTitle { font-size: 2.5rem; color: #e15a4f; } /* Mörkare orange */
.communityCtaSection .sectionText { font-size: 1.15rem; }

.discordButton {
  background-color: #5865F2; color: #ffffff; border: none; padding: 1rem 2.2rem;
  font-weight: 600; font-size: 1.1rem; border-radius: 8px; transition: all 0.3s ease;
  cursor: pointer; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); text-decoration: none;
  display: inline-flex; align-items: center; gap: 0.5em;
}
.discordButton:hover { background-color: #4752C4; transform: translateY(-2px); box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); }
.externalIcon { font-size: 1.1em; line-height: 1; display: inline-block; }


/* --- Media Queries --- */
@media screen and (max-width: 996px) {
  .sectionTitle { font-size: 2.4rem; }
  .sectionText { font-size: 1.1rem; }
  .coreSection .sectionTitle { font-size: 2.3rem; }
  .coreSection .sectionText { font-size: 1.15rem; }
  .conceptGrid { gap: 2rem; }
  .pathwaysGrid { grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem;}
  .pathwayTitle { font-size: 1.4rem; }
  /* Ingen blogg-specifik MQ behövs här */
  .communityCtaSection .sectionTitle { font-size: 2.2rem; }
}

@media screen and (max-width: 768px) {
  .sectionTitle { font-size: 2.1rem; }
  .sectionText { font-size: 1.05rem; }
  .coreSection .sectionTitle { font-size: 2rem; }
  .coreSection .sectionText { font-size: 1.1rem; }
  .conceptGrid { grid-template-columns: 1fr; gap: 1.5rem; }
  .conceptItemTitle { font-size: 1.15rem; }
  .conceptItemText { font-size: 0.95rem; }
  .pathwaysGrid { grid-template-columns: 1fr; gap: 1.5rem;}
  .pathwayTitle { font-size: 1.3rem; }
  /* Ingen blogg-specifik MQ behövs här */
  .communityCtaSection .sectionTitle { font-size: 2rem; }
}
```

### `pages/index.tsx`
```tsx
// src/pages/index.tsx
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { motion } from 'framer-motion';
import { translate } from '@docusaurus/Translate';
import pageStyles from './index.module.css';
import HomepageHeader from '../components/HomepageHeader';
import BlogHighlights from '../components/BlogHighlights/BlogHighlights';

// --- Animationsvarianter ---
const fadeInYProps = (delay = 0, y = 20, duration = 0.6) => ({
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration, delay, ease: 'easeOut' },
});

const sectionTitleProps = {
    initial: { opacity: 0, y: -15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.5, ease: 'easeOut' },
};

const staggerContainerProps = (staggerChildren = 0.1) => ({
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, amount: 0.1 },
    variants: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren, delayChildren: 0.1 } },
    },
});

const itemFadeInProps = {
    variants: {
        hidden: { opacity: 0, y: 20, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    },
};

// --- Sektionskomponenter ---

// 1. Kärnan / Filosofin
function CorePhilosophySection() {
    return (
        <motion.section className={pageStyles.coreSection} {...fadeInYProps()}>
            <div className={clsx("container", pageStyles.sectionContainer, pageStyles.coreContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={pageStyles.sectionTitle}>
                        {translate({ id: 'home.core.title', message: '🧭 Navigate Your Inner World – With Heart First' })}
                    </Heading>
                </motion.div>
                <motion.p className={pageStyles.sectionText} {...fadeInYProps(0.1)}>
                    {translate({ id: 'home.core.text1', message: 'Inner Journey is your partner for <strong>authentic self-discovery and meaningful development</strong>. We believe the answers lie within you. Our platform offers research-based, holistic tools and a supportive community to help you uncover them – without directives.' })}
                </motion.p>
                <motion.p className={pageStyles.sectionText} {...fadeInYProps(0.2)}>
                    {translate({ id: 'home.core.text2', message: 'We provide the tools, you steer the journey. Explore, reflect, and grow – <strong>without directives</strong>.' })}
                </motion.p>
                <motion.div {...fadeInYProps(0.3)} style={{textAlign: 'center', marginTop: '1.5rem'}}>
                    <Link className={pageStyles.linkStyled} to="/docs/project/visionar-grund">
                        {translate({ id: 'home.core.link', message: 'Our Philosophy & Vision' })}
                    </Link>
                </motion.div>
            </div>
        </motion.section>
    );
}

// 2. Konceptet / Hur det fungerar
function ConceptSection() {
    return (
        <motion.section className={pageStyles.conceptSection}>
            <div className={clsx("container", pageStyles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={pageStyles.sectionTitle}>
                        {translate({ id: 'home.concept.title', message: 'An Intelligent & Supportive Companion' })}
                    </Heading>
                </motion.div>
                <motion.p className={pageStyles.sectionText} {...fadeInYProps(0.1)}>
                    {translate({ id: 'home.concept.text', message: 'Imagine a platform that gets to know you and adapts to your unique journey. Inner Journey uses smart technology to offer:' })}
                </motion.p>
                <motion.div className={pageStyles.conceptGrid} {...staggerContainerProps(0.15)}>
                    <motion.div className={pageStyles.conceptItem} variants={itemFadeInProps}>
                        <span className={pageStyles.conceptIcon}>✨</span>
                        <div>
                            <Heading as="h3" className={pageStyles.conceptItemTitle}>
                                {translate({ id: 'home.concept.personalizedGuidance.title', message: 'Personalized Guidance' })}
                            </Heading>
                            <p className={pageStyles.conceptItemText}>
                                {translate({ id: 'home.concept.personalizedGuidance.text', message: 'AI-driven suggestions for exercises and reflections that match your goals.' })}
                            </p>
                        </div>
                    </motion.div>
                    <motion.div className={pageStyles.conceptItem} variants={itemFadeInProps}>
                        <span className={pageStyles.conceptIcon}>✍️</span>
                        <div>
                            <Heading as="h3" className={pageStyles.conceptItemTitle}>
                                {translate({ id: 'home.concept.deepenedInsight.title', message: 'Deepened Insight' })}
                            </Heading>
                            <p className={pageStyles.conceptItemText}>
                                {translate({ id: 'home.concept.deepenedInsight.text', message: 'Dynamic journaling that helps you see patterns and understand yourself better.' })}
                            </p>
                        </div>
                    </motion.div>
                    <motion.div className={pageStyles.conceptItem} variants={itemFadeInProps}>
                        <span className={pageStyles.conceptIcon}>🤝</span>
                        <div>
                            <Heading as="h3" className={pageStyles.conceptItemTitle}>
                                {translate({ id: 'home.concept.communitySupport.title', message: 'Community & Support' })}
                            </Heading>
                            <p className={pageStyles.conceptItemText}>
                                {translate({ id: 'home.concept.communitySupport.text', message: 'Grow together with others and receive support from experienced coaches.' })}
                            </p>
                        </div>
                    </motion.div>
                    <motion.div className={pageStyles.conceptItem} variants={itemFadeInProps}>
                        <span className={pageStyles.conceptIcon}>🛠️</span>
                        <div>
                            <Heading as="h3" className={pageStyles.conceptItemTitle}>
                                {translate({ id: 'home.concept.holisticTools.title', message: 'Holistic Tools' })}
                            </Heading>
                            <p className={pageStyles.conceptItemText}>
                                {translate({ id: 'home.concept.holisticTools.text', message: 'A comprehensive toolkit with meditation, goal-setting, and more for your well-being.' })}
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}

// 3. Sektion för Olika Målgrupper/Vägar
function PathwaysSection() {
    return (
        <motion.section className={pageStyles.pathwaysSection}>
            <div className={clsx("container", pageStyles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={pageStyles.sectionTitle}>
                        {translate({ id: 'home.pathways.title', message: 'A Journey for Everyone – Find Your Path' })}
                    </Heading>
                </motion.div>
                <motion.p className={pageStyles.sectionText} {...fadeInYProps(0.1)} style={{marginBottom: "3rem"}}>
                    {translate({ id: 'home.pathways.text', message: 'Inner Journey is an ecosystem for growth. Whether you want to develop yourself, guide others, invest in change, or contribute your talent, there’s a place for you.' })}
                </motion.p>
                <motion.div className={pageStyles.pathwaysGrid} {...staggerContainerProps(0.1)}>
                    <motion.div className={pageStyles.pathwayCard} variants={itemFadeInProps} whileHover={{ y: -5, transition: {duration: 0.2} }}>
                        <div className={pageStyles.pathwayIcon}>👤</div>
                        <Heading as="h3" className={pageStyles.pathwayTitle}>
                            {translate({ id: 'home.pathways.explorePotential.title', message: 'Explore Your Potential' })}
                        </Heading>
                        <p className={pageStyles.pathwayText}>
                            {translate({ id: 'home.pathways.explorePotential.text', message: 'Start your personal journey with our tools and insights...' })}
                        </p>
                        <Link className={clsx('button', pageStyles.pathwayButton)} to="/docs/intro">
                            {translate({ id: 'home.pathways.explorePotential.buttonText', message: 'Get Started (Free)' })}
                        </Link>
                    </motion.div>
                    <motion.div className={pageStyles.pathwayCard} variants={itemFadeInProps} whileHover={{ y: -5, transition: {duration: 0.2} }}>
                        <div className={pageStyles.pathwayIcon}>🧑‍🏫</div>
                        <Heading as="h3" className={pageStyles.pathwayTitle}>
                            {translate({ id: 'home.pathways.forCoaches.title', message: 'For Coaches' })}
                        </Heading>
                        <p className={pageStyles.pathwayText}>
                            {translate({ id: 'home.pathways.forCoaches.text', message: 'Simplify your work, reach more clients, and use a platform built for collaboration.' })}
                        </p>
                        <Link className={clsx('button', pageStyles.pathwayButton)} to="/about/coaches">
                            {translate({ id: 'home.pathways.forCoaches.buttonText', message: 'Discover the Benefits' })}
                        </Link>
                    </motion.div>
                    <motion.div className={pageStyles.pathwayCard} variants={itemFadeInProps} whileHover={{ y: -5, transition: {duration: 0.2} }}>
                        <div className={pageStyles.pathwayIcon}>📈</div>
                        <Heading as="h3" className={pageStyles.pathwayTitle}>
                            {translate({ id: 'home.pathways.forInvestors.title', message: 'For Investors' })}
                        </Heading>
                        <p className={pageStyles.pathwayText}>
                            {translate({ id: 'home.pathways.forInvestors.text', message: 'Become a partner in a visionary healthtech platform with strong growth potential.' })}
                        </p>
                        <Link className={clsx('button', pageStyles.pathwayButton)} to="/about/investment-opportunities">
                            {translate({ id: 'home.pathways.forInvestors.buttonText', message: 'See the Opportunity' })}
                        </Link>
                    </motion.div>
                    <motion.div className={pageStyles.pathwayCard} variants={itemFadeInProps} whileHover={{ y: -5, transition: {duration: 0.2} }}>
                        <div className={pageStyles.pathwayIcon}>🤝</div>
                        <Heading as="h3" className={pageStyles.pathwayTitle}>
                            {translate({ id: 'home.pathways.workWithUs.title', message: 'Work with Us' })}
                        </Heading>
                        <p className={pageStyles.pathwayText}>
                            {translate({ id: 'home.pathways.workWithUs.text', message: 'Contribute your expertise or explore strategic partnerships. Build the future of well-being with us.' })}
                        </p>
                        <Link className={clsx('button', pageStyles.pathwayButton)} to="/about/partners-and-team">
                            {translate({ id: 'home.pathways.workWithUs.buttonText', message: 'Join the Journey' })}
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}

// 4. Avslutande CTA (Community)
function CommunityCtaSection() {
    return (
        <motion.section className={pageStyles.communityCtaSection}>
            <div className={clsx("container", pageStyles.sectionContainer, pageStyles.communityContainer)}>
                <motion.div {...fadeInYProps(0, -15)}>
                    <Heading as="h2" className={pageStyles.sectionTitle}>
                        {translate({ id: 'home.communitycta.title', message: 'Join Our Community' })}
                    </Heading>
                </motion.div>
                <motion.p className={pageStyles.sectionText} {...fadeInYProps(0.1)}>
                    {translate({ id: 'home.communitycta.text', message: 'Development happens together! Join conversations, ask questions, and share your insights with other users, coaches, and the team behind Inner Journey.' })}
                </motion.p>
                <motion.div {...fadeInYProps(0.2)} style={{textAlign: 'center', marginTop: '2rem'}}>
                    <Link className={clsx('button button--lg', pageStyles.discordButton)} to="https://discord.gg/2j5a2Gze8W" target="_blank" rel="noopener noreferrer">
                        {translate({ id: 'home.communitycta.button', message: 'Join on Discord' })} <span className={pageStyles.externalIcon}>↗</span>
                    </Link>
                </motion.div>
            </div>
        </motion.section>
    );
}

// --- Huvudkomponenten ---
export default function Home(): React.ReactNode {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={translate({ id: 'home.layout.title', message: 'Inner Journey | Your Partner for Personal Development' })}
            description={translate({ id: 'home.layout.description', message: 'Explore Inner Journey – an AI-enhanced platform with community and coaching for genuine self-discovery and transformation. Get started for free!' })}
        >
            <HomepageHeader />
            <main>
                <CorePhilosophySection />
                <ConceptSection />
                <PathwaysSection />
                <BlogHighlights />
                <CommunityCtaSection />
            </main>
        </Layout>
    );
}
```

### `pages/project/project_summary.md`
```md
# Projektkontext

**Genererad:** 2025-04-04 16:51:41  
**Rotmapp:** `/home/joelkvarnsmyr/projects/innerjourney/docs/src/pages/project`

## Fil- och Mappstruktur
```
project/
    project-boards/
        status-board/
            index.tsx
            status-board.module.css
        overview/
            index.tsx
            project-boards.module.css
        moscow-board/
            index.tsx
            moscow-board.module.css
```

## Filinnehåll (Max 150 KB per fil)
### `project-boards/status-board/index.tsx`
```tsx
// docs/src/pages/boards/status/index.tsx
import React from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './status.module.css'; // Importera Status-specifika stilar

// *** ENDAST DEN KORREKTA NAMED IMPORTEN ***
import { useGroupedGitHubData } from '../../../hooks/useGroupedGitHubData';

import GitHubCard from '../../../components/GitHubCard/GitHubCard'; // Samma kortkomponent
import { ProjectItem } from '../../../api/api';

// Definiera Status-kategoriernas ordning och namn
const statusCategories: string[] = [
    'Ideas',
    'Backlog',
    'Ready',
    'In progress',
    'In review',
    'Done',
    // 'Okategoriserad' // Lägg till om du vill visa denna
];

export default function StatusBoardPage(): ReactNode {
    // *** Använd hooken med 'status' som argument ***
    const { data: groupedData, loading, error } = useGroupedGitHubData('status');

    // Hantera laddning och fel
    if (loading) { return <Layout title="Status Board" description="Laddar..."><div className="container padding-vert--lg" style={{textAlign: 'center'}}>Laddar projektdata...</div></Layout>; }
    if (error) { return <Layout title="Fel" description="Fel vid laddning"><div className="container padding-vert--lg"><Heading as="h1" style={{textAlign: 'center'}}>Ett fel inträffade</Heading><p style={{textAlign: 'center'}}>{error}</p></div></Layout>; }
    // if (!groupedData || Object.keys(groupedData).length === 0) { /* Tomt meddelande? */ }

    return (
        <Layout
            title="Status Board"
            description="Funktioner och uppgifter grupperade efter deras nuvarande status."
        >
            <div className={styles.statusBoardTheme}>
                <div className={styles.pageHeader}>
                    <Heading as="h1">Status Board</Heading>
                    <p>Denna tavla visar uppgifter grupperade efter status (Idé, Backlog, Klar, etc.).</p>
                </div>

                <main className={styles.statusBoardGrid}>
                    {statusCategories.map((category) => {
                        const cardsInCategory = groupedData[category] || [];
                        const statusClass = category.toLowerCase().replace(/\s+/g, '');

                        return (
                            <div key={category} className={styles.statusColumn}>
                                <Heading
                                    as="h2"
                                    className={clsx(
                                        styles.categoryHeader,
                                        styles[`status${statusClass}`]
                                    )}
                                >
                                    {category}
                                    <span className={styles.count}>({cardsInCategory.length})</span>
                                </Heading>

                                <div className={styles.cardContainer}>
                                    {cardsInCategory.map((card: ProjectItem) => (
                                        <GitHubCard
                                            key={card.id}
                                            card={card}
                                            // viewOptions={{ showStatusPill: false }} // Om du implementerar detta
                                        />
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
```

### `project-boards/status-board/status-board.module.css`
```css
/* docs/src/pages/boards/status/status.module.css */

/* --- Grundläggande Sidlayout (Liknar Moscow) --- */
.statusBoardTheme {
    background-color: #f6f8fa;
    color: #1f2328;
    min-height: 100vh;
    padding-bottom: 40px;
}

.pageHeader {
    text-align: center;
    padding: 40px 24px 24px 24px;
    margin-bottom: 16px;
}
.pageHeader h1 { font-size: 2rem; color: #1f2328; margin-bottom: 8px; }
.pageHeader p { font-size: 1rem; color: #57606a; max-width: 700px; margin: 0 auto; }

/* --- Grid för Kolumner (Kan behöva fler kolumner än Moscow) --- */
.statusBoardGrid {
    display: grid;
    /* auto-fit är bra här för att hantera 6+ kolumner */
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); /* Mindre min-bredd? */
    gap: 16px; /* Lite mindre gap? */
    padding: 0 24px;
}

/* --- Kolumn --- */
.statusColumn {
    background: #ffffff; /* Ge kolumnen en svag bakgrund? Eller behåll transparent? */
    border-radius: 8px;
    padding: 12px; /* Padding inuti kolumnen */
    box-shadow: var(--ifm-global-shadow-xs); /* Lätt skugga på kolumnen */
    display: flex;
    flex-direction: column;
}

/* --- Kolumnrubrik (Annan stil än Moscow) --- */
.categoryHeader {
    font-size: 0.95rem; /* Mindre */
    font-weight: 500;
    color: var(--ifm-font-color-secondary); /* Lite ljusare text */
    margin: 0 0 12px 0;
    padding: 6px 8px;
    border-radius: 4px;
    /* Ingen border-left här, använd bakgrund/textfärg för att skilja åt */
    text-align: center; /* Centrera? */
    background-color: var(--ifm-color-emphasis-100); /* Väldigt ljus bakgrund */
}

/* --- Färgkodning för Status-rubriker (Exempel) --- */
/* Anpassa färger för att passa ditt tema */
/* Använd t.ex. bakgrund, textfärg eller en liten prick */
.statusideas { background-color: #f3f3f3; color: #6a737d; }
.statusbacklog { background-color: #f3f3f3; color: #6a737d; }
.statusready { background-color: #dbf4ff; color: #0366d6; }
.statusinprogress { background-color: #fffbdd; color: #5d4a00; }
.statusinreview { background-color: #eedcff; color: #5a32a3; }
.statusdone { background-color: #dafbe1; color: #22863a; }
.statusokategoriserad { background-color: #f6f8fa; color: #6a737d; }


.count {
    font-size: 0.85rem;
    font-weight: normal;
    margin-left: 6px;
    color: var(--ifm-font-color-secondary);
}

/* --- Kortbehållare --- */
.cardContainer {
    display: flex;
    flex-direction: column;
    gap: 10px; /* Mellanrum mellan kort */
    min-height: 100px;
    /* Om kolumnen ska scrolla (istället för sidan): */
    /* overflow-y: auto; */
    /* flex-grow: 1; */
}

.noCards {
    font-size: 0.9rem;
    color: #6a737d;
    padding: 16px;
    text-align: center;
    font-style: italic;
}

/* Ingen specifik kortstyling här - det sköts av GitHubCard */
```

### `project-boards/overview/index.tsx`
```tsx
// src/pages/boards/index.tsx
import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import { usePluginData } from '@docusaurus/useGlobalData';
import { FaList, FaSortAmountDown, FaTasks, FaLightbulb, FaQuestionCircle } from 'react-icons/fa';
import styles from './boards.module.css';

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
```

### `project-boards/overview/project-boards.module.css`
```css
/* Ljus tema-klass för /boards-sidan */
.boardsTheme {
    background-color: #f4f5f7; /* Ljusgrå bakgrund */
    color: #172b4d; /* Mörk text för bättre läsbarhet */
    min-height: 100vh;
    padding: 24px;
}

/* Grid för att visa kort */
.boardsGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    max-width: 1200px;
    margin: 0 auto;
}

/* Kort för varje board */
.boardCard {
    background: #ffffff; /* Vit bakgrund */
    border: 1px solid #dfe1e6; /* Ljusgrå kant */
    border-radius: 8px;
    padding: 24px;
    text-align: center;
    text-decoration: none;
    color: #172b4d;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.boardCard:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}

.boardIcon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    color: #fff;
    font-size: 1.5rem;
    margin: 0 auto;
}

.boardCard h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
}

.boardCard p {
    font-size: 1rem;
    color: #5e6c84;
    margin: 0;
}

/* Sidhuvud */
.pageHeader {
    text-align: center;
    margin-bottom: 32px;
}

.pageHeader h1 {
    font-size: 2rem;
    color: #172b4d;
    margin-bottom: 8px;
}

.pageHeader p {
    font-size: 1rem;
    color: #5e6c84;
}
```

### `project-boards/moscow-board/index.tsx`
```tsx
// docs/src/pages/boards/moscow/index.tsx
import React from 'react'; // Importera React
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './moscow.module.css'; // Moscow sid-layout stilar
import { useGroupedGitHubData } from '../../../hooks/useGroupedGitHubData';
import GitHubCard from '../../../components/GitHubCard/GitHubCard'; // Kortkomponenten
import { ProjectItem } from '../../../api/api'; // Typdefinition

// Definiera Moscow-kategoriernas ordning och namn
const moscowCategories: string[] = ['Must have', 'Should have', 'Could have', "Won't have"];
// const moscowCategories: string[] = ['Must have', 'Should have', 'Could have', "Won't have", 'Okategoriserad']; // Om du vill visa okategoriserade

export default function MoscowPage(): ReactNode {
    // Använd den nya hooken med 'moscow' som argument
    const { data: groupedData, loading, error } = useGroupedGitHubData('moscow');

    // Hantera laddning och fel
    if (loading) { return <Layout title="MoSCoW Översikt" description="Laddar..."><div className="container padding-vert--lg" style={{textAlign: 'center'}}>Laddar projektdata...</div></Layout>; }
    if (error) { return <Layout title="Fel" description="Fel vid laddning"><div className="container padding-vert--lg"><Heading as="h1" style={{textAlign: 'center'}}>Ett fel inträffade</Heading><p style={{textAlign: 'center'}}>{error}</p><p style={{textAlign: 'center'}}>Kontrollera att backend-tjänsten körs och är nåbar.</p></div></Layout>; }
    // if (!groupedData || Object.keys(groupedData).length === 0) { /* Kan visa tomt meddelande, men kolumnerna visas ändå */ }

    return (
        <Layout
            title="MoSCoW Översikt för R1"
            description="Visa prioriterade funktioner för Release 1 av Inner Journey"
        >
            <div className={styles.moscowTheme}>
                <div className={styles.pageHeader}>
                    <Heading as="h1">MoSCoW Översikt för R1</Heading>
                    <p>Denna MoSCoW-tavla visar prioriterade funktioner för Release 1 av Inner Journey.</p>
                </div>

                <main className={styles.moscowGrid}>
                    {moscowCategories.map((category) => {
                        const cardsInCategory = groupedData[category] || [];
                        // *** Generera gemen klass utan mellanslag/apostrof ***
                        const categoryClass = category.toLowerCase().replace(/[\s']/g, '');

                        return (
                            <div key={category} className={styles.moscowColumn}>
                                <Heading
                                    as="h2"
                                    className={clsx(
                                        styles.categoryHeader,
                                        styles[categoryClass] // Använd den genererade klassen (t.ex. styles.musthave)
                                    )}
                                >
                                    {category}
                                    <span className={styles.count}>({cardsInCategory.length})</span>
                                </Heading>

                                <div className={styles.cardContainer}>
                                    {cardsInCategory.map((card: ProjectItem) => (
                                        <GitHubCard key={card.id} card={card} />
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
```

### `project-boards/moscow-board/moscow-board.module.css`
```css
/* docs/src/pages/boards/moscow/moscow.module.css */

/* --- Grundläggande Sidlayout --- */
.moscowTheme {
    background-color: #f6f8fa; /* Ljusgrå bakgrund */
    color: #1f2328;
    min-height: 100vh;
    padding-bottom: 40px;
}

.pageHeader {
    text-align: center;
    padding: 40px 24px 24px 24px;
    margin-bottom: 16px;
}
.pageHeader h1 { font-size: 2rem; color: #1f2328; margin-bottom: 8px; }
.pageHeader p { font-size: 1rem; color: #57606a; max-width: 700px; margin: 0 auto; }

/* --- Grid för Kolumner --- */
.moscowGrid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
    gap: 24px;
    padding: 0 24px;
}
@media (max-width: 1200px) { .moscowGrid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) { .moscowGrid { grid-template-columns: 1fr; } }


/* --- Kolumn --- */
.moscowColumn { background: transparent; border-radius: 8px; display: flex; flex-direction: column; }

/* --- Kolumnrubrik (Accentlinje-stil) --- */
.categoryHeader {
    font-size: 1.1rem; font-weight: 600; color: #1f2328;
    margin: 0 0 16px 0; padding: 8px 0 8px 12px;
    border-left: 4px solid; /* Accentlinje */
}

/* --- Klassnamn med GEMENER för accentfärger --- */
.musthave { border-color: #d9363e; }      /* Röd */
.shouldhave { border-color: #f6a13a; }    /* Orange/Gul */
.couldhave { border-color: #1a7f37; }     /* Grön */
.wonthave { border-color: #adb5bd; }      /* Ljusgrå */
/* Eventuell klass för okategoriserade om du lägger till den kolumnen */
/* .okategoriserad { border-color: #e2e8f0; } */

.count { font-size: 0.9rem; font-weight: normal; margin-left: 8px; color: #57606a; }

/* --- Kortbehållare --- */
.cardContainer { display: flex; flex-direction: column; gap: 12px; min-height: 100px; }
.noCards { font-size: 0.9rem; color: #57606a; padding: 16px; text-align: center; font-style: italic; }

/* Kortstyling hanteras av GitHubCard/githubCard.module.css */
```

```

### `pages/project/project-boards/status-board/index.tsx`
```tsx
// docs/src/pages/project/project-boards/status-board/index.tsx
import React from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './status-board.module.css';
import { useGroupedGitHubData } from '../../../../hooks/useGroupedGitHubData';
import GitHubCard from '../../../../components/GitHubCard/GitHubCard';
import { ProjectItem } from '../../../api/api';

// Definiera Status-kategoriernas ordning och namn
const statusCategories: string[] = [
    'Ideas',
    'Backlog',
    'Ready',
    'In progress',
    'In review',
    'Done',
];

export default function StatusBoardPage(): ReactNode {
    // Använd hooken med 'status' som argument för att gruppera efter status
    const { data: groupedData, loading, error } = useGroupedGitHubData('status');

    // Hantera laddning och fel
    if (loading) {
        return (
            <Layout title="Status Board" description="Laddar...">
                <div className="container padding-vert--lg" style={{ textAlign: 'center' }}>
                    Laddar projektdata...
                </div>
            </Layout>
        );
    }
    if (error) {
        return (
            <Layout title="Fel" description="Fel vid laddning">
                <div className="container padding-vert--lg">
                    <Heading as="h1" style={{ textAlign: 'center' }}>
                        Ett fel inträffade
                    </Heading>
                    <p style={{ textAlign: 'center' }}>{error}</p>
                    <p style={{ textAlign: 'center' }}>
                        Kontrollera att backend-tjänsten körs och är nåbar.
                    </p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout
            title="Status Board"
            description="Funktioner och uppgifter grupperade efter deras nuvarande status."
        >
            <div className={styles.statusBoardTheme}>
                <div className={styles.pageHeader}>
                    <Heading as="h1">Status Board</Heading>
                    <p>Denna tavla visar uppgifter grupperade efter status (Idé, Backlog, Klar, etc.).</p>
                </div>

                <main className={styles.statusBoardGrid}>
                    {statusCategories.map((category) => {
                        const cardsInCategory = groupedData[category] || [];
                        const statusClass = category.toLowerCase().replace(/\s+/g, '');

                        return (
                            <div key={category} className={styles.statusColumn}>
                                <Heading
                                    as="h2"
                                    className={clsx(
                                        styles.categoryHeader,
                                        styles[`status${statusClass}`]
                                    )}
                                >
                                    {category}
                                    <span className={styles.count}>({cardsInCategory.length})</span>
                                </Heading>

                                <div className={styles.cardContainer}>
                                    {cardsInCategory.map((card: ProjectItem) => (
                                        <GitHubCard
                                            key={card.id}
                                            card={card}
                                        />
                                    ))}
                                    {cardsInCategory.length === 0 && (
                                        <p className={styles.noCards}>Inga kort.</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </main>
            </div>
        </Layout>
    );
}
```

### `pages/project/project-boards/status-board/status-board.module.css`
```css
/* docs/src/pages/project/project-boards/ideas-board/ideas-board.module.css */
.ideasBoardTheme {
    background-color: #f9fafb;
    color: #1f2328;
    min-height: 100vh;
    padding-bottom: 40px;
}

.pageHeader {
    text-align: center;
    padding: 40px 24px 24px 24px;
    margin-bottom: 16px;
}
.pageHeader h1 {
    font-size: 2rem;
    color: #1f2328;
    margin-bottom: 8px;
}
.pageHeader p {
    font-size: 1rem;
    color: #57606a;
    max-width: 700px;
    margin: 0 auto;
}

.ideasBoardGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    padding: 0 24px;
}

.ideasColumn {
    background: #ffffff;
    border-radius: 8px;
    padding: 12px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
}

.categoryHeader {
    font-size: 1rem;
    font-weight: 500;
    color: #1f2328;
    margin: 0 0 12px 0;
    padding: 8px 12px;
    border-radius: 6px;
    text-align: center;
    background-color: #f1f3f5;
}

/* Uppdaterade klasser för de nya ideaStatus-värdena */
.ideaNewidea {
    background-color: #e9f7ff; /* Ljusblå för "New Idea" */
    color: #0366d6;
}
.ideaUnderdiscussion {
    background-color: #fff7e6; /* Ljusgul för "Under Discussion" */
    color: #d97706;
}
.ideaEvaluated {
    background-color: #f3e8ff; /* Ljuslila för "Evaluated" */
    color: #6b21a8;
}
.ideaAccepted {
    background-color: #dcfce7; /* Ljusgrön för "Accepted" */
    color: #15803d;
}
.ideaRejected {
    background-color: #fee2e2; /* Ljusrosa för "Rejected" */
    color: #b91c1c;
}

.count {
    font-size: 0.85rem;
    font-weight: normal;
    margin-left: 6px;
    color: #57606a;
}

.cardContainer {
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-height: 100px;
}

.noCards {
    font-size: 0.9rem;
    color: #6a737d;
    padding: 16px;
    text-align: center;
    font-style: italic;
}
```

### `pages/project/project-boards/overview/index.tsx`
```tsx
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
```

### `pages/project/project-boards/overview/project-boards.module.css`
```css
/* Ljus tema-klass för /boards-sidan */
.boardsTheme {
    background-color: #f4f5f7; /* Ljusgrå bakgrund */
    color: #172b4d; /* Mörk text för bättre läsbarhet */
    min-height: 100vh;
    padding: 24px;
}

/* Grid för att visa kort */
.boardsGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    max-width: 1200px;
    margin: 0 auto;
}

/* Kort för varje board */
.boardCard {
    background: #ffffff; /* Vit bakgrund */
    border: 1px solid #dfe1e6; /* Ljusgrå kant */
    border-radius: 8px;
    padding: 24px;
    text-align: center;
    text-decoration: none;
    color: #172b4d;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.boardCard:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}

.boardIcon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    color: #fff;
    font-size: 1.5rem;
    margin: 0 auto;
}

.boardCard h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
}

.boardCard p {
    font-size: 1rem;
    color: #5e6c84;
    margin: 0;
}

/* Sidhuvud */
.pageHeader {
    text-align: center;
    margin-bottom: 32px;
}

.pageHeader h1 {
    font-size: 2rem;
    color: #172b4d;
    margin-bottom: 8px;
}

.pageHeader p {
    font-size: 1rem;
    color: #5e6c84;
}
```

### `pages/project/project-boards/ideas-board/ideas-board.module.css`
```css
/* docs/src/pages/project/project-boards/ideas-board/ideas-board.module.css */
.ideasBoardTheme {
    background-color: #f9fafb;
    color: #1f2328;
    min-height: 100vh;
    padding-bottom: 40px;
}

.pageHeader {
    text-align: center;
    padding: 40px 24px 24px 24px;
    margin-bottom: 16px;
}
.pageHeader h1 {
    font-size: 2rem;
    color: #1f2328;
    margin-bottom: 8px;
}
.pageHeader p {
    font-size: 1rem;
    color: #57606a;
    max-width: 700px;
    margin: 0 auto;
}

.ideasBoardGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    padding: 0 24px;
}

.ideasColumn {
    background: #ffffff;
    border-radius: 8px;
    padding: 12px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
}

.categoryHeader {
    font-size: 1rem;
    font-weight: 500;
    color: #1f2328;
    margin: 0 0 12px 0;
    padding: 8px 12px;
    border-radius: 6px;
    text-align: center;
    background-color: #f1f3f5;
}

/* Uppdaterade klasser för de nya ideaStatus-värdena */
.ideaNewidea {
    background-color: #e9f7ff; /* Ljusblå för "New Idea" */
    color: #0366d6;
}
.ideaUnderdiscussion {
    background-color: #fff7e6; /* Ljusgul för "Under Discussion" */
    color: #d97706;
}
.ideaEvaluated {
    background-color: #f3e8ff; /* Ljuslila för "Evaluated" */
    color: #6b21a8;
}
.ideaAccepted {
    background-color: #dcfce7; /* Ljusgrön för "Accepted" */
    color: #15803d;
}
.ideaRejected {
    background-color: #fee2e2; /* Ljusrosa för "Rejected" */
    color: #b91c1c;
}

.count {
    font-size: 0.85rem;
    font-weight: normal;
    margin-left: 6px;
    color: #57606a;
}

.cardContainer {
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-height: 100px;
}

.noCards {
    font-size: 0.9rem;
    color: #6a737d;
    padding: 16px;
    text-align: center;
    font-style: italic;
}
```

### `pages/project/project-boards/ideas-board/index.tsx`
```tsx
// docs/src/pages/project/project-boards/ideas-board/index.tsx
import React from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './ideas-board.module.css';
import { useGroupedGitHubData } from '../../../../hooks/useGroupedGitHubData';
import GitHubCard from '../../../../components/GitHubCard/GitHubCard';
import { ProjectItem } from '../../../../api/api';

// Definiera Ideas-kategoriernas ordning och namn (baserat på de nya ideaStatus-värdena)
const ideaCategories: string[] = [
    'New Idea',
    'Under Discussion',
    'Evaluated',
    'Accepted',
    'Rejected',
];

export default function IdeasBoardPage(): ReactNode {
    // Använd hooken med 'ideaStatus' som argument för att gruppera efter idéstatus
    const { data: groupedData, loading, error } = useGroupedGitHubData('ideaStatus');

    // Hantera laddning och fel
    if (loading) {
        return (
            <Layout title="Ideas Board" description="Laddar...">
                <div className="container padding-vert--lg" style={{ textAlign: 'center' }}>
                    Laddar idédata...
                </div>
            </Layout>
        );
    }
    if (error) {
        return (
            <Layout title="Fel" description="Fel vid laddning">
                <div className="container padding-vert--lg">
                    <Heading as="h1" style={{ textAlign: 'center' }}>
                        Ett fel inträffade
                    </Heading>
                    <p style={{ textAlign: 'center' }}>{error}</p>
                    <p style={{ textAlign: 'center' }}>
                        Kontrollera att backend-tjänsten körs och är nåbar.
                    </p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout
            title="Ideas Board"
            description="En översikt över idéer för Inner Journey, grupperade efter status."
        >
            <div className={styles.ideasBoardTheme}>
                <div className={styles.pageHeader}>
                    <Heading as="h1">Ideas Board</Heading>
                    <p>En plats för att utforska och diskutera nya idéer för Inner Journey.</p>
                </div>

                <main className={styles.ideasBoardGrid}>
                    {ideaCategories.map((category) => {
                        const cardsInCategory = groupedData[category] || [];
                        const ideaClass = category.toLowerCase().replace(/\s+/g, '');

                        return (
                            <div key={category} className={styles.ideasColumn}>
                                <Heading
                                    as="h2"
                                    className={clsx(
                                        styles.categoryHeader,
                                        styles[`idea${ideaClass}`]
                                    )}
                                >
                                    {category}
                                    <span className={styles.count}>({cardsInCategory.length})</span>
                                </Heading>

                                <div className={styles.cardContainer}>
                                    {cardsInCategory.map((card: ProjectItem) => (
                                        <GitHubCard
                                            key={card.id}
                                            card={card}
                                        />
                                    ))}
                                    {cardsInCategory.length === 0 && (
                                        <p className={styles.noCards}>Inga idéer i denna kategori.</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </main>
            </div>
        </Layout>
    );
}
```

### `pages/project/project-boards/moscow-board/index.tsx`
```tsx
// docs/src/pages/project/project-boards/moscow-board/index.tsx
import React from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './moscow-board.module.css';
import { useGroupedGitHubData } from '../../../../hooks/useGroupedGitHubData';
import GitHubCard from '../../../../components/GitHubCard/GitHubCard';
import { ProjectItem } from '../../../api/api';

// Definiera MoSCoW-kategoriernas ordning och namn
const moscowCategories: string[] = ['Must have', 'Should have', 'Could have', "Won't have"];

export default function MoscowPage(): ReactNode {
    // Använd hooken med 'moscow' som argument för att gruppera efter MoSCoW
    const { data: groupedData, loading, error } = useGroupedGitHubData('moscow');

    // Hantera laddning och fel
    if (loading) {
        return (
            <Layout title="MoSCoW Översikt" description="Laddar...">
                <div className="container padding-vert--lg" style={{ textAlign: 'center' }}>
                    Laddar projektdata...
                </div>
            </Layout>
        );
    }
    if (error) {
        return (
            <Layout title="Fel" description="Fel vid laddning">
                <div className="container padding-vert--lg">
                    <Heading as="h1" style={{ textAlign: 'center' }}>
                        Ett fel inträffade
                    </Heading>
                    <p style={{ textAlign: 'center' }}>{error}</p>
                    <p style={{ textAlign: 'center' }}>
                        Kontrollera att backend-tjänsten körs och är nåbar.
                    </p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout
            title="MoSCoW Översikt för R1"
            description="Visa prioriterade funktioner för Release 1 av Inner Journey"
        >
            <div className={styles.moscowTheme}>
                <div className={styles.pageHeader}>
                    <Heading as="h1">MoSCoW Översikt för R1</Heading>
                    <p>Denna MoSCoW-tavla visar prioriterade funktioner för Release 1 av Inner Journey.</p>
                </div>

                <main className={styles.moscowGrid}>
                    {moscowCategories.map((category) => {
                        const cardsInCategory = groupedData[category] || [];
                        const categoryClass = category.toLowerCase().replace(/[\s']/g, '');

                        return (
                            <div key={category} className={styles.moscowColumn}>
                                <Heading
                                    as="h2"
                                    className={clsx(
                                        styles.categoryHeader,
                                        styles[categoryClass]
                                    )}
                                >
                                    {category}
                                    <span className={styles.count}>({cardsInCategory.length})</span>
                                </Heading>

                                <div className={styles.cardContainer}>
                                    {cardsInCategory.map((card: ProjectItem) => (
                                        <GitHubCard key={card.id} card={card} />
                                    ))}
                                    {cardsInCategory.length === 0 && (
                                        <p className={styles.noCards}>Inga kort.</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </main>
            </div>
        </Layout>
    );
}
```

### `pages/project/project-boards/moscow-board/moscow-board.module.css`
```css
/* docs/src/pages/project/project-boards/moscow-board/moscow-board.module.css */
.moscowTheme {
    background-color: #f6f8fa;
    color: #1f2328;
    min-height: 100vh;
    padding-bottom: 40px;
}

.pageHeader {
    text-align: center;
    padding: 40px 24px 24px 24px;
    margin-bottom: 16px;
}
.pageHeader h1 { font-size: 2rem; color: #1f2328; margin-bottom: 8px; }
.pageHeader p { font-size: 1rem; color: #57606a; max-width: 700px; margin: 0 auto; }

.moscowGrid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    padding: 0 24px;
}
@media (max-width: 1200px) { .moscowGrid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) { .moscowGrid { grid-template-columns: 1fr; } }

.moscowColumn { background: transparent; border-radius: 8px; display: flex; flex-direction: column; }

.categoryHeader {
    font-size: 1.1rem; font-weight: 600; color: #1f2328;
    margin: 0 0 16px 0; padding: 8px 0 8px 12px;
    border-left: 4px solid;
}

.musthave { border-color: #d9363e; }
.shouldhave { border-color: #f6a13a; }
.couldhave { border-color: #1a7f37; }
.wonthave { border-color: #adb5bd; }

.count { font-size: 0.9rem; font-weight: normal; margin-left: 8px; color: #57606a; }

.cardContainer { display: flex; flex-direction: column; gap: 12px; min-height: 100px; }
.noCards { font-size: 0.9rem; color: #57606a; padding: 16px; text-align: center; font-style: italic; }
```

### `pages/about/partners-and-team/index.tsx`
```tsx
// src/pages/about/partners-and-team/index.tsx
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { motion } from 'framer-motion';
import { translate } from '@docusaurus/Translate';
import styles from './partners-and-team.module.css';

// --- Animationsvarianter ---
const fadeInYProps = (delay = 0, y = 20, duration = 0.6) => ({
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration, delay, ease: 'easeOut' },
});

const sectionTitleProps = {
    initial: { opacity: 0, y: -15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.5, ease: 'easeOut' },
};

const staggerContainerProps = (staggerChildren = 0.1) => ({
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, amount: 0.1 },
    variants: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren, delayChildren: 0.1 } },
    },
});

const itemFadeInProps = {
    variants: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    },
};

// --- Komponenter ---

function PartnersHeader() {
    return (
        <header className={clsx('hero', styles.heroBanner)}>
            <div className={clsx("container", styles.heroContainer)}>
                <motion.div {...fadeInYProps(0.2, -20)}>
                    <Heading as="h1" className={styles.heroTitle}>
                        {translate({ id: 'partners.header.title', message: 'Join Us in Building the Future of Personal Development' })}
                    </Heading>
                </motion.div>
                <motion.p className={styles.heroSubtitle} {...fadeInYProps(0.4, 20)}>
                    {translate({ id: 'partners.header.subtitle', message: 'Inner Journey is looking for passionate team members and strategic partners to revolutionize how people grow and reach their potential – through a unique platform where heart meets technology.' })}
                </motion.p>
                <motion.div {...fadeInYProps(0.6, 20)}>
                    <Link className={clsx('button button--lg', styles.ctaButton)} to="#interest-form">
                        {translate({ id: 'partners.header.cta', message: 'Express Interest & Explore Opportunities' })}
                    </Link>
                </motion.div>
            </div>
        </header>
    );
}

function WhyJoinSection() {
    return (
        <motion.section className={styles.whySection}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'partners.whyjoin.title', message: 'Are You Driven by Purpose and Innovation?' })}
                    </Heading>
                </motion.div>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.1)}>
                    {translate({ id: 'partners.whyjoin.text1', message: 'Inner Journey is rooted in a vision of a world built on <strong>unity, heart intelligence, and sustainable change</strong>. We believe in the power of technology to amplify human potential, not replace it.' })}
                </motion.p>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.2)}>
                    {translate({ id: 'partners.whyjoin.text2', message: 'With us, you’ll work in a <strong>flexible, distributed team</strong> where <strong>authenticity and well-being</strong> are valued as much as results. We’re looking for individuals who want to contribute to something meaningful and join an exciting growth journey.' })}
                </motion.p>
                <motion.div {...fadeInYProps(0.3)} style={{textAlign: 'center', marginTop: '1.5rem'}}>
                    <Link className={styles.linkStyled} to="/docs/project/visionar-grund">
                        {translate({ id: 'partners.whyjoin.link', message: 'Learn More About Our Visionary Foundation' })}
                    </Link>
                </motion.div>
            </div>
        </motion.section>
    );
}

function WhatWeBuildSection() {
    const techStack = [
        { name: 'React', logo: '/img/logos/react-logo.svg' },
        { name: 'Python', logo: '/img/logos/python-logo.svg' },
        { name: 'Firebase', logo: '/img/logos/firebase-logo.svg' },
        { name: 'Google Cloud', logo: '/img/logos/google-cloud-logo.svg' },
        { name: 'Dialogflow CX', logo: '/img/logos/dialogflow-logo.svg' },
    ];
    return (
        <motion.section className={styles.whatWeBuildSection}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'partners.whatwebuild.title', message: 'An Intelligent Platform for Inner Journeys' })}
                    </Heading>
                </motion.div>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.1)}>
                    {translate({ id: 'partners.whatwebuild.text1', message: 'We’re developing a modern PWA that acts as a companion for self-discovery. Through AI, smart journaling, and integrated tools, we create a personalized and adaptive experience. Our tech stack includes:' })}
                </motion.p>
                <motion.div className={styles.techLogoGrid} {...staggerContainerProps(0.1)}>
                    {techStack.map((tech) => (
                        <motion.div key={tech.name} className={styles.techLogoItem} variants={itemFadeInProps}>
                            <img src={tech.logo} alt={`${tech.name} logo`} className={styles.techLogo}/>
                            <span className={styles.techLogoLabel}>{tech.name}</span>
                        </motion.div>
                    ))}
                </motion.div>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.2)} style={{marginTop: '2.5rem'}}>
                    {translate({ id: 'partners.whatwebuild.text2', message: 'You’ll have the chance to work with exciting technology and contribute directly to a product that makes a difference. Our methodology is agile, user-centered, and focused on continuous improvement.' })}
                </motion.p>
            </div>
        </motion.section>
    );
}

function RolesSection() {
    return (
        <section className={styles.rolesSection}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'partners.roles.title', message: 'How Do You Want to Contribute?' })}
                    </Heading>
                </motion.div>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.1)}>
                    {translate({ id: 'partners.roles.text', message: 'We’re currently looking for passionate individuals and partners to help shape Inner Journey from the ground up. Whether you’re an expert in a specific field or have a broader profile, there are opportunities to make an impact:' })}
                </motion.p>
                <motion.div className={styles.rolesGrid} {...staggerContainerProps(0.1)}>
                    <motion.div className={styles.roleCard} variants={itemFadeInProps} whileHover={{ scale: 1.03, y: -4, transition: { duration: 0.2 } }}>
                        <div className={styles.roleIcon}>🧭</div>
                        <Heading as="h3" className={styles.roleTitle}>
                            {translate({ id: 'partners.roles.strategicDirection.title', message: 'Strategic Direction (Project Management)' })}
                        </Heading>
                        <p className={styles.roleText}>
                            {translate({ id: 'partners.roles.strategicDirection.text', message: 'Lead project initiatives, ensure deliveries according to the roadmap, and help shape our overall strategy.' })}
                        </p>
                    </motion.div>
                    <motion.div className={styles.roleCard} variants={itemFadeInProps} whileHover={{ scale: 1.03, y: -4, transition: { duration: 0.2 } }}>
                        <div className={styles.roleIcon}>💻</div>
                        <Heading as="h3" className={styles.roleTitle}>
                            {translate({ id: 'partners.roles.createExperience.title', message: 'Create the Experience (Development)' })}
                        </Heading>
                        <p className={styles.roleText}>
                            {translate({ id: 'partners.roles.createExperience.text', message: 'Build robust backend logic (Python/Firebase) or intuitive frontend interfaces (React) and implement AI features.' })}
                        </p>
                    </motion.div>
                    <motion.div className={styles.roleCard} variants={itemFadeInProps} whileHover={{ scale: 1.03, y: -4, transition: { duration: 0.2 } }}>
                        <div className={styles.roleIcon}>📊</div>
                        <Heading as="h3" className={styles.roleTitle}>
                            {translate({ id: 'partners.roles.driveInsights.title', message: 'Drive Insights (Analysis)' })}
                        </Heading>
                        <p className={styles.roleText}>
                            {translate({ id: 'partners.roles.driveInsights.text', message: 'Dive into user data and market trends to identify insights that drive product development and growth strategies.' })}
                        </p>
                    </motion.div>
                    <motion.div className={styles.roleCard} variants={itemFadeInProps} whileHover={{ scale: 1.03, y: -4, transition: { duration: 0.2 } }}>
                        <div className={styles.roleIcon}>🤝</div>
                        <Heading as="h3" className={styles.roleTitle}>
                            {translate({ id: 'partners.roles.buildBridges.title', message: 'Build Bridges (Partnerships)' })}
                        </Heading>
                        <p className={styles.roleText}>
                            {translate({ id: 'partners.roles.buildBridges.text', message: 'Develop and manage strategic partnerships with organizations, influencers, or other stakeholders in well-being.' })}
                        </p>
                    </motion.div>
                    <motion.div className={styles.roleCard} variants={itemFadeInProps} whileHover={{ scale: 1.03, y: -4, transition: { duration: 0.2 } }}>
                        <div className={styles.roleIcon}>💡</div>
                        <Heading as="h3" className={styles.roleTitle}>
                            {translate({ id: 'partners.roles.yourExpertise.title', message: 'Your Expertise (Other)' })}
                        </Heading>
                        <p className={styles.roleText}>
                            {translate({ id: 'partners.roles.yourExpertise.text', message: 'Do you have skills in content creation, community management, UX/UI design, or marketing? We’re open to talent!' })}
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

function CultureSection() {
    return (
        <motion.section className={styles.cultureSection}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'partners.culture.title', message: 'Our Work Culture: Flexibility & Trust' })}
                    </Heading>
                </motion.div>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.1)}>
                    {translate({ id: 'partners.culture.text', message: 'We are a <strong>distributed team</strong> that believes in freedom with responsibility. With us, you get:' })}
                </motion.p>
                <motion.ul className={styles.cultureList} {...staggerContainerProps(0.1)}>
                    <motion.li variants={itemFadeInProps}>
                        🤸‍♀️ <strong>{translate({ id: 'partners.culture.flexibility.title', message: 'Flexibility' })}</strong> {translate({ id: 'partners.culture.flexibility.text', message: 'Work where and when you’re most productive (with a recommended core time of 10-14 CET).' })}
                    </motion.li>
                    <motion.li variants={itemFadeInProps}>
                        💬 <strong>{translate({ id: 'partners.culture.openCommunication.title', message: 'Open Communication' })}</strong> {translate({ id: 'partners.culture.openCommunication.text', message: 'We use Slack for quick dialogue and value transparency.' })}
                    </motion.li>
                    <motion.li variants={itemFadeInProps}>
                        🌱 <strong>{translate({ id: 'partners.culture.development.title', message: 'Development' })}</strong> {translate({ id: 'partners.culture.development.text', message: 'Opportunities for learning through internal resources and an external training budget (5k SEK/year).' })}
                    </motion.li>
                    <motion.li variants={itemFadeInProps}>
                        💖 <strong>{translate({ id: 'partners.culture.wellBeing.title', message: 'Well-Being' })}</strong> {translate({ id: 'partners.culture.wellBeing.text', message: 'Focus on balance, no expectation of constant availability, and extra recovery days.' })}
                    </motion.li>
                    <motion.li variants={itemFadeInProps}>
                        🤝 <strong>{translate({ id: 'partners.culture.collaboration.title', message: 'Collaboration' })}</strong> {translate({ id: 'partners.culture.collaboration.text', message: 'A flat organization where everyone’s input is valued, and we support each other.' })}
                    </motion.li>
                </motion.ul>
                <motion.div {...fadeInYProps(0.3)} style={{textAlign: 'center', marginTop: '2rem'}}>
                    <Link className={styles.linkStyled} to="/docs/hr/policy-fr-distansarbete-2025">
                        {translate({ id: 'partners.culture.link', message: 'Read Our Full Remote Work Policy' })}
                    </Link>
                </motion.div>
            </div>
        </motion.section>
    );
}

function InterestForm() {
    return (
        <motion.section id="interest-form" className={styles.formSection} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
            <div className={clsx('container', styles.sectionContainer, styles.formContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'partners.form.title', message: 'Does This Sound Like You?' })}
                    </Heading>
                </motion.div>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.1)}>
                    {translate({ id: 'partners.form.text', message: 'Want to contribute to our vision? Fill out the form, and we’ll reach out to discuss how we can work together.' })}
                </motion.p>
                <form action="https://formspree.io/f/YOUR_PARTNER_FORMSPREE_ID" method="POST" className={styles.form}>
                    <motion.div className={styles.formGroup} {...fadeInYProps(0.15)}>
                        <label htmlFor="name">{translate({ id: 'partners.form.name', message: 'Name' })}</label>
                        <input type="text" id="name" name="name" required />
                    </motion.div>
                    <motion.div className={styles.formGroup} {...fadeInYProps(0.20)}>
                        <label htmlFor="email">{translate({ id: 'partners.form.email', message: 'Email' })}</label>
                        <input type="email" id="email" name="email" required />
                    </motion.div>
                    <motion.div className={styles.formGroup} {...fadeInYProps(0.25)}>
                        <label htmlFor="role">{translate({ id: 'partners.form.role', message: 'Primary Area of Interest' })}</label>
                        <select id="role" name="role" required>
                            <option value="">{translate({ id: 'partners.form.role.option0', message: 'Select area...' })}</option>
                            <option value="Projektledning">{translate({ id: 'partners.form.role.option1', message: 'Project Management' })}</option>
                            <option value="Utveckling">{translate({ id: 'partners.form.role.option2', message: 'Development (Frontend/Backend/AI)' })}</option>
                            <option value="Analys">{translate({ id: 'partners.form.role.option3', message: 'Data Analysis/Market Research' })}</option>
                            <option value="Partnerskap">{translate({ id: 'partners.form.role.option4', message: 'Strategic Partnership' })}</option>
                            <option value="CoachingInnehall">{translate({ id: 'partners.form.role.option5', message: 'Coaching/Content Creation' })}</option>
                            <option value="Annat">{translate({ id: 'partners.form.role.option6', message: 'Other' })}</option>
                        </select>
                    </motion.div>
                    <motion.div className={styles.formGroup} {...fadeInYProps(0.30)}>
                        <label htmlFor="message">{translate({ id: 'partners.form.message', message: 'Your Thoughts & Ideas (Optional)' })}</label>
                        <textarea id="message" name="message" rows={4} placeholder={translate({ id: 'partners.form.message.placeholder', message: 'How do you see yourself or your organization contributing to Inner Journey?' })}></textarea>
                    </motion.div>
                    <motion.button type="submit" className={clsx('button', styles.submitButton)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} {...fadeInYProps(0.35)}>
                        {translate({ id: 'partners.form.submit', message: 'Submit Interest' })}
                    </motion.button>
                </form>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.4)} style={{marginTop: '2.5rem', fontSize: '1rem'}}>
                    {translate({ id: 'partners.form.discord.text', message: 'Prefer an informal chat? <Link to="https://discord.gg/2j5a2Gze8W">Find us on Discord!</Link>' })}
                </motion.p>
            </div>
        </motion.section>
    );
}

export default function PartnersPage(): ReactNode {
    return (
        <Layout
            title={translate({ id: 'partners.layout.title', message: 'Join Inner Journey | Partners & Team Opportunities' })}
            description={translate({ id: 'partners.layout.description', message: 'Join Inner Journey as a partner or team member to help build a platform for personal development, combining heart and technology.' })}
        >
            <PartnersHeader />
            <main>
                <WhyJoinSection />
                <WhatWeBuildSection />
                <RolesSection />
                <CultureSection />
                <InterestForm />
            </main>
        </Layout>
    );
}
```

### `pages/about/partners-and-team/partners-and-team.module.css`
```css
/* docs/src/pages/partners-och-medarbetare/partners-och-medarbetare.module.css */

/* --- Hero Section --- */
.heroBanner {
    padding: 8rem 1rem 7rem 1rem;
    text-align: center;
    position: relative;
    overflow: hidden;
    /* Behåll original orange/coral gradient */
    background: linear-gradient(135deg, #ff6f61 0%, #ff9f43 100%);
    color: #ffffff;
}
.heroContainer { position: relative; z-index: 1; max-width: 900px; margin: 0 auto; }
.heroTitle {
    color: #ffffff;
    font-size: 3.3rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}
.heroSubtitle {
    color: #fff5e6; /* Mycket ljus orange/vit */
    font-size: 1.4rem;
    font-weight: 400;
    margin-bottom: 2.5rem;
    opacity: 0.95;
    max-width: 720px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.7;
}
.ctaButton { /* Knapp i header */
    background-color: #ffffff;
    color: #ff6f61; /* Matcha gradient */
    border: none;
    padding: 0.9rem 2rem;
    font-weight: 600;
    font-size: 1.1rem;
    border-radius: 50px; /* Pill shape */
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    text-decoration: none;
    display: inline-block;
}
.ctaButton:hover {
    background-color: #fff0e8;
    color: #e15a4f;
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* --- Generella Sektionsstilar --- */
.whySection, .whatWeBuildSection, .rolesSection, .cultureSection, .formSection {
    padding: 5.5rem 1rem;
    overflow: hidden;
}
.whySection, .rolesSection, .formSection { background-color: #ffffff; }
.whatWeBuildSection, .cultureSection { background-color: #fffaf7; } /* Mycket ljus orange */

.sectionContainer { padding: 2rem 0; max-width: 1040px; margin: 0 auto; }
.sectionTitle {
    color: #ff6f61; /* Primär accentfärg */
    font-size: 2.7rem;
    margin-bottom: 2rem;
    text-align: center;
    font-weight: 700;
}
.sectionText {
    color: #444;
    font-size: 1.15rem;
    line-height: 1.8;
    text-align: center;
    max-width: 750px;
    margin: 0 auto 1.5rem auto;
}
.sectionText strong { font-weight: 600; color: #333; } /* För <strong> taggar */
.sectionText a, .linkStyled { color: #ff6f61; text-decoration: none; font-weight: 500; transition: color 0.2s ease; }
.sectionText a:hover, .linkStyled:hover { text-decoration: underline; color: #e15a4f; }

/* --- What We Build Section --- */
.whatWeBuildSection { /* Behåll padding etc. */ }

/* Grid för Tech Logotyper */
.techLogoGrid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 2.5rem 3rem;
    margin: 2.5rem auto 0 auto;
    max-width: 800px;
}
.techLogoItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    text-align: center;
}
.techLogo {
    height: 45px;
    max-width: 150px;
    object-fit: contain;
    opacity: 0.85;
    transition: opacity 0.2s ease-out;
}
.techLogoItem:hover .techLogo { opacity: 1; }
.techLogoLabel {
    font-size: 0.85rem;
    color: #666;
    font-weight: 500;
}


/* --- Roles Section --- */
.rolesGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); gap: 2rem; margin: 3rem 0 0 0; }
.roleCard {
    background: #ffffff; border-radius: 10px; box-shadow: 0 6px 18px rgba(0, 0, 0, 0.07);
    padding: 2.2rem 2rem; transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
    text-align: center; border-top: 4px solid #ff9f43;
    display: flex; flex-direction: column; align-items: center;
}
.roleIcon { font-size: 2.8rem; margin-bottom: 1.25rem; display: inline-block; color: #ff6f61; line-height: 1; }
.roleTitle { color: #333; font-size: 1.3rem; margin-bottom: 0.75rem; font-weight: 600; }
.roleText { color: #555; font-size: 1rem; line-height: 1.65; flex-grow: 1; }

/* --- Culture Section --- */
.cultureList { list-style: none; padding: 0; margin: 2.5rem auto 0 auto; max-width: 750px; }
.cultureList li {
    display: flex; align-items: flex-start; gap: 1rem;
    padding: 1rem 0; border-bottom: 1px solid #fff0e8;
    font-size: 1.1rem; color: #444; line-height: 1.7;
}
.cultureList li:last-child { border-bottom: none; }
.cultureList li span:first-child { /* Ikon */
    font-size: 1.4rem; color: #ff9f43; padding-top: 0.1em;
}
.cultureList li strong { font-weight: 600; color: #333; } /* Stil för <strong> */


/* --- Form Section --- */
.formContainer { max-width: 650px !important; }
.form { margin: 2.5rem auto 0 auto; display: flex; flex-direction: column; gap: 1.25rem; }
.formGroup { display: flex; flex-direction: column; }
.formGroup label { font-size: 0.95rem; color: #555; margin-bottom: 0.5rem; font-weight: 500; padding-left: 0.25rem; }
.formGroup input, .formGroup textarea, .formGroup select {
    padding: 0.9rem 1.1rem; border: 1px solid #d8dee4; border-radius: 8px;
    font-size: 1rem; line-height: 1.5; width: 100%; box-sizing: border-box;
    transition: border-color 0.2s ease, box-shadow 0.2s ease; background-color: #fdfdfd; font-family: inherit;
}
.formGroup select {
    appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23aaa'%3E%3Cpath d='M7 10l5 5 5-5H7z'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 1rem center; background-size: 1.2em; padding-right: 2.5rem;
}
.formGroup input::placeholder, .formGroup textarea::placeholder { color: #aaa; opacity: 1; }
.formGroup input:focus, .formGroup textarea:focus, .formGroup select:focus {
    border-color: #ff9f43; outline: none; box-shadow: 0 0 0 3px rgba(255, 159, 67, 0.25); background-color: #fff;
}
.formGroup textarea { resize: vertical; min-height: 120px; }

.submitButton {
    background: #ff6f61; color: #ffffff; border: none; padding: 1rem 2.5rem;
    font-weight: 600; font-size: 1.15rem; border-radius: 50px; cursor: pointer;
    transition: all 0.2s ease; align-self: center; margin-top: 1.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15); min-width: 220px;
}
.submitButton:hover { background: #e15a4f; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); }


/* --- Media Queries --- */
@media screen and (max-width: 996px) {
    .heroTitle { font-size: 2.8rem; }
    .heroSubtitle { font-size: 1.3rem; }
    .sectionTitle { font-size: 2.4rem; }
    .sectionText { font-size: 1.1rem; }
    .techLogo { height: 40px; }
    .techLogoGrid { gap: 2rem; }
    .rolesGrid { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
}

@media screen and (max-width: 768px) {
    .heroBanner { padding: 6rem 1rem 5rem 1rem; }
    .heroTitle { font-size: 2.2rem; }
    .heroSubtitle { font-size: 1.15rem; }
    .sectionTitle { font-size: 2.1rem; }
    .techLogoGrid { gap: 1.5rem 2rem; }
    .techLogo { height: 35px; }
    .rolesGrid { grid-template-columns: 1fr; gap: 1.5rem;}
    .roleTitle { font-size: 1.2rem; }
    .roleText { font-size: 0.95rem; }
    .cultureList li { font-size: 1rem; gap: 0.8rem; }
    .valueIcon { font-size: 1.3rem; }
    .form { max-width: 100%; }
    .submitButton { width: 100%; }
}
```

### `pages/about/for-school/for-school.module.css`
```css
/* src/pages/about/for-work/for-work.module.css */

/* --- Hero Section --- */
.heroBanner {
    padding: 7rem 1rem; /* Samma som for-school */
    text-align: center;
    position: relative;
    overflow: hidden;
    background: linear-gradient(145deg, #1e3a8a 0%, #3b82f6 80%, #60a5fa 100%); /* Blå gradient för professionell känsla */
    color: #ffffff;
}

.heroTitle {
    color: #ffffff;
    font-size: 3.2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
}

.heroSubtitle {
    color: #ffffff;
    font-size: 1.4rem;
    font-weight: 400;
    margin-bottom: 2.5rem;
    opacity: 0.95;
    max-width: 680px;
    margin-left: auto;
    margin-right: auto;
}

/* CTA-knapp i header */
.ctaButton {
    background-color: #ffffff;
    color: #1e3a8a; /* Mörkblå text */
    border: none;
    padding: 0.9rem 2rem;
    font-weight: 600;
    font-size: 1.1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.ctaButton:hover {
    background-color: #e0f2fe; /* Ljusblå ton vid hover */
    color: #1e40af;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

/* --- Generella Sektionsstilar --- */
.whySection, .howItWorksSection, .benefitsSection, .philosophySection, .futureSection, .formSection {
    padding: 5rem 1rem;
    overflow: hidden;
}

.whySection, .philosophySection, .formSection {
    background-color: #ffffff;
}

.howItWorksSection, .benefitsSection, .futureSection {
    background-color: #f0f7ff; /* Ljusblå bakgrund för att matcha temat */
}

.sectionContainer {
    padding: 2rem 0;
    max-width: 960px;
    margin: 0 auto;
}

.sectionTitle {
    color: #1e3a8a; /* Mörkblå som primär accentfärg */
    font-size: 2.6rem;
    margin-bottom: 2rem;
    text-align: center;
}

.sectionText {
    color: #333;
    font-size: 1.15rem;
    line-height: 1.75;
    text-align: center;
    max-width: 720px;
    margin: 0 auto 1.5rem auto;
}

.sectionText a {
    color: #1e3a8a;
    text-decoration: none;
    font-weight: 500;
}
.sectionText a:hover {
    text-decoration: underline;
}

/* --- How It Works Section --- */
.howItWorksList {
    list-style: none;
    padding: 0;
    margin: 3rem 0 0 0;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
}

.howItWorksStep {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    margin-bottom: 2.5rem;
    padding: 1.5rem;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    border-left: 4px solid #3b82f6; /* Ljusblå accentkant */
}

.stepIcon {
    font-size: 1.8rem;
    padding-top: 0.2rem;
    color: #1e3a8a; /* Mörkblå ikon */
}

.stepTitle {
    font-size: 1.3rem;
    color: #333;
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.stepText {
    font-size: 1rem;
    line-height: 1.6;
    color: #555;
}

/* --- Benefits Section --- */
.benefitsList {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin: 3rem 0;
}

.benefitCard {
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
    padding: 2rem 1.5rem;
    transition: box-shadow 0.3s ease;
    text-align: center;
    border: 1px solid #e0e7ff; /* Ljusblå kant */
    display: flex;
    flex-direction: column;
    align-items: center;
}

.benefitCard:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.benefitIcon {
    font-size: 2.5rem;
    margin-bottom: 1.25rem;
    display: inline-block;
    color: #1e3a8a; /* Mörkblå ikon */
}

.benefitCard h3 {
    color: #333;
    font-size: 1.3rem;
    margin-bottom: 0.75rem;
    font-weight: 600;
}

.benefitCard p {
    color: #555;
    font-size: 0.95rem;
    line-height: 1.6;
    flex-grow: 1;
}

/* --- Philosophy Section --- */
.philosophyContainer {
    border-left: 5px solid #1e3a8a; /* Mörkblå accentkant */
    padding-left: 2rem;
}

.philosophySection .sectionText {
    font-style: italic;
    color: #444;
}

.philosophySection .sectionText:first-of-type {
    font-size: 1.25rem;
    margin-bottom: 2rem;
}

/* --- Future Section --- */
.futureList {
    list-style: none;
    padding: 0;
    margin: 2.5rem auto 0 auto;
    max-width: 700px;
}

.futureList li {
    padding: 0.8rem 0 0.8rem 1.5rem;
    margin-bottom: 1rem;
    position: relative;
    font-size: 1.05rem;
    color: #444;
    line-height: 1.6;
}

.futureList li::before {
    content: '✨';
    position: absolute;
    left: 0;
    top: 0.9rem;
    font-size: 0.9rem;
}

/* --- Form Section --- */
.formSection {
    padding: 5rem 1rem;
    background-color: #ffffff;
    overflow: hidden;
}

.formSection .sectionContainer {
    padding: 2rem 0;
    max-width: 960px;
    margin: 0 auto;
}

.formSection .sectionTitle {
    color: #1e3a8a; /* Mörkblå rubrik */
    font-size: 2.6rem;
    margin-bottom: 1.5rem;
    text-align: center;
}

.formSection .sectionText {
    color: #333;
    font-size: 1.15rem;
    line-height: 1.75;
    text-align: center;
    max-width: 720px;
    margin: 0 auto 2rem auto;
}

/* --- Formulär - Uppdaterade Stilar --- */
.form {
    max-width: 550px;
    margin: 2rem auto 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.formGroup {
    display: flex;
    flex-direction: column;
    position: relative;
}

.formGroup label {
    font-size: 0.95rem;
    color: #555;
    margin-bottom: 0.5rem;
    font-weight: 500;
    padding-left: 0.25rem;
}

.formGroup input, .formGroup textarea {
    padding: 0.9rem 1.1rem;
    border: 1px solid #d8dee4;
    border-radius: 8px;
    font-size: 1rem;
    line-height: 1.5;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    background-color: #fdfdfd;
}

.formGroup input::placeholder, .formGroup textarea::placeholder {
    color: #aaa;
    opacity: 1;
}

.formGroup input:focus, .formGroup textarea:focus {
    border-color: #3b82f6; /* Ljusblå fokusfärg */
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
    background-color: #fff;
}

.formGroup textarea {
    resize: vertical;
    min-height: 120px;
    font-family: inherit;
}

.submitButton {
    background: #1e3a8a; /* Mörkblå knapp */
    color: #ffffff;
    border: none;
    padding: 1rem 2.5rem;
    font-weight: 600;
    font-size: 1.15rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    align-self: center;
    margin-top: 1.5rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: auto;
    min-width: 200px;
}

.submitButton:hover {
    background: #3b82f6; /* Ljusare blå vid hover */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* --- Media Queries --- */
@media screen and (max-width: 768px) {
    .form {
        max-width: 90%;
    }
    .submitButton {
        width: 100%;
        max-width: none;
    }
}
```

### `pages/about/for-school/index.tsx`
```tsx
// src/pages/about/schools/index.tsx
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { motion } from 'framer-motion';
import { translate } from '@docusaurus/Translate';
import styles from '../for-school/for-school.module.css'; // Återanvänder befintlig CSS från coaches-sidan

// --- Animationsvarianter ---
const fadeInProps = {
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, ease: 'easeOut' },
};

const sectionTitleProps = {
    initial: { opacity: 0, y: -15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.5, ease: 'easeOut' },
};

const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, ease: 'easeOut' },
    },
};

const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const cardItemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

// --- Komponenter ---

function SchoolsHeader() {
    return (
        <header className={clsx('hero', styles.heroBanner)}>
            <div className="container">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}>
                    <Heading as="h1" className={styles.heroTitle}>
                        {translate({ id: 'schools.header.title', message: 'Empower Your Students with Inner Journey' })}
                    </Heading>
                </motion.div>
                <motion.p className={styles.heroSubtitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}>
                    {translate({ id: 'schools.header.subtitle', message: 'Build resilience, prevent bullying, and nurture self-awareness in a safe, engaging way – all with AI-tailored tools designed for young minds.' })}
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}>
                    <Link className={clsx('button button--lg', styles.ctaButton)} to="#interest-form">
                        {translate({ id: 'schools.header.cta', message: 'Bring Inner Journey to Your School' })}
                    </Link>
                </motion.div>
            </div>
        </header>
    );
}

function WhyInnerJourneyForSchools() {
    return (
        <motion.section className={styles.whySection} {...fadeInProps}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'schools.why.title', message: 'A Healthier School Starts Within' })}
                    </Heading>
                </motion.div>
                <p className={styles.sectionText}>
                    {translate({ id: 'schools.why.text', message: 'Today’s students face stress, peer pressure, and emotional challenges. Inner Journey offers a safe space to explore their inner world, build empathy, and grow stronger – without judgment or pressure. Equip your school with tools that make a real difference.' })}
                </p>
            </div>
        </motion.section>
    );
}

function HowItWorksSection() {
    return (
        <motion.section className={styles.howItWorksSection} {...fadeInProps}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'schools.howitworks.title', message: 'Simple Steps to Stronger Students' })}
                    </Heading>
                </motion.div>
                <motion.ol className={styles.howItWorksList} variants={listContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                    <motion.li className={styles.howItWorksStep} variants={listItemVariants}>
                        <span className={styles.stepIcon}>🌱</span>
                        <div>
                            <Heading as="h3" className={styles.stepTitle}>
                                {translate({ id: 'schools.howitworks.startExploring.title', message: 'Start Exploring' })}
                            </Heading>
                            <p className={styles.stepText}>
                                {translate({ id: 'schools.howitworks.startExploring.text', message: 'Students begin with fun, AI-guided activities like meditations or eye-contact exercises to spark self-discovery.' })}
                            </p>
                        </div>
                    </motion.li>
                    <motion.li className={styles.howItWorksStep} variants={listItemVariants}>
                        <span className={styles.stepIcon}>✍️</span>
                        <div>
                            <Heading as="h3" className={styles.stepTitle}>
                                {translate({ id: 'schools.howitworks.reflect.title', message: 'Reflect & Grow' })}
                            </Heading>
                            <p className={styles.stepText}>
                                {translate({ id: 'schools.howitworks.reflect.text', message: 'Using the Dynamic Journal, they reflect on their feelings and experiences at their own pace.' })}
                            </p>
                        </div>
                    </motion.li>
                    <motion.li className={styles.howItWorksStep} variants={listItemVariants}>
                        <span className={styles.stepIcon}>🤝</span>
                        <div>
                            <Heading as="h3" className={styles.stepTitle}>
                                {translate({ id: 'schools.howitworks.connect.title', message: 'Connect & Share' })}
                            </Heading>
                            <p className={styles.stepText}>
                                {translate({ id: 'schools.howitworks.connect.text', message: 'Safe community features let students share insights and build empathy with peers.' })}
                            </p>
                        </div>
                    </motion.li>
                    <motion.li className={styles.howItWorksStep} variants={listItemVariants}>
                        <span className={styles.stepIcon}>🧑‍🏫</span>
                        <div>
                            <Heading as="h3" className={styles.stepTitle}>
                                {translate({ id: 'schools.howitworks.support.title', message: 'Support from Coaches' })}
                            </Heading>
                            <p className={styles.stepText}>
                                {translate({ id: 'schools.howitworks.support.text', message: 'Teachers or trained coaches can guide students with tailored feedback and activities.' })}
                            </p>
                        </div>
                    </motion.li>
                </motion.ol>
            </div>
        </motion.section>
    );
}

function BenefitsForSchools() {
    return (
        <section className={styles.benefitsSection}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'schools.benefits.title', message: 'Benefits for Your School & Students' })}
                    </Heading>
                </motion.div>
                <motion.div className={styles.benefitsList} variants={listContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                    <motion.div className={styles.benefitCard} variants={cardItemVariants} whileHover={{ scale: 1.04, y: -5, transition: { duration: 0.2 } }} whileTap={{ scale: 0.98 }}>
                        <span className={styles.benefitIcon}>🌟</span>
                        <Heading as="h3">{translate({ id: 'schools.benefits.selfDiscovery.title', message: 'Self-Discovery' })}</Heading>
                        <p>{translate({ id: 'schools.benefits.selfDiscovery.text', message: 'AI-tailored tools help students explore their emotions and strengths safely.' })}</p>
                    </motion.div>
                    <motion.div className={styles.benefitCard} variants={cardItemVariants} whileHover={{ scale: 1.04, y: -5, transition: { duration: 0.2 } }} whileTap={{ scale: 0.98 }}>
                        <span className={styles.benefitIcon}>🤝</span>
                        <Heading as="h3">{translate({ id: 'schools.benefits.empathy.title', message: 'Build Empathy' })}</Heading>
                        <p>{translate({ id: 'schools.benefits.empathy.text', message: 'Activities like eye-contact exercises foster understanding and reduce bullying.' })}</p>
                    </motion.div>
                    <motion.div className={styles.benefitCard} variants={cardItemVariants} whileHover={{ scale: 1.04, y: -5, transition: { duration: 0.2 } }} whileTap={{ scale: 0.98 }}>
                        <span className={styles.benefitIcon}>🧘</span>
                        <Heading as="h3">{translate({ id: 'schools.benefits.resilience.title', message: 'Boost Resilience' })}</Heading>
                        <p>{translate({ id: 'schools.benefits.resilience.text', message: 'Simple meditations and reflections help students manage stress and grow stronger.' })}</p>
                    </motion.div>
                    <motion.div className={styles.benefitCard} variants={cardItemVariants} whileHover={{ scale: 1.04, y: -5, transition: { duration: 0.2 } }} whileTap={{ scale: 0.98 }}>
                        <span className={styles.benefitIcon}>🏫</span>
                        <Heading as="h3">{translate({ id: 'schools.benefits.schoolSupport.title', message: 'Support for Schools' })}</Heading>
                        <p>{translate({ id: 'schools.benefits.schoolSupport.text', message: 'Free to start, with premium options – a cost-effective way to enhance student well-being.' })}</p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

function PhilosophySection() {
    return (
        <motion.section className={styles.philosophySection} {...fadeInProps}>
            <div className={clsx('container', styles.sectionContainer, styles.philosophyContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'schools.philosophy.title', message: 'Our Philosophy: Growth Without Judgment' })}
                    </Heading>
                </motion.div>
                <p className={styles.sectionText}>
                    {translate({ id: 'schools.philosophy.text1', message: '"A platform that, through research-based, holistic tools, guides you to self-discovery and personal development – <strong>without telling you what to do.</strong>"' })}
                </p>
                <p className={styles.sectionText}>
                    {translate({ id: 'schools.philosophy.text2', message: 'We empower students to find their own path with gentle, AI-supported guidance. It’s about building a foundation for life, not dictating their choices.' })}
                </p>
            </div>
        </motion.section>
    );
}

function FutureVisionSection() {
    return (
        <motion.section className={styles.futureSection} {...fadeInProps}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'schools.future.title', message: 'Shape the Future of Learning' })} <motion.span style={{ display: 'inline-block' }} animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}>🚀</motion.span>
                    </Heading>
                </motion.div>
                <p className={styles.sectionText}>
                    {translate({ id: 'schools.future.text', message: 'Join us as an early adopter and help us tailor Inner Journey for schools. Here’s what’s coming to support your students even more:' })}
                </p>
                <motion.ul className={styles.futureList} variants={listContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                    <motion.li variants={listItemVariants}>
                        <strong>{translate({ id: 'schools.future.groupActivities.title', message: 'Group Activities' })}</strong> {translate({ id: 'schools.future.groupActivities.text', message: 'Classroom-friendly sessions to build teamwork and empathy.' })}
                    </motion.li>
                    <motion.li variants={listItemVariants}>
                        <strong>{translate({ id: 'schools.future.teacherTools.title', message: 'Teacher Tools' })}</strong> {translate({ id: 'schools.future.teacherTools.text', message: 'Dashboards for teachers to track progress and assign activities.' })}
                    </motion.li>
                    <motion.li variants={listItemVariants}>
                        <strong>{translate({ id: 'schools.future.aiInsights.title', message: 'AI Insights' })}</strong> {translate({ id: 'schools.future.aiInsights.text', message: 'Deeper analysis to spot emotional trends and support students proactively.' })}
                    </motion.li>
                </motion.ul>
            </div>
        </motion.section>
    );
}

function InterestForm() {
    return (
        <motion.section id="interest-form" className={styles.formSection} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'schools.form.title', message: 'Ready to Support Your Students?' })}
                    </Heading>
                </motion.div>
                <p className={styles.sectionText}>
                    {translate({ id: 'schools.form.text', message: 'Sign up today to bring Inner Journey to your school! Get early access, special offers, and help shape a tool that empowers your students.' })}
                </p>
                <form action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST" className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="schoolName">{translate({ id: 'schools.form.schoolName', message: 'School Name' })}</label>
                        <input type="text" id="schoolName" name="schoolName" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="contactName">{translate({ id: 'schools.form.contactName', message: 'Contact Name' })}</label>
                        <input type="text" id="contactName" name="contactName" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">{translate({ id: 'schools.form.email', message: 'Email' })}</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="message">{translate({ id: 'schools.form.message', message: 'Why Inner Journey for Your School? (Optional)' })}</label>
                        <textarea id="message" name="message" rows={4} placeholder={translate({ id: 'schools.form.message.placeholder', message: 'Tell us about your school’s needs or what you hope to achieve...' })}></textarea>
                    </div>
                    <motion.button type="submit" className={clsx('button', styles.submitButton)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        {translate({ id: 'schools.form.submit', message: 'Yes, I’m Interested!' })}
                    </motion.button>
                </form>
            </div>
        </motion.section>
    );
}

export default function Index(): ReactNode {
    return (
        <Layout
            title={translate({ id: 'schools.layout.title', message: 'Schools | Inner Journey for Students' })}
            description={translate({ id: 'schools.layout.description', message: 'Bring Inner Journey to your school! Help students build resilience, empathy, and self-awareness with AI-tailored tools. Sign up now!' })}
        >
            <SchoolsHeader />
            <main>
                <WhyInnerJourneyForSchools />
                <HowItWorksSection />
                <BenefitsForSchools />
                <PhilosophySection />
                <FutureVisionSection />
                <InterestForm />
            </main>
        </Layout>
    );
}
```

### `pages/about/investment-opportunities/index.tsx`
```tsx
// src/pages/about/investment-opportunities/index.tsx
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { motion } from 'framer-motion';
import { translate } from '@docusaurus/Translate';
import styles from './investment-opportunities.module.css';

// --- Animationsvarianter ---
const fadeInYProps = (delay = 0, y = 20, duration = 0.6) => ({
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration, delay, ease: 'easeOut' },
});

const sectionTitleProps = {
    initial: { opacity: 0, y: -15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.5, ease: 'easeOut' },
};

const staggerContainerProps = (staggerChildren = 0.1) => ({
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, amount: 0.1 },
    variants: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren, delayChildren: 0.1 } },
    },
});

const itemFadeInProps = {
    variants: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    },
};

const numberAnimationProps = {
    initial: { scale: 0.8, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.5, ease: 'easeOut' }
};

// --- Komponenter ---

function InvestmentHeader() {
    return (
        <header className={clsx('hero', styles.heroBanner)}>
            <div className={clsx("container", styles.heroContainer)}>
                <motion.div {...fadeInYProps(0.2, -20)}>
                    <Heading as="h1" className={styles.heroTitle}>
                        {translate({ id: 'investment.header.title', message: 'Scale Up Consciousness: Invest in Inner Journey' })}
                    </Heading>
                </motion.div>
                <motion.p className={styles.heroSubtitle} {...fadeInYProps(0.4, 20)}>
                    {translate({ id: 'investment.header.subtitle', message: 'A unique opportunity to support a platform where technology and heart intelligence meet to enable deep personal transformation – globally.' })}
                </motion.p>
                <motion.div {...fadeInYProps(0.6, 20)}>
                    <Link className={clsx('button button--lg', styles.ctaButton)} to="#contact-investor">
                        {translate({ id: 'investment.header.cta', message: 'Explore Partnership' })}
                    </Link>
                </motion.div>
            </div>
        </header>
    );
}

// 1. Möjligheten och Marknaden (Fokus på behovet)
function MarketOpportunitySection() {
    return (
        <motion.section className={styles.marketSection}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'investment.market.title', message: 'A Growing Need for Deeper Meaning' })}
                    </Heading>
                </motion.div>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.1)}>
                    {translate({ id: 'investment.market.text1', message: 'In an increasingly connected yet fragmented world, the longing for genuine self-awareness, inner peace, and meaningful tools for personal development is growing. The market for digital well-being is expanding rapidly, but many lack the depth and authenticity required for true transformation.' })}
                </motion.p>
                <motion.div className={styles.statRow} {...staggerContainerProps(0.2)}>
                    <motion.div className={styles.statCard} variants={itemFadeInProps}>
                        <div className={styles.statValue}><motion.span {...numberAnimationProps}>16+</motion.span> {translate({ id: 'investment.market.stat1.unit', message: 'Billion USD' })}</div>
                        <div className={styles.statLabel}>{translate({ id: 'investment.market.stat1.label', message: 'Mental Health Apps Market Forecast 2030' })}</div>
                    </motion.div>
                    <motion.div className={styles.statCard} variants={itemFadeInProps}>
                        <div className={styles.statValue}><motion.span {...numberAnimationProps}>5.5%+</motion.span></div>
                        <div className={styles.statLabel}>{translate({ id: 'investment.market.stat2.label', message: 'Annual Growth Rate (CAGR) Personal Development' })}</div>
                    </motion.div>
                    <motion.div className={styles.statCard} variants={itemFadeInProps}>
                        <div className={styles.statValue}><motion.span {...numberAnimationProps}>70%+</motion.span></div>
                        <div className={styles.statLabel}>{translate({ id: 'investment.market.stat3.label', message: 'Of Millennials Prioritize Personal Development (Sample Data)' })}</div>
                    </motion.div>
                </motion.div>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.2)} style={{ marginTop: '2.5rem' }}>
                    {translate({ id: 'investment.market.text2', message: 'Inner Journey meets this need by offering a platform rooted in <strong>authenticity, heart intelligence, and community</strong>, enhanced by modern technology.' })}
                </motion.p>
            </div>
        </motion.section>
    );
}

// 2. Vår Lösning: Plattformen som Tjänar Resan (Fokus på helheten)
function SolutionSection() {
    return (
        <motion.section className={styles.solutionSection}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...fadeInYProps(0, -15)}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'investment.solution.title', message: 'Inner Journey: Where Humanity and Technology Meet' })}
                    </Heading>
                </motion.div>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.1)}>
                    {translate({ id: 'investment.solution.text1', message: 'We’re not just building an app, but an <strong>ecosystem for conscious development</strong>. At its core is our community and our philosophy of guiding toward <em>personal</em> insights. Technology, including AI and voice interaction, serves as <strong>powerful tools</strong> to enhance this process:' })}
                </motion.p>
                <motion.div className={styles.featureGrid} {...staggerContainerProps()}>
                    <motion.div className={styles.featureCard} variants={itemFadeInProps}>
                        <div className={styles.featureIcon}>🤝</div>
                        <Heading as="h3" className={styles.featureTitle}>
                            {translate({ id: 'investment.solution.vibrantCommunity.title', message: 'Vibrant Community & Coaching' })}
                        </Heading>
                        <p className={styles.featureText}>
                            {translate({ id: 'investment.solution.vibrantCommunity.text', message: 'An opportunity to grow together with others and receive support from certified coaches who share our philosophy.' })}
                        </p>
                    </motion.div>
                    <motion.div className={styles.featureCard} variants={itemFadeInProps}>
                        <div className={styles.featureIcon}>🧠</div>
                        <Heading as="h3" className={styles.featureTitle}>
                            {translate({ id: 'investment.solution.intelligentGuidance.title', message: 'Intelligent Guidance' })}
                        </Heading>
                        <p className={styles.featureText}>
                            {translate({ id: 'investment.solution.intelligentGuidance.text', message: 'AI helps to suggest relevant exercises and insights based on your unique journey, without being prescriptive.' })}
                        </p>
                    </motion.div>
                    <motion.div className={styles.featureCard} variants={itemFadeInProps}>
                        <div className={styles.featureIcon}>✍️</div>
                        <Heading as="h3" className={styles.featureTitle}>
                            {translate({ id: 'investment.solution.dynamicReflection.title', message: 'Dynamic Reflection' })}
                        </Heading>
                        <p className={styles.featureText}>
                            {translate({ id: 'investment.solution.dynamicReflection.text', message: 'A smart journal that supports deeper self-awareness through tailored questions and themes.' })}
                        </p>
                    </motion.div>
                    <motion.div className={styles.featureCard} variants={itemFadeInProps}>
                        <div className={styles.featureIcon}>🛠️</div>
                        <Heading as="h3" className={styles.featureTitle}>
                            {translate({ id: 'investment.solution.holisticTools.title', message: 'Holistic Tools' })}
                        </Heading>
                        <p className={styles.featureText}>
                            {translate({ id: 'investment.solution.holisticTools.text', message: 'Integrated exercises like meditation, goal-setting, and reflection for body, mind, and soul.' })}
                        </p>
                    </motion.div>
                </motion.div>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.2)} style={{ marginTop: '2.5rem', fontStyle: 'italic' }}>
                    {translate({ id: 'investment.solution.text2', message: 'Our unique combination of <strong>heart and technology</strong> creates an authentic and deeply transformative experience.' })}
                </motion.p>
            </div>
        </motion.section>
    );
}

// 3. Varför Investera? (Fokus på Impact och Synergi)
function WhyInvestSection() {
    return (
        <motion.section className={styles.whyInvestSection}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...fadeInYProps(0, -15)}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'investment.whyinvest.title', message: 'Why Partner with Inner Journey?' })}
                    </Heading>
                </motion.div>
                <motion.div className={styles.featureGrid} {...staggerContainerProps()}>
                    <motion.div className={styles.featureCard} variants={itemFadeInProps} whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}>
                        <div className={styles.featureIcon}>✨</div>
                        <Heading as="h3" className={styles.featureTitle}>
                            {translate({ id: 'investment.whyinvest.timingCulturalShift.title', message: 'Timing & Cultural Shift' })}
                        </Heading>
                        <p className={styles.featureText}>
                            {translate({ id: 'investment.whyinvest.timingCulturalShift.text', message: 'Invest in alignment with the global movement toward increased consciousness, well-being, and authenticity.' })}
                        </p>
                    </motion.div>
                    <motion.div className={styles.featureCard} variants={itemFadeInProps} whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}>
                        <div className={styles.featureIcon}>💡</div>
                        <Heading as="h3" className={styles.featureTitle}>
                            {translate({ id: 'investment.whyinvest.uniqueSynergy.title', message: 'Unique Synergy' })}
                        </Heading>
                        <p className={styles.featureText}>
                            {translate({ id: 'investment.whyinvest.uniqueSynergy.text', message: 'A differentiated platform that meaningfully integrates community, human guidance, and intelligent technology.' })}
                        </p>
                    </motion.div>
                    <motion.div className={styles.featureCard} variants={itemFadeInProps} whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}>
                        <div className={styles.featureIcon}>🌱</div>
                        <Heading as="h3" className={styles.featureTitle}>
                            {translate({ id: 'investment.whyinvest.scalableImpact.title', message: 'Scalable Impact & Business Model' })}
                        </Heading>
                        <p className={styles.featureText}>
                            {translate({ id: 'investment.whyinvest.scalableImpact.text', message: 'The freemium model enables broad access and global reach, with clear potential for sustainable profitability.' })}
                        </p>
                    </motion.div>
                    <motion.div className={styles.featureCard} variants={itemFadeInProps} whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}>
                        <div className={styles.featureIcon}>🧭</div>
                        <Heading as="h3" className={styles.featureTitle}>
                            {translate({ id: 'investment.whyinvest.visionaryTeam.title', message: 'Visionary Team & Values' })}
                        </Heading>
                        <p className={styles.featureText}>
                            {translate({ id: 'investment.whyinvest.visionaryTeam.text', message: 'Support a team rooted in a deep vision (from Rising Beyond) and strong ethical values.' })}
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}

// 4. Finansiell Översikt & Kapitalanvändning (Mer fokus på användning)
function FinancialsSection() {
    return (
        <motion.section className={styles.financialSection}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...fadeInYProps(0, -15)}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'investment.financials.title', message: 'Resources to Realize the Vision' })}
                    </Heading>
                </motion.div>
                <motion.div className={styles.financialGrid} {...staggerContainerProps(0.15)}>
                    <motion.div className={styles.financialBox} variants={itemFadeInProps}>
                        <Heading as="h3">{translate({ id: 'investment.financials.capital.title', message: 'Capital Needs & Usage' })}</Heading>
                        <p><strong>{translate({ id: 'investment.financials.capital.total', message: 'Total Capital Sought:' })}</strong> 2,23 MSEK</p>
                        <p><strong>{translate({ id: 'investment.financials.capital.private', message: 'Of Which Private Capital:' })}</strong> 0,5 - 1,5 MSEK</p>
                        <p><strong>{translate({ id: 'investment.financials.capital.enables', message: 'Enables:' })}</strong></p>
                        <ul>
                            <li>🚀 {translate({ id: 'investment.financials.capital.enable1', message: 'MVP Launch (Sep 2025)' })}</li>
                            <li>🛠️ {translate({ id: 'investment.financials.capital.enable2', message: 'First Year Operations & Development' })}</li>
                            <li>🤝 {translate({ id: 'investment.financials.capital.enable3', message: 'Core Team & Community Building' })}</li>
                            <li>🛡️ {translate({ id: 'investment.financials.capital.enable4', message: 'Necessary Buffer' })}</li>
                        </ul>
                    </motion.div>
                    <motion.div className={styles.financialBox} variants={itemFadeInProps}>
                        <Heading as="h3">{translate({ id: 'investment.financials.model.title', message: 'Sustainable Business Model' })}</Heading>
                        <p><strong>{translate({ id: 'investment.financials.model.model', message: 'Model:' })}</strong> Freemium (Premium 99 SEK/month)</p>
                        <p><strong>{translate({ id: 'investment.financials.model.revenue', message: 'Revenue Forecast Year 1:' })}</strong> ~594 000 SEK</p>
                        <p><strong>{translate({ id: 'investment.financials.model.breakeven', message: 'Break-Even:' })}</strong> ~5.8 years (Potential 2-3 years with optimization)</p>
                        <p>{translate({ id: 'investment.financials.model.focus', message: 'Focus on building a loyal user base and exploring future revenue streams (e.g., coaching platform).' })}</p>
                    </motion.div>
                </motion.div>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.2)} style={{ marginTop: '2.5rem', fontStyle: 'italic', fontSize: '1rem' }}>
                    {translate({ id: 'investment.financials.text', message: 'The investment is the fuel that allows us to scale our impact and create a sustainable platform for global transformation. Detailed budget available.' })}
                </motion.p>
            </div>
        </motion.section>
    );
}

// 5. Kontakt / Intresseformulär (Inbjudan till partnerskap)
function InvestorContactForm() {
    return (
        <motion.section
            id="contact-investor"
            className={styles.formSection}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
            <div className={clsx('container', styles.sectionContainer, styles.formContainer)}>
                <motion.div {...fadeInYProps(0, -15)}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'investment.contact.title', message: 'Become a Partner in Our Vision' })}
                    </Heading>
                </motion.div>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.1)}>
                    {translate({ id: 'investment.contact.text', message: 'Do you share our passion for consciousness, technology, and human potential? We are looking for value-driven partners and investors who want to help build the future. Contact us for a deeper conversation.' })}
                </motion.p>
                <form action="https://formspree.io/f/YOUR_INVESTOR_FORMSPREE_ID" method="POST" className={styles.form}>
                    <motion.div className={styles.formGroup} {...fadeInYProps(0.15)}>
                        <label htmlFor="name">{translate({ id: 'investment.contact.form.name', message: 'Name' })}</label>
                        <input type="text" id="name" name="name" required />
                    </motion.div>
                    <motion.div className={styles.formGroup} {...fadeInYProps(0.20)}>
                        <label htmlFor="email">{translate({ id: 'investment.contact.form.email', message: 'Email' })}</label>
                        <input type="email" id="email" name="email" required />
                    </motion.div>
                    <motion.div className={styles.formGroup} {...fadeInYProps(0.25)}>
                        <label htmlFor="company">{translate({ id: 'investment.contact.form.company', message: 'Company/Organization (Optional)' })}</label>
                        <input type="text" id="company" name="company" />
                    </motion.div>
                    <motion.div className={styles.formGroup} {...fadeInYProps(0.30)}>
                        <label htmlFor="message">{translate({ id: 'investment.contact.form.message', message: 'Your Thoughts or Questions' })}</label>
                        <textarea id="message" name="message" rows={5} required placeholder={translate({ id: 'investment.contact.form.message.placeholder', message: "Why does Inner Journey's vision resonate with you?" })}></textarea>
                    </motion.div>
                    <motion.button type="submit" className={clsx('button', styles.submitButton)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} {...fadeInYProps(0.35)}>
                        {translate({ id: 'investment.contact.form.submit', message: 'Contact Us' })}
                    </motion.button>
                </form>
            </div>
        </motion.section>
    );
}

// --- Huvudexport ---
export default function InvestmentPage(): ReactNode {
    return (
        <Layout
            title={translate({ id: 'investment.layout.title', message: 'Invest in Conscious Development | Inner Journey' })}
            description={translate({ id: 'investment.layout.description', message: 'Become a partner in Inner Journey – an AI-enhanced platform and community for personal transformation. Invest in purpose and scalable impact.' })}
        >
            <InvestmentHeader />
            <main>
                <MarketOpportunitySection />
                <SolutionSection />
                <WhyInvestSection />
                <FinancialsSection />
                <InvestorContactForm />
            </main>
        </Layout>
    );
}
```

### `pages/about/investment-opportunities/investment-opportunities.module.css`
```css
/* docs/src/pages/investeringsmojligheter/investeringsmojligheter.module.css */

/* --- Hero Section --- */
.heroBanner {
    padding: 8rem 1rem 7rem 1rem;
    text-align: center;
    position: relative;
    overflow: hidden;
    /* Behåll eller justera gradienten efter önskemål */
    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%); /* Lila/Blå exempel */
    /* background: linear-gradient(135deg, #e85a4f 0%, #ff9f43 100%); */ /* Original Orange */
    color: #ffffff;
}
.heroContainer { /* Kan användas för att centrera innehåll om standard .container inte räcker */
    position: relative;
    z-index: 1;
    max-width: 900px; /* Begränsa bredden för texten */
    margin: 0 auto;
}

.heroTitle {
    color: #ffffff;
    font-size: 3.4rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
}

.heroSubtitle {
    color: #f0f0ff; /* Ljusare vit */
    font-size: 1.45rem; /* Lite större */
    font-weight: 400;
    margin-bottom: 3rem;
    opacity: 0.95;
    max-width: 720px; /* Begränsa bredden */
    margin-left: auto;
    margin-right: auto;
    line-height: 1.7; /* Ökad läsbarhet */
}

.ctaButton { /* Knappen i headern */
    background-color: #ffffff;
    color: #4e54c8; /* Matcha gradient/accent */
    border: none;
    padding: 1rem 2.2rem;
    font-weight: 600;
    font-size: 1.1rem;
    border-radius: 50px; /* Pill-shape */
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    text-decoration: none; /* För Link */
    display: inline-block;
}

.ctaButton:hover {
    background-color: #f0f0ff;
    color: #3a3f9a;
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}


/* --- Generella Sektionsstilar --- */
.marketSection, .solutionSection, .whyInvestSection, .financialSection, .formSection {
    padding: 6rem 1rem;
    overflow: hidden; /* Förhindra scroll vid animation */
}

/* Växlande bakgrunder för sektionerna */
.marketSection, .whyInvestSection, .formSection {
    background-color: #ffffff;
}
.solutionSection, .financialSection {
    background-color: #f8f9fc; /* Ljus blå/grå ton */
}

.sectionContainer { /* Standard container inom sektioner */
    padding: 2rem 0;
    max-width: 1040px;
    margin: 0 auto;
}

.sectionTitle { /* Gemensam stil för H2 i sektioner */
    color: #4e54c8; /* Primär accentfärg */
    font-size: 2.8rem;
    margin-bottom: 2rem;
    text-align: center;
    font-weight: 700;
}

.sectionText { /* Gemensam stil för P i sektioner */
    color: #454f5b;
    font-size: 1.2rem; /* Lite större text */
    line-height: 1.8;
    text-align: center;
    max-width: 750px; /* Begränsad bredd */
    margin: 0 auto 1.5rem auto; /* Centrera och lägg till marginal */
}
.sectionText strong { /* För fetstil i texten */
    font-weight: 600;
    color: #333d47;
}
.sectionText a { /* För länkar i texten */
    color: #4e54c8;
    text-decoration: none;
    font-weight: 500;
}
.sectionText a:hover { text-decoration: underline; }


/* --- Market Section - Stat Cards --- */
.statRow {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem; /* Justerat gap */
    margin: 3rem auto 0 auto;
    max-width: 900px;
}
.statCard {
    background-color: #f0f4ff;
    padding: 1.5rem 1.8rem; /* Justerad padding */
    border-radius: 10px;
    text-align: center;
    flex: 1;
    min-width: 200px; /* Justerad minsta bredd */
    border: 1px solid #e0e6f5;
    box-shadow: 0 3px 8px rgba(78, 84, 200, 0.07);
}
.statValue {
    font-size: 2.5rem;
    font-weight: 700;
    color: #4e54c8;
    margin-bottom: 0.5rem;
    line-height: 1.2;
}
.statLabel {
    font-size: 0.9rem;
    color: #6a737d;
    line-height: 1.4;
}

/* --- Solution & WhyInvest Section - Feature Cards --- */
.featureGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2rem;
    margin: 3rem 0 0 0;
}
.featureCard {
    background: #ffffff;
    border-radius: 12px; /* Lite mjukare */
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.07);
    padding: 2.5rem 2rem; /* Mer padding */
    transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
    text-align: center;
    border: 1px solid #f0f0f0;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.featureIcon {
    font-size: 3rem; /* Större ikon */
    margin-bottom: 1.5rem;
    display: inline-block;
    color: #4e54c8;
    line-height: 1;
}
.featureTitle {
    color: #333d47;
    font-size: 1.4rem; /* Tydligare rubrik */
    margin-bottom: 0.75rem;
    font-weight: 600;
}
.featureText {
    color: #5a6673;
    font-size: 1rem;
    line-height: 1.7; /* Bättre läsbarhet */
    flex-grow: 1;
}

/* --- Financial Section --- */
.financialGrid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-top: 2.5rem;
    max-width: 850px; /* Justerad maxbredd */
    margin-left: auto;
    margin-right: auto;
}

@media screen and (min-width: 768px) {
    .financialGrid {
        grid-template-columns: 1fr 1fr;
    }
}

.financialBox {
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 10px;
    border: 1px solid #e8eaf6;
    box-shadow: 0 5px 15px rgba(78, 84, 200, 0.08);
}
.financialBox h3 {
    color: #4e54c8;
    font-size: 1.4rem;
    margin-top: 0;
    margin-bottom: 1.25rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #e8eaf6;
    font-weight: 600;
}
.financialBox p, .financialBox ul { /* Inkludera UL här */
    margin-bottom: 0.75rem;
    font-size: 1.05rem;
    color: #454f5b;
    line-height: 1.6;
}
.financialBox p:last-child, .financialBox ul:last-child {
    margin-bottom: 0;
}
.financialBox strong {
    font-weight: 600;
    color: #333d47;
}
.financialBox ul { /* Stil för listan i kapitalanvändning */
    list-style: none;
    padding-left: 0;
}
.financialBox li {
    padding-left: 1.5em;
    position: relative;
    margin-bottom: 0.5rem;
}
.financialBox li::before {
    content: '✓'; /* Checkmark eller annan ikon */
    position: absolute;
    left: 0;
    color: #4e54c8; /* Accentfärg */
    font-weight: bold;
}


/* --- Form Section --- */
.formContainer { /* Klass för att begränsa bredden på formulärsektionens innehåll */
    max-width: 650px !important;
}
.form {
    margin: 2.5rem auto 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}
.formGroup {
    display: flex;
    flex-direction: column;
}
.formGroup label { font-size: 0.95rem; color: #555; margin-bottom: 0.5rem; font-weight: 500; padding-left: 0.25rem; }
.formGroup input, .formGroup textarea { padding: 1rem 1.2rem; border: 1px solid #d8dee4; border-radius: 8px; font-size: 1rem; line-height: 1.5; width: 100%; box-sizing: border-box; transition: border-color 0.2s ease, box-shadow 0.2s ease; background-color: #fdfdfd; }
.formGroup input::placeholder, .formGroup textarea::placeholder { color: #aaa; opacity: 1; }
.formGroup input:focus, .formGroup textarea:focus { border-color: #8f94fb; outline: none; box-shadow: 0 0 0 3px rgba(143, 148, 251, 0.3); background-color: #fff; }
.formGroup textarea { resize: vertical; min-height: 130px; font-family: inherit; }

.submitButton {
    background: #4e54c8;
    color: #ffffff;
    border: none;
    padding: 1rem 2.5rem;
    font-weight: 600;
    font-size: 1.15rem;
    border-radius: 50px; /* Pill shape */
    cursor: pointer;
    transition: all 0.2s ease;
    align-self: center;
    margin-top: 1.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    min-width: 220px;
}
.submitButton:hover {
    background: #3a3f9a;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    /* Transform hanteras av Framer Motion */
}

/* --- Media Queries --- */
@media screen and (max-width: 996px) {
    .heroTitle { font-size: 2.8rem; }
    .heroSubtitle { font-size: 1.3rem; }
    .sectionTitle { font-size: 2.4rem; }
    .sectionText { font-size: 1.1rem; }
    .statCard { min-width: 180px; flex-basis: 40%; } /* Låt stat cards ta mer plats */
    .statValue { font-size: 2.2rem; }
    .featureGrid { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
    .financialGrid { grid-template-columns: 1fr; }
}

@media screen and (max-width: 768px) {
    .heroBanner { padding: 6rem 1rem 5rem 1rem; }
    .heroTitle { font-size: 2.2rem; } /* Minskad storlek */
    .heroSubtitle { font-size: 1.15rem; /* Minskad storlek */ }
    .sectionTitle { font-size: 2rem; }
    .sectionText { font-size: 1.05rem; } /* Minskad storlek */
    .statRow { gap: 1rem; }
    .statCard { flex-basis: 100%; padding: 1.2rem; min-width: unset;} /* Stapla stat cards */
    .statValue { font-size: 2rem; }
    .featureGrid { grid-template-columns: 1fr; gap: 1.5rem;}
    .featureTitle { font-size: 1.2rem; }
    .featureText { font-size: 0.95rem; }
    .financialGrid { gap: 1.5rem; }
    .financialBox { padding: 1.5rem; }
    .financialBox h3 { font-size: 1.2rem;}
    .financialBox p, .financialBox ul { font-size: 0.95rem;}
    .formContainer { max-width: 100% !important; } /* Låt formuläret ta full bredd */
    .submitButton { width: 100%; }
}
```

### `pages/about/coaches/coaches.module.css`
```css
/* docs/src/pages/coaches/coaches.module.css */

/* --- Hero Section --- */
.heroBanner {
    padding: 7rem 1rem; /* Mer padding */
    text-align: center;
    position: relative;
    overflow: hidden;
    background: linear-gradient(145deg, #ff6f61 0%, #ff9f43 80%, #ffb36b 100%); /* Justerad gradient */
    color: #ffffff;
}

.heroTitle {
    color: #ffffff;
    font-size: 3.2rem; /* Anpassad storlek */
    font-weight: 700;
    margin-bottom: 1.5rem; /* Mer luft */
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
}

.heroSubtitle {
    color: #ffffff;
    font-size: 1.4rem;
    font-weight: 400;
    margin-bottom: 2.5rem; /* Mer luft */
    opacity: 0.95;
    max-width: 680px;
    margin-left: auto;
    margin-right: auto;
}

/* CTA-knapp i header */
.ctaButton {
    background-color: #ffffff;
    color: #ff6f61;
    border: none;
    padding: 0.9rem 2rem;
    font-weight: 600;
    font-size: 1.1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.ctaButton:hover {
    background-color: #fff0e8; /* Ljusare ton vid hover */
    color: #e15a4f;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}


/* --- Generella Sektionsstilar --- */
.whySection, .howItWorksSection, .benefitsSection, .philosophySection, .futureSection, .formSection {
    padding: 5rem 1rem;
    overflow: hidden; /* Förhindra att animationer skapar scroll */
}

.whySection, .philosophySection, .formSection {
    background-color: #ffffff;
}

.howItWorksSection, .benefitsSection, .futureSection {
    background-color: #f9f9f9; /* Växla bakgrund */
}

.sectionContainer {
    padding: 2rem 0;
    max-width: 960px; /* Lite smalare container för textsektioner */
    margin: 0 auto;
}

.sectionTitle {
    color: #ff6f61;
    font-size: 2.6rem;
    margin-bottom: 2rem; /* Mer luft under rubrik */
    text-align: center;
}

.sectionText {
    color: #333;
    font-size: 1.15rem;
    line-height: 1.75; /* Ökad läsbarhet */
    text-align: center;
    max-width: 720px;
    margin: 0 auto 1.5rem auto;
}

.sectionText a { color: #ff6f61; text-decoration: none; font-weight: 500; }
.sectionText a:hover { text-decoration: underline; }

/* --- How It Works Section --- */
.howItWorksList {
    list-style: none; /* Ta bort prickar */
    padding: 0;
    margin: 3rem 0 0 0;
    max-width: 700px; /* Centrera listan */
    margin-left: auto;
    margin-right: auto;
}

.howItWorksStep {
    display: flex;
    align-items: flex-start; /* Justera ikon och text */
    gap: 1.5rem;
    margin-bottom: 2.5rem;
    padding: 1.5rem;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    border-left: 4px solid #ff9f43; /* Accentkant */
}

.stepIcon {
    font-size: 1.8rem;
    padding-top: 0.2rem; /* Justera vertikalt */
    color: #ff6f61;
}

.stepTitle {
    font-size: 1.3rem;
    color: #333;
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.stepText {
    font-size: 1rem;
    line-height: 1.6;
    color: #555;
}


/* --- Benefits Section --- */
.benefitsList { /* Använder nu grid */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem; /* Justerat gap */
    margin: 3rem 0;
}

.benefitCard {
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
    padding: 2rem 1.5rem; /* Justerad padding */
    transition: box-shadow 0.3s ease;
    text-align: center;
    border: 1px solid #eee;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.benefitCard:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.benefitIcon {
    font-size: 2.5rem;
    margin-bottom: 1.25rem;
    display: inline-block;
    color: #ff6f61;
}

.benefitCard h3 {
    color: #333;
    font-size: 1.3rem; /* Justerad */
    margin-bottom: 0.75rem;
    font-weight: 600;
}

.benefitCard p {
    color: #555;
    font-size: 0.95rem; /* Justerad */
    line-height: 1.6;
    flex-grow: 1;
}

/* --- Philosophy Section --- */
.philosophyContainer {
    border-left: 5px solid #ff6f61; /* Accentkant */
    padding-left: 2rem;
}
.philosophySection .sectionText {
    font-style: italic; /* Betona citat */
    color: #444;
}
.philosophySection .sectionText:first-of-type {
    font-size: 1.25rem; /* Gör citatet lite större */
    margin-bottom: 2rem;
}


/* --- Future Section --- */
.futureList {
    list-style: none;
    padding: 0;
    margin: 2.5rem auto 0 auto;
    max-width: 700px;
}
.futureList li {
    padding: 0.8rem 0 0.8rem 1.5rem; /* Lite padding */
    margin-bottom: 1rem;
    position: relative;
    font-size: 1.05rem;
    color: #444;
    line-height: 1.6;
}
/* Skapa en liten "check"-liknande ikon med pseudo-element */
.futureList li::before {
    content: '✨'; /* Eller annan ikon */
    position: absolute;
    left: 0;
    top: 0.9rem;
    font-size: 0.9rem;
    /* color: #ff9f43; */
}

/* --- Form Section --- */
.formSection { /* Behåll som den är */
    padding: 5rem 1rem;
    background-color: #ffffff;
    overflow: hidden;
}
.formSection .sectionContainer { /* Behåll som den är */
    padding: 2rem 0;
    max-width: 960px;
    margin: 0 auto;
}
.formSection .sectionTitle { /* Behåll som den är */
    color: #ff6f61;
    font-size: 2.6rem;
    margin-bottom: 1.5rem; /* Justera vid behov */
    text-align: center;
}
.formSection .sectionText { /* Behåll som den är */
    color: #333;
    font-size: 1.15rem;
    line-height: 1.75;
    text-align: center;
    max-width: 720px;
    margin: 0 auto 2rem auto; /* Öka marginalen ner till formuläret */
}


/* --- Formulär - Uppdaterade Stilar --- */
.form {
    max-width: 550px; /* Lite smalare? */
    margin: 2rem auto 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.25rem; /* Justerat gap */
}

.formGroup {
    display: flex;
    flex-direction: column; /* Behåll kolumnlayout */
    position: relative; /* För eventuell framtida positionering av ikoner etc. */
}

.formGroup label {
    font-size: 0.95rem; /* Lite mindre */
    color: #555; /* Lite ljusare */
    margin-bottom: 0.5rem; /* Ökat avstånd */
    font-weight: 500;
    padding-left: 0.25rem; /* Liten indragning för linjering */
}

.formGroup input, .formGroup textarea {
    padding: 0.9rem 1.1rem; /* Lite mer padding */
    border: 1px solid #d8dee4; /* Neutral grå kantlinje */
    border-radius: 8px; /* Matchar knappar */
    font-size: 1rem;
    line-height: 1.5; /* Säkerställ bra radhöjd */
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    background-color: #fdfdfd; /* Mycket ljust grå bakgrund */
}

.formGroup input::placeholder, .formGroup textarea::placeholder {
    color: #aaa;
    opacity: 1;
}


.formGroup input:focus, .formGroup textarea:focus {
    border-color: #ff9f43;
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 159, 67, 0.25); /* Tydligare focus-ring */
    background-color: #fff; /* Vit bakgrund vid focus */
}

.formGroup textarea {
    resize: vertical;
    min-height: 120px; /* Lite högre */
    font-family: inherit; /* Säkerställ samma font som input */
}

/* Specifikt för textarea-label om den behöver justeras */
.formGroup label[for="message"] {
    /* Ev. justeringar här om nödvändigt */
}

.submitButton {
    background: #ff6f61;
    color: #ffffff;
    border: none;
    padding: 1rem 2.5rem;
    font-weight: 600;
    font-size: 1.15rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    align-self: center; /* Centrera knappen */
    margin-top: 1.5rem; /* Mer luft ovanför knappen */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: auto; /* Låt innehållet styra bredden */
    min-width: 200px; /* Men sätt en minsta bredd */
}

.submitButton:hover {
    background: #ff9f43;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    /* Transform hanteras av Framer Motion */
}

/* --- Media Queries (Endast relevanta för formuläret) --- */
@media screen and (max-width: 768px) {
    .form {
        max-width: 90%; /* Ta mer bredd på små skärmar */
    }
    .submitButton {
        width: 100%; /* Full bredd på knappen på små skärmar */
        max-width: none; /* Ta bort max-bredd */
    }
}
```

### `pages/about/coaches/index.tsx`
```tsx
// src/pages/about/coaches/index.tsx
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { motion } from 'framer-motion';
import { translate } from '@docusaurus/Translate';
import styles from './coaches.module.css';

// --- Animationsvarianter ---
const fadeInProps = {
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, ease: 'easeOut' },
};

const sectionTitleProps = {
    initial: { opacity: 0, y: -15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.5, ease: 'easeOut' },
};

const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, ease: 'easeOut' },
    },
};

const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const cardItemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

// --- Komponenter ---

function CoachesHeader() {
    return (
        <header className={clsx('hero', styles.heroBanner)}>
            <div className="container">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}>
                    <Heading as="h1" className={styles.heroTitle}>
                        {translate({ id: 'coaches.header.title', message: 'Shape the Future of Coaching – With Inner Journey' })}
                    </Heading>
                </motion.div>
                <motion.p className={styles.heroSubtitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}>
                    {translate({ id: 'coaches.header.subtitle', message: 'Tired of scattered tools? Get a unified platform, reach more clients, and focus on what you do best: guiding real change.' })}
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}>
                    <Link className={clsx('button button--lg', styles.ctaButton)} to="#interest-form">
                        {translate({ id: 'coaches.header.cta', message: 'Sign Up as an Early Adopter' })}
                    </Link>
                </motion.div>
            </div>
        </header>
    );
}

function WhyInnerJourney() {
    return (
        <motion.section className={styles.whySection} {...fadeInProps}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'coaches.why.title', message: 'From Chaos to Clarity: Your New Coaching Hub' })}
                    </Heading>
                </motion.div>
                <p className={styles.sectionText}>
                    {translate({ id: 'coaches.why.text', message: 'Sound familiar? Notes in one document, exercises via email, feedback on SMS or Messenger... It’s time for a change. Inner Journey brings all your client work into <strong>one place</strong>. Deliver a professional experience to your clients and free up your time for what truly matters.' })}
                </p>
            </div>
        </motion.section>
    );
}

function HowItWorksSection() {
    return (
        <motion.section className={styles.howItWorksSection} {...fadeInProps}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'coaches.howitworks.title', message: 'A Smoother Collaboration – Step by Step' })}
                    </Heading>
                </motion.div>
                <motion.ol className={styles.howItWorksList} variants={listContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                    <motion.li className={styles.howItWorksStep} variants={listItemVariants}>
                        <span className={styles.stepIcon}>🎯</span>
                        <div>
                            <Heading as="h3" className={styles.stepTitle}>
                                {translate({ id: 'coaches.howitworks.setCourse.title', message: 'Set the Course' })}
                            </Heading>
                            <p className={styles.stepText}>
                                {translate({ id: 'coaches.howitworks.setCourse.text', message: 'Create tailored "Personal Journeys" or assign specific "Activations" directly to your client in the app.' })}
                            </p>
                        </div>
                    </motion.li>
                    <motion.li className={styles.howItWorksStep} variants={listItemVariants}>
                        <span className={styles.stepIcon}>✍️</span>
                        <div>
                            <Heading as="h3" className={styles.stepTitle}>
                                {translate({ id: 'coaches.howitworks.clientEngages.title', message: 'Client Engages' })}
                            </Heading>
                            <p className={styles.stepText}>
                                {translate({ id: 'coaches.howitworks.clientEngages.text', message: 'The client completes exercises and reflects in their "Dynamic Journal" – at their own pace.' })}
                            </p>
                        </div>
                    </motion.li>
                    <motion.li className={styles.howItWorksStep} variants={listItemVariants}>
                        <span className={styles.stepIcon}>💬</span>
                        <div>
                            <Heading as="h3" className={styles.stepTitle}>
                                {translate({ id: 'coaches.howitworks.centralizedFeedback.title', message: 'Centralized Feedback' })}
                            </Heading>
                            <p className={styles.stepText}>
                                {translate({ id: 'coaches.howitworks.centralizedFeedback.text', message: 'You receive notifications, review progress, and provide valuable feedback – all within the same platform. No more scattered threads!' })}
                            </p>
                        </div>
                    </motion.li>
                    <motion.li className={styles.howItWorksStep} variants={listItemVariants}>
                        <span className={styles.stepIcon}>🌱</span>
                        <div>
                            <Heading as="h3" className={styles.stepTitle}>
                                {translate({ id: 'coaches.howitworks.nextSteps.title', message: 'Next Steps Together' })}
                            </Heading>
                            <p className={styles.stepText}>
                                {translate({ id: 'coaches.howitworks.nextSteps.text', message: 'Track progress, identify patterns, and set the next steps for the client’s journey based on real data and dialogue.' })}
                            </p>
                        </div>
                    </motion.li>
                </motion.ol>
            </div>
        </motion.section>
    );
}

function BenefitsForCoaches() {
    return (
        <section className={styles.benefitsSection}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'coaches.benefits.title', message: 'Your Benefits as an Inner Journey Coach' })}
                    </Heading>
                </motion.div>
                <motion.div className={styles.benefitsList} variants={listContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                    <motion.div className={styles.benefitCard} variants={cardItemVariants} whileHover={{ scale: 1.04, y: -5, transition: { duration: 0.2 } }} whileTap={{ scale: 0.98 }}>
                        <span className={styles.benefitIcon}>🛠️</span>
                        <Heading as="h3">{translate({ id: 'coaches.benefits.structureJourney.title', message: 'Structure the Client Journey' })}</Heading>
                        <p>{translate({ id: 'coaches.benefits.structureJourney.text', message: 'Use Activations and Personal Journeys to create clear, effective development plans.' })}</p>
                    </motion.div>
                    <motion.div className={styles.benefitCard} variants={cardItemVariants} whileHover={{ scale: 1.04, y: -5, transition: { duration: 0.2 } }} whileTap={{ scale: 0.98 }}>
                        <span className={styles.benefitIcon}>💬</span>
                        <Heading as="h3">{translate({ id: 'coaches.benefits.centralizedCommunication.title', message: 'Centralized Communication' })}</Heading>
                        <p>{translate({ id: 'coaches.benefits.centralizedCommunication.text', message: 'All dialogue and feedback are gathered in the journal – professional and easy to follow up.' })}</p>
                    </motion.div>
                    <motion.div className={styles.benefitCard} variants={cardItemVariants} whileHover={{ scale: 1.04, y: -5, transition: { duration: 0.2 } }} whileTap={{ scale: 0.98 }}>
                        <span className={styles.benefitIcon}>💸</span>
                        <Heading as="h3">{translate({ id: 'coaches.benefits.easyPayments.title', message: 'Easy Payments (Coming Soon!)' })}</Heading>
                        <p>{translate({ id: 'coaches.benefits.easyPayments.text', message: 'Focus on coaching, we’ll handle the rest. Soon, we’ll launch a seamless solution for card payments from clients and easy payouts to you.' })}</p>
                    </motion.div>
                    <motion.div className={styles.benefitCard} variants={cardItemVariants} whileHover={{ scale: 1.04, y: -5, transition: { duration: 0.2 } }} whileTap={{ scale: 0.98 }}>
                        <span className={styles.benefitIcon}>🤝</span>
                        <Heading as="h3">{translate({ id: 'coaches.benefits.communitySupport.title', message: 'Community & Support' })}</Heading>
                        <p>{translate({ id: 'coaches.benefits.communitySupport.text', message: 'Join a supportive community. Share experiences and get support through our Discord channel.' })}</p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

function CoachingPhilosophySection() {
    return (
        <motion.section className={styles.philosophySection} {...fadeInProps}>
            <div className={clsx('container', styles.sectionContainer, styles.philosophyContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'coaches.philosophy.title', message: 'Our Philosophy: Guidance, Not Directives' })}
                    </Heading>
                </motion.div>
                <p className={styles.sectionText}>
                    {translate({ id: 'coaches.philosophy.text1', message: '"A platform that, through research-based, holistic tools, guides you to self-discovery and personal development – <strong>without telling you what to do.</strong>"' })}
                </p>
                <p className={styles.sectionText}>
                    {translate({ id: 'coaches.philosophy.text2', message: 'We believe in empowering both the client’s and coach’s autonomy. Our tools are designed to support genuine discovery and authentic partnership on the development journey. Does this align with your coaching approach?' })}
                </p>
            </div>
        </motion.section>
    );
}

function FutureVisionSection() {
    return (
        <motion.section className={styles.futureSection} {...fadeInProps}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'coaches.future.title', message: 'Help Shape the Future' })} <motion.span style={{display: 'inline-block'}} animate={{scale:[1, 1.1, 1], rotate: [0, 5, 0]}} transition={{repeat: Infinity, duration: 4, ease: 'easeInOut'}}>🚀</motion.span>
                    </Heading>
                </motion.div>
                <p className={styles.sectionText}>
                    {translate({ id: 'coaches.future.text', message: 'As an early adopter, you’ll not only get first access to the platform but also a unique chance to influence its development. Here are some of the exciting features we’re working on:' })}
                </p>
                <motion.ul className={styles.futureList} variants={listContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                    <motion.li variants={listItemVariants}>
                        <strong>{translate({ id: 'coaches.future.integratedPayment.title', message: 'Integrated Payment Solution' })}</strong> {translate({ id: 'coaches.future.integratedPayment.text', message: 'Seamless card payments for clients and easy payouts to you, directly in the app.' })}
                    </motion.li>
                    <motion.li variants={listItemVariants}>
                        <strong>{translate({ id: 'coaches.future.aiRecording.title', message: 'AI-Supported Recording (Beta)' })}</strong> {translate({ id: 'coaches.future.aiRecording.text', message: 'Record your own meditations and guided sessions directly in the app, with automatic audio enhancement and the option to add background sounds.' })}
                    </motion.li>
                    <motion.li variants={listItemVariants}>
                        <strong>{translate({ id: 'coaches.future.advancedMatching.title', message: 'Advanced Matching' })}</strong> {translate({ id: 'coaches.future.advancedMatching.text', message: 'Even smarter matching based on deeper profiling to connect you with ideal clients.' })}
                    </motion.li>
                    <motion.li variants={listItemVariants}>
                        <strong>{translate({ id: 'coaches.future.groupSessions.title', message: 'Group Sessions & Events' })}</strong> {translate({ id: 'coaches.future.groupSessions.text', message: 'Tools to lead workshops and community events directly on the platform.' })}
                    </motion.li>
                </motion.ul>
            </div>
        </motion.section>
    );
}

function InterestForm() {
    return (
        <motion.section id="interest-form" className={styles.formSection} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'coaches.form.title', message: 'Ready to Transform Your Coaching Flow?' })}
                    </Heading>
                </motion.div>
                <p className={styles.sectionText}>
                    {translate({ id: 'coaches.form.text', message: 'Sign up as an Early Adopter today! Get early access, special offers, and the chance to shape the future of coaching tools with us.' })}
                </p>
                <form action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST" className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">{translate({ id: 'coaches.form.name', message: 'Name' })}</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">{translate({ id: 'coaches.form.email', message: 'Email' })}</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="message">{translate({ id: 'coaches.form.message', message: 'Why Do You Want to Be an Early Adopter? (Optional)' })}</label>
                        <textarea id="message" name="message" rows={4} placeholder={translate({ id: 'coaches.form.message.placeholder', message: 'Tell us briefly about your current process or what you hope to gain from Inner Journey...' })}></textarea>
                    </div>
                    <motion.button type="submit" className={clsx('button', styles.submitButton)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        {translate({ id: 'coaches.form.submit', message: 'Yes, I’m Interested!' })}
                    </motion.button>
                </form>
            </div>
        </motion.section>
    );
}

export default function Index(): ReactNode {
    return (
        <Layout
            title={translate({ id: 'coaches.layout.title', message: 'Coaches | Simplify Your Workflow with Inner Journey' })}
            description={translate({ id: 'coaches.layout.description', message: 'Become an Early Adopter coach on Inner Journey. Get tools for client management, collaboration, and payments – all in one place. Sign up now!' })}
        >
            <CoachesHeader />
            <main>
                <WhyInnerJourney />
                <HowItWorksSection />
                <BenefitsForCoaches />
                <CoachingPhilosophySection />
                <FutureVisionSection />
                <InterestForm />
            </main>
        </Layout>
    );
}
```

### `pages/about/for-work/for-work.module.css`
```css
/* src/pages/about/for-work/for-work.module.css */

/* --- Hero Section --- */
.heroBanner {
    padding: 7rem 1rem;
    text-align: center;
    position: relative;
    overflow: hidden;
    background: linear-gradient(145deg, #1e3a8a 0%, #3b82f6 80%, #60a5fa 100%); /* Blå gradient för professionell känsla */
    color: #ffffff;
}

.heroTitle {
    color: #ffffff;
    font-size: 3.2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
}

.heroSubtitle {
    color: #ffffff;
    font-size: 1.4rem;
    font-weight: 400;
    margin-bottom: 2.5rem;
    opacity: 0.95;
    max-width: 680px;
    margin-left: auto;
    margin-right: auto;
}

/* CTA-knapp i header */
.ctaButton {
    background-color: #ffffff;
    color: #1e3a8a; /* Mörkblå text */
    border: none;
    padding: 0.9rem 2rem;
    font-weight: 600;
    font-size: 1.1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.ctaButton:hover {
    background-color: #e0f2fe; /* Ljusblå ton vid hover */
    color: #1e40af;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

/* --- Generella Sektionsstilar --- */
.whySection, .howItWorksSection, .benefitsSection, .philosophySection, .futureSection, .formSection {
    padding: 5rem 1rem;
    overflow: hidden;
}

.whySection, .philosophySection, .formSection {
    background-color: #ffffff;
}

.howItWorksSection, .benefitsSection, .futureSection {
    background-color: #f0f7ff; /* Ljusblå bakgrund för att matcha temat */
}

.sectionContainer {
    padding: 2rem 0;
    max-width: 960px;
    margin: 0 auto;
}

.sectionTitle {
    color: #1e3a8a; /* Mörkblå som primär accentfärg */
    font-size: 2.6rem;
    margin-bottom: 2rem;
    text-align: center;
}

.sectionText {
    color: #333;
    font-size: 1.15rem;
    line-height: 1.75;
    text-align: center;
    max-width: 720px;
    margin: 0 auto 1.5rem auto;
}

.sectionText a {
    color: #1e3a8a;
    text-decoration: none;
    font-weight: 500;
}
.sectionText a:hover {
    text-decoration: underline;
}

/* --- How It Works Section --- */
.howItWorksList {
    list-style: none;
    padding: 0;
    margin: 3rem 0 0 0;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
}

.howItWorksStep {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    margin-bottom: 2.5rem;
    padding: 1.5rem;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    border-left: 4px solid #3b82f6; /* Ljusblå accentkant */
}

.stepIcon {
    font-size: 1.8rem;
    padding-top: 0.2rem;
    color: #1e3a8a; /* Mörkblå ikon */
}

.stepTitle {
    font-size: 1.3rem;
    color: #333;
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.stepText {
    font-size: 1rem;
    line-height: 1.6;
    color: #555;
}

/* --- Benefits Section --- */
.benefitsList {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin: 3rem 0;
}

.benefitCard {
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
    padding: 2rem 1.5rem;
    transition: box-shadow 0.3s ease;
    text-align: center;
    border: 1px solid #e0e7ff; /* Ljusblå kant */
    display: flex;
    flex-direction: column;
    align-items: center;
}

.benefitCard:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.benefitIcon {
    font-size: 2.5rem;
    margin-bottom: 1.25rem;
    display: inline-block;
    color: #1e3a8a; /* Mörkblå ikon */
}

.benefitCard h3 {
    color: #333;
    font-size: 1.3rem;
    margin-bottom: 0.75rem;
    font-weight: 600;
}

.benefitCard p {
    color: #555;
    font-size: 0.95rem;
    line-height: 1.6;
    flex-grow: 1;
}

/* --- Philosophy Section --- */
.philosophyContainer {
    border-left: 5px solid #1e3a8a; /* Mörkblå accentkant */
    padding-left: 2rem;
}

.philosophySection .sectionText {
    font-style: italic;
    color: #444;
}

.philosophySection .sectionText:first-of-type {
    font-size: 1.25rem;
    margin-bottom: 2rem;
}

/* --- Future Section --- */
.futureList {
    list-style: none;
    padding: 0;
    margin: 2.5rem auto 0 auto;
    max-width: 700px;
}

.futureList li {
    padding: 0.8rem 0 0.8rem 1.5rem;
    margin-bottom: 1rem;
    position: relative;
    font-size: 1.05rem;
    color: #444;
    line-height: 1.6;
}

.futureList li::before {
    content: '✨';
    position: absolute;
    left: 0;
    top: 0.9rem;
    font-size: 0.9rem;
}

/* --- Form Section --- */
.formSection {
    padding: 5rem 1rem;
    background-color: #ffffff;
    overflow: hidden;
}

.formSection .sectionContainer {
    padding: 2rem 0;
    max-width: 960px;
    margin: 0 auto;
}

.formSection .sectionTitle {
    color: #1e3a8a; /* Mörkblå rubrik */
    font-size: 2.6rem;
    margin-bottom: 1.5rem;
    text-align: center;
}

.formSection .sectionText {
    color: #333;
    font-size: 1.15rem;
    line-height: 1.75;
    text-align: center;
    max-width: 720px;
    margin: 0 auto 2rem auto;
}

/* --- Formulär - Uppdaterade Stilar --- */
.form {
    max-width: 550px;
    margin: 2rem auto 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.formGroup {
    display: flex;
    flex-direction: column;
    position: relative;
}

.formGroup label {
    font-size: 0.95rem;
    color: #555;
    margin-bottom: 0.5rem;
    font-weight: 500;
    padding-left: 0.25rem;
}

.formGroup input, .formGroup textarea {
    padding: 0.9rem 1.1rem;
    border: 1px solid #d8dee4;
    border-radius: 8px;
    font-size: 1rem;
    line-height: 1.5;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    background-color: #fdfdfd;
}

.formGroup input::placeholder, .formGroup textarea::placeholder {
    color: #aaa;
    opacity: 1;
}

.formGroup input:focus, .formGroup textarea:focus {
    border-color: #3b82f6; /* Ljusblå fokusfärg */
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
    background-color: #fff;
}

.formGroup textarea {
    resize: vertical;
    min-height: 120px;
    font-family: inherit;
}

.submitButton {
    background: #1e3a8a; /* Mörkblå knapp */
    color: #ffffff; /* Korrigerat: tagit bort "ConcurrentModificationException" och lagt till semikolon */
    border: none;
    padding: 1rem 2.5rem;
    font-weight: 600;
    font-size: 1.15rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    align-self: center;
    margin-top: 1.5rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: auto;
    min-width: 200px;
}

.submitButton:hover {
    background: #3b82f6; /* Ljusare blå vid hover */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* --- Media Queries --- */
@media screen and (max-width: 768px) {
    .form {
        max-width: 90%;
    }
    .submitButton {
        width: 100%;
        max-width: none;
    }
}
```

### `pages/about/for-work/index.tsx`
```tsx
// src/pages/about/coaches/index.tsx
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { motion } from 'framer-motion';
import { translate } from '@docusaurus/Translate';
import styles from './for-work.module.css';

// --- Animationsvarianter ---
const fadeInProps = {
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, ease: 'easeOut' },
};

const sectionTitleProps = {
    initial: { opacity: 0, y: -15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.5, ease: 'easeOut' },
};

const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, ease: 'easeOut' },
    },
};

const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const cardItemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

// --- Komponenter ---

function CoachesHeader() {
    return (
        <header className={clsx('hero', styles.heroBanner)}>
            <div className="container">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}>
                    <Heading as="h1" className={styles.heroTitle}>
                        {translate({ id: 'coaches.header.title', message: 'Shape the Future of Coaching – With Inner Journey' })}
                    </Heading>
                </motion.div>
                <motion.p className={styles.heroSubtitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}>
                    {translate({ id: 'coaches.header.subtitle', message: 'Tired of scattered tools? Get a unified platform, reach more clients, and focus on what you do best: guiding real change.' })}
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}>
                    <Link className={clsx('button button--lg', styles.ctaButton)} to="#interest-form">
                        {translate({ id: 'coaches.header.cta', message: 'Sign Up as an Early Adopter' })}
                    </Link>
                </motion.div>
            </div>
        </header>
    );
}

function WhyInnerJourney() {
    return (
        <motion.section className={styles.whySection} {...fadeInProps}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'coaches.why.title', message: 'From Chaos to Clarity: Your New Coaching Hub' })}
                    </Heading>
                </motion.div>
                <p className={styles.sectionText}>
                    {translate({ id: 'coaches.why.text', message: 'Sound familiar? Notes in one document, exercises via email, feedback on SMS or Messenger... It’s time for a change. Inner Journey brings all your client work into <strong>one place</strong>. Deliver a professional experience to your clients and free up your time for what truly matters.' })}
                </p>
            </div>
        </motion.section>
    );
}

function HowItWorksSection() {
    return (
        <motion.section className={styles.howItWorksSection} {...fadeInProps}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'coaches.howitworks.title', message: 'A Smoother Collaboration – Step by Step' })}
                    </Heading>
                </motion.div>
                <motion.ol className={styles.howItWorksList} variants={listContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                    <motion.li className={styles.howItWorksStep} variants={listItemVariants}>
                        <span className={styles.stepIcon}>🎯</span>
                        <div>
                            <Heading as="h3" className={styles.stepTitle}>
                                {translate({ id: 'coaches.howitworks.setCourse.title', message: 'Set the Course' })}
                            </Heading>
                            <p className={styles.stepText}>
                                {translate({ id: 'coaches.howitworks.setCourse.text', message: 'Create tailored "Personal Journeys" or assign specific "Activations" directly to your client in the app.' })}
                            </p>
                        </div>
                    </motion.li>
                    <motion.li className={styles.howItWorksStep} variants={listItemVariants}>
                        <span className={styles.stepIcon}>✍️</span>
                        <div>
                            <Heading as="h3" className={styles.stepTitle}>
                                {translate({ id: 'coaches.howitworks.clientEngages.title', message: 'Client Engages' })}
                            </Heading>
                            <p className={styles.stepText}>
                                {translate({ id: 'coaches.howitworks.clientEngages.text', message: 'The client completes exercises and reflects in their "Dynamic Journal" – at their own pace.' })}
                            </p>
                        </div>
                    </motion.li>
                    <motion.li className={styles.howItWorksStep} variants={listItemVariants}>
                        <span className={styles.stepIcon}>💬</span>
                        <div>
                            <Heading as="h3" className={styles.stepTitle}>
                                {translate({ id: 'coaches.howitworks.centralizedFeedback.title', message: 'Centralized Feedback' })}
                            </Heading>
                            <p className={styles.stepText}>
                                {translate({ id: 'coaches.howitworks.centralizedFeedback.text', message: 'You receive notifications, review progress, and provide valuable feedback – all within the same platform. No more scattered threads!' })}
                            </p>
                        </div>
                    </motion.li>
                    <motion.li className={styles.howItWorksStep} variants={listItemVariants}>
                        <span className={styles.stepIcon}>🌱</span>
                        <div>
                            <Heading as="h3" className={styles.stepTitle}>
                                {translate({ id: 'coaches.howitworks.nextSteps.title', message: 'Next Steps Together' })}
                            </Heading>
                            <p className={styles.stepText}>
                                {translate({ id: 'coaches.howitworks.nextSteps.text', message: 'Track progress, identify patterns, and set the next steps for the client’s journey based on real data and dialogue.' })}
                            </p>
                        </div>
                    </motion.li>
                </motion.ol>
            </div>
        </motion.section>
    );
}

function BenefitsForCoaches() {
    return (
        <section className={styles.benefitsSection}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'coaches.benefits.title', message: 'Your Benefits as an Inner Journey Coach' })}
                    </Heading>
                </motion.div>
                <motion.div className={styles.benefitsList} variants={listContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                    <motion.div className={styles.benefitCard} variants={cardItemVariants} whileHover={{ scale: 1.04, y: -5, transition: { duration: 0.2 } }} whileTap={{ scale: 0.98 }}>
                        <span className={styles.benefitIcon}>🛠️</span>
                        <Heading as="h3">{translate({ id: 'coaches.benefits.structureJourney.title', message: 'Structure the Client Journey' })}</Heading>
                        <p>{translate({ id: 'coaches.benefits.structureJourney.text', message: 'Use Activations and Personal Journeys to create clear, effective development plans.' })}</p>
                    </motion.div>
                    <motion.div className={styles.benefitCard} variants={cardItemVariants} whileHover={{ scale: 1.04, y: -5, transition: { duration: 0.2 } }} whileTap={{ scale: 0.98 }}>
                        <span className={styles.benefitIcon}>💬</span>
                        <Heading as="h3">{translate({ id: 'coaches.benefits.centralizedCommunication.title', message: 'Centralized Communication' })}</Heading>
                        <p>{translate({ id: 'coaches.benefits.centralizedCommunication.text', message: 'All dialogue and feedback are gathered in the journal – professional and easy to follow up.' })}</p>
                    </motion.div>
                    <motion.div className={styles.benefitCard} variants={cardItemVariants} whileHover={{ scale: 1.04, y: -5, transition: { duration: 0.2 } }} whileTap={{ scale: 0.98 }}>
                        <span className={styles.benefitIcon}>💸</span>
                        <Heading as="h3">{translate({ id: 'coaches.benefits.easyPayments.title', message: 'Easy Payments (Coming Soon!)' })}</Heading>
                        <p>{translate({ id: 'coaches.benefits.easyPayments.text', message: 'Focus on coaching, we’ll handle the rest. Soon, we’ll launch a seamless solution for card payments from clients and easy payouts to you.' })}</p>
                    </motion.div>
                    <motion.div className={styles.benefitCard} variants={cardItemVariants} whileHover={{ scale: 1.04, y: -5, transition: { duration: 0.2 } }} whileTap={{ scale: 0.98 }}>
                        <span className={styles.benefitIcon}>🤝</span>
                        <Heading as="h3">{translate({ id: 'coaches.benefits.communitySupport.title', message: 'Community & Support' })}</Heading>
                        <p>{translate({ id: 'coaches.benefits.communitySupport.text', message: 'Join a supportive community. Share experiences and get support through our Discord channel.' })}</p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

function CoachingPhilosophySection() {
    return (
        <motion.section className={styles.philosophySection} {...fadeInProps}>
            <div className={clsx('container', styles.sectionContainer, styles.philosophyContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'coaches.philosophy.title', message: 'Our Philosophy: Guidance, Not Directives' })}
                    </Heading>
                </motion.div>
                <p className={styles.sectionText}>
                    {translate({ id: 'coaches.philosophy.text1', message: '"A platform that, through research-based, holistic tools, guides you to self-discovery and personal development – <strong>without telling you what to do.</strong>"' })}
                </p>
                <p className={styles.sectionText}>
                    {translate({ id: 'coaches.philosophy.text2', message: 'We believe in empowering both the client’s and coach’s autonomy. Our tools are designed to support genuine discovery and authentic partnership on the development journey. Does this align with your coaching approach?' })}
                </p>
            </div>
        </motion.section>
    );
}

function FutureVisionSection() {
    return (
        <motion.section className={styles.futureSection} {...fadeInProps}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'coaches.future.title', message: 'Help Shape the Future' })} <motion.span style={{display: 'inline-block'}} animate={{scale:[1, 1.1, 1], rotate: [0, 5, 0]}} transition={{repeat: Infinity, duration: 4, ease: 'easeInOut'}}>🚀</motion.span>
                    </Heading>
                </motion.div>
                <p className={styles.sectionText}>
                    {translate({ id: 'coaches.future.text', message: 'As an early adopter, you’ll not only get first access to the platform but also a unique chance to influence its development. Here are some of the exciting features we’re working on:' })}
                </p>
                <motion.ul className={styles.futureList} variants={listContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                    <motion.li variants={listItemVariants}>
                        <strong>{translate({ id: 'coaches.future.integratedPayment.title', message: 'Integrated Payment Solution' })}</strong> {translate({ id: 'coaches.future.integratedPayment.text', message: 'Seamless card payments for clients and easy payouts to you, directly in the app.' })}
                    </motion.li>
                    <motion.li variants={listItemVariants}>
                        <strong>{translate({ id: 'coaches.future.aiRecording.title', message: 'AI-Supported Recording (Beta)' })}</strong> {translate({ id: 'coaches.future.aiRecording.text', message: 'Record your own meditations and guided sessions directly in the app, with automatic audio enhancement and the option to add background sounds.' })}
                    </motion.li>
                    <motion.li variants={listItemVariants}>
                        <strong>{translate({ id: 'coaches.future.advancedMatching.title', message: 'Advanced Matching' })}</strong> {translate({ id: 'coaches.future.advancedMatching.text', message: 'Even smarter matching based on deeper profiling to connect you with ideal clients.' })}
                    </motion.li>
                    <motion.li variants={listItemVariants}>
                        <strong>{translate({ id: 'coaches.future.groupSessions.title', message: 'Group Sessions & Events' })}</strong> {translate({ id: 'coaches.future.groupSessions.text', message: 'Tools to lead workshops and community events directly on the platform.' })}
                    </motion.li>
                </motion.ul>
            </div>
        </motion.section>
    );
}

function InterestForm() {
    return (
        <motion.section id="interest-form" className={styles.formSection} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'coaches.form.title', message: 'Ready to Transform Your Coaching Flow?' })}
                    </Heading>
                </motion.div>
                <p className={styles.sectionText}>
                    {translate({ id: 'coaches.form.text', message: 'Sign up as an Early Adopter today! Get early access, special offers, and the chance to shape the future of coaching tools with us.' })}
                </p>
                <form action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST" className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">{translate({ id: 'coaches.form.name', message: 'Name' })}</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">{translate({ id: 'coaches.form.email', message: 'Email' })}</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="message">{translate({ id: 'coaches.form.message', message: 'Why Do You Want to Be an Early Adopter? (Optional)' })}</label>
                        <textarea id="message" name="message" rows={4} placeholder={translate({ id: 'coaches.form.message.placeholder', message: 'Tell us briefly about your current process or what you hope to gain from Inner Journey...' })}></textarea>
                    </div>
                    <motion.button type="submit" className={clsx('button', styles.submitButton)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        {translate({ id: 'coaches.form.submit', message: 'Yes, I’m Interested!' })}
                    </motion.button>
                </form>
            </div>
        </motion.section>
    );
}

export default function Index(): ReactNode {
    return (
        <Layout
            title={translate({ id: 'coaches.layout.title', message: 'Coaches | Simplify Your Workflow with Inner Journey' })}
            description={translate({ id: 'coaches.layout.description', message: 'Become an Early Adopter coach on Inner Journey. Get tools for client management, collaboration, and payments – all in one place. Sign up now!' })}
        >
            <CoachesHeader />
            <main>
                <WhyInnerJourney />
                <HowItWorksSection />
                <BenefitsForCoaches />
                <CoachingPhilosophySection />
                <FutureVisionSection />
                <InterestForm />
            </main>
        </Layout>
    );
}
```

### `hooks/useGroupedGitHubData.ts`
```ts
// /home/joelkvarnsmyr/projects/innerjourney/docs/src/hooks/useGroupedGitHubData.ts
import { useState, useEffect } from 'react';
import { fetchGitHubProjectData, GitHubProjectData } from '../api/api';

// Typ för det grupperade resultatet
export interface GroupedData {
    [key: string]: ProjectItem[];
}

// Interface för ett transformerat projektitem
export interface ProjectItem {
    id: string;
    title: string;
    description?: string;
    url?: string;
    objective?: string;
    status?: string;
    priority?: string;
    size?: string;
    estimate?: number | null;
    moscow?: string;
    team?: string;
    userValue?: string | null;
    releaseVersion?: string;
    financialImpact?: number | null;
    quarter?: string;
    risk?: string;
    stakeholder?: string;
    fundingSource?: string;
    dependencies?: string;
    discussionUrl?: string;
    ideaStatus?: string;
    assignees?: string[];
    labels?: string[];
    iteration?: { title?: string; startDate?: string } | null;
    milestone?: { title?: string; url?: string } | null;
    repository?: { nameWithOwner?: string; url?: string } | null;
    reviewers?: string[];
    parentIssue?: { title?: string; url?: string } | null;
    startDate?: string | null;
    endDate?: string | null;
    deadline?: string | null;
    linkedPullRequests?: any;
    subIssuesProgress?: string;
}

// Grupperingsnycklar
export type GroupByKey = 'moscow' | 'status' | 'priority' | 'team' | 'ideaStatus';

// Standardkategorier
const defaultCategoryLists: { [key in GroupByKey]: string[] } = {
    moscow: ['Must have', 'Should have', 'Could have', "Won't have"],
    status: ['Ideas', 'Backlog', 'Ready', 'In progress', 'In review', 'Done'],
    priority: ['P0', 'P1', 'P2'],
    team: ['Dev', 'Design', 'Admin', 'Backend', 'Frontend', 'Finance', 'UX', 'UX + Dev'],
    ideaStatus: ['New Idea', 'Under Discussion', 'Evaluated', 'Accepted', 'Rejected'], // Uppdaterade värden
};

const UNCATEGORIZED_KEY = 'Okategoriserad';

// Hjälpfunktion för att transformera rådata till ProjectItem
const transformItem = (item: GitHubProjectData['items']['nodes'][0]): ProjectItem => {
    const fieldValues = item.fieldValues.nodes.reduce((acc, fv) => {
        acc[fv.field.name] = fv.text || fv.number || fv.date || fv.name || fv.title || null;
        return acc;
    }, {} as { [key: string]: any });

    return {
        id: item.id,
        title: item.content.title,
        description: item.content.body,
        url: item.content.url,
        objective: fieldValues['Objective'],
        status: fieldValues['Status'],
        priority: fieldValues['Priority'],
        size: fieldValues['Size'],
        estimate: fieldValues['Estimate'],
        moscow: fieldValues['MoSCoW'],
        team: fieldValues['Team'],
        userValue: fieldValues['User Value'],
        releaseVersion: fieldValues['Release version'],
        financialImpact: fieldValues['Financial Impact'],
        quarter: fieldValues['Quarter'],
        risk: fieldValues['Risk'],
        stakeholder: fieldValues['Stakeholder'],
        fundingSource: fieldValues['Funding Source'],
        dependencies: fieldValues['Dependencies'],
        discussionUrl: fieldValues['Discussion URL'],
        ideaStatus: fieldValues['Idea Status'],
        assignees: item.content.assignees?.nodes.map(a => a.login) || [],
        labels: item.content.labels?.nodes.map(l => l.name) || [],
        iteration: fieldValues['Iteration'] ? { title: fieldValues['Iteration'], startDate: fieldValues['Iteration']?.startDate } : null,
        milestone: item.content.milestone ? { title: item.content.milestone.title, url: item.content.milestone.dueOn } : null,
        repository: item.content.repository ? { nameWithOwner: `${item.content.repository.owner.login}/${item.content.repository.name}`, url: item.content.repository.id } : null,
        reviewers: [],
        parentIssue: fieldValues['Parent issue'] ? { title: fieldValues['Parent issue'] } : null,
        startDate: fieldValues['Start date'],
        endDate: fieldValues['End date'],
        deadline: fieldValues['Deadline'],
        linkedPullRequests: null,
        subIssuesProgress: fieldValues['Sub-issues progress'],
    };
};

/**
 * Custom Hook för att hämta och gruppera GitHub-projektdata dynamiskt
 */
export function useGroupedGitHubData(groupBy: GroupByKey) {
    const [rawData, setRawData] = useState<GitHubProjectData | null>(null);
    const [groupedData, setGroupedData] = useState<GroupedData>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchGitHubProjectData();
                if (isMounted) {
                    setRawData(data);
                    setError(null);
                }
            } catch (err: any) {
                if (isMounted) {
                    setError(err.message || 'Ett okänt fel inträffade vid datahämtning.');
                    setRawData(null);
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        fetchData();
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (loading || error || !rawData) {
            setGroupedData({});
            return;
        }

        const items = rawData.items.nodes.map(transformItem);
        const grouped: GroupedData = {};
        const categories = defaultCategoryLists[groupBy] || [];

        [...categories, UNCATEGORIZED_KEY].forEach(cat => {
            grouped[cat] = [];
        });

        items.forEach(item => {
            const categoryValue = item[groupBy as keyof ProjectItem] as string | undefined | null;
            const categoryName = categoryValue || UNCATEGORIZED_KEY;
            if (!grouped[categoryName]) grouped[categoryName] = [];
            grouped[categoryName].push(item);
        });

        if (grouped[UNCATEGORIZED_KEY]?.length === 0 && Object.keys(grouped).length > 1) {
            delete grouped[UNCATEGORIZED_KEY];
        }

        setGroupedData(grouped);
    }, [rawData, groupBy, loading, error]);

    return { data: groupedData, loading, error };
}
```

### `css/custom.css`
```css
/**
 * Any CSS included here will be global. The classic template
 * bundles Infima by default. Infima is a CSS framework designed to
 * work well for content-centric websites.
 */

/* Override default Infima variables for Inner Journey */
:root {
  /* Primärfärger baserade på Inner Journeys #FF6F61 */
  --ifm-color-primary: #ff6f61;
  --ifm-color-primary-dark: #e65a4d;
  --ifm-color-primary-darker: #d94f42;
  --ifm-color-primary-darkest: #c43e32;
  --ifm-color-primary-light: #ff8475;
  --ifm-color-primary-lighter: #ff9083;
  --ifm-color-primary-lightest: #ffaba2;

  /* Bakgrunds- och textfärger */
  --ifm-background-color: #ffffff;
  --ifm-heading-color: #2d2d2d;
  --ifm-link-color: #ff6f61;
  --ifm-link-hover-color: #ff9f43;

  /* Navbar och footer */
  --ifm-navbar-background-color: #ffffff;
  --ifm-footer-background-color: #2d2d2d;

  /* Kodstilar */
  --ifm-code-font-size: 90%;
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.1);

  /* Övriga stilar */
  --ifm-font-family-base: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

/* Förbättra läsbarhet i mörkt läge */
[data-theme='dark'] {
  /* Primärfärger i mörkt läge (ljusare nyans för bättre kontrast) */
  --ifm-color-primary: #ff9083;
  --ifm-color-primary-dark: #ff8475;
  --ifm-color-primary-darker: #ff6f61;
  --ifm-color-primary-darkest: #e65a4d;
  --ifm-color-primary-light: #ffaba2;
  --ifm-color-primary-lighter: #ffb7b0;
  --ifm-color-primary-lightest: #ffd1cc;

  /* Bakgrunds- och textfärger */
  --ifm-background-color: #1a1a1a;
  --ifm-heading-color: #ffffff;
  --ifm-link-color: #ff9083;
  --ifm-link-hover-color: #ffaba2;

  /* Navbar och footer */
  --ifm-navbar-background-color: #2d2d2d;
  --ifm-footer-background-color: #1a1a1a;

  /* Kodstilar */
  --docusaurus-highlighted-code-line-bg: rgba(255, 255, 255, 0.1);
}

/* Fixa layout för kort */
.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px; /* Standardmarginal för Docusaurus row */
}

.col {
  padding: 0 15px; /* Standardpadding för Docusaurus col */
  box-sizing: border-box;
  position: relative;
}

a.featureCard {
  position: relative;
  z-index: 1; /* Förhindra att kort överlappas av andra element */
}
```

### `theme/NavbarItem/index.tsx`
```tsx
// src/theme/NavbarItem/index.tsx
import React, { type ReactNode } from 'react';
import NavbarItem from '@theme-original/NavbarItem';
import type NavbarItemType from '@theme/NavbarItem';
import type { WrapperProps } from '@docusaurus/types';
import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher'; // Uppdaterad sökväg

type Props = WrapperProps<typeof NavbarItemType>;

export default function NavbarItemWrapper(props: Props): ReactNode {
    if (props.type === 'custom-language-switcher') {
        return <LanguageSwitcher />;
    }

    return <NavbarItem {...props} />;
}
```

## Uppdrag till Gemini 2.5
Ingen analys vald.

## Resultat från Gemini 2.5
Ingen analys genererad (valdes bort).