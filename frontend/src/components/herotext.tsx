"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/hero";

export function HeroHighlightDemo() {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl  md:text-3xl lg:text-4xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
      
        <Highlight className="text-black dark:text-white">
          Build Your Future Hustle Today
        </Highlight>
      </motion.h1>
    </HeroHighlight>
  );
}
