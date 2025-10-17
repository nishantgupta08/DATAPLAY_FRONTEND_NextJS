// Centralized error handling
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(message, 403);
  }
}

// Error handler utility
export function handleError(error: unknown): { message: string; statusCode: number } {
  if (error instanceof AppError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: 500,
    };
  }

  return {
    message: 'An unexpected error occurred',
    statusCode: 500,
  };
}

// Error boundary component props
export interface ErrorBoundaryProps {
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

// Error logging
export class ErrorLogger {
  static log(error: Error, context?: Record<string, unknown>) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error:', error);
      if (context) {
        console.error('Context:', context);
      }
    } else {
      // In production, you would send to an error tracking service
      // like Sentry, LogRocket, etc.
      console.error('Production error:', error.message);
    }
  }

  static logAsync(error: Error, context?: Record<string, unknown>) {
    // Async error logging for non-blocking error reporting
    setTimeout(() => {
      this.log(error, context);
    }, 0);
  }
}

// API error response helper
export function createErrorResponse(error: unknown, statusCode?: number) {
  const { message, statusCode: errorStatusCode } = handleError(error);
  
  return {
    error: {
      message,
      statusCode: statusCode || errorStatusCode,
      timestamp: new Date().toISOString(),
    },
  };
}
