// Advanced Content Optimization for Google SEO
// Implements Google's latest content guidelines and best practices

export interface ContentOptimizationConfig {
  // Content quality metrics
  minWordCount: number;
  maxWordCount: number;
  targetKeywordDensity: number;
  maxKeywordDensity: number;
  
  // Readability metrics
  targetFleschScore: number;
  minFleschScore: number;
  
  // Content structure
  minHeadings: number;
  maxHeadingLength: number;
  minParagraphs: number;
  
  // Internal linking
  minInternalLinks: number;
  maxInternalLinks: number;
  minExternalLinks: number;
  
  // Media optimization
  minImages: number;
  maxImages: number;
  requireAltText: boolean;
  requireCaptions: boolean;
}

export const CONTENT_OPTIMIZATION_CONFIG: ContentOptimizationConfig = {
  minWordCount: 300,
  maxWordCount: 3000,
  targetKeywordDensity: 1.5,
  maxKeywordDensity: 3.0,
  targetFleschScore: 60,
  minFleschScore: 30,
  minHeadings: 3,
  maxHeadingLength: 60,
  minParagraphs: 3,
  minInternalLinks: 2,
  maxInternalLinks: 10,
  minExternalLinks: 1,
  minImages: 1,
  maxImages: 10,
  requireAltText: true,
  requireCaptions: false
};

export interface ContentAnalysis {
  wordCount: number;
  keywordDensity: number;
  fleschScore: number;
  headingCount: number;
  paragraphCount: number;
  internalLinkCount: number;
  externalLinkCount: number;
  imageCount: number;
  altTextCount: number;
  readabilityScore: number;
  contentScore: number;
  suggestions: string[];
}

/**
 * Advanced content optimization class
 */
export class ContentOptimizer {
  private config: ContentOptimizationConfig;

  constructor(config: ContentOptimizationConfig = CONTENT_OPTIMIZATION_CONFIG) {
    this.config = config;
  }

  /**
   * Analyze content for SEO optimization
   */
  analyzeContent(content: string, targetKeywords: string[]): ContentAnalysis {
    const analysis: ContentAnalysis = {
      wordCount: this.getWordCount(content),
      keywordDensity: this.getKeywordDensity(content, targetKeywords),
      fleschScore: this.getFleschScore(content),
      headingCount: this.getHeadingCount(content),
      paragraphCount: this.getParagraphCount(content),
      internalLinkCount: this.getInternalLinkCount(content),
      externalLinkCount: this.getExternalLinkCount(content),
      imageCount: this.getImageCount(content),
      altTextCount: this.getAltTextCount(content),
      readabilityScore: 0,
      contentScore: 0,
      suggestions: []
    };

    analysis.readabilityScore = this.calculateReadabilityScore(analysis);
    analysis.contentScore = this.calculateContentScore(analysis);
    analysis.suggestions = this.generateSuggestions(analysis);

    return analysis;
  }

  private getWordCount(content: string): number {
    return content.split(/\s+/).filter(word => word.length > 0).length;
  }

  private getKeywordDensity(content: string, keywords: string[]): number {
    const totalWords = this.getWordCount(content);
    const keywordOccurrences = keywords.reduce((count, keyword) => {
      const regex = new RegExp(keyword, 'gi');
      const matches = content.match(regex);
      return count + (matches ? matches.length : 0);
    }, 0);
    
    return totalWords > 0 ? (keywordOccurrences / totalWords) * 100 : 0;
  }

  private getFleschScore(content: string): number {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = content.split(/\s+/).filter(w => w.length > 0);
    const syllables = this.countSyllables(content);

    if (sentences.length === 0 || words.length === 0) return 0;

    const avgWordsPerSentence = words.length / sentences.length;
    const avgSyllablesPerWord = syllables / words.length;

    return 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
  }

  private countSyllables(text: string): number {
    const words = text.toLowerCase().split(/\s+/);
    return words.reduce((count, word) => {
      const syllables = word.match(/[aeiouy]+/g);
      return count + (syllables ? syllables.length : 1);
    }, 0);
  }

  private getHeadingCount(content: string): number {
    const headingRegex = /<h[1-6][^>]*>.*?<\/h[1-6]>/gi;
    return (content.match(headingRegex) || []).length;
  }

  private getParagraphCount(content: string): number {
    const paragraphRegex = /<p[^>]*>.*?<\/p>/gi;
    return (content.match(paragraphRegex) || []).length;
  }

  private getInternalLinkCount(content: string): number {
    const internalLinkRegex = /<a[^>]*href=["'](?!https?:\/\/)(?!mailto:)(?!tel:)[^"']*["'][^>]*>/gi;
    return (content.match(internalLinkRegex) || []).length;
  }

  private getExternalLinkCount(content: string): number {
    const externalLinkRegex = /<a[^>]*href=["']https?:\/\/[^"']*["'][^>]*>/gi;
    return (content.match(externalLinkRegex) || []).length;
  }

  private getImageCount(content: string): number {
    const imageRegex = /<img[^>]*>/gi;
    return (content.match(imageRegex) || []).length;
  }

  private getAltTextCount(content: string): number {
    const altTextRegex = /<img[^>]*alt=["'][^"']*["'][^>]*>/gi;
    return (content.match(altTextRegex) || []).length;
  }

  private calculateReadabilityScore(analysis: ContentAnalysis): number {
    let score = 0;
    
    // Flesch score (0-100)
    if (analysis.fleschScore >= 60) score += 25;
    else if (analysis.fleschScore >= 30) score += 15;
    else score += 5;

    // Word count
    if (analysis.wordCount >= this.config.minWordCount && analysis.wordCount <= this.config.maxWordCount) {
      score += 20;
    } else if (analysis.wordCount >= this.config.minWordCount * 0.8) {
      score += 10;
    }

    // Heading structure
    if (analysis.headingCount >= this.config.minHeadings) score += 15;
    else score += 5;

    // Paragraph count
    if (analysis.paragraphCount >= this.config.minParagraphs) score += 10;
    else score += 5;

    // Internal linking
    if (analysis.internalLinkCount >= this.config.minInternalLinks) score += 15;
    else score += 5;

    // Images with alt text
    if (analysis.imageCount > 0 && analysis.altTextCount === analysis.imageCount) score += 15;
    else if (analysis.imageCount > 0) score += 5;

    return Math.min(score, 100);
  }

  private calculateContentScore(analysis: ContentAnalysis): number {
    let score = 0;
    
    // Keyword density
    if (analysis.keywordDensity >= this.config.targetKeywordDensity && 
        analysis.keywordDensity <= this.config.maxKeywordDensity) {
      score += 30;
    } else if (analysis.keywordDensity > 0) {
      score += 15;
    }

    // Content length
    if (analysis.wordCount >= this.config.minWordCount) score += 25;
    else score += 10;

    // Readability
    if (analysis.fleschScore >= this.config.targetFleschScore) score += 25;
    else if (analysis.fleschScore >= this.config.minFleschScore) score += 15;
    else score += 5;

    // Structure
    if (analysis.headingCount >= this.config.minHeadings) score += 20;
    else score += 5;

    return Math.min(score, 100);
  }

  private generateSuggestions(analysis: ContentAnalysis): string[] {
    const suggestions: string[] = [];

    // Word count suggestions
    if (analysis.wordCount < this.config.minWordCount) {
      suggestions.push(`Increase content length to at least ${this.config.minWordCount} words (currently ${analysis.wordCount})`);
    } else if (analysis.wordCount > this.config.maxWordCount) {
      suggestions.push(`Consider breaking content into multiple pages (currently ${analysis.wordCount} words)`);
    }

    // Keyword density suggestions
    if (analysis.keywordDensity < this.config.targetKeywordDensity) {
      suggestions.push(`Increase keyword density to ${this.config.targetKeywordDensity}% (currently ${analysis.keywordDensity.toFixed(1)}%)`);
    } else if (analysis.keywordDensity > this.config.maxKeywordDensity) {
      suggestions.push(`Reduce keyword density to avoid over-optimization (currently ${analysis.keywordDensity.toFixed(1)}%)`);
    }

    // Readability suggestions
    if (analysis.fleschScore < this.config.minFleschScore) {
      suggestions.push(`Improve readability by using shorter sentences and simpler words (current score: ${analysis.fleschScore.toFixed(1)})`);
    }

    // Heading suggestions
    if (analysis.headingCount < this.config.minHeadings) {
      suggestions.push(`Add more headings to improve content structure (currently ${analysis.headingCount})`);
    }

    // Internal linking suggestions
    if (analysis.internalLinkCount < this.config.minInternalLinks) {
      suggestions.push(`Add more internal links to related content (currently ${analysis.internalLinkCount})`);
    } else if (analysis.internalLinkCount > this.config.maxInternalLinks) {
      suggestions.push(`Consider reducing internal links to avoid over-optimization (currently ${analysis.internalLinkCount})`);
    }

    // External linking suggestions
    if (analysis.externalLinkCount < this.config.minExternalLinks) {
      suggestions.push(`Add external links to authoritative sources (currently ${analysis.externalLinkCount})`);
    }

    // Image suggestions
    if (analysis.imageCount < this.config.minImages) {
      suggestions.push(`Add relevant images to enhance content (currently ${analysis.imageCount})`);
    } else if (analysis.imageCount > this.config.maxImages) {
      suggestions.push(`Consider reducing image count to improve page load speed (currently ${analysis.imageCount})`);
    }

    if (analysis.imageCount > 0 && analysis.altTextCount < analysis.imageCount) {
      suggestions.push(`Add alt text to all images for accessibility and SEO`);
    }

    return suggestions;
  }

  /**
   * Optimize content based on analysis
   */
  optimizeContent(content: string): string {
    let optimizedContent = content;

    // Add headings if needed
    if (this.getHeadingCount(optimizedContent) < this.config.minHeadings) {
      optimizedContent = this.addHeadings(optimizedContent);
    }

    // Add internal links if needed
    if (this.getInternalLinkCount(optimizedContent) < this.config.minInternalLinks) {
      optimizedContent = this.addInternalLinks(optimizedContent);
    }

    // Add external links if needed
    if (this.getExternalLinkCount(optimizedContent) < this.config.minExternalLinks) {
      optimizedContent = this.addExternalLinks(optimizedContent);
    }

    // Optimize keyword density
    optimizedContent = this.optimizeKeywordDensity(optimizedContent);

    return optimizedContent;
  }

  private addHeadings(content: string): string {
    // This would implement logic to add relevant headings
    // For now, return the original content
    return content;
  }

  private addInternalLinks(content: string): string {
    // This would implement logic to add internal links
    // For now, return the original content
    return content;
  }

  private addExternalLinks(content: string): string {
    // This would implement logic to add external links
    // For now, return the original content
    return content;
  }

  private optimizeKeywordDensity(content: string): string {
    // This would implement logic to optimize keyword density
    // For now, return the original content
    return content;
  }
}

/**
 * Content optimization recommendations based on Google's guidelines
 */
export const CONTENT_OPTIMIZATION_RECOMMENDATIONS = {
  quality: [
    'Create original, valuable content that serves user intent',
    'Provide comprehensive coverage of the topic',
    'Include unique insights and perspectives',
    'Use authoritative sources and citations',
    'Ensure content is factually accurate and up-to-date'
  ],
  structure: [
    'Use clear, descriptive headings (H1, H2, H3)',
    'Organize content in logical sections',
    'Use bullet points and numbered lists for clarity',
    'Include a table of contents for long articles',
    'End with a clear conclusion or call-to-action'
  ],
  keywords: [
    'Use target keywords naturally in content',
    'Include keywords in headings and subheadings',
    'Use semantic keywords and related terms',
    'Avoid keyword stuffing',
    'Focus on user intent rather than keyword density'
  ],
  readability: [
    'Use short, clear sentences',
    'Write in active voice',
    'Use simple, everyday language',
    'Break up long paragraphs',
    'Include visual elements like images and videos'
  ],
  engagement: [
    'Ask questions to encourage interaction',
    'Include relevant examples and case studies',
    'Use storytelling techniques',
    'Add interactive elements where appropriate',
    'Encourage comments and social sharing'
  ]
};
