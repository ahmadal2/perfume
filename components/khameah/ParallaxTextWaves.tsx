import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxTextWaves: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
    const y2 = useTransform(scrollYProgress, [0, 1], ["20%", "-60%"]);
    const y3 = useTransform(scrollYProgress, [0, 1], ["40%", "-90%"]);
    const y4 = useTransform(scrollYProgress, [0, 1], ["60%", "-120%"]);

    const opacity1 = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
    const opacity2 = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
    const opacity3 = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
    const opacity4 = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);

    return (
        <section ref={containerRef} className="relative min-h-[150vh] bg-black flex items-center justify-center overflow-hidden py-40">
            <div className="flex flex-col items-center justify-center text-center gap-10 md:gap-20 z-10 w-full px-6">

                <motion.h2
                    style={{ y: y1, opacity: opacity1 }}
                    className="text-6xl md:text-[9rem] font-black text-white/90 tracking-tighter leading-none italic font-serif"
                >
                    Artisan
                </motion.h2>

                <motion.h2
                    style={{ y: y2, opacity: opacity2 }}
                    className="text-6xl md:text-[9rem] font-black text-blue-500/80 tracking-tighter leading-none italic font-serif ml-[10vw]"
                >
                    crafted
                </motion.h2>

                <motion.h2
                    style={{ y: y3, opacity: opacity3 }}
                    className="text-6xl md:text-[9rem] font-black text-white/90 tracking-tighter leading-none italic font-serif -ml-[15vw]"
                >
                    fragrances that
                </motion.h2>

                <motion.h2
                    style={{ y: y4, opacity: opacity4 }}
                    className="text-6xl md:text-[9rem] font-black text-white/50 tracking-tighter leading-none italic font-serif"
                >
                    capture emotion
                </motion.h2>

                <motion.h2
                    style={{ y: useTransform(scrollYProgress, [0, 1], ["80%", "-150%"]), opacity: useTransform(scrollYProgress, [0.7, 0.9], [0, 1]) }}
                    className="text-6xl md:text-[9rem] font-black text-blue-500/30 tracking-tighter leading-none italic font-serif ml-[10vw]"
                >
                    in every note
                </motion.h2>

                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0.7, 0.9], [0, 1]) }}
                    className="max-w-xl mx-auto mt-20"
                >
                    <p className="text-blue-200/50 text-xl font-mono leading-relaxed">
                        Every bottle is a vessel of memories, poured with precision to evoke the deepest sentiments of the human experience.
                    </p>
                </motion.div>
            </div>

            {/* Background Texture */}
            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "50%"]) }}
                className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"
            />
        </section>
    );
};

export default ParallaxTextWaves;
