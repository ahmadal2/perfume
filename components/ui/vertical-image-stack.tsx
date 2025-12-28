
"use client"

import React, { useState, useCallback, useEffect, useRef } from "react"
import { motion } from "framer-motion"

const images = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1200",
    alt: "Khamrah Original - Deep Amber Essence",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?auto=format&fit=crop&q=80&w=1200",
    alt: "Khamrah Qahwa - Roasted Coffee Resonance",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1200",
    alt: "The Art of Middle Eastern Perfumery",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1544413647-b51046402840?auto=format&fit=crop&q=80&w=1200",
    alt: "Nocturnal Elegance",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200",
    alt: "The Archive Collection",
  },
]

export function VerticalImageStack() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const lastNavigationTime = useRef(0)
  const navigationCooldown = 400 // ms between navigations

  const navigate = useCallback((newDirection: number) => {
    const now = Date.now()
    if (now - lastNavigationTime.current < navigationCooldown) return
    lastNavigationTime.current = now

    setCurrentIndex((prev) => {
      if (newDirection > 0) {
        return prev === images.length - 1 ? 0 : prev + 1
      }
      return prev === 0 ? images.length - 1 : prev - 1
    })
  }, [])

  const handleDragEnd = (_event: any, info: any) => {
    const threshold = 50
    if (info.offset.y < -threshold) {
      navigate(1)
    } else if (info.offset.y > threshold) {
      navigate(-1)
    }
  }

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 30) {
        if (e.deltaY > 0) {
          navigate(1)
        } else {
          navigate(-1)
        }
      }
    },
    [navigate],
  )

  useEffect(() => {
    const element = document.getElementById('image-stack-container');
    const onWheel = (e: WheelEvent) => {
      const isInside = element?.contains(e.target as Node);
      if (isInside) {
        handleWheel(e);
      }
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [handleWheel])

  const getCardStyle = (index: number) => {
    const total = images.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total

    if (diff === 0) {
      return { y: 0, scale: 1, opacity: 1, zIndex: 5, rotateX: 0 }
    } else if (diff === -1) {
      return { y: -160, scale: 0.82, opacity: 0.6, zIndex: 4, rotateX: 8 }
    } else if (diff === -2) {
      return { y: -280, scale: 0.7, opacity: 0.3, zIndex: 3, rotateX: 15 }
    } else if (diff === 1) {
      return { y: 160, scale: 0.82, opacity: 0.6, zIndex: 4, rotateX: -8 }
    } else if (diff === 2) {
      return { y: 280, scale: 0.7, opacity: 0.3, zIndex: 3, rotateX: -15 }
    } else {
      return { y: diff > 0 ? 400 : -400, scale: 0.6, opacity: 0, zIndex: 0, rotateX: diff > 0 ? -20 : 20 }
    }
  }

  const isVisible = (index: number) => {
    const total = images.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return Math.abs(diff) <= 2
  }

  const MotionDiv = motion.div as any;

  return (
    <div id="image-stack-container" className="relative flex h-[80vh] w-full items-center justify-center overflow-hidden bg-transparent">
      {/* Sapphire ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.03] blur-[150px]" />
      </div>

      {/* Card Stack */}
      <div className="relative flex h-[500px] w-[320px] items-center justify-center" style={{ perspective: "1200px" }}>
        {images.map((image, index) => {
          if (!isVisible(index)) return null
          const style = getCardStyle(index)
          const isCurrent = index === currentIndex

          return (
            <MotionDiv
              key={image.id}
              className="absolute cursor-grab active:cursor-grabbing"
              animate={{
                y: style.y,
                scale: style.scale,
                opacity: style.opacity,
                rotateX: style.rotateX,
                zIndex: style.zIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 1,
              }}
              drag={isCurrent ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              style={{
                transformStyle: "preserve-3d",
                zIndex: style.zIndex,
              }}
            >
              <div
                className={`relative h-[420px] w-[280px] overflow-hidden rounded-[2rem] bg-zinc-950 border transition-colors duration-700 shadow-2xl ${
                  isCurrent ? 'border-blue-500/30' : 'border-white/5'
                }`}
                style={{
                  boxShadow: isCurrent
                    ? "0 25px 50px -12px rgba(59, 130, 246, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)"
                    : "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
                }}
              >
                {/* Card inner glass shine */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/[0.05] via-transparent to-transparent pointer-events-none" />

                <img
                  src={image.src}
                  alt={image.alt}
                  className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-1000"
                  draggable={false}
                />

                {/* Bottom gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                <div className="absolute bottom-8 left-8 right-8 space-y-2">
                  <p className="text-[9px] uppercase tracking-[0.5em] text-blue-400 font-black opacity-60">Threshold Edition</p>
                  <p className="text-white text-sm font-black uppercase tracking-widest leading-tight">{image.alt.split(' - ')[0]}</p>
                </div>
              </div>
            </MotionDiv>
          )
        })}
      </div>

      {/* Navigation dots */}
      <div className="absolute right-12 top-1/2 flex -translate-y-1/2 flex-col gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (index !== currentIndex) {
                setCurrentIndex(index)
              }
            }}
            className={`w-1 rounded-full transition-all duration-700 ${
              index === currentIndex ? "h-12 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "h-4 bg-white/10 hover:bg-white/30"
            }`}
            aria-label={`Go to collection ${index + 1}`}
          />
        ))}
      </div>

      {/* Instruction hint */}
      <MotionDiv
        className="absolute bottom-16 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="flex flex-col items-center gap-3 text-white/20">
          <MotionDiv
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7-7 7 7" />
            </svg>
          </MotionDiv>
          <span className="text-[7px] font-black tracking-[0.6em] uppercase">Interactive Archive Navigation</span>
        </div>
      </MotionDiv>

      {/* Counter */}
      <div className="absolute left-16 top-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center gap-6">
          <span className="text-6xl serif italic text-blue-500 tabular-nums font-black text-glow">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
          <div className="h-20 w-[1px] bg-white/10" />
          <span className="text-[12px] text-white/20 tracking-[0.4em] tabular-nums font-black">{String(images.length).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  )
}
