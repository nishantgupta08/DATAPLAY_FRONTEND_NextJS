// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Dataplay – Data Science Learning Platform",
  description:
    "Dataplay is your data science learning hub: structured paths, interview prep, daily problems, and more for aspiring data professionals.",
  metadataBase: new URL("https://dataplay.co.in"),
  themeColor: "#ffffff",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="scroll-smooth" lang="en">
      <Head>
        <meta
          name="msvalidate.01"
          content="2B92D95F597E2458DEB18E6BD8AF8363"
        />
      </Head>
      <body className={`${inter.className} antialiased`}>
        <Header />
        {children}
        <Footer />

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Dataplay",
                alternateName: "Dataplay",
                url: "https://dataplay.co.in",
                logo: "https://dataplay.co.in/Brand-Logo.svg",
                sameAs: [
                  "https://www.instagram.com/dataplay_dataplay/",
                  "https://www.youtube.com/@DataPlay-dataplay",
                  "https://www.linkedin.com/company/data-play/",
                ],
                contactPoint: [
                  {
                    "@type": "ContactPoint",
                    telephone: "+91 7427071631",
                    contactType: "customer service",
                    areaServed: "IN",
                  },
                  {
                    "@type": "ContactPoint",
                    email: "hr@dataplay.co.in",
                    contactType: "support",
                    areaServed: "IN",
                  },
                ],
                description:
                  "Dataplay is a navigation hub for learners in data science, offering guided learning paths, daily practice problems, interview prep, and industry insights.",
              },
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                name: "Interview Prep – Dataplay",
                url: "https://dataplay.co.in/interviewprep",
                description:
                  "Practice questions on Linear Regression, PCA, Decision Trees, and more. Prepare for data science interviews with Dataplay.",
                breadcrumb: {
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Home",
                      item: "https://dataplay.co.in",
                    },
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: "Interview Prep",
                      item: "https://dataplay.co.in/interviewprep",
                    },
                  ],
                },
                mainEntity: {
                  "@type": "CreativeWork",
                  name: "Interview Prep",
                  publisher: {
                    "@type": "Organization",
                    name: "Dataplay",
                    url: "https://dataplay.co.in",
                  },
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                name: "Blogs – Dataplay",
                url: "https://dataplay.co.in/blogs",
                description: "Dataplay’s blog & insights section (coming soon).",
                breadcrumb: {
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Home",
                      item: "https://dataplay.co.in",
                    },
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: "Blogs",
                      item: "https://dataplay.co.in/blogs",
                    },
                  ],
                },
                mainEntity: {
                  "@type": "CollectionPage",
                  name: "Blogs",
                  publisher: {
                    "@type": "Organization",
                    name: "Dataplay",
                    url: "https://dataplay.co.in",
                  },
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                name: "Contact – Dataplay",
                url: "https://dataplay.co.in/contact",
                description: "Get in touch with Dataplay — contact details and inquiry form.",
                breadcrumb: {
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Home",
                      item: "https://dataplay.co.in",
                    },
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: "Contact",
                      item: "https://dataplay.co.in/contact",
                    },
                  ],
                },
              },
            ]),
          }}
        />
      </body>
    </html>
  );
}
