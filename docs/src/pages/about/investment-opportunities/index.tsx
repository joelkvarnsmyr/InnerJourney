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