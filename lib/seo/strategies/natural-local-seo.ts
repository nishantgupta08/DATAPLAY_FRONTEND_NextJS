// Natural Local SEO Strategy for Jaipur
// Focus on quality content and natural keyword integration

/**
 * Natural keyword density guidelines
 */
export const NATURAL_SEO_GUIDELINES = {
  // Optimal keyword density (1-2%)
  keywordDensity: {
    primary: 1.5, // 1.5% for primary keywords
    secondary: 1.0, // 1% for secondary keywords
    longTail: 0.5 // 0.5% for long-tail keywords
  },
  
  // Content quality metrics
  contentQuality: {
    minWordCount: 300,
    maxWordCount: 2000,
    readabilityScore: 60, // Flesch Reading Ease
    headingStructure: true,
    internalLinks: 3, // Minimum internal links
    externalLinks: 1 // Minimum external links
  },
  
  // Natural keyword placement
  keywordPlacement: {
    title: 1, // Once in title
    h1: 1, // Once in H1
    h2: 2, // Twice in H2 tags
    firstParagraph: 1, // Once in first paragraph
    lastParagraph: 1, // Once in last paragraph
    metaDescription: 1, // Once in meta description
    altText: 1 // Once in alt text
  }
};

/**
 * Natural keyword integration for Jaipur
 */
export const NATURAL_JAIPUR_KEYWORDS = {
  // Primary keywords (use 1-2 times naturally)
  primary: [
    'data science course Jaipur',
    'data science training Jaipur',
    'data science bootcamp Jaipur'
  ],
  
  // Secondary keywords (use 1 time naturally)
  secondary: [
    'data science certification Jaipur',
    'data science institute Jaipur',
    'data science classes Jaipur'
  ],
  
  // Long-tail keywords (use naturally in content)
  longTail: [
    'best data science course in Jaipur',
    'data science course with placement in Jaipur',
    'data science training for beginners in Jaipur'
  ],
  
  // Semantic keywords (related terms)
  semantic: [
    'Python programming Jaipur',
    'machine learning Jaipur',
    'data analysis Jaipur',
    'SQL training Jaipur',
    'artificial intelligence Jaipur'
  ]
};

/**
 * Natural content templates for Jaipur
 */
export const NATURAL_CONTENT_TEMPLATES = {
  hero: () => `Master data science with comprehensive courses designed for professionals in Jaipur. Learn Python, SQL, machine learning, and data engineering with hands-on projects and expert mentorship.`,
  
  about: () => `Dataplay offers industry-leading data science education in Jaipur, combining theoretical knowledge with practical experience. Our courses are designed by industry experts and taught by experienced professionals.`,
  
  courses: () => `Explore our comprehensive data science curriculum covering Python programming, SQL database management, machine learning algorithms, and data visualization. Each course includes real-world projects and industry case studies.`,
  
  placement: () => `Our students have been successfully placed in top companies across India, including major IT firms in Jaipur. We provide career guidance, resume building, and interview preparation to ensure your success.`,
  
  testimonials: () => `Hear from our successful graduates who have transformed their careers through our data science programs. Our alumni work in leading companies across various industries.`
};

/**
 * Natural FAQ content for Jaipur
 */
export const NATURAL_FAQ_CONTENT = [
  {
    question: "What makes Dataplay the best choice for data science education in Jaipur?",
    answer: "Dataplay combines industry expertise with practical learning. Our curriculum is designed by professionals who work in the field, ensuring you learn the most relevant skills. We also provide placement assistance and career guidance."
  },
  {
    question: "How long does it take to complete the data science course?",
    answer: "Our data science program is designed to be completed in 12-20 weeks, depending on the track you choose. We offer flexible schedules to accommodate working professionals."
  },
  {
    question: "Do you provide job placement assistance?",
    answer: "Yes, we have a dedicated placement team that helps students with resume building, interview preparation, and connecting with potential employers. Many of our students have secured positions in top companies."
  },
  {
    question: "What prerequisites are required for the data science course?",
    answer: "No prior programming experience is required. Our course starts from the basics and gradually builds up to advanced topics. We welcome students from all educational backgrounds."
  },
  {
    question: "Are the courses available online or offline?",
    answer: "We offer both online and offline options to accommodate different learning preferences. Our offline classes are conducted in Jaipur with state-of-the-art facilities."
  }
];

/**
 * Natural blog content ideas for Jaipur
 */
