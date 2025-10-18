# Architecture Documentation

## Project Structure

```
📁 Project Root
├── 📁 app/                    # Next.js App Router
├── 📁 components/             # React Components
│   ├── 📁 ui/                # Reusable UI components
│   ├── 📁 layout/            # Layout components
│   ├── 📁 sections/          # Page sections
│   ├── 📁 forms/             # Form components
│   └── 📁 maps/              # Map components
├── 📁 services/              # API services
├── 📁 hooks/                 # Custom React hooks
├── 📁 utils/                 # Utility functions
├── 📁 config/                # Configuration files
├── 📁 types/                 # TypeScript definitions
├── 📁 styles/                # CSS styles
├── 📁 data/                  # Application data
└── 📁 public/                # Static assets
```

## Key Principles

1. **Separation of Concerns**: Each folder has a specific purpose
2. **Reusability**: Components are designed to be reusable
3. **Type Safety**: Full TypeScript coverage
4. **Performance**: Optimized imports and lazy loading
5. **Maintainability**: Clear structure for easy navigation

## Component Organization

- **UI Components**: Basic, reusable components (Button, Modal, etc.)
- **Layout Components**: Page structure (Header, Footer)
- **Section Components**: Page content sections
- **Form Components**: Form-related components
- **Map Components**: Map and location-related components

## Services Layer

- **API Client**: Centralized HTTP client
- **Service Classes**: Domain-specific API calls
- **Error Handling**: Consistent error management

## Configuration

- **App Config**: Application settings
- **Environment**: Environment variables
- **Database**: Database configuration
