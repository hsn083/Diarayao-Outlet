import type { Viewport } from "next";
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import connectDB from '@/lib/db';
import User from '@/models/User';

export function generateViewport(): Viewport {
  return {
    width: '1280',
    initialScale: 0.5,
    maximumScale: 5,
    userScalable: true,
  };
}

async function verifyAdminAccess() {
  try {
    const sessionToken = cookies().get('customer_session')?.value;

    if (!sessionToken) {
      return null;
    }

    await connectDB();

    const user = await User.findById(sessionToken);

    if (!user || !user.isActive || user.isBlocked || user.isDeleted) {
      return null;
    }

    // Check if user has admin role
    if (user.role !== 'admin') {
      return null;
    }

    return user;
  } catch (error) {
    console.error('[ADMIN-LAYOUT] Auth verification error:', error);
    return null;
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminUser = await verifyAdminAccess();

  if (!adminUser) {
    redirect('/account?redirect=/admin');
  }

  return <>{children}</>;
}
