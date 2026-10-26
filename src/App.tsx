'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BubbleMenu, type MenuItem } from "./components/BubbleMenu";
import { IntroGate } from "./components/IntroGate";
import { Hero } from "./components/Hero";
import { ShoeScrolly } from "./components/ShoeScrolly";
import { Colorways } from "./components/Colorways";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";

const MENU_ITEMS: MenuItem[] = [
  { label: "Drops", href: "#drops", rotation: -6, hoverStyles: { bgColor: "#DA3A16", textColor: "#ffffff" } },
  { label: "Innovation", href: "#innovation", rotation: 4, hoverStyles: { bgColor: "#3b82f6", textColor: "#ffffff" } },
  { label: "Collections", href: "#colorways", rotation: -4, hoverStyles: { bgColor: "#10b981", textColor: "#ffffff" } },
  { label: "Community", href: "#community", rotation: 6, hoverStyles: { bgColor: "#f59e0b", textColor: "#000000" } },
  { label: "Labs", href: "#labs", rotation: -3, hoverStyles: { bgColor: "#8b5cf6", textColor: "#ffffff" } },
];

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [introChecked, setIntroChecked] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("introSeen")) {
      setIntroComplete(true);
      setShowContent(true);
    }
    setIntroChecked(true);
  }, []);

  const handleIntroExitStart = () => {};

  const handleIntroComplete = () => {
    sessionStorage.setItem("introSeen", "true");
    setIntroComplete(true);
    // Slight delay for the hero emergence animation
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <>
      {/* PHASE 1: Intro Gate - covers entire viewport until video completes */}
      {introChecked && !introComplete && (
        <IntroGate onExitStart={handleIntroExitStart} onComplete={handleIntroComplete} />
      )}

      {showContent && <BubbleMenu items={MENU_ITEMS} />}

      {/* Main content - emerges from behind the intro */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="relative w-full flex flex-col bg-brand-dark overflow-x-clip select-none font-sans"
            id="app-viewport-container"
            style={{ transformOrigin: "50% 50vh" }}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.45, 0, 0.1, 1] } }}
          >
            <Hero />
            <ShoeScrolly />
            <Colorways />
            <CTA />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
