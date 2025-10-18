// Natural Content Component for Jaipur Local SEO
// Focus on quality content with natural keyword integration

import React from 'react';
import { 
  NATURAL_CONTENT_TEMPLATES, 
  NATURAL_FAQ_CONTENT, 
  NATURAL_BLOG_CONTENT,
  generateNaturalMetaTags 
} from '@/lib/seo/strategies/natural-local-seo';

interface NaturalContentProps {
  type: 'hero' | 'about' | 'courses' | 'placement' | 'testimonials' | 'faq' | 'blog' | 'meta';
  pageType?: 'home' | 'course' | 'about' | 'contact';
  children?: React.ReactNode;
  className?: string;
}

export const NaturalContent: React.FC<NaturalContentProps> = ({ 
  type, 
  pageType = 'home',
  children, 
  className = '' 
}) => {
  const getContent = () => {
    switch (type) {
      case 'hero':
        return NATURAL_CONTENT_TEMPLATES.hero();
      case 'about':
        return NATURAL_CONTENT_TEMPLATES.about();
      case 'courses':
        return NATURAL_CONTENT_TEMPLATES.courses();
      case 'placement':
        return NATURAL_CONTENT_TEMPLATES.placement();
      case 'testimonials':
        return NATURAL_CONTENT_TEMPLATES.testimonials();
      case 'faq':
        return NATURAL_FAQ_CONTENT;
      case 'blog':
        return NATURAL_BLOG_CONTENT;
      case 'meta':
        return generateNaturalMetaTags(pageType);
      default:
        return '';
    }
  };

  const content = getContent();

  if (type === 'faq') {
    const faqContent = content as Array<{ question: string; answer: string }>;
    return (
      <div className={className}>
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        {faqContent.map((faq, index) => (
          <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-2 text-blue-600">{faq.question}</h3>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
        {children}
      </div>
    );
  }

  if (type === 'blog') {
    const blogContent = content as Array<{ title: string; content: string; keywords: string[] }>;
    return (
      <div className={className}>
        <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
        {blogContent.map((blog, index) => (
          <article key={index} className="mb-8 p-6 bg-white rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">{blog.title}</h3>
            <p className="text-gray-600 mb-4">{blog.content}</p>
            <div className="flex flex-wrap gap-2">
              {blog.keywords.map((keyword, keywordIndex) => (
                <span 
                  key={keywordIndex}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </article>
        ))}
        {children}
      </div>
    );
  }

  if (type === 'meta') {
    const metaContent = content as { title: string; description: string; keywords: string[] };
    return (
      <div className={className}>
        <h3 className="text-lg font-semibold mb-2">SEO Meta Tags</h3>
        <div className="space-y-2 text-sm">
          <div>
            <strong>Title:</strong> {metaContent.title}
          </div>
          <div>
            <strong>Description:</strong> {metaContent.description}
          </div>
          <div>
            <strong>Keywords:</strong> {metaContent.keywords.join(', ')}
          </div>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="text-gray-700 leading-relaxed">{typeof content === 'string' ? content : ''}</p>
      {children}
    </div>
  );
};

export default NaturalContent;
