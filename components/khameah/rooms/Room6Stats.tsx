// Room6Stats.tsx
import React from 'react';
import { motion } from 'framer-motion';

const Room6Stats: React.FC = () => {
    const stats = [
        { label: "Absolute Purity", value: "100%", detail: "Cold-press distillation" },
        { label: "Global Sources", value: "48", detail: "Rare ingredient farms" },
        { label: "Hours Wear", value: "12+", detail: "Oil-based longevity" },
        { label: "Artisans", value: "124", detail: "Traditional craftsmen" },
    ];

    return (
        <div className="relative w-full h-full flex items-center justify-center bg-[#01040d] overflow-hidden">
            {/* Minimalist Grid Background */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-24 gap-y-16 relative z-10 max-w-7xl px-12">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 1 }}
                        className="text-center group"
                    >
                        <motion.span
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 0.4 }}
                            className="text-[10px] font-black uppercase tracking-[0.5em] mb-4 block group-hover:text-blue-500 transition-colors"
                        >
                            {stat.label}
                        </motion.span>
                        <h2 className="text-7xl md:text-8xl font-black uppercase tracking-tighter mb-4">{stat.value}</h2>
                        <div className="w-8 h-px bg-white/10 mx-auto group-hover:w-full transition-all duration-700" />
                        <p className="mt-6 text-[10px] font-medium tracking-widest text-white/20 uppercase">{stat.detail}</p>
                    </motion.div>
                ))}
            </div>

            {/* Glowing Orbs */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[150px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/5 blur-[200px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
    );
};

export default Room6Stats;
