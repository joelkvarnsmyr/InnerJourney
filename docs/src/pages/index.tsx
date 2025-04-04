// src/pages/index.tsx
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { motion } from 'framer-motion';
import { translate } from '@docusaurus/Translate';
import pageStyles from './index.module.css';
import HomepageHeader from '../components/HomepageHeader';
import BlogHighlights from '../components/BlogHighlights/BlogHighlights';

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
        hidden: { opacity: 0, y: 20, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    },
};

// --- Sektionskomponenter ---

// 1. Kärnan / Filosofin
function CorePhilosophySection() {
    return (
        <motion.section className={pageStyles.coreSection} {...fadeInYProps()}>
            <div className={clsx("container", pageStyles.sectionContainer, pageStyles.coreContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={pageStyles.sectionTitle}>
                        {translate({ id: 'home.core.title', message: '🧭 Navigate Your Inner World – With Heart First' })}
                    </Heading>
                </motion.div>
                <motion.p className={pageStyles.sectionText} {...fadeInYProps(0.1)}>
                    {translate({ id: 'home.core.text1', message: 'Inner Journey is your partner for <strong>authentic self-discovery and meaningful development</strong>. We believe the answers lie within you. Our platform offers research-based, holistic tools and a supportive community to help you uncover them – without directives.' })}
                </motion.p>
                <motion.p className={pageStyles.sectionText} {...fadeInYProps(0.2)}>
                    {translate({ id: 'home.core.text2', message: 'We provide the tools, you steer the journey. Explore, reflect, and grow – <strong>without directives</strong>.' })}
                </motion.p>
                <motion.div {...fadeInYProps(0.3)} style={{textAlign: 'center', marginTop: '1.5rem'}}>
                    <Link className={pageStyles.linkStyled} to="/docs/project/visionar-grund">
                        {translate({ id: 'home.core.link', message: 'Our Philosophy & Vision' })}
                    </Link>
                </motion.div>
            </div>
        </motion.section>
    );
}

// 2. Konceptet / Hur det fungerar
function ConceptSection() {
    return (
        <motion.section className={pageStyles.conceptSection}>
            <div className={clsx("container", pageStyles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={pageStyles.sectionTitle}>
                        {translate({ id: 'home.concept.title', message: 'An Intelligent & Supportive Companion' })}
                    </Heading>
                </motion.div>
                <motion.p className={pageStyles.sectionText} {...fadeInYProps(0.1)}>
                    {translate({ id: 'home.concept.text', message: 'Imagine a platform that gets to know you and adapts to your unique journey. Inner Journey uses smart technology to offer:' })}
                </motion.p>
                <motion.div className={pageStyles.conceptGrid} {...staggerContainerProps(0.15)}>
                    <motion.div className={pageStyles.conceptItem} variants={itemFadeInProps}>
                        <span className={pageStyles.conceptIcon}>✨</span>
                        <div>
                            <Heading as="h3" className={pageStyles.conceptItemTitle}>
                                {translate({ id: 'home.concept.personalizedGuidance.title', message: 'Personalized Guidance' })}
                            </Heading>
                            <p className={pageStyles.conceptItemText}>
                                {translate({ id: 'home.concept.personalizedGuidance.text', message: 'AI-driven suggestions for exercises and reflections that match your goals.' })}
                            </p>
                        </div>
                    </motion.div>
                    <motion.div className={pageStyles.conceptItem} variants={itemFadeInProps}>
                        <span className={pageStyles.conceptIcon}>✍️</span>
                        <div>
                            <Heading as="h3" className={pageStyles.conceptItemTitle}>
                                {translate({ id: 'home.concept.deepenedInsight.title', message: 'Deepened Insight' })}
                            </Heading>
                            <p className={pageStyles.conceptItemText}>
                                {translate({ id: 'home.concept.deepenedInsight.text', message: 'Dynamic journaling that helps you see patterns and understand yourself better.' })}
                            </p>
                        </div>
                    </motion.div>
                    <motion.div className={pageStyles.conceptItem} variants={itemFadeInProps}>
                        <span className={pageStyles.conceptIcon}>🤝</span>
                        <div>
                            <Heading as="h3" className={pageStyles.conceptItemTitle}>
                                {translate({ id: 'home.concept.communitySupport.title', message: 'Community & Support' })}
                            </Heading>
                            <p className={pageStyles.conceptItemText}>
                                {translate({ id: 'home.concept.communitySupport.text', message: 'Grow together with others and receive support from experienced coaches.' })}
                            </p>
                        </div>
                    </motion.div>
                    <motion.div className={pageStyles.conceptItem} variants={itemFadeInProps}>
                        <span className={pageStyles.conceptIcon}>🛠️</span>
                        <div>
                            <Heading as="h3" className={pageStyles.conceptItemTitle}>
                                {translate({ id: 'home.concept.holisticTools.title', message: 'Holistic Tools' })}
                            </Heading>
                            <p className={pageStyles.conceptItemText}>
                                {translate({ id: 'home.concept.holisticTools.text', message: 'A comprehensive toolkit with meditation, goal-setting, and more for your well-being.' })}
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}

// 3. Sektion för Olika Målgrupper/Vägar
function PathwaysSection() {
    return (
        <motion.section className={pageStyles.pathwaysSection}>
            <div className={clsx("container", pageStyles.sectionContainer)}>
                <motion.div {...sectionTitleProps}>
                    <Heading as="h2" className={pageStyles.sectionTitle}>
                        {translate({ id: 'home.pathways.title', message: 'A Journey for Everyone – Find Your Path' })}
                    </Heading>
                </motion.div>
                <motion.p className={pageStyles.sectionText} {...fadeInYProps(0.1)} style={{marginBottom: "3rem"}}>
                    {translate({ id: 'home.pathways.text', message: 'Inner Journey is an ecosystem for growth. Whether you want to develop yourself, guide others, invest in change, or contribute your talent, there’s a place for you.' })}
                </motion.p>
                <motion.div className={pageStyles.pathwaysGrid} {...staggerContainerProps(0.1)}>
                    <motion.div className={pageStyles.pathwayCard} variants={itemFadeInProps} whileHover={{ y: -5, transition: {duration: 0.2} }}>
                        <div className={pageStyles.pathwayIcon}>👤</div>
                        <Heading as="h3" className={pageStyles.pathwayTitle}>
                            {translate({ id: 'home.pathways.explorePotential.title', message: 'Explore Your Potential' })}
                        </Heading>
                        <p className={pageStyles.pathwayText}>
                            {translate({ id: 'home.pathways.explorePotential.text', message: 'Start your personal journey with our tools and insights...' })}
                        </p>
                        <Link className={clsx('button', pageStyles.pathwayButton)} to="/docs/intro">
                            {translate({ id: 'home.pathways.explorePotential.buttonText', message: 'Get Started (Free)' })}
                        </Link>
                    </motion.div>
                    <motion.div className={pageStyles.pathwayCard} variants={itemFadeInProps} whileHover={{ y: -5, transition: {duration: 0.2} }}>
                        <div className={pageStyles.pathwayIcon}>🧑‍🏫</div>
                        <Heading as="h3" className={pageStyles.pathwayTitle}>
                            {translate({ id: 'home.pathways.forCoaches.title', message: 'For Coaches' })}
                        </Heading>
                        <p className={pageStyles.pathwayText}>
                            {translate({ id: 'home.pathways.forCoaches.text', message: 'Simplify your work, reach more clients, and use a platform built for collaboration.' })}
                        </p>
                        <Link className={clsx('button', pageStyles.pathwayButton)} to="/about/coaches">
                            {translate({ id: 'home.pathways.forCoaches.buttonText', message: 'Discover the Benefits' })}
                        </Link>
                    </motion.div>
                    <motion.div className={pageStyles.pathwayCard} variants={itemFadeInProps} whileHover={{ y: -5, transition: {duration: 0.2} }}>
                        <div className={pageStyles.pathwayIcon}>📈</div>
                        <Heading as="h3" className={pageStyles.pathwayTitle}>
                            {translate({ id: 'home.pathways.forInvestors.title', message: 'For Investors' })}
                        </Heading>
                        <p className={pageStyles.pathwayText}>
                            {translate({ id: 'home.pathways.forInvestors.text', message: 'Become a partner in a visionary healthtech platform with strong growth potential.' })}
                        </p>
                        <Link className={clsx('button', pageStyles.pathwayButton)} to="/about/investment-opportunities">
                            {translate({ id: 'home.pathways.forInvestors.buttonText', message: 'See the Opportunity' })}
                        </Link>
                    </motion.div>
                    <motion.div className={pageStyles.pathwayCard} variants={itemFadeInProps} whileHover={{ y: -5, transition: {duration: 0.2} }}>
                        <div className={pageStyles.pathwayIcon}>🤝</div>
                        <Heading as="h3" className={pageStyles.pathwayTitle}>
                            {translate({ id: 'home.pathways.workWithUs.title', message: 'Work with Us' })}
                        </Heading>
                        <p className={pageStyles.pathwayText}>
                            {translate({ id: 'home.pathways.workWithUs.text', message: 'Contribute your expertise or explore strategic partnerships. Build the future of well-being with us.' })}
                        </p>
                        <Link className={clsx('button', pageStyles.pathwayButton)} to="/about/partners-and-team">
                            {translate({ id: 'home.pathways.workWithUs.buttonText', message: 'Join the Journey' })}
                        </Link>
                    </motion.div>
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
                    <Heading as="h2" className={pageStyles.sectionTitle}>
                        {translate({ id: 'home.communitycta.title', message: 'Join Our Community' })}
                    </Heading>
                </motion.div>
                <motion.p className={pageStyles.sectionText} {...fadeInYProps(0.1)}>
                    {translate({ id: 'home.communitycta.text', message: 'Development happens together! Join conversations, ask questions, and share your insights with other users, coaches, and the team behind Inner Journey.' })}
                </motion.p>
                <motion.div {...fadeInYProps(0.2)} style={{textAlign: 'center', marginTop: '2rem'}}>
                    <Link className={clsx('button button--lg', pageStyles.discordButton)} to="https://discord.gg/2j5a2Gze8W" target="_blank" rel="noopener noreferrer">
                        {translate({ id: 'home.communitycta.button', message: 'Join on Discord' })} <span className={pageStyles.externalIcon}>↗</span>
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
            title={translate({ id: 'home.layout.title', message: 'Inner Journey | Your Partner for Personal Development' })}
            description={translate({ id: 'home.layout.description', message: 'Explore Inner Journey – an AI-enhanced platform with community and coaching for genuine self-discovery and transformation. Get started for free!' })}
        >
            <HomepageHeader />
            <main>
                <CorePhilosophySection />
                <ConceptSection />
                <PathwaysSection />
                <BlogHighlights />
                <CommunityCtaSection />
            </main>
        </Layout>
    );
}