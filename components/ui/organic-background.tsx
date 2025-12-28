"use client";

import React from "react";
import { motion } from "framer-motion";

export const OrganicBackground = () => {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
            {/* Organic Blob 1 */}
            <motion.div
                className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-600/10 blur-[120px]"
                animate={{
                    x: [0, 50, -30, 0],
                    y: [0, -40, 60, 0],
                    scale: [1, 1.2, 0.9, 1],
                    rotate: [0, 45, -45, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Organic Blob 2 */}
            <motion.div
                className="absolute top-[40%] -right-[15%] w-[70%] h-[70%] bg-blue-900/10 blur-[150px]"
                animate={{
                    x: [0, -60, 40, 0],
                    y: [0, 80, -40, 0],
                    scale: [1, 0.8, 1.1, 1],
                    rotate: [0, -30, 60, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Organic Blob 3 */}
            <motion.div
                className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] bg-sapphire-600/5 blur-[100px]"
                animate={{
                    x: [0, 40, -50, 0],
                    y: [0, -70, 30, 0],
                    scale: [1, 1.1, 0.8, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Subtle light pulse */}
            <motion.div
                className="absolute inset-0 bg-blue-500/5 mix-blend-soft-light"
                animate={{
                    opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
};
