import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
        <section className="relative min-h-screen w-full flex items-center justify-center bg-[#0a0a0a] px-4 md:px-6 overflow-hidden py-24 md:py-0">
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
                className="relative z-10 max-w-5xl text-center space-y-6 md:space-y-8"
            >
                <motion.span
                    variants={itemVariants}
                    className="block font-mono text-blue-500 uppercase tracking-[0.5em] md:tracking-[1em] text-[10px] md:text-xs"
                >
                    WELCOME TO KHAMEAH
                </motion.span>

                <motion.h2
                    variants={itemVariants}
                    className="text-3xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter leading-[1.1] md:leading-none px-2"
                >
                    Signature scents that <br className="hidden sm:block" />
                    <span className="text-blue-600 italic">tell your story</span>
                </motion.h2>

                {/* Special Cinematic Narrative Block */}
                <motion.div
                    variants={itemVariants}
                    className="relative py-6 md:py-10 flex flex-col items-center"
                >
                    <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mb-6 md:mb-8" />

                    <div className="relative w-full px-4">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="absolute top-0 left-0 h-full bg-blue-600/10 -skew-x-12"
                        />
                        <p className="relative z-10 font-mono text-xs md:text-base text-blue-400 italic font-medium tracking-widest max-w-3xl mx-auto leading-loose">
                            "Distilled for the modern sovereign. <br className="hidden md:block" />
                            An olfactory bridge between ancient secrets and futuristic silhouettes."
                        </p>
                    </div>

                    <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mt-6 md:mt-8" />

                    {/* Parallax Signature Background Element */}
                    <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] md:text-[15vw] font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none italic serif">
                        KHAMEAH ARCHIVE
                    </div>
                </motion.div>

                <motion.p
                    variants={itemVariants}
                    className="text-base md:text-xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed px-4"
                >
                    Meticulously crafted with rare ingredients from the heart of the Orient,
                    designed to leave an indelible mark on those who encounter them.
                </motion.p>

                <motion.div variants={itemVariants} className="pt-6 md:pt-8 flex justify-center">
                    <Link to="/products">
                        <button className="w-[90%] sm:w-auto px-10 md:px-12 py-5 md:py-5 bg-blue-600 text-white font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs hover:bg-blue-500 transition-all rounded-full shadow-[0_0_30px_rgba(37,99,235,0.2)] active:scale-95">
                            Discover Our Collections
                        </button>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Premium Perfume Glass (Smartphone/Desktop Optimized) */}
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-30 md:opacity-50 lg:opacity-70 transform scale-75 md:scale-100">
                <FloatingPerfume />
            </div>

            {/* Linear Decoration: Left Sidebar Line */}
            <div className="absolute left-6 md:left-24 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent hidden sm:block" />

        </section>
    );
};

// Import FloatingPerfume internally or locally
import { FloatingPerfume } from '../ui/floating-perfume';

export default SectionHeroStatement;
