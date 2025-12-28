import React, { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const tabs = [
    {
        id: "notes",
        title: "THE NOTES",
        description: "Top notes: Bergamot, Cinnamon | Heart notes: Dates, Praline | Base notes: Vanilla, Myrrh",
        image: "/imag/lattafa khamrah.jpg"
    },
    {
        id: "craft",
        title: "THE CRAFT",
        description: "Artisanal distillation process ensuring 94% purity and 24-hour projected longevity.",
        image: "/imag/Lattafa Khamrah Eau De Parfum 100ml (Unisex).jpg"
    },
    {
        id: "bottle",
        title: "THE BOTTLE",
        description: "Exquisite crystal vessel designed with architectural precision to capture the light.",
        image: "/imag/Khamrah by Lattafa – A Spiced Gourmand Fantasy.jpg"
    },
    {
        id: "experience",
        title: "THE EXPERIENCE",
        description: "A sensory journey that defies physics, designed for sovereigns of the new era.",
        image: "/imag/kha1.png"
    }
];

const SectionWhyChooseUs: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Determine active index based on scroll progress
    const activeIndex = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 2, 3, 3]);

    // We need to use state for the UI because useTransform is for animations
    // But we can trigger state changes or just use the transform for visual elements
    // For simplicity and performance, I'll use a listener to update the active tab UI
    const [currentTab, setCurrentTab] = React.useState(0);

    React.useEffect(() => {
        return activeIndex.onChange((v) => {
            const index = Math.min(Math.floor(v), 3);
            if (index !== currentTab) {
                setCurrentTab(index);
            }
        });
    }, [activeIndex, currentTab]);

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-black">
            <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-20 gap-10">

                {/* Left Side: Tabs & Info */}
                <div className="w-full md:w-1/2 space-y-12 z-10">
                    <div className="space-y-4">
                        <span className="font-mono text-blue-500 text-xs tracking-[1em] uppercase">Why Choose Us</span>
                        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">The Essence of <br /><span className="text-blue-500 italic">Excellence</span></h2>
                    </div>

                    <div className="flex flex-col gap-6">
                        {tabs.map((tab, idx) => (
                            <div
                                key={tab.id}
                                className={`cursor-pointer transition-all duration-500 flex items-center gap-6 group`}
                                onClick={() => {
                                    // Could add manual scroll to section logic here
                                }}
                            >
                                <div className={`w-12 h-px transition-all duration-500 ${currentTab === idx ? "w-20 bg-blue-600" : "bg-white/10 group-hover:bg-white/30"}`} />
                                <div className="space-y-1">
                                    <h3 className={`text-xl md:text-2xl font-bold tracking-widest ${currentTab === idx ? "text-white" : "text-white/20 group-hover:text-white/40"}`}>
                                        {tab.title}
                                    </h3>
                                    {currentTab === idx && (
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-white/60 text-sm max-w-md font-light leading-relaxed"
                                        >
                                            {tab.description}
                                        </motion.p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Changing Images */}
                <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTab}
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -50, scale: 1.1 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <div className="relative w-full h-[80%] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                                <img
                                    src={tabs[currentTab].image}
                                    alt={tabs[currentTab].title}
                                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-all duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                                <div className="absolute bottom-8 left-8">
                                    <span className="text-blue-500 font-mono text-xs tracking-widest">CHAPTER 0{currentTab + 1}</span>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default SectionWhyChooseUs;
