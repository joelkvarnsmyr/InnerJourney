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