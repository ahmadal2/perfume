import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroMarquee: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section ref={containerRef} className="relative h-[120vh] bg-black overflow-hidden">
            {/* Background Media */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1615484477778-ca3b77940c25?q=80&w=2800&auto=format&fit=crop"
                    alt="Hero Background"
                    className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black z-20" />
            </div>

            <motion.div
                style={{ y, opacity }}
                className="relative z-30 h-full flex flex-col justify-center gap-16 md:gap-32 py-20"
            >
                <MarqueeRow text="Luxury. Refined. Timeless. Luxury. Refined. Timeless." direction={1} speed={20} />
                <MarqueeRow text="Elegance. Crafted. Unforgettable. Elegance. Crafted." direction={-1} speed={25} />
                <MarqueeRow text="Fragrance. Redefined. Experience. Fragrance. Redefined." direction={1} speed={15} />
            </motion.div>
        </section>
    );
};

const MarqueeRow: React.FC<{ text: string, direction: number, speed: number }> = ({ text, direction, speed }) => {
    return (
        <div className="flex overflow-hidden whitespace-nowrap mask-linear-fade">
            <motion.div
                className="flex gap-4 md:gap-12"
                animate={{ x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: speed }}
            >
                {[...Array(4)].map((_, i) => (
                    <span key={i} className="text-[12vw] md:text-[8vw] font-black uppercase text-transparent bg-clip-text bg-gradient-to-b from-white/90 to-white/10 tracking-tighter leading-none italic font-serif">
                        {text}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export default HeroMarquee;
