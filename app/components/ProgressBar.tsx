'use client';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function ProgressBar() {
  useEffect(() => {
    const progressBar = document.querySelector('.progress-bar') as HTMLElement;

    if (progressBar) {
      gsap.to(progressBar, {
        width: '100%',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          onUpdate: (self) => {
            const width = `${self.progress * 100}%`;
            progressBar.style.width = width;
          },
        },
      });
    }
  }, []);

  return <div className="progress-bar" />;
}
