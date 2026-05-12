'use client';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function Header() {
  useEffect(() => {
    gsap.to('nav', {
      height: 60,
      padding: '10px 24px',
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(6, 182, 212, 0.2)',
      scrollTrigger: {
        trigger: 'body',
        start: 'top 80px',
        toggleActions: 'play play reverse reverse',
        markers: false,
      },
      duration: 0.4,
      ease: 'power2.inOut',
    });

    gsap.to('nav a', {
      fontSize: '13px',
      scrollTrigger: {
        trigger: 'body',
        start: 'top 80px',
        toggleActions: 'play play reverse reverse',
      },
      duration: 0.4,
    });
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 h-20 flex items-center px-6 transition-all bg-transparent">
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
        <div className="logo text-2xl font-bold">⚡ ZEROSKIP</div>
        <div className="nav-links flex gap-8 text-sm md:text-base">
          <a href="#features" className="text-gray-300 hover:text-cyan-400 transition">Features</a>
          <a href="#pricing" className="text-gray-300 hover:text-cyan-400 transition">Pricing</a>
          <a href="#about" className="text-gray-300 hover:text-cyan-400 transition">About</a>
        </div>
      </div>
    </nav>
  );
}
