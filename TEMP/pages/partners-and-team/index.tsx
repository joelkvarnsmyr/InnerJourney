// docs/src/pages/partners-och-medarbetare/index.tsx
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { motion } from 'framer-motion';
import styles from './partners-och-medarbetare.module.css';

// --- Animationsvarianter (Behåll från tidigare) ---
const fadeInYProps = (delay = 0, y = 20, duration = 0.6) => ({ /* ... */ });
const sectionTitleProps = { /* ... */ };
const staggerContainerProps = (staggerChildren = 0.1) => ({ /* ... */ });
const itemFadeInProps = { /* ... */ };


// --- Komponenter ---

function PartnersHeader() {
    return (
        <header className={clsx('hero', styles.heroBanner)}>
            <div className={clsx("container", styles.heroContainer)}>
                <motion.div {...fadeInYProps(0.2, -20)}>
                    <Heading as="h1" className={styles.heroTitle}>
                        Var Med och Bygg Framtiden för Personlig Utveckling
                    </Heading>
                </motion.div>
                <motion.p className={styles.heroSubtitle} {...fadeInYProps(0.4, 20)}>
                    Inner Journey söker passionerade medarbetare och strategiska partners som vill revolutionera hur människor växer och når sin potential – genom en unik plattform där hjärta möter teknik.
                </motion.p>
                <motion.div {...fadeInYProps(0.6, 20)}>
                    <Link className={clsx('button button--lg', styles.ctaButton)} to="#interest-form">
                        Visa Intresse & Möjligheter
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
                        Drivs Du av Syfte och Innovation?
                    </Heading>
                </motion.div>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.1)}>
                    Inner Journey har sina rötter i en vision om en värld byggd på <strong>enhet, hjärtintelligens och hållbar förändring</strong>. Vi tror på teknikens kraft att förstärka mänsklig potential, inte ersätta den.
                </motion.p>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.2)}>
                    Hos oss får du arbeta i ett <strong>flexibelt, distribuerat team</strong> där <strong>autenticitet och välmående</strong> värderas lika högt som resultat. Vi söker dig som vill bidra till något meningsfullt och vara med på en spännande tillväxtresa.
                </motion.p>
                <motion.div {...fadeInYProps(0.3)} style={{textAlign: 'center', marginTop: '1.5rem'}}>
                    <Link className={styles.linkStyled} to="/docs/project/visionar-grund">Läs mer om vår visionära grund</Link>
                </motion.div>
            </div>
        </motion.section>
    );
}

function WhatWeBuildSection() {
    // Array med teknologier och deras logotyper (justera sökvägar!)
    const techStack = [
        { name: 'React', logo: '/img/logos/react-logo.svg' }, // Exempelsökväg
        { name: 'Python', logo: '/img/logos/python-logo.svg' },
        { name: 'Firebase', logo: '/img/logos/firebase-logo.svg' },
        { name: 'Google Cloud', logo: '/img/logos/google-cloud-logo.svg' },
        { name: 'Dialogflow CX', logo: '/img/logos/dialogflow-logo.svg' },
    ];

    return (
        <motion.section className={styles.whatWeBuildSection}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>En Intelligent Plattform för Inre Resor</Heading>
                </motion.div>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.1)}>
                    Vi utvecklar en modern PWA som agerar som en följeslagare för självinsikt. Genom AI, smart journalföring och integrerade verktyg skapar vi en personlig och adaptiv upplevelse. Vår teknikstack inkluderar:
                </motion.p>
                {/* === Nytt: Grid för teknologilogotyper === */}
                <motion.div className={styles.techLogoGrid} {...staggerContainerProps(0.1)}>
                    {techStack.map((tech) => (
                        <motion.div key={tech.name} className={styles.techLogoItem} variants={itemFadeInProps}>
                            <img src={tech.logo} alt={`${tech.name} logo`} className={styles.techLogo}/>
                            <span className={styles.techLogoLabel}>{tech.name}</span>
                        </motion.div>
                    ))}
                </motion.div>
                {/* ========================================= */}
                <motion.p className={styles.sectionText} {...fadeInYProps(0.2)} style={{marginTop: '2.5rem'}}>
                    Du får chansen att arbeta med spännande teknik och bidra direkt till en produkt som gör skillnad. Vår metodik är agil, användarcentrerad och fokuserad på kontinuerlig förbättring.
                </motion.p>
            </div>
        </motion.section>
    );
}


function RolesSection() { // Behåll som tidigare, men kolla **
    const roles = [
        { icon: '🧭', title: 'Strategisk Riktning (Projektledning)', text: 'Led projektinitiativ, säkerställ leveranser enligt roadmap och bidra till att forma vår övergripande strategi.' },
        { icon: '💻', title: 'Skapa Upplevelsen (Utveckling)', text: 'Bygg robust backend-logik (Python/Firebase) eller intuitiva frontend-gränssnitt (React) och implementera AI-funktioner.' },
        { icon: '📊', title: 'Driv Insikt (Analys)', text: 'Dyk ner i användardata och marknadstrender för att identifiera insikter som driver produktutveckling och tillväxtstrategier.' },
        { icon: '🤝', title: 'Bygg Broar (Partnerskap)', text: 'Utveckla och hantera strategiska samarbeten med organisationer, influencers eller andra aktörer inom välmående.' },
        { icon: '💡', title: 'Din Expertis (Övrigt)', text: 'Har du kompetens inom t.ex. innehållsskapande, community management, UX/UI-design eller marknadsföring? Vi är öppna för talang!' },
    ];
    return (
        <section className={styles.rolesSection}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}> <Heading as="h2" className={styles.sectionTitle}>Hur Vill Du Bidra?</Heading> </motion.div>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.1)}> Vi söker just nu passionerade individer och partners som vill vara med och forma Inner Journey från grunden. Oavsett om du är expert inom ett specifikt område eller har en bredare profil, finns det möjligheter att göra avtryck: </motion.p>
                <motion.div className={styles.rolesGrid} {...staggerContainerProps(0.1)}> {roles.map((role, index) => ( <motion.div key={index} className={styles.roleCard} variants={itemFadeInProps} whileHover={{ scale: 1.03, y: -4, transition: { duration: 0.2 } }}> <div className={styles.roleIcon}>{role.icon}</div> <Heading as="h3" className={styles.roleTitle}>{role.title}</Heading> <p className={styles.roleText}>{role.text}</p> </motion.div> ))} </motion.div>
            </div>
        </section>
    );
}


