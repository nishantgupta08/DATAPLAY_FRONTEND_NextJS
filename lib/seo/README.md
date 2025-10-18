# SEO Library Documentation

This library provides comprehensive SEO utilities, schemas, and analytics for the Dataplay website.

## 📁 Structure

```
lib/seo/
├── schemas/           # Structured data generators
│   ├── organization.ts
│   ├── course.ts
│   ├── breadcrumb.ts
│   ├── faq.ts
│   ├── website.ts
│   └── index.ts
├── utils/            # SEO utilities
│   ├── meta.ts
│   ├── content.ts
│   └── index.ts
├── analytics/        # Analytics and tracking
│   ├── tracking.ts
│   └── index.ts
├── config/          # Configuration constants
│   ├── constants.ts
│   └── index.ts
├── index.ts         # Main exports
└── README.md        # This file
```

## 🚀 Quick Start

```typescript
import { 
  generateOrganizationSchema, 
  generateCourseSchema, 
  generateMetaTags,
  trackCourseView 
} from '@/lib/seo';
```

## 📋 Features

### 1. Structured Data Schemas
- **Organization Schema**: Company information with ratings and contact details
- **Course Schema**: Educational course data with pricing and ratings
- **Breadcrumb Schema**: Navigation breadcrumbs for better UX
- **FAQ Schema**: Question/Answer structured data for rich snippets
- **Website Schema**: Site-wide information with search functionality

### 2. Meta Tags Utilities
- **Title Generation**: SEO-optimized page titles
- **Description Generation**: Compelling meta descriptions
- **Keyword Extraction**: Automatic keyword analysis
- **Open Graph**: Social media optimization
- **Twitter Cards**: Twitter sharing optimization

### 3. Content Optimization
- **Content Analysis**: Word count, keyword density, readability
- **Heading Validation**: Proper heading hierarchy
- **Internal Linking**: Automatic internal link suggestions
- **Content Optimization**: Keyword integration and structure

### 4. Analytics & Tracking
- **Google Analytics 4**: Enhanced ecommerce tracking
- **Custom Events**: Course views, enrollments, form submissions
- **Performance Tracking**: Page load times and user engagement
- **Error Tracking**: Exception monitoring

## 📖 Usage Examples

### Generate Organization Schema
```typescript
import { generateOrganizationSchema, DATAPLAY_ORGANIZATION } from '@/lib/seo';

const organizationSchema = generateOrganizationSchema(DATAPLAY_ORGANIZATION);
```

### Generate Course Schema
```typescript
import { createDataplayCourse } from '@/lib/seo';

const courseData = createDataplayCourse(
  'Data Analyst Course',
  'Learn data analysis with Python and SQL',
  'https://dataplay.co.in/courses/data-analyst',
  'https://dataplay.co.in/course-image.jpg'
);

const courseSchema = generateCourseSchema(courseData);
```

### Generate Meta Tags
```typescript
import { generateMetaTags, generateSEOTitle } from '@/lib/seo';

const metaData = {
  title: generateSEOTitle('Data Analyst Course'),
  description: 'Learn data analysis with Python and SQL. Expert-led sessions, real projects, job placement assistance.',
  keywords: ['data analyst', 'python', 'SQL', 'data science'],
  canonical: 'https://dataplay.co.in/courses/data-analyst',
  ogImage: 'https://dataplay.co.in/course-image.jpg'
};

const metaTags = generateMetaTags(metaData);
```

### Track Analytics Events
```typescript
import { trackCourseView, trackFormSubmission, trackScrollDepth } from '@/lib/seo';

// Track course view
trackCourseView('Data Analyst Course', 'data-analyst-001');

// Track form submission
trackFormSubmission('enrollment-form');

// Track scroll depth
trackScrollDepth(75); // 75% scroll depth
```

### Content Analysis
```typescript
import { analyzeContent, optimizeContent } from '@/lib/seo';

const content = '<h1>Data Science Course</h1><p>Learn data science...</p>';
const analysis = analyzeContent(content);

console.log('Word count:', analysis.wordCount);
console.log('Readability score:', analysis.readabilityScore);
console.log('Heading structure:', analysis.headingStructure);

// Optimize content
const optimizedContent = optimizeContent(content, ['data science', 'python', 'SQL']);
```

## 🔧 Configuration

### SEO Constants
```typescript
import { SEO_CONFIG } from '@/lib/seo';

// Access configuration
console.log(SEO_CONFIG.SITE_NAME); // 'Dataplay'
console.log(SEO_CONFIG.SITE_URL); // 'https://dataplay.co.in'
console.log(SEO_CONFIG.DEFAULT_KEYWORDS); // ['data science course', ...]
```

### Page Priorities
```typescript
import { PAGE_PRIORITIES, CHANGE_FREQUENCIES } from '@/lib/seo';

// Use in sitemap generation
const priority = PAGE_PRIORITIES.COURSES; // 0.90
const changeFreq = CHANGE_FREQUENCIES.COURSES; // 'weekly'
```

## 📊 Analytics Events

### Available Tracking Functions
- `pageview(url)` - Track page views
- `event({ action, category, label, value })` - Custom events
- `trackCourseView(name, id)` - Course page views
- `trackCourseEnrollment(name, id)` - Course enrollments
- `trackFormSubmission(formName)` - Form submissions
- `trackScrollDepth(depth)` - Scroll depth tracking
- `trackSearchQuery(query)` - Search queries
- `trackSocialShare(platform, content)` - Social sharing
- `trackPageLoadTime(loadTime)` - Performance tracking
- `trackError(error, fatal)` - Error tracking
- `trackEngagement(action, duration)` - User engagement

## 🎯 Best Practices

### 1. Schema Implementation
- Use appropriate schema types for different content
- Include all required properties
- Validate schema with Google's Rich Results Test
- Keep schemas up-to-date with content changes

### 2. Meta Tags
- Keep titles under 60 characters
- Keep descriptions under 160 characters
- Include target keywords naturally
- Use unique titles and descriptions for each page

### 3. Content Optimization
- Maintain proper heading hierarchy (H1 > H2 > H3)
- Include internal links to related content
- Use target keywords naturally in content
- Optimize for readability and user experience

### 4. Analytics
- Track important user actions
- Monitor performance metrics
- Set up conversion goals
- Regular analysis and optimization

## 🔍 Testing

### Schema Validation
Use Google's Rich Results Test: https://search.google.com/test/rich-results

### Meta Tags Testing
Use tools like:
- Google Search Console
- Screaming Frog SEO Spider
- SEMrush Site Audit

### Analytics Testing
- Google Analytics Real-time reports
- Google Tag Assistant
- Browser developer tools

## 📈 Performance

This library is optimized for:
- **Bundle Size**: Tree-shakeable exports
- **Runtime Performance**: Minimal overhead
- **Type Safety**: Full TypeScript support
- **Maintainability**: Modular structure

## 🤝 Contributing

When adding new SEO features:
1. Follow the existing structure
2. Add proper TypeScript types
3. Include usage examples
4. Update this documentation
5. Test with real data

## 📝 License

This SEO library is part of the Dataplay project and follows the same licensing terms.
