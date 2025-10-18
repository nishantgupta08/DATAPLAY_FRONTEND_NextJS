export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://dataplay.co.in/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /debug-map/
Disallow: /geocoding-demo/
Disallow: /india-locations/
Disallow: /middleware-test/
Disallow: /parliamentary-constituencies/
Disallow: /pin-code-example/
Disallow: /youtube-test/

# Allow important pages
Allow: /
Allow: /landing
Allow: /courses/
Allow: /faq
Allow: /about
Allow: /contact

# Block specific file types
Disallow: *.json$
Disallow: *.xml$
Disallow: *.txt$

# Allow CSS and JS for proper rendering
Allow: /_next/static/
Allow: *.css
Allow: *.js
Allow: *.png
Allow: *.jpg
Allow: *.jpeg
Allow: *.gif
Allow: *.svg
Allow: *.webp

# Host directive
Host: dataplay.co.in`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400, s-maxage=86400", // Cache for 24 hours
    },
  });
}
