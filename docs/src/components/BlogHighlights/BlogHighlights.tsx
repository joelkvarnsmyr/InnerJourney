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