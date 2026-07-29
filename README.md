# Atlas

Atlas is a full-stack application built to demonstrate production-oriented React and Next.js engineering. It combines a custom marketing site, authenticated application shell, persistent sessions, database-backed rate limiting, automated tests, observability, and continuous deployment.

The repository is intentionally focused on architecture and engineering decisions rather than feature volume.

## Technical overview

- Next.js 16 with the App Router
- React 19 and TypeScript
- PostgreSQL with Prisma ORM
- Server Actions for authentication workflows
- React Hook Form and Zod for form state and validation
- Tailwind CSS 4 and reusable UI primitives
- Vitest and Testing Library
- Sentry instrumentation
- GitHub Actions for verification and production deployment
- PM2 and Nginx in production

## Implemented functionality

### Authentication

- User registration and login
- Password hashing with `bcryptjs`
- Database-backed sessions
- HTTP-only session cookies
- Protected layouts and authentication redirects
- Session expiry validation and cleanup
- Logout with server-side session invalidation
- Safe session DTOs that exclude password hashes and internal fields

### Abuse protection

Authentication endpoints use a database-backed fixed-window rate limiter.

- Login attempts are limited by client IP and normalized email address
- Registration attempts are limited separately by IP and email
- Rate-limit identifiers are stored as SHA-256 hashes
- Successful authentication clears the relevant email counter
- Counters are shared across processes and survive application restarts

The current thresholds are defined in:

```text
src/features/auth/rate-limit/config.ts
```

### Application interface

- Responsive marketing landing page
- Authenticated dashboard shell
- Reusable navigation, form, input, button, and typography components
- Dashboard metric cards and chart components
- Theme and navigation configuration kept outside component code

### Reliability and operations

- Sentry error and performance instrumentation
- Structured server-side logging
- Prisma migration history
- CI checks for linting, type safety, tests, and production builds
- Automated deployment to a self-hosted Ubuntu server over SSH
- Nginx reverse proxy with Next.js bound to localhost

## Architecture

Atlas uses a feature-oriented structure. Route composition remains under `src/app`, while business logic and feature-specific UI live under `src/features`.

```text
src/
├── app/                    Next.js routes, layouts, loading and error boundaries
├── components/             Shared application and UI components
├── config/                 Navigation and theme configuration
├── features/
│   ├── auth/               Actions, schemas, services, sessions and rate limiting
│   ├── dashboard/          Dashboard components and data contracts
│   └── marketing/          Public landing-page sections and static content
├── generated/              Generated Prisma client
├── lib/                    Prisma, logging, password and shared utilities
├── providers/              Client-side context providers
├── styles/                 Global styles and design tokens
└── types/                  Shared TypeScript declarations
```

The main boundaries are:

- **Route layer:** layouts, pages, redirects and request lifecycle
- **Action layer:** input parsing, validation and orchestration
- **Service layer:** authentication and domain operations
- **Persistence layer:** Prisma queries and PostgreSQL models
- **Presentation layer:** feature components and shared UI primitives

This keeps database and authentication concerns out of React components while preserving Next.js server-side execution.

## Authentication flow

```text
Browser form
  -> React Hook Form
  -> Zod validation
  -> Server Action
  -> Rate-limit checks
  -> Authentication service
  -> Prisma/PostgreSQL
  -> Session record
  -> HTTP-only cookie
  -> Protected application layout
```

Session lookup returns a deliberately restricted user object:

```ts
{
  id: string;
  name: string;
  email: string;
}
```

Sensitive database fields are not selected when session data is prepared for client-side providers.

## Database models

The current schema contains three primary models:

- `User` stores account identity and password hashes
- `Session` stores revocable, expiring login sessions
- `AuthRateLimit` stores shared authentication counters and expiry windows

Schema changes are managed with committed Prisma migrations.

For local development:

```bash
npx prisma migrate dev --name <migration_name>
```

For production:

```bash
npx prisma migrate deploy
```

## Local development

### Requirements

- Node.js 22
- npm
- PostgreSQL

### Install dependencies

```bash
npm ci
```

### Configure the environment

Create `.env` in the repository root:

```env
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/atlas?schema=public"
NODE_ENV="development"
```

Sentry credentials are optional for local development. The SDK can remain disabled outside production.

### Apply migrations and generate the client

```bash
npx prisma migrate dev
npx prisma generate
```

### Start the application

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

## Quality checks

Run the same checks used by CI:

```bash
npm run lint
npm run typecheck
npm run test:ci
npm run build
```

For local test development:

```bash
npm run test:watch
```

For coverage:

```bash
npm run coverage
```

The test suite covers:

- Authentication schemas
- Login and registration services
- Authentication Server Actions
- Session creation, expiry and deletion
- Protected layout redirects
- Client-IP resolution
- Rate-limit counters and enforcement
- Selected form and UI behavior

## Continuous integration

Every pull request and push to `main` runs automated verification through GitHub Actions.

The production workflow performs:

1. Dependency installation
2. Prisma Client generation
3. ESLint validation
4. TypeScript validation
5. Test execution
6. Production build
7. SSH deployment after all checks pass

Production deployment applies pending migrations before restarting the application with PM2.

## Production topology

```text
Internet
  -> Nginx
  -> 127.0.0.1:3000
  -> Next.js / PM2
  -> PostgreSQL
```

The Next.js process is bound to localhost and is not directly exposed publicly. Nginx terminates HTTPS and forwards the original client headers required by the rate limiter.

## Security decisions

- Passwords are hashed and never stored directly
- Session tokens are stored in HTTP-only cookies
- Sessions are persisted, revocable and time-limited
- Protected routes validate sessions on the server
- Authentication errors avoid exposing credential validity
- Rate-limit keys do not store raw email addresses or IP addresses
- Prisma session queries explicitly select safe user fields
- Database migrations are applied through deployment automation
- Application port `3000` is accessible only from the local server

## Current scope

Atlas currently prioritizes authentication, application structure, testability and deployment discipline. It is not presented as a finished SaaS product.

Logical next additions include:

- Password reset and email verification
- OAuth account linking
- Multi-factor authentication
- Session management UI
- End-to-end browser tests
- Redis-backed distributed rate limiting for larger deployments
- A complete domain feature with audited authorization rules

## License

MIT