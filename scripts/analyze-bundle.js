#!/usr/bin/env node

/**
 * Bundle analysis script for performance optimization
 */

import { execSync } from 'child_process';
import fs from 'fs';

async function analyzeBundle() {
  console.log('🔍 Analyzing bundle size and performance...\n');

  // Check if @next/bundle-analyzer is installed
  try {
    await import('@next/bundle-analyzer');
  } catch {
    console.log('📦 Installing @next/bundle-analyzer...');
    execSync('npm install --save-dev @next/bundle-analyzer', { stdio: 'inherit' });
  }

  // Create temporary next.config.js for analysis
  const tempConfig = `
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // Your existing config
  images: {
    domains: ["res.cloudinary.com"],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizePackageImports: ['@iconify/react', 'lucide-react', 'swiper'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
});
`;

  fs.writeFileSync('next.config.analyze.js', tempConfig);

  try {
    console.log('🏗️  Building with bundle analysis...');
    execSync('ANALYZE=true npm run build', { stdio: 'inherit' });
    
    console.log('\n✅ Bundle analysis complete!');
    console.log('📊 Check the generated HTML files for detailed bundle analysis.');
    
  } catch (error) {
    console.error('❌ Bundle analysis failed:', error.message);
    process.exit(1);
  } finally {
    // Clean up temporary config
    if (fs.existsSync('next.config.analyze.js')) {
      fs.unlinkSync('next.config.analyze.js');
    }
  }
}

// Run the analysis
analyzeBundle().catch(console.error);
