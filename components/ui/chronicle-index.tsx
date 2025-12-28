"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const chapters = [
    { id: "01", title: "Source" },
    { id: "02", title: "Heart" },
    { id: "03", title: "Legacy" },
];

export const ChronicleIndex = () => {
    const { scrollYProgress } = useScroll();

    return (
        <div className="fixed left-12 top-1/2 -translate-y-1/2 z-[60] hidden xl:flex flex-col gap-12">
            <div className="absolute left-[7px] top-0 bottom-0 w-[1px] bg-white/5">
                <motion.div
                    className="w-full bg-blue-500 origin-top shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    style={{ scaleY: scrollYProgress }}
                />
            </div>

            {chapters.map((chapter, i) => (
                <div key={chapter.id} className="relative flex items-center gap-6 group">
                    <div className="w-4 h-4 rounded-full border border-blue-500/30 bg-zinc-950 flex items-center justify-center relative z-10 transition-colors group-hover:border-blue-500">
                        <motion.div
                            className="w-1 h-1 rounded-full bg-blue-500"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                        />
                    </div>

                    <div className="flex flex-col gap-1 opacity-20 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0">
                        <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest leading-none">
                            Chapter {chapter.id}
                        </span>
                        <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] leading-none">
                            {chapter.title}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};
