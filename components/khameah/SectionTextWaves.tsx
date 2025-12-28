import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SectionTextWaves: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [200, -200]);
    const y3 = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const y4 = useTransform(scrollYProgress, [0, 1], [300, -300]);
    const y5 = useTransform(scrollYProgress, [0, 1], [150, -150]);

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="relative h-[150vh] w-full flex flex-col items-center justify-center bg-black overflow-hidden py-40">
            {/* Background Parallax */}
            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]), opacity: 0.1 }}
                className="absolute inset-0 z-0 pointer-events-none"
            >
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 blur-[150px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/20 blur-[150px] rounded-full" />
            </motion.div>

            <motion.div style={{ opacity }} className="relative z-10 w-full flex flex-col items-center text-center space-y-12 md:space-y-20">
                <motion.h2 style={{ y: y1 }} className="text-7xl md:text-[12vw] font-black uppercase tracking-tighter text-white/90 leading-none">
                    Artisan
                </motion.h2>
                <motion.h2 style={{ y: y2 }} className="text-7xl md:text-[12vw] font-black uppercase tracking-tighter text-blue-500 italic leading-none ml-20 md:ml-40">
                    crafted
                </motion.h2>
                <motion.h2 style={{ y: y3 }} className="text-7xl md:text-[12vw] font-black uppercase tracking-tighter text-white/80 leading-none mr-20 md:mr-40">
                    fragrances
                </motion.h2>
                <motion.h2 style={{ y: y4 }} className="text-7xl md:text-[12vw] font-black uppercase tracking-tighter text-blue-500 leading-none">
                    capture
                </motion.h2>
                <motion.h2 style={{ y: y5 }} className="text-7xl md:text-[12vw] font-black uppercase tracking-tighter text-white/90 leading-none italic">
                    emotion
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="max-w-xl px-6 pt-20"
                >
                    <p className="text-white/40 font-mono text-sm md:text-md uppercase tracking-[0.3em] leading-relaxed">
                        In every note, a memory. In every drop, a masterpiece.
                        We don't just create perfumes; we bottle the essence of dreams.
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default SectionTextWaves;
