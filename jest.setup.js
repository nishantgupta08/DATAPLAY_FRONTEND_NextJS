/**
 * @fileoverview Jest setup file for enterprise-level testing
 * @version 1.0.0
 * @author DataPlay Team
 */

import '@testing-library/jest-dom';

// ============================================================================
// GLOBAL TEST SETUP
// ============================================================================

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    push: jest.fn(),
    pop: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
  }),
}));

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Next.js image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Mock Next.js link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock fetch
global.fetch = jest.fn();

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.sessionStorage = sessionStorageMock;

// Mock console methods to reduce noise in tests
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalConsoleError.call(console, ...args);
  };

  console.warn = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('componentWillReceiveProps') ||
        args[0].includes('componentWillMount'))
    ) {
      return;
    }
    originalConsoleWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});

// ============================================================================
// CUSTOM MATCHERS
// ============================================================================

// Add custom matchers for better test assertions
expect.extend({
  toBeInTheDocument: require('@testing-library/jest-dom/matchers').toBeInTheDocument,
  toHaveClass: require('@testing-library/jest-dom/matchers').toHaveClass,
  toHaveTextContent: require('@testing-library/jest-dom/matchers').toHaveTextContent,
  toHaveAttribute: require('@testing-library/jest-dom/matchers').toHaveAttribute,
  toHaveValue: require('@testing-library/jest-dom/matchers').toHaveValue,
  toBeVisible: require('@testing-library/jest-dom/matchers').toBeVisible,
  toBeDisabled: require('@testing-library/jest-dom/matchers').toBeDisabled,
  toBeEnabled: require('@testing-library/jest-dom/matchers').toBeEnabled,
  toBeRequired: require('@testing-library/jest-dom/matchers').toBeRequired,
  toBeValid: require('@testing-library/jest-dom/matchers').toBeValid,
  toBeInvalid: require('@testing-library/jest-dom/matchers').toBeInvalid,
});

// ============================================================================
// TEST UTILITIES
// ============================================================================

// Global test utilities
global.testUtils = {
  // Mock API responses
  mockApiResponse: (data: any, success: boolean = true) => ({
    success,
    data,
    message: success ? 'Success' : 'Error',
    errors: success ? undefined : ['Test error'],
  }),

  // Mock user data
  mockUser: {
    id: 1,
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    role: 'student',
    status: 'active',
  },

  // Mock course data
  mockCourse: {
    id: 1,
    title: 'Test Course',
    subtitle: 'Test Course Subtitle',
    description: 'Test course description',
    difficulty: 'beginner',
    status: 'published',
    duration: 12,
    price: 7500,
    currency: 'INR',
    imageUrl: 'https://example.com/image.jpg',
  },

  // Wait for async operations
  waitFor: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),

  // Mock fetch response
  mockFetch: (response: any, status: number = 200) => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: status >= 200 && status < 300,
      status,
      json: async () => response,
    });
  },

  // Mock fetch error
  mockFetchError: (error: string) => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error(error));
  },
};

// ============================================================================
// CLEANUP
// ============================================================================

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
  localStorageMock.clear();
  sessionStorageMock.clear();
});

// ============================================================================
// ENVIRONMENT VARIABLES
// ============================================================================

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000';
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000';