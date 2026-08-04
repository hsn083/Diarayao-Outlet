import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import Categories from '@/components/Categories';
import AbayaProductSection from '@/components/AbayaProductSection';
import HomepageSEOContent from '@/components/HomepageSEOContent';
import Footer from '@/components/Footer';
import { BreadcrumbSchema } from '@/components/StructuredData';

export default function Home() {
  const breadcrumbItems = [
    { name: 'Home', item: '/' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <Header />
      <main>
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
