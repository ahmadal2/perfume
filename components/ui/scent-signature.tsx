"use client";

import React, { useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const ScentSignature = () => {
    const { scrollYProgress } = useScroll();

    const molecules = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5
    })), []);

    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <motion.div
            style={{ opacity }}
            className="fixed inset-0 pointer-events-none z-[5]"
        >
            <motion.div
                style={{ rotate }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <div className="relative w-[150%] aspect-square">
                    {molecules.map((m) => (
                        <motion.div
                            key={m.id}
                            className="absolute rounded-full bg-blue-500/20 blur-[2px]"
                            style={{
                                width: m.size,
                                height: m.size,
                                left: `${m.x}%`,
                                top: `${m.y}%`,
                            }}
                            animate={{
                                x: [0, 50, -50, 0],
                                y: [0, -50, 50, 0],
                                opacity: [0.1, 0.3, 0.1],
                            }}
                            transition={{
                                duration: m.duration,
                                repeat: Infinity,
                                delay: m.delay,
                                ease: "linear",
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};
