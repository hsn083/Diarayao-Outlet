import { Metadata } from 'next';
import FAQClient from './FAQClient';

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions | Diarayao Outlet',
  description: 'Find answers to common questions about Diarayao Outlet abayas, hijabs, modest fashion, shipping, returns, payments, and more. Get help with your orders and inquiries.',
  keywords: 'FAQ Diarayao Outlet, abaya FAQ, modest fashion questions, shipping FAQ, returns FAQ, payment FAQ, customer support',
  openGraph: {
    title: 'FAQ - Frequently Asked Questions | Diarayao Outlet',
    description: 'Find answers to common questions about Diarayao Outlet abayas, hijabs, modest fashion, shipping, returns, payments, and more.',
    url: 'https://www.diarayao.com/faq',
    siteName: 'Diarayao Outlet',
    locale: 'en_PK',
    type: 'website',
    images: [
      {
        url: 'https://www.diarayao.com/favicon.png',
        width: 1200,
        height: 630,
        alt: 'Diarayao Outlet - FAQ',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ - Frequently Asked Questions | Diarayao Outlet',
    description: 'Find answers to common questions about Diarayao Outlet abayas, hijabs, modest fashion, shipping, returns, payments, and more.',
    images: ['https://www.diarayao.com/favicon.png'],
    creator: '@diarayaooutlet',
    site: '@diarayaooutlet',
  },
  alternates: {
    canonical: '/faq',
  },
};

export default function FAQPage() {
  return <FAQClient />;
}
