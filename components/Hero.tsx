'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative isolate min-h-screen flex flex-col px-6 md:px-12 lg:px-16 pt-32 md:pt-36 pb-20 overflow-hidden">
      {/* Cloud background — Vyra brand image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gentle wash so type stays punchy without flattening the clouds */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream-50/15 via-transparent to-cream-50/70" />
      </div>

      {/* Centered content */}
      <div className="relative flex-1 flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="font-display text-[clamp(4.5rem,15vw,14rem)] leading-[0.9] tracking-[-0.03em] text-ink-900"
          style={{ textShadow: '0 1px 0 rgba(255,255,255,0.5)' }}
        >
          Caleb<br />
          <span className="italic font-light text-sky-600">Pong</span>
          <span className="text-ink-900">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="mt-8 md:mt-10 font-display italic text-xl md:text-3xl text-ink-700 leading-[1.4] max-w-3xl text-balance"
        >
          Founder &amp; CTO @{' '}
          <a
            href="https://usevyra.com"
            target="_blank"
            rel="noopener noreferrer"
            className="not-italic font-medium text-ink-900 hover:text-sky-600 transition-colors"
          >
            Vyra
          </a>
          {' · '}
          CS @ Brown &apos;28
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.65 }}
          className="mt-12 md:mt-14 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-ink-700"
        >
          <a
            href="mailto:calebpongj@gmail.com"
            className="group flex items-center gap-2 text-ink-900 hover:gap-3 transition-all font-medium"
          >
            calebpongj@gmail.com
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </a>
          <span className="text-ink-300">/</span>
          <a href="https://github.com/kale-eb" className="hover:text-ink-900 transition-colors">
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/cjpong"
            className="hover:text-ink-900 transition-colors"
          >
            LinkedIn
          </a>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="relative flex items-center justify-between text-[10px] md:text-xs font-sans tracking-[0.3em] uppercase text-ink-500"
      >
        <div className="flex items-center gap-4">
          <span className="block w-12 h-px bg-ink-300" />
          Scroll · Flip through work
        </div>
        <div>2026 — Issue 01</div>
      </motion.div>
    </section>
  );
}
