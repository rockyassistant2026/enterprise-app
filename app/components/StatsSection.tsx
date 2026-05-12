'use client';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function StatsSection() {
  useEffect(() => {
    // Animate stat numbers
    const stats = [
      { selector: '.stat-90', value: 90, suffix: '+' },
      { selector: '.stat-50', value: 50, suffix: '+' },
    ];

    stats.forEach((stat, index) => {
      gsap.from(stat.selector, {
        textContent: 0,
        duration: 2.5,
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: '.stats-section',
          start: 'top center',
          toggleActions: 'play none none reverse',
          once: false,
        },
        delay: index * 0.3,
        ease: 'power2.out',
      });
    });

    // Icon spin animation
    gsap.from('.stat-icon', {
      rotation: 360,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.stats-section',
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
    });
  }, []);

  return (
    <section className="stats-section py-20 px-6 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">Why Choose ZEROSKIP?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Stat 1 */}
          <div className="stat text-center">
            <div className="stat-icon text-5xl mb-4">📊</div>
            <div className="text-5xl font-bold text-cyan-400 mb-2">
              <span className="stat-90">0</span><span className="suffix">+</span>
            </div>
            <p className="text-gray-300 text-lg">Success Rate</p>
          </div>

          {/* Stat 2 */}
          <div className="stat text-center">
            <div className="stat-icon text-5xl mb-4">⏱️</div>
            <div className="text-5xl font-bold text-cyan-400 mb-2">
              <span className="stat-50">0</span><span className="suffix">+</span>
            </div>
            <p className="text-gray-300 text-lg">Workout Types</p>
          </div>

          {/* Stat 3 */}
          <div className="stat text-center">
            <div className="stat-icon text-5xl mb-4">∞</div>
            <div className="text-5xl font-bold text-cyan-400 mb-2">∞</div>
            <p className="text-gray-300 text-lg">Personalization</p>
          </div>
        </div>
      </div>
    </section>
  );
}
