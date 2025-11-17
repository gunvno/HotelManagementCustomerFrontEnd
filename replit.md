# Continental Hotel Booking System

## Overview

Continental Hotel is a full-stack hotel booking web application built with a modern TypeScript stack. The application allows users to browse hotel room posts, view promotional offers, and manage their profiles. It features a clean, hospitality-focused design inspired by Airbnb and Booking.com aesthetics, with emphasis on visual appeal and professional credibility.

The system is designed for authenticated users to explore hotel accommodations, discover special promotions, and manage their account information through an elegant, responsive interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite for fast development and optimized production builds
- **Routing:** Wouter for lightweight client-side routing
- **State Management:** TanStack Query (React Query) for server state management
- **Styling:** Tailwind CSS with custom design system
- **UI Components:** Radix UI primitives with shadcn/ui component library
- **Forms:** React Hook Form with Zod validation via @hookform/resolvers

**Design System:**
- Typography: Inter font family from Google Fonts
- Color scheme: Neutral base with primary accent colors using HSL color system
- Component library: shadcn/ui "new-york" style variant
- Responsive design: Mobile-first approach with Tailwind breakpoints
- Custom CSS variables for theming with light/dark mode support

**Key Frontend Patterns:**
- Component-based architecture with reusable UI components
- Protected routes requiring authentication
- Optimistic UI updates with React Query
- Toast notifications for user feedback
- Skeleton loading states for better UX

### Backend Architecture

**Technology Stack:**
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js for REST API
- **ORM:** Drizzle ORM for type-safe database queries
- **Database Driver:** @neondatabase/serverless with WebSocket support
- **Session Management:** express-session with PostgreSQL store (connect-pg-simple)
- **Build Tool:** esbuild for production bundling, tsx for development

**API Design:**
- RESTful endpoints under `/api` namespace
- Session-based authentication with Replit OIDC
- Middleware for request logging and JSON parsing
- Credential-based requests for session management

**Authentication Flow:**
- OpenID Connect (OIDC) integration with Replit Auth
- Passport.js strategy for OAuth flow
- Session storage in PostgreSQL
- Protected routes with `isAuthenticated` middleware
- User profile management with upsert pattern

### Database Schema

**ORM Strategy:**
- Drizzle ORM with PostgreSQL dialect
- Schema-first approach with TypeScript types
- Zod schema integration for runtime validation
- Migration support via drizzle-kit

**Core Tables:**

1. **users** - User profiles and authentication
   - Fields: id, email, firstName, lastName, profileImageUrl, timestamps
   - Primary key: UUID (auto-generated)
   - Unique constraint on email

2. **posts** - Hotel room listings
   - Fields: id, title, description, imageUrl, tags (array), price, createdAt
   - Tags stored as PostgreSQL array type
   - Price stored as integer (USD per night)

3. **promotions** - Special offers and discounts
   - Fields: id, title, description, code, discount, imageUrl, validFrom, validUntil, createdAt
   - Discount stored as integer (percentage)
   - Date-based validity period

4. **sessions** - Express session storage
   - Fields: sid (primary key), sess (JSONB), expire (timestamp)
   - Index on expire for efficient cleanup

**Data Access Pattern:**
- Repository pattern via `storage` module (DatabaseStorage class)
- Type-safe operations with Drizzle's query builder
- Upsert operations for user management
- Filter support for posts (by tag) and promotions (by code)

### Development Workflow

**Development Mode:**
- Vite dev server with HMR for frontend
- Express middleware mode for API integration
- tsx for TypeScript execution without compilation
- Custom logging for API requests
- Runtime error overlay via Replit plugins

**Production Build:**
- Vite builds static assets to `dist/public`
- esbuild bundles server code to `dist/index.js`
- ESM module format throughout
- Static file serving from production build

**Environment Configuration:**
- `NODE_ENV` for environment detection
- `DATABASE_URL` required for database connection
- `SESSION_SECRET` for session encryption
- `ISSUER_URL` and `REPL_ID` for OIDC authentication

## External Dependencies

### Database
- **Neon PostgreSQL:** Serverless PostgreSQL database via @neondatabase/serverless
- WebSocket connection pooling for efficient database access
- Connection string via `DATABASE_URL` environment variable

### Authentication
- **Replit Auth:** OpenID Connect (OIDC) provider for user authentication
- OAuth 2.0 flow with authorization code grant
- Token refresh mechanism for session management
- Required environment variables: `ISSUER_URL`, `REPL_ID`, `SESSION_SECRET`

### UI Component Library
- **shadcn/ui:** Pre-built accessible components based on Radix UI
- **Radix UI:** Headless UI primitives for accessibility
- Over 20 component primitives (Dialog, Dropdown, Toast, etc.)
- Customizable via Tailwind CSS

### Asset Management
- **Static Assets:** Stored in `attached_assets/generated_images/`
- Hotel room images and promotional banners
- Served via Vite's static asset handling
- Image URLs stored in database for room posts and promotions

### Third-Party Libraries
- **date-fns:** Date formatting and manipulation (with Vietnamese locale support)
- **lucide-react:** Icon library for UI components
- **wouter:** Lightweight routing library
- **nanoid:** Unique ID generation
- **memoizee:** Function memoization for performance optimization

### Development Tools
- **Replit Plugins:** Development experience enhancements
  - vite-plugin-runtime-error-modal: Error overlay
  - vite-plugin-cartographer: Code navigation
  - vite-plugin-dev-banner: Development indicator