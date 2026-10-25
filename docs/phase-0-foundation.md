# Phase 0 — Foundation

**Status:** Not started  
**Depends on:** —  
**Blocks:** All other phases

## Goal

A boring, maintainable full-stack baseline so feature work in Phase 1 is mostly product logic, not plumbing.

## Outcomes

- [ ] Repository layout: API at repo root (`src/`), frontend in `frontend/` (later), shared code in `packages/shared` if needed
- [ ] TypeScript strict in web + api + shared
- [ ] PostgreSQL running locally (Docker Compose)
- [ ] Migrations tool chosen and first migration (users table)
- [ ] Express app: health check, error handler, request logging
- [ ] React SPA: Vite, router, layout shell, SK strings placeholder
- [ ] Shared Zod schemas for auth + one sample DTO
- [ ] CI: install, lint, typecheck, test (empty or smoke)
- [ ] Env documented (`.env.example`)

## Suggested structure

```text
rent-flow/          Express + TS (backend root)
  src/
  frontend/         React + Vite + TS (later)
  packages/
    shared/         Zod schemas, types, tax rules (optional)
  docs/
  docker-compose.yml
```

## Auth (MVP choice)

Pick one and stick to it for Phase 1:

| Option | Pros |
|--------|------|
| Session cookie + server store | Familiar from Laravel; simple SPA with credentials |
| JWT access + httpOnly refresh | Stateless API; slightly more moving parts |

Requirements:

- Register / login / logout
- `GET /api/me` for SPA bootstrap
- Password hashing (argon2 or bcrypt)

## Database

- PostgreSQL 16+
- ORM/query layer: Prisma or Drizzle (either is fine coming from Eloquent)
- Never put tax rules only in UI — seed or migrate `TaxExpenseCategory` when Phase 1 starts

## Web app conventions

- React Router for routes
- TanStack Query for server state
- Form library: React Hook Form + Zod resolver (matches Laravel Form Request mental model)
- Feature folders: `features/auth`, later `features/calculator`

## API conventions

- JSON REST under `/api`
- Validation middleware using shared Zod schemas
- Consistent error shape: `{ error: { code, message, details? } }`
- CORS configured for dev; same-site cookie in prod if using cookies

## Laravel → Node/React cheat sheet

| Laravel | Rent-flow |
|---------|-----------|
| `routes/web.php` | React Router |
| `routes/api.php` | Express `routes/` |
| Form Request | Zod + middleware |
| Service class | `services/` plain TS modules |
| Eloquent | Prisma/Drizzle |
| `.env` | `apps/api/.env` + Vite `VITE_*` |

## Tasks checklist

1. Init monorepo (pnpm workspaces or npm workspaces)
2. Docker Compose: postgres + optional adminer
3. API: health, auth skeleton, user migration
4. Web: login/register pages (minimal styling)
5. Shared package wired into both apps
6. README root: how to run dev stack

## Exit criteria

Developer can run `docker compose up`, migrate DB, start api + web, register a user, see authenticated shell page.

## Not in Phase 0

- Tax engine implementation
- Calculator UI
- Payments / billing
- Production deploy (document target host in Phase 1 if needed)
