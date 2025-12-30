import React, { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const tabs = [
    {
        id: "notes",
        title: "THE NOTES",
        description: "Top notes: Bergamot, Citrus | Heart notes: Jasmine, Rose | Base notes: Musk, Amber",
        image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "craft",
        title: "THE CRAFT",
        description: "Ingredient sourcing: We select only the rarest flowers, woods, and spices from sustainable origins.",
        image: "https://images.unsplash.com/photo-1616091093740-4ce0d16be9e4?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "bottle",
        title: "THE BOTTLE",
        description: "Packaging craftsmanship: Hand-blown crystal glass, capped with brushed gold alloy for a heavy, premium feel.",
        image: "https://images.unsplash.com/photo-1613525531988-cb5f87b32832?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "experience",
        title: "THE EXPERIENCE",
        description: "A sensory journey. 24+ hour longevity with massive projection that commands attention in any room.",
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop"
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
        <section ref={containerRef} className="relative h-[200vh] md:h-[400vh] bg-black">
            <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-20 gap-10">

                {/* Left Side: Tabs & Info */}
                <div className="w-full md:w-1/2 space-y-6 md:space-y-12 z-10 py-10 md:py-0">
                    <div className="space-y-2 md:space-y-4">
                        <span className="font-mono text-blue-500 text-[8px] md:text-xs tracking-[0.6em] md:tracking-[1em] uppercase">Why Choose Us</span>
                        <h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] md:leading-none">
                            The Essence of <br />
                            <span className="text-blue-500 italic">Excellence</span>
                        </h2>
                    </div>

                    <div className="flex flex-col gap-4 md:gap-6">
                        {tabs.map((tab, idx) => (
                            <div
                                key={tab.id}
                                className={`cursor-pointer transition-all duration-500 flex items-center gap-4 md:gap-6 group`}
                                onClick={() => {
                                    // Could add manual scroll to section logic here
                                }}
                            >
                                <div className={`w-8 md:w-12 h-px transition-all duration-500 ${currentTab === idx ? "w-12 md:w-20 bg-blue-600" : "bg-white/10 group-hover:bg-white/30"}`} />
                                <div className="space-y-1">
                                    <h3 className={`text-lg md:text-2xl font-bold tracking-widest ${currentTab === idx ? "text-white" : "text-white/20 group-hover:text-white/40"}`}>
                                        {tab.title}
                                    </h3>
                                    {currentTab === idx && (
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-white/60 text-xs md:text-sm max-w-sm md:max-w-md font-light leading-relaxed"
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
