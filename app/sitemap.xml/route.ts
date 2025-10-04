// app/sitemap.xml/route.ts
import { NextResponse } from "next/server";

export async function GET() {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <url>
    <loc>https://www.dataplay.co.in/</loc>
    <lastmod>2025-10-03T12:57:46+00:00</lastmod>
    <priority>1.00</priority>
  </url>
  <url>
    <loc>https://www.dataplay.co.in/courses/1</loc>
    <lastmod>2025-10-03T12:57:46+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://www.dataplay.co.in/courses/2</loc>
    <lastmod>2025-10-03T12:57:46+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://www.dataplay.co.in/courses/3</loc>
    <lastmod>2025-10-03T12:57:46+00:00</lastmod>
    <priority>0.80</priority>
  </url>
</urlset>`;

    return new Response(sitemap, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
