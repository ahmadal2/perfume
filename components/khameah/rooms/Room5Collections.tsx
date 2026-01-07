// Room5Collections.tsx
import React from 'react';
import { motion } from 'framer-motion';

const Room5Collections: React.FC = () => {
    const collections = [
        { title: "Nocturnal Pulse", subtitle: "Midnight Series", color: "#3030ff" },
        { title: "Solar Radiance", subtitle: "Dawn series", color: "#ffcc00" },
        { title: "Verdant Mist", subtitle: "Forest Series", color: "#00cc88" },
        { title: "Azure Depths", subtitle: "Oceanic Series", color: "#0088ff" },
    ];

    return (
        <div className="relative w-full h-full flex items-center justify-center bg-[#000512] overflow-hidden">
            <div className="flex gap-16 px-48 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                {collections.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="min-w-[70vw] h-[80vh] bg-white/5 rounded-[4rem] snap-center relative overflow-hidden group flex items-center justify-center p-24"
                    >
                        {/* Decorative Background Symbol */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
                            <h2 className="text-[40rem] font-black uppercase -rotate-12 translate-x-32">{item.title[0]}</h2>
                        </div>

                        <div className="relative z-10 text-center">
                            <motion.span
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 0.4 }}
                                transition={{ delay: 0.3 }}
                                className="text-xl font-medium tracking-[0.5em] uppercase mb-4 block"
                            >
                                {item.subtitle}
                            </motion.span>
                            <motion.h3
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-6xl md:text-[6rem] font-black uppercase tracking-tighter leading-none"
                            >
                                {item.title}
                            </motion.h3>

                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: 200 }}
                                transition={{ delay: 0.8, duration: 1 }}
                                className="h-px bg-blue-500 mx-auto mt-12"
                            />

                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="mt-16 flex items-center justify-center gap-12"
                            >
                                <div className="flex flex-col items-center">
                                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Complexity</span>
                                    <div className="flex gap-1 mt-2">
                                        {[...Array(5)].map((_, j) => (
                                            <div key={j} className={`w-1 h-3 ${j < 4 ? 'bg-blue-500' : 'bg-white/10'}`} />
                                        ))}
                                    </div>
                                </div>
                                <div className="w-px h-8 bg-white/10" />
                                <div className="flex flex-col items-center">
                                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Longevity</span>
                                    <div className="flex gap-1 mt-2">
                                        {[...Array(5)].map((_, j) => (
                                            <div key={j} className={`w-1 h-3 ${j < 5 ? 'bg-blue-500' : 'bg-white/10'}`} />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Interactive Corner Decor */}
                        <div className="absolute top-12 right-12 w-12 h-12 border-t-2 border-r-2 border-white/10 group-hover:border-blue-500 transition-colors" />
                        <div className="absolute bottom-12 left-12 w-12 h-12 border-b-2 border-l-2 border-white/10 group-hover:border-blue-500 transition-colors" />
                    </motion.div>
                ))}
            </div>

            {/* Gallery Progress Counter */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6">
                <span className="text-xs font-black text-blue-500">I</span>
                <div className="w-48 h-px bg-white/10 relative">
                    <motion.div
                        initial={{ x: -100 }}
                        whileInView={{ x: 0 }}
                        className="absolute inset-0 bg-blue-500"
                    />
                </div>
                <span className="text-xs font-black text-white/40">IV</span>
            </div>
        </div>
    );
};

export default Room5Collections;
