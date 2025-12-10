# Hotel Room Listing Application

A modern, performant hotel room listing application built with React, TypeScript, and Tailwind CSS. Features infinite scroll pagination, media galleries, and responsive design optimized for browsing hotel rooms and their variants.

## Features

- 🏨 Browse hotel rooms with detailed information
- 🖼️ Media galleries with image sliders and video support
- 💰 Multiple room variants with pricing and discount information
- ♾️ Infinite scroll pagination for smooth browsing
- 📱 Fully responsive design
- ⚡ Performance optimized with lazy loading and memoization
- ♿ Accessibility-compliant components

## Tech Stack

- **React 19.2** - UI framework with latest features
- **TypeScript 5.9** - Type-safe development
- **Vite 7.2** - Fast build tool and dev server with HMR
- **Tailwind CSS 3.4** - Utility-first styling
- **ESLint + Prettier** - Code quality and formatting

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd room-listing

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
# Type check and build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality

```bash
# Run ESLint
npm run lint
```

## Project Architecture

### Directory Structure

```
src/
├── components/          # React components
│   ├── RoomList/       # Main room listing feature
│   │   ├── RoomList.tsx
│   │   └── components/ # Sub-components (RoomCard, MediaViewer, etc.)
│   └── common/         # Shared components (Skeleton, etc.)
├── constants/          # App-wide constants (pagination, breakpoints)
├── data/              # Static JSON data
├── hooks/             # Custom React hooks (useInfiniteRooms)
├── services/          # Business logic and data mapping
├── types/             # TypeScript type definitions
└── utils/             # Helper functions (formatters, mappers)
```

### Key Architectural Patterns

#### 1. Feature-Based Component Organization
Components are organized by feature with nested sub-components:
```
RoomList/
├── RoomList.tsx           # Main component
├── components/            # Feature-specific components
│   ├── RoomCard.tsx
│   ├── MediaViewer.tsx
│   ├── ImageMedia.tsx
│   └── VariantCard.tsx
└── index.ts              # Barrel export
```

#### 2. Service Layer Pattern
Business logic is separated from UI components:
- `roomService.ts` - Data fetching interface
- `dataMapper.ts` - Raw data transformation to domain models
- Clean separation allows easy API integration in the future

#### 3. Type-Safe Domain Models
Strong typing throughout the application:
```typescript
interface Room {
  id: string;
  name: string;
  capacity?: string;
  bedType?: string;
  media: RoomMedia[];
  variants: RoomVariant[];
}
```

#### 4. Custom Hooks for Complex Logic
Reusable hooks encapsulate complex behavior:
- `useInfiniteRooms` - Handles infinite scroll with Intersection Observer

## Performance Optimizations

### 1. Component Memoization
Frequently rendered components use `React.memo()` to prevent unnecessary re-renders:
- `RoomCard` - Memoized to avoid re-rendering when parent updates
- `MediaViewer` - Prevents re-processing media arrays
- `VariantCard` - Optimizes variant list rendering

### 2. Infinite Scroll with Intersection Observer
Instead of loading all rooms at once, we implement progressive loading:
- Initial load: 10 rooms
- Loads more as user scrolls (configurable page size)
- Uses native Intersection Observer API for efficient scroll detection
- 200px root margin for preemptive loading
- Debounced loading with 400ms delay to prevent rapid triggers

```typescript
const observer = new IntersectionObserver(
  (entries) => {
    if (entry.isIntersecting) {
      // Load more rooms
    }
  },
  {
    rootMargin: '200px',  // Start loading before reaching bottom
    threshold: 0.1,
  }
);
```

### 3. Lazy Image Loading
Images use native lazy loading to defer off-screen images:
```tsx
<img src={url} loading="lazy" />
```

### 4. Skeleton Loading States
Provides visual feedback while images load, improving perceived performance:
- Skeleton placeholders shown until images load
- Prevents layout shift (CLS optimization)

### 5. Optimized Re-renders
- `useMemo` for expensive computations (variant filtering, media processing)
- Conditional rendering to avoid unnecessary DOM updates
- Efficient state management with minimal re-render triggers

### 6. Code Splitting Ready
- Vite's automatic code splitting for production builds
- Dynamic imports can be added for route-based splitting

### 7. Build Optimizations
- TypeScript project references for faster builds
- Vite's optimized dependency pre-bundling
- Tree-shaking for minimal bundle size

## Code Style Guidelines

### TypeScript
- Explicit return types on exported functions
- Use `type` for unions/primitives, `interface` for objects
- Avoid `any` - prefer `unknown` or proper types

### React
- Functional components with hooks
- Props interfaces with `Props` suffix
- Memoize components that render frequently

### Imports
- Use `@/` alias for all src imports
- Group imports: external → internal → types
- Prefer named exports for better refactoring

### Formatting
- 2-space indentation
- Single quotes for JS/TS, double quotes for JSX
- Semicolons required
- Trailing commas in multiline structures
- Spaces inside object braces

## Future Enhancements

- [ ] API integration (replace static JSON data)
- [ ] Room filtering and search
- [ ] Booking flow integration
- [ ] User authentication
- [ ] Favorites/wishlist functionality
- [ ] Price comparison across dates
- [ ] Virtual scrolling for very large datasets
- [ ] Progressive Web App (PWA) support

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ features required
- Intersection Observer API required (widely supported)

