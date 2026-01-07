"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "../../lib/utils";

gsap.registerPlugin(useGSAP);

interface WordLoaderProps {
    words?: string[];
    className?: string;
}

const WordLoader: React.FC<WordLoaderProps> = ({
    words = [
        "Welcome to shop",
        "Have fun buying",
        "Your perfume",
        "Legacy essence",
    ],
    className,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({ repeat: -1 });
            const wordDelay = 0.5; // Delay between words
            const wordDuration = 1.0; // Total duration per word (in + out)

            // Animate each word with blur in/out effect
            words.forEach((_, index) => {
                const startTime = index * (wordDuration + wordDelay);

                // Animate characters in
                tl.fromTo(
                    `.word-${index} .char`,
                    {
                        opacity: 0,
                        y: 10,
                        filter: "blur(8px)",
                    },
                    {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 0.5,
                        stagger: 0.05,
                        ease: "power2.out",
                    },
                    startTime
                );

                // Animate characters out
                tl.to(
                    `.word-${index} .char`,
                    {
                        opacity: 0,
                        y: -10,
                        filter: "blur(8px)",
                        duration: 0.5,
                        stagger: 0.05,
                        ease: "power2.in",
                    },
                    startTime + wordDuration - 0.2
                );
            });
        },
        { scope: containerRef, dependencies: [words] }
    );

    return (
        <div
            ref={containerRef}
            className={cn("flex flex-col w-full", className)}
        >
            <div className="relative h-12 flex items-center justify-center">
                {words.map((word, index) => (
                    <span
                        key={index}
                        className={`word-${index} absolute text-xl md:text-2xl tracking-[0.2em] font-serif italic text-white flex gap-x-1 whitespace-nowrap`}
                    >
                        {word.split("").map((char, charIndex) => (
                            <span key={charIndex} className="char inline-block">
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default WordLoader;
