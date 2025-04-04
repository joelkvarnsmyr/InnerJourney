// docs/src/pages/index.tsx
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { motion } from 'framer-motion'; // Importera motion för animationer

// Importera page-specifika stilar (behålls för sektionsbakgrunder etc.)
import pageStyles from './index.module.css';

// Importera de externa komponenterna
import HomepageHeader from '../components/HomepageHeader'; // Den utbrutna headern
import BlogHighlights from '../components/BlogHighlights/BlogHighlights'; // Den utbrutna bloggsektionen

// --- Animationsvarianter (kan flyttas till en delad fil) ---
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

const itemFadeInProps = { // För kort och listelement
    variants: {
        hidden: { opacity: 0, y: 20, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    },
};

// --- Sektionskomponenter definierade lokalt för startsidan ---

// 1. Kärnan / Filosofin
function CorePhilosophySection() {
    return (
        <motion.section className={pageStyles.coreSection} {...fadeInYProps()}>
            <div className={clsx("container", pageStyles.sectionContainer, pageStyles.coreContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={pageStyles.sectionTitle}>
                        🧭 Navigera Din Inre Värld – Med Hjärtat Först
                    </Heading>
                </motion.div>
                <motion.p className={pageStyles.sectionText} {...fadeInYProps(0.1)}>
                    Inner Journey är din partner för <strong>autentisk självinsikt och meningsfull utveckling</strong>. Vi tror att svaren finns inom dig. Vår plattform erbjuder forskningsbaserade, holistiska verktyg och en stödjande community för att hjälpa dig upptäcka dem – utan pekpinnar.
                </motion.p>
                <motion.p className={pageStyles.sectionText} {...fadeInYProps(0.2)}>
                    Vi ger dig verktygen, du styr resan. Utforska, reflektera och väx – <strong>utan pekpinnar</strong>.
                </motion.p>
                <motion.div {...fadeInYProps(0.3)} style={{textAlign: 'center', marginTop: '1.5rem'}}>
                    <Link className={pageStyles.linkStyled} to="/docs/project/visionar-grund">Vår Filosofi & Vision</Link>
                </motion.div>
            </div>
        </motion.section>
    );
}

// 2. Konceptet / Hur det fungerar
function ConceptSection() {
    const concepts = [
        { icon: '✨', title: 'Personlig Vägledning', text: 'AI-drivna förslag på övningar och reflektioner som matchar dina mål.' },
        { icon: '✍️', title: 'Fördjupad Insikt', text: 'Dynamisk journalföring som hjälper dig se mönster och förstå dig själv bättre.' },
        { icon: '🤝', title: 'Gemenskap & Stöd', text: 'Möjlighet att växa tillsammans med andra och få stöd från erfarna coacher.' },
        { icon: '🛠️', title: 'Holistiska Verktyg', text: 'En samlad verktygslåda med meditation, målsättning och mer för ditt välmående.' },
    ];
    return (
        <motion.section className={pageStyles.conceptSection}>
            <div className={clsx("container", pageStyles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={pageStyles.sectionTitle}>En Intelligent & Stödjande Reskamrat</Heading>
                </motion.div>
                <motion.p className={pageStyles.sectionText} {...fadeInYProps(0.1)}>
                    Föreställ dig en plattform som lär känna dig och anpassar sig efter din unika resa. Inner Journey använder smart teknik för att erbjuda:
                </motion.p>
                <motion.div className={pageStyles.conceptGrid} {...staggerContainerProps(0.15)}>
                    {concepts.map((concept, index) => (
                        <motion.div key={index} className={pageStyles.conceptItem} variants={itemFadeInProps}>
                            <span className={pageStyles.conceptIcon}>{concept.icon}</span>
                            <div>
                                {/* Använd klasser från pageStyles */}
                                <Heading as="h3" className={pageStyles.conceptItemTitle}>{concept.title}</Heading>
                                <p className={pageStyles.conceptItemText}>{concept.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}


// 3. Sektion för Olika Målgrupper/Vägar
function PathwaysSection() {
    const pathways = [
        { title: 'Utforska Din Potential', text: 'Starta din personliga resa med våra verktyg och insikter...', link: '/docs/intro', buttonText: 'Kom Igång (Gratis)' , icon: '👤'},
        { title: 'För Coacher', text: 'Förenkla ditt arbete, nå fler klienter och använd en plattform byggd för samarbete.', link: '/coaches', buttonText: 'Upptäck Fördelarna', icon: '🧑‍🏫' },
        { title: 'För Investerare', text: 'Bli partner i en visionär healthtech-plattform med stark tillväxtpotential.', link: '/investeringsmojligheter', buttonText: 'Se Möjligheten', icon: '📈' },
        { title: 'Jobba med Oss', text: 'Bidra med din expertis eller utforska strategiska samarbeten. Bygg framtidens välmående med oss.', link: '/partners-och-medarbetare', buttonText: 'Delta i Resan', icon: '🤝' },
    ];
    return (
        <motion.section className={pageStyles.pathwaysSection}>
            <div className={clsx("container", pageStyles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={pageStyles.sectionTitle}>En Resa för Alla – Hitta Din Väg</Heading>
                </motion.div>
                <motion.p className={pageStyles.sectionText} {...fadeInYProps(0.1)} style={{marginBottom: "3rem"}}>
                    Inner Journey är ett ekosystem för tillväxt. Oavsett om du vill utvecklas själv, guida andra, investera i förändring eller bidra med din talang, finns det en plats för dig.
                </motion.p>
                <motion.div className={pageStyles.pathwaysGrid} {...staggerContainerProps(0.1)}>
                    {pathways.map((path, index) => (
                        <motion.div key={index} className={pageStyles.pathwayCard} variants={itemFadeInProps} whileHover={{ y: -5, transition: {duration: 0.2} }}>
                            <div className={pageStyles.pathwayIcon}>{path.icon}</div>
                            <Heading as="h3" className={pageStyles.pathwayTitle}>{path.title}</Heading>
                            <p className={pageStyles.pathwayText}>{path.text}</p>
                            <Link className={clsx('button', pageStyles.pathwayButton)} to={path.link}>
                                {path.buttonText}
                            </Link>
                        </motion.div>
                    ))}
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
                    <Heading as="h2" className={pageStyles.sectionTitle}>Gå Med i Vår Gemenskap</Heading>
                </motion.div>
                <motion.p className={pageStyles.sectionText} {...fadeInYProps(0.1)}>
                    Utvecklingen sker tillsammans! Delta i samtal, ställ frågor och dela dina insikter med andra användare, coacher och teamet bakom Inner Journey.
                </motion.p>
                <motion.div {...fadeInYProps(0.2)} style={{textAlign: 'center', marginTop: '2rem'}}>
                    <Link className={clsx('button button--lg', pageStyles.discordButton)} to="https://discord.gg/2j5a2Gze8W" target="_blank" rel="noopener noreferrer">
                        Anslut till Discord <span className={pageStyles.externalIcon}>↗</span>
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
            title={`Inner Journey | Din Partner för Personlig Utveckling`}
            description="Utforska Inner Journey – en AI-förstärkt plattform med community och coaching för genuin självinsikt och transformation. Kom igång gratis!"
        >
            {/* Använd den utbrutna header-komponenten */}
            <HomepageHeader />
            <main>
                {/* De omarbetade sektionerna i önskad ordning */}
                <CorePhilosophySection />
                <ConceptSection />
                <PathwaysSection />
                {/* Använd den importerade blogg-komponenten */}
                <BlogHighlights />
                <CommunityCtaSection />
            </main>
        </Layout>
    );
}