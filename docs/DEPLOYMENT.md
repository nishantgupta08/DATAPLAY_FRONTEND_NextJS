# Deployment Guide

## Overview
This guide covers the deployment process for the Dataplay application.

## Pre-deployment Checklist

### 1. **Code Quality**
- [ ] All tests passing
- [ ] Linting errors resolved
- [ ] TypeScript errors fixed
- [ ] Code formatted with Prettier
- [ ] No console.log statements in production

### 2. **Performance**
- [ ] Bundle size optimized
- [ ] Images compressed
- [ ] Core Web Vitals optimized
- [ ] Lighthouse score > 90

### 3. **SEO**
- [ ] Meta tags optimized
- [ ] Structured data implemented
- [ ] Sitemap generated
- [ ] Robots.txt configured

## Deployment Options

### 1. **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### 2. **Netlify**
```bash
# Build command
npm run build

# Publish directory
.next
```

### 3. **Docker**
```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./

EXPOSE 3000
CMD ["npm", "start"]
```

## Environment Variables

### Required Variables
```env
NEXT_PUBLIC_APP_URL=https://dataplay.co.in
NEXT_PUBLIC_API_URL=https://api.dataplay.co.in
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

### Optional Variables
```env
GOOGLE_MAPS_API_KEY=your_google_maps_key
ANALYTICS_ID=your_analytics_id
SENTRY_DSN=your_sentry_dsn
```

## Post-deployment

### 1. **Verification**
- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] Forms working
- [ ] Images loading
- [ ] Performance metrics good

### 2. **Monitoring**
- [ ] Error tracking setup
- [ ] Analytics configured
- [ ] Performance monitoring active
- [ ] Uptime monitoring enabled

### 3. **SEO**
- [ ] Google Search Console setup
- [ ] Sitemap submitted
- [ ] Meta tags verified
- [ ] Structured data validated

## Troubleshooting

### Common Issues
1. **Build failures**: Check TypeScript errors and dependencies
2. **Image loading**: Verify image paths and optimization
3. **Performance**: Use Lighthouse to identify issues
4. **SEO**: Validate structured data and meta tags

### Support
- Check application logs
- Monitor error tracking
- Review performance metrics
- Contact development team