export const NATURAL_BLOG_CONTENT = [
  {
    title: "Why Jaipur is Becoming a Hub for Data Science Careers",
    content: `Jaipur's growing IT sector and startup ecosystem make it an ideal location for data science professionals. The city offers numerous opportunities in fintech, e-commerce, and traditional industries that are increasingly adopting data-driven approaches.`,
    keywords: ['data science careers Jaipur', 'IT sector Jaipur', 'startup ecosystem Jaipur']
  },
  {
    title: "Top Data Science Skills in Demand in Jaipur",
    content: `The data science job market in Jaipur is evolving rapidly. Skills in Python, SQL, machine learning, and cloud platforms are highly sought after. Companies are looking for professionals who can translate data into business insights.`,
    keywords: ['data science skills Jaipur', 'Python programming Jaipur', 'machine learning Jaipur']
  },
  {
    title: "Success Stories: Data Science Professionals from Jaipur",
    content: `Meet our alumni who have successfully transitioned to data science careers. From engineers to business analysts, our students have found success in various roles across different industries.`,
    keywords: ['data science success stories Jaipur', 'career transition Jaipur', 'alumni success Jaipur']
  }
];

/**
 * Natural local business optimization
 */
export const NATURAL_LOCAL_OPTIMIZATION = {
  // Google My Business optimization
  googleMyBusiness: {
    businessName: "Dataplay - Data Science Training Center",
    description: "Premier data science education institute offering comprehensive courses in Python, SQL, machine learning, and data engineering. Expert instructors, real-world projects, and job placement assistance.",
    categories: ["Educational Institution", "Training Center", "Computer Training"],
    attributes: ["Online Classes", "In-Person Classes", "Certification Available", "Job Placement Assistance"]
  },
  
  // Local citations
  localCitations: [
    "Jaipur Business Directory",
    "Rajasthan Education Portal", 
    "India Education Network",
    "Local Tech Community Listings"
  ],
  
  // Local content ideas
  localContent: [
    "Data Science Job Market in Jaipur",
    "Top IT Companies in Jaipur Hiring Data Scientists",
    "Jaipur's Growing Tech Ecosystem",
    "Data Science Meetups and Events in Jaipur",
    "Success Stories from Jaipur Students"
  ]
};

/**
 * Natural keyword density checker
 */
export const checkKeywordDensity = (content: string, keyword: string): number => {
  const words = content.toLowerCase().split(/\s+/);
  const keywordCount = words.filter(word => word.includes(keyword.toLowerCase())).length;
  return (keywordCount / words.length) * 100;
};

/**
 * Natural content optimization
 */
export const optimizeContentNaturally = (content: string, targetKeywords: string[]): string => {
  let optimizedContent = content;
  
  targetKeywords.forEach(keyword => {
    const density = checkKeywordDensity(optimizedContent, keyword);
    
    // If density is too low, add keyword naturally
    if (density < NATURAL_SEO_GUIDELINES.keywordDensity.primary) {
      // Add keyword in a natural way
      const sentences = optimizedContent.split('. ');
      const randomIndex = Math.floor(Math.random() * sentences.length);
      sentences[randomIndex] = sentences[randomIndex] + ` ${keyword}.`;
      optimizedContent = sentences.join('. ');
    }
  });
  
  return optimizedContent;
};

/**
 * Natural meta tag generation
 */
export const generateNaturalMetaTags = (pageType: 'home' | 'course' | 'about' | 'contact') => {
  const baseKeywords = ['data science course', 'data science training', 'Python programming', 'machine learning', 'data analysis'];
  
  switch (pageType) {
    case 'home':
      return {
        title: 'Data Science Course in Jaipur | Learn Python, SQL & Machine Learning',
        description: 'Master data science with comprehensive courses in Jaipur. Learn Python, SQL, machine learning, and data engineering with expert instructors and real-world projects.',
        keywords: [...baseKeywords, 'Jaipur', 'data science education']
      };
    case 'course':
      return {
        title: 'Data Science Course Details | Python, SQL & Machine Learning',
        description: 'Explore our comprehensive data science curriculum covering Python programming, SQL database management, machine learning algorithms, and data visualization.',
        keywords: [...baseKeywords, 'course curriculum', 'Python programming', 'SQL training']
      };
    case 'about':
      return {
        title: 'About Dataplay | Data Science Education in Jaipur',
        description: 'Learn about Dataplay\'s mission to provide quality data science education in Jaipur. Expert instructors, industry-relevant curriculum, and job placement assistance.',
        keywords: [...baseKeywords, 'about us', 'education mission', 'expert instructors']
      };
    case 'contact':
      return {
        title: 'Contact Dataplay | Data Science Course in Jaipur',
        description: 'Get in touch with Dataplay for information about our data science courses in Jaipur. Contact us for course details, enrollment, and career guidance.',
        keywords: [...baseKeywords, 'contact us', 'course information', 'enrollment']
      };
    default:
      return {
        title: 'Data Science Course | Dataplay',
        description: 'Learn data science with comprehensive courses and expert guidance.',
        keywords: baseKeywords
      };
  }
};
