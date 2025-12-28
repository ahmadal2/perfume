"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const items = [
    {
        id: 1,
        title: "KHAMRAH",
        subtitle: "The Signature",
        image: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/19293a5b-6876-420d-b156-a2446b7c5237.__CR0,0,3031,1875_PT0_SX970_V1___.png",
    },
    {
        id: 2,
        title: "QAHWA",
        subtitle: "Special Reserve",
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800",
    },
    {
        id: 3,
        title: "BLUE",
        subtitle: "Heritage Collection",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800",
    },
    {
        id: 4,
        title: "ROYALE",
        subtitle: "Limited Edition",
        image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=800",
    },
];

export const HorizontalGallery = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-transparent">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-4 px-10">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="group relative h-[450px] w-[350px] md:h-[600px] md:w-[450px] overflow-hidden rounded-[2rem] bg-zinc-900/50 backdrop-blur-sm border border-white/5"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="absolute inset-0 h-full w-full object-cover grayscale opacity-50 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-10 left-10 space-y-2">
                                <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-blue-500">
                                    {item.subtitle}
                                </p>
                                <h3 className="text-4xl font-black text-white tracking-tighter italic serif">
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                    {/* Empty space at the end to allow for full scroll */}
                    <div className="w-[20vw] shrink-0" />
                </motion.div>
            </div>
        </section>
    );
};
