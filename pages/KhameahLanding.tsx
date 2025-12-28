import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Menu, X, Anchor, Box, Zap, Heart, Sparkles } from 'lucide-react';
import Lenis from 'lenis';

// Section Components (to be implemented)
import SectionMarquee from '../components/khameah/SectionMarquee';
import SectionHeroStatement from '../components/khameah/SectionHeroStatement';
import SectionCollectionIntro from '../components/khameah/SectionCollectionIntro';
import SectionProductShowcase from '../components/khameah/SectionProductShowcase';
import SectionTextWaves from '../components/khameah/SectionTextWaves';
import SectionWhyChooseUs from '../components/khameah/SectionWhyChooseUs';
import SectionStats from '../components/khameah/SectionStats';
import SectionBlessing from '../components/khameah/SectionBlessing';
import SectionFinalGateway from '../components/khameah/SectionFinalGateway';
import StructuralGrid from '../components/khameah/StructuralGrid';

import { useNavigate } from 'react-router-dom';
import { FlowButton } from '../components/ui/flow-button';

const KhameahLanding: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleEnterBoutique = () => {
        navigate('/home');
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { id: 'archive', label: 'Archive', icon: Box },
        { id: 'products', label: 'Essences', icon: Zap },
        { id: 'manifesto', label: 'Vision', icon: Anchor },
        { id: 'why-us', label: 'Purity', icon: Heart },
        { id: 'blessing', label: 'Grace', icon: Sparkles },
    ];

    return (
        <div className="bg-[#000512] text-white selection:bg-blue-500/30">
            {/* Background Structural Bones */}
            <StructuralGrid />

            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[100]"
                style={{ scaleX }}
            />

            {/* Desktop Navigation (Top) */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="hidden md:flex fixed top-8 left-1/2 -translate-x-1/2 z-[90] items-center gap-6 px-8 py-4 rounded-full bg-black/20 backdrop-blur-3xl border border-white/5 shadow-2xl scale-90 md:scale-100"
            >
                {['archive', 'products', 'manifesto', 'why-us', 'blessing'].map((item) => (
                    <button
                        key={item}
                        onClick={() => scrollToSection(item)}
                        className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 hover:text-blue-400 transition-colors"
                    >
                        {item.replace('-', ' ')}
                    </button>
                ))}
            </motion.nav>

            {/* 2026 Mobile Pulse Navigation (Smartphone-First) */}
            <div className="md:hidden fixed bottom-10 left-1/2 -translate-x-1/2 z-[100]">
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[-1]"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[90vw] max-w-sm glass-panel rounded-[2.5rem] border border-white/10 p-8 shadow-2xl overflow-hidden"
                        >
                            {/* Header / Context */}
                            <div className="flex justify-between items-center mb-8">
                                <span className="text-[8px] font-black uppercase tracking-[0.8em] text-blue-500">Navigation</span>
                                <div className="h-px flex-1 bg-blue-500/20 mx-4" />
                                <span className="text-[8px] font-mono text-white/20">©2026</span>
                            </div>

                            {/* Fitting Nav List */}
                            <div className="space-y-4">
                                {menuItems.map((item, idx) => (
                                    <motion.button
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        onClick={() => {
                                            scrollToSection(item.id);
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-blue-600/10 hover:border-blue-500/30 transition-all group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-blue-400">
                                                <item.icon size={14} />
                                            </div>
                                            <span className="text-sm font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                                                {item.label}
                                            </span>
                                        </div>
                                        <span className="text-[10px] font-mono text-white/10 group-hover:text-blue-500 transition-colors">0{idx + 1}</span>
                                    </motion.button>
                                ))}
                            </div>

                            {/* Quick Status */}
                            <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center opacity-30">
                                <span className="text-[7px] font-black uppercase tracking-widest">System: Secure</span>
                                <span className="text-[7px] font-black uppercase tracking-widest">Khamrah Royale</span>
                            </div>

                            {/* Light Sweep Decoration */}
                            <motion.div
                                animate={{ left: ["-100%", "200%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute top-0 bottom-0 w-12 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* The "Pulse" Trigger Button */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)] border border-white/20 overflow-hidden group"
                >
                    <AnimatePresence mode="wait">
                        {isMenuOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                            >
                                <X size={24} className="text-white" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                className="flex flex-col items-center"
                            >
                                <Menu size={24} className="text-white" />
                                <span className="absolute -bottom-1 opacity-0 group-hover:opacity-100 text-[6px] font-black tracking-tighter uppercase transition-opacity">Menu</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Pulsing Sapphire Effect */}
                    <div className="absolute inset-0 bg-blue-400/20 animate-pulse pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-50" />
                </motion.button>
            </div>

            <main>
                <div id="marquee"><SectionMarquee /></div>
                <div id="hero"><SectionHeroStatement /></div>
                <div id="archive"><SectionCollectionIntro /></div>
                <div id="products"><SectionProductShowcase /></div>
                <div id="manifesto"><SectionTextWaves /></div>
                <div id="why-us"><SectionWhyChooseUs /></div>
                <div id="stats"><SectionStats /></div>

                <div id="blessing"><SectionBlessing /></div>

                <div id="shop-gateway"><SectionFinalGateway /></div>
            </main>
        </div>
    );
};

export default KhameahLanding;
