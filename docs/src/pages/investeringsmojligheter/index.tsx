// docs/src/pages/investeringsmojligheter/index.tsx
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { motion } from 'framer-motion';
import styles from './investeringsmojligheter.module.css'; // Importera den dedikerade CSS-modulen

// --- Animationsvarianter (Behåll eller justera) ---
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

const itemFadeInProps = { // För list-items och kort
    variants: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    },
};

const numberAnimationProps = { // Enkel scale/opacity för siffror
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
                    {/* Mer visionär titel */}
                    <Heading as="h1" className={styles.heroTitle}>
                        Skala Upp Medvetenhet: Investera i Inner Journey
                    </Heading>
                </motion.div>
                <motion.p className={styles.heroSubtitle} {...fadeInYProps(0.4, 20)}>
                    {/* Fokus på syfte och kombination */}
                    En unik möjlighet att stödja en plattform där teknologi och hjärtintelligens möts för att möjliggöra djup personlig transformation – globalt.
                </motion.p>
                <motion.div {...fadeInYProps(0.6, 20)}>
                    <Link className={clsx('button button--lg', styles.ctaButton)} to="#contact-investor">
                        Utforska Partnerskap
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
                        Ett Växande Behov av Djupare Mening
                    </Heading>
                </motion.div>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.1)}>
                    I en alltmer uppkopplad men fragmenterad värld växer längtan efter genuin självinsikt, inre lugn och meningsfulla verktyg för personlig utveckling. Marknaden för digitalt välmående expanderar snabbt, men många saknar det djup och den autenticitet som krävs för verklig transformation.
                </motion.p>
                <motion.div className={styles.statRow} {...staggerContainerProps(0.2)}>
                    {/* Behåll siffror, men ramen är behovet */}
                    <motion.div className={styles.statCard} variants={itemFadeInProps}>
                        <div className={styles.statValue}><motion.span {...numberAnimationProps}>16+</motion.span> Miljarder USD</div>
                        <div className={styles.statLabel}>Marknadsprognos Mental Hälsa-appar 2030</div>
                    </motion.div>
                    <motion.div className={styles.statCard} variants={itemFadeInProps}>
                        <div className={styles.statValue}><motion.span {...numberAnimationProps}>5.5%+</motion.span></div>
                        <div className={styles.statLabel}>Årlig Tillväxttakt (CAGR) Personlig Utveckling</div>
                    </motion.div>
                    <motion.div className={styles.statCard} variants={itemFadeInProps}>
                        {/* Nytt exempel på stat */}
                        <div className={styles.statValue}><motion.span {...numberAnimationProps}>70%+</motion.span></div>
                        <div className={styles.statLabel}>Av Millennials Prioriterar Personlig Utveckling (Exempeldata)</div>
                    </motion.div>
                </motion.div>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.2)} style={{ marginTop: '2.5rem' }}>
                    Inner Journey möter detta behov genom att erbjuda en plattform rotad i **autenticitet, hjärtintelligens och gemenskap**, förstärkt av modern teknologi.
                </motion.p>
            </div>
        </motion.section>
    );
}

// 2. Vår Lösning: Plattformen som Tjänar Resan (Fokus på helheten)
function SolutionSection() {
    const features = [
        { icon: '🤝', title: 'Levande Community & Coaching', text: 'Möjlighet att växa tillsammans med andra och få stöd från certifierade coacher som delar vår filosofi.' },
        { icon: '🧠', title: 'Intelligent Vägledning', text: 'AI hjälper till att föreslå relevanta övningar och insikter baserat på din unika resa, utan pekpinnar.' },
        { icon: '✍️', title: 'Dynamisk Reflektion', text: 'En smart journal som stödjer djupare självinsikt genom anpassade frågor och teman.' },
        { icon: '🛠️', title: 'Holistiska Verktyg', text: 'Integrerade övningar som meditation, målsättning och reflektion för kropp, sinne och själ.' },
    ];
    return (
        <motion.section className={styles.solutionSection}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...fadeInYProps(0, -15)}>
                    {/* Omskriven titel */}
                    <Heading as="h2" className={styles.sectionTitle}>Inner Journey: Där Människa och Teknik Möts</Heading>
                </motion.div>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.1)}>
                    Vi bygger inte bara en app, utan ett **ekosystem för medveten utveckling**. Kärnan är vår community och vår filosofi om att vägleda till *egna* insikter. Teknologin, inklusive AI och röstinteraktion, är kraftfulla verktyg som **tjänar och förstärker** denna process:
                </motion.p>
                <motion.div className={styles.featureGrid} {...staggerContainerProps()}>
                    {features.map((feature, index) => (
                        <motion.div key={index} className={styles.featureCard} variants={itemFadeInProps}>
                            <div className={styles.featureIcon}>{feature.icon}</div>
                            <Heading as="h3" className={styles.featureTitle}>{feature.title}</Heading>
                            <p className={styles.featureText}>{feature.text}</p>
                        </motion.div>
                    ))}
                </motion.div>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.2)} style={{ marginTop: '2.5rem', fontStyle: 'italic' }}>
                    Vår unika kombination av **hjärta och teknik** skapar en autentisk och djupt transformerande upplevelse.
                </motion.p>
            </div>
        </motion.section>
    );
}

