"use client";

import React from "react";
import { motion } from "framer-motion";

export const NoiseOverlay = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] contrast-150 brightness-150">
            <div
                className="absolute inset-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"
                style={{ backgroundSize: '128px' }}
            />
            <motion.div
                className="absolute inset-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"
                style={{ backgroundSize: '128px' }}
                animate={{
                    x: [0, 10, -5, 10, 0],
                    y: [0, -5, 10, -5, 0],
                }}
                transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
        </div>
    );
};
