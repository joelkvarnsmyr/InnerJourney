// docs/src/components/BlogHighlights/BlogHighlights.tsx
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { motion } from 'framer-motion';

// Importera den egna CSS-modulen för denna komponent
import styles from './BlogHighlights.module.css';

// --- Animationsvarianter (Kan finnas i en delad fil framöver) ---
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

const itemFadeInProps = { // För korten
    variants: {
        hidden: { opacity: 0, y: 20, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    },
};

const innerItemFadeInProps = (delay = 0) => ({ // För innehåll i korten
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 }, // Använd 'animate' här då föräldern triggar synlighet
    transition: { duration: 0.4, delay, ease: 'easeOut'}
});


// === Blog Highlights Komponenten ===
const BlogHighlights: React.FC = () => {
    const latestPosts = [
        {
            title: 'Levande Projektledning: Inner Journeys Metod...', // Korta ner?
            link: '/blog/levande-projektledning-inner-journeys-metod',
            excerpt: 'I en värld där projekt ofta känns som en berg-och-dalbana har vi på Inner Journey skapat en struktur som gör resan både trygg och samarbetsinriktad...'
        },
        {
            title: 'Hur stärker du din integritet?',
            link: '/blog/hur-starker-du-din-integritet',
            excerpt: 'Inner Journey tror vi att det är avgörande att leva som vi lär, särskilt när vi bygger en plattform för personlig utveckling och välmående...'
        },
        {
            title: 'Så bygger du din bästa framtid',
            link: '/blog/sa-bygger-du-din-basta-framtid',
            excerpt: 'Vad gör du när du bygger ett hus och inser att ritningarna är lite väl ambitiösa? Du stärker grunden och bygger vidare – ett rum i taget...'
        }
    ];

    return (
        <motion.section className={styles.blogHighlightsSection} {...fadeInYProps()}>
            {/* Använd standard Docusaurus container för max-bredd och centrering */}
            <div className="container">
                <motion.div {...sectionTitleProps}>
                    {/* Använd lokal stil för rubrik */}
                    <Heading as="h2" className={styles.sectionTitle}>
                        Från Vår Blogg: Insikter & Uppdateringar
                    </Heading>
                </motion.div>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.1)} style={{marginBottom: "3rem"}}>
                    Följ vår resa, få djupare insikter om vår metodik och ta del av tankar kring personlig utveckling och teknikens roll.
                </motion.p>

                {/* Grid för blogg-förhandsvisningar */}
                <motion.div className={styles.blogPostPreviewGrid} {...staggerContainerProps(0.1)}>
                    {latestPosts.slice(0, 3).map((post, index) => (
                        // Varje kort har sin egen fade-in
                        <motion.div
                            key={index}
                            className={styles.blogPostPreviewCard}
                            variants={itemFadeInProps}
                            whileHover={{ y: -4, transition:{ duration: 0.2 }}}
                            // Hela kortet är nu ett "motion"-element, så vi behöver inte wrappa innehållet separat
                        >
                            <motion.div {...innerItemFadeInProps(0.1)}>
                                <Heading as="h3" className={styles.blogPostPreviewTitle}>
                                    <Link to={post.link}>{post.title}</Link>
                                </Heading>
                            </motion.div>
                            <motion.p className={styles.blogPostPreviewExcerpt} {...innerItemFadeInProps(0.2)}>
                                {post.excerpt}
                            </motion.p>
                            <motion.div {...innerItemFadeInProps(0.3)}>
                                <Link className={styles.blogPostReadMore} to={post.link}>
                                    Läs mer <span className={styles.arrowIcon}>→</span>
                                </Link>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Knapp till huvudsakliga bloggsidan */}
                <motion.div {...fadeInYProps(0.3)} style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <Link className={clsx('button', styles.viewAllPostsButton)} to="/blog">
                        Utforska Alla Blogginlägg
                    </Link>
                </motion.div>
            </div>
        </motion.section>
    );
}

export default BlogHighlights;