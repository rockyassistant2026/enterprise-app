'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import styles from './ParallaxPerson.module.css';

export default function ParallaxPerson() {
  const [activeBackground, setActiveBackground] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  const sections = [
    {
      id: 'home',
      title: 'Home Workouts',
      subtitle: 'Start Your Fitness Journey',
      description: 'Get personalized workouts designed for your home. No equipment needed.',
      bgImage: '/images/parallax/home-background.svg'
    },
    {
      id: 'gym',
      title: 'Gym Training',
      subtitle: 'Level Up Your Strength',
      description: 'Unlock advanced training programs powered by AI. Train smarter, not harder.',
      bgImage: '/images/parallax/gym-background.svg'
    },
    {
      id: 'beach',
      title: 'Outdoor Fitness',
      subtitle: 'Train Anywhere, Anytime',
      description: 'Adapt your workouts to any environment. Freedom to train on your terms.',
      bgImage: '/images/parallax/beach-background.svg'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const parallaxContainerHeight = sections.length * windowHeight;

      // Calculate scroll progress
      const progress = Math.min(
        scrollPosition / parallaxContainerHeight,
        1
      );
      setScrollProgress(progress);

      // Determine which background to show
      const sectionHeight = windowHeight;
      let currentSection = 0;

      if (scrollPosition < sectionHeight * 0.5) {
        currentSection = 0;
      } else if (scrollPosition < sectionHeight * 1.5) {
        currentSection = 1;
      } else {
        currentSection = 2;
      }

      setActiveBackground(sections[currentSection].id);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.container}>
      {/* Background Layers */}
      {sections.map((section) => (
        <motion.div
          key={section.id}
          className={styles.backgroundLayer}
          animate={{
            opacity: activeBackground === section.id ? 1 : 0,
            scale: activeBackground === section.id ? 1 : 1.05
          }}
          transition={{
            duration: 0.8,
            ease: 'easeInOut'
          }}
          style={{
            backgroundImage: `url(${section.bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
          aria-hidden="true"
        />
      ))}

      {/* Person Container (Fixed) */}
      <motion.div
        className={styles.personContainer}
        animate={{
          y: 0,
          opacity: 1
        }}
        initial={{
          y: 50,
          opacity: 0
        }}
        transition={{
          duration: 0.6,
          delay: 0.2
        }}
      >
        <img
          src="/images/parallax/person-with-phone.svg"
          alt="Person with mobile phone"
          className={styles.personImage}
        />
      </motion.div>

      {/* Scroll Sections (Triggers) */}
      {sections.map((section, index) => (
        <motion.section
          key={section.id}
          className={styles.scrollSection}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className={styles.content}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: false, amount: 0.5 }}
            >
              <p className={styles.subtitle}>{section.subtitle}</p>
              <h2 className={styles.title}>{section.title}</h2>
              <p className={styles.description}>{section.description}</p>
              
              {/* Call-to-action button */}
              <motion.button
                className={styles.cta}
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>
        </motion.section>
      ))}

      {/* Progress indicator */}
      <motion.div
        className={styles.progressBar}
        style={{
          width: `${scrollProgress * 100}%`
        }}
      />
    </div>
  );
}
