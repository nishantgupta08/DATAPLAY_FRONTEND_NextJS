import contentData from "@/data/content.json"; // 1. Import your JSON data

// Base URL for the domain
const URL = "https://www.dataplay.co.in";
// Current date for <lastmod> field (or use a dynamic function)
const LASTMOD = new Date().toISOString().split('T')[0]; // Gets YYYY-MM-DD format

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
    <priority>0.80</priority>
  </url>`;
  }).join(''); // Join all the generated strings together
}

export async function GET() {
  const courseUrls = generateCourseSitemapUrls();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
             http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
  <url>
    <loc>${URL}/</loc>
    <lastmod>${LASTMOD}</lastmod>
    <priority>1.00</priority>
  </url>
  
  ${courseUrls}

  <url>
    <loc>${URL}/interviewprep</loc>
    <lastmod>${LASTMOD}</lastmod>
    <priority>0.70</priority>
  </url>
  <url>
    <loc>${URL}/blogs</loc>
    <lastmod>${LASTMOD}</lastmod>
    <priority>0.70</priority>
  </url>
  <url>
    <loc>${URL}/contact</loc>
    <lastmod>${LASTMOD}</lastmod>
    <priority>0.70</priority>
  </url>
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}