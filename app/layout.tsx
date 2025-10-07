// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import contentData from "@/app/assets/content.json";
// 1. Import the Script component from next/script
import Script from 'next/script';

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  // ... existing metadata ...
  title: "Dataplay – Data Science Learning Platform",
  description:
    "Dataplay is your data science learning hub: structured paths, interview prep, daily problems, and more for aspiring data professionals.",
  metadataBase: new URL("https://dataplay.co.in"),
  themeColor: "#ffffff",
  // ... other metadata fields ...
  openGraph: {
    title: "Dataplay – Data Science Learning Platform",
    description:
      "Structured paths, interview prep, daily challenges, and real-world insights for aspiring data professionals.",
    url: "https://dataplay.co.in",
    siteName: "Dataplay",
    images: [
      {
        url: "https://dataplay.co.in/Brand-Logo.svg",
        width: 1200,
        height: 630,
        alt: "Dataplay Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dataplay – Data Science Learning Platform",
    description:
      "Master data science with Dataplay: curated paths, interview questions, and industry insights.",
    images: ["https://dataplay.co.in/Brand-Logo.svg"],
    site: "@dataplay",
  },
  verification: {
    google: "SOdoDmVwmitkQciSMId7J2IbqHKcoyhdKRCX9VkHSYk",
  },
};

// --- START: Dynamic Schema Generation ---
// ... existing dynamic schema generation logic ...
const courseListElements = contentData.homepage.courses.courses.map((course, index) => {
  // Determine the URL path based on course title (e.g., "Data Analyst" -> "data-analyst")
  const urlSlug = course.title.toLowerCase().replace(/\s+/g, '-');
  const courseUrl = `https://www.dataplay.co.in/courses/${urlSlug}`;
  const description = contentData.courses.find(c => c.title === course.title)?.sub_title || `${course.title} course offered by Dataplay.`;

  return {
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Course",
      "name": course.title,
      "description": description,
      "url": courseUrl,
      "provider": {
        "@type": "Organization",
        "name": "DataPlay",
        "url": "https://www.dataplay.co.in"
      }
    }
  };
});

// Create the dynamic ItemList schema
const courseItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "DataPlay Courses",
  "url": "https://www.dataplay.co.in/#courses",
  "itemListOrder": "https://schema.org/ItemListOrderAscending",
  "numberOfItems": courseListElements.length,
  "itemListElement": courseListElements
};
// --- END: Dynamic Schema Generation ---

