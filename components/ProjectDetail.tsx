'use client';

import { projects, Project } from '@/lib/projects';
import { motion } from 'framer-motion';
import Image from 'next/image';
import BeforeAfterSlider from './BeforeAfterSlider';

export default function ProjectDetail({
  slug,
  onClose,
}: {
  slug: string;
  onClose: () => void;
}) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-cream-50 overflow-y-auto overscroll-contain"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-7 right-6 md:right-12 z-50 w-11 h-11 rounded-full bg-cream-100/95 backdrop-blur-md border border-cream-200 flex items-center justify-center hover:bg-cream-200 transition-colors group shadow-sm"
        aria-label="Close"
      >
        <svg
          className="w-4 h-4 text-ink-900 group-hover:rotate-90 transition-transform duration-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <motion.div layoutId={`card-${project.slug}`} className="min-h-screen">
        <DetailBody project={project} onClose={onClose} />
      </motion.div>
    </motion.div>
  );
}

function DetailBody({ project, onClose }: { project: Project; onClose: () => void }) {
  switch (project.slug) {
    case 'vyra':
      return <VyraDetail project={project} onClose={onClose} />;
    case 'omoggle':
      return <OmoggleDetail project={project} onClose={onClose} />;
    case 'agentic-web-agency':
      return <AgenticDetail project={project} onClose={onClose} />;
    case 'orchid':
      return <OrchidDetail project={project} onClose={onClose} />;
    case 'beffanie':
      return <ShineDetail project={project} onClose={onClose} />;
    case 'video-ascii':
      return <VideoAsciiDetail project={project} onClose={onClose} />;
    case 'ecg-emotion':
      return <EmotionMLDetail project={project} onClose={onClose} />;
    default:
      return <FallbackDetail project={project} onClose={onClose} />;
  }
}

// ─── Shared building blocks ─────────────────────────────────

function Eyebrow({ project, theme = 'dark' }: { project: Project; theme?: 'light' | 'dark' }) {
  const c = theme === 'light' ? 'text-white/60' : 'text-ink-300';
  return (
    <div className={`flex items-baseline justify-between mb-6 font-sans text-[10px] md:text-xs tracking-[0.35em] uppercase ${c}`}>
      <span>{project.category}</span>
      <span>{project.year}</span>
    </div>
  );
}

function AccentRule({ project, className = '' }: { project: Project; className?: string }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 0.4, duration: 0.7 }}
      className={`h-px w-24 origin-left ${className}`}
      style={{ background: project.accent }}
    />
  );
}

