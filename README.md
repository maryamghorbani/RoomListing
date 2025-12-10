# Hotel Room Listing Application

A modern hotel room listing interface built with React, TypeScript, and Tailwind CSS.
The project demonstrates clean architecture, scalable component design, efficient data handling, and modern testing practices.

## 🎯 Project Overview

Users can browse hotel rooms with:

- **Multiple booking variants** 
- **Image & video media galleries**
- **Infinite scroll pagination**
- **Responsive design optimized for mobile & desktop** 

The goal was to implement a production-quality UI with clean architecture and strong type safety.


### ✨ Key Features

- 🔄 **Infinite Scroll Pagination** (Intersection Observer)
- 🖼️ **Room Media Galleries** (Images + Video support)
- 💰 **Variants with pricing, discounts, cancellation policies** 
- 📱 **Responsive Design** 
- ⚡ **Performance optimized** with memoization & lazy loading
- 🔒 **TypeScript-first architecture** 
- 🧪 **Well Tested** (unit, component, E2E)

## 🛠️ Tech Stack

- **React 19.2** with TypeScript 5.9
- **Vite 7.2**  
- **Tailwind CSS 3.4** 
- **Vitest** + **React Testing Library**
- **Playwright** (E2E)
- **ESLint** + Prettier

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Run all tests
npm run test:run

# Run E2E tests
npm run test:e2e

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── RoomList/           # Main feature with sub-components
│   │   ├── RoomList.tsx
│   │   └── components/     # RoomCard, MediaViewer, VariantCard, etc.
│   ├── HotelHeader/
│   └── common/             # Shared components (Skeleton)
├── hooks/                  # Custom hooks (useInfiniteRooms)
├── services/               # Business logic and data transformation
│   ├── roomService.ts      # Data fetching interface
│   ├── dataMapper.ts       # Raw data → domain models
│   └── types.ts            # Service layer types
├── types/                  # Domain models (Room, RoomVariant)
├── utils/                  # Helper functions (formatters, mappers)
├── constants/              # App configuration
└── data/                   # Static JSON data
```

## 🏗️ Architecture & Design Decisions

### 1. **Layered Architecture**
- **UI components contain no business logic** 
- **Services handle data shaping**
- **Utils contain pure functions** 
- **Hooks encapsulate reusable state logic** 

### 2. **Service Layer Pattern**
Separation of concerns with clear boundaries:
```typescript
// Service layer handles data orchestration
roomService.ts → dataMapper.ts → Domain Models
```

### 3. **Type-Safe Domain Models**
Strong typing prevents runtime errors:
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


### 4. **Infinite Scroll Pagination**
Efficiently loads rooms in chunks:

```typescript
const observer = new IntersectionObserver(
  (entries) => {
    if (entry.isIntersecting && !isLoading) {
      loadMore(); // Load next page
    }
  },
  { rootMargin: '200px', threshold: 0.1 }
);
```

### ⚡ Performance Optimizations
- **React.memo** for heavy components  
- **useMemo** for optimizing media/variant processing  
- **Lazy-loaded images** with `loading="lazy"`  
- **Skeleton placeholders** to prevent layout shift  


## 🧪 Testing Strategy
- **Unit tests for formatters, helpers, and services** 
- **Component tests with RTL (VariantCard)** 
- **E2E smoke test with Playwright** 

```bash
npm run test          # Run all unit/component tests in watch mode
npm run test:run      # Run all tests once
npm run test:e2e      # Run Playwright E2E tests
```


## 🚧 Future Enhancements

If this were a production application, next steps would include:

- **API Integration**
- **Filtering & Search** 
- **Room comparison & favorites**
- **Booking Flow**
- **Virtual scrolling for large datasets**

## 🌐 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+
- Intersection Observer required

