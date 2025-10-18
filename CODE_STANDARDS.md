# DataPlay Frontend - Enterprise Code Standards

## 🎯 Overview

This document outlines the enterprise-level coding standards, best practices, and guidelines for the DataPlay frontend application.

## 📋 Table of Contents

1. [General Principles](#general-principles)
2. [File Organization](#file-organization)
3. [Naming Conventions](#naming-conventions)
4. [TypeScript Standards](#typescript-standards)
5. [React Component Standards](#react-component-standards)
6. [API Integration](#api-integration)
7. [Error Handling](#error-handling)
8. [Testing Standards](#testing-standards)
9. [Performance Guidelines](#performance-guidelines)
10. [Security Best Practices](#security-best-practices)

## 🏗️ General Principles

### 1. **Code Quality**
- Write self-documenting code
- Use meaningful variable and function names
- Keep functions small and focused
- Follow the Single Responsibility Principle
- Avoid code duplication (DRY principle)

### 2. **Maintainability**
- Use consistent formatting and style
- Write comprehensive comments for complex logic
- Create reusable components and utilities
- Follow established patterns and conventions

### 3. **Performance**
- Optimize for both development and production
- Use lazy loading for large components
- Implement proper caching strategies
- Monitor and optimize bundle size

### 4. **Accessibility**
- Follow WCAG 2.1 guidelines
- Use semantic HTML elements
- Provide proper ARIA labels
- Ensure keyboard navigation

## 📁 File Organization

### Directory Structure
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Route groups
│   ├── api/               # API routes
│   ├── courses/           # Dynamic routes
│   └── globals.css
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   └── sections/         # Page sections
├── lib/                  # Core business logic
│   ├── seo/              # SEO utilities
│   ├── analytics/        # Analytics
│   ├── utils/            # Utility functions
│   └── types/            # TypeScript definitions
├── hooks/                # Custom React hooks
├── services/             # External service integrations
├── constants/             # Application constants
├── config/                # Configuration files
└── styles/               # Global styles
```

### File Naming Conventions
- **Components**: PascalCase (`UserProfile.tsx`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Pages**: kebab-case (`user-profile/page.tsx`)
- **Types**: camelCase with `.types.ts` suffix (`user.types.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)

## 🏷️ Naming Conventions

### Variables and Functions
```typescript
// ✅ Good
const userName = 'john_doe';
const isUserActive = true;
const getUserProfile = () => {};

// ❌ Bad
const u = 'john_doe';
const active = true;
const get = () => {};
```

### Components
```typescript
// ✅ Good
const UserProfile = () => {};
const CourseCard = () => {};
const NavigationMenu = () => {};

// ❌ Bad
const userProfile = () => {};
const course = () => {};
const nav = () => {};
```

### Types and Interfaces
```typescript
// ✅ Good
interface UserProfile {
  id: number;
  name: string;
}

type UserRole = 'admin' | 'user' | 'guest';

// ❌ Bad
interface userProfile {
  id: number;
  name: string;
}

type userRole = 'admin' | 'user' | 'guest';
```

## 🔷 TypeScript Standards

### Type Definitions
```typescript
// ✅ Good - Comprehensive type definition
interface User {
  id: number;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

// ✅ Good - Generic types
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

// ❌ Bad - Any types
const user: any = {};
const data: any[] = [];
```

### Function Signatures
```typescript
// ✅ Good - Explicit types
const createUser = (
  userData: CreateUserRequest,
  options?: CreateUserOptions
): Promise<User> => {
  // Implementation
};

// ❌ Bad - Implicit any
const createUser = (userData, options) => {
  // Implementation
};
```

### Error Handling
```typescript
// ✅ Good - Proper error handling
const fetchUser = async (id: number): Promise<User | null> => {
  try {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
};

// ❌ Bad - No error handling
const fetchUser = async (id: number) => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};
```

## ⚛️ React Component Standards

### Component Structure
```typescript
// ✅ Good - Well-structured component
import React, { useState, useEffect, useCallback } from 'react';
import type { User, UserProfileProps } from '@/types';

interface UserProfileProps {
  user: User;
  onUpdate?: (user: User) => void;
  className?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  onUpdate,
  className = ''
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleSubmit = useCallback(async (data: User) => {
    try {
      await updateUser(data);
      onUpdate?.(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  }, [onUpdate]);

  return (
    <div className={`user-profile ${className}`}>
      {/* Component JSX */}
    </div>
  );
};

export default UserProfile;
```

### Hooks Usage
```typescript
// ✅ Good - Custom hook
const useUserProfile = (userId: number) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await apiClient.get<User>(`/users/${userId}`);
        setUser(userData.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, loading, error };
};

// ✅ Good - Hook usage in component
const UserProfile: React.FC<{ userId: number }> = ({ userId }) => {
  const { user, loading, error } = useUserProfile(userId);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return <NotFound />;

  return <UserProfileContent user={user} />;
};
```

### Props and State Management
```typescript
// ✅ Good - Props interface
interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: number) => void;
  onViewDetails?: (courseId: number) => void;
  className?: string;
  variant?: 'default' | 'compact' | 'detailed';
}

// ✅ Good - State management
const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onEnroll,
  onViewDetails,
  className = '',
  variant = 'default'
}) => {
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState<EnrollmentStatus>('not_enrolled');

  const handleEnroll = useCallback(async () => {
    if (!onEnroll) return;
    
    setIsEnrolling(true);
    try {
      await onEnroll(course.id);
      setEnrollmentStatus('enrolled');
    } catch (error) {
      console.error('Enrollment failed:', error);
    } finally {
      setIsEnrolling(false);
    }
  }, [course.id, onEnroll]);

  return (
    <div className={`course-card course-card--${variant} ${className}`}>
      {/* Component content */}
    </div>
  );
};
```

## 🌐 API Integration

### API Client Usage
```typescript
// ✅ Good - API service
class UserService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getUser(id: number): Promise<User | null> {
    try {
      const response = await this.apiClient.get<User>(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      return null;
    }
  }

  async createUser(userData: CreateUserRequest): Promise<User | null> {
    try {
      const response = await this.apiClient.post<User>('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Failed to create user:', error);
      return null;
    }
  }
}

// ✅ Good - Service usage
const userService = new UserService(apiClient);
const user = await userService.getUser(1);
```

### Error Handling
```typescript
// ✅ Good - Comprehensive error handling
const fetchCourseData = async (courseId: number): Promise<Course | null> => {
  try {
    const response = await apiClient.get<Course>(`/courses/${courseId}`);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch course');
    }
    
    return response.data;
  } catch (error) {
    if (error instanceof NetworkError) {
      // Handle network errors
      console.error('Network error:', error.message);
    } else if (error instanceof ServerError) {
      // Handle server errors
      console.error('Server error:', error.message);
    } else {
      // Handle unknown errors
      console.error('Unknown error:', error);
    }
    
    return null;
  }
};
```

## 🧪 Testing Standards

### Unit Tests
```typescript
// ✅ Good - Comprehensive unit test
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserProfile } from '@/components/UserProfile';
import { mockUser } from '@/test-utils';

describe('UserProfile', () => {
  const defaultProps = {
    user: mockUser,
    onUpdate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders user information correctly', () => {
    render(<UserProfile {...defaultProps} />);
    
    expect(screen.getByText(mockUser.profile.firstName)).toBeInTheDocument();
    expect(screen.getByText(mockUser.profile.lastName)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });

  it('calls onUpdate when user information is updated', async () => {
    const onUpdate = jest.fn();
    render(<UserProfile {...defaultProps} onUpdate={onUpdate} />);
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalledWith(expect.objectContaining({
        id: mockUser.id,
        email: mockUser.email,
      }));
    });
  });

  it('handles errors gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    render(<UserProfile {...defaultProps} />);
    
    // Simulate error scenario
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    
    // Test error handling
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });
    
    consoleSpy.mockRestore();
  });
});
```

### Integration Tests
```typescript
// ✅ Good - Integration test
import { render, screen, waitFor } from '@testing-library/react';
import { CourseList } from '@/components/CourseList';
import { apiClient } from '@/services/api-client';

jest.mock('@/services/api-client');

describe('CourseList Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and displays courses', async () => {
    const mockCourses = [
      { id: 1, title: 'Course 1', description: 'Description 1' },
      { id: 2, title: 'Course 2', description: 'Description 2' },
    ];

    (apiClient.get as jest.Mock).mockResolvedValue({
      success: true,
      data: mockCourses,
    });

    render(<CourseList />);

    await waitFor(() => {
      expect(screen.getByText('Course 1')).toBeInTheDocument();
      expect(screen.getByText('Course 2')).toBeInTheDocument();
    });

    expect(apiClient.get).toHaveBeenCalledWith('/courses');
  });
});
```

## ⚡ Performance Guidelines

### Code Splitting
```typescript
// ✅ Good - Lazy loading
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('@/components/HeavyComponent'));

const App = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <HeavyComponent />
  </Suspense>
);
```

### Memoization
```typescript
// ✅ Good - Proper memoization
import { memo, useMemo, useCallback } from 'react';

const ExpensiveComponent = memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }, [data]);

  const handleUpdate = useCallback((id: number) => {
    onUpdate(id);
  }, [onUpdate]);

  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} data={item} onUpdate={handleUpdate} />
      ))}
    </div>
  );
});
```

### Bundle Optimization
```typescript
// ✅ Good - Dynamic imports
const loadChart = () => import('chart.js');
const loadEditor = () => import('@monaco-editor/react');

// ✅ Good - Tree shaking
import { debounce } from 'lodash/debounce';
import { format } from 'date-fns/format';
```

## 🔒 Security Best Practices

### Input Validation
```typescript
// ✅ Good - Input validation
const validateUserInput = (input: unknown): input is UserInput => {
  return (
    typeof input === 'object' &&
    input !== null &&
    'email' in input &&
    'password' in input &&
    typeof (input as any).email === 'string' &&
    typeof (input as any).password === 'string'
  );
};

const handleSubmit = (data: unknown) => {
  if (!validateUserInput(data)) {
    throw new ValidationError('Invalid input data');
  }
  
  // Process validated data
  processUserData(data);
};
```

### XSS Prevention
```typescript
// ✅ Good - Sanitize user input
import DOMPurify from 'dompurify';

const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html);
};

const UserContent = ({ content }: { content: string }) => {
  const sanitizedContent = sanitizeHtml(content);
  
  return (
    <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
  );
};
```

## 📝 Documentation Standards

### JSDoc Comments
```typescript
/**
 * Fetches user profile data from the API
 * @param userId - The unique identifier of the user
 * @param options - Optional configuration for the request
 * @returns Promise that resolves to user data or null if not found
 * @throws {NetworkError} When network request fails
 * @throws {NotFoundError} When user is not found
 * @example
 * ```typescript
 * const user = await fetchUserProfile(123);
 * if (user) {
 *   console.log(`Welcome ${user.firstName}!`);
 * }
 * ```
 */
const fetchUserProfile = async (
  userId: number,
  options?: FetchOptions
): Promise<User | null> => {
  // Implementation
};
```

### Component Documentation
```typescript
/**
 * UserProfile component displays user information and allows editing
 * 
 * @component
 * @param {UserProfileProps} props - Component props
 * @param {User} props.user - User data to display
 * @param {Function} props.onUpdate - Callback when user data is updated
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @example
 * ```tsx
 * <UserProfile 
 *   user={userData} 
 *   onUpdate={handleUserUpdate}
 *   className="custom-profile"
 * />
 * ```
 */
export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  onUpdate,
  className = ''
}) => {
  // Component implementation
};
```

## 🚀 Deployment Standards

### Environment Configuration
```typescript
// ✅ Good - Environment variables
const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  environment: process.env.NODE_ENV || 'development',
  features: {
    analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    debug: process.env.NEXT_PUBLIC_DEBUG === 'true',
  },
};
```

### Build Optimization
```typescript
// ✅ Good - Next.js configuration
const nextConfig = {
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Image optimization
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Bundle optimization
  experimental: {
    optimizePackageImports: ['@iconify/react', 'lucide-react'],
  },
};
```

## 📊 Monitoring and Analytics

### Error Tracking
```typescript
// ✅ Good - Error tracking
import { createErrorHandler } from '@/utils/error-handler';

const errorHandler = createErrorHandler({
  enableLogging: true,
  enableReporting: true,
  enableUserNotification: true,
});

// Track errors
try {
  await riskyOperation();
} catch (error) {
  errorHandler.handleError(error, {
    operation: 'riskyOperation',
    userId: currentUser?.id,
  });
}
```

### Performance Monitoring
```typescript
// ✅ Good - Performance tracking
const trackPerformance = (operation: string, duration: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: operation,
      value: duration,
    });
  }
};

const measureOperation = async <T>(operation: () => Promise<T>, name: string): Promise<T> => {
  const start = performance.now();
  try {
    const result = await operation();
    const duration = performance.now() - start;
    trackPerformance(name, duration);
    return result;
  } catch (error) {
    const duration = performance.now() - start;
    trackPerformance(`${name}_error`, duration);
    throw error;
  }
};
```

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Best Practices](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Testing Library Documentation](https://testing-library.com/docs/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

*This document is maintained by the DataPlay development team and should be updated as standards evolve.*
