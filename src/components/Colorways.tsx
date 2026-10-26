'use client';

import { motion, type Variants } from "motion/react";
import shoe from "@/src/assets/shoe.png";

const COLORWAYS = [
  { name: "Infrared", code: "AL01-600", accent: "#DA3A16", filter: "none" },
  { name: "Volt", code: "AL01-700", accent: "#C8FF00", filter: "sepia(1) saturate(4) hue-rotate(28deg) brightness(1.05)" },
  { name: "Glacier", code: "AL01-400", accent: "#7DD3FC", filter: "sepia(1) saturate(3) hue-rotate(165deg) brightness(1.05)" },
  { name: "Obsidian", code: "AL01-001", accent: "#9CA3AF", filter: "grayscale(1) brightness(0.55) contrast(1.2)" },
];

const grid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export function Colorways() {
  return (
    <section id="colorways" className="relative w-full bg-brand-dark text-white py-20 md:py-32 px-5 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-16"
        >
          <div>
            <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-brand-orange mb-3">Drops // Collections</p>
            <h2 className="font-sans font-black uppercase tracking-tight leading-[0.95]" style={{ fontSize: "clamp(36px, 6vw, 84px)" }}>
              Four finishes.
              <span className="block font-serif italic font-normal normal-case text-white/70">One silhouette.</span>
            </h2>
          </div>
          <p className="max-w-[34ch] text-sm text-white/50 leading-relaxed">
            Limited runs, numbered pairs. Each colorway ships with a matching lace set and the AIR LAB 01 spec card.
          </p>
        </motion.div>

        <motion.ul
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 list-none"
        >
          {COLORWAYS.map((c) => (
            <motion.li key={c.code} variants={card}>
              <motion.a
                href="#community"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative block aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-[#0b0b0b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                aria-label={`${c.name} colorway, ${c.code}`}
              >
                <div
                  className="absolute inset-0 opacity-50 transition-opacity duration-500 group-hover:opacity-80"
                  style={{ background: `radial-gradient(70% 60% at 50% 60%, ${c.accent}66 0%, transparent 70%)` }}
                />
                <div className="absolute inset-x-0 top-0 p-5 flex items-start justify-between">
                  <div>
                    <p className="font-sans font-bold text-lg leading-none">{c.name}</p>
                    <p className="mt-1 text-[10px] font-mono tracking-widest text-white/40 uppercase">{c.code}</p>
                  </div>
                  <span className="w-3 h-3 rounded-full ring-2 ring-white/20" style={{ backgroundColor: c.accent }} />
                </div>
                <img
                  src={shoe.src}
                  width={shoe.width}
                  height={shoe.height}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="absolute left-1/2 top-[54%] w-[115%] max-w-none -translate-x-1/2 -translate-y-1/2 -rotate-[18deg] drop-shadow-[0_40px_40px_rgba(0,0,0,0.7)] transition-transform duration-700 ease-out group-hover:-rotate-[22deg] group-hover:scale-105"
                  style={{ filter: c.filter }}
                />
                <div className="absolute inset-x-0 bottom-0 p-5 flex items-center justify-between text-xs font-mono tracking-widest uppercase">
                  <span className="text-white/60">$180</span>
                  <span className="text-white/60 group-hover:text-brand-orange transition-colors">Notify me →</span>
                </div>
              </motion.a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
