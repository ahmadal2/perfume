import React from 'react';
import { motion } from 'framer-motion';
import { FlowButton } from '../ui/flow-button';

const HeroStatement: React.FC = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden py-20 px-6">
            <div className="max-w-[1400px] mx-auto text-center space-y-12 z-10">

                {/* Small Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <span className="font-mono text-blue-500 text-[10px] md:text-sm uppercase tracking-[0.5em] md:tracking-[1em]">
                        Welcome to Maison Lumière
                    </span>
                </motion.div>

                {/* Main Headline */}
                <div className="space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-[0.9] italic font-serif"
                    >
                        Signature scents that
                    </motion.h2>
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-8xl lg:text-9xl font-black text-blue-500/90 tracking-tighter leading-[0.9] italic font-serif"
                    >
                        tell your story
                    </motion.h2>
                </div>

                {/* Button */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="pt-10 flex justify-center"
                >
                    <FlowButton
                        text="Discover Our Collections"
                        variant="gold"
                        className="h-16 px-12 text-xs"
                    />
                </motion.div>
            </div>

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-blue-500/20 blur-[150px] rounded-full" />
            </div>
        </section>
    );
};

export default HeroStatement;
