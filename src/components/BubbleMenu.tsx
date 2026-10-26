'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'motion/react';

export interface MenuItem {
  label: string;
  /** Section anchor, e.g. "#drops". */
  href: string;
  rotation?: number;
  hoverStyles?: { bgColor: string; textColor: string };
}

interface BubbleMenuProps {
  items: MenuItem[];
}

const listVariants: Variants = {
  hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};

const bubbleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.4, y: 28, transition: { duration: 0.22, ease: 'easeIn' } },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 380, damping: 26 },
  },
};

export function scrollToAnchor(href: string) {
  const id = href.replace(/^#/, '');
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  history.replaceState(null, '', `#${id}`);
}

export function BubbleMenu({ items }: BubbleMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstItemRef = useRef<HTMLAnchorElement>(null);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    const focusTimer = setTimeout(() => firstItemRef.current?.focus(), 250);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      clearTimeout(focusTimer);
      toggleRef.current?.focus({ preventScroll: true });
    };
  }, [isOpen, close]);

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    close();
    // Let the body scroll-lock release before scrolling.
    setTimeout(() => scrollToAnchor(href), 60);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 md:px-12 py-5 md:py-7 pointer-events-none mix-blend-difference text-white"
        id="site-header"
      >
        <a
          href="#hero"
          onClick={(e) => handleNavigate(e, '#hero')}
          className="pointer-events-auto font-sans font-bold tracking-[0.3em] text-xs md:text-sm uppercase rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          aria-label="NIKE LAB, back to top"
        >
          NIKE // LAB
        </a>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="pointer-events-auto group relative w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/70 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-[transform,background-color] duration-300 hover:scale-105 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="site-menu"
          id="menu-toggle-btn"
        >
          <span
            className={`block h-[2px] bg-white transition-all duration-300 ${
              isOpen ? 'w-5 translate-y-[4px] rotate-45' : 'w-5'
            }`}
          />
          <span
            className={`block h-[2px] bg-white transition-all duration-300 ${
              isOpen ? 'w-5 -translate-y-[4px] -rotate-45' : 'w-3 self-end mr-3.5 md:mr-4 group-hover:w-5 group-hover:mr-3.5 md:group-hover:mr-4'
            }`}
          />
        </button>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.15 } }}
            transition={{ duration: 0.35 }}
            onClick={close}
            className="fixed inset-0 z-40 bg-brand-dark/85 backdrop-blur-2xl flex items-center justify-center px-5"
          >
            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={(e) => e.stopPropagation()}
              className="flex flex-wrap items-center justify-center gap-3 md:gap-5 max-w-4xl list-none"
            >
              {items.map((item, idx) => {
                const rotation = item.rotation ?? 0;
                return (
                  <motion.li key={item.label} variants={bubbleVariants} style={{ rotate: rotation }}>
                    <motion.a
                      ref={idx === 0 ? firstItemRef : undefined}
                      href={item.href}
                      onClick={(e) => handleNavigate(e, item.href)}
                      initial={false}
                      whileHover={{
                        rotate: -rotation,
                        scale: 1.06,
                        backgroundColor: item.hoverStyles?.bgColor ?? '#ffffff',
                        color: item.hoverStyles?.textColor ?? '#000000',
                      }}
                      whileFocus={{
                        rotate: -rotation,
                        scale: 1.06,
                        backgroundColor: item.hoverStyles?.bgColor ?? '#ffffff',
                        color: item.hoverStyles?.textColor ?? '#000000',
                      }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                      style={{ backgroundColor: '#ffffff', color: '#000000' }}
                      className="block px-7 py-3.5 md:px-10 md:py-5 rounded-full font-sans font-bold text-2xl md:text-4xl tracking-tight shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                      id={`bubble-menu-item-${idx}`}
                    >
                      {item.label}
                    </motion.a>
                  </motion.li>
                );
              })}
            </motion.ul>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
              className="absolute bottom-8 inset-x-0 text-center text-[10px] font-mono tracking-[0.3em] uppercase text-white pointer-events-none"
            >
              Esc to close
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
