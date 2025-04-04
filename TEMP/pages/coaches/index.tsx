// docs/src/pages/coaches/index.tsx
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { motion } from 'framer-motion'; // Importera motion
import styles from './coaches.module.css'; // Importera den dedikerade CSS-modulen

// --- Animationsvarianter (Återanvändbara) ---
const fadeInProps = {
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 }, // Kör en gång, när 20% är synligt
    transition: { duration: 0.6, ease: 'easeOut' },
};

const sectionTitleProps = { // För rubriker
    initial: { opacity: 0, y: -15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.5, ease: 'easeOut' },
};

const listContainerVariants = { // För stagger-effekt
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, ease: 'easeOut' },
    },
};

const listItemVariants = { // För individuella list-items
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const cardItemVariants = { // För kort
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
                        Forma Framtiden för Coaching – Med Inner Journey
                    </Heading>
                </motion.div>
                <motion.p className={styles.heroSubtitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}>
                    Trött på spridda verktyg? Få en samlad plattform, nå fler klienter och fokusera på det du gör bäst: att guida till verklig förändring.
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}>
                    {/* Länk till formuläret direkt i headern */}
                    <Link className={clsx('button button--lg', styles.ctaButton)} to="#interest-form">
                        Anmäl intresse som Early Adopter
                    </Link>
                </motion.div>
            </div>
        </header>
    );
}

// 1. Problemet du löser
function WhyInnerJourney() {
    return (
        <motion.section className={styles.whySection} {...fadeInProps}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        Från Kaos till Klarhet: Ditt Nya Coaching-HQ
                    </Heading>
                </motion.div>
                <p className={styles.sectionText}>
                    Känner du igen dig? Anteckningar i ett dokument, övningar via mejl, feedback på SMS eller Messenger... Det är dags för en förändring. Inner Journey samlar allt ditt klientarbete på **ett ställe**. Ge dina klienter en professionell upplevelse och frigör din tid till det som verkligen betyder något.
                </p>
                {/* Valfritt: Lägg till en enkel visuell kontrast, t.ex. ikoner för kaos vs. ordning */}
            </div>
        </motion.section>
    );
}

// 2. Så fungerar samarbetet
function HowItWorksSection() {
    const steps = [
        { icon: '🎯', title: 'Sätt Kursen', text: 'Skapa anpassade "Personliga Resor" eller tilldela specifika "Activations" direkt till din klient i appen.' },
        { icon: '✍️', title: 'Klienten Engagerar Sig', text: 'Klienten genomför övningar och reflekterar i sin "Dynamiska Journal" – när det passar dem.' },
        { icon: '💬', title: 'Samlad Feedback', text: 'Du får notiser, granskar framsteg och ger värdefull feedback – allt inom samma plattform. Inga fler spridda trådar!' },
        { icon: '🌱', title: 'Nästa Steg Tillsammans', text: 'Följ utvecklingen, se mönster och sätt nästa steg för klientens resa baserat på verklig data och dialog.' },
    ];
    return (
        <motion.section className={styles.howItWorksSection} {...fadeInProps}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        Ett Smidigare Samarbete – Steg för Steg
                    </Heading>
                </motion.div>
                <motion.ol // Använd ordnad lista för processen
                    className={styles.howItWorksList}
                    variants={listContainerVariants} // För stagger
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {steps.map((step, index) => (
                        <motion.li key={index} className={styles.howItWorksStep} variants={listItemVariants}>
                            <span className={styles.stepIcon}>{step.icon}</span>
                            <div>
                                <Heading as="h3" className={styles.stepTitle}>{step.title}</Heading>
                                <p className={styles.stepText}>{step.text}</p>
                            </div>
                        </motion.li>
                    ))}
                </motion.ol>
            </div>
        </motion.section>
    );
}


