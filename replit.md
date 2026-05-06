# Maasfa Khan Portfolio

## Overview

This is a personal portfolio website for showcasing data science skills, projects, and certifications. The application is a full-stack TypeScript project with a React frontend and Express backend, using PostgreSQL for data persistence. It features a contact form, dynamic content loading for skills/projects/certifications, and a clean professional design with dark mode support.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state and data fetching
- **Styling**: Tailwind CSS with CSS variables for theming, shadcn/ui component library
- **Animations**: Framer Motion for scroll animations and transitions
- **Form Handling**: React Hook Form with Zod validation
- **Theme**: next-themes for dark/light mode switching
- **Build Tool**: Vite with path aliases (@/ for client/src, @shared/ for shared)

### Backend Architecture
- **Framework**: Express.js 5 on Node.js
- **API Design**: RESTful endpoints defined in shared/routes.ts with Zod schemas for type safety
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Schema Location**: shared/schema.ts contains all database table definitions
- **Storage Pattern**: Repository pattern implemented in server/storage.ts

### Data Layer
- **Database**: PostgreSQL (connection via DATABASE_URL environment variable)
- **Tables**: skills, projects, certifications, messages
- **Migrations**: Drizzle Kit for schema management (drizzle-kit push)
- **Validation**: Drizzle-zod for automatic schema-to-validation generation

### API Endpoints
- `GET /api/skills` - Retrieve all skills
- `GET /api/projects` - Retrieve all projects  
- `GET /api/certifications` - Retrieve all certifications
- `POST /api/contact` - Submit contact form message

### Build System
- Development: tsx for TypeScript execution
- Production: esbuild bundles server, Vite builds client to dist/public
- Server serves static files from dist/public in production

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, configured via DATABASE_URL environment variable
- **Drizzle ORM**: Database queries and schema management

### UI Component Library
- **shadcn/ui**: Pre-built accessible components using Radix UI primitives
- **Radix UI**: Headless UI primitives for accessibility

### Fonts
- **Google Fonts**: Inter (sans-serif) and Outfit (display) loaded via CDN

### Development Tools
- **Replit Plugins**: Runtime error overlay, cartographer, and dev banner for Replit environment