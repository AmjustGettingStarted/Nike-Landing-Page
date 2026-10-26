'use client';

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import shoe from "@/src/assets/shoe.png";
import { TelemetryCard } from "./TelemetryCard";

type Side = "left" | "right";

interface ChapterProps {
  progress: MotionValue<number>;
  range: [number, number];
  side: Side;
  children: ReactNode;
}

function Chapter({ progress, range: [a, b], side, children }: ChapterProps) {
  const fadeIn = Math.min(0.06, (b - a) / 3);
  const opacity = useTransform(progress, [a, a + fadeIn, b - fadeIn, b], [0, 1, 1, 0]);
  const y = useTransform(progress, [a, a + fadeIn, b - fadeIn, b], [40, 0, 0, -40]);
  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute z-20 pointer-events-none px-5 md:px-0 w-full md:w-[38%] max-w-[420px] ${
        side === "left"
          ? "left-0 md:left-[7%] top-[6rem] md:top-1/2 md:-translate-y-1/2"
          : "right-0 md:right-[7%] bottom-[4.5rem] md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:text-right"
      }`}
    >
      {children}
    </motion.div>
  );
}

function Label({ index, title, side = "left" }: { index: string; title: string; side?: Side }) {
  return (
    <div
      className={`mb-3 flex items-center gap-3 text-[10px] font-mono tracking-[0.3em] uppercase text-white/50 ${
        side === "right" ? "md:justify-end" : ""
      }`}
    >
      <span className="text-brand-orange">{index}</span>
      <span className="h-px w-8 bg-white/20" />
      <span>{title}</span>
    </div>
  );
}

function Headline({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-sans font-black uppercase tracking-tight text-white text-[26px] md:text-[44px] leading-[1]">
      {children}
    </h3>
  );
}

function Copy({ children, side = "left" }: { children: ReactNode; side?: Side }) {
  return (
    <p
      className={`mt-3 max-w-[32ch] text-sm md:text-base text-white/60 leading-relaxed ${
        side === "right" ? "md:ml-auto" : ""
      }`}
    >
      {children}
    </p>
  );
}

export function ShoeScrolly() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4, restDelta: 0.0005 });

  const keyframes = [0, 0.18, 0.4, 0.62, 0.84, 1];
  const rotate = useTransform(progress, keyframes, [-14, -8, 8, 24, 2, 0]);
  const scale = useTransform(progress, keyframes, [0.78, 0.98, 1.08, 1.42, 1.02, 0.96]);
  const x = useTransform(progress, keyframes, ["0%", "9%", "-10%", "6%", "0%", "0%"]);
  const y = useTransform(progress, keyframes, ["6%", "0%", "-3%", "-14%", "0%", "0%"]);
  const shoeOpacity = useTransform(progress, [0, 0.05, 0.96, 1], [0, 1, 1, 0.85]);

  const background = useTransform(
    progress,
    [0, 0.2, 0.42, 0.64, 0.86, 1],
    ["#050505", "#0a0a12", "#1c0906", "#061410", "#0a0a0a", "#050505"],
  );
  const glow = useTransform(
    progress,
    [0, 0.2, 0.42, 0.64, 0.86, 1],
    [
      "rgba(31, 31, 31, 0.35)",
      "rgba(45, 45, 85, 0.4)",
      "rgba(218, 58, 22, 0.38)",
      "rgba(31, 122, 90, 0.38)",
      "rgba(58, 58, 58, 0.35)",
      "rgba(31, 31, 31, 0.3)",
    ],
  );
  const glowX = useTransform(progress, keyframes, ["50%", "68%", "30%", "58%", "50%", "50%"]);
  const glowStyle = useTransform(
    [glow, glowX],
    ([c, gx]) => `radial-gradient(60% 55% at ${gx} 50%, ${c} 0%, transparent 70%)`,
  );

  const bigTextX = useTransform(scrollYProgress, [0, 1], ["12%", "-58%"]);
  const bigText2X = useTransform(scrollYProgress, [0, 1], ["-55%", "15%"]);
  const barScale = scrollYProgress;

  const motionStyle = reduced
    ? { opacity: shoeOpacity }
    : { rotate, scale, x, y, opacity: shoeOpacity };

  return (
    <div ref={ref} id="drops" className="relative h-[460vh] w-full" aria-label="Shoe showcase">
      {/* Anchor targets inside the scrolly so the menu can land on specific chapters. */}
      <span id="innovation" className="absolute top-[38%] left-0 h-px w-px" aria-hidden="true" />

      <motion.div
        className="sticky top-0 h-[100svh] w-full overflow-hidden"
        style={{ backgroundColor: reduced ? "#0a0a0a" : background }}
      >
        <motion.div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: glowStyle }} />

        <motion.div
          aria-hidden="true"
          style={{ x: reduced ? "0%" : bigTextX }}
          className="absolute top-[12%] left-0 whitespace-nowrap font-sans font-black uppercase leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.14)] text-[26vw] md:text-[22vw] tracking-tighter select-none pointer-events-none"
        >
          NIKE AIR LAB
        </motion.div>
        <motion.div
          aria-hidden="true"
          style={{ x: reduced ? "0%" : bigText2X }}
          className="absolute bottom-[8%] left-0 whitespace-nowrap font-serif italic lowercase leading-none text-white/[0.04] text-[22vw] md:text-[18vw] select-none pointer-events-none"
        >
          just do it just do it
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={motionStyle}
        >
          <img
            src={shoe.src}
            width={shoe.width}
            height={shoe.height}
            alt="The AIR LAB 01 shoe"
            decoding="async"
            fetchPriority="low"
            draggable={false}
            className="w-[88vw] md:w-[62vw] max-w-[1000px] h-auto drop-shadow-[0_60px_80px_rgba(0,0,0,0.75)]"
          />
        </motion.div>

        <Chapter progress={progress} range={[0, 0.16]} side="left">
          <Label index="00" title="The one" />
          <h2 className="text-[30px] md:text-[56px] leading-[1.02] tracking-tight uppercase font-sans font-black">
            <span className="block text-white/40 font-light">Aerospace-Grade</span>
            <span className="block">Infrastructure</span>
            <span className="block font-serif font-normal text-brand-orange normal-case italic mt-2 tracking-normal">
              Directly to urban culture.
            </span>
          </h2>
        </Chapter>

        <Chapter progress={progress} range={[0.18, 0.4]} side="left">
          <Label index="01" title="Cushioning" />
          <TelemetryCard />
        </Chapter>

        <Chapter progress={progress} range={[0.42, 0.62]} side="right">
          <Label index="02" title="Lightweight upper" side="right" />
          <Headline>
            182 grams.
            <span className="block font-serif italic font-normal normal-case text-brand-orange">Nothing wasted.</span>
          </Headline>
          <Copy side="right">
            A single-layer engineered mesh that breathes where you run hot and locks down where you cut.
          </Copy>
        </Chapter>

        <Chapter progress={progress} range={[0.64, 0.84]} side="left">
          <Label index="03" title="Grip" />
          <Headline>
            Traction mapped
            <span className="block font-serif italic font-normal normal-case text-brand-orange">to the stride.</span>
          </Headline>
          <Copy>
            Variable-depth lugs follow the pressure path of your foot: softer at touchdown, sharper at toe-off.
          </Copy>
        </Chapter>

        <Chapter progress={progress} range={[0.86, 1]} side="right">
          <Label index="04" title="Style" side="right" />
          <Headline>
            Built for the track.
            <span className="block font-serif italic font-normal normal-case text-brand-orange">Worn on the street.</span>
          </Headline>
          <Copy side="right">Four finishes. One silhouette. Pick yours below.</Copy>
        </Chapter>

        <div className="absolute right-5 md:right-10 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col items-center gap-3 pointer-events-none">
          <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-white/40 [writing-mode:vertical-rl]">
            Spec
          </span>
          <span className="relative block w-px h-28 bg-white/15 overflow-hidden">
            <motion.span className="absolute inset-0 origin-top bg-brand-orange" style={{ scaleY: barScale }} />
          </span>
        </div>
      </motion.div>
    </div>
  );
}
