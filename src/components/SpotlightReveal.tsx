'use client';

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

interface SpotlightRevealProps {
  imageSrc: string;
  videoSrc: string;
  maskId: string;
  /** Plays/pauses the background video. */
  isPlaying?: boolean;
  /** Spotlight radius at full size (desktop, hovered). */
  baseRadius?: number;
  /** Follow the cursor and run the loop only while the hero is on screen. */
  active?: boolean;
  /** Pointer is over the hero: spotlight grows; shrinks when it leaves. */
  hovered?: boolean;
  /** No hover capability (touch): drift the spotlight on a slow loop. */
  autoMotion?: boolean;
  /** prefers-reduced-motion: no auto drift, spotlight parks at the centre. */
  reducedMotion?: boolean;
}

const TRAILS = [
  { stiffness: 260, damping: 30, scale: 1, opacity: 1 },
  { stiffness: 170, damping: 26, scale: 0.86, opacity: 0.8 },
  { stiffness: 120, damping: 24, scale: 0.72, opacity: 0.6 },
  { stiffness: 85, damping: 22, scale: 0.58, opacity: 0.45 },
];

function TrailCircle({
  x,
  y,
  radius,
  gradientId,
  stiffness,
  damping,
  scale,
  opacity,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  radius: MotionValue<number>;
  gradientId: string;
  stiffness: number;
  damping: number;
  scale: number;
  opacity: number;
}) {
  const cx = useSpring(x, { stiffness, damping, mass: 0.7 });
  const cy = useSpring(y, { stiffness, damping, mass: 0.7 });
  const r = useTransform(radius, (v) => Math.max(8, v * scale));
  return (
    <motion.circle cx={cx} cy={cy} r={r} fill={`url(#${gradientId})`} opacity={opacity} />
  );
}

export function SpotlightReveal({
  imageSrc,
  videoSrc,
  maskId,
  isPlaying = false,
  baseRadius = 380,
  active = true,
  hovered = false,
  autoMotion = false,
  reducedMotion = false,
}: SpotlightRevealProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-2000);
  const y = useMotionValue(-2000);
  const radiusTarget = useMotionValue(0);
  const radius = useSpring(radiusTarget, { stiffness: 110, damping: 22, mass: 0.9 });
  const [fitRadius, setFitRadius] = useState(baseRadius);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isPlaying]);

  // Keep the spotlight proportional to the viewport so it never swallows small screens.
  useEffect(() => {
    const fit = () => {
      const minSide = Math.min(window.innerWidth, window.innerHeight);
      setFitRadius(Math.min(baseRadius, Math.max(130, minSide * 0.42)));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [baseRadius]);

  useEffect(() => {
    if (!active) {
      radiusTarget.set(0);
      return;
    }
    const parked = autoMotion || reducedMotion;
    radiusTarget.set(hovered || parked ? fitRadius * (parked ? 0.9 : 1) : fitRadius * 0.55);
  }, [active, hovered, autoMotion, reducedMotion, fitRadius, radiusTarget]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !active) return;

    const rect = () => el.getBoundingClientRect();
    const center = () => {
      const r = rect();
      x.set(r.width / 2);
      y.set(r.height * 0.45);
    };
    center();

    let lastTouch = 0;
    const onPointerMove = (e: PointerEvent) => {
      const r = rect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
      if (e.pointerType !== "mouse") lastTouch = performance.now();
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let raf = 0;
    if (autoMotion && !reducedMotion) {
      const start = performance.now();
      const loop = (now: number) => {
        // Pause the drift for a moment after a touch so the finger can steer it.
        if (now - lastTouch > 1500) {
          const t = (now - start) / 1000;
          const r = rect();
          x.set(r.width * (0.5 + 0.32 * Math.sin(t * 0.45)));
          y.set(r.height * (0.45 + 0.22 * Math.sin(t * 0.7 + 1.2)));
        }
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(raf);
    };
  }, [active, autoMotion, reducedMotion, x, y]);

  const gradientId = `${maskId}-gradient`;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full bg-brand-dark pointer-events-none overflow-hidden select-none"
      id={`spotlight-container-${maskId}`}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        muted
        loop
        playsInline
        preload="metadata"
      />

      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id={gradientId}>
            <stop offset="0%" stopColor="black" stopOpacity="1" />
            <stop offset="40%" stopColor="black" stopOpacity="0.96" />
            <stop offset="72%" stopColor="black" stopOpacity="0.55" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </radialGradient>
          <mask id={maskId} maskContentUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
            <rect width="100%" height="100%" fill="white" />
            {[...TRAILS].reverse().map((t) => (
              <TrailCircle
                key={t.stiffness}
                x={x}
                y={y}
                radius={radius}
                gradientId={gradientId}
                stiffness={t.stiffness}
                damping={t.damping}
                scale={t.scale}
                opacity={t.opacity}
              />
            ))}
          </mask>
        </defs>
        <image
          href={imageSrc}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          mask={`url(#${maskId})`}
        />
      </svg>
    </div>
  );
}
