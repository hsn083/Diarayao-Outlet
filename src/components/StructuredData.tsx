'use client';

import { useEffect } from 'react';

interface StructuredDataProps {
  data: Record<string, any>;
}

export default function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    // Add JSON-LD to head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    script.id = `structured-data-${data['@type']}`;
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(`structured-data-${data['@type']}`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [data]);

  return null;
}

// Organization Schema
export function OrganizationSchema() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Diarayao Outlet',
    alternateName: 'DiarayaoOutlet',
    url: 'https://www.diarayao.com',
    logo: 'https://www.diarayao.com/favicon.png',
    image: 'https://www.diarayao.com/favicon.png',
    description: 'Shop premium abayas, hijabs, modest dresses and Islamic fashion at Diarayao Outlet. Elegant styles, quality fabrics, fast delivery across Pakistan.',
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PK',
      addressRegion: 'Pakistan',
      addressLocality: 'Faisalabad',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+92 300 1234567',
      email: 'diarayaooutlet@gmail.com',
      contactType: 'customer service',
      availableLanguage: 'English',
      areaServed: 'PK',
    },
    sameAs: [
      'https://www.facebook.com/diarayaooutlet',
      'https://www.instagram.com/diarayaooutlet',
      'https://www.tiktok.com/@diarayaooutlet',
      'https://wa.me/923001234567',
    ],
  };

  return <StructuredData data={organizationData} />;
}

// Website Schema
export function WebsiteSchema() {
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Diarayao Outlet',
    alternateName: 'DiarayaoOutlet',
    url: 'https://www.diarayao.com',
    description: 'Shop premium abayas, hijabs, modest dresses and Islamic fashion at Diarayao Outlet. Elegant styles, quality fabrics, fast delivery across Pakistan.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.diarayao.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Diarayao Outlet',
      url: 'https://www.diarayao.com',
    },
  };

  return <StructuredData data={websiteData} />;
}

// WebPage Schema for homepage
export function WebPageSchema() {
  const webPageData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Diarayao Outlet - Premium Abayas & Modest Fashion',
    url: 'https://www.diarayao.com',
    description: 'Shop premium abayas, hijabs, modest dresses and Islamic fashion at Diarayao Outlet. Elegant styles, quality fabrics, fast delivery across Pakistan.',
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Diarayao Outlet',
      url: 'https://www.diarayao.com',
    },
    about: {
      '@type': 'Organization',
      name: 'Diarayao Outlet',
      url: 'https://www.diarayao.com',
    },
  };

  return <StructuredData data={webPageData} />;
}

// Online Store Schema
export function OnlineStoreSchema() {
  const storeData = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'Diarayao Outlet',
    image: 'https://www.diarayao.com/favicon.png',
    logo: 'https://www.diarayao.com/favicon.png',
    description: 'Shop premium abayas, hijabs, modest dresses and Islamic fashion at Diarayao Outlet. Elegant styles, quality fabrics, fast delivery across Pakistan.',
    url: 'https://www.diarayao.com',
    telephone: '+92 300 1234567',
    email: 'diarayaooutlet@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PK',
      addressRegion: 'Pakistan',
      addressLocality: 'Faisalabad',
    },
    priceRange: 'PKR',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    acceptsReservations: false,
  };

  return <StructuredData data={storeData} />;
}

// Breadcrumb Schema
export function BreadcrumbSchema({ items }: { items: Array<{ name: string; item: string }> }) {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://www.diarayao.com${item.item}`,
    })),
  };

  return <StructuredData data={breadcrumbData} />;
}

// Product Schema (for individual products)
export function ProductSchema({
  name,
  description,
  image,
  price,
  currency = 'PKR',
  availability = 'InStock',
  brand = 'Diarayao Outlet',
  averageRating,
  reviewCount,
}: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  availability?: string;
  brand?: string;
  averageRating?: number;
  reviewCount?: number;
}) {
  const productData: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      url: `https://www.diarayao.com/product/${name.toLowerCase().replace(/\s+/g, '-')}`,
      seller: {
        '@type': 'Organization',
        name: 'Diarayao Outlet',
      },
    },
  };

  // Add aggregate rating if available
  if (averageRating && reviewCount) {
    productData.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: averageRating,
      reviewCount: reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return <StructuredData data={productData} />;
}
