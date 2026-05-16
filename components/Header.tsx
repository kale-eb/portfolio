'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function Header() {
  const { scrollY } = useScroll();
  // Fade in a cream background as the user scrolls past the hero
  const bgOpacity = useTransform(scrollY, [0, 80, 140], [0, 0.6, 1]);
  const borderOpacity = useTransform(scrollY, [0, 140], [0, 1]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-[200] px-6 md:px-12 lg:px-16 py-5 flex items-center justify-between"
    >
      {/* Scroll-driven background — transparent on hero, opaque after scroll */}
      <motion.div
        aria-hidden
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-cream-50/95 backdrop-blur-md pointer-events-none"
      />
      <motion.div
        aria-hidden
        style={{ opacity: borderOpacity }}
        className="absolute bottom-0 left-0 right-0 h-px bg-cream-200 pointer-events-none"
      />

      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="relative font-display text-xl tracking-tight cursor-pointer"
      >
        Caleb<span className="text-sky-400 italic">.</span>
      </a>
      <nav className="relative flex items-center gap-7 text-xs uppercase tracking-[0.2em] text-ink-700">
        <a href="#work" className="hover:text-ink-900 transition-colors">Work</a>
        <a href="#about" className="hover:text-ink-900 transition-colors">About</a>
        <a
          href="mailto:calebpongj@gmail.com"
          className="hover:text-ink-900 transition-colors"
        >
          Contact
        </a>
      </nav>
    </motion.header>
  );
}
