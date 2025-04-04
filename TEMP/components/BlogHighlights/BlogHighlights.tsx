// docs/src/components/BlogHighlights/BlogHighlights.tsx
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { motion } from 'framer-motion';
import { usePluginData } from '@docusaurus/useGlobalData'; // *** NY IMPORT ***

// Importera den egna CSS-modulen för denna komponent
import styles from './BlogHighlights.module.css';

// --- Animationsvarianter (Behåll från tidigare) ---
const fadeInYProps = (delay = 0, y = 20, duration = 0.6) => ({ /* ... */ });
const sectionTitleProps = { /* ... */ };
const staggerContainerProps = (staggerChildren = 0.1) => ({ /* ... */ });
const itemFadeInProps = { /* ... */ };
const innerItemFadeInProps = (delay = 0) => ({ /* ... */ });

// Typ för bloggpost-metadata (kan behöva justeras baserat på exakt struktur)
interface BlogPost {
    id: string;
    metadata: {
        permalink: string;
        title: string;
        description: string; // Används som excerpt
        date: string;
        tags: { label: string; permalink: string }[];
        // Lägg till fler fält vid behov (t.ex. formattedDate)
    };
}

// Typ för global bloggdata (antar standardstruktur)
interface BlogPluginData {
    posts: BlogPost[];
    // Lägg till andra fält från plugin-datan om du behöver dem
}

// === Blog Highlights Komponenten ===
const BlogHighlights: React.FC = () => {
    // Hämta global bloggdata
    // 'docusaurus-plugin-content-blog' är standard-ID. Ändra om du har en annan instans.
    const blogData = usePluginData('docusaurus-plugin-content-blog') as BlogPluginData;

    // Filtrera och sortera inläggen (om blogData finns)
    // Sortera fallande på datum (nyast först)
    // Filtrera på taggen 'Highlights' (skiftlägesokänsligt)
    // Ta de 3 senaste
    const highlightedPosts = blogData?.posts
        ?.filter(post =>
            post.metadata.tags.some(tag => tag.label.toLowerCase() === 'highlights')
        )
        .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()) // Säkerställ sortering
        .slice(0, 3) ?? []; // Returnera tom array om ingen data finns

    // Om inga highlights hittades, rendera ingenting (eller ett meddelande)
    if (highlightedPosts.length === 0) {
        // return <p>Inga highlightade blogginlägg hittades.</p>; // Alternativt
        return null;
    }

    return (
        <motion.section className={styles.blogHighlightsSection} {...fadeInYProps()}>
            <div className="container"> {/* Använd standard Docusaurus container */}
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        Från Vår Blogg: Utvalda Insikter
                    </Heading>
                </motion.div>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.1)} style={{marginBottom: "3rem"}}>
                    Utforska några av våra mest lästa artiklar och få djupare insikter om vår metodik och vision.
                </motion.p>

                <motion.div className={styles.blogPostPreviewGrid} {...staggerContainerProps(0.1)}>
                    {highlightedPosts.map((post) => ( // Använd den filtrerade listan
                        <motion.div
                            key={post.id} // Använd postens ID som nyckel
                            className={styles.blogPostPreviewCard}
                            variants={itemFadeInProps}
                            whileHover={{ y: -4, transition:{ duration: 0.2 }}}
                        >
                            <motion.div {...innerItemFadeInProps(0.1)}>
                                <Heading as="h3" className={styles.blogPostPreviewTitle}>
                                    {/* Använd postens permalink och titel */}
                                    <Link to={post.metadata.permalink}>{post.metadata.title}</Link>
                                </Heading>
                            </motion.div>
                            <motion.p className={styles.blogPostPreviewExcerpt} {...innerItemFadeInProps(0.2)}>
                                {/* Använd postens description som excerpt */}
                                {post.metadata.description}
                            </motion.p>
                            <motion.div {...innerItemFadeInProps(0.3)}>
                                {/* Använd postens permalink */}
                                <Link className={styles.blogPostReadMore} to={post.metadata.permalink}>
                                    Läs mer <span className={styles.arrowIcon}>→</span>
                                </Link>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

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