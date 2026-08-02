import type { Metadata, Viewport } from "next";
import { Inter, Poppins, Playfair_Display, Cinzel, Montserrat } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import SettingsProvider from "@/components/SettingsProvider";
import { ToastContainer } from "@/components/ui/toast";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { OrganizationSchema, WebsiteSchema, OnlineStoreSchema, WebPageSchema } from "@/components/StructuredData";
import WhatsAppButton from "@/components/WhatsAppButton";

// Force dynamic rendering to avoid build-time fetch issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800"],
  variable: '--font-poppins'
});
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: '--font-playfair-display'
});
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: '--font-cinzel'
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: '--font-montserrat'
});

async function getSettings() {
  try {
    // Use absolute URL for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.diarayao.com';
    const response = await fetch(`${baseUrl}/api/settings`, {
      cache: 'no-store',
    });
    if (response.ok) {
      const data = await response.json();
      return data.settings;
    }
  } catch (error) {
    console.error('Failed to fetch settings:', error);
  }
  return null;
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  
  const siteName = settings?.general?.siteName || 'Diarayao Outlet';
  const metaTitle = settings?.seo?.metaTitle || 'Diarayao Outlet | Buy Premium Abayas & Modest Dresses Online';
  const metaDescription = settings?.seo?.metaDescription || 'Shop premium Abayas, Hijabs, Modest Dresses and Islamic Fashion online at Diarayao Outlet. High-quality fabrics, elegant designs, fast delivery across Pakistan and secure shopping experience.';
  const metaKeywords = settings?.seo?.metaKeywords || 'Diarayao Outlet, Abaya Pakistan, Buy Abaya Online, Premium Abaya, Hijab Pakistan, Modest Fashion, Islamic Clothing, Women\'s Abaya, Modest Dresses, Luxury Abaya, Black Abaya, Kimono Abaya, Open Abaya, Nida Abaya, Pakistani Abaya, Abaya Collection, Muslim Fashion, Hijab Store, Abaya Online Pakistan, Islamic Wear';
  const ogImage = settings?.seo?.ogImage || 'https://www.diarayao.com/pic.jpg';
  const canonicalUrl = settings?.seo?.canonicalUrl || 'https://www.diarayao.com';
  const siteUrl = 'https://www.diarayao.com';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: metaTitle,
      template: '%s | Diarayao Outlet'
    },
    description: metaDescription,
    keywords: metaKeywords,
    applicationName: siteName,
    authors: [{ name: 'Diarayao Outlet' }],
    creator: 'Diarayao Outlet',
    publisher: 'Diarayao Outlet',
    manifest: '/manifest.json',
    icons: {
      icon: [
        { url: '/favicon.png', type: 'image/png' },
      ],
      shortcut: '/favicon.png',
      apple: [
        { url: '/favicon.png', type: 'image/png' },
      ],
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: settings?.seo?.ogTitle || 'Diarayao Outlet | Premium Abayas & Hijabs',
      description: settings?.seo?.ogDescription || 'Discover elegant Abayas, Hijabs and modest fashion with premium quality and nationwide delivery.',
      url: canonicalUrl,
      siteName: siteName,
      locale: 'en_PK',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteName} - Premium Abayas & Modest Fashion`,
          type: 'image/jpeg',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: settings?.seo?.twitterTitle || 'Diarayao Outlet',
      description: settings?.seo?.twitterDescription || 'Premium Abayas & Modest Fashion Online',
      images: [ogImage],
      creator: '@diarayaooutlet',
      site: '@diarayaooutlet',
    },
    robots: {
      index: settings?.seo?.robots !== 'noindex',
      follow: settings?.seo?.robots !== 'nofollow',
      googleBot: {
        index: settings?.seo?.robots !== 'noindex',
        follow: settings?.seo?.robots !== 'nofollow',
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    },
    category: 'ecommerce',
    other: {
      'msapplication-TileColor': '#F4A7B9',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': 'DIARAYAO OUTLET',
    },
  };
}

export function generateViewport(): Viewport {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#F43F7E',
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} ${playfairDisplay.variable} ${cinzel.variable} ${montserrat.variable}`}>
        <OrganizationSchema />
        <WebsiteSchema />
        <WebPageSchema />
        <OnlineStoreSchema />
        <SettingsProvider>
          {children}
        </SettingsProvider>

        <ToastContainer />
        <SpeedInsights />
        <WhatsAppButton />

      </body>
    </html>
  );
}
