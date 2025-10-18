// Keyword Stuffing Utility for Local SEO
// This utility helps inject local keywords into existing content without creating dedicated pages

/**
 * Keyword stuffing configuration
 */
export interface KeywordStuffingConfig {
  density: number; // Keyword density percentage (1-5%)
  maxKeywords: number; // Maximum keywords to inject
  preserveOriginal: boolean; // Whether to preserve original content
}

/**
 * Default keyword stuffing configuration
 */
export const DEFAULT_KEYWORD_STUFFING_CONFIG: KeywordStuffingConfig = {
  density: 2, // 2% keyword density
  maxKeywords: 20, // Maximum 20 local keywords
  preserveOriginal: true
};

/**
 * Inject local keywords into existing content
 */
export const injectLocalKeywords = (
  content: string,
  keywords: string[],
  config: KeywordStuffingConfig = DEFAULT_KEYWORD_STUFFING_CONFIG
): string => {
  const primaryKeywords = keywords.slice(0, config.maxKeywords);
  
  // Calculate how many keywords to inject based on content length
  const contentLength = content.length;
  const targetKeywordCount = Math.floor((contentLength * config.density) / 100);
  const keywordsToInject = primaryKeywords.slice(0, Math.min(targetKeywordCount, config.maxKeywords));
  
  let enhancedContent = content;
  
  // Inject keywords naturally into content
  keywordsToInject.forEach((keyword, index) => {
    // Find natural insertion points
    const insertionPoints = [
      'Learn data science',
      'Master data science',
      'Data science training',
      'Data science course',
      'Data science bootcamp',
      'Data science certification',
      'Data science institute',
      'Data science classes',
      'Data science coaching',
      'Data science academy'
    ];
    
    const insertionPoint = insertionPoints[index % insertionPoints.length];
    const replacement = `${insertionPoint} - ${keyword}`;
    
    if (enhancedContent.includes(insertionPoint)) {
      enhancedContent = enhancedContent.replace(insertionPoint, replacement);
    } else {
      // Add keyword at the end of paragraphs
      enhancedContent = enhancedContent.replace(/\.\s/g, `. ${keyword}. `);
    }
  });
  
  return enhancedContent;
};

/**
 * Generate keyword-stuffed meta description
 */
export const generateKeywordStuffedDescription = (
  baseDescription: string,
  keywords: string[] = []
): string => {
  const selectedKeywords = keywords.slice(0, 5);
  
  const keywordString = selectedKeywords.join(', ');
  return `${baseDescription} ${keywordString}. Best data science course with placement assistance.`;
};

/**
 * Generate keyword-stuffed title
 */
export const generateKeywordStuffedTitle = (
  baseTitle: string,
  keywords: string[] = []
): string => {
  const selectedKeywords = keywords.slice(0, 3);
  
  return `${baseTitle} | ${selectedKeywords.join(' | ')}`;
};

/**
 * Generate keyword-stuffed content for different sections
 */
export const generateKeywordStuffedContent = {
  hero: () => `Master data science with our comprehensive courses. Learn Python, SQL, machine learning, and data engineering. Join 1000+ students across India. Expert mentors, real projects, job placement assistance.`,
  
  about: () => `Dataplay is the leading data science training institute, offering comprehensive data science courses, data analyst training, and data engineering bootcamps. Our data science certification programs are designed for beginners and working professionals.`,
  
  courses: () => `Explore our data science courses including Python programming, SQL database management, machine learning algorithms, and data visualization. Our data science bootcamp provides hands-on training with real-world projects.`,
  
  placement: () => `Get placed in top companies with our data science placement assistance. Our data science course has helped 1000+ students secure jobs in data science, data analysis, and data engineering roles across India.`,
  
  testimonials: () => `Hear from our successful students who completed data science training. Our data science course has transformed careers of professionals from various industries including IT, banking, healthcare, and e-commerce.`
};

/**
 * Generate keyword-stuffed FAQ content
 */
