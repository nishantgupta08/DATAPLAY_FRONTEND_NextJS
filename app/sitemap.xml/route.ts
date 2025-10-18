import contentData from "@/data/content.json"; // 1. Import your JSON data

// Base URL for the domain
const URL = "https://dataplay.co.in";
// Current date for <lastmod> field (or use a dynamic function)
const LASTMOD = new Date().toISOString().split('T')[0]; // Gets YYYY-MM-DD format

// Static pages with their priorities and change frequencies
const STATIC_PAGES = [
  { url: "/", priority: "1.00", changefreq: "weekly" },
  { url: "/landing", priority: "0.95", changefreq: "weekly" },
  { url: "/faq", priority: "0.80", changefreq: "monthly" },
  { url: "/courses", priority: "0.90", changefreq: "weekly" },
  { url: "/about", priority: "0.70", changefreq: "monthly" },
  { url: "/contact", priority: "0.70", changefreq: "monthly" },
  { url: "/privacy", priority: "0.50", changefreq: "yearly" },
  { url: "/terms", priority: "0.50", changefreq: "yearly" },
];

// 2. Function to generate the <url> XML blocks for the courses
function generateCourseSitemapUrls() {
  const courses = contentData.homepage.courses.courses;

  return courses.map((course) => {
    // Dynamically create the URL slug from the course title (e.g., "Data Analyst" -> "data-analyst")
    const slug = course.title.toLowerCase().replace(/\s+/g, '-');
    const courseUrl = `${URL}/courses/${slug}`;

    return `
  <url>
    <loc>${courseUrl}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`;
  }).join(''); // Join all the generated strings together
}

// 3. Function to generate static page URLs
function generateStaticPageUrls() {
  return STATIC_PAGES.map((page) => `
  <url>
    <loc>${URL}${page.url}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('');
}

export async function GET() {
  const courseUrls = generateCourseSitemapUrls();
  const staticUrls = generateStaticPageUrls();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
             http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
  ${staticUrls}
  ${courseUrls}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400", // Cache for 24 hours
    },
  });
}