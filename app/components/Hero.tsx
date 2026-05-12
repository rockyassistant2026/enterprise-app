'use client';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  useEffect(() => {
    // Heading fade + slide from top
    gsap.from('h1', {
      opacity: 0,
      y: 50,
      duration: 0.8,
      scrollTrigger: {
        trigger: 'h1',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // Subheading stagger (word by word)
    gsap.from('h1 span', {
      opacity: 0,
      x: -30,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: {
        trigger: 'h1',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // Badge fade in
    gsap.from('[data-badge]', {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      delay: 0.3,
      scrollTrigger: {
        trigger: 'h1',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // Logo parallax animation
    gsap.to('#logo', {
      rotation: 360,
      y: -100,
      opacity: 0.7,
      scale: 0.8,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: '30% top',
        scrub: 1,
        markers: false,
      },
    });

    // Dark background parallax
    gsap.to('.bg-dark', {
      backgroundPosition: '0% 50%',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
      },
    });
  }, []);

  return (
    <section className="relative hero min-h-screen flex items-center justify-center overflow-hidden">
      <div id="logo" className="absolute top-10 left-10 text-4xl font-bold z-10">
        ⚡ ZEROSKIP
      </div>

      <div className="bg-dark absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>

      <div className="text-center z-20 px-6">
        <div data-badge className="inline-block mb-4 px-4 py-2 bg-cyan-500/20 rounded-full border border-cyan-500/50">
          <span className="text-cyan-400 text-sm font-semibold">AI-Powered Fitness</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          <span>Your Personal AI</span>
          <br />
          <span>Workout Coach</span>
        </h1>

        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Transform your fitness journey with intelligent, personalized workouts powered by advanced AI technology.
        </p>

        <button className="btn-primary text-white">
          Get 3 Days Free
        </button>
      </div>
    </section>
  );
}
