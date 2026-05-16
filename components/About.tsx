'use client';

import { motion } from 'framer-motion';

const FACTS = [
  { label: 'Education', value: "Brown University · CS '28" },
  { label: 'Location', value: 'Providence, RI' },
  { label: 'Building', value: 'Vyra · Agentic Web Agency' },
  { label: 'Shipped for', value: 'Omoggle · Orchid' },
  { label: 'Languages', value: 'TS · Python · Swift · Kotlin · WGSL' },
  { label: 'Interests', value: 'AI-first interfaces, video, ML systems' },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative px-6 md:px-12 lg:px-16 py-32 md:py-48 border-t border-cream-200"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="font-sans text-xs tracking-[0.4em] uppercase text-sky-500 mb-8 flex items-center gap-3"
        >
          <span className="block w-8 h-px bg-sky-400" />
          About
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-[-0.02em] text-ink-900 max-w-5xl text-balance"
        >
          I&apos;m a student-founder who builds in public —{' '}
          <span className="italic font-light text-sky-500">
            shipping models, agents, and the interfaces that wrap them.
          </span>
        </motion.h2>

        <div className="mt-20 grid md:grid-cols-2 gap-12 md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-sans text-lg md:text-xl text-ink-700 leading-[1.7] text-balance">
              I&apos;m a computer science student at Brown. My work sits at the
              intersection of machine learning and product — I want models to be
              usable, fast, and shipped, not sitting on a Jupyter notebook.
            </p>
            <p className="font-sans text-lg md:text-xl text-ink-700 leading-[1.7] mt-6 text-balance">
              Right now I&apos;m building{' '}
              <span className="font-display italic text-sky-500">Vyra</span> —
              an AI-native video editor — and the{' '}
              <span className="font-display italic text-sky-500">
                Agentic Web Agency
              </span>
              , an end-to-end system that runs a web design business
              autonomously. Before that I trained the neural network for{' '}
              <span className="font-display italic text-sky-500">Omoggle</span>{' '}
              and shipped{' '}
              <span className="font-display italic text-sky-500">Orchid</span>{' '}
              on iOS and Android.
            </p>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 gap-y-7"
          >
            {FACTS.map((f) => (
              <div
                key={f.label}
                className="grid grid-cols-[100px_1fr] md:grid-cols-[140px_1fr] gap-4 items-baseline pb-5 border-b border-cream-200"
              >
                <dt className="font-sans text-[10px] tracking-[0.3em] uppercase text-ink-300">
                  {f.label}
                </dt>
                <dd className="font-display text-base md:text-lg text-ink-900 leading-snug">
                  {f.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 md:mt-32 pt-12 border-t border-cream-200 flex flex-col md:flex-row items-start md:items-end justify-between gap-6"
        >
          <div>
            <div className="font-sans text-[10px] tracking-[0.4em] uppercase text-sky-500 mb-3">
              Get in touch
            </div>
            <a
              href="mailto:calebpongj@gmail.com"
              className="font-display text-4xl md:text-6xl text-ink-900 hover:text-sky-500 transition-colors inline-flex items-end gap-3 group"
            >
              calebpongj@gmail.com
              <span className="text-2xl md:text-3xl text-sky-500 group-hover:translate-x-2 transition-transform">
                ↗
              </span>
            </a>
          </div>
          <div className="font-sans text-sm text-ink-500 max-w-xs text-balance">
            Open to investor / accelerator conversations and select consulting
            on shipping ML to production.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
