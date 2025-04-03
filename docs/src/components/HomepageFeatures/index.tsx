import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type FeatureItem = {
    title: string;
    emoji: string;
    description: ReactNode;
    link: string;
};

const FeatureList: FeatureItem[] = [
    // Dina feature-items här...
];

function Feature({ title, emoji, description, link }: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
            <Link to={link} className={styles.featureCard}>
                <div className="text--center">
                    <span className={styles.featureEmoji}>{emoji}</span>
                </div>
                <div className="text--center padding-horiz--md">
                    <Heading as="h3">{title}</Heading>
                    <p>{description}</p>
                </div>
            </Link>
        </div>
    );
}

export default function HomepageFeatures(): ReactNode {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}