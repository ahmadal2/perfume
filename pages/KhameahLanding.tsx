import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
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

    return (
        <div className="bg-[#000512] text-white selection:bg-blue-500/30">
            {/* Background Structural Bones */}
            <StructuralGrid />

            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[100]"
                style={{ scaleX }}
            />

            {/* Floating Navigation */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="fixed top-8 left-1/2 -translate-x-1/2 z-[90] flex items-center gap-6 px-8 py-4 rounded-full bg-black/20 backdrop-blur-3xl border border-white/5 shadow-2xl scale-90 md:scale-100"
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
