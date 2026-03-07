'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/services/api';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const user = authAPI.getCurrentUser();
    if (user) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8B0000] via-[#7A0000] to-[#6A0000]">
      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-white">
            <h1 className="text-2xl font-bold tracking-tight">WildKits</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-white hover:text-[#FFC107] font-medium transition-colors px-4 py-2"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-[#FFC107] text-[#8B0000] hover:bg-[#FFB300] font-semibold px-6 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              rgba(255,255,255,0.05) 20px,
              rgba(255,255,255,0.05) 40px
            )`
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-8">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">
              WildKits
            </h2>
            <div className="h-2 w-32 bg-[#FFC107] rounded-full mx-auto mb-6"></div>
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#FFC107] mb-6">
              Buy, Sell & Lend Within Campus
            </p>
          </div>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            The exclusive marketplace for CIT-U Technologians. Trade textbooks, 
            electronics, uniforms, and academic materials safely within our campus community.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/signup"
              className="w-full sm:w-auto bg-[#FFC107] text-[#8B0000] hover:bg-[#FFB300] font-bold text-lg px-8 py-4 rounded-xl transition-all duration-200 shadow-2xl hover:shadow-[#FFC107]/50 hover:scale-105"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-bold text-lg px-8 py-4 rounded-xl transition-all duration-200 border-2 border-white/30"
            >
              Sign In
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Academic Materials
              </h3>
              <p className="text-gray-200">
                Buy and sell textbooks, notes, and study materials
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
              <div className="text-5xl mb-4">💻</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Electronics & Gadgets
              </h3>
              <p className="text-gray-200">
                Rent or purchase laptops, calculators, and tech gear
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Campus Community
              </h3>
              <p className="text-gray-200">
                Safe peer-to-peer trading within CIT-U
              </p>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="mt-12 inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <p className="text-white text-sm font-medium">
              🔒 Secure • CIT-U Students Only • Verified Community
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 py-6 text-center text-white/60 text-sm">
        <p>© 2026 WildKits • Cebu Institute of Technology - University</p>
      </footer>
    </div>
  );
}
