import { Metadata } from 'next';
import ShopPage from './page';

export const metadata: Metadata = {
  title: 'Shop Abayas & Modest Dresses | Diarayao Outlet',
  description: 'Browse our complete collection of premium abayas, hijabs, and modest fashion. Elegant styles, quality fabrics, and fast delivery across Pakistan.',
  keywords: 'shop abayas Pakistan, buy abaya online, modest fashion store, hijab shop, Islamic clothing, modest dresses',
  openGraph: {
    title: 'Shop Abayas & Modest Dresses | Diarayao Outlet',
    description: 'Browse our complete collection of premium abayas, hijabs, and modest fashion.',
    url: 'https://www.diarayao.com/shop',
    siteName: 'Diarayao Outlet',
    locale: 'en_PK',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.diarayao.com/shop',
  },
};

export default function ShopLayout() {
  return <ShopPage />;
}
