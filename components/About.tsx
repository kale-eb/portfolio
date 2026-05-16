'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section
      id="about"
      className="relative px-6 md:px-12 lg:px-16 py-32 md:py-48 border-t border-cream-200"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="font-sans text-xs tracking-[0.4em] uppercase text-sky-500 mb-10 flex items-center gap-3"
        >
          <span className="block w-8 h-px bg-sky-400" />
          About
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.3] tracking-[-0.01em] text-ink-900 max-w-4xl text-balance"
        >
          I&apos;m an avid builder, highly invested in the agentic future.
          I&apos;m very interested in creating seamless user experiences in
          consumer products. Currently building the agentic video editor —
          check it out at{' '}
          <a
            href="https://usevyra.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-900 underline underline-offset-[6px] decoration-sky-400 decoration-2 hover:decoration-sky-600 transition-colors"
          >
            usevyra.com
          </a>
          .
        </motion.p>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-24 md:mt-32 pt-12 border-t border-cream-200 flex flex-col md:flex-row items-start md:items-end justify-between gap-6"
        >
          <div>
            <div className="font-sans text-[10px] tracking-[0.4em] uppercase text-sky-500 mb-3">
              Get in touch
            </div>
            <a
              href="mailto:calebpongj@gmail.com"
              className="font-display text-4xl md:text-6xl text-ink-900 hover:text-sky-600 transition-colors inline-flex items-end gap-3 group"
            >
              calebpongj@gmail.com
              <span className="text-2xl md:text-3xl text-sky-500 group-hover:translate-x-2 transition-transform">
                ↗
              </span>
            </a>
          </div>
          <div className="font-sans text-sm text-ink-500 max-w-xs text-balance">
            Open to investor and accelerator conversations.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
