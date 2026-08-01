import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us - Diarayao Outlet',
  description: 'Contact Diarayao Outlet for any questions about our premium abayas, hijabs, and modest fashion. Reach us via phone, email, WhatsApp, or visit our store in Faisalabad, Pakistan.',
  keywords: 'contact Diarayao Outlet, customer support, abaya store contact, Pakistan fashion store contact, WhatsApp support',
  openGraph: {
    title: 'Contact Us - Diarayao Outlet',
    description: 'Contact Diarayao Outlet for any questions about our premium abayas, hijabs, and modest fashion.',
    url: 'https://www.diarayao.com/contact',
    siteName: 'Diarayao Outlet',
    locale: 'en_PK',
    type: 'website',
    images: [
      {
        url: 'https://www.diarayao.com/pic.jpg',
        width: 1200,
        height: 630,
        alt: 'Diarayao Outlet - Contact Us',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Diarayao Outlet',
    description: 'Contact Diarayao Outlet for any questions about our premium abayas, hijabs, and modest fashion.',
    images: ['https://www.diarayao.com/pic.jpg'],
    creator: '@diarayaooutlet',
    site: '@diarayaooutlet',
  },
  alternates: {
    canonical: 'https://www.diarayao.com/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
