"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const FloatingOrbs = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const orbs = [
        { size: 400, color: "rgba(59, 130, 246, 0.15)", delay: 0, x: "10%", y: "20%" },
        { size: 600, color: "rgba(37, 99, 235, 0.1)", delay: 2, x: "60%", y: "40%" },
        { size: 300, color: "rgba(29, 78, 216, 0.12)", delay: 4, x: "30%", y: "70%" },
        { size: 500, color: "rgba(30, 58, 138, 0.08)", delay: 1, x: "80%", y: "10%" },
    ];

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {orbs.map((orb, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full blur-[120px]"
                    style={{
                        width: orb.size,
                        height: orb.size,
                        backgroundColor: orb.color,
                        left: orb.x,
                        top: orb.y,
                    }}
                    animate={{
                        x: (mousePosition.x - window.innerWidth / 2) * 0.05,
                        y: (mousePosition.y - window.innerHeight / 2) * 0.05,
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        x: { type: "spring", stiffness: 50, damping: 20 },
                        y: { type: "spring", stiffness: 50, damping: 20 },
                        scale: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: orb.delay },
                    }}
                />
            ))}
        </div>
    );
};
