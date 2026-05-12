'use client';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function FeaturesSection() {
  useEffect(() => {
    // Stagger reveal from left
    gsap.from('.feature-card:nth-child(odd)', {
      opacity: 0,
      x: -100,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.features-grid',
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
      ease: 'power3.out',
    });

    // Stagger reveal from right
    gsap.from('.feature-card:nth-child(even)', {
      opacity: 0,
      x: 100,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.features-grid',
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
      ease: 'power3.out',
    });

    // Scale animation on cards
    gsap.from('.feature-card', {
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      scrollTrigger: {
        trigger: '.features-grid',
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
    });
  }, []);

  const features = [
    {
      icon: '🎯',
      title: 'Personalized Workouts',
      description: 'AI adapts to your fitness level and preferences',
    },
    {
      icon: '📈',
      title: 'Progress Tracking',
      description: 'Real-time performance metrics and insights',
    },
    {
      icon: '🏆',
      title: 'Motivation Coaching',
      description: 'AI keeps you motivated throughout your journey',
    },
    {
      icon: '⚡',
      title: 'Smart Recovery',
      description: 'Optimal rest and recovery recommendations',
    },
    {
      icon: '🧠',
      title: 'Nutrition Guidance',
      description: 'AI-powered nutrition plans tailored to your goals',
    },
    {
      icon: '🌍',
      title: 'Global Community',
      description: 'Connect with fitness enthusiasts worldwide',
    },
  ];

  return (
    <section className="features-section py-20 px-6 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">
          Powerful Features
        </h2>
        
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
          Everything you need to achieve your fitness goals with AI-powered guidance
        </p>

        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card p-8 rounded-lg bg-gradient-to-br from-slate-800 to-slate-800/50 border border-cyan-500/20 hover:border-cyan-500/50 transition-all"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
