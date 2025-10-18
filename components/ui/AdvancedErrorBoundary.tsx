// Advanced Error Boundary Component
// Implements sophisticated error handling and recovery

'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
// import { useErrorBoundary } from '@/lib/performance/advanced-optimizations';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onReset?: () => void;
  resetKeys?: Array<string | number>;
  resetOnPropsChange?: boolean;
  isolate?: boolean;
  level?: 'page' | 'component' | 'feature';
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
  retryCount: number;
}

export default class AdvancedErrorBoundary extends Component<Props, State> {
  private resetTimeoutId: NodeJS.Timeout | null = null;
  private retryTimeoutId: NodeJS.Timeout | null = null;
  private maxRetries = 3;
  private retryDelay = 1000;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { onError, level = 'component' } = this.props;
    
    this.setState({
      error,
      errorInfo,
    });

    // Log error to analytics
    this.logError(error, errorInfo, level);

    // Call custom error handler
    onError?.(error, errorInfo);

    // Auto-retry for certain error types
    this.handleAutoRetry(error);
  }

  componentDidUpdate(prevProps: Props) {
    const { resetKeys, resetOnPropsChange } = this.props;
    const { hasError } = this.state;

    if (hasError && resetKeys && resetOnPropsChange) {
      const hasResetKeyChanged = resetKeys.some(
        (key, index) => key !== prevProps.resetKeys?.[index]
      );

      if (hasResetKeyChanged) {
        this.resetErrorBoundary();
      }
    }
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  private logError = (error: Error, errorInfo: ErrorInfo, level: string) => {
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId: this.state.errorId,
      level,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
      url: typeof window !== 'undefined' ? window.location.href : '',
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', errorData);
    }

    // Send to analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as { gtag: (command: string, eventName: string, parameters: Record<string, unknown>) => void }).gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        error_boundary: true,
        error_id: this.state.errorId,
        level,
      });
    }

    // Send to error reporting service (if available)
    this.sendToErrorService(errorData);
  };

  private sendToErrorService = (errorData: Record<string, unknown>) => {
    // Implement your error reporting service here
    // Examples: Sentry, LogRocket, Bugsnag, etc.
    try {
      // Example: Send to custom error endpoint
      if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
        fetch('/api/errors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(errorData),
        }).catch(() => {
          // Silently fail if error reporting fails
        });
      }
    } catch {
      // Silently fail
    }
  };

  private handleAutoRetry = (error: Error) => {
    const { retryCount } = this.state;
    
    // Only retry for certain error types
    const retryableErrors = [
      'ChunkLoadError',
      'Loading chunk',
      'Loading CSS chunk',
      'NetworkError',
    ];

    const shouldRetry = retryableErrors.some(errorType => 
      error.message.includes(errorType)
    );

    if (shouldRetry && retryCount < this.maxRetries) {
      this.retryTimeoutId = setTimeout(() => {
        this.setState(prevState => ({
          retryCount: prevState.retryCount + 1,
        }));
        this.resetErrorBoundary();
      }, this.retryDelay * Math.pow(2, retryCount)); // Exponential backoff
    }
  };

  resetErrorBoundary = () => {
    const { onReset } = this.props;
    
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
    });

    onReset?.();
  };

  retry = () => {
    this.resetErrorBoundary();
  };

  render() {
    const { hasError, error, retryCount } = this.state;
    const { children, fallback, isolate } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <ErrorFallback
          error={error}
          retryCount={retryCount}
          onRetry={this.retry}
          onReset={this.resetErrorBoundary}
          isolate={isolate}
        />
      );
    }

    return children;
  }
}

// Error Fallback Component
interface ErrorFallbackProps {
  error: Error | null;
  retryCount: number;
  onRetry: () => void;
  onReset: () => void;
  isolate?: boolean;
}

function ErrorFallback({ 
  error, 
  retryCount: _retryCount, 
  onRetry, 
  onReset, 
  isolate = false 
}: ErrorFallbackProps) {
  const isNetworkError = error?.message.includes('NetworkError') || 
                        error?.message.includes('ChunkLoadError');
  
  const isRetryable = _retryCount < 3 && isNetworkError;

  return (
    <div className={`${isolate ? 'isolate' : ''} min-h-[200px] flex items-center justify-center p-8`}>
      <div className="text-center max-w-md">
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {isNetworkError ? 'Connection Error' : 'Something went wrong'}
        </h3>
        
        <p className="text-sm text-gray-500 mb-4">
          {isNetworkError 
            ? 'There was a problem loading this content. Please check your connection and try again.'
            : 'An unexpected error occurred. Our team has been notified.'
          }
        </p>

        {process.env.NODE_ENV === 'development' && error && (
          <details className="mb-4 text-left">
            <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
              Error Details
            </summary>
            <pre className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded overflow-auto">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}

        <div className="flex gap-2 justify-center">
          {isRetryable && (
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Try Again ({3 - _retryCount} attempts left)
            </button>
          )}
          
          <button
            onClick={onReset}
            className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

// Hook for error boundary functionality
export function useErrorBoundary() {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const captureError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return {
    captureError,
    resetError,
  };
}

// Higher-order component for error boundaries
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <AdvancedErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </AdvancedErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}
