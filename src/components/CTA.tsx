'use client';

import { motion } from "motion/react";
import { Swoosh } from "./Swoosh";

const MARQUEE = ["Just do it", "Air Lab 01", "Drop 26", "Numbered pairs", "Nike // Lab"];

function MarqueeBand({ className = "" }: { className?: string }) {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className={`w-full overflow-hidden border-y border-black/15 py-3 md:py-4 ${className}`} aria-hidden="true">
      <div className="marquee-track flex w-max items-center gap-8 md:gap-12 whitespace-nowrap">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-8 md:gap-12">
            {items.map((text, i) => (
              <span key={`${copy}-${i}`} className="flex items-center gap-8 md:gap-12 font-sans font-extrabold uppercase tracking-tight text-lg md:text-2xl">
                {text}
                <Swoosh className="w-7 md:w-9 h-auto" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CTA() {
  return (
    <section id="community" className="relative w-full bg-brand-orange text-black overflow-hidden">
      <MarqueeBand />

      <div className="relative max-w-7xl mx-auto px-5 md:px-12 py-24 md:py-40 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[10px] md:text-xs font-mono tracking-[0.35em] uppercase text-black/60 mb-6"
        >
          Community // Drop list
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans font-black uppercase tracking-tighter leading-[0.9] text-balance"
          style={{ fontSize: "clamp(56px, 13vw, 200px)" }}
        >
          Just do it
          <span className="block font-serif italic font-normal normal-case tracking-normal text-[0.5em] leading-none mt-2 text-black/80">
            again tomorrow.
          </span>
        </motion.h2>
        <motion.a
          href="#labs"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="mt-12 md:mt-16 inline-flex items-center gap-3 rounded-full bg-black text-white px-8 py-4 md:px-10 md:py-5 font-sans font-bold text-sm md:text-base tracking-wide uppercase shadow-[0_25px_60px_-20px_rgba(0,0,0,0.6)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
        >
          Join the drop list
          <span aria-hidden="true">→</span>
        </motion.a>
      </div>

      <MarqueeBand />
    </section>
  );
}