// 3. Define the static schemas that don't need to change
const staticSchemas = [
  // New LocalBusiness Schema
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "DataPlay",
    "alternateName": "Dataplay Data Science Institute",
    "description": "DataPlay offers data science courses, mock interviews, real‑world projects, and skill development training.",
    "url": "https://www.dataplay.co.in/",
    "telephone": "+91 7427 0716 31",
    "email": "hr@dataplay.co.in",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "E2/202 Chitrakoot, Near Mall of Jaipur, Chitrakoot Scheme",
      "addressLocality": "Jaipur",
      "addressRegion": "Rajasthan",
      "postalCode": "302021",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 26.8906,
      "longitude": 75.7537
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ],
        "opens": "08:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "10:00",
        "closes": "20:00"
      }
    ],
    "logo": "https://www.dataplay.co.in/path/to/logo.png",
    "image": [
      "https://www.dataplay.co.in/path/to/image1.jpg",
      "https://www.dataplay.co.in/path/to/image2.jpg"
    ],
    "sameAs": [
      "https://www.facebook.com/YourPage",
      "https://www.linkedin.com/company/dataplay",
      "https://twitter.com/YourProfile"
    ],
    "priceRange": "₹₹"
  },
  // Static Organization Schema (updated to match the original Corporation schema)
  {
    "@context": "https://schema.org",
    "@type": "Corporation",
    "name": "Dataplay",
    "alternateName": "Dataplay",
    "url": "https://www.dataplay.co.in/",
    "logo": "https://www.dataplay.co.in/Brand-Logo.svg",
    "sameAs": [
      "https://www.linkedin.com/company/data-play/",
      "https://www.dataplay.co.in/",
      "https://www.instagram.com/dataplay_dataplay/"
    ]
  },
  // Static Consultancy Service Schema
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Consultancy",
    "url": "https://www.dataplay.co.in/#consultancy",
    "description": "DataPlay offers expert consultancy services to help design your data science & design learning path, career roadmap, resume building, interview preparation, and personalized mentorship.",
    "provider": {
      "@type": "Organization",
      "name": "DataPlay",
      "url": "https://www.dataplay.co.in"
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "audience": {
      "@type": "Audience",
      "description": "Individuals seeking guidance in data science, design careers, interview preparation, resume help"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Consultancy Packages",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Career Roadmap & Mentorship",
          "description": "One‑on‑one mentorship including career planning, resume review, mock interview sessions",
          "url": "https://www.dataplay.co.in/consultancy/roadmap‑mentorship",
          "priceCurrency": "INR",
          "price": "XXXX"
        },
        {
          "@type": "Offer",
          "name": "Resume & Interview Prep",
          "description": "Professional resume crafting, interview coaching, behavioral & technical mock interviews",
          "url": "https://www.dataplay.co.in/consultancy/resume‑interview",
          "priceCurrency": "INR",
          "price": "YYYY"
        }
      ]
    },
    "keywords": "consultancy, mentorship, career guidance, interview prep, resume building"
  },
  // Static Corporate Training Service Schema
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Corporate Training",
    "url": "https://www.dataplay.co.in/#corporate-training",
    "description": "DataPlay offers corporate training programs tailored for companies to upskill their teams in Data Science, Data Engineering, Web Development, Design, and other cutting‑edge technologies.",
    "provider": {
      "@type": "Organization",
      "name": "DataPlay",
      "url": "https://www.dataplay.co.in"
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "audience": {
      "@type": "Audience",
      "description": "Businesses, enterprises, HR teams seeking training solutions for their employees"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Corporate Training Programs",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Custom Data Science Training",
          "description": "Hands‑on training in data science tools, machine learning, practical projects for corporate teams",
          "url": "https://www.dataplay.co.in/corporate‑training/data‑science",
          "priceCurrency": "INR",
          "price": "XXXX"
        },
        {
          "@type": "Offer",
          "name": "Full Stack Web Development Program",
          "description": "Training covering front‑end, back‑end, deployment & best practices for corporate developers",
          "url": "https://www.dataplay.co.in/corporate‑training/web‑development",
          "priceCurrency": "INR",
          "price": "YYYY"
        }
      ]
    },
    "keywords": "corporate training, team upskilling, enterprise education, professional development"
  }
];

// Combine all schemas: dynamic ItemList + static Services + Organization + NEW LocalBusiness
const allSchemas = [
  ...staticSchemas,
  courseItemListSchema
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="scroll-smooth" lang="en">
      {/* 2. GTM Script Component (The main GTM JS code) */}
      <Script
        id="google-tag-manager-script"
        strategy="afterInteractive" // Loads after the hydration and during idle time
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MM2QG7MX');`,
        }}
      />

      <head>
        <link rel="icon" href="favicon.ico" sizes="any" />

        {/* Bing Webmaster Tools Verification */}
        <meta
          name="msvalidate.01"
          content="2B92D95F597E2458DEB18E6BD8AF8363"
        />

        {/* Ahrefs */}
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="n4oMg1W0qhvtHJnie+Xw5w"
          async
        ></script>

        {/* Google Ads Global site tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17139511988"
          strategy="afterInteractive"
        />

        <Script id="gtag-init" strategy="afterInteractive">
          {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-17139511988');
    `}
        </Script>
      </head>

      <body className={`${inter.className} antialiased`}>
        {/* 3. GTM Noscript Tag (Immediately after opening <body> tag) */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MM2QG7MX"
            height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}>
          </iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <Header />
        {children}
        <Footer />

        {/* Structured Data (JSON-LD) - Combined Static and Dynamic Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(allSchemas),
          }}
        />
      </body>
    </html>
  );
}