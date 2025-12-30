import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const products = [
    {
        id: "01",
        category: "EAU DE PARFUM",
        words: "Bold. Captivating. Timeless.",
        image: "/imag/kha1.png"
    },
    {
        id: "02",
        category: "EAU DE TOILETTE",
        words: "Fresh. Vibrant. Effortless.",
        image: "/imag/kha2.png"
    },
    {
        id: "03",
        category: "COLOGNE",
        words: "Refined. Subtle. Sophisticated.",
        image: "/imag/kha3.png"
    }
];

const SectionProductShowcase: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    const x = useTransform(scrollYProgress, [0, 0.33, 0.33, 0.66, 0.66, 1], ["0%", "0%", "-100%", "-100%", "-200%", "-200%"]);
    const opacity01 = useTransform(scrollYProgress, [0, 0.2, 0.33], [1, 1, 0]);
    const opacity02 = useTransform(scrollYProgress, [0.33, 0.4, 0.6, 0.66], [0, 1, 1, 0]);
    const opacity03 = useTransform(scrollYProgress, [0.66, 0.8, 1], [0, 1, 1]);

    const scale01 = useTransform(scrollYProgress, [0, 0.33], [1, 0.8]);
    const scale02 = useTransform(scrollYProgress, [0.33, 0.5, 0.66], [0.8, 1, 0.8]);
    const scale03 = useTransform(scrollYProgress, [0.66, 1], [0.8, 1]);

    return (
        <section ref={sectionRef} className="relative h-[300vh] bg-[#050505]">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                {/* Horizontal Sliding Products */}
                <motion.div style={{ x }} className="flex w-[300%] h-full">
                    {products.map((product, idx) => {
                        const opacity = idx === 0 ? opacity01 : idx === 1 ? opacity02 : opacity03;
                        const scale = idx === 0 ? scale01 : idx === 1 ? scale02 : scale03;

                        return (
                            <div key={product.id} className="w-screen h-full flex flex-col md:flex-row items-center justify-center px-10 gap-10 md:gap-20">
                                {/* Product Info Left */}
                                <motion.div
                                    style={{ opacity }}
                                    className="order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left space-y-3 md:space-y-4 md:w-1/3 mt-4 md:mt-0"
                                >
                                    <span className="text-[15vw] md:text-[8vw] font-black text-white/5 leading-none">
                                        {product.id}
                                    </span>
                                    <h3 className="text-xl md:text-4xl font-bold text-blue-500 tracking-wider">
                                        {product.category}
                                    </h3>
                                    <p className="text-white/60 font-mono tracking-widest uppercase text-[10px] md:text-sm">
                                        {product.words}
                                    </p>
                                    <button className="mt-4 md:mt-6 px-6 md:px-8 py-2 md:py-3 border border-blue-600/30 text-blue-500 text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] hover:bg-blue-600 hover:text-white transition-all">
                                        Explore Details
                                    </button>
                                </motion.div>

                                {/* Product Image Center */}
                                <motion.div
                                    style={{ opacity, scale }}
                                    className="order-1 md:order-2 relative w-full max-w-[200px] sm:max-w-[240px] md:max-w-[450px] aspect-[1/1.2]"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.category}
                                        className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(59,130,246,0.1)]"
                                    />
                                </motion.div>

                                {/* Spacer for layout balance on desktop */}
                                <div className="hidden md:block w-1/3" />
                            </div>
                        );
                    })}
                </motion.div>

                {/* Vertical Scroll Indicator Overlay */}
                <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4">
                    {products.map((p, idx) => (
                        <div key={p.id} className="h-20 w-px bg-white/10 relative">
                            <motion.div
                                className="absolute top-0 left-0 w-full bg-blue-600"
                                style={{
                                    height: useTransform(scrollYProgress,
                                        [idx * 0.33, (idx + 1) * 0.33],
                                        ["0%", "100%"]
                                    )
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Linear Decoration: Right Sidebar Line */}
            <div className="absolute right-12 md:right-24 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent z-50 pointer-events-none" />
        </section>
    );
};

export default SectionProductShowcase;
