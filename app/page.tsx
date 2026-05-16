import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CardStack from '@/components/CardStack';
import MobileCarousel from '@/components/MobileCarousel';
import About from '@/components/About';

export default function Home() {
  return (
    <main className="min-h-screen bg-cream-50 text-ink-900">
      <Header />
      <Hero />
      <CardStack />
      <MobileCarousel />
      <About />
      <footer className="px-6 md:px-12 lg:px-16 py-12 border-t border-cream-200">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] font-sans tracking-[0.2em] uppercase text-ink-300">
          <div>© 2026 Caleb Pong</div>
          <div className="flex items-center gap-6">
            <a
              href="mailto:calebpongj@gmail.com"
              className="hover:text-ink-700 transition-colors"
            >
              Email
            </a>
            <a
              href="https://github.com/kale-eb"
              className="hover:text-ink-700 transition-colors"
            >
              Github
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
