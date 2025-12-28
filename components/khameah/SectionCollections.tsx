import React from 'react';
import { motion } from 'framer-motion';

const collections = [
    {
        title: "Floral Paradise",
        subtitle: "Spring's Signature Scent",
        tags: ["FLORAL", "FRESH", "DAYTIME"],
        image: "/khamrah_ingredients_mood_1766893376222.png",
        readTime: "4 Mins"
    },
    {
        title: "Woody Elegance",
        subtitle: "Evening Sophistication",
        tags: ["WOODY", "WARM", "EVENING"],
        image: "/khamrah_cologne_luxury_1766893547394.png",
        readTime: "5 Mins"
    },
    {
        title: "Oriental Mystery",
        subtitle: "Timeless Allure",
        tags: ["ORIENTAL", "SPICY", "NIGHT"],
        image: "/khamrah_bottle_hero_1766893364476.png",
        readTime: "6 Mins"
    }
];

const SectionCollections: React.FC = () => {
    return (
        <section className="py-40 bg-black overflow-hidden px-6 md:px-20">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="mb-20 space-y-4"
            >
                <span className="font-mono text-blue-500 text-[10px] uppercase tracking-[1em]">Archives</span>
                <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter italic font-serif">
                    The <span className="text-blue-500 font-sans not-italic">Collections</span>
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {collections.map((item, idx) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true, amount: 0.2 }}
                        className="group relative cursor-pointer"
                    >
                        {/* Card Image */}
                        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/5 transition-transform duration-700 group-hover:-translate-y-3 shadow-2xl">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover grayscale opacity-60 transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                            {/* Read Time Overlay */}
                            <div className="absolute top-6 right-6 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-[9px] font-mono tracking-widest text-white/60">
                                {item.readTime}
                            </div>

                            {/* Content Overlap */}
                            <div className="absolute bottom-8 left-8 right-8 space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="text-[8px] font-mono tracking-widest text-blue-500 border border-blue-500/30 px-2 py-0.5 rounded-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-bold text-white tracking-tight">{item.title}</h3>
                                    <p className="text-white/40 text-xs font-light">{item.subtitle}</p>
                                </div>

                                <motion.div
                                    className="pt-4 overflow-hidden"
                                    initial={{ height: 0, opacity: 0 }}
                                    whileHover={{ height: "auto", opacity: 1 }}
                                >
                                    <button className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.4em] flex items-center gap-2 group/btn">
                                        Read More <span className="transition-transform duration-300 group-hover/btn:translate-x-2">→</span>
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default SectionCollections;
