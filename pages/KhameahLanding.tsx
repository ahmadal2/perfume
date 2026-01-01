import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Menu, X, Anchor, Box, Zap, Heart, Sparkles, Home, Search, BookOpen, User } from 'lucide-react';
import Lenis from 'lenis';

// Section Components
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

// Imports cleaned
import { useNavigate, Link } from 'react-router-dom';
import { FlowButton } from '../components/ui/flow-button';
// Removed Tubelight/Spotlight

const KhameahLanding: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        const lenis = new Lenis({
            duration: 0.8, // Faster, smoother
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
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
        stiffness: 150,
        damping: 35,
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
        { id: 'home', label: 'Home', icon: Home, action: () => scrollToSection('hero') },
        { id: 'products-page', label: 'Products', icon: Search, action: () => navigate('/products') },
        { id: 'archive', label: 'Archive', icon: Box, action: () => scrollToSection('archive') },
        { id: 'manifesto', label: 'Vision', icon: Anchor, action: () => scrollToSection('manifesto') },
        { id: 'why-us', label: 'Purity', icon: Heart, action: () => scrollToSection('why-us') },
        { id: 'blessing', label: 'Grace', icon: Sparkles, action: () => scrollToSection('blessing') },
        { id: 'login', label: 'Sign In', icon: User, action: () => navigate('/auth') },
        { id: 'admin', label: 'Admin', icon: BookOpen, action: () => navigate('/admin') },
    ];

    return (
        <div className="bg-[#000512] text-white selection:bg-blue-500/30 relative overflow-hidden">

            {/* Desktop Navigation Restored */}
            {/* Desktop Navigation - Modern 2026 Edition */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hidden md:flex fixed top-0 left-0 right-0 z-50 px-12 py-8 items-center justify-between max-w-[1400px] mx-auto pointer-events-none"
            >
                {/* Brand Identity */}
                <div className="flex items-center gap-3 pointer-events-auto">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]" />
                    <span className="text-xl font-black tracking-[0.4em] uppercase text-white/80 mix-blend-difference">Khamrah</span>
                </div>

                {/* 2026 Navigation Matrix - Minimal Luxury */}
                <div className="flex items-center gap-10 pointer-events-auto">
                    {[
                        { name: 'Archive', id: 'archive' },
                        { name: 'Products', id: 'products' },
                        { name: 'Manifesto', id: 'manifesto' },
                        { name: 'Why Us', id: 'why-us' },
                        { name: 'Blessing', id: 'blessing' }
                    ].map((item, i) => (
                        <button
                            key={item.name}
                            onClick={() => scrollToSection(item.id)}
                            className="relative group cursor-pointer bg-transparent border-none p-0 focus:outline-none"
                        >
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/70 group-hover:text-white transition-colors duration-300">
                                {item.name}
                            </span>
                            <span className="absolute -bottom-2 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300 ease-out" />
                        </button>
                    ))}
                </div>
            </motion.nav>

            {/* Background Structural Bones */}
            <StructuralGrid />

            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[100]"
                style={{ scaleX }}
            />

            {/* Desktop Navigation (Replaced by Tubelight Navbar) */}

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
                                className="w-full max-w-[320px] max-h-[85vh] overflow-y-auto bg-[#0a0a0a]/95 border border-white/10 rounded-[2rem] p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Header / Index */}
                                <div className="flex flex-col items-center mb-10">
                                    <div className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500 mb-2">Archive</div>
                                    <div className="h-px w-12 bg-blue-500/30" />
                                </div>

                                {/* Compact Options */}
                                <div className="space-y-2">
                                    {menuItems.map((item, idx) => {
                                        const Icon = item.icon;
                                        return (
                                            <motion.button
                                                key={item.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                onClick={() => {
                                                    item.action();
                                                    setIsMenuOpen(false);
                                                }}
                                                className="w-full group flex items-center justify-between py-3 px-3 rounded-xl border border-transparent hover:bg-white/[0.03] hover:border-white/5 transition-all text-left"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 flex items-center justify-center transition-all">
                                                        <Icon className="w-4 h-4 text-blue-400/60 group-hover:text-blue-400 transition-colors" />
                                                    </div>
                                                    <span className="text-xs font-bold uppercase tracking-[0.15em] text-white/50 group-hover:text-white transition-colors">
                                                        {item.label}
                                                    </span>
                                                </div>
                                                <span className="text-[8px] font-mono text-white/10 italic">0{idx + 1}</span>
                                            </motion.button>
                                        );
                                    })}
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
