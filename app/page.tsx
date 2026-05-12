'use client';

import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { StatsSection } from '@/components/StatsSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { DownloadSection } from '@/components/DownloadSection';
import { ProgressBar } from '@/components/ProgressBar';
import { SVGAnimations } from '@/components/SVGAnimations';
import { FloatingElements } from '@/components/FloatingElements';
import './styles/animations.css';

export default function Home() {
  useSmoothScroll();

  return (
    <main className="bg-slate-950 text-white overflow-hidden">
      <Header />
      <ProgressBar />
      <SVGAnimations />
      <FloatingElements />
      
      <Hero />
      
      <StatsSection />
      
      <FeaturesSection />
      
      <DownloadSection />

      {/* Footer section */}
      <section className="py-20 px-6 bg-slate-900 border-t border-cyan-500/20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">All 10 Animations Complete!</h2>
          <p className="text-gray-400 mb-8">
            Phase 1: Foundation ✅ | Phase 2: Engagement ✅ | Phase 3: Polish ✅ | Ready for Testing & Deployment
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center text-sm">
            <div className="p-3 bg-cyan-500/10 rounded">1️⃣ Smooth Scroll</div>
            <div className="p-3 bg-cyan-500/10 rounded">2️⃣ Heading</div>
            <div className="p-3 bg-cyan-500/10 rounded">3️⃣ Logo</div>
            <div className="p-3 bg-cyan-500/10 rounded">4️⃣ Stats</div>
            <div className="p-3 bg-cyan-500/10 rounded">5️⃣ CTA</div>
            <div className="p-3 bg-cyan-500/10 rounded">6️⃣ Cards</div>
            <div className="p-3 bg-cyan-500/10 rounded">7️⃣ Header</div>
            <div className="p-3 bg-cyan-500/10 rounded">8️⃣ Progress</div>
            <div className="p-3 bg-cyan-500/10 rounded">9️⃣ SVG</div>
            <div className="p-3 bg-cyan-500/10 rounded">🔟 Float</div>
          </div>
        </div>
      </section>
    </main>
  );
}
