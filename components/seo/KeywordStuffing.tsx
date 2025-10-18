// Keyword Stuffing Component for Jaipur Local SEO
// This component helps inject Jaipur keywords into existing content

import React from 'react';
import { 
  generateKeywordStuffedContent, 
  generateKeywordStuffedFAQ,
  generateKeywordStuffedBlogContent,
  generateKeywordStuffedNavigation,
  generateKeywordStuffedFooter,
  generateKeywordStuffedSocialContent
} from '@/lib/seo/utils/keyword-stuffing';

interface KeywordStuffingProps {
  type: 'hero' | 'about' | 'courses' | 'placement' | 'testimonials' | 'faq' | 'blog' | 'navigation' | 'footer' | 'social';
  children?: React.ReactNode;
  className?: string;
}

export const KeywordStuffing: React.FC<KeywordStuffingProps> = ({ 
  type, 
  children, 
  className = '' 
}) => {
  const getContent = () => {
    switch (type) {
      case 'hero':
        return generateKeywordStuffedContent.hero();
      case 'about':
        return generateKeywordStuffedContent.about();
      case 'courses':
        return generateKeywordStuffedContent.courses();
      case 'placement':
        return generateKeywordStuffedContent.placement();
      case 'testimonials':
        return generateKeywordStuffedContent.testimonials();
      case 'faq':
        return generateKeywordStuffedFAQ();
      case 'blog':
        return generateKeywordStuffedBlogContent();
      case 'navigation':
        return generateKeywordStuffedNavigation();
      case 'footer':
        return generateKeywordStuffedFooter();
      case 'social':
        return generateKeywordStuffedSocialContent();
      default:
        return '';
    }
  };

  const content = getContent();

  if (type === 'faq') {
    const faqContent = content as Array<{ question: string; answer: string }>;
    return (
      <div className={className}>
        {Array.isArray(faqContent) && faqContent.map((faq, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
        {children}
      </div>
    );
  }

  if (type === 'blog') {
    const blogContent = content as Array<{ title: string; content: string }>;
    return (
      <div className={className}>
        {Array.isArray(blogContent) && blogContent.map((blog, index) => (
          <div key={index} className="mb-6">
            <h3 className="font-semibold text-xl mb-2">{blog.title}</h3>
            <p className="text-gray-600">{blog.content}</p>
          </div>
        ))}
        {children}
      </div>
    );
  }

  if (type === 'navigation') {
    const navContent = content as Array<{ label: string; href: string }>;
    return (
      <nav className={className}>
        {Array.isArray(navContent) && navContent.map((link, index) => (
          <a 
            key={index} 
            href={link.href}
            className="block px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            {link.label}
          </a>
        ))}
        {children}
      </nav>
    );
  }

  if (type === 'footer') {
    const footerContent = content as { description: string; links: Array<{ label: string; href: string }> };
    return (
      <footer className={className}>
        <p className="text-gray-600 mb-4">{footerContent.description}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {footerContent.links.map((link: { label: string; href: string }, index: number) => (
            <a 
              key={index} 
              href={link.href}
              className="block text-gray-600 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        {children}
      </footer>
    );
  }

  if (type === 'social') {
    const socialContent = content as { facebook: string; twitter: string; linkedin: string; instagram: string };
    return (
      <div className={className}>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Facebook Post:</h3>
          <p className="text-gray-600">{socialContent.facebook}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Twitter Post:</h3>
          <p className="text-gray-600">{socialContent.twitter}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">LinkedIn Post:</h3>
          <p className="text-gray-600">{socialContent.linkedin}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Instagram Post:</h3>
          <p className="text-gray-600">{socialContent.instagram}</p>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="text-gray-600">{typeof content === 'string' ? content : ''}</p>
      {children}
    </div>
  );
};

export default KeywordStuffing;
