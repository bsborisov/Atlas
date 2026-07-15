# Atlas

> A modern SaaS starter built with Next.js App Router, React 19, TypeScript and Prisma.

Atlas is a production-oriented application demonstrating modern frontend architecture, authentication, server actions and feature-based project organization. The project is designed as a portfolio piece to showcase engineering practices used in real-world enterprise React applications.

---

## ✨ Features

- 🔐 Secure authentication
  - Login & registration
  - HTTP-only cookie sessions
  - Password hashing with bcrypt
  - Protected routes
  - Automatic redirects

- ⚡ Next.js App Router
  - Server Components
  - Client Components
  - Route Groups
  - Layouts
  - Server Actions

- 📝 Forms
  - React Hook Form
  - Zod validation
  - Shared client/server schemas

- 🗄 Database
  - PostgreSQL
  - Prisma ORM
  - Session persistence

- 🎨 UI
  - Tailwind CSS
  - Reusable component library
  - Feature-based architecture

---

# Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 | React Framework |
| React 19 | UI |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| Prisma | ORM |
| PostgreSQL | Database |
| Zod | Validation |
| React Hook Form | Forms |
| bcrypt | Password Hashing |

---

# Architecture

```
src/

app/
components/
features/
lib/
providers/
server/
types/
```

Business logic is organized using a feature-first architecture.

```
features/

auth/
dashboard/
marketing/
users/
billing/
```

Each feature owns its own:

- components
- actions
- schemas
- services
- types

This keeps features isolated and easy to scale.

---

# Authentication Flow

```
User

↓

Login Form

↓

React Hook Form

↓

Zod Validation

↓

Server Action

↓

Auth Service

↓

Prisma

↓

Create Session

↓

HTTP-only Cookie

↓

Dashboard
```

Protected routes validate the active session before rendering private pages.

---

# Folder Structure

```
src/

app/
components/
features/
lib/
providers/
server/
types/
```

---

# Running Locally

## Install dependencies

```bash
npm install
```

## Configure environment

Create a `.env` file.

```env
DATABASE_URL="..."
```

## Run Prisma migrations

```bash
npx prisma migrate dev
```

## Generate Prisma Client

```bash
npx prisma generate
```

## Start development server

```bash
npm run dev
```

---

# Future Improvements

- Email verification
- Password reset
- OAuth providers
- Two-factor authentication
- User settings
- Dashboard widgets
- Unit & integration tests
- Storybook
- CI/CD pipeline
- Docker deployment

---

# Goals

The goal of Atlas is not simply to build another CRUD application.

The project focuses on demonstrating:

- scalable architecture
- maintainable code
- modern React patterns
- production-ready authentication
- reusable UI components
- clean separation of concerns

---

# License

MIT