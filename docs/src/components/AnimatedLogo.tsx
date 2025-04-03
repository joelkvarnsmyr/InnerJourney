import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../pages/index.module.css';
import SymbolDark from '/img/SymbolDark.svg';

const AnimatedLogo: React.FC = () => {
    const [particles, setParticles] = useState<{ id: number; angle: number }[]>([]);

    useEffect(() => {
        const createParticle = () => {
            setParticles((prev) => [
                ...prev,
                { id: Date.now(), angle: Math.random() * 360 },
            ]);
        };

        const particleInterval = setInterval(createParticle, 500);

        return () => clearInterval(particleInterval);
    }, []);

    const particleVariants = {
        initial: (angle: number) => ({
            x: 75 + 80 * Math.cos((angle * Math.PI) / 180),
            y: 75 + 80 * Math.sin((angle * Math.PI) / 180),
            opacity: 0.8,
            scale: 1,
        }),
        animate: {
            x: 75,
            y: 75,
            opacity: 0,
            scale: 0.5,
            transition: { duration: 2, ease: 'easeIn' },
        },
        exit: { opacity: 0 },
    };

    return (
        <div className={styles.logoContainer}>
            <div className={styles.logoWrapper}>
                {/* Använd SymbolDark direkt och animera den */}
                <motion.div
                    animate={{
                        scale: [1, 1.05, 1], /* Minska skalningsintervallet för en subtilare puls */
                        transition: {
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        },
                    }}
                >
                    <SymbolDark width="112" height="112" className={styles.logo} /> {/* Uppdatera storleken här också */}
                </motion.div>
                {/* Lägg till en SVG för de extra effekterna (sekundär ring, glöd, partiklar) */}
                <svg
                    width="112" /* Matcha den nya storleken */
                    height="112"
                    viewBox="0 0 150 150"
                    style={{ position: 'absolute', top: 0, left: 0 }}
                >
                    {/* Sekundär ring (roterar) */}
                    <motion.circle
                        cx="75"
                        cy="75"
                        r="55"
                        stroke="#ff9f43"
                        strokeWidth="5"
                        fill="none"
                        opacity="0.5"
                        animate={{
                            rotate: 360,
                            transition: {
                                duration: 10,
                                repeat: Infinity,
                                ease: 'linear',
                            },
                        }}
                    />
                    {/* Glöd i mitten */}
                    <motion.circle
                        cx="75"
                        cy="75"
                        r="20"
                        fill="url(#glowGradient)"
                        opacity="0.5"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5],
                            transition: {
                                duration: 3,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            },
                        }}
                    />
                    <defs>
                        <radialGradient id="glowGradient">
                            <stop offset="0%" stopColor="#ff6f61" />
                            <stop offset="100%" stopColor="#ff9f43" />
                        </radialGradient>
                    </defs>
                    {/* Partiklar */}
                    <AnimatePresence>
                        {particles.map((particle) => (
                            <motion.circle
                                key={particle.id}
                                cx="0"
                                cy="0"
                                r={Math.random() * 3 + 2}
                                fill="#ff9f43"
                                custom={particle.angle}
                                variants={particleVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            />
                        ))}
                    </AnimatePresence>
                </svg>
            </div>
        </div>
    );
};

export default AnimatedLogo;