export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  tagline: string;
  description: string;
  details: string;
  tech: string[];
  metrics?: { label: string; value: string }[];
  links?: { label: string; href: string }[];
  year: string;
  category: string;
  accent: string;
  status: 'shipped' | 'building' | 'coming';
};

export const projects: Project[] = [
  {
    slug: 'vyra',
    title: 'Vyra',
    subtitle: 'AI-native video editor',
    tagline:
      "The world's first comprehensive video editor built for agents — and humans — from day one.",
    description:
      'A browser-based video editor where every tool — effects, masks, captions, motion graphics, time-remap — is exposed over MCP. Any AI agent can connect and drive the timeline.',
    details:
      "Vyra is not a chat wrapper on top of a video editor — the editor itself is agent-native, and MCP-first. Every operation a human can perform in the UI is exposed as a typed MCP tool, so ANY MCP-compatible client (Claude.ai, Claude Code, Cursor, custom agents) can drive the editor directly: keyframe a property, animate a mask, sync audio, apply an effect, swap shots. The same Zustand store backs both surfaces, so an agent's edit lands on the timeline frame-accurate and reversible. Built on Remotion for rendering, DesignCombo for the timeline, Supabase Postgres + RLS for state, and Express + SSE (AG-UI pattern) for the in-app agent protocol.",
    tech: [
      'React 18',
      'TypeScript',
      'Tailwind',
      'Remotion',
      'DesignCombo',
      'Zustand',
      'Supabase',
      'WebGL',
      'MCP',
      'SSE / AG-UI',
      'Express',
    ],
    metrics: [
      { label: 'Effects', value: '16+' },
      { label: 'Agent tools', value: '40+' },
      { label: 'Status', value: 'Live beta' },
    ],
    links: [
      { label: 'usevyra.com', href: 'https://usevyra.com' },
    ],
    year: '2025',
    category: 'Flagship · AI-native',
    accent: '#5C7187',
    status: 'building',
  },
  {
    slug: 'omoggle',
    title: 'Omoggle',
    subtitle: 'Facial attractiveness ML',
    tagline: 'I built the neural net behind a viral platform app.',
    description:
      "EfficientNet-B0 facial attractiveness model running entirely in the browser via ONNX Runtime Web. Powers Omoggle's facial scoring at 10 FPS.",
    details:
      'Real-time webcam-based facial attractiveness scoring. Trained on a combined corpus of SCUT-FBP5500, MEBeauty, and FairFace (with model-labeled augmentation). Achieved Pearson correlation of 0.8779 against the held-out test set. EfficientNet-B0 backbone, 5.3M params, quantized to 7.7MB ONNX for in-browser inference. MediaPipe handles face detection; smoothed score aggregation runs at 10 FPS in pure JS.',
    tech: ['PyTorch', 'EfficientNet-B0', 'ONNX Runtime Web', 'MediaPipe', 'Modal A100'],
    metrics: [
      { label: 'Pearson r', value: '0.8779' },
      { label: 'Model size', value: '7.7 MB' },
      { label: 'Inference', value: '10 FPS' },
    ],
    links: [{ label: 'omoggle.com', href: 'https://omoggle.com' }],
    year: '2026',
    category: 'Shipped ML',
    accent: '#C99B6E',
    status: 'shipped',
  },
  {
    slug: 'agentic-web-agency',
    title: 'Agentic Web Agency',
    tagline: 'An AI agency that runs itself.',
    description:
      'Agents source local-business leads, design custom Next.js sites, and deploy them — for under $1.25 in marginal cost per site.',
    details:
      "Lead sourcing via SerpAPI and Google Maps. Per-lead research via Firecrawl + Claude Haiku (scraping Yelp, Instagram, Facebook for photos and copy). Site generation via Claude Sonnet through the Claude Code CLI, producing a fully custom standalone Next.js static export per client — no shared runtime, no CMS. Auto-deploys to Cloudflare Pages. Monorepo with Turborepo and pnpm. An operator dashboard handles approve/reject and deploy.",
    tech: ['Next.js', 'Turborepo', 'pnpm', 'Drizzle', 'Supabase', 'Cloudflare Pages', 'Claude Sonnet', 'Claude Haiku', 'Firecrawl'],
    metrics: [
      { label: 'Cost / site', value: '<$1.25' },
      { label: 'Retainer', value: '$50/mo' },
      { label: 'Pipeline', value: 'Fully agent' },
    ],
    year: '2026',
    category: 'AI Agents',
    accent: '#7E92A8',
    status: 'building',
  },
  {
    slug: 'orchid',
    title: 'Orchid',
    subtitle: 'Bloom Together',
    tagline: 'A couples wallpaper app for iOS + Android.',
    description: 'Shared, evolving lock screens. Each photo update is a small reminder that someone is thinking of you.',
    details:
      'SwiftUI on iOS, Jetpack Compose on Android. Firebase Auth + Firestore + Cloud Storage backend. Custom WidgetKit extension for live lock-screen rendering. Sticker store and photo crop tooling. Partner pairing via short codes.',
    tech: ['SwiftUI', 'Jetpack Compose', 'Firebase', 'WidgetKit'],
    year: '2026',
    category: 'Consumer iOS',
    accent: '#8A6FD0',
    status: 'shipped',
  },
  {
    slug: 'beffanie',
    title: 'Beffanie',
    subtitle: 'Natural-language indoor navigation',
    tagline:
      'A robot that follows plain-English instructions — built in the pre-transformer era, before LLMs ate this problem.',
    description:
      'A full natural-language → action pipeline. Tell Beffanie "go past the chair and into the kitchen" and she figures it out — language, vision, planning, motion control, all hand-engineered.',
    details:
      "Long before transformers swallowed NLP, instruction following had to be actually engineered: parse intent and entities out of a command, ground them in the scene via a vision pipeline (monocular depth + color/material segmentation + rule-based floor reasoning), translate the result into a motion plan, then execute. Beffanie ran the whole stack on a sub-$200 robot body with one forward-facing RGB camera — no LIDAR, no LLM. The hard part wasn't any single stage; it was making each one robust enough that errors didn't cascade through the pipeline.",
    tech: [
      'Python',
      'OpenCV',
      'spaCy',
      'Semantic parsing',
      'Monocular depth',
      'Rule-based planning',
      'Motion control',
    ],
    year: '2023',
    category: 'Robotics · NL navigation',
    accent: '#5D7563',
    status: 'shipped',
    links: [{ label: 'Watch Beffanie follow instructions', href: 'https://www.youtube.com/watch?v=4Pk3LH094pY' }],
  },
  {
    slug: 'video-ascii',
    title: 'VideoToAscii',
    subtitle: 'CLI',
    tagline: 'Any video → playable ASCII art in the terminal.',
    description: 'A Python CLI that converts arbitrary video into ASCII frames and plays them back in-terminal with audio.',
    details:
      'Decodes frames with OpenCV, maps luminance to a ramp of ASCII glyphs, extracts audio with moviepy, and plays the result frame-synced with stdout buffering. Save/load support for compressed ASCII videos. A small toy, but it ships.',
    tech: ['Python', 'OpenCV', 'Pillow', 'moviepy', 'ffmpeg'],
    year: '2021',
    category: 'CLI · Toy',
    accent: '#2A3340',
    status: 'shipped',
  },
  {
    slug: 'ecg-emotion',
    title: 'Emotion ML',
    subtitle: 'ECG · Wearable-grade',
    tagline: 'Predicting emotion from a wristwatch-grade ECG signal — fast enough to run on the device.',
    description:
      'Lightweight ML for emotion recognition from single-lead ECG signals. Designed for on-device inference on wearables — no DCNN required.',
    details:
      'Published first-author in the International Journal of High School Research (IJHSR), Vol. 6 Issue 2, 2024 (DOI: 10.36838/v6i2.12), mentored by Shadi Ghiasi. Extracts 11 heart-rate-variability features (hr_mean, hr_std, RMSSD, SDNN, FFT peaks in VLF/LF/HF bands, etc.) from preprocessed ECG via Scipy + PYHRV, then trains logistic regression and SVM classifiers on two binary tasks: happy vs. sad and high vs. low arousal. SVM with grid-searched C and gamma hit 77% accuracy (83% precision) on happy/sad and 73% (74% precision) on arousal — ~10% above logistic-regression baseline. Trained on the Young Adult Affective Data corpus (154 single-modal ECG signals, 13 subjects). The contribution: prior work used heavy DCNNs; this study showed a wearable-deployable model can get competitive accuracy with classical ML.',
    tech: ['Python', 'Scikit-learn', 'SciPy', 'PYHRV', 'SVM', 'GridSearchCV'],
    metrics: [
      { label: 'SVM happy/sad', value: '77%' },
      { label: 'SVM arousal', value: '73%' },
      { label: 'Features', value: '11 HRV' },
    ],
    links: [
      { label: 'Read the paper (IJHSR 2024)', href: 'https://terra-docs.s3.us-east-2.amazonaws.com/IJHSR/Articles/volume6-issue2/IJHSR_2024_62_64.pdf' },
    ],
    year: '2023',
    category: 'Research · Published',
    accent: '#3D6F7E',
    status: 'shipped',
  },
];
