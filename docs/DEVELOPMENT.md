# Development Guide

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Run Tests**
   ```bash
   npm test
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Code Standards

### Component Structure
```typescript
// Component file structure
import React from 'react';
import { ComponentProps } from '@/types';

interface Props {
  // Component props
}

export default function ComponentName({ prop1, prop2 }: Props) {
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
}
```

### Import Order
1. React imports
2. Third-party libraries
3. Internal components
4. Types
5. Utilities

### Naming Conventions
- **Components**: PascalCase (Button, Modal)
- **Files**: PascalCase for components, camelCase for utilities
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE

## Best Practices

1. **Use TypeScript**: Always define types
2. **Component Composition**: Build complex components from simple ones
3. **Performance**: Use React.memo for expensive components
4. **Accessibility**: Include ARIA attributes
5. **Testing**: Write tests for critical functionality

## Folder Guidelines

- **components/**: React components only
- **services/**: API calls and external integrations
- **utils/**: Pure functions and helpers
- **hooks/**: Custom React hooks
- **types/**: TypeScript type definitions
- **config/**: Application configuration