function CultureSection() { // Behåll som tidigare, men kolla **
    return (
        <motion.section className={styles.cultureSection}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}> <Heading as="h2" className={styles.sectionTitle}>Vår Arbetskultur: Flexibilitet & Förtroende</Heading> </motion.div>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.1)}> Vi är ett <strong>distribuerat team</strong> som tror på frihet under ansvar. Hos oss får du: </motion.p>
                <motion.ul className={styles.cultureList} {...staggerContainerProps(0.1)}>
                    <motion.li variants={itemFadeInProps}>🤸‍♀️ <strong>Flexibilitet:</strong> Arbeta var och när du är som mest produktiv (med rekommenderad kärntid 10-14 CET).</motion.li>
                    <motion.li variants={itemFadeInProps}>💬 <strong>Öppen Kommunikation:</strong> Vi använder Slack för snabb dialog och värdesätter transparens.</motion.li>
                    <motion.li variants={itemFadeInProps}>🌱 <strong>Utveckling:</strong> Möjlighet till lärande via interna resurser och extern utbildningsbudget (5k SEK/år).</motion.li>
                    <motion.li variants={itemFadeInProps}>💖 <strong>Välmående:</strong> Fokus på balans, ingen förväntan på ständig tillgänglighet och extra återhämtningsdagar.</motion.li>
                    <motion.li variants={itemFadeInProps}>🤝 <strong>Samarbete:</strong> En platt organisation där allas input värderas och vi stödjer varandra.</motion.li>
                </motion.ul>
                <motion.div {...fadeInYProps(0.3)} style={{textAlign: 'center', marginTop: '2rem'}}>
                    <Link className={styles.linkStyled} to="/docs/hr/policy-fr-distansarbete-2025">Läs vår fullständiga policy för distansarbete</Link>
                </motion.div>
            </div>
        </motion.section>
    );
}


function InterestForm() { // Behåll som tidigare
    return (
        <motion.section id="interest-form" className={styles.formSection} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
            <div className={clsx('container', styles.sectionContainer, styles.formContainer)}>
                <motion.div {...sectionTitleProps}> <Heading as="h2" className={styles.sectionTitle}>Låter Detta Som Du?</Heading> </motion.div>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.1)}> Vill du bidra till vår vision? Fyll i formuläret så hör vi av oss för att diskutera hur vi kan arbeta tillsammans. </motion.p>
                <form action="https://formspree.io/f/YOUR_PARTNER_FORMSPREE_ID" method="POST" className={styles.form}>
                    {/* Form Groups */}
                    <motion.div className={styles.formGroup} {...fadeInYProps(0.15)}> <label htmlFor="name">Namn</label> <input type="text" id="name" name="name" required /> </motion.div>
                    <motion.div className={styles.formGroup} {...fadeInYProps(0.20)}> <label htmlFor="email">E-post</label> <input type="email" id="email" name="email" required /> </motion.div>
                    <motion.div className={styles.formGroup} {...fadeInYProps(0.25)}> <label htmlFor="role">Primärt Intresseområde</label> <select id="role" name="role" required> <option value="">Välj område...</option> <option value="Projektledning">Projektledning</option> <option value="Utveckling">Utveckling (Frontend/Backend/AI)</option> <option value="Analys">Dataanalys/Marknad</option> <option value="Partnerskap">Strategiskt Partnerskap</option> <option value="CoachingInnehall">Coaching/Innehåll</option> <option value="Annat">Annat</option> </select> </motion.div>
                    <motion.div className={styles.formGroup} {...fadeInYProps(0.30)}> <label htmlFor="message">Dina tankar & Idéer (Valfritt)</label> <textarea id="message" name="message" rows={4} placeholder="Hur ser du att du eller din organisation kan bidra till Inner Journey?"></textarea> </motion.div>
                    <motion.button type="submit" className={clsx('button', styles.submitButton)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} {...fadeInYProps(0.35)}> Skicka Intresseanmälan </motion.button>
                </form>
                <motion.p className={styles.sectionText} {...fadeInYProps(0.4)} style={{marginTop: '2.5rem', fontSize: '1rem'}}> Vill du hellre ha en informell chatt? <Link to="https://discord.gg/2j5a2Gze8W">Hitta oss på Discord!</Link> </motion.p>
            </div>
        </motion.section>
    );
}

// --- Huvudexport ---
export default function PartnersPage(): ReactNode { // Behåll som tidigare
    return ( <Layout title="..." description="..."> <PartnersHeader /> <main> <WhyJoinSection /> <WhatWeBuildSection /> <RolesSection /> <CultureSection /> <InterestForm /> </main> </Layout> );
}