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