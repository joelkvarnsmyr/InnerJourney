// src/pages/about/schools/index.tsx
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { motion } from 'framer-motion';
import { translate } from '@docusaurus/Translate';
import styles from '../for-school/for-school.module.css'; // Återanvänder befintlig CSS från coaches-sidan

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

function SchoolsHeader() {
    return (
        <header className={clsx('hero', styles.heroBanner)}>
            <div className="container">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}>
                    <Heading as="h1" className={styles.heroTitle}>
                        {translate({ id: 'schools.header.title', message: 'Empower Your Students with Inner Journey' })}
                    </Heading>
                </motion.div>
                <motion.p className={styles.heroSubtitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}>
                    {translate({ id: 'schools.header.subtitle', message: 'Build resilience, prevent bullying, and nurture self-awareness in a safe, engaging way – all with AI-tailored tools designed for young minds.' })}
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}>
                    <Link className={clsx('button button--lg', styles.ctaButton)} to="#interest-form">
                        {translate({ id: 'schools.header.cta', message: 'Bring Inner Journey to Your School' })}
                    </Link>
                </motion.div>
            </div>
        </header>
    );
}

function WhyInnerJourneyForSchools() {
    return (
        <motion.section className={styles.whySection} {...fadeInProps}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'schools.why.title', message: 'A Healthier School Starts Within' })}
                    </Heading>
                </motion.div>
                <p className={styles.sectionText}>
                    {translate({ id: 'schools.why.text', message: 'Today’s students face stress, peer pressure, and emotional challenges. Inner Journey offers a safe space to explore their inner world, build empathy, and grow stronger – without judgment or pressure. Equip your school with tools that make a real difference.' })}
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
                        {translate({ id: 'schools.howitworks.title', message: 'Simple Steps to Stronger Students' })}
                    </Heading>
                </motion.div>
                <motion.ol className={styles.howItWorksList} variants={listContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                    <motion.li className={styles.howItWorksStep} variants={listItemVariants}>
                        <span className={styles.stepIcon}>🌱</span>
                        <div>
                            <Heading as="h3" className={styles.stepTitle}>
                                {translate({ id: 'schools.howitworks.startExploring.title', message: 'Start Exploring' })}
                            </Heading>
                            <p className={styles.stepText}>
                                {translate({ id: 'schools.howitworks.startExploring.text', message: 'Students begin with fun, AI-guided activities like meditations or eye-contact exercises to spark self-discovery.' })}
                            </p>
                        </div>
                    </motion.li>
                    <motion.li className={styles.howItWorksStep} variants={listItemVariants}>
                        <span className={styles.stepIcon}>✍️</span>
                        <div>
                            <Heading as="h3" className={styles.stepTitle}>
                                {translate({ id: 'schools.howitworks.reflect.title', message: 'Reflect & Grow' })}
                            </Heading>
                            <p className={styles.stepText}>
                                {translate({ id: 'schools.howitworks.reflect.text', message: 'Using the Dynamic Journal, they reflect on their feelings and experiences at their own pace.' })}
                            </p>
                        </div>
                    </motion.li>
                    <motion.li className={styles.howItWorksStep} variants={listItemVariants}>
                        <span className={styles.stepIcon}>🤝</span>
                        <div>
                            <Heading as="h3" className={styles.stepTitle}>
                                {translate({ id: 'schools.howitworks.connect.title', message: 'Connect & Share' })}
                            </Heading>
                            <p className={styles.stepText}>
                                {translate({ id: 'schools.howitworks.connect.text', message: 'Safe community features let students share insights and build empathy with peers.' })}
                            </p>
                        </div>
                    </motion.li>
                    <motion.li className={styles.howItWorksStep} variants={listItemVariants}>
                        <span className={styles.stepIcon}>🧑‍🏫</span>
                        <div>
                            <Heading as="h3" className={styles.stepTitle}>
                                {translate({ id: 'schools.howitworks.support.title', message: 'Support from Coaches' })}
                            </Heading>
                            <p className={styles.stepText}>
                                {translate({ id: 'schools.howitworks.support.text', message: 'Teachers or trained coaches can guide students with tailored feedback and activities.' })}
                            </p>
                        </div>
                    </motion.li>
                </motion.ol>
            </div>
        </motion.section>
    );
}

function BenefitsForSchools() {
    return (
        <section className={styles.benefitsSection}>
            <div className={clsx('container', styles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'schools.benefits.title', message: 'Benefits for Your School & Students' })}
                    </Heading>
                </motion.div>
                <motion.div className={styles.benefitsList} variants={listContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                    <motion.div className={styles.benefitCard} variants={cardItemVariants} whileHover={{ scale: 1.04, y: -5, transition: { duration: 0.2 } }} whileTap={{ scale: 0.98 }}>
                        <span className={styles.benefitIcon}>🌟</span>
                        <Heading as="h3">{translate({ id: 'schools.benefits.selfDiscovery.title', message: 'Self-Discovery' })}</Heading>
                        <p>{translate({ id: 'schools.benefits.selfDiscovery.text', message: 'AI-tailored tools help students explore their emotions and strengths safely.' })}</p>
                    </motion.div>
                    <motion.div className={styles.benefitCard} variants={cardItemVariants} whileHover={{ scale: 1.04, y: -5, transition: { duration: 0.2 } }} whileTap={{ scale: 0.98 }}>
                        <span className={styles.benefitIcon}>🤝</span>
                        <Heading as="h3">{translate({ id: 'schools.benefits.empathy.title', message: 'Build Empathy' })}</Heading>
                        <p>{translate({ id: 'schools.benefits.empathy.text', message: 'Activities like eye-contact exercises foster understanding and reduce bullying.' })}</p>
                    </motion.div>
                    <motion.div className={styles.benefitCard} variants={cardItemVariants} whileHover={{ scale: 1.04, y: -5, transition: { duration: 0.2 } }} whileTap={{ scale: 0.98 }}>
                        <span className={styles.benefitIcon}>🧘</span>
                        <Heading as="h3">{translate({ id: 'schools.benefits.resilience.title', message: 'Boost Resilience' })}</Heading>
                        <p>{translate({ id: 'schools.benefits.resilience.text', message: 'Simple meditations and reflections help students manage stress and grow stronger.' })}</p>
                    </motion.div>
                    <motion.div className={styles.benefitCard} variants={cardItemVariants} whileHover={{ scale: 1.04, y: -5, transition: { duration: 0.2 } }} whileTap={{ scale: 0.98 }}>
                        <span className={styles.benefitIcon}>🏫</span>
                        <Heading as="h3">{translate({ id: 'schools.benefits.schoolSupport.title', message: 'Support for Schools' })}</Heading>
                        <p>{translate({ id: 'schools.benefits.schoolSupport.text', message: 'Free to start, with premium options – a cost-effective way to enhance student well-being.' })}</p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

function PhilosophySection() {
    return (
        <motion.section className={styles.philosophySection} {...fadeInProps}>
            <div className={clsx('container', styles.sectionContainer, styles.philosophyContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        {translate({ id: 'schools.philosophy.title', message: 'Our Philosophy: Growth Without Judgment' })}
                    </Heading>
                </motion.div>
                <p className={styles.sectionText}>
                    {translate({ id: 'schools.philosophy.text1', message: '"A platform that, through research-based, holistic tools, guides you to self-discovery and personal development – <strong>without telling you what to do.</strong>"' })}
                </p>
                <p className={styles.sectionText}>
                    {translate({ id: 'schools.philosophy.text2', message: 'We empower students to find their own path with gentle, AI-supported guidance. It’s about building a foundation for life, not dictating their choices.' })}
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
                        {translate({ id: 'schools.future.title', message: 'Shape the Future of Learning' })} <motion.span style={{ display: 'inline-block' }} animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}>🚀</motion.span>
                    </Heading>
                </motion.div>
                <p className={styles.sectionText}>
                    {translate({ id: 'schools.future.text', message: 'Join us as an early adopter and help us tailor Inner Journey for schools. Here’s what’s coming to support your students even more:' })}
                </p>
                <motion.ul className={styles.futureList} variants={listContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                    <motion.li variants={listItemVariants}>
                        <strong>{translate({ id: 'schools.future.groupActivities.title', message: 'Group Activities' })}</strong> {translate({ id: 'schools.future.groupActivities.text', message: 'Classroom-friendly sessions to build teamwork and empathy.' })}
                    </motion.li>
                    <motion.li variants={listItemVariants}>
                        <strong>{translate({ id: 'schools.future.teacherTools.title', message: 'Teacher Tools' })}</strong> {translate({ id: 'schools.future.teacherTools.text', message: 'Dashboards for teachers to track progress and assign activities.' })}
                    </motion.li>
                    <motion.li variants={listItemVariants}>
                        <strong>{translate({ id: 'schools.future.aiInsights.title', message: 'AI Insights' })}</strong> {translate({ id: 'schools.future.aiInsights.text', message: 'Deeper analysis to spot emotional trends and support students proactively.' })}
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
                        {translate({ id: 'schools.form.title', message: 'Ready to Support Your Students?' })}
                    </Heading>
                </motion.div>
                <p className={styles.sectionText}>
                    {translate({ id: 'schools.form.text', message: 'Sign up today to bring Inner Journey to your school! Get early access, special offers, and help shape a tool that empowers your students.' })}
                </p>
                <form action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST" className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="schoolName">{translate({ id: 'schools.form.schoolName', message: 'School Name' })}</label>
                        <input type="text" id="schoolName" name="schoolName" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="contactName">{translate({ id: 'schools.form.contactName', message: 'Contact Name' })}</label>
                        <input type="text" id="contactName" name="contactName" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">{translate({ id: 'schools.form.email', message: 'Email' })}</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="message">{translate({ id: 'schools.form.message', message: 'Why Inner Journey for Your School? (Optional)' })}</label>
                        <textarea id="message" name="message" rows={4} placeholder={translate({ id: 'schools.form.message.placeholder', message: 'Tell us about your school’s needs or what you hope to achieve...' })}></textarea>
                    </div>
                    <motion.button type="submit" className={clsx('button', styles.submitButton)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        {translate({ id: 'schools.form.submit', message: 'Yes, I’m Interested!' })}
                    </motion.button>
                </form>
            </div>
        </motion.section>
    );
}

export default function Index(): ReactNode {
    return (
        <Layout
            title={translate({ id: 'schools.layout.title', message: 'Schools | Inner Journey for Students' })}
            description={translate({ id: 'schools.layout.description', message: 'Bring Inner Journey to your school! Help students build resilience, empathy, and self-awareness with AI-tailored tools. Sign up now!' })}
        >
            <SchoolsHeader />
            <main>
                <WhyInnerJourneyForSchools />
                <HowItWorksSection />
                <BenefitsForSchools />
                <PhilosophySection />
                <FutureVisionSection />
                <InterestForm />
            </main>
        </Layout>
    );
}