function MetricsGrid({ project }: { project: Project }) {
  if (!project.metrics?.length) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, duration: 0.7 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-y border-cream-200 my-16 md:my-20"
    >
      {project.metrics.map((m, i) => (
        <div key={m.label} className="relative">
          {i > 0 && (
            <div className="hidden md:block absolute -left-4 top-2 bottom-2 w-px bg-cream-200" />
          )}
          <div className="font-display text-4xl md:text-5xl tracking-tight text-ink-900">
            {m.value}
          </div>
          <div className="mt-3 font-sans text-[10px] uppercase tracking-[0.3em] text-ink-300">
            {m.label}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function TechSidebar({ project }: { project: Project }) {
  return (
    <div className="space-y-10">
      <div>
        <div className="font-sans text-[10px] tracking-[0.35em] uppercase text-ink-300 mb-4">Stack</div>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-[10px] font-sans font-medium tracking-[0.1em] uppercase rounded-full bg-cream-100 border border-cream-200 text-ink-700"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {project.links && project.links.length > 0 && (
        <div>
          <div className="font-sans text-[10px] tracking-[0.35em] uppercase text-ink-300 mb-4">Links</div>
          <div className="flex flex-col gap-2">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-ink-900 hover:text-sky-500 transition-colors group flex items-center gap-2"
              >
                <span className="underline underline-offset-4 decoration-cream-300 group-hover:decoration-sky-500">
                  {l.label}
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
              </a>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="font-sans text-[10px] tracking-[0.35em] uppercase text-ink-300 mb-4">Status</div>
        <div className="flex items-center gap-2.5">
          <span
            className={`block w-2 h-2 rounded-full ${
              project.status === 'shipped'
                ? 'bg-emerald-500'
                : project.status === 'building'
                ? 'bg-amber-500'
                : 'bg-sky-300'
            }`}
          />
          <span className="capitalize font-sans text-sm text-ink-700 tracking-wide">
            {project.status === 'coming' ? 'Write-up coming' : project.status}
          </span>
        </div>
      </div>
    </div>
  );
}

function FooterNav({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.95, duration: 0.6 }}
      className="mt-24 pt-10 border-t border-cream-200 flex items-center justify-between"
    >
      <button
        onClick={onClose}
        className="font-sans text-sm text-ink-500 hover:text-ink-900 transition-colors group flex items-center gap-2"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Back to work
      </button>
      <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-ink-300">
        {project.category}
      </span>
    </motion.div>
  );
}

// ─── Per-project bodies ─────────────────────────────────────

function VyraDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div>
      {/* Hero — full-width Vyra landing screenshot */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="relative w-full h-[80vh] bg-cream-50 overflow-hidden"
      >
        <Image
          src="/projects/vyra.png"
          alt="Vyra editor"
          fill
          className="object-cover object-top"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cream-50 via-cream-50/10 to-transparent" />
        <div className="absolute bottom-10 left-6 md:left-12 lg:left-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            <div className="font-sans text-[10px] tracking-[0.35em] uppercase text-sky-500 mb-3 flex items-center gap-3">
              <span className="block w-6 h-px bg-sky-400" />
              {project.category} · {project.year}
            </div>
            <h1 className="font-display text-[clamp(4rem,12vw,11rem)] leading-[0.9] tracking-[-0.03em] text-ink-900">
              Vyra<span className="text-sky-500">.</span>
            </h1>
            <p className="mt-4 font-display italic font-light text-2xl md:text-3xl text-sky-500">
              {project.subtitle}
            </p>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        {/* Big positioning statement */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-20"
        >
          <p className="font-display text-3xl md:text-5xl leading-[1.1] tracking-[-0.02em] text-ink-900 text-balance max-w-4xl">
            The <em className="italic font-light text-sky-500">world&apos;s first comprehensive video editor</em> built
            for agents — and humans — from day one.
          </p>
          <p className="mt-8 font-sans text-lg md:text-xl text-ink-700 leading-[1.6] max-w-3xl text-balance">
            Every other &quot;AI video tool&quot; is a chat wrapper that emits a render. Vyra is the editor
            itself, with every operation — masks, effects, keyframes, audio sync, time remap, motion
            graphics — exposed over MCP. Any MCP-compatible agent can drive it. Drag a clip yourself
            or hand it to your agent; the result is the same frame-accurate, reversible edit on the
            same timeline.
          </p>
        </motion.div>

        <MetricsGrid project={project} />

        {/* What you can do */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          className="mb-20"
        >
          <h2 className="font-sans text-[10px] tracking-[0.35em] uppercase text-ink-300 mb-8">
            What Vyra ships today
          </h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {VYRA_FEATURES.map((f) => (
              <div key={f.title} className="pb-5 border-b border-cream-200">
                <div className="font-display text-2xl md:text-3xl text-ink-900 tracking-tight">
                  {f.title}
                </div>
                <p className="mt-2 font-sans text-base text-ink-700 leading-[1.55]">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Architecture */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="grid md:grid-cols-3 gap-12 md:gap-20"
        >
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="font-sans text-[10px] tracking-[0.35em] uppercase text-ink-300 mb-3">
                MCP-first
              </h2>
              <p className="font-display italic text-xl md:text-2xl text-ink-700 leading-[1.4] text-balance">
                Vyra exposes its full toolset as MCP servers. Connect from Claude.ai, Claude Code,
                Cursor, or any custom client — no SDK, no integration work. The agent sees exactly
                what a human sees, and edits land on the same shared timeline.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-[10px] tracking-[0.35em] uppercase text-ink-300 mb-3">
                Under the hood
              </h2>
              <p className="font-sans text-base md:text-[17px] text-ink-700 leading-[1.75] text-balance">
                React 18 + Vite + Tailwind frontend. Remotion is the render engine — every preview
                frame is a React component, so animations are just state. DesignCombo powers the
                multi-track timeline. WebGL shaders run the video effects; CSS filters cover simple
                ones. State syncs to Supabase Postgres with RLS-enforced multi-tenancy. SSE
                (AG-UI pattern) powers the in-app agent surface; MCP servers expose the same
                tools externally. SAM2 powers smart object masks; keyframe interpolation runs
                across mask paths, shapes, and properties alike.
              </p>
            </section>
          </div>
          <TechSidebar project={project} />
        </motion.section>

        {/* Big CTA to usevyra.com */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-20 pt-12 border-t border-cream-200"
        >
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <div className="font-sans text-[10px] tracking-[0.4em] uppercase text-sky-500 mb-3">
                Try the live beta
              </div>
              <a
                href="https://usevyra.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-5xl md:text-7xl text-ink-900 hover:text-sky-500 transition-colors inline-flex items-end gap-3 group"
              >
                usevyra.com
                <span className="text-2xl md:text-3xl text-sky-500 group-hover:translate-x-2 transition-transform">
                  ↗
                </span>
              </a>
            </div>
            <p className="font-sans text-sm text-ink-500 max-w-xs text-balance">
              Closed beta — talk to Caleb for access or investor materials.
            </p>
          </div>
        </motion.div>

        <FooterNav project={project} onClose={onClose} />
      </div>
    </div>
  );
}

const VYRA_FEATURES: { title: string; body: string }[] = [
  {
    title: '16 video & image effects',
    body:
      'WebGL-shaded — chromatic aberration, glitch, VHS, lens distortion, film grain, lumetri color, gaussian blur, glow, halftone, posterize, sharpen, vignette, plus more. CSS-filter fallbacks for lighter effects.',
  },
  {
    title: 'Smart masks (SAM2)',
    body:
      'AI segmentation that tracks an object across frames. No keyframing required — pick the subject and Vyra masks the rest of the shot.',
  },
  {
    title: 'Vector mask system',
    body:
      'Rectangle, ellipse, and pen-tool bezier masks. Animate the path, feather the edges, composite with blend modes — one primitive handles cropping, isolation, and complex composition.',
  },
  {
    title: 'Keyframe interpolation',
    body:
      'Any property — position, scale, opacity, effect parameter, mask path, shape path — animates with eased keyframes. Mask paths interpolate point-by-point.',
  },
  {
    title: 'Time remap',
    body:
      'Per-clip speed ramps. Slow-mo, hold frames, reverse, ease in and out of a freeze.',
  },
  {
    title: 'Audio sync',
    body:
      'Auto-align cuts to beat markers, swap takes while keeping audio locked, and run lip-sync swaps without rebuilding the timeline.',
  },
  {
    title: 'Captions',
    body:
      'Auto-transcribed captions with a full style template library, per-word emphasis, and on-canvas drag editing.',
  },
  {
    title: 'Motion graphics',
    body:
      'A dedicated motion-graphic editor — text reveals, layout templates, animated shapes — all driven by the same keyframe engine.',
  },
];

function OmoggleDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div>
      {/* Hero — cinematic full-bleed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="relative w-full h-[75vh] bg-black overflow-hidden"
      >
        <Image src="/projects/omoggle.png" alt="Omoggle" fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream-50 via-cream-50/0 to-transparent" />
        <div className="absolute bottom-12 left-6 md:left-12 lg:left-16 max-w-[60%]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            <div className="font-sans text-[10px] tracking-[0.35em] uppercase text-white/60 mb-3">
              {project.category} · Shipped for Omoggle
            </div>
            <h1 className="font-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.92] tracking-[-0.025em] text-white">
              {project.title}
            </h1>
            <p className="mt-4 font-display italic text-xl md:text-2xl text-white/80 max-w-2xl text-balance">
              {project.tagline}
            </p>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        <MetricsGrid project={project} />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="grid md:grid-cols-3 gap-12 md:gap-20"
        >
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="font-sans text-[10px] tracking-[0.35em] uppercase text-ink-300 mb-3">The model</h2>
              <p className="font-display italic text-xl md:text-2xl text-ink-700 leading-[1.4] text-balance">
                {project.description}
              </p>
            </section>

            <section>
              <h2 className="font-sans text-[10px] tracking-[0.35em] uppercase text-ink-300 mb-3">In production</h2>
              <p className="font-sans text-base md:text-[17px] text-ink-700 leading-[1.75] text-balance">
                {project.details}
              </p>
            </section>

            <section className="grid grid-cols-2 gap-6 pt-6">
              <ArchCard title="Architecture">EfficientNet-B0 backbone · 5.3M params · quantized to 7.7MB ONNX</ArchCard>
              <ArchCard title="Datasets">SCUT-FBP5500 · MEBeauty · FairFace (model-labeled aug.)</ArchCard>
              <ArchCard title="Detection">MediaPipe face landmarks at 10 FPS</ArchCard>
              <ArchCard title="Runtime">ONNX Runtime Web · pure browser inference</ArchCard>
            </section>
          </div>
          <TechSidebar project={project} />
        </motion.div>

        <FooterNav project={project} onClose={onClose} />
      </div>
    </div>
  );
}

function AgenticDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div>
      {/* Hero — three client sites in a row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="relative w-full bg-gradient-to-br from-sky-500 to-ink-900 overflow-hidden"
        style={{ minHeight: '70vh' }}
      >
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="font-sans text-[10px] tracking-[0.35em] uppercase text-sky-200 mb-3">
              {project.category} · {project.year}
            </div>
            <h1 className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.92] tracking-[-0.025em] text-white">
              Agentic <span className="italic font-light text-sky-200">Web Agency</span>
            </h1>
            <p className="mt-6 font-display italic text-xl md:text-3xl text-white/80 max-w-3xl text-balance leading-[1.3]">
              {project.tagline}
            </p>
          </motion.div>

          {/* 3 sites grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16"
          >
            {[1, 2, 3].map((n) => (
              <div key={n} className="aspect-[16/10] relative rounded-xl overflow-hidden border border-white/15 shadow-2xl">
                <Image src={`/projects/agentic-${n}.png`} alt={`Client site ${n}`} fill className="object-cover object-top" sizes="33vw" />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        <MetricsGrid project={project} />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="grid md:grid-cols-3 gap-12 md:gap-20"
        >
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="font-sans text-[10px] tracking-[0.35em] uppercase text-ink-300 mb-3">The system</h2>
              <p className="font-display italic text-xl md:text-2xl text-ink-700 leading-[1.4] text-balance">
                {project.description}
              </p>
            </section>

            <section>
              <h2 className="font-sans text-[10px] tracking-[0.35em] uppercase text-ink-300 mb-4">The pipeline</h2>
              <ol className="space-y-2.5">
                {[
                  ['Source', 'SerpAPI + Google Maps · pull local business leads by city + category'],
                  ['Research', 'Firecrawl scrapes Yelp, Instagram, Facebook · Claude Haiku writes a brief'],
                  ['Generate', 'Claude Sonnet via Claude Code CLI · builds a custom Next.js static export'],
                  ['Verify', 'pnpm run build · auto-retry on failure'],
                  ['Deploy', 'Cloudflare Pages · free .pages.dev URL'],
                  ['Review', 'Operator dashboard · approve/reject/deploy'],
                ].map(([step, desc], i) => (
                  <li key={step} className="flex gap-5 py-3 border-b border-cream-200/60 last:border-0">
                    <span className="font-display text-2xl text-sky-500 tracking-tight w-10 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="font-display text-xl text-ink-900">{step}</div>
                      <div className="font-sans text-sm text-ink-500 mt-0.5">{desc}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="font-sans text-[10px] tracking-[0.35em] uppercase text-ink-300 mb-3">Why it matters</h2>
              <p className="font-sans text-base md:text-[17px] text-ink-700 leading-[1.75] text-balance">
                {project.details}
              </p>
            </section>
          </div>
          <TechSidebar project={project} />
        </motion.div>

        <FooterNav project={project} onClose={onClose} />
      </div>
    </div>
  );
}

function OrchidDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="relative w-full overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #B8A3E8 0%, #8A6FD0 100%)',
          minHeight: '80vh',
        }}
      >
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="text-center mb-12"
          >
            <div className="font-sans text-[10px] tracking-[0.35em] uppercase text-white/70 mb-3">
              {project.category} · iOS · Android
            </div>
            <h1 className="font-display text-[clamp(3.5rem,11vw,10rem)] leading-[0.92] tracking-[-0.025em] text-white">
              {project.title}
            </h1>
            <p className="mt-3 font-display italic font-light text-xl md:text-2xl text-white/85">
              {project.subtitle}
            </p>
            <p className="mt-6 font-sans text-base md:text-lg text-white/80 max-w-2xl mx-auto text-balance">
              {project.tagline}
            </p>
          </motion.div>

          {/* Horizontal scrolling app-store screenshots */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="flex gap-4 overflow-x-auto pb-6 px-2 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none' }}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="flex-shrink-0 w-[260px] md:w-[320px] aspect-[1242/2688] relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                <Image src={`/projects/page${n}.jpg`} alt={`Orchid page ${n}`} fill className="object-cover" sizes="320px" />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="grid md:grid-cols-3 gap-12 md:gap-20"
        >
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="font-sans text-[10px] tracking-[0.35em] uppercase text-ink-300 mb-3">The idea</h2>
              <p className="font-display italic text-xl md:text-2xl text-ink-700 leading-[1.4] text-balance">
                {project.description}
              </p>
            </section>

            <section>
              <h2 className="font-sans text-[10px] tracking-[0.35em] uppercase text-ink-300 mb-3">Cross-platform shipping</h2>
              <p className="font-sans text-base md:text-[17px] text-ink-700 leading-[1.75] text-balance">
                {project.details}
              </p>
            </section>

            <section className="grid grid-cols-2 gap-6 pt-6">
              <ArchCard title="iOS">SwiftUI · WidgetKit · Firebase</ArchCard>
              <ArchCard title="Android">Jetpack Compose · Firebase</ArchCard>
              <ArchCard title="Backend">Firestore + Cloud Storage + Auth</ArchCard>
              <ArchCard title="Lock screens">Native widget extension on both platforms</ArchCard>
            </section>
          </div>
          <TechSidebar project={project} />
        </motion.div>

        <FooterNav project={project} onClose={onClose} />
      </div>
    </div>
  );
}

function ShineDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="relative w-full bg-[#0f1a14] pt-28 pb-12 px-6 md:px-12"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mb-10"
          >
            <div className="font-sans text-[10px] tracking-[0.35em] uppercase text-emerald-200/70 mb-3">
              {project.category} · {project.year}
            </div>
            <h1 className="font-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.92] tracking-[-0.025em] text-white">
              {project.title}
            </h1>
            <p className="mt-5 font-display italic text-xl md:text-3xl text-emerald-100/90 max-w-3xl text-balance leading-[1.3]">
              {project.tagline}
            </p>
          </motion.div>

          {/* YouTube embed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            <iframe
              src="https://www.youtube.com/embed/4Pk3LH094pY"
              title="Beffanie demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="grid md:grid-cols-3 gap-12 md:gap-20"
        >
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="font-sans text-[10px] tracking-[0.35em] uppercase text-ink-300 mb-3">The problem</h2>
              <p className="font-display italic text-xl md:text-2xl text-ink-700 leading-[1.4] text-balance">
                {project.description}
              </p>
            </section>
            <section>
              <h2 className="font-sans text-[10px] tracking-[0.35em] uppercase text-ink-300 mb-3">The approach</h2>
              <p className="font-sans text-base md:text-[17px] text-ink-700 leading-[1.75] text-balance">
                {project.details}
              </p>
            </section>
          </div>
          <TechSidebar project={project} />
        </motion.div>

        <FooterNav project={project} onClose={onClose} />
      </div>
    </div>
  );
}

function VideoAsciiDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="relative w-full bg-[#0a0a0a] pt-28 pb-12 px-6 md:px-12"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mb-10"
          >
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-emerald-400/80 mb-3">
              $ ./{project.slug}
            </div>
            <h1 className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-[0.92] tracking-[-0.025em] text-white">
              {project.title}
              <span className="font-mono font-light text-2xl text-emerald-400 ml-3">.py</span>
            </h1>
            <p className="mt-5 font-display italic text-xl md:text-2xl text-white/80 max-w-3xl text-balance">
              {project.tagline}
            </p>
          </motion.div>

          {/* Interactive before/after slider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <div className="h-9 bg-[#1a1a1a] border-b border-white/10 flex items-center px-4 gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-4 font-mono text-[11px] text-white/40 tracking-wide">
                caleb@portfolio ~ /video-ascii — drag to compare
              </span>
            </div>
            <div className="aspect-[1920/810] bg-black">
              <BeforeAfterSlider
                src="/projects/video-combined.mp4"
                beforeLabel="Original"
                afterLabel="ASCII"
                initial={50}
                interactive
                className="w-full h-full"
              />
            </div>
          </motion.div>
          <p className="mt-4 font-mono text-[11px] text-white/40 text-center tracking-wide">
            ← drag the divider to see the same frame on both sides →
          </p>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="grid md:grid-cols-3 gap-12 md:gap-20"
        >
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="font-sans text-[10px] tracking-[0.35em] uppercase text-ink-300 mb-3">What it is</h2>
              <p className="font-display italic text-xl md:text-2xl text-ink-700 leading-[1.4] text-balance">
                {project.description}
              </p>
            </section>
            <section>
              <h2 className="font-sans text-[10px] tracking-[0.35em] uppercase text-ink-300 mb-3">How it works</h2>
              <p className="font-sans text-base md:text-[17px] text-ink-700 leading-[1.75] text-balance">
                {project.details}
              </p>
            </section>
            <section className="grid grid-cols-2 gap-6 pt-6">
              <ArchCard title="Decoding">OpenCV reads frames · Pillow rasterizes glyphs</ArchCard>
              <ArchCard title="Mapping">Luminance → ASCII ramp (10 chars)</ArchCard>
              <ArchCard title="Audio">moviepy extracts · synced playback via stdout</ArchCard>
              <ArchCard title="Persistence">Save/load compressed ASCII video files</ArchCard>
            </section>
          </div>
          <TechSidebar project={project} />
        </motion.div>

        <FooterNav project={project} onClose={onClose} />
      </div>
    </div>
  );
}

function EmotionMLDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="relative w-full overflow-hidden pt-32 pb-16 px-6 md:px-12"
        style={{ background: 'linear-gradient(135deg, #1f3a44 0%, #0a1a20 100%)' }}
      >
        <svg viewBox="0 0 1600 240" preserveAspectRatio="none" className="absolute left-0 right-0 bottom-0 w-full h-[180px]">
          <defs>
            <linearGradient id="ecg-detail-grad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#5D9CA8" stopOpacity="0" />
              <stop offset="50%" stopColor="#9FD1DB" stopOpacity="1" />
              <stop offset="100%" stopColor="#9FD1DB" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 0 120 L 80 120 L 95 120 L 100 80 L 105 155 L 110 120 L 180 120 L 195 120 L 205 50 L 215 190 L 225 120 L 295 120 L 310 120 L 315 85 L 320 160 L 325 120 L 395 120 L 410 120 L 420 45 L 430 195 L 440 120 L 510 120 L 525 120 L 530 90 L 535 155 L 540 120 L 610 120 L 625 120 L 635 40 L 645 200 L 655 120 L 725 120 L 740 120 L 745 85 L 750 160 L 755 120 L 825 120 L 840 120 L 850 60 L 860 180 L 870 120 L 940 120 L 955 120 L 960 90 L 965 155 L 970 120 L 1040 120 L 1055 120 L 1065 45 L 1075 195 L 1085 120 L 1155 120 L 1170 120 L 1175 85 L 1180 160 L 1185 120 L 1255 120 L 1270 120 L 1280 50 L 1290 190 L 1300 120 L 1370 120 L 1385 120 L 1390 90 L 1395 155 L 1400 120 L 1600 120"
            fill="none"
            stroke="url(#ecg-detail-grad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#9FD1DB]/70 mb-3">
              {project.category} · {project.year}
            </div>
            <h1 className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-[0.92] tracking-[-0.025em] text-white">
              Emotion <span className="font-light italic text-[#9FD1DB]">ML</span>
            </h1>
            <p className="mt-4 font-display italic text-lg md:text-xl text-white/65">
              {project.subtitle}
            </p>
            <p className="mt-6 font-display italic text-xl md:text-2xl text-white/80 max-w-2xl text-balance leading-[1.3]">
              {project.tagline}
            </p>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        {/* Citation card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="rounded-xl border border-cream-200 bg-cream-100/40 p-6 md:p-8 mb-16"
        >
          <div className="font-sans text-[10px] tracking-[0.35em] uppercase text-ink-300 mb-3">
            Citation
          </div>
          <p className="font-display italic text-lg md:text-xl text-ink-900 leading-snug text-balance">
            Pong, C. J. <span className="not-italic">(2024).</span> Emotion Recognition Machine Learning Using ECG Signals Derived from Wearable Devices.{' '}
            <span className="text-sky-500">International Journal of High School Research</span>, 6(2), 64–69.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-sm text-ink-500">
            <span>DOI: 10.36838/v6i2.12</span>
            <span className="text-ink-300">·</span>
            <span>Mentor: Shadi Ghiasi</span>
            <a
              href="https://terra-docs.s3.us-east-2.amazonaws.com/IJHSR/Articles/volume6-issue2/IJHSR_2024_62_64.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-500 hover:text-ink-900 underline underline-offset-4 ml-auto"
            >
              Read the paper ↗
            </a>
          </div>
        </motion.div>

        <MetricsGrid project={project} />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="grid md:grid-cols-3 gap-12 md:gap-20"
        >
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="font-sans text-[10px] tracking-[0.35em] uppercase text-ink-300 mb-3">The contribution</h2>
              <p className="font-display italic text-xl md:text-2xl text-ink-700 leading-[1.4] text-balance">
                Prior work used heavy deep CNNs to classify emotion from ECG. This study showed classical ML on
                handcrafted HRV features can be competitive — and small enough to live on a smartwatch.
              </p>
            </section>

            <section>
              <h2 className="font-sans text-[10px] tracking-[0.35em] uppercase text-ink-300 mb-4">Method</h2>
              <ol className="space-y-2.5">
                {[
                  ['Preprocess', 'SciPy bandpass 0.5–40 Hz · baseline-wander removal'],
                  ['Peak detection', 'SciPy find_peaks + custom double-peak deduplication'],
                  ['HRV feature extraction', 'PYHRV → 11 features (hr_mean, RMSSD, SDNN, FFT peaks in VLF/LF/HF, …)'],
                  ['Classification', 'Logistic Regression + SVM (kernel grid-searched on C, gamma)'],
                  ['Eval', '80/20 stratified split · accuracy + precision + confusion matrices'],
                ].map(([step, desc], i) => (
                  <li key={step} className="flex gap-5 py-3 border-b border-cream-200/60 last:border-0">
                    <span className="font-display text-2xl text-[#3D6F7E] tracking-tight w-10 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="font-display text-xl text-ink-900">{step}</div>
                      <div className="font-sans text-sm text-ink-500 mt-0.5">{desc}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="font-sans text-[10px] tracking-[0.35em] uppercase text-ink-300 mb-3">Results</h2>
              <p className="font-sans text-base md:text-[17px] text-ink-700 leading-[1.75] text-balance">
                On the Young Adult Affective Data corpus (154 single-modal ECG signals, 13 subjects), the tuned
                SVM hit <span className="font-medium text-ink-900">77% accuracy / 83% precision</span> on
                happy-vs-sad and <span className="font-medium text-ink-900">73% / 74%</span> on arousal — roughly
                10 percentage points above the logistic-regression baseline. Lightweight enough for on-device
                inference.
              </p>
            </section>
          </div>
          <TechSidebar project={project} />
        </motion.div>

        <FooterNav project={project} onClose={onClose} />
      </div>
    </div>
  );
}

function FallbackDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-20">
      <Eyebrow project={project} />
      <AccentRule project={project} className="mb-12" />
      <h1 className="font-display text-[clamp(3rem,9vw,7rem)] leading-[0.95] tracking-tight text-ink-900">
        {project.title}
        {project.subtitle && (
          <span className="block font-display italic font-light text-sky-500 text-[0.45em] mt-2">{project.subtitle}</span>
        )}
      </h1>
      <p className="mt-10 font-display italic text-2xl md:text-3xl text-sky-500 max-w-3xl text-balance leading-[1.25]">
        {project.tagline}
      </p>
      <MetricsGrid project={project} />
      <div className="grid md:grid-cols-3 gap-12 md:gap-20">
        <div className="md:col-span-2 space-y-10">
          <p className="font-display italic text-xl md:text-2xl text-ink-700 leading-[1.4] text-balance">
            {project.description}
          </p>
          <p className="font-sans text-base md:text-[17px] text-ink-700 leading-[1.75] text-balance">
            {project.details}
          </p>
        </div>
        <TechSidebar project={project} />
      </div>
      <FooterNav project={project} onClose={onClose} />
    </div>
  );
}

function ArchCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-cream-200 bg-cream-50 p-5">
      <div className="font-sans text-[10px] tracking-[0.3em] uppercase text-ink-300 mb-2">{title}</div>
      <div className="font-sans text-sm text-ink-700 leading-snug">{children}</div>
    </div>
  );
}