export const generateKeywordStuffedFAQ = () => [
  {
    question: "What is the best data science course?",
    answer: "Dataplay offers the best data science course with comprehensive curriculum covering Python, SQL, machine learning, and data engineering. Our data science training includes real-world projects and job placement assistance."
  },
  {
    question: "How much does data science course cost?",
    answer: "Our data science course is competitively priced with flexible payment options. Contact us for detailed pricing information about our data science training programs."
  },
  {
    question: "Is data science course good for beginners?",
    answer: "Yes, our data science course is designed for beginners with no prior programming experience. Our data science training starts from basics and gradually progresses to advanced topics."
  },
  {
    question: "What are the job opportunities after data science course?",
    answer: "After completing our data science course, you can work as data scientist, data analyst, data engineer, business analyst, or machine learning engineer in top companies across India."
  },
  {
    question: "How long is the data science course?",
    answer: "Our data science course duration varies from 12-20 weeks depending on the track you choose. We offer flexible timings for working professionals."
  }
];

/**
 * Generate keyword-stuffed blog content
 */
export const generateKeywordStuffedBlogContent = () => [
  {
    title: "Why Choose Data Science Course?",
    content: `Data science is emerging as a major field in India, making it an ideal career choice. Our data science course provides access to industry connections, job opportunities, and networking events. The data science training is designed to meet the growing demand for data professionals in the region.`
  },
  {
    title: "Top Data Science Companies in India",
    content: `India is home to several IT companies and startups that hire data science professionals. Companies like Infosys, TCS, Wipro, and local startups are actively recruiting data scientists, data analysts, and data engineers. Our data science course prepares you for these opportunities.`
  },
  {
    title: "Data Science Salary Trends in India",
    content: `Data science professionals in India earn competitive salaries ranging from ₹4-15 LPA depending on experience and skills. Our data science course helps you develop the skills needed to command higher salaries in the data science field.`
  }
];

/**
 * Generate keyword-stuffed navigation menu
 */
export const generateKeywordStuffedNavigation = () => [
  { label: "Data Science Course", href: "/courses" },
  { label: "Data Science Training", href: "/training" },
  { label: "Data Science Bootcamp", href: "/bootcamp" },
  { label: "Data Science Certification", href: "/certification" },
  { label: "Data Science Jobs", href: "/jobs" }
];

/**
 * Generate keyword-stuffed footer content
 */
export const generateKeywordStuffedFooter = () => ({
  description: "Dataplay is the leading data science training institute, offering comprehensive data science courses, data analyst training, and data engineering bootcamps. Our data science certification programs are designed for beginners and working professionals.",
  links: [
    { label: "Data Science Course", href: "/courses" },
    { label: "Data Science Training", href: "/training" },
    { label: "Data Science Bootcamp", href: "/bootcamp" },
    { label: "Data Science Certification", href: "/certification" },
    { label: "Data Science Jobs", href: "/jobs" },
    { label: "Data Science Institute", href: "/institute" },
    { label: "Data Science Classes", href: "/classes" },
    { label: "Data Science Coaching", href: "/coaching" }
  ]
});

/**
 * Generate keyword-stuffed schema markup
 */
export const generateKeywordStuffedSchema = () => ({
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Dataplay - Data Science Training Center",
  "description": "Premier data science training institute offering comprehensive data science courses, data analyst training, and data engineering bootcamps.",
  "url": "https://dataplay.co.in",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "India",
    "addressRegion": "India",
    "addressCountry": "IN"
  },
  "areaServed": ["India"],
  "course": [
    {
      "@type": "Course",
      "name": "Data Science Course",
      "description": "Comprehensive data science training with Python, SQL, and machine learning"
    },
    {
      "@type": "Course", 
      "name": "Data Analyst Training",
      "description": "Data analyst course with real-world projects and job placement"
    }
  ]
});

/**
 * Generate keyword-stuffed social media content
 */
export const generateKeywordStuffedSocialContent = () => ({
  facebook: "Join the best data science course! Learn Python, SQL, machine learning, and data engineering with real-world projects. Get job placement assistance in top companies. Enroll now!",
  twitter: "🚀 Master data science! Our comprehensive data science course covers Python, SQL, ML & data engineering. Real projects, expert mentors, job placement. #DataScience #DataScienceCourse",
  linkedin: "Transform your career with our data science course. Learn from industry experts, work on real projects, and get placed in top companies. Join 1000+ successful students.",
  instagram: "📊 Ready to start your data science journey? Our data science course offers hands-on training with Python, SQL, and machine learning. Swipe to learn more! #DataScience #DataScienceCourse"
});
