"use client";

import React from "react";
import { motion } from "framer-motion";
import { TextEffect } from "./text-effect";

interface ChapterTransitionProps {
    number: string;
    title: string;
}

export const ChapterTransition: React.FC<ChapterTransitionProps> = ({ number, title }) => {
    return (
        <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.05, scale: 1.2 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
                <span className="text-[40rem] font-black text-blue-500 leading-none select-none">
                    {number}
                </span>
            </motion.div>

            <div className="relative z-10 text-center space-y-4">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-[10px] font-black uppercase tracking-[1.5em] text-blue-500/60"
                >
                    Chapter {number}
                </motion.p>
                <TextEffect
                    per="char"
                    preset="blur"
                    as="h2"
                    className="text-7xl md:text-9xl serif italic text-white tracking-tighter"
                >
                    {title}
                </TextEffect>
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1.5, delay: 1, ease: "circOut" }}
                    className="h-px w-64 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-8"
                />
            </div>
        </div>
    );
};
