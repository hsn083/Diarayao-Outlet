'use client';

import { usePathname } from 'next/navigation';
import AnnouncementBar from './AnnouncementBar';

export default function AnnouncementBarWrapper() {
  const pathname = usePathname();
  
  // Hide AnnouncementBar on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  
  return <AnnouncementBar />;
}
