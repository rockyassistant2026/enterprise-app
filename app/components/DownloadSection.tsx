'use client';

import { motion } from 'framer-motion';

export function DownloadSection() {
  return (
    <section className="relative py-20 px-6 bg-slate-950">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Transform Your Fitness?
        </h2>
        
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Join thousands of users who have already achieved their fitness goals with ZEROSKIP's AI-powered coaching.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {/* Primary CTA Button */}
          <motion.button
            className="btn-primary text-white px-8 py-4 text-lg font-semibold rounded-lg"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px rgba(6, 182, 212, 0.6)',
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            Get 3 Days Free
          </motion.button>

          {/* Secondary CTA Button */}
          <motion.button
            className="px-8 py-4 text-lg font-semibold rounded-lg border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 transition-all"
            whileHover={{
              scale: 1.03,
              background: 'rgba(6, 182, 212, 0.15)',
            }}
            whileTap={{ scale: 0.97 }}
          >
            Watch Demo
          </motion.button>
        </div>

        <p className="text-gray-400 mt-8">No credit card required • Cancel anytime</p>
      </div>
    </section>
  );
}
