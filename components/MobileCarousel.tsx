'use client';

import { projects } from '@/lib/projects';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import ProjectDetail from './ProjectDetail';

export default function MobileCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <section
      id="work-mobile"
      className="md:hidden py-20 px-6 overflow-hidden relative"
    >
      <div className="mb-10">
        <div className="font-sans text-[10px] tracking-[0.35em] uppercase text-sky-500 mb-3">
          ⌖ Selected Work
        </div>
        <div className="flex items-baseline gap-3 font-display">
          <span className="text-4xl text-ink-900">
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <span className="block w-10 h-px bg-ink-300/40" />
          <span className="text-ink-500">
            {String(projects.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      <motion.div
        drag="x"
        dragConstraints={{ left: -(projects.length - 1) * 290, right: 0 }}
        dragElastic={0.1}
        className="flex gap-4 cursor-grab active:cursor-grabbing pb-6"
        animate={{ x: -activeIndex * 290 }}
        transition={{ type: 'spring', stiffness: 250, damping: 30 }}
        onDragEnd={(_, info) => {
          if (info.offset.x < -50 && activeIndex < projects.length - 1) {
            setActiveIndex(activeIndex + 1);
          } else if (info.offset.x > 50 && activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
          }
        }}
      >
        {projects.map((project, i) => (
          <div
            key={project.slug}
            onClick={() => i === activeIndex && setOpenSlug(project.slug)}
            className="flex-shrink-0 w-[280px] h-[440px] rounded-2xl bg-cream-100 border border-cream-200 p-6 flex flex-col relative overflow-hidden"
            style={{
              boxShadow:
                '0 30px 60px -25px rgba(31, 41, 55, 0.18), inset 0 1px 0 rgba(255,255,255,0.4)',
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[3px]"
              style={{
                background: `linear-gradient(90deg, ${project.accent} 0%, transparent 70%)`,
              }}
            />
            <div className="flex justify-between text-[9px] tracking-[0.3em] uppercase text-ink-300">
              <span>{String(i + 1).padStart(2, '0')} · Project</span>
              <span>{project.year}</span>
            </div>
            <div className="mt-5 flex items-center gap-2">
              <div
                className="h-px w-6"
                style={{ background: project.accent }}
              />
              <span
                className="text-[9px] tracking-[0.3em] uppercase"
                style={{ color: project.accent }}
              >
                {project.category}
              </span>
            </div>
            <h3 className="font-display text-5xl mt-3 leading-[0.93] tracking-tight text-ink-900">
              {project.title}
            </h3>
            {project.subtitle && (
              <div className="font-display italic text-base text-sky-500 mt-1">
                {project.subtitle}
              </div>
            )}
            <p className="mt-4 font-sans text-sm text-ink-700 leading-[1.5] text-balance">
              {project.tagline}
            </p>
            <div className="flex-1" />
            <div className="flex flex-wrap gap-1 mb-4">
              {project.tech.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 text-[8px] font-sans tracking-[0.1em] uppercase rounded-full bg-cream-50 border border-cream-200/80 text-ink-500"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-cream-200">
              <div className="flex items-center gap-1.5 text-[10px]">
                <span
                  className={`block w-1.5 h-1.5 rounded-full ${
                    project.status === 'shipped'
                      ? 'bg-emerald-500'
                      : project.status === 'building'
                      ? 'bg-amber-500'
                      : 'bg-sky-300'
                  }`}
                />
                <span className="capitalize text-ink-500 tracking-wide uppercase text-[9px]">
                  {project.status}
                </span>
              </div>
              {i === activeIndex && (
                <span className="text-[9px] uppercase tracking-[0.2em] text-ink-700">
                  Tap →
                </span>
              )}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Dots indicator */}
      <div className="mt-8 flex gap-1.5 justify-center">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-1 rounded-full transition-all ${
              i === activeIndex ? 'w-8 bg-ink-900' : 'w-1 bg-ink-300'
            }`}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>

      <AnimatePresence>
        {openSlug && (
          <ProjectDetail slug={openSlug} onClose={() => setOpenSlug(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
