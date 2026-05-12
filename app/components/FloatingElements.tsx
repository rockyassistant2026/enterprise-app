'use client';

import { motion } from 'framer-motion';

export function FloatingElements() {
  return (
    <div className="floating-elements fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating element 1 */}
      <motion.div
        className="float-element absolute top-20 left-10 text-6xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        ✨
      </motion.div>

      {/* Floating element 2 */}
      <motion.div
        className="float-element absolute top-40 right-10 text-6xl"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        ⚡
      </motion.div>

      {/* Breathing element */}
      <motion.div
        className="breathing-element pointer-events-auto"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="gradient-orb" />
      </motion.div>
    </div>
  );
}
