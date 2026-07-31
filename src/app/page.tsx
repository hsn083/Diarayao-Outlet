import type { Metadata } from "next";
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import Categories from '@/components/Categories';
import AbayaProductSection from '@/components/AbayaProductSection';
import SEOContentSection from '@/components/SEOContentSection';
import Footer from '@/components/Footer';
import { BreadcrumbSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Premium Arabian & Turkish Abayas in Pakistan | Diarayao Outlet',
  description: 'Shop premium Arabian and Turkish abayas at Diarayao Outlet. Elegant modest fashion, secure payments, fast nationwide delivery, easy returns, and the latest luxury abaya collection in Pakistan.',
  keywords: 'abaya Pakistan, Arabian abayas, Turkish abayas, modest fashion, Islamic clothing, hijab, modest dresses, luxury abaya, Diarayao Outlet, online abaya shopping Pakistan',
  openGraph: {
    title: 'Premium Arabian & Turkish Abayas in Pakistan | Diarayao Outlet',
    description: 'Shop premium Arabian and Turkish abayas at Diarayao Outlet. Elegant modest fashion, secure payments, fast nationwide delivery, easy returns, and the latest luxury abaya collection in Pakistan.',
    url: 'https://www.diarayao.com',
    siteName: 'Diarayao Outlet',
    locale: 'en_PK',
    type: 'website',
    images: [
      {
        url: '/Logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'Diarayao Outlet - Premium Arabian & Turkish Abayas',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium Arabian & Turkish Abayas in Pakistan | Diarayao Outlet',
    description: 'Shop premium Arabian and Turkish abayas at Diarayao Outlet. Elegant modest fashion, secure payments, fast nationwide delivery, easy returns, and the latest luxury abaya collection in Pakistan.',
    images: ['/Logo.jpeg'],
    creator: '@diarayaooutlet',
    site: '@diarayaooutlet',
  },
};

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
