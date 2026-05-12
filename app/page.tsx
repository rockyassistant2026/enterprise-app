'use client';

import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(`✅ Check your email for your free trial link!`);
    setEmail('');
    setTimeout(() => setMessage(''), 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur border-b border-blue-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              ZEROSKIP
            </h1>
          </div>
          <a 
            href="#download" 
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition"
          >
            Download Now
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="relative z-10 text-center">
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/50 text-blue-300 text-sm font-semibold">
              🤖 AI-Powered Fitness
            </span>
          </div>

          <h2 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
            Your Personal AI
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Workout Coach
            </span>
          </h2>

          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get unique, personalized workouts in 30 seconds. No two workouts are the same. 
            Powered by AI. Designed for you. Works everywhere.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a 
              href="#download"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-full font-bold text-lg transition transform hover:scale-105 shadow-lg"
            >
              🎁 Get 3 Days Free
            </a>
            <button className="px-8 py-4 border-2 border-blue-500 hover:bg-blue-500/10 text-blue-300 rounded-full font-bold text-lg transition">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-cyan-400 mb-2">90+</div>
              <div className="text-slate-300">Exercises</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-400 mb-2">50+</div>
              <div className="text-slate-300">Ready Workouts</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-400 mb-2">∞</div>
              <div className="text-slate-300">AI Generated</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-blue-500/20">
        <h3 className="text-4xl md:text-5xl font-black text-white mb-16 text-center">
          How ZEROSKIP Works
        </h3>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6 hover:border-blue-500/70 transition">
            <div className="text-5xl mb-4">📝</div>
            <h4 className="text-xl font-bold text-white mb-3">Tell Your Goals</h4>
            <p className="text-slate-300 text-sm">Share your fitness level, available time, and equipment</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6 hover:border-blue-500/70 transition">
            <div className="text-5xl mb-4">🤖</div>
            <h4 className="text-xl font-bold text-white mb-3">AI Creates Plan</h4>
            <p className="text-slate-300 text-sm">Unique workout generated in 30 seconds just for you</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6 hover:border-blue-500/70 transition">
            <div className="text-5xl mb-4">💪</div>
            <h4 className="text-xl font-bold text-white mb-3">Follow Along</h4>
            <p className="text-slate-300 text-sm">Video guidance with real-time form tips and timers</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6 hover:border-blue-500/70 transition">
            <div className="text-5xl mb-4">📈</div>
            <h4 className="text-xl font-bold text-white mb-3">Track Progress</h4>
            <p className="text-slate-300 text-sm">AI adapts workouts as you get stronger</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-blue-500/20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6">
              Why Athletes Love ZEROSKIP
            </h3>
            <ul className="space-y-4">
              {[
                '⚡ No boring, repetitive workouts',
                '🏠 Works anywhere - home, gym, park',
                '🎯 Personalized to YOUR fitness level',
                '🤖 AI Coach Z guides every rep',
                '⏱️ Built-in Tabata timer for HIIT',
                '📱 Offline mode - train anywhere',
                '🔄 Adaptive difficulty that grows with you',
                '👥 Join 10,000+ users in UAE'
              ].map((feature, i) => (
                <li key={i} className="text-lg text-slate-200 flex items-center gap-3">
                  <span className="text-2xl">{feature.split(' ')[0]}</span>
                  {feature.substring(feature.indexOf(' ') + 1)}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/40 rounded-3xl p-8 flex items-center justify-center h-96">
            <div className="text-center">
              <div className="text-7xl mb-4">📱</div>
              <p className="text-slate-300">Download the app to see it in action!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-blue-500/20">
        <h3 className="text-4xl md:text-5xl font-black text-white mb-16 text-center">
          Loved by Fitness Enthusiasts
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: 'Fatima K.',
              location: 'Dubai',
              review: 'Lost 8kg in 3 months! No boring workouts anymore.',
              rating: '⭐⭐⭐⭐⭐'
            },
            {
              name: 'Ahmed M.',
              location: 'Abu Dhabi',
              review: 'Best fitness app. AI understands my tiny apartment perfectly.',
              rating: '⭐⭐⭐⭐⭐'
            },
            {
              name: 'Sarah L.',
              location: 'London',
              review: 'Feels like having a real personal trainer in my pocket!',
              rating: '⭐⭐⭐⭐⭐'
            }
          ].map((item, i) => (
            <div key={i} className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6 hover:border-blue-500/70 transition">
              <div className="mb-4 text-lg">{item.rating}</div>
              <p className="text-slate-200 mb-6 italic">"{item.review}"</p>
              <div>
                <div className="font-bold text-white">{item.name}</div>
                <div className="text-slate-400 text-sm">{item.location}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-300 mb-4">Featured in</p>
          <div className="flex flex-wrap justify-center gap-8 text-slate-500 font-semibold">
            <span>🏆 Forbes</span>
            <span>📰 Gulf News</span>
            <span>🎯 TechCrunch</span>
            <span>📱 Khaleej Times</span>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-blue-500/20">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-center">
          <h3 className="text-4xl md:text-5xl font-black text-white mb-4">
            Start Your Free Trial Today
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            3 days completely free. No credit card. Cancel anytime.
          </p>

          <form onSubmit={handleSubmit} className="mb-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-6 py-4 rounded-full bg-white/90 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition"
            >
              Send Link
            </button>
          </form>

          {message && (
            <p className="text-white font-semibold text-lg mb-4">{message}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a 
              href="https://apps.apple.com/ae/app/zeroskip-ai-workout-generator/id6760627981"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white/20 hover:bg-white/30 text-white rounded-full font-semibold transition border border-white/50"
            >
              📱 App Store
            </a>
            <a 
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white/20 hover:bg-white/30 text-white rounded-full font-semibold transition border border-white/50"
            >
              🤖 Google Play
            </a>
          </div>

          <p className="text-blue-100 text-sm">
            ✓ No credit card required • ✓ Cancel anytime • ✓ Get instant access
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-500/20 bg-slate-950/50 backdrop-blur mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">⚡</span>
                <span className="font-bold text-white">ZEROSKIP</span>
              </div>
              <p className="text-slate-400 text-sm">AI-powered workout generation for everyone.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-blue-400">Features</a></li>
                <li><a href="#" className="hover:text-blue-400">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-400">Download</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Follow Us</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="https://www.instagram.com/zeroskipai" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">📱 Instagram</a></li>
                <li><a href="#" className="hover:text-blue-400">Twitter</a></li>
                <li><a href="#" className="hover:text-blue-400">TikTok</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-blue-400">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-400">Terms</a></li>
                <li><a href="#" className="hover:text-blue-400">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-500/20 pt-8 text-center text-slate-400">
            <p>© 2026 ZEROSKIP. All rights reserved. | AI Fitness Revolution 🚀</p>
            <p className="text-sm mt-2">Available on iOS & Android</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
