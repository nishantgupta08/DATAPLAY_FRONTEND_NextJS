import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Performance headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Download-Options', 'noopen');
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');
  
  // SEO headers
  response.headers.set('X-Robots-Tag', 'index, follow');
  
  // Cache headers for static assets
  if (request.nextUrl.pathname.startsWith('/_next/static/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // Cache headers for images
  if (request.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // Cache headers for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  }
  
  // Redirect www to non-www for SEO
  if (request.nextUrl.hostname.startsWith('www.')) {
    const url = request.nextUrl.clone();
    url.hostname = url.hostname.replace('www.', '');
    return NextResponse.redirect(url, 301);
  }
  
  // Force HTTPS in production
  if (process.env.NODE_ENV === 'production' && request.headers.get('x-forwarded-proto') !== 'https') {
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }
  
  // Note: Removed trailing slash redirect to prevent conflicts with Next.js dynamic routes
  // Next.js handles routing internally and doesn't require trailing slashes for dynamic routes
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - static files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};