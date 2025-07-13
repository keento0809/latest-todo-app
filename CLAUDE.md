# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run lint` - Run ESLint
- `npm test` - Run tests in watch mode with Vitest
- `npm run test:run` - Run tests once with Vitest
- `npm run storybook` - Start Storybook development server on port 6006
- `npm run build-storybook` - Build Storybook for production

## Project Architecture

This is a Next.js 15 application using the App Router with a feature-based architecture:

### Authentication & Database
- **NextAuth.js v5** for authentication with custom credentials provider
- **Drizzle ORM** with PostgreSQL (Neon) for database operations
- **Bcrypt** for password hashing
- Database schema includes `users`, `accounts`, `sessions`, and `todo` tables

### API Layer
- **Hono** framework for API routes with Zod validation
- API routes follow pattern: `app/api/[[...route]]/route.ts`
- Server actions in `_actions/` directories for form handling

### Frontend Structure
- **Container/Presentation pattern** - Components split into logic (Container) and UI (Presentation)
- **Feature-based organization** - Each feature has its own directory with components, hooks, actions, and types
- **Atomic design** - Common UI components in `app/_components/_common/_ui/`

### Key Directories
- `app/(auth)/` - Authentication pages (signin/signup) with route groups
- `app/(home)/` - Main application pages  
- `app/_components/` - Shared components organized by type (common, icons, layouts)
- `app/_db/` - Database configuration and schema
- `app/_libs/` - Shared utilities (auth config, API clients, validation schemas)
- `app/_providers/` - React context providers

### State Management & Forms
- **XState** for complex state machines
- **React Hook Form** with **Conform** for form validation
- **Zod** schemas for runtime validation

### Testing & Documentation
- **Vitest** with React Testing Library for unit tests
- **Storybook** for component documentation and testing
- Test files follow `.test.tsx` convention
- Story files follow `.stories.ts` convention

### Styling
- **Tailwind CSS** for styling
- **Base UI Components** for accessible primitives

Each feature typically includes:
- `Container.tsx` - Logic and state management
- `Presentation.tsx` - UI rendering
- `_components/` - Feature-specific components
- `_hooks/` - Custom React hooks
- `_actions/` - Server actions
- `_types/` - TypeScript definitions
- `page.tsx` - Next.js route entry point