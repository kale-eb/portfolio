'use client';

import { Project } from '@/lib/projects';
import { motion, useTransform, MotionValue } from 'framer-motion';
import Image from 'next/image';
import BeforeAfterSlider from './BeforeAfterSlider';

type CardProps = {
  project: Project;
  index: number;
  currentFloat: MotionValue<number>;
  introProgress: MotionValue<number>;
  onClick: () => void;
};

function interp(x: number, input: number[], output: number[]): number {
  if (x <= input[0]) return output[0];
  if (x >= input[input.length - 1]) return output[output.length - 1];
  for (let i = 0; i < input.length - 1; i++) {
    if (x >= input[i] && x <= input[i + 1]) {
      const t = (x - input[i]) / (input[i + 1] - input[i]);
      return output[i] + t * (output[i + 1] - output[i]);
    }
  }
  return output[0];
}

const O_IN = [-2, -1, 0, 1, 2, 3, 4, 5, 6];
const X_OUT = [-1500, -900, -150, 110, 230, 330, 410, 480, 540];
// Vertically compressed (vs. original) so the back of the deck doesn't
// punch through the fixed header. Active card stays near viewport center.
const Y_OUT = [600, 340, 130, 20, -40, -90, -130, -165, -195];
const Z_OUT = [200, 100, 0, -160, -320, -480, -620, -740, -860];
const RY_OUT = [-30, -22, -16, -16, -16, -16, -16, -16, -16];
const RZ_OUT = [-12, -6, 0, 1.5, 3, 4.5, 6, 7.5, 9];
const OP_IN = [-1.4, -0.7, 0, 6];
const OP_OUT = [0, 0.4, 1, 1];

export default function Card({ project, index, currentFloat, introProgress, onClick }: CardProps) {
  const x = useTransform(currentFloat, (f) => interp(index - f, O_IN, X_OUT));
  const y = useTransform(currentFloat, (f) => interp(index - f, O_IN, Y_OUT));
  const z = useTransform(currentFloat, (f) => interp(index - f, O_IN, Z_OUT));
  const rotateY = useTransform(currentFloat, (f) => interp(index - f, O_IN, RY_OUT));
  const rotateZ = useTransform(currentFloat, (f) => interp(index - f, O_IN, RZ_OUT));
  const baseOpacity = useTransform(currentFloat, (f) => interp(index - f, OP_IN, OP_OUT));
  const zIndex = useTransform(currentFloat, (f) => Math.round(100 - Math.abs(index - f) * 5));

  // Intro: only Vyra zooms (from 1.18 → 1.0). Back cards stay at their natural
  // opacity from the very start — no fade-in (the "ghosted" half-transparent look
  // was distracting at the start of the scroll).
  const introScale = useTransform(introProgress, (p) =>
    index === 0 ? 1 + (1 - p) * 0.18 : 1
  );
  const finalOpacity = baseOpacity;

  // Title visibility — only the currently-active card shows its title above it.
  // Falloff is sharp so we never see two titles at once during transitions.
  const titleOpacity = useTransform(currentFloat, (f) => {
    const o = index - f;
    return Math.max(0, 1 - Math.abs(o) * 2.2);
  });

  return (
    <motion.div
      layoutId={`card-${project.slug}`}
      onClick={onClick}
      style={{
        x,
        y,
        z,
        rotateY,
        rotateZ,
        scale: introScale,
        opacity: finalOpacity,
        zIndex,
        transformStyle: 'preserve-3d',
      }}
      className="absolute top-1/2 left-1/2 -mt-[260px] -ml-[420px] w-[840px] h-[520px] cursor-pointer"
    >
      {/* Floating title — anchored to the card's top-left, inherits the card's 3D transforms.
          Title color uses the project's accent so each card has its own visual identity. */}
      <motion.div
        style={{ opacity: titleOpacity }}
        className="absolute -top-[88px] left-0 pointer-events-none max-w-[680px]"
      >
        <div className="font-sans text-[10px] tracking-[0.45em] uppercase text-ink-500 mb-2">
          {String(index + 1).padStart(2, '0')} · {project.category}
        </div>
        <h4
          className="font-display text-4xl leading-[0.95] tracking-[-0.02em]"
          style={{ color: project.accent }}
        >
          {project.title}
          {project.subtitle && (
            <span
              className="font-display italic font-light text-xl ml-2 opacity-75"
            >
              {project.subtitle}
            </span>
          )}
        </h4>
      </motion.div>

      <div
        className="relative w-full h-full rounded-[20px] overflow-hidden border border-cream-200/60"
        style={{
          boxShadow:
            '0 70px 140px -30px rgba(31, 41, 55, 0.55), 0 35px 70px -40px rgba(31, 41, 55, 0.4), inset 0 1px 0 rgba(255,255,255,0.5)',
          backfaceVisibility: 'hidden',
        }}
      >
        <CardArt project={project} index={index} />
      </div>
    </motion.div>
  );
}

function CardArt({ project, index }: { project: Project; index: number }) {
  switch (project.slug) {
    case 'vyra':
      return <VyraArt project={project} index={index} />;
    case 'omoggle':
      return <OmoggleArt project={project} index={index} />;
    case 'agentic-web-agency':
      return <AgenticArt project={project} index={index} />;
    case 'orchid':
      return <OrchidArt project={project} index={index} />;
    case 'beffanie':
      return <ShineArt project={project} index={index} />;
    case 'video-ascii':
      return <VideoAsciiArt project={project} index={index} />;
    case 'ecg-emotion':
      return <EmotionMLArt project={project} index={index} />;
    default:
      return <DefaultArt project={project} index={index} />;
  }
}

// ─── Per-project art ────────────────────────────────────────

function VyraArt({ project, index }: { project: Project; index: number }) {
  return (
    <div className="relative w-full h-full bg-cream-50">
      <Image
        src="/projects/vyra.png"
        alt="Vyra editor"
        fill
        className="object-cover object-top"
        sizes="840px"
        priority
      />
      {/* Subtle bottom gradient so the title is readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-cream-50/96 via-cream-50/20 to-transparent" />

      <CardMeta project={project} index={index} theme="dark" />

      {/* Top-right "flagship" call-out */}
      <div className="absolute top-6 right-6 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream-50/85 backdrop-blur border border-cream-200/70">
        <span className="block w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink-700">
          Flagship
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-7 left-8 right-8 z-10">
        <div className="font-display text-[80px] leading-[0.92] tracking-[-0.025em] text-ink-900">
          Vyra<span className="text-sky-500">.</span>
        </div>
        <div className="mt-1 font-display italic font-light text-xl text-sky-500">
          {project.subtitle}
        </div>
        <p className="mt-4 font-display italic text-base text-ink-700 leading-snug max-w-[28rem] text-balance">
          The world&apos;s first comprehensive video editor built for agents.
        </p>
        <div className="mt-5 flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase font-sans">
          <span className="text-ink-500">usevyra.com</span>
          <span className="block w-4 h-px bg-ink-300" />
          <span className="text-sky-500">Live beta</span>
        </div>
      </div>
    </div>
  );
}

function OmoggleArt({ project, index }: { project: Project; index: number }) {
  return (
    <div className="relative w-full h-full bg-black">
      <Image
        src="/projects/omoggle.png"
        alt="Omoggle facial scoring demo"
        fill
        className="object-cover"
        sizes="840px"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/30 to-transparent" />
      <CardMeta project={project} index={index} theme="light" />
      <div className="absolute top-1/2 -translate-y-1/2 left-8 max-w-[44%] z-10">
        <TitleBlock project={project} theme="light" />
      </div>
      {/* Headline impact stat — call out the user count */}
      <div className="absolute bottom-7 right-8 z-10 text-right">
        <div className="font-display text-5xl text-white leading-none">2M+</div>
        <div className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/55 mt-2">
          users · live in ranked mode
        </div>
      </div>
    </div>
  );
}

function AgenticArt({ project, index }: { project: Project; index: number }) {
  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #475B70 0%, #2A3340 100%)',
      }}
    >
      {/* Three website thumbnails in a perspective cascade — like a deployment fleet */}
      <div className="absolute inset-0 p-10 flex items-center justify-end" style={{ perspective: '1200px' }}>
        <div className="relative w-[470px] h-[380px]">
          {[1, 2, 3].map((n, i) => (
            <div
              key={n}
              className="absolute inset-0 rounded-lg overflow-hidden border border-white/15 shadow-2xl"
              style={{
                transform: `translate(${i * 28}px, ${i * -24}px) rotateY(${-10 - i * 2}deg) rotateZ(${i * 1.5}deg)`,
                transformOrigin: 'center center',
                zIndex: 3 - i,
              }}
            >
              <Image
                src={`/projects/agentic-${n}.png`}
                alt={`Generated client site ${n}`}
                fill
                className="object-cover object-top"
                sizes="470px"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Title overlay left */}
      <div className="absolute inset-y-0 left-0 w-[44%] p-10 flex flex-col justify-between z-10">
        <CardMeta project={project} index={index} theme="light" inline />
        <div>
          <div className="font-sans text-[10px] tracking-[0.3em] uppercase text-sky-200/80 mb-3">
            <span className="text-emerald-300">●</span>&nbsp; 127 client sites · {'<'}$1.25 each
          </div>
          <TitleBlock project={project} theme="light" compact />
        </div>
      </div>

      {/* Tiny background grid for tech-y feel */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
}

function OrchidArt({ project, index }: { project: Project; index: number }) {
  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #B8A3E8 0%, #8A6FD0 100%)',
      }}
    >
      {/* Three phone screenshots arranged in 3D */}
      <div className="absolute inset-0 flex items-center justify-end pr-4" style={{ perspective: '1500px' }}>
        <div className="relative w-[520px] h-full flex items-center">
          {[
            { n: 1, x: 100, y: 20, rotY: -18, rotZ: 4, z: 0, scale: 0.95 },
            { n: 3, x: 260, y: -10, rotY: -22, rotZ: -2, z: -40, scale: 1.0 },
            { n: 5, x: 410, y: 30, rotY: -26, rotZ: 5, z: -80, scale: 0.92 },
          ].map((p) => (
            <div
              key={p.n}
              className="absolute rounded-2xl overflow-hidden shadow-2xl"
              style={{
                width: '180px',
                height: '380px',
                transform: `translate3d(${p.x}px, ${p.y}px, ${p.z}px) rotateY(${p.rotY}deg) rotateZ(${p.rotZ}deg) scale(${p.scale})`,
                transformOrigin: 'center center',
                boxShadow: '0 30px 60px -10px rgba(0,0,0,0.4)',
              }}
            >
              <Image
                src={`/projects/page${p.n}.jpg`}
                alt={`Orchid screenshot ${p.n}`}
                fill
                className="object-cover object-top"
                sizes="180px"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-y-0 left-0 w-[44%] p-10 flex flex-col justify-between z-10">
        <CardMeta project={project} index={index} theme="light" inline />
        <div>
          <div className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/70 mb-3">
            iOS · Android · Live on App Store
          </div>
          <TitleBlock project={project} theme="light" compact />
        </div>
      </div>
    </div>
  );
}

function ShineArt({ project, index }: { project: Project; index: number }) {
  const videoId = '4Pk3LH094pY';
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#1f2820]">
      <Image
        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
        alt="Beffanie robot navigation demo"
        fill
        className="object-cover"
        sizes="840px"
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/95 backdrop-blur-sm shadow-2xl">
          <svg viewBox="0 0 24 24" className="w-7 h-7 text-ink-900 translate-x-0.5" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      <CardMeta project={project} index={index} theme="light" />
      <div className="absolute bottom-7 left-8 max-w-[55%] z-10">
        <TitleBlock project={project} theme="light" />
        <div className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/60 mt-3">
          Watch the robot navigate · 1:42
        </div>
      </div>
    </div>
  );
}

function VideoAsciiArt({ project, index }: { project: Project; index: number }) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0a0a0a]">
      {/* Mock terminal title bar */}
      <div className="absolute top-0 inset-x-0 z-20 h-9 bg-[#1a1a1a] border-b border-white/10 flex items-center px-4 gap-1.5">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-4 font-mono text-[11px] text-white/40 tracking-wide">
          caleb@portfolio ~ /video-ascii — before / after
        </span>
      </div>

      {/* Before/after slider: auto-animated on the card, non-interactive */}
      <div className="absolute inset-0 mt-9">
        <BeforeAfterSlider
          src="/projects/video-combined.mp4"
          beforeLabel="Original"
          afterLabel="ASCII"
          interactive={false}
          autoAnimate
          className="w-full h-full"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none z-10" />

      <CardMeta project={project} index={index} theme="light" />
      <div className="absolute bottom-7 left-8 max-w-[55%] z-10 pointer-events-none">
        <TitleBlock project={project} theme="light" mono />
        <div className="font-mono text-[10px] tracking-wide text-emerald-300/80 mt-3">
          $ python main.py scientist.mp4
        </div>
      </div>
    </div>
  );
}

function EmotionMLArt({ project, index }: { project: Project; index: number }) {
  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1f3a44 0%, #0a1a20 100%)',
      }}
    >
      {/* ECG waveform SVG full-width */}
      <svg
        viewBox="0 0 840 260"
        preserveAspectRatio="none"
        className="absolute left-0 right-0 top-[58%] -translate-y-1/2 w-full h-[220px]"
      >
        <defs>
          <linearGradient id="ecg-line-grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#5D9CA8" stopOpacity="0" />
            <stop offset="15%" stopColor="#5D9CA8" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#9FD1DB" stopOpacity="1" />
            <stop offset="95%" stopColor="#9FD1DB" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#9FD1DB" stopOpacity="0" />
          </linearGradient>
        </defs>
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={(i + 1) * 84}
            x2={(i + 1) * 84}
            y1="20"
            y2="240"
            stroke="#5D9CA8"
            strokeOpacity="0.06"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1="0"
            x2="840"
            y1={(i + 1) * 50}
            y2={(i + 1) * 50}
            stroke="#5D9CA8"
            strokeOpacity="0.06"
            strokeWidth="1"
          />
        ))}
        <path
          d="M 0 130 L 80 130 L 95 130 L 100 90 L 105 165 L 110 130 L 180 130 L 195 130 L 205 60 L 215 200 L 225 130 L 295 130 L 310 130 L 315 95 L 320 170 L 325 130 L 395 130 L 410 130 L 420 55 L 430 205 L 440 130 L 510 130 L 525 130 L 530 100 L 535 165 L 540 130 L 610 130 L 625 130 L 635 50 L 645 210 L 655 130 L 725 130 L 740 130 L 745 95 L 750 170 L 755 130 L 840 130"
          fill="none"
          stroke="url(#ecg-line-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <CardMeta project={project} index={index} theme="light" />

      <div className="absolute top-16 left-8 max-w-[60%] z-10">
        <TitleBlock project={project} theme="light" compact />
      </div>

      {/* Accuracy callout — top right */}
      <div className="absolute top-20 right-8 text-right z-10">
        <div className="font-display text-6xl text-[#9FD1DB] leading-none tracking-tight">77%</div>
        <div className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/55 mt-2">
          SVM · happy / sad
        </div>
        <div className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/40 mt-1">
          73% · arousal
        </div>
      </div>

      <div className="absolute bottom-7 left-8 right-8 flex justify-between items-end z-10">
        <div className="font-mono text-[10px] tracking-wide text-[#9FD1DB]/70">
          ▎ HRV → SVM · 11 features · n=154 · 13 subjects
        </div>
        <div className="font-display text-white/60 text-sm italic">
          IJHSR · 2024
        </div>
      </div>
    </div>
  );
}

function DefaultArt({ project, index }: { project: Project; index: number }) {
  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        background: `linear-gradient(140deg, ${project.accent} 0%, ${darken(project.accent, 0.3)} 100%)`,
      }}
    >
      <CardMeta project={project} index={index} theme="light" />
      <div className="absolute inset-0 flex items-center justify-center p-10">
        <TitleBlock project={project} theme="light" />
      </div>
    </div>
  );
}

// ─── Shared building blocks ─────────────────────────────────

function CardMeta({
  project,
  index,
  theme,
  inline = false,
}: {
  project: Project;
  index: number;
  theme: 'light' | 'dark';
  inline?: boolean;
}) {
  const fg = theme === 'light' ? 'text-white/75' : 'text-ink-700';
  const dim = theme === 'light' ? 'text-white/55' : 'text-ink-300';

  if (inline) {
    return (
      <div className="flex justify-between items-start z-10 relative">
        <span className={`font-sans text-[10px] tracking-[0.3em] uppercase ${fg}`}>
          {String(index + 1).padStart(2, '0')} · {project.category}
        </span>
        <span className={`font-sans text-[10px] tracking-[0.3em] uppercase ${dim}`}>
          {project.year}
        </span>
      </div>
    );
  }

  return (
    <div className="absolute top-7 inset-x-8 flex justify-between items-start z-10">
      <span className={`font-sans text-[10px] tracking-[0.3em] uppercase ${fg}`}>
        {String(index + 1).padStart(2, '0')} · {project.category}
      </span>
      <span className={`font-sans text-[10px] tracking-[0.3em] uppercase ${dim}`}>
        {project.year}
      </span>
    </div>
  );
}

function TitleBlock({
  project,
  theme,
  compact = false,
  mono = false,
}: {
  project: Project;
  theme: 'light' | 'dark';
  compact?: boolean;
  mono?: boolean;
}) {
  const titleColor = theme === 'light' ? 'text-white' : 'text-ink-900';
  const subColor = theme === 'light' ? 'text-white/70' : 'text-sky-500';
  const taglineColor = theme === 'light' ? 'text-white/80' : 'text-ink-700';
  const titleSize = compact ? 'text-[64px]' : 'text-[80px]';
  const titleFont = mono ? 'font-mono' : 'font-display';

  return (
    <div>
      <h3
        className={`${titleFont} ${titleSize} ${titleColor} leading-[0.92] tracking-[-0.025em]`}
      >
        {project.title}
        {project.subtitle && (
          <span
            className={`block font-display italic font-light text-xl md:text-2xl ${subColor} mt-1`}
          >
            {project.subtitle}
          </span>
        )}
      </h3>
      <p className={`mt-4 font-display italic text-base md:text-lg ${taglineColor} leading-snug max-w-md text-balance`}>
        {project.tagline}
      </p>
    </div>
  );
}

// ─── Color helper ───────────────────────────────────────────

function darken(hex: string, amount: number): string {
  const h = hex.replace('#', '');
  const num = parseInt(h, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.floor(r * (1 - amount)));
  g = Math.max(0, Math.floor(g * (1 - amount)));
  b = Math.max(0, Math.floor(b * (1 - amount)));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}
