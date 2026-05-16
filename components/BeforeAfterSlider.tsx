'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

type Props = {
  /** Combined vertically-stacked video — top half = before, bottom half = after */
  src: string;
  beforeLabel?: string;
  afterLabel?: string;
  initial?: number;
  interactive?: boolean;
  autoAnimate?: boolean;
  className?: string;
};

export default function BeforeAfterSlider({
  src,
  beforeLabel = 'Original',
  afterLabel = 'ASCII',
  initial = 50,
  interactive = true,
  autoAnimate = false,
  className = '',
}: Props) {
  const [position, setPosition] = useState(initial);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const beforeCanvasRef = useRef<HTMLCanvasElement>(null);
  const afterCanvasRef = useRef<HTMLCanvasElement>(null);
  const draggingRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);
  const animateFrameRef = useRef<number | null>(null);

  // Per-frame canvas render — top half → before, bottom half → after.
  // Both canvases come from the SAME video element, so they are pixel-perfectly synced.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Kick off playback (autoPlay can be deferred by some browsers)
    const playPromise = video.play();
    if (playPromise) playPromise.catch(() => {});

    let rafId: number;
    const draw = () => {
      const before = beforeCanvasRef.current;
      const after = afterCanvasRef.current;
      if (
        before &&
        after &&
        video.readyState >= 2 &&
        video.videoWidth > 0 &&
        video.videoHeight > 0
      ) {
        const w = video.videoWidth;
        const halfH = video.videoHeight / 2;
        if (before.width !== w || before.height !== halfH) {
          before.width = w;
          before.height = halfH;
          after.width = w;
          after.height = halfH;
        }
        const bCtx = before.getContext('2d');
        const aCtx = after.getContext('2d');
        if (bCtx) bCtx.drawImage(video, 0, 0, w, halfH, 0, 0, w, halfH);
        if (aCtx) aCtx.drawImage(video, 0, halfH, w, halfH, 0, 0, w, halfH);
      }
      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Auto-animate sweep (non-interactive mode)
  useEffect(() => {
    if (!autoAnimate) return;
    const start = performance.now();
    const tick = (t: number) => {
      const elapsed = (t - start) / 1000;
      const cycle = (Math.sin(elapsed * 0.6) + 1) / 2;
      setPosition(28 + cycle * 44);
      animateFrameRef.current = requestAnimationFrame(tick);
    };
    animateFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animateFrameRef.current) cancelAnimationFrame(animateFrameRef.current);
    };
  }, [autoAnimate]);

  const moveTo = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const p = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPosition(p);
  }, []);

  useEffect(() => {
    if (!interactive) return;
    const onMove = (e: MouseEvent) => {
      if (draggingRef.current) moveTo(e.clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (draggingRef.current && e.touches[0]) moveTo(e.touches[0].clientX);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [interactive, moveTo]);

  const handleDown = (clientX: number, e: React.SyntheticEvent) => {
    if (!interactive) return;
    e.stopPropagation();
    draggingRef.current = true;
    moveTo(clientX);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none ${interactive ? 'cursor-ew-resize' : ''} ${className}`}
      onMouseDown={(e) => handleDown(e.clientX, e)}
      onTouchStart={(e) => e.touches[0] && handleDown(e.touches[0].clientX, e)}
    >
      {/* Hidden source video — single playhead, both halves stay locked.
          Kept at full container size + opacity 0 so the browser doesn't throttle it. */}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
      />

      {/* Before canvas — covers full slider */}
      <canvas
        ref={beforeCanvasRef}
        className="absolute inset-0 w-full h-full bg-black"
        style={{ objectFit: 'cover' }}
      />

      {/* After canvas — clipped to the right of the divider */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: `polygon(${position}% 0, 100% 0, 100% 100%, ${position}% 100%)`,
        }}
      >
        <canvas
          ref={afterCanvasRef}
          className="absolute inset-0 w-full h-full bg-black"
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white/95 pointer-events-none"
        style={{
          left: `${position}%`,
          transform: 'translateX(-50%)',
          boxShadow: '0 0 16px rgba(0,0,0,0.4)',
        }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 w-11 h-11 rounded-full bg-white border border-white shadow-2xl flex items-center justify-center pointer-events-none"
        style={{
          left: `${position}%`,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
        }}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-ink-900">
          <path
            d="M9 6l-5 6 5 6M15 6l5 6-5 6"
            stroke="currentColor"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-sm text-white text-[9px] md:text-[10px] tracking-[0.25em] uppercase font-sans font-medium pointer-events-none">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-sm text-white text-[9px] md:text-[10px] tracking-[0.25em] uppercase font-sans font-medium pointer-events-none">
        {afterLabel}
      </div>
    </div>
  );
}
