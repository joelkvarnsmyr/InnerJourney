// docs/src/components/HomepageHeader/index.tsx
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

// === Importera den egna CSS-modulen ===
import headerStyles from './HomepageHeader.module.css';

// Importera AnimatedLogo
import AnimatedLogo from '../AnimatedLogo/AnimatedLogo';

// Definiera komponenten här
function HomepageHeader(): JSX.Element {

    return (
        // === Använd headerStyles ===
        <header className={clsx('hero', headerStyles.heroBanner)}>
            {/* === Använd headerStyles === */}
            <div className={clsx('container', headerStyles.heroContainer)}>

                <AnimatedLogo />

                {/* === Lägg till headerStyles.title === */}
                <Heading as="h1" className={clsx('hero__title', headerStyles.title)}>
                    Välkommen till vårt Backbone
                </Heading>

                {/* === Lägg till headerStyles.subtitle === */}
                <p className={clsx('hero__subtitle', headerStyles.subtitle)}>
                    Utforska guider, teknisk dokumentation och mer för att få ut det mesta av Inner Journey.
                </p>

                {/* === Använd headerStyles === */}
                <div className={headerStyles.buttons}>
                    <Link
                        // === Använd headerStyles ===
                        className={clsx('button button--lg', headerStyles.heroButton)}
                        to="/docs/intro"
                    >
                        Kom igång – 5 min 🚀
                    </Link>
                    <Link
                        // === Använd headerStyles ===
                        className={clsx('button button--lg', headerStyles.secondaryButton)}
                        to="https://innerjourney.kvarnsmyr.se"
                    >
                        Gå till appen
                    </Link>
                </div>
            </div>
        </header>
    );
}

// Exportera komponenten
export default HomepageHeader;