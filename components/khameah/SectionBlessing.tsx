import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Crown } from 'lucide-react';

const SectionBlessing: React.FC = () => {
    return (
        <section className="relative py-40 sm:py-60 bg-gradient-to-b from-black via-purple-950/10 to-black overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6">
            {/* Ambient Background Glow - Enhanced */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
                <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pink-600/10 blur-[100px] rounded-full" />
            </div>

            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{
                        opacity: [0.2, 0.5, 0.2],
                        y: [100, -100],
                        x: [0, Math.random() * 100 - 50]
                    }}
                    transition={{
                        duration: 10 + Math.random() * 10,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "easeInOut"
                    }}
                    className="absolute w-1 h-1 bg-blue-400/50 rounded-full blur-sm"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                />
            ))}

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="relative z-10 text-center space-y-12 max-w-6xl"
            >
                {/* Floating Symbols / Sacred Geometry Animation */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-12 sm:mb-20 flex items-center justify-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-blue-500/20 rounded-full"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 border border-purple-500/10 rounded-full border-dashed"
                    />

                    {/* Central Symbol */}
                    <div className="relative group cursor-pointer">
                        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <motion.path
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                d="M50 5 L60 35 L95 35 L70 55 L80 85 L50 65 L20 85 L30 55 L5 35 L40 35 Z"
                                stroke="url(#gradient)"
                                strokeWidth="0.5"
                                fill="none"
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#a855f7" />
                                    <stop offset="50%" stopColor="#ec4899" />
                                    <stop offset="100%" stopColor="#3b82f6" />
                                </linearGradient>
                            </defs>
                            <circle cx="50" cy="50" r="2" fill="#3b82f6" className="animate-pulse" />
                            <path d="M50 20 L50 80 M20 50 L80 50" stroke="#3b82f6" strokeWidth="0.2" opacity="0.5" />
                        </svg>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 blur-xl rounded-full"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white tracking-tighter uppercase italic serif px-4">
                        Fortune <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 not-italic font-sans">Favors</span> The Scented
                    </h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-white/40 font-mono text-xs sm:text-sm md:text-lg tracking-[0.3em] sm:tracking-[0.5em] uppercase px-4"
                    >
                        May your signature fragrance lead you to destiny.
                    </motion.p>
                </div>

                {/* Virtue Cards - Bento Grid Style */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-10 sm:pt-16 px-4">
                    {[
                        { title: 'LUCK', icon: Sparkles, color: 'from-purple-600 to-pink-600', desc: 'Attract fortune' },
                        { title: 'POWER', icon: Zap, color: 'from-pink-600 to-orange-600', desc: 'Command presence' },
                        { title: 'WISDOM', icon: Crown, color: 'from-orange-600 to-purple-600', desc: 'Inspire clarity' }
                    ].map((item, idx) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            transition={{ delay: 0.8 + idx * 0.2 }}
                            className="group relative"
                        >
                            {/* Glow Effect */}
                            <motion.div
                                animate={{
                                    opacity: [0.3, 0.6, 0.3],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: idx * 0.5
                                }}
                                className={`absolute inset-0 bg-gradient-to-r ${item.color} blur-xl opacity-0 group-hover:opacity-50 transition-opacity rounded-2xl`}
                            />

                            {/* Card */}
                            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-white/20 transition-all">
                                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-4 sm:mb-6`}>
                                    <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                </div>
                                <div className="text-[10px] sm:text-xs text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 font-black tracking-widest mb-2">{item.title}</div>
                                <div className="text-[8px] sm:text-[10px] text-white/30 uppercase tracking-wider">{item.desc}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Decorative Quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="pt-12 sm:pt-20 max-w-2xl mx-auto px-4"
                >
                    <div className="relative">
                        <div className="absolute -left-4 sm:-left-8 top-0 text-4xl sm:text-6xl text-purple-500/20">"</div>
                        <p className="text-white/50 italic text-sm sm:text-base leading-relaxed">
                            In the realm of scent, we are not mere consumers—we are alchemists,
                            transforming molecules into memories, notes into narratives.
                        </p>
                        <div className="absolute -right-4 sm:-right-8 bottom-0 text-4xl sm:text-6xl text-purple-500/20">"</div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default SectionBlessing;
