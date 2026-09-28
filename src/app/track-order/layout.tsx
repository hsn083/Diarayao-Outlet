import { Metadata } from 'next';
import TrackOrderPage from './page';

export const metadata: Metadata = {
  title: 'Track Your Order | Diarayao Outlet',
  description: 'Track your Diarayao Outlet order in real-time. Enter your order ID to check delivery status, shipping progress, and estimated arrival date.',
  keywords: 'track order Diarayao Outlet, order tracking Pakistan, shipment tracking, delivery status, order status',
  openGraph: {
    title: 'Track Your Order | Diarayao Outlet',
    description: 'Track your Diarayao Outlet order in real-time. Enter your order ID to check delivery status.',
    url: 'https://www.diarayao.com/track-order',
    siteName: 'Diarayao Outlet',
    locale: 'en_PK',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.diarayao.com/track-order',
  },
};

export default function TrackOrderLayout() {
  return <TrackOrderPage />;
}
