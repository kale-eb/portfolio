'use client';

import { projects } from '@/lib/projects';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  animate,
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import { playClick } from '@/lib/sound';
import Card from './Card';
import ProjectDetail from './ProjectDetail';

export default function CardStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastBoundary = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // INTRO phase: Vyra zooms in from a "hero" state into the active position,
  // back cards fade in behind. After the intro, normal card shuffle takes over.
  // 0.00 – 0.18 scroll  → Vyra intro animation (held at index 0)
  // 0.18 – 1.00 scroll  → linear shuffle through remaining cards
  const currentFloat = useTransform(
    scrollYProgress,
    [0, 0.18, 1],
    [0, 0, projects.length - 1]
  );

  // 0 (start of work section) → 1 (intro complete). Drives Vyra zoom + back-card fade.
  const introProgress = useTransform(scrollYProgress, [0, 0.18], [0, 1]);

  // Click sound when crossing a card boundary
  useMotionValueEvent(currentFloat, 'change', (latest) => {
    const newActive = Math.max(
      0,
      Math.min(projects.length - 1, Math.round(latest))
    );
    if (newActive !== lastBoundary.current) {
      lastBoundary.current = newActive;
      setActiveIndex(newActive);
      playClick();
    }
  });

  // Tall section so scroll has distance to drive the animation.
  // Extra height to accommodate the Vyra dwell at the start (~22% of total scroll).
  const sectionHeight = `${projects.length * 90 + 200}vh`;

  const HOLD_END = 0.18;
  const SNAP_DURATION = 0.55; // seconds — animation length
  const SNAP_DEBOUNCE = 90; // ms — how long to wait after scroll stops before snapping
  const SNAP_THRESHOLD = 0.06; // ignore if already within 6% of a peak

  // Track active programmatic scroll animation so we can cancel it
  const scrollAnimRef = useRef<{ stop: () => void } | null>(null);

  // Smooth, eased scroll using Framer Motion's animate — consistent feel
  // across browsers, cancellable, and tunable (vs. native scrollTo:smooth).
  const animateScrollTo = useCallback((targetY: number) => {
    if (scrollAnimRef.current) scrollAnimRef.current.stop();
    scrollAnimRef.current = animate(window.scrollY, targetY, {
      duration: SNAP_DURATION,
      ease: [0.22, 1, 0.36, 1], // gentle out-curve
      onUpdate: (v) => window.scrollTo(0, v),
    });
  }, []);

  // Scroll-position that maps to a particular card being active.
  const scrollYForCard = useCallback((targetIndex: number) => {
    if (!containerRef.current) return 0;
    const N = projects.length;
    const p =
      targetIndex <= 0
        ? 0
        : HOLD_END + (targetIndex / (N - 1)) * (1 - HOLD_END);
    const offsetTop = containerRef.current.offsetTop;
    const sectionH = containerRef.current.offsetHeight;
    const scrollable = sectionH - window.innerHeight;
    return offsetTop + p * scrollable;
  }, []);

  // Smooth-scroll to the given card.
  const scrollToCard = useCallback(
    (targetIndex: number) => {
      animateScrollTo(scrollYForCard(targetIndex));
    },
    [animateScrollTo, scrollYForCard]
  );

  // Soft snap: shortly after the user stops scrolling, drift to the nearest
  // card's peak. Fast scrolls still skip multiple cards — we only snap once
  // the user has actually stopped.
  useEffect(() => {
    if (openSlug) return;

    let snapTimeout: ReturnType<typeof setTimeout> | null = null;
    let isProgrammatic = false;

    // User input cancels any running snap so they always have control
    const cancelOnUserInput = () => {
      if (scrollAnimRef.current) {
        scrollAnimRef.current.stop();
        scrollAnimRef.current = null;
      }
      isProgrammatic = false;
    };

    const handleScroll = () => {
      if (isProgrammatic) return;
      if (snapTimeout) clearTimeout(snapTimeout);
      snapTimeout = setTimeout(() => {
        if (!containerRef.current) return;
        const offsetTop = containerRef.current.offsetTop;
        const sectionH = containerRef.current.offsetHeight;
        const scrollable = sectionH - window.innerHeight;
        const sy = window.scrollY;

        if (sy < offsetTop - 40 || sy > offsetTop + scrollable + 40) return;

        const p = Math.max(0, Math.min(1, (sy - offsetTop) / scrollable));
        const N = projects.length;

        const currentF =
          p <= HOLD_END
            ? 0
            : ((p - HOLD_END) / (1 - HOLD_END)) * (N - 1);

        const nearest = Math.round(currentF);
        const distance = Math.abs(currentF - nearest);

        if (distance < SNAP_THRESHOLD) return;

        isProgrammatic = true;
        animateScrollTo(scrollYForCard(nearest));
        setTimeout(() => {
          isProgrammatic = false;
        }, SNAP_DURATION * 1000 + 50);
      }, SNAP_DEBOUNCE);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', cancelOnUserInput, { passive: true });
    window.addEventListener('touchstart', cancelOnUserInput, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', cancelOnUserInput);
      window.removeEventListener('touchstart', cancelOnUserInput);
      if (snapTimeout) clearTimeout(snapTimeout);
      if (scrollAnimRef.current) scrollAnimRef.current.stop();
    };
  }, [animateScrollTo, scrollYForCard, openSlug]);

  return (
    <section
      ref={containerRef}
      id="work"
      className="relative w-full hidden md:block"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden perspective-stage bg-cream-50">
        {/* Vertical side label */}
        <div
          className="absolute top-1/2 left-6 lg:left-8 -translate-y-1/2 z-30 font-sans text-[9px] tracking-[0.5em] uppercase text-ink-300"
          style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}
        >
          2024 — 2026
        </div>

        {/* Ambient accent glow that shifts with active project */}
        <motion.div
          key={`glow-${activeIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ duration: 0.9 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none"
          style={{ background: projects[activeIndex]?.accent }}
        />

        {/* Card stack stage */}
        <div className="absolute inset-0 preserve-3d">
          {projects.map((project, i) => (
            <Card
              key={project.slug}
              project={project}
              index={i}
              currentFloat={currentFloat}
              introProgress={introProgress}
              onClick={() => {
                if (i === activeIndex) setOpenSlug(project.slug);
                else scrollToCard(i);
              }}
            />
          ))}
        </div>

        {/* Bottom-right scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute bottom-12 right-8 lg:right-16 z-30 flex flex-col items-end gap-2"
        >
          <div className="font-sans text-[9px] tracking-[0.4em] uppercase text-ink-300">
            Scroll · Cards shuffle
          </div>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-transparent via-ink-300 to-transparent"
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {openSlug && (
          <ProjectDetail slug={openSlug} onClose={() => setOpenSlug(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
