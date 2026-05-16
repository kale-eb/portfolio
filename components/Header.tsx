'use client';

import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-16 py-6 flex items-center justify-between mix-blend-multiply pointer-events-none"
    >
      <div className="font-display text-xl tracking-tight pointer-events-auto">
        Caleb<span className="text-sky-400 italic">.</span>
      </div>
      <nav className="flex items-center gap-7 text-xs uppercase tracking-[0.2em] text-ink-700 pointer-events-auto">
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
