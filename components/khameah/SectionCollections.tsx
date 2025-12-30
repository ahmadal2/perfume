import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const collections = [
    {
        id: 1,
        title: "Floral Paradise",
        subtitle: "Spring's Signature Scent",
        time: "4 Mins",
        tags: ["FLORAL", "FRESH", "DAYTIME"],
        image: "https://images.unsplash.com/photo-1594035910387-406691aa6981?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Woody Elegance",
        subtitle: "Evening Sophistication",
        time: "6 Mins",
        tags: ["WOODY", "WARM", "EVENING"],
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Oriental Mystery",
        subtitle: "Timeless Allure",
        time: "5 Mins",
        tags: ["ORIENTAL", "SPICY", "NIGHT"],
        image: "https://images.unsplash.com/photo-1523293188086-b589b9bee64f?q=80&w=1000&auto=format&fit=crop"
    }
];

const SectionCollections: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    return (
        <section ref={containerRef} className="py-32 px-6 bg-black min-h-screen flex flex-col justify-center">

            <div className="max-w-[1400px] mx-auto w-full space-y-20">
                <div className="space-y-4 px-4">
                    <span className="font-mono text-blue-500 text-[10px] md:text-sm uppercase tracking-[0.5em]">Archives</span>
                    <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none italic serif">
                        THE <span className="text-blue-500 font-light">COLLECTIONS</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {collections.map((card, idx) => {
                        // Stagger entrance based on scroll or delay
                        // Spec: 30% visible -> Card 1, 40% -> Card 2, 50% -> Card 3
                        // Simplify with framer motion viewport logic + delay

                        return (
                            <motion.div
                                key={card.id}
                                initial={{ opacity: 0, x: -100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: idx * 0.2, // 0s, 0.2s, 0.4s
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                                className="group relative aspect-[3/4] bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer"
                            >
                                {/* Image with Hover Zoom */}
                                <div className="absolute inset-0 overflow-hidden">
                                    <motion.img
                                        src={card.image}
                                        alt={card.title}
                                        className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

                                {/* Content */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end transform transition-transform duration-500 group-hover:-translate-y-2">

                                    <div className="space-y-4">
                                        <div className="flex flex-wrap gap-2">
                                            {card.tags.map(tag => (
                                                <span key={tag} className="text-[8px] font-mono text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                                                {card.title}
                                            </h3>
                                            <p className="text-white/60 text-sm font-light italic">
                                                {card.subtitle}
                                            </p>
                                        </div>

                                        <div className="pt-6 border-t border-white/10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="text-[10px] uppercase tracking-widest text-white/40">Read Time: {card.time}</span>
                                            <button className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
                                                <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
};

export default SectionCollections;
