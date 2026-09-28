'use client';

import Link from 'next/link';
import { ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1583467050720-28800f5ccc2d?w=1920&q=80')",
        }}
      />

      {/* Elegant Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-900/70 via-pink-800/50 to-white/30" />

      {/* Pink Glow Effects */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-pink-400/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-10 right-20 w-80 h-80 bg-rose-300/20 blur-[120px] rounded-full animate-pulse" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-200/20 border border-pink-300/40 text-pink-100 text-sm mb-6">
            <Sparkles size={14} />
            New Collection — Elegance Meets Modesty
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight font-serif">
            
            <span className="block bg-gradient-to-r from-pink-200 via-rose-200 to-pink-100 bg-clip-text text-transparent">
              
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-100 max-w-2xl">
            
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              href="/category/abayas"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <ShoppingBag size={20} />
              Shop Abayas
            </Link>

            <Link
              href="/category/hijabs"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-300 to-pink-400 hover:from-pink-200 hover:to-pink-300 rounded-xl text-gray-800 font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <ShoppingBag size={20} />
              Shop Hijabs
            </Link>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/40 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105"
            >
              New Arrivals
              <ArrowRight size={20} />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-xl">
            <div>
              <h3 className="text-3xl font-bold text-pink-200">200+</h3>
              <p className="text-gray-200">Modest Styles</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-pink-200">5000+</h3>
              <p className="text-gray-200">Happy Customers</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-pink-200">24/7</h3>
              <p className="text-gray-200">Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
