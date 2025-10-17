import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Security headers middleware
export function securityHeaders() {
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
  );
  
  return response;
}

// Rate limiting middleware
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(request: NextRequest, limit: number = 100, windowMs: number = 15 * 60 * 1000) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  const now = Date.now();
  const windowStart = now - windowMs;
  
  const current = rateLimitMap.get(ip);
  
  if (!current || current.resetTime < windowStart) {
    rateLimitMap.set(ip, { count: 1, resetTime: now });
    return NextResponse.next();
  }
  
  if (current.count >= limit) {
    return new NextResponse('Too Many Requests', { status: 429 });
  }
  
  current.count++;
  return NextResponse.next();
}

// CORS middleware
export function corsHeaders() {
  const response = NextResponse.next();
  
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  return response;
}

// Main middleware function
export function middleware(request: NextRequest) {
  // Apply security headers
  let response = securityHeaders();
  
  // Apply rate limiting for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response = rateLimit(request, 100, 15 * 60 * 1000);
  }
  
  // Apply CORS for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response = corsHeaders();
  }
  
  return response;
}

// Configure middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
