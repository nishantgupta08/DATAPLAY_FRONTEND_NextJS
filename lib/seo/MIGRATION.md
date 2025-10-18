# SEO Library Migration Guide

This guide helps you migrate from the old scattered SEO code to the new organized SEO library structure.

## 🔄 Migration Steps

### 1. Update Imports

**Before:**
```typescript
// Old scattered imports
import { generateMetaTags } from '@/lib/seo-utils';
import { trackCourseView } from '@/lib/analytics';
```

**After:**
```typescript
// New organized imports
import { 
  generateMetaTags,
  trackCourseView,
  generateCourseSchema,
  DATAPLAY_ORGANIZATION 
} from '@/lib/seo';
```

### 2. Replace Manual Schema Generation

**Before:**
```typescript
// Old manual schema generation
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "DataPlay",
  "description": "DataPlay offers data science courses...",
  // ... lots of manual code
};
```

**After:**
```typescript
// New organized schema generation
import { generateOrganizationSchema, DATAPLAY_ORGANIZATION } from '@/lib/seo';

const organizationSchema = generateOrganizationSchema(DATAPLAY_ORGANIZATION);
```

### 3. Update Meta Tags Generation

**Before:**
```typescript
// Old manual meta tags
const metaTags = [
  { name: 'title', content: title },
  { name: 'description', content: description },
  { name: 'keywords', content: keywords.join(', ') },
  // ... more manual tags
];
```

**After:**
```typescript
// New organized meta tags
import { generateMetaTags, generateSEOTitle } from '@/lib/seo';

const seoData = {
  title: generateSEOTitle('Page Title'),
  description: 'Page description',
  keywords: ['keyword1', 'keyword2'],
  canonical: 'https://dataplay.co.in/page'
};

const metaTags = generateMetaTags(seoData);
```

### 4. Update Analytics Tracking

**Before:**
```typescript
// Old scattered analytics
import { trackCourseView } from '@/lib/analytics';

useEffect(() => {
  trackCourseView(courseName, courseId);
}, []);
```

**After:**
```typescript
// New organized analytics
import { trackCourseView } from '@/lib/seo';

useEffect(() => {
  trackCourseView(courseName, courseId);
}, []);
```

## 📁 File Structure Changes

### Old Structure (Scattered)
```
lib/
├── seo-utils.ts          # Mixed utilities
├── analytics.ts          # Analytics only
├── schemas.ts            # All schemas in one file
└── constants.ts          # Configuration
```

### New Structure (Organized)
```
lib/seo/
├── schemas/              # Schema generators
│   ├── organization.ts
│   ├── course.ts
│   ├── breadcrumb.ts
│   ├── faq.ts
│   ├── website.ts
│   └── index.ts
├── utils/                # SEO utilities
│   ├── meta.ts
│   ├── content.ts
│   └── index.ts
├── analytics/            # Analytics tracking
│   ├── tracking.ts
│   └── index.ts
├── config/              # Configuration
│   ├── constants.ts
│   └── index.ts
├── examples/            # Usage examples
│   └── page-seo-example.tsx
├── index.ts             # Main exports
├── README.md            # Documentation
└── MIGRATION.md         # This file
```

## 🔧 Code Migration Examples

### Layout.tsx Migration

**Before:**
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: "Dataplay – Data Science Learning Platform",
    template: "%s | Dataplay"
  },
  description: "Dataplay is your data science learning hub...",
  keywords: [
    "data science course",
    "data analyst course",
    // ... many more
  ],
  // ... lots of manual configuration
};
```

**After:**
```typescript
// app/layout.tsx
import { SEO_CONFIG } from '@/lib/seo';

export const metadata: Metadata = {
  title: {
    default: SEO_CONFIG.DEFAULT_TITLE,
    template: "%s | Dataplay"
  },
  description: SEO_CONFIG.DEFAULT_DESCRIPTION,
  keywords: SEO_CONFIG.DEFAULT_KEYWORDS,
  // ... rest of configuration
};
```

### Course Page Migration

**Before:**
```typescript
// app/courses/[id]/page.tsx
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": courseTitle,
  "description": courseSubtitle,
  // ... lots of manual schema
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    // ... manual breadcrumb items
  ]
};
```

**After:**
```typescript
// app/courses/[id]/page.tsx
import { 
  generateCourseSchema, 
  generateBreadcrumbSchema,
  createDataplayCourse,
  BREADCRUMB_PATTERNS 
} from '@/lib/seo';

const courseData = createDataplayCourse(
  courseTitle,
  courseSubtitle,
  courseUrl,
  courseImage
);

const courseSchema = generateCourseSchema(courseData);
const breadcrumbSchema = generateBreadcrumbSchema(
  BREADCRUMB_PATTERNS.course(courseTitle, courseUrl)
);
```

### FAQ Page Migration

**Before:**
```typescript
// app/faq/page.tsx
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};
```

**After:**
```typescript
// app/faq/page.tsx
import { generateFAQSchema, DATAPLAY_FAQS } from '@/lib/seo';

const faqSchema = generateFAQSchema(DATAPLAY_FAQS);
```

## ✅ Benefits of Migration

### 1. **Organization**
- Clear separation of concerns
- Easy to find and maintain code
- Consistent structure across the project

### 2. **Reusability**
- Pre-built schemas for common use cases
- Reusable utility functions
- Consistent data across pages

### 3. **Maintainability**
- Single source of truth for SEO data
- Easy to update configurations
- Centralized documentation

### 4. **Type Safety**
- Full TypeScript support
- IntelliSense and autocomplete
- Compile-time error checking

### 5. **Performance**
- Tree-shakeable exports
- Optimized bundle size
- Lazy loading support

## 🚀 Quick Migration Checklist

- [ ] Update all imports to use `@/lib/seo`
- [ ] Replace manual schema generation with library functions
- [ ] Update meta tags generation
- [ ] Migrate analytics tracking
- [ ] Update configuration constants
- [ ] Test all pages for proper SEO
- [ ] Validate structured data
- [ ] Check analytics tracking
- [ ] Update documentation

## 🔍 Testing After Migration

1. **Schema Validation**
   - Use Google's Rich Results Test
   - Validate all structured data
   - Check for errors and warnings

2. **Meta Tags Testing**
   - Verify all meta tags are present
   - Check Open Graph tags
   - Test Twitter Cards

3. **Analytics Testing**
   - Verify tracking events fire
   - Check Google Analytics reports
   - Test custom events

4. **Performance Testing**
   - Check bundle size impact
   - Verify tree-shaking works
   - Test page load times

## 📚 Additional Resources

- [SEO Library Documentation](./README.md)
- [Usage Examples](./examples/page-seo-example.tsx)
- [Configuration Guide](./config/constants.ts)
- [Analytics Setup](./analytics/tracking.ts)

## 🆘 Need Help?

If you encounter issues during migration:

1. Check the [examples](./examples/page-seo-example.tsx) for reference
2. Review the [documentation](./README.md) for detailed usage
3. Validate your schemas with Google's Rich Results Test
4. Test analytics tracking in browser dev tools

The new organized structure provides better maintainability, reusability, and type safety while keeping all SEO functionality in one place.
