// Example: How to use the organized SEO library in a page component
import React from 'react';
import Head from 'next/head';
import { 
  generateOrganizationSchema,
  generateCourseSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateWebsiteSchema,
  generateMetaTags,
  generateSEOTitle,
  generateMetaDescription,
  extractKeywords,
  trackCourseView,
  trackFormSubmission,
  DATAPLAY_ORGANIZATION,
  DATAPLAY_FAQS,
  DATAPLAY_WEBSITE,
  BREADCRUMB_PATTERNS,
  SEO_CONFIG
} from '../index';

// Example: Course Page with SEO
export function CoursePageExample({ course }: { course: { title: string; description: string; id: string; [key: string]: unknown } }) {
  const courseTitle = course.title;
  const courseDescription = course.description;
  const courseUrl = `https://dataplay.co.in/courses/${course.id}`;
  
  // Generate SEO data
  const seoData = {
    title: generateSEOTitle(`${courseTitle} - ${courseDescription}`),
    description: generateMetaDescription(courseDescription),
    keywords: extractKeywords(courseDescription),
    canonical: courseUrl,
    ogImage: course.image,
    ogType: 'website',
    geo: {
      region: 'IN',
      placename: 'India',
      position: '20.5937;78.9629',
      icbm: '20.5937, 78.9629'
    }
  };
  
  // Generate structured data
  const courseSchema = generateCourseSchema({
    name: courseTitle,
    description: courseDescription,
    provider: 'Dataplay',
    url: courseUrl,
    image: typeof course.image === 'string' ? course.image : undefined,
    teaches: Array.isArray(course.topics) ? course.topics : [],
    price: 7500,
    currency: 'INR',
    courseMode: 'online',
    educationalLevel: 'beginner',
    inLanguage: 'en'
  });
  
  const breadcrumbSchema = generateBreadcrumbSchema(
    BREADCRUMB_PATTERNS.course(courseTitle, courseUrl)
  );
  
  const organizationSchema = generateOrganizationSchema(DATAPLAY_ORGANIZATION);
  
  const structuredData = [courseSchema, breadcrumbSchema, organizationSchema];
  
  // Track analytics
  React.useEffect(() => {
    trackCourseView(courseTitle, course.id);
  }, [courseTitle, course.id]);
  
  return (
    <>
      <Head>
        {/* Meta Tags */}
        {generateMetaTags(seoData).map((tag, index) => (
          tag.name ? (
            <meta key={index} name={tag.name} content={tag.content} />
          ) : (
            <meta key={index} property={tag.property} content={tag.content} />
          )
        ))}
        
        {/* Canonical URL */}
        <link rel="canonical" href={seoData.canonical} />
        
        {/* Structured Data */}
        {structuredData.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </Head>
      
      {/* Page Content */}
      <div>
        <h1>{courseTitle}</h1>
        <p>{courseDescription}</p>
        {/* Rest of your page content */}
      </div>
    </>
  );
}

// Example: FAQ Page with SEO
export function FAQPageExample() {
  const seoData = {
    title: generateSEOTitle('FAQ - Frequently Asked Questions'),
    description: generateMetaDescription('Get answers to common questions about Dataplay courses, mentorship, and career outcomes.'),
    keywords: ['FAQ', 'questions', 'data science course', 'enrollment'],
    canonical: 'https://dataplay.co.in/faq',
    geo: {
      region: 'IN',
      placename: 'India',
      position: '20.5937;78.9629',
      icbm: '20.5937, 78.9629'
    }
  };
  
  const faqSchema = generateFAQSchema(DATAPLAY_FAQS);
  const breadcrumbSchema = generateBreadcrumbSchema(BREADCRUMB_PATTERNS.faq);
  const websiteSchema = generateWebsiteSchema(DATAPLAY_WEBSITE);
  
  const structuredData = [faqSchema, breadcrumbSchema, websiteSchema];
  
  return (
    <>
      <Head>
        {generateMetaTags(seoData).map((tag, index) => (
          tag.name ? (
            <meta key={index} name={tag.name} content={tag.content} />
          ) : (
            <meta key={index} property={tag.property} content={tag.content} />
          )
        ))}
        
        <link rel="canonical" href={seoData.canonical} />
        
        {structuredData.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </Head>
      
      <div>
        <h1>Frequently Asked Questions</h1>
        {DATAPLAY_FAQS.map((faq, index) => (
          <div key={index}>
            <h2>{faq.question}</h2>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </>
  );
}

// Example: Homepage with SEO
export function HomePageExample() {
  const seoData = {
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    keywords: SEO_CONFIG.defaultKeywords,
    canonical: SEO_CONFIG.siteUrl,
    geo: {
      region: 'IN',
      placename: 'India',
      position: '20.5937;78.9629',
      icbm: '20.5937, 78.9629'
    }
  };
  
  const websiteSchema = generateWebsiteSchema(DATAPLAY_WEBSITE);
  const organizationSchema = generateOrganizationSchema(DATAPLAY_ORGANIZATION);
  
  const structuredData = [websiteSchema, organizationSchema];
  
  return (
    <>
      <Head>
        {generateMetaTags(seoData).map((tag, index) => (
          tag.name ? (
            <meta key={index} name={tag.name} content={tag.content} />
          ) : (
            <meta key={index} property={tag.property} content={tag.content} />
          )
        ))}
        
        <link rel="canonical" href={seoData.canonical} />
        
        {structuredData.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </Head>
      
      <div>
        <h1>Welcome to Dataplay</h1>
        <p>Master data science with comprehensive courses and expert mentorship.</p>
        {/* Rest of your homepage content */}
      </div>
    </>
  );
}

// Example: Form with Analytics Tracking
export function ContactFormExample() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // Track form submission
    trackFormSubmission('contact-form');
    
    // Your form submission logic
    console.log('Form submitted:', formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" required />
      <input type="email" placeholder="Email" required />
      <textarea placeholder="Message" required />
      <button type="submit">Send Message</button>
    </form>
  );
}
