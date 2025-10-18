/** @type {import('next').NextConfig} */
const nextConfig = {
  // Advanced Image optimization
  images: {
    domains: ["res.cloudinary.com", "dataplay.co.in"],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // Advanced compression
  compress: true,
  
  // PoweredByHeader removal for security
  poweredByHeader: false,
  
  // React strict mode for better development
  reactStrictMode: true,
  
  // Note: swcMinify is deprecated in Next.js 15, SWC is enabled by default
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['@iconify/react', 'lucide-react', 'swiper'],
  },
  
  // Turbopack configuration
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Advanced bundle optimization
  webpack: (config: unknown, { isServer, dev }: { isServer: boolean; dev: boolean }) => {
    if (!isServer) {
      const webpackConfig = config as {
        optimization: {
          splitChunks: {
            chunks: string;
            cacheGroups: Record<string, any>;
          };
          usedExports: boolean;
          sideEffects: boolean;
        };
        resolve: {
          alias: Record<string, string>;
          fallback: Record<string, boolean | string>;
        };
        module: {
          rules: Array<{
            test: RegExp;
            use: any;
          }>;
        };
      };

      // Advanced bundle splitting
      webpackConfig.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          // React and React-DOM
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            chunks: 'all',
            priority: 20,
          },
          // Next.js framework
          nextjs: {
            test: /[\\/]node_modules[\\/](next)[\\/]/,
            name: 'nextjs',
            chunks: 'all',
            priority: 15,
          },
          // UI libraries
          ui: {
            test: /[\\/]node_modules[\\/](@headlessui|@heroicons|lucide-react|@iconify)[\\/]/,
            name: 'ui',
            chunks: 'all',
            priority: 10,
          },
          // SEO and analytics
          seo: {
            test: /[\\/]node_modules[\\/](@lib\/seo|@components\/seo)[\\/]/,
            name: 'seo',
            chunks: 'all',
            priority: 8,
          },
          // Other vendors
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 5,
          },
          // Common chunks
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 1,
            enforce: true,
          },
        },
      };

      // Tree shaking optimization
      webpackConfig.optimization.usedExports = true;
      webpackConfig.optimization.sideEffects = false;

      // Module resolution optimization
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        '@': require('path').resolve(__dirname, '.'),
        '@components': require('path').resolve(__dirname, 'components'),
        '@lib': require('path').resolve(__dirname, 'lib'),
        '@app': require('path').resolve(__dirname, 'app'),
      };

      // Fallbacks for Node.js modules
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      };

      // SVG optimization
      webpackConfig.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: true,
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeViewBox: false,
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      });
    }
    
    return config;
  },
  
  // Bundle analyzer (uncomment for analysis)
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback.fs = false;
  //   }
  //   return config;
  // },
  
  // Advanced headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // Performance headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Download-Options',
            value: 'noopen',
          },
          {
            key: 'X-Permitted-Cross-Domain-Policies',
            value: 'none',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