// 3. Fördelar (inklusive betalning)
function BenefitsForCoaches() {
    const benefits = [
        { icon: '🛠️', title: 'Strukturera Klientresan', text: 'Använd Activations och Personliga Resor för att skapa tydliga, effektiva utvecklingsplaner.' },
        { icon: '💬', title: 'Centraliserad Kommunikation', text: 'All dialog och feedback samlas i journalen – professionellt och lätt att följa upp.' },
        { icon: '💸', title: 'Enkel Betalning (Snart!)', text: 'Fokusera på coaching, vi sköter resten. Snart lanserar vi en smidig lösning för kortbetalningar från klient och enkla utbetalningar till dig.' },
        { icon: '🤝', title: 'Community & Support', text: 'Bli en del av en stödjande gemenskap. Dela erfarenheter och få support via vår Discord-kanal.' },
    ];

    return (
        <section className={styles.benefitsSection}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        Dina Fördelar som Inner Journey Coach
                    </Heading>
                </motion.div>
                <motion.div
                    className={styles.benefitsList}
                    variants={listContainerVariants} // Använd container för stagger
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            className={styles.benefitCard}
                            variants={cardItemVariants} // Använd item variant
                            whileHover={{ scale: 1.04, y: -5, transition: { duration: 0.2 } }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className={styles.benefitIcon}>{benefit.icon}</span>
                            <Heading as="h3">{benefit.title}</Heading>
                            <p>{benefit.text}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// 4. Coachingfilosofi
function CoachingPhilosophySection() {
    return (
        <motion.section className={styles.philosophySection} {...fadeInProps}>
            <div className={clsx('container', styles.sectionContainer, styles.philosophyContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        Vår Filosofi: Vägledning, Inte Pekpinnar
                    </Heading>
                </motion.div>
                <p className={styles.sectionText}>
                    "En plattform som genom forskningsbaserade, holistiska verktyg vägleder dig till självinsikt och personlig utveckling – **utan att tala om vad du ska göra.**"
                </p>
                <p className={styles.sectionText}>
                    Vi tror på att stärka både klientens och coachens autonomi. Våra verktyg är designade för att stödja genuin upptäckt och äkta partnerskap på utvecklingsresan. Passar detta ditt sätt att coacha?
                </p>
            </div>
        </motion.section>
    );
}

// 5. Framtidsvision (inklusive AI-inspelning)
function FutureVisionSection() {
    return (
        <motion.section className={styles.futureSection} {...fadeInProps}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        Var Med och Forma Framtiden <motion.span style={{display: 'inline-block'}} animate={{scale:[1, 1.1, 1], rotate: [0, 5, 0]}} transition={{repeat: Infinity, duration: 4, ease: 'easeInOut'}}>🚀</motion.span>
                    </Heading>
                </motion.div>
                <p className={styles.sectionText}>
                    Som early adopter får du inte bara tillgång till plattformen först, du får också en unik chans att påverka dess utveckling. Här är några av de spännande funktioner vi arbetar på:
                </p>
                <motion.ul // Använd lista för framtidspunkter
                    className={styles.futureList}
                    variants={listContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.li variants={listItemVariants}><strong>Integrerad Betallösning:</strong> Enkel kortbetalning för klienter och smidiga utbetalningar till dig, direkt i appen.</motion.li>
                    <motion.li variants={listItemVariants}><strong>AI-stödd Inspelning (Beta):</strong> Spela in dina egna meditationer och guidningar direkt i appen, med automatisk ljudförbättring och möjlighet att lägga till bakgrundsljud.</motion.li>
                    <motion.li variants={listItemVariants}><strong>Avancerad Matchning:</strong> Ännu smartare matchning baserad på djupare profilering för att koppla dig med idealklienter.</motion.li>
                    <motion.li variants={listItemVariants}><strong>Gruppsessioner & Events:</strong> Verktyg för att leda workshops och community-events direkt på plattformen.</motion.li>
                </motion.ul>
            </div>
        </motion.section>
    );
}

// 6. Intresseformulär
function InterestForm() {
    return (
        <motion.section
            id="interest-form" // Lägg till ID för att kunna länka hit
            className={styles.formSection}
            initial={{ opacity: 0 }} // Enkel fade in för formuläret
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        Redo att Förändra Ditt Coachingflöde?
                    </Heading>
                </motion.div>
                <p className={styles.sectionText}>
                    Anmäl ditt intresse som Early Adopter idag! Få tidig tillgång, specialerbjudanden och chansen att forma framtidens coachingverktyg tillsammans med oss.
                </p>
                <form action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST" className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Namn</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">E-post</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="message">Varför vill du vara Early Adopter? (Valfritt)</label>
                        <textarea id="message" name="message" rows={4} placeholder="Berätta kort om din nuvarande process eller vad du hoppas få ut av Inner Journey..."></textarea>
                    </div>
                    <motion.button type="submit" className={clsx('button', styles.submitButton)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        Ja, jag är intresserad!
                    </motion.button>
                </form>
            </div>
        </motion.section>
    );
}

// --- Huvudexport ---
export default function Index(): ReactNode {
    return (
        <Layout
            title="Coacher | Förenkla ditt arbetsflöde med Inner Journey" // Mer SEO-vänlig titel
            description="Bli en Early Adopter-coach på Inner Journey. Få verktyg för klienthantering, samarbete och betalning – allt på ett ställe. Anmäl intresse!" // Uppdaterad beskrivning
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