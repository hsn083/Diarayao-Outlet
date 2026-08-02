import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import Categories from '@/components/Categories';
import AbayaProductSection from '@/components/AbayaProductSection';
import SEOContentSection from '@/components/SEOContentSection';
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
        <HeroSlider />
        <Categories />
        <AbayaProductSection />
        <SEOContentSection />
      </main>
      <Footer />
    </>
  );
}
