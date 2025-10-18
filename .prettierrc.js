/**
 * @fileoverview Enterprise-level Prettier configuration
 * @version 1.0.0
 * @author DataPlay Team
 */

module.exports = {
  // Basic formatting
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'none',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  
  // Line formatting
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  endOfLine: 'lf',
  
  // JSX formatting
  jsxSingleQuote: true,
  jsxBracketSameLine: false,
  
  // File-specific overrides
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 80,
        tabWidth: 2
      }
    },
    {
      files: '*.md',
      options: {
        printWidth: 80,
        proseWrap: 'always'
      }
    },
    {
      files: '*.yml',
      options: {
        tabWidth: 2
      }
    }
  ],
  
  // Plugins
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss'
  ],
  
  // Import sorting
  importOrder: [
    '^react$',
    '^next/(.*)$',
    '^@/(.*)$',
    '^[./]'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  
  // Tailwind CSS
  tailwindConfig: './tailwind.config.js',
  tailwindFunctions: ['clsx', 'cn']
}
