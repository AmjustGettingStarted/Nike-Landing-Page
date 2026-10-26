'use client';

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { SpotlightReveal } from "./SpotlightReveal";
import { Swoosh } from "./Swoosh";
import { useMediaQuery } from "../hooks/useMediaQuery";

const HERO_VIDEO = "/video/video1.webm";
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=2000&q=90";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const inView = useInView(ref, { amount: 0.2 });
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)", true);
  const reduced = useReducedMotion() ?? false;

  // Desktop: play while hovered. Touch: play whenever the hero is on screen.
  const isPlaying = inView && (canHover ? hovered : true);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const swooshY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const layerY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const layerScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const cueFade = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative w-full h-[100svh] min-h-[560px] overflow-hidden flex flex-col justify-end"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <motion.div className="absolute inset-0" style={reduced ? undefined : { y: layerY, scale: layerScale }}>
        <SpotlightReveal
          maskId="mask-one"
          imageSrc={HERO_IMAGE}
          videoSrc={HERO_VIDEO}
          isPlaying={isPlaying}
          baseRadius={380}
          active={inView}
          hovered={hovered}
          autoMotion={!canHover}
          reducedMotion={reduced}
        />
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent pointer-events-none" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-[17%] md:top-[20%] left-1/2 z-10 w-[46vw] max-w-[440px] -translate-x-1/2 pointer-events-none text-white"
        id="nike-swoosh-container"
      >
        <motion.div style={reduced ? undefined : { y: swooshY, opacity: fade }}>
          <Swoosh className="w-full h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]" />
        </motion.div>
      </motion.div>

      <motion.div
        className="relative z-30 w-full flex flex-col items-center px-5 md:px-6 pb-20 md:pb-24 text-center text-white pointer-events-none"
        style={reduced ? undefined : { y: headlineY, opacity: fade }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="mb-4 md:mb-6 text-[10px] md:text-xs font-mono tracking-[0.35em] uppercase text-white/50"
        >
          AIR LAB 01 // Season 26
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="font-sans leading-[1.05] tracking-tight max-w-5xl mx-auto uppercase text-balance"
          style={{ fontSize: "clamp(24px, 4.4vw, 60px)" }}
        >
          <span className="block text-white/60 font-light tracking-wider mb-1 md:mb-2 text-[0.6em]">
            Pure Comfort For
          </span>
          <span className="block font-extrabold">
            Next-Generation Athletes.{" "}
            <span className="font-serif italic font-normal lowercase text-brand-orange block md:inline-block">
              We craft
            </span>
          </span>
          <span className="block font-serif italic font-normal normal-case text-white/90 mt-1 text-[0.82em] leading-[1.15]">
            the ultimate footwear for elite performance,
            <br className="hidden md:block" /> urban exploration, and raw style.
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8 md:mt-10 text-[10px] md:text-xs font-mono tracking-widest uppercase flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
          {canHover ? "Hover to reveal motion // Scroll for spec" : "Scroll for spec"}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-white/50 pointer-events-none"
        style={reduced ? undefined : { opacity: cueFade }}
        aria-hidden="true"
      >
        <span className="text-[9px] font-mono tracking-[0.3em] uppercase">Scroll</span>
        <span className="relative block w-px h-8 bg-white/20 overflow-hidden">
          <motion.span
            className="absolute left-0 top-0 w-px h-3 bg-brand-orange"
            animate={reduced ? undefined : { y: [-12, 32] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