// 3. Varför Investera? (Fokus på Impact och Synergi)
function WhyInvestSection() {
    const reasons = [
        { icon: '✨', title: 'Timing & Kulturellt Skifte', text: 'Investera i linje med den globala rörelsen mot ökad medvetenhet, välmående och autenticitet.' },
        { icon: '💡', title: 'Unik Synergi', text: 'En differentierad plattform som integrerar community, mänsklig vägledning och intelligent teknologi på ett meningsfullt sätt.' },
        { icon: '🌱', title: 'Skalbar Impact & Affärsmodell', text: 'Freemium-modellen möjliggör bred tillgång och global räckvidd, med tydlig potential för hållbar lönsamhet.' },
        { icon: '🧭', title: 'Visionärt Team & Värderingar', text: 'Stöd ett team med rötter i en djup vision (från Rising Beyond) och starka etiska värderingar.' },
    ];
    return (
        <motion.section className={styles.whyInvestSection}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...fadeInYProps(0, -15)}>
                    <Heading as="h2" className={styles.sectionTitle}>Varför Samarbeta med Inner Journey?</Heading>
                </motion.div>
                <motion.div className={styles.featureGrid} {...staggerContainerProps()}>
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={index}
                            className={styles.featureCard}
                            variants={itemFadeInProps}
                            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                        >
                            <div className={styles.featureIcon}>{reason.icon}</div>
                            <Heading as="h3" className={styles.featureTitle}>{reason.title}</Heading>
                            <p className={styles.featureText}>{reason.text}</p>
                        </motion.div>
                    ))}
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
                    <Heading as="h2" className={styles.sectionTitle}>Resurser för Att Förverkliga Visionen</Heading>
                </motion.div>
                <motion.div className={styles.financialGrid} {...staggerContainerProps(0.15)}>
                    <motion.div className={styles.financialBox} variants={itemFadeInProps}>
                        <Heading as="h3">Kapitalbehov & Användning</Heading>
                        <p><strong>Totalt Sökt Kapital:</strong> 2,23 MSEK</p>
                        <p><strong>Varav Privat Kapital:</strong> 0,5 - 1,5 MSEK</p>
                        <p><strong>Möjliggör:</strong></p>
                        <ul> {/* Använd lista för tydlighet */}
                            <li>🚀 Lansering av MVP (Sep 2025)</li>
                            <li>🛠️ Första årets drift & vidareutveckling</li>
                            <li>🤝 Uppbyggnad av kärnteam & community</li>
                            <li>🛡️ Nödvändig buffert</li>
                        </ul>
                    </motion.div>
                    <motion.div className={styles.financialBox} variants={itemFadeInProps}>
                        <Heading as="h3">Hållbar Affärsmodell</Heading>
                        <p><strong>Modell:</strong> Freemium (Premium 99 SEK/mån)</p>
                        <p><strong>Intäktsprognos År 1:</strong> ~594 000 SEK</p>
                        <p><strong>Break-Even:</strong> ~5.8 år (Potential 2-3 år med optimering)</p>
                        <p>Fokus på att bygga en lojal användarbas och utforska framtida intäktsströmmar (t.ex. coach-plattform).</p>
                    </motion.div>
                </motion.div>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.2)} style={{ marginTop: '2.5rem', fontStyle: 'italic', fontSize: '1rem' }}>
                    Investeringen är bränslet som låter oss skala vår impact och skapa en hållbar plattform för global transformation. Detaljerad budget finns tillgänglig.
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
                    {/* Mer inbjudande titel */}
                    <Heading as="h2" className={styles.sectionTitle}>Bli en Partner i Vår Vision</Heading>
                </motion.div>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.1)}>
                    Delar du vår passion för medvetenhet, teknologi och mänsklig potential? Vi söker värderingsdrivna partners och investerare som vill vara med och bygga framtiden. Kontakta oss för en djupare dialog.
                </motion.p>
                <form action="https://formspree.io/f/YOUR_INVESTOR_FORMSPREE_ID" method="POST" className={styles.form}>
                    <motion.div className={styles.formGroup} {...fadeInYProps(0.15)}>
                        <label htmlFor="name">Namn</label>
                        <input type="text" id="name" name="name" required />
                    </motion.div>
                    <motion.div className={styles.formGroup} {...fadeInYProps(0.20)}>
                        <label htmlFor="email">E-post</label>
                        <input type="email" id="email" name="email" required />
                    </motion.div>
                    <motion.div className={styles.formGroup} {...fadeInYProps(0.25)}>
                        <label htmlFor="company">Företag/Organisation (Valfritt)</label>
                        <input type="text" id="company" name="company" />
                    </motion.div>
                    <motion.div className={styles.formGroup} {...fadeInYProps(0.30)}>
                        <label htmlFor="message">Dina tankar eller frågor</label>
                        <textarea id="message" name="message" rows={5} required placeholder="Varför resonerar Inner Journeys vision med dig?"></textarea>
                    </motion.div>
                    <motion.button type="submit" className={clsx('button', styles.submitButton)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} {...fadeInYProps(0.35)}>
                        Kontakta Oss
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
            title="Investera i Medveten Utveckling | Inner Journey" // Ny titel
            description="Bli partner i Inner Journey – en AI-förstärkt plattform och community för personlig transformation. Investera i syfte och skalbar impact." // Ny beskrivning
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