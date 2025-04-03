// docs/src/components/AnimatedLogo/AnimatedLogo.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AnimatedLogo.module.css'; // Importera den egna CSS-modulen
import SymbolDark from '@site/static/img/SymbolDark.svg'; // Dubbelkolla/justera sökvägen!

// Komponenten tar inte längre emot någon 'variant'-prop
const AnimatedLogo: React.FC = () => {
    // --- Partikelhantering ---
    const [particles, setParticles] = useState<{ id: number; angle: number; startRadius: number; duration: number }[]>([]);

    useEffect(() => {
        // Funktion för att skapa en partikel med Variant 1's egenskaper
        const createParticle = () => {
            const duration = 3.5 + Math.random(); // Längre livslängd med lite variation
            setParticles((prev) => [
                ...prev,
                {
                    id: Date.now() + Math.random(), // Unik nyckel
                    angle: Math.random() * 360,      // Slumpmässig startvinkel
                    startRadius: 85 + Math.random() * 30, // Startar lite längre ut, varierat
                    duration: duration,               // Individuell livslängd
                },
            ]);
        };

        // Skapa partiklar med intervall
        const intervalId = setInterval(createParticle, 700); // Långsammare intervall

        // Städa upp gamla partiklar för prestanda
        const cleanupInterval = setInterval(() => {
            const now = Date.now();
            // Ta bort partiklar äldre än 6 sekunder
            setParticles(prev => prev.filter(p => now - p.id < 6000));
        }, 6000);

        // Städa upp intervall när komponenten unmountas
        return () => {
            clearInterval(intervalId);
            clearInterval(cleanupInterval);
        };
    }, []); // Körs bara en gång vid mount

    // --- Animationsdefinitioner (Endast Variant 1) ---
    // useMemo används för att undvika att objektet återskapas vid varje render
    const anims = useMemo(() => ({
        logo: { // Långsam, subtil puls för huvudloggan
            scale: [1, 1.03, 1],
            transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' }
        },
        ring: { // Långsam, kontinuerlig rotation för ringen
            rotate: 360,
            transition: { duration: 25, repeat: Infinity, ease: 'linear' }
        },
        glow: { // Subtil puls för glöden i mitten
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
            transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' }
        },
        particle: { // Egenskaper för hur partiklar animeras mot mitten
            targetScale: 0.3, // Skalas ner till 30%
            ease: 'easeIn'    // Accelererar mot slutet
        }
    }), []);

    // --- Partikelanimationsvarianter ---
    const particleVariants = {
        // Startposition och utseende
        initial: (particle: { angle: number, startRadius: number }) => ({
            x: 75 + particle.startRadius * Math.cos((particle.angle * Math.PI) / 180), // Position på cirkelns kant
            y: 75 + particle.startRadius * Math.sin((particle.angle * Math.PI) / 180),
            opacity: 0.7, // Lite genomskinlig start
            scale: 1,
        }),
        // Animation mot centrum
        animate: (particle: { duration: number }) => ({
            x: 75, // Mål X-position (centrum)
            y: 75, // Mål Y-position (centrum)
            opacity: 0, // Tona ut helt
            scale: anims.particle.targetScale, // Skala ner enligt definition
            transition: {
                duration: particle.duration, // Använd partikelns unika livslängd
                ease: anims.particle.ease as any, // Använd definierad easing
            },
        }),
        // Hur partikeln försvinner när den tas bort från state
        exit: { opacity: 0, transition: { duration: 0.1 } }, // Snabb fade out
    };

    return (
        // Huvudwrapper för logotypen och dess effekter
        <div className={styles.logoWrapper}>
            {/* Motion wrapper för huvudlogotypen */}
            <motion.div
                className={styles.logoMotionWrapper} // Innehåller z-index: 1
                animate={anims.logo} // Applicera logotypanimationen
            >
                {/* Försök rendera SVG som komponent, annars fallback till <img> */}
                {typeof SymbolDark === 'function' ? (
                    <SymbolDark className={styles.logo} />
                ) : (
                    <img src="/img/SymbolDark.svg" alt="Inner Journey Logo" className={styles.logo} />
                )}
            </motion.div>

            {/* SVG-behållare för visuella effekter (glöd, ring, partiklar) */}
            <svg
                className={styles.effectsSvg} // Innehåller z-index: 0
                viewBox="0 0 150 150" // Koordinatsystem för effekterna
            >
                {/* Glöd i mitten */}
                <motion.circle
                    cx="75" // Centrum X
                    cy="75" // Centrum Y
                    r="20"  // Radie på glöden
                    fill="url(#glowGradient)" // Använder gradient definierad nedan
                    style={{ transformOrigin: 'center center' }} // Säkerställ skalning från mitten
                    animate={anims.glow} // Applicera glödanimationen
                />
                {/* Definition av gradienten för glöden */}
                <defs>
                    <radialGradient id="glowGradient">
                        {/* Från rödaktig i mitten till orange/gulaktig i kanten, med varierande opacitet */}
                        <stop offset="0%" stopColor="#ff6f61" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#ff9f43" stopOpacity="0.2" />
                    </radialGradient>
                </defs>

                {/* Roterande ringen */}
                <motion.circle
                    cx="75"
                    cy="75"
                    r="55" // Radie på ringen
                    stroke="#ff9f43" // Färg på ringen
                    strokeWidth="4" // Tjocklek på ringen
                    fill="none" // Ingen fyllning
                    opacity="0.4" // Lite genomskinlig
                    style={{ transformOrigin: 'center center' }} // Säkerställ rotation runt mitten
                    animate={anims.ring} // Applicera ringanimationen
                />

                {/* Behållare för partiklar, hanterar in/ut-animationer */}
                <AnimatePresence>
                    {/* Mappa igenom nuvarande partiklar i state */}
                    {particles.map((particle) => (
                        // Skapa en animerbar cirkel för varje partikel
                        <motion.circle
                            key={particle.id} // Unik nyckel för React och Framer Motion
                            cx="0" // Start X (relativt till initial transform)
                            cy="0" // Start Y (relativt till initial transform)
                            r={Math.random() * 2 + 1} // Liten, slumpmässig radie
                            fill="#ffeedd" // Ljus, nästan vit färg
                            custom={particle} // Skicka partikeldata till variants (initial, animate)
                            variants={particleVariants} // Använd de definierade animationsvarianterna
                            initial="initial" // Starta i 'initial'-läget
                            animate="animate" // Animera till 'animate'-läget
                            exit="exit" // Använd 'exit'-animationen när partikeln tas bort
                        />
                    ))}
                </AnimatePresence>
            </svg>
            {/* Ingen variantLabel här */}
        </div>
    );
};

export default AnimatedLogo;