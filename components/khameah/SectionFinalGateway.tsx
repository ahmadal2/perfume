import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SectionFinalGateway: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="relative h-[80vh] bg-black overflow-hidden flex flex-col items-center justify-center px-6">
            {/* 2026 Kinetic Line Background */}
            <div className="absolute inset-0 z-0">
                {/* Horizontal Scanning Line */}
                <motion.div
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-[1px] bg-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                />

                {/* Side Borders with Glow */}
                <div className="absolute inset-y-0 left-10 md:left-20 w-px bg-white/5" />
                <div className="absolute inset-y-0 right-10 md:right-20 w-px bg-white/5" />

                {/* Corner Accents */}
                <div className="absolute top-10 left-10 md:left-20 w-8 h-8 border-t border-l border-blue-500/40" />
                <div className="absolute top-10 right-10 md:right-20 w-8 h-8 border-t border-r border-blue-500/40" />
                <div className="absolute bottom-10 left-10 md:left-20 w-8 h-8 border-b border-l border-blue-500/40" />
                <div className="absolute bottom-10 right-10 md:right-20 w-8 h-8 border-b border-r border-blue-500/40" />
            </div>

            {/* Interaction Hub */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="relative z-10 flex flex-col items-center gap-16"
            >
                <div className="space-y-4 text-center">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto"
                    />
                    <h2 className="text-[10px] uppercase tracking-[1.5em] text-blue-400 font-bold">
                        Experience Threshold
                    </h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto"
                    />
                </div>

                <div
                    onClick={() => navigate('/home')}
                    className="group relative cursor-pointer"
                >
                    {/* Pulsing Outer Ring */}
                    <div className="absolute inset-[-40px] border border-blue-500/10 rounded-full scale-100 group-hover:scale-110 group-hover:border-blue-500/30 transition-all duration-700 animate-pulse" />

                    <div className="relative overflow-hidden px-16 py-8 border border-white/10 rounded-full bg-white/[0.02] backdrop-blur-3xl transition-all duration-500 group-hover:border-blue-500/50 group-hover:bg-blue-500/5">
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic serif transition-all group-hover:text-blue-100">
                                Visit <span className="text-blue-500 group-hover:text-cyan-400 transition-colors">Shop</span>
                            </span>
                            <span className="text-[8px] uppercase tracking-[1em] text-white/20 group-hover:text-blue-400/60 transition-colors">
                                Authenticate Destination
                            </span>
                        </div>

                        {/* 2026 Scanning Beam Effect */}
                        <motion.div
                            animate={{ left: ['-100%', '200%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent -skew-x-12"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Bottom Status Bar */}
            <div className="absolute bottom-10 left-10 md:left-20 right-10 md:right-20 flex justify-between items-center opacity-20 text-[9px] font-mono tracking-widest uppercase">
                <span>System: Online</span>
                <div className="flex gap-4">
                    <span>Lat: 48.8566</span>
                    <span>Long: 2.3522</span>
                </div>
                <span>Est. 2026</span>
            </div>
        </section>
    );
};

export default SectionFinalGateway;
