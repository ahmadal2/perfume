
import React, { useState } from "react";
import { cn } from "../../lib/utils";

interface TextAnimationProps {
  topText: string;
  bottomText: string;
  className?: string;
}

export const TextAnimation = ({ topText, bottomText, className }: TextAnimationProps) => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("w-full flex flex-col items-center justify-center py-10", className)}>
      <p 
        className="m-0 text-transparent text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold uppercase animate-text bg-[url('https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200&auto=format&fit=crop&q=80')] bg-contain bg-clip-text opacity-90 drop-shadow-2xl"
      >
        {topText}
      </p>
      <p 
        className="m-0 text-transparent text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold uppercase animate-text bg-[url('https://images.unsplash.com/photo-1557827334-706713c393bc?w=1200&auto=format&fit=crop&q=80')] bg-contain bg-clip-text opacity-90 drop-shadow-2xl"
      >
        {bottomText}
      </p>
    </div>
  );
};
