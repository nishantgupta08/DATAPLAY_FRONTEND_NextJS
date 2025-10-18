// Icon and Asset Utilities
import { SEO_CONFIG } from '../config/constants';
import type { IconConfig } from '../types';

// Re-export the type for backward compatibility
export type { IconConfig };

export const getIconConfig = (): IconConfig => {
  return {
    path: '/favicon.ico',
    sizes: '32x32',
    type: 'image/x-icon'
  };
};

export const generateIconLinks = () => {
  const icons = getIconConfig();
  
  return [
    // Favicon
    { rel: 'icon', href: icons.path, sizes: icons.sizes, type: icons.type },
    
    // Apple Touch Icon
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
    
    // Android Chrome Icons
    { rel: 'icon', href: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    { rel: 'icon', href: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    
    // Standard Favicons
    { rel: 'icon', href: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    { rel: 'icon', href: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    
    // Manifest
    { rel: 'manifest', href: '/site.webmanifest' },
    
    // Browser Config
    { rel: 'browserconfig', href: '/browserconfig.xml' }
  ];
};

export const generateIconMetaTags = () => {
  return [
    { name: 'msapplication-TileColor', content: '#6366f1' },
    { name: 'theme-color', content: '#6366f1' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'apple-mobile-web-app-title', content: SEO_CONFIG.siteName }
  ];
};

// Fallback icon handler
export const getIconWithFallback = (iconPath: string, fallback: string = '/favicon.ico'): string => {
  // In a real implementation, you might want to check if the file exists
  // For now, we'll just return the configured path
  return iconPath || fallback;
};

// Generate all icon-related tags
export const generateAllIconTags = () => {
  const iconLinks = generateIconLinks();
  const iconMeta = generateIconMetaTags();
  
  return {
    links: iconLinks,
    meta: iconMeta
  };
};
