'use client';

import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(`Thank you! We'll contact you at ${email}`);
    setEmail('');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Enterprise App</h1>
            <nav className="hidden md:flex gap-8">
              <a href="#features" className="text-slate-300 hover:text-white transition">Features</a>
              <a href="#about" className="text-slate-300 hover:text-white transition">About</a>
              <a href="#contact" className="text-slate-300 hover:text-white transition">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Welcome to Enterprise App
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            A modern, scalable enterprise application built with Next.js and deployed on Vercel.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
              Get Started
            </button>
            <button className="px-8 py-3 border border-slate-400 hover:border-white text-white rounded-lg font-semibold transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-700">
        <h3 className="text-3xl font-bold text-white mb-12 text-center">Features</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:border-blue-500 transition">
            <div className="text-4xl mb-4">⚡</div>
            <h4 className="text-xl font-bold text-white mb-2">Fast</h4>
            <p className="text-slate-300">Built with Next.js for optimal performance</p>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:border-blue-500 transition">
            <div className="text-4xl mb-4">🔒</div>
            <h4 className="text-xl font-bold text-white mb-2">Secure</h4>
            <p className="text-slate-300">Enterprise-grade security and authentication</p>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:border-blue-500 transition">
            <div className="text-4xl mb-4">📈</div>
            <h4 className="text-xl font-bold text-white mb-2">Scalable</h4>
            <p className="text-slate-300">Designed to grow with your business</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-700">
        <div className="max-w-md mx-auto">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Get in Touch</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
            />
            <button
              type="submit"
              className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
            >
              Send Message
            </button>
            {message && (
              <p className="text-green-400 text-center">{message}</p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 backdrop-blur mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-400">
          <p>© 2026 Enterprise App. All rights reserved.</p>
          <p className="text-sm mt-2">Deployed on Vercel • Built with Next.js</p>
        </div>
      </footer>
    </div>
  );
}
