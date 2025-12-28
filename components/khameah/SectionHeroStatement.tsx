import React from 'react';
import { motion } from 'framer-motion';

const SectionHeroStatement: React.FC = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        },
    };

    return (
        <section className="relative h-screen w-full flex items-center justify-center bg-[#0a0a0a] px-6 overflow-hidden">
            {/* Subtle Background */}
            <div className="absolute inset-0 z-0 opacity-40">
                <img
                    src="/imag/lattafa khamrah.jpg"
                    className="w-full h-full object-cover filter blur-[2px]"
                    alt="Background Brand Imagery"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]" />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="relative z-10 max-w-5xl text-center space-y-8"
            >
                <motion.span
                    variants={itemVariants}
                    className="block font-mono text-blue-500 uppercase tracking-[1em] text-xs"
                >
                    WELCOME TO KHAMEAH
                </motion.span>

                <motion.h2
                    variants={itemVariants}
                    className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none"
                >
                    Signature scents that <br />
                    <span className="text-blue-600 italic">tell your story</span>
                </motion.h2>

                {/* Special Cinematic Narrative Block */}
                <motion.div
                    variants={itemVariants}
                    className="relative py-10 flex flex-col items-center"
                >
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mb-8" />

                    <div className="relative">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="absolute top-0 left-0 h-full bg-blue-600/10 -skew-x-12"
                        />
                        <p className="relative z-10 font-mono text-sm md:text-base text-blue-400 italic font-medium tracking-widest max-w-3xl px-6 leading-relaxed">
                            "Distilled for the modern sovereign. <br className="hidden md:block" />
                            An olfactory bridge between ancient secrets and futuristic silhouettes."
                        </p>
                    </div>

                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mt-8" />

                    {/* Parallax Signature Background Element */}
                    <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none italic serif">
                        KHAMEAH ARCHIVE
                    </div>
                </motion.div>

                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed"
                >
                    Meticulously crafted with rare ingredients from the heart of the Orient,
                    designed to leave an indelible mark on those who encounter them.
                </motion.p>

                <motion.div variants={itemVariants} className="pt-8">
                    <button className="px-12 py-5 bg-blue-600 text-white font-bold uppercase tracking-[0.3em] text-xs hover:bg-blue-500 transition-colors rounded-full shadow-[0_0_30px_rgba(37,99,235,0.2)]">
                        Discover Our Collections
                    </button>
                </motion.div>
            </motion.div>

            {/* Linear Decoration: Left Sidebar Line */}
            <div className="absolute left-12 md:left-24 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
        </section>
    );
};

export default SectionHeroStatement;
