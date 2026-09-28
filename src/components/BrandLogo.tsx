'use client';

import Link from 'next/link';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
}

export default function BrandLogo({ 
  variant = 'light'
}: BrandLogoProps) {
  const isDark = variant === 'dark';

  return (
    <Link
      href="/"
      className="w-[140px] h-[60px] md:w-[160px] md:h-[68px] lg:w-[180px] lg:h-[76px] flex flex-col items-center leading-none transition-transform duration-300 hover:scale-[1.03]"
      aria-label="DIARAYAO OUTLET - Home"
      title="Diarayao Outlet - Premium Abayas and Modest Fashion"
      style={{ contain: 'layout' }}
    >
      {/* Top Decorative Ornament */}
      <div 
        className="w-full h-[2px] mb-2"
        style={{
          background: 'linear-gradient(135deg, #D4AF37 0%, #F7E7A1 25%, #C89B3C 50%, #A9711C 75%, #F4D03F 100%)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.15)'
        }}
      />

      {/* DIARAYAO - Deep Charcoal Black */}
      <span
        className="font-['Cinzel'] font-extrabold uppercase text-[26px] md:text-[32px] lg:text-[36px]"
        style={{
          color: '#1A1A1A',
          fontWeight: 800,
          letterSpacing: '1px',
          textShadow: '0 2px 4px rgba(0,0,0,0.15)',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale'
        }}
      >
        DIARAYAO
      </span>

      {/* OUTLET - Antique Gold */}
      <span 
        className="font-['Cinzel'] font-bold uppercase text-[11px] md:text-[11px] lg:text-[12px]"
        style={{ 
          color: '#C89B3C',
          fontWeight: 700,
          letterSpacing: '6px',
          textTransform: 'uppercase',
          textShadow: '0 1px 2px rgba(0,0,0,0.15)',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale'
        }}
      >
        OUTLET
      </span>

      {/* Bottom Decorative Ornament */}
      <div 
        className="w-full h-[2px] mt-2"
        style={{
          background: 'linear-gradient(135deg, #D4AF37 0%, #F7E7A1 25%, #C89B3C 50%, #A9711C 75%, #F4D03F 100%)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.15)'
        }}
      />
    </Link>
  );
}
