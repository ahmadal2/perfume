import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollExpandMedia from '../components/ui/scroll-expansion-hero';
import { FlowButton } from '../components/ui/flow-button';
import { CartItem } from '../types';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { TextAnimation } from '../components/ui/text-animation';
import { TextEffect } from '../components/ui/text-effect';
import GradientCardShowcase from '../components/ui/gradient-card-showcase';
import { ScentSignature } from '../components/ui/scent-signature';
import { OrganicBackground } from '../components/ui/organic-background';
import { HorizontalGallery } from '../components/ui/horizontal-gallery';
import { NoiseOverlay } from '../components/ui/noise-overlay';
import { KineticStats } from '../components/ui/kinetic-stats';
import { ChapterTransition } from '../components/ui/chapter-transition';
import { ChronicleIndex } from '../components/ui/chronicle-index';
import { CornerFrame } from '../components/ui/corner-frame';

interface LandingProps {
    onAddToCart: (item: CartItem) => void;
}

const Landing: React.FC<LandingProps> = ({ onAddToCart }) => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);

    const handleBeginExperience = () => {
        window.scrollTo({ top: 0 });
        navigate('/home');
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 1, ease: [0.23, 1, 0.32, 1] }
    };

    return (
        <div ref={containerRef} className="bg-[#000000] text-blue-400 overflow-x-hidden relative tech-grid">
            <div className="sapphire-vignette" />
            <NoiseOverlay />
            <OrganicBackground />
            <ChronicleIndex />
            <ScentSignature />

            {/* Mouse Follow Glow */}
            <div
                className="fixed inset-0 pointer-events-none z-10 opacity-20"
                style={{
                    background: `radial-gradient(circle 600px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.1), transparent 80%)`
                }}
                onMouseMove={(e) => {
                    const target = e.currentTarget as HTMLDivElement;
                    if (target) {
                        target.style.setProperty('--mouse-x', `${e.clientX}px`);
                        target.style.setProperty('--mouse-y', `${e.clientY}px`);
                    }
                }}
            />

            <ScrollExpandMedia
                mediaType="image"
                mediaSrc="https://m.media-amazon.com/images/S/aplus-media-library-service-media/19293a5b-6876-420d-b156-a2446b7c5237.__CR0,0,3031,1875_PT0_SX970_V1___.png"
                bgImageSrc="https://m.media-amazon.com/images/S/aplus-media-library-service-media/19293a5b-6876-420d-b156-a2446b7c5237.__CR0,0,3031,1875_PT0_SX970_V1___.png"
                title="SAPPHIRE ROYALE"
                date="Chronicle 2026"
                scrollToExpand="Unveil The Essence"
                textBlend
            >
                <div className="max-w-[1400px] mx-auto py-20 relative z-20 px-6 space-y-[40vh]">

                    {/* SECTION I: THE SOURCE - REDESIGNED 1:1 */}
                    <section className="space-y-32">
                        <ChapterTransition number="01" title="The Source" />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <motion.div {...fadeInUp} className="space-y-10">
                                <div className="space-y-4">
                                    <TextEffect
                                        per="char"
                                        preset="blur"
                                        as="h4"
                                        className="text-blue-500 font-mono text-[10px] uppercase tracking-[1em]"
                                    >
                                        Heritage / Collection
                                    </TextEffect>
                                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-white">
                                        AN ETERNAL <span className="text-blue-500/80 font-light italic serif">LEGACY</span>
                                    </h2>
                                </div>

                                <p className="text-lg md:text-xl text-blue-200/40 font-mono leading-relaxed max-w-xl">
                                    Captured within the depths of Blue Sapphire, this collection transcends traditional perfumery to offer an olfactory narrative of power and precision.
                                </p>

                                <div className="pt-8 block md:flex gap-10 opacity-60">
                                    <div className="flex flex-col gap-2">
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-blue-500">Origin</span>
                                        <span className="text-white text-sm">Grasse, France</span>
                                    </div>
                                    <div className="flex flex-col gap-2 mt-6 md:mt-0">
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-blue-500">Duration</span>
                                        <span className="text-white text-sm">24H Projection</span>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.5 }}
                                className="relative"
                            >
                                <CornerFrame className="overflow-hidden p-0 rounded-3xl">
                                    <div className="aspect-[4/5] relative group">
                                        <img
                                            src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200"
                                            className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100"
                                            alt="Source Illustration"
                                        />
                                        <div className="absolute inset-0 bg-blue-950/20 mix-blend-overlay" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                                        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                                            <div className="space-y-1">
                                                <span className="font-mono text-[10px] text-blue-400 uppercase tracking-widest">Protocol</span>
                                                <p className="text-white font-bold">Cold Distillation</p>
                                            </div>
                                            <div className="h-10 w-10 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                                                <span className="text-[10px] text-white">01</span>
                                            </div>
                                        </div>
                                    </div>
                                </CornerFrame>
                            </motion.div>
                        </div>
                    </section>

                    {/* SECTION: COMPARISON - 1:1 titangate style */}
                    <section className="py-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 px-4">
                            <CornerFrame className="bg-zinc-950/40 border-r-0 md:rounded-l-[2rem]">
                                <div className="space-y-8 py-10">
                                    <span className="font-mono text-[10px] text-blue-500 uppercase tracking-[0.5em]">The Old World</span>
                                    <h3 className="text-4xl font-black text-white/40 tracking-tighter">ORDINARY <br />FRAGRANCES</h3>
                                    <ul className="space-y-4 font-mono text-[11px] text-white/20 uppercase tracking-widest">
                                        <li>• Synthetic Dilution</li>
                                        <li>• Immediate Fade-off</li>
                                        <li>• Generic Molecule Structure</li>
                                        <li>• Mass Market Sourcing</li>
                                    </ul>
                                </div>
                            </CornerFrame>
                            <CornerFrame className="bg-blue-600/5 md:rounded-r-[2rem]">
                                <div className="space-y-8 py-10">
                                    <span className="font-mono text-[10px] text-blue-400 uppercase tracking-[0.5em]">The New Standard</span>
                                    <h3 className="text-4xl font-black text-white tracking-tighter glow-text-sapphire">SAPPHIRE <br />DISTILLATE</h3>
                                    <ul className="space-y-4 font-mono text-[11px] text-blue-400 uppercase tracking-widest">
                                        <li className="text-blue-300 animate-pulse">• Essential Oil Purity 94%</li>
                                        <li>• Kinetic Projection</li>
                                        <li>• Proprietary Scent Maps</li>
                                        <li>• Limited Archive Batch</li>
                                    </ul>
                                </div>
                            </CornerFrame>
                        </div>
                    </section>

                    {/* INTERLUDE: KINETIC STATS - REDESIGNED */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-12 py-40 px-6">
                        <KineticStats value={94} suffix="%" label="Distillation Purity" />
                        <KineticStats value={24} suffix="m" label="Projected Longevity" />
                        <KineticStats value={18} suffix="k" label="Active Molecules" />
                    </section>

                    {/* NEW SECTION: HORIZONTAL COLLECTIONS */}
                    <section className="py-20 space-y-20">
                        <motion.div {...fadeInUp} className="px-6 space-y-6">
                            <span className="font-mono text-[10px] text-blue-500 uppercase tracking-[1em]">Archives</span>
                            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none italic serif">
                                THE <span className="text-blue-500 font-light">COLLECTION</span>
                            </h2>
                        </motion.div>
                        <HorizontalGallery />
                    </section>

                    {/* SECTION II: THE HEART */}
                    <section className="text-center space-y-32">
                        <ChapterTransition number="02" title="The Heart" />

                        <motion.div {...fadeInUp} className="max-w-4xl mx-auto space-y-12">
                            <h3 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-tight italic serif">
                                "A gourmand composition that defies <span className="text-blue-500">physics</span>."
                            </h3>
                            <p className="text-xl md:text-2xl text-blue-200/40 font-mono leading-relaxed max-w-2xl mx-auto">
                                Warm dates, toasted praline, and the resonance of roasted coffee notes, encapsulated in a sapphire vessel.
                            </p>
                        </motion.div>

                        <CornerFrame className="max-w-6xl mx-auto rounded-[3rem] overflow-hidden">
                            <GradientCardShowcase />
                        </CornerFrame>

                        <motion.div {...fadeInUp} className="pt-20">
                            <FlowButton
                                onClick={handleBeginExperience}
                                text="Explore The Sapphire Archives"
                                variant="blue"
                                className="h-24 w-full max-w-xl mx-auto text-[11px] font-mono tracking-widest shadow-[0_0_80px_rgba(59,130,246,0.1)]"
                            />
                        </motion.div>
                    </section>

                    {/* SECTION III: THE LEGACY */}
                    <section className="text-center space-y-32 pb-40">
                        <ChapterTransition number="03" title="The Legacy" />

                        <motion.div {...fadeInUp} className="space-y-16">
                            <h3 className="text-4xl md:text-8xl font-black text-white tracking-tighter leading-tight max-w-5xl mx-auto italic serif">
                                Built For <span className="text-blue-500">Sovereigns</span> of the New Era.
                            </h3>

                            <div className="flex flex-wrap justify-center gap-6 pb-20">
                                <CornerFrame className="flex items-center gap-5 group py-4 px-8 rounded-full">
                                    <Sparkles className="text-blue-500 group-hover:rotate-[20deg] transition-transform duration-500" size={20} />
                                    <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-blue-200/70">Pure Sapphire Heritage</span>
                                </CornerFrame>
                                <CornerFrame className="flex items-center gap-5 group py-4 px-8 rounded-full">
                                    <ShieldCheck className="text-blue-500 group-hover:scale-110 transition-transform duration-500" size={20} />
                                    <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-blue-200/70">Distilled Excellence</span>
                                </CornerFrame>
                            </div>
                        </motion.div>

                        {/* FINAL GATEWAY: THE VAULT */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 2 }}
                            className="py-40 relative group"
                        >
                            <div className="absolute inset-0 bg-blue-500/5 blur-[150px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <CornerFrame className="relative z-10 space-y-12 max-w-4xl mx-auto py-24 rounded-[4rem]">
                                <p className="font-mono text-[9px] font-black uppercase tracking-[1.5em] text-blue-500 animate-pulse">
                                    // ARCHIVE ACCESS GRANTED
                                </p>
                                <h2 className="text-7xl md:text-[11rem] font-black text-white tracking-tighter leading-none glow-text-sapphire italic serif">
                                    The Vault
                                </h2>
                                <div className="pt-10">
                                    <FlowButton
                                        onClick={handleBeginExperience}
                                        text="Decrypt Access"
                                        variant="blue"
                                        className="h-24 px-24 mx-auto shadow-[0_0_120px_rgba(59,130,246,0.2)] font-mono text-xs uppercase tracking-[0.5em]"
                                    />
                                </div>
                            </CornerFrame>
                        </motion.div>
                    </section>
                </div>
            </ScrollExpandMedia>
        </div>
    );
};

export default Landing;

