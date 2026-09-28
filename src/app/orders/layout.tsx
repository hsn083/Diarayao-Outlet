import { Metadata } from 'next';
import OrdersPage from './page';

export const metadata: Metadata = {
  title: 'My Orders | Diarayao Outlet',
  description: 'View and track your orders at Diarayao Outlet',
  robots: {
    index: false,
    follow: true,
  },
};

export default function OrdersLayout() {
  return <OrdersPage />;
}
