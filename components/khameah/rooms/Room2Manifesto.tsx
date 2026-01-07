// Room2Manifesto.tsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Room2Manifesto: React.FC = () => {
    return (
        <div className="relative w-full h-full flex bg-[#050811] overflow-hidden">
            {/* Split Screen Design */}
            <div className="w-full md:w-1/2 h-full flex items-center px-12 md:px-24 border-r border-white/5 relative z-10 bg-black/20 backdrop-blur-sm">
                <div className="max-w-xl">
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[10px] font-black uppercase tracking-[0.6em] text-blue-500 mb-8"
                    >
                        Our Philosophy
                    </motion.p>

                    <div className="space-y-6">
                        {["SCENT IS NOT JUST", "A FRAGRANCE,", "IT IS A SILENT", "LANGUAGE OF", "THE SOUL."].map((text, i) => (
                            <motion.h2
                                key={i}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * i, duration: 1 }}
                                className="text-4xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter"
                            >
                                {text}
                            </motion.h2>
                        ))}
                    </div>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="w-24 h-px bg-blue-600 mt-12 origin-left"
                    />

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.4 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="text-sm tracking-widest leading-relaxed mt-12 font-medium"
                    >
                        Driven by the pursuit of absolute purity, Khamrah crafts sensory experiences that transcend time. Each droplet is a chapter, each note a memory.
                    </motion.p>
                </div>
            </div>

            <div className="hidden md:block w-1/2 h-full relative overflow-hidden">
                <motion.div
                    initial={{ scale: 1.2 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-0 bg-cover bg-center grayscale opacity-60"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1974&auto=format&fit=crop")' }}
                />

                {/* Abstract Light Leak */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-transparent mix-blend-overlay" />

                <div className="absolute inset-0 flex items-center justify-center p-24">
                    <div className="w-full h-full border border-white/10 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
                        <div className="w-2/3 h-2/3 border border-blue-500/20 rounded-full" />
                    </div>
                </div>
            </div>

            {/* Background Text Decor */}
            <h4 className="absolute bottom-12 right-12 text-[15rem] font-black text-white/[0.02] uppercase leading-none select-none pointer-events-none">
                Essence
            </h4>
        </div>
    );
};

export default Room2Manifesto;
