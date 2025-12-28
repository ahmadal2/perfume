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

            {/* 2026 Mobile Pulse Navigation (Smartphone-First Refined) */}
            <div className="md:hidden">
                {/* Top Right Small Button */}
                <div className="fixed top-6 right-6 z-[100]">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-3xl border border-white/10 flex items-center justify-center shadow-2xl group overflow-hidden"
                    >
                        <AnimatePresence mode="wait">
                            {isMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: 90 }}
                                >
                                    <X size={20} className="text-blue-400" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ opacity: 0, rotate: 90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: -90 }}
                                >
                                    <Menu size={20} className="text-white/60 group-hover:text-blue-400 transition-colors" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Interactive Sparkle effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                </div>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[95] bg-black/80 backdrop-blur-2xl flex items-center justify-center p-6"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                transition={{ type: "spring", damping: 25 }}
                                className="w-full max-w-[280px] bg-[#0a0a0a]/90 border border-white/10 rounded-[2.5rem] p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Header / Index */}
                                <div className="flex flex-col items-center mb-10">
                                    <div className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500 mb-2">Archive</div>
                                    <div className="h-px w-12 bg-blue-500/30" />
                                </div>

                                {/* Compact Options */}
                                <div className="space-y-4">
                                    {menuItems.map((item, idx) => (
                                        <motion.button
                                            key={item.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            onClick={() => {
                                                scrollToSection(item.id);
                                                setIsMenuOpen(false);
                                            }}
                                            className="w-full group flex items-center justify-between py-4 px-2 rounded-xl border border-transparent hover:bg-white/[0.03] hover:border-white/5 transition-all text-left"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-2 h-2 rounded-full bg-blue-500/20 group-hover:bg-blue-500 group-hover:scale-125 transition-all" />
                                                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
                                                    {item.label}
                                                </span>
                                            </div>
                                            <span className="text-[8px] font-mono text-white/10 italic">0{idx + 1}</span>
                                        </motion.button>
                                    ))}
                                </div>

                                {/* Bottom Branding */}
                                <div className="mt-10 pt-6 border-t border-white/5 text-center">
                                    <span className="text-[7px] font-black uppercase tracking-[0.8em] text-white/20">Khameah Royale</span>
                                </div>

                                {/* Futuristic Scan Line */}
                                <motion.div
                                    animate={{ top: ["-10%", "110%"] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent z-[-1]"
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
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
