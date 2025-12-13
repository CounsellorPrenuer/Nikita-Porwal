# EduVista - Educational Counseling Platform

## Overview

EduVista is a premium educational counseling website for Nikita Porwal, offering personalized guidance services for students, parents, and teachers. The platform features a hypermodern design with glassmorphism effects, animated gradients, and a comprehensive pricing system with Razorpay payment integration. Built as a full-stack TypeScript application with React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and data fetching
- **Styling**: Tailwind CSS with CSS custom properties for theming (light/dark mode support)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Design System**: Hypermodern aesthetic with glassmorphism, gradients, and micro-animations as defined in design_guidelines.md

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful endpoints under `/api/` prefix
- **Build System**: Custom esbuild script for production bundling with Vite for client

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` contains database table definitions
- **Migrations**: Drizzle Kit manages migrations in `/migrations` directory
- **Current Storage**: In-memory storage implementation exists (`MemStorage` class) with database integration ready via Drizzle

### Key Design Decisions
1. **Monorepo Structure**: Client, server, and shared code colocated with path aliases (`@/`, `@shared/`, `@assets/`)
2. **Schema Sharing**: Database schemas and Zod validation schemas shared between client and server via `shared/` directory
3. **Theme System**: CSS custom properties with React context for light/dark mode persistence to localStorage
4. **Component Architecture**: Reusable UI primitives in `components/ui/`, feature components at `components/` level
5. **Payment Integration**: Razorpay integration for pricing packages with order creation and verification endpoints

### File Structure Pattern
```
client/src/
├── components/     # React components (UI primitives in ui/, features at root)
├── pages/          # Route page components
├── hooks/          # Custom React hooks
├── lib/            # Utilities, context providers, query client
server/
├── index.ts        # Express app setup and middleware
├── routes.ts       # API route definitions
├── db.ts           # Database connection
├── storage.ts      # Data access layer
shared/
├── schema.ts       # Drizzle schemas and Zod types
```

## External Dependencies

### Payment Processing
- **Razorpay**: Indian payment gateway for pricing packages
- Environment variables: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`

### Database
- **PostgreSQL**: Primary database via `DATABASE_URL` environment variable
- Connection managed through `pg` Pool with Drizzle ORM

### Third-Party Services
- **Google Fonts**: Plus Jakarta Sans, Inter, Playfair Display for typography
- **Google Drive**: External brand assets referenced in attached_assets

### Key NPM Packages
- `@tanstack/react-query`: Data fetching and caching
- `drizzle-orm` + `drizzle-zod`: Database ORM with Zod schema generation
- `react-hook-form` + `@hookform/resolvers`: Form handling with Zod validation
- `wouter`: Lightweight React router
- `lucide-react`: Icon library
- `react-icons`: Additional icons (WhatsApp, etc.)
- `embla-carousel-react`: Carousel functionality
- `vaul`: Drawer component