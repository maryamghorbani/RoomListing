# Hotel Room Listing Application


## Super Quick

I aim to live project before you review, the project, so you can check it out here: [Live](https://livemys.com).


### Steps to proceed on local machine:
1. Run `docker-common` [more info](./docker-common/README.md). # only first time
    ```bash
    cd docker-common
    docker compose up -d 
    cd ..
    ```
1. Run command below, and after that, you can access the app  at [https://unravel.dev.livemys.com](https://unravel.dev.livemys.com) on your local machine. 
   ```bash
   make start
   ```
1. Test
   ```bash
   make test
   ```
1. E2E 
   ```bash
   make test-e2e
   ```


# Introduction

Welcome to the **Hotel Room Listing Project**! 


## Architecture Overview


### Services
- Reverse Proxy(Traefik): Acts as a reverse proxy to route incoming HTTP requests to the appropriate services based on routing rules.
- Frontend (React + Vite): A single-page application built with React and Vite, providing a dynamic and responsive user interface for browsing hotel rooms.


### Technologies Used
- Traefik: For reverse proxying and routing HTTP requests.
- React 19.2 with TypeScript 5.9
- Vite 7.2
- Tailwind CSS 3.4
- Vitest + React Testing Library
- Playwright (E2E)
- ESLint + Prettier


## Reviewer Notes

Dear Reviewer,

Thank you for taking the time to review this project. This assignment showcases a modern React application with TypeScript, emphasizing clean architecture, performance optimization, comprehensive testing, and best practices in frontend engineering.

## Project Structure

```
src/
├── components/
│   ├── views/              
│   │   ├── RoomList/       
│   │   │   ├── RoomList.tsx
│   │   │   └── components/ 
│   │   ├── HotelHeader/    
│   │   └── index.ts        
│   ├── common/             
│   └── index.ts            
├── hooks/                  
├── services/               
│   ├── roomService.ts      
│   ├── dataMapper.ts       
│   └── types.ts            
├── types/                  
├── utils/                  
├── constants/              
└── data/                  
```


### Objectives Achieved

- **Fully Functional Room Listing Interface**: Built a complete hotel room browsing experience with infinite scroll pagination, media galleries (images/videos), and multiple booking variants per room
- **Production-Ready Architecture**: Implemented clean separation of concerns with service layer, data mappers, custom hooks, and reusable components following React best practices
- **Comprehensive Testing Coverage**: Achieved 26 tests across unit (utilities/services), component (React Testing Library), and E2E (Playwright) layers, demonstrating understanding of the testing pyramid
- **Performance-Optimized Implementation**: Applied memoization, image lazy loading, Intersection Observer API for infinite scroll, and efficient re-render strategies to ensure smooth user experience
- **Type-Safe Development**: Full TypeScript coverage with strict mode, explicit types, and domain-driven design for maintainability and developer experience
- **Responsive & Accessible Design**: Mobile-first approach with Tailwind CSS, semantic HTML, and accessibility-compliant components ensuring usability across all devices

### Design Decisions

- **Service Layer Pattern**: Data fetching and transformation is kept outside UI components to avoid coupling, improve testability, and make it easy to replace static JSON with a real API. Fetching directly inside components was avoided because it complicates testing and future scalability.
- **Data Mapper Pattern**: The raw JSON was deeply nested and inconsistent, so a mapper normalizes it into clean, type-safe domain models. This keeps components simple and prevents repeated conditional logic. Mapping inside components or using raw API responses was rejected due to readability and maintainability issues.
- **Custom Hooks for Reusable Logic**: Logic such as infinite scroll lives in useInfiniteRooms to keep components small, reusable, and easy to test. Putting this logic inside components would make them bloated and harder to reuse.
- **Feature-Based Folder Structure**: The project groups files by feature instead of type. This increases discoverability, reduces navigation overhead, and scales better for larger applications. Type-based structures were avoided because they scatter related logic across folders.
- **Barrel Exports Pattern**: index.ts files simplify imports and hide internal file structure, improving readability and making refactoring safer. Without barrel exports, imports become long and fragile.
- **Domain-Driven Type Design**: Domain models (Room, Variant, Media) are designed around the business rather than the backend schema. This prevents backend changes from breaking the UI and improves clarity and type safety.
- **State Management Decision**: A global state manager was intentionally not added because the app is read-only and state is localized. Adding Redux/Zustand would increase complexity without meaningful benefit.
  If future features require shared or server state, the architecture supports adding Zustand for client state, React Query for API/server data and Redux Toolkit → for enterprise-scale workflows requiring strict predictability. This decision keeps the assignment focused, maintainable, and aligned with real-world scale requirements, while ensuring that future state management choices can be integrated cleanly without rewriting the UI.

### Areas of Focus

- Clean Architecture with Layered Separation 
- Modular and Reusable Components
- Efficient Data Fetching with Infinite Scroll
- Comprehensive Testing Strategy (Unit, Component, E2E)
- TypeScript-first Development
- Responsive and Accessible UI
- Performance Optimization Techniques
- Styling with Tailwind CSS

### Notes for Improvement

- **Expanded Test Coverage**: Current coverage is strong for a coding assignment, but if this were a production app, the next natural steps would be:
  - Adding more E2E flows (filters, media interactions, mobile layout)
  - Adding integration tests to cover service → mapper → UI boundaries
  - Adding accessibility tests (axe-core) to automate a11y checks
  - Adding visual regression tests to ensure UI consistency after changes
    These were not included to keep the scope reasonable for the assignment.
- **Monitoring and Logging**: Implement error tracking (e.g., Sentry) and analytics (e.g., Google Analytics) to monitor user behavior and catch production issues
- **CI/CD Pipeline**: Set up automated testing and deployment pipeline (e.g., GitHub Actions) to streamline development workflow and ensure code quality
- **Performance Optimizations**: Consider virtual scrolling for 1000+ rooms, image optimization with WebP format, and implementing PWA features for offline support

---

Thank you again for your consideration.
