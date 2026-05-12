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
import ParallaxPerson from '@/components/ParallaxSection/ParallaxPerson';
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
      
      {/* Parallax Person + Background Transitions Section */}
      <ParallaxPerson />
      
      <StatsSection />
      
      <FeaturesSection />
      
      <DownloadSection />
      
      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-slate-400">© 2024 ZEROSKIP AI. All rights reserved.</p>
          <p className="text-slate-500 text-sm mt-2">
            Built with Next.js, React, GSAP, Lenis, and Framer Motion
          </p>
        </div>
      </footer>
    </main>
  );
}
