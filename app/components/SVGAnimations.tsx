'use client';

import gsap from 'gsap';
import { useEffect } from 'react';

export function SVGAnimations() {
  useEffect(() => {
    // Animate SVG paths on load
    gsap.from('svg path', {
      strokeDashoffset: 1000,
      duration: 2,
      ease: 'power2.out',
    });

    // Hero icon bounce
    gsap.to('.hero-icon', {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.1,
    });

    // SVG morph animation
    gsap.from('.morph-icon', {
      opacity: 0,
      rotate: 360,
      duration: 1.5,
      ease: 'back.out',
      stagger: 0.15,
    });
  }, []);

  return (
    <div className="svg-animations">
      {/* SVG shapes for animation */}
      <svg 
        className="hero-icon absolute" 
        viewBox="0 0 100 100" 
        width="60" 
        height="60"
        style={{ top: '10%', left: '5%' }}
      >
        <path 
          d="M50 10 L90 90 L10 90 Z" 
          stroke="currentColor" 
          strokeWidth="2" 
          fill="none" 
        />
      </svg>

      <svg 
        className="hero-icon absolute" 
        viewBox="0 0 100 100" 
        width="60" 
        height="60"
        style={{ top: '10%', right: '5%' }}
      >
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    </div>
  );
}
