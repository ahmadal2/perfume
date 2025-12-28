
"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";

type Review = {
  id: string | number;
  name: string;
  affiliation: string;
  quote: string;
  imageSrc: string;
  thumbnailSrc: string;
};

interface TestimonialSliderProps {
  reviews: Review[];
  className?: string;
}

export const TestimonialSlider = ({
  reviews,
  className,
}: TestimonialSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const activeReview = reviews[currentIndex];

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleThumbnailClick = (index: number) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  const thumbnailReviews = reviews
    .filter((_, i) => i !== currentIndex)
    .slice(0, 3);

  const imageVariants = {
    enter: (direction: "left" | "right") => ({
      y: direction === "right" ? "100%" : "-100%",
      opacity: 0,
      filter: "blur(10px)",
    }),
    center: { y: 0, opacity: 1, filter: "blur(0px)" },
    exit: (direction: "left" | "right") => ({
      y: direction === "right" ? "-100%" : "100%",
      opacity: 0,
      filter: "blur(10px)",
    }),
  };

  const textVariants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 100 : -100,
      opacity: 0,
      filter: "blur(10px)",
    }),
    center: { x: 0, opacity: 1, filter: "blur(0px)" },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? -100 : 100,
      opacity: 0,
      filter: "blur(10px)",
    }),
  };

  // Cast motion components to any to bypass type errors
  const MotionDiv = motion.div as any;

  return (
    <div
      className={cn(
        "relative w-full min-h-[700px] overflow-hidden bg-transparent text-white p-4 md:p-0",
        className
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 h-full items-center">
        {/* Pagination & Meta */}
        <div className="md:col-span-2 flex flex-col justify-between h-full py-12 order-2 md:order-1">
          <div className="flex flex-row md:flex-col items-center md:items-start gap-8">
            <span className="text-[10px] text-[#D4AF37] font-black tracking-[0.5em] uppercase">
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(reviews.length).padStart(2, "0")}
            </span>
            <h2 className="text-[10px] font-black tracking-[0.8em] uppercase [writing-mode:vertical-rl] rotate-180 hidden md:block text-gray-700">
              The Gentlemen
            </h2>
          </div>

          <div className="flex gap-3 mt-12 md:mt-0">
            {thumbnailReviews.map((review) => {
              const originalIndex = reviews.findIndex((r) => r.id === review.id);
              return (
                <button
                  key={review.id}
                  onClick={() => handleThumbnailClick(originalIndex)}
                  className="overflow-hidden rounded-2xl w-14 h-20 opacity-40 hover:opacity-100 transition-all duration-500 border border-white/5 hover:border-[#D4AF37]/50"
                >
                  <img
                    src={review.thumbnailSrc}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Image */}
        <div className="md:col-span-5 relative h-[500px] md:h-[650px] order-1 md:order-2">
          <div className="absolute -inset-4 border border-white/5 rounded-[3rem] pointer-events-none" />
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <MotionDiv
              key={currentIndex}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={activeReview.imageSrc}
                alt={activeReview.name}
                className="w-full h-full object-cover rounded-[2.5rem] shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-[2.5rem]" />
            </MotionDiv>
          </AnimatePresence>
        </div>

        {/* Text & Content */}
        <div className="md:col-span-5 flex flex-col justify-center md:pl-16 order-3 md:order-3">
          <div className="relative overflow-hidden min-h-[350px]">
             <Quote className="text-[#D4AF37]/10 absolute -top-10 -left-10 w-32 h-32" />
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <MotionDiv
                key={currentIndex}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
              >
                <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.5em] mb-4">
                  {activeReview.affiliation}
                </p>
                <h3 className="text-4xl serif italic font-black mb-8 text-white">
                  {activeReview.name}
                </h3>
                <blockquote className="text-2xl md:text-4xl serif italic leading-tight text-gray-300">
                  "{activeReview.quote}"
                </blockquote>
              </MotionDiv>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4 mt-12">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="hover:border-[#D4AF37]/50"
            >
              <ArrowLeft size={18} />
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={handleNext}
            >
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
