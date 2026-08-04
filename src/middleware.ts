import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSecureHeaders, getCSPHeaders } from './lib/security';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.nextUrl.hostname;
  const protocol = request.nextUrl.protocol;

  // SEO: 301 redirects for legacy index files to root
  if (pathname === '/index.html' || pathname === '/index.php' || pathname === '/default.aspx') {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url, 301);
  }

  // Force www and HTTPS for canonical URL
  const canonicalHost = 'www.diarayao.com';
  
  // Redirect non-www to www
  if (hostname === 'diarayao.com' || hostname === 'diarayaooutlet.pk') {
    const url = request.nextUrl.clone();
    url.hostname = canonicalHost;
    return NextResponse.redirect(url, 301);
  }

  // Redirect HTTP to HTTPS (only in production)
  if (protocol === 'http:' && process.env.NODE_ENV === 'production') {
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  // Allow login page to be accessible
  if (pathname === '/admin/login') {
    const response = NextResponse.next();
    addSecurityHeaders(response);
    return response;
  }

  // Check maintenance mode for non-admin routes
  if (!pathname.startsWith('/admin')) {
    try {
      // Construct absolute URL for the maintenance status endpoint
      const baseUrl = request.nextUrl.origin;
      const response = await fetch(`${baseUrl}/api/maintenance-status`, {
        cache: 'no-store',
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.maintenanceMode) {
          // Allow access to maintenance page itself
          if (pathname === '/maintenance') {
            const nextResponse = NextResponse.next();
            addSecurityHeaders(nextResponse);
            return nextResponse;
          }
          // Redirect to maintenance page
          return NextResponse.redirect(new URL('/maintenance', request.url));
        }
      }
    } catch (error) {
      console.error('Error checking maintenance mode:', error);
      // Continue normally if maintenance check fails
    }
  }

  // Check if the path is admin-related
  if (pathname.startsWith('/admin')) {
    // Check for auth token in cookies
    const authCookie = request.cookies.get('adminAuth');
    
    // In production, you would verify a proper JWT token
    // For now, we'll check if the user is authenticated
    if (!authCookie || authCookie.value !== 'true') {
      // Redirect to login page
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  const response = NextResponse.next();
  addSecurityHeaders(response);
  return response;
}

function addSecurityHeaders(response: NextResponse) {
  const secureHeaders = getSecureHeaders();
  const cspHeaders = getCSPHeaders();

  Object.entries(secureHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  Object.entries(cspHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
