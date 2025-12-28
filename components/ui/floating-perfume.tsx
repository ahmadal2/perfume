import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingPerfume: React.FC = () => {
    return (
        <div className="relative w-full h-[500px] md:h-[700px] flex items-center justify-center overflow-hidden">
            {/* 1. CINEMATIC BACKGROUND */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 via-transparent to-transparent opacity-60 z-0" />

            {/* 2. ATMOSPHERIC MIST (SMOKE) */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 z-20 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={`mist-${i}`}
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{
                            opacity: [0, 0.4, 0],
                            y: -400,
                            scale: [0.8, 1.5, 2],
                            x: [0, i % 2 === 0 ? 100 : -100, 0]
                        }}
                        transition={{
                            duration: 8 + i,
                            repeat: Infinity,
                            delay: i * 1.5,
                            ease: "linear"
                        }}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full"
                    />
                ))}
            </div>

            {/* 3. THE BOTTLE REVEAL */}
            <motion.div
                initial={{ y: 200, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-[240px] md:w-[320px] lg:w-[380px]"
            >
                {/* LIGHT SWEEP GLINT */}
                <motion.div
                    animate={{
                        left: ["-100%", "200%"]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut"
                    }}
                    className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent z-10 pointer-events-none"
                />

                {/* BOTTLE IMAGE (ROYALE) */}
                <div className="relative group">
                    <motion.img
                        src="https://m.media-amazon.com/images/S/aplus-media-library-service-media/19293a5b-6876-420d-b156-a2446b7c5237.__CR0,0,3031,1875_PT0_SX970_V1___.png"
                        alt="Khamrah Sapphire Royale"
                        className="w-full h-auto drop-shadow-[0_40px_100px_rgba(59,130,246,0.5)] filter brightness-110 contrast-125"
                        animate={{
                            y: [-10, 10, -10],
                            rotate: [-1, 1, -1]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* RIM LIGHT HIGHLIGHT */}
                    <div className="absolute inset-0 rounded-[3rem] border border-blue-400/20 mix-blend-overlay pointer-events-none" />
                </div>

                {/* BOTTLE SHADOW/REFLECTION */}
                <motion.div
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-12 bg-blue-500/10 blur-2xl rounded-full"
                />
            </motion.div>

            {/* 4. LENS FLARES & SPARKLES */}
            <div className="absolute inset-0 pointer-events-none z-30">
                <motion.div
                    animate={{
                        opacity: [0, 0.8, 0],
                        scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    className="absolute top-1/3 left-1/4 w-32 h-32 bg-blue-400 rounded-full blur-[80px]"
                />

                {/* RISING SCENT MOLECULES */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={`sparkle-${i}`}
                        initial={{ opacity: 0, y: 400, x: (Math.random() - 0.5) * 400 }}
                        animate={{
                            opacity: [0, 1, 0],
                            y: -600,
                            scale: [0, 1.5, 0]
                        }}
                        transition={{
                            duration: 4 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "easeOut"
                        }}
                        className="absolute left-1/2 bottom-0 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]"
                    />
                ))}
            </div>

            {/* 5. CINEMATIC INTRO TAG */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 2 }}
                className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4"
            >
                <div className="h-px w-64 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
                <p className="text-[9px] uppercase tracking-[2.5em] font-black text-blue-500/60 italic ml-4">
                    Royale Reveal
                </p>
            </motion.div>
        </div>
    );
};
