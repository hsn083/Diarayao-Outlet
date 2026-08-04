import dynamic from 'next/dynamic';
import { BreadcrumbSchema } from '@/components/StructuredData';

// Performance: Dynamic imports to reduce initial JS bundle size
// Header is critical for above-fold content, so we keep it as a regular import
// but we'll optimize it separately
import Header from '@/components/Header';

// Performance: Dynamic imports for below-fold components with loading states
const HeroSlider = dynamic(() => import('@/components/HeroSlider'), {
  loading: () => (
    <div className="relative w-full h-[550px] md:h-[650px] lg:h-[750px] bg-gray-100 animate-pulse" aria-label="Loading hero banner" role="status" />
  ),
  ssr: true
});

const Categories = dynamic(() => import('@/components/Categories'), {
  loading: () => (
    <div className="py-16">
      <div className="text-center mb-12 mt-8">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-64 mx-auto mb-4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-96 mx-auto" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 justify-items-center">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 bg-gray-200 rounded-full animate-pulse" />
        ))}
      </div>
    </div>
  ),
  ssr: false // Below-fold content, defer to client
});

const AbayaProductSection = dynamic(() => import('@/components/AbayaProductSection'), {
  loading: () => (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-48 mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  ),
  ssr: false // Below-fold content, defer to client
});

const HomepageSEOContent = dynamic(() => import('@/components/HomepageSEOContent'), {
  ssr: false // Below-fold content, defer to client
});

const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: false // Below-fold content, defer to client
});

export default function Home() {
  const breadcrumbItems = [
    { name: 'Home', item: '/' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <Header />
      {/* Accessibility: Added id for skip to content link */}
      <main id="main-content">
        {/* SEO H1 - Always present for search engines, uses sr-only class to be hidden visually but accessible to screen readers */}
        <h1 className="sr-only">
          Diarayao Outlet - Premium Abayas, Hijabs & Modest Fashion in Pakistan
        </h1>
        <HeroSlider />
        <Categories />
        <AbayaProductSection />
        <HomepageSEOContent />
      </main>
      <Footer />
    </>
  );
}
