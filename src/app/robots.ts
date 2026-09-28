import { MetadataRoute } from 'next'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.diarayao.com'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/api',
        '/auth',
        '/cart',
        '/checkout',
        '/orders',
        '/wishlist',
        '/account',
        '/dashboard',
        '/private',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
