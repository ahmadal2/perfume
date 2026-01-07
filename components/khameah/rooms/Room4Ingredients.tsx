// Room4Ingredients.tsx
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Room4Ingredients: React.FC = () => {
    const ingredients = [
        { name: "Damask Rose", origin: "Isparta, Turkey", image: "public/imag/kha1.png" },
        { name: "Aged Oud", origin: "Assam, India", image: "public/imag/kha2.png" },
        { name: "Pure Musk", origin: "Ethical Sourcing", image: "public/imag/kha3.png" },
        { name: "Saffron", origin: "Khorasan, Iran", image: "public/imag/kha3.png" },
    ];

    return (
        <div className="relative w-full h-full flex bg-black overflow-hidden">
            {/* Pinned Side Header */}
            <div className="sticky top-0 left-0 h-full w-[25vw] flex flex-col justify-between p-12 border-r border-white/5 z-20 bg-black">
                <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-blue-500">Ancient Roots</span>
                    <h2 className="text-6xl font-black uppercase leading-[0.85] tracking-tighter mt-8">The Holy Grails</h2>
                </div>

                <div className="space-y-4">
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest leading-loose">
                        We travel the world to find the purest essences, sourced from families who have tended to the soil for generations.
                    </p>
                    <div className="w-8 h-px bg-white/20" />
                </div>
            </div>

            {/* Vertical Inner Scroll Content */}
            <div className="flex-1 h-full overflow-y-auto scrollbar-hide">
                <div className="py-[25vh] space-y-[25vh]">
                    {ingredients.map((item, i) => (
                        <div key={i} className="px-24 grid grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                                whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                className="aspect-[3/4] overflow-hidden rounded-3xl"
                            >
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000 grayscale hover:grayscale-0" />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3, duration: 1 }}
                            >
                                <span className="text-[10px] font-mono text-blue-400">Provenance: {item.origin}</span>
                                <h3 className="text-5xl font-black uppercase tracking-tighter mt-4">{item.name}</h3>
                                <p className="mt-8 text-white/40 text-sm leading-relaxed max-w-sm">
                                    Harvested at the peak of dawn, each petal is hand-picked and distilled within hours to preserve the absolute volatility of its soul.
                                </p>
                                <button className="mt-12 text-[10px] font-black uppercase tracking-[0.3em] border-b border-blue-500 pb-2 hover:text-blue-500 transition-colors">
                                    Discover Sourcing
                                </button>
                            </motion.div>
                        </div>
                    ))}
                    <div className="h-[25vh]" />
                </div>
            </div>

            {/* Grid Decor */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
                <div className="w-full h-full grid grid-cols-12 grid-rows-12 gap-px bg-white/10" />
            </div>
        </div>
    );
};

export default Room4Ingredients;
