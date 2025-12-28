import React from 'react';
import { motion } from 'framer-motion';

const SectionBlessing: React.FC = () => {
    return (
        <section className="relative py-60 bg-black overflow-hidden flex flex-col items-center justify-center px-6">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="relative z-10 text-center space-y-12"
            >
                {/* Floating Symbols / Sacred Geometry Animation */}
                <div className="relative w-40 h-40 mx-auto mb-20 flex items-center justify-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-blue-500/20 rounded-full"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 border border-blue-500/10 rounded-full border-dashed"
                    />

                    {/* Central Symbol (Inspired by luxury motifs) */}
                    <div className="relative group cursor-pointer">
                        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <motion.path
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                d="M50 5 L60 35 L95 35 L70 55 L80 85 L50 65 L20 85 L30 55 L5 35 L40 35 Z"
                                stroke="#3b82f6"
                                strokeWidth="0.5"
                                fill="none"
                            />
                            <circle cx="50" cy="50" r="2" fill="#3b82f6" className="animate-pulse" />
                            {/* Inner intricate details */}
                            <path d="M50 20 L50 80 M20 50 L80 50" stroke="#3b82f6" strokeWidth="0.2" opacity="0.5" />
                        </svg>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic serif">
                        Fortune <span className="text-blue-500 not-italic font-sans">Favors</span> The Scented
                    </h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-white/30 font-mono text-sm md:text-lg tracking-[0.5em] uppercase"
                    >
                        May your signature fragrance lead you to destiny.
                    </motion.p>
                </div>

                <div className="pt-10">
                    <div className="flex justify-center gap-12">
                        {['LUCK', 'POWER', 'WISDOM'].map((item, idx) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 + idx * 0.2 }}
                                className="flex flex-col items-center gap-4"
                            >
                                <div className="text-[10px] text-blue-500 font-black tracking-widest">{item}</div>
                                <div className="h-1 w-1 bg-white/20 rounded-full" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default SectionBlessing;
