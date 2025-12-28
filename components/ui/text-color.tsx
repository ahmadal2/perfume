
"use client";

import React from "react";
import { Plus } from "lucide-react"; 

export function TextColor() {
  return (
    <div className="w-full">
      <div className="mb-10 mt-4 md:mt-6">
        <div className="px-2">
          <div className="relative p-8 w-full h-full border border-white/5 [mask-image:radial-gradient(100rem_24rem_at_center,white,transparent)]">
            <h1 className="tracking-tighter flex select-none px-3 py-2 flex-col text-center text-5xl font-extrabold leading-none sm:text-7xl md:flex-col lg:flex-row items-center justify-center uppercase">
              <Plus className="absolute -left-4 -top-4 h-8 w-8 text-blue-500 opacity-40" />
              <Plus className="absolute -bottom-4 -left-4 h-8 w-8 text-blue-500 opacity-40" />
              <Plus className="absolute -right-4 -top-4 h-8 w-8 text-blue-500 opacity-40" />
              <Plus className="absolute -bottom-4 -right-4 h-8 w-8 text-blue-500 opacity-40" />

              <span
                data-content="Distill."
                className="before:animate-gradient-background-1 before:absolute before:bottom-4 before:left-0 before:top-0 before:z-0 before:w-full before:px-2 before:content-[attr(data-content)] sm:before:top-0 relative"
              >
                <span className="from-gradient-1-start to-gradient-1-end animate-gradient-foreground-1 bg-gradient-to-r bg-clip-text px-2 text-transparent sm:px-5">
                Distill.
                </span>
              </span>
              <span
                data-content="Archive."
                className="before:animate-gradient-background-2 before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:w-full before:px-2 before:content-[attr(data-content)] sm:before:top-0 relative"
              >
                <span className="from-gradient-2-start to-gradient-2-end animate-gradient-foreground-2 bg-gradient-to-r bg-clip-text px-2 text-transparent sm:px-5">
                Archive.
                </span>
              </span>
              <span
                data-content="Royale."
                className="before:animate-gradient-background-3 before:absolute before:bottom-1 before:left-0 before:top-0 before:z-0 before:w-full before:px-2 before:content-[attr(data-content)] sm:before:top-0 relative"
              >
                <span className="from-gradient-3-start to-gradient-3-end animate-gradient-foreground-3 bg-gradient-to-r bg-clip-text px-2 text-transparent sm:px-5">
                Royale.
                </span>
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
