# RentFlow

Slovak long-term rental calculator — Express API at the repo root, React app in `frontend/`.

## Database (Postgres + Prisma)

No Docker. Local Postgres is like Valet + MySQL; [Render Postgres](https://render.com/docs/databases) is the production database.

### One-time local setup

```bash
brew install postgresql@16
brew services start postgresql@16
createdb rentflow
```

Copy [`.env.example`](.env.example) to `.env` and set `YOUR_MAC_USER` to the output of `whoami`:

```bash
cp .env.example .env
```

`DATABASE_URL` lives in `.env`. Prisma 7 reads it from [`prisma.config.ts`](prisma.config.ts) (like Laravel `config/database.php` pointing at `env('DB_...')`), not from `schema.prisma`.

### Commands

| npm | Laravel |
| --- | --- |
| `npm run db:migrate` | `php artisan migrate` (create + apply) |
| `npm run db:deploy` | `php artisan migrate --force` (apply committed files only) |
| `npm run db:studio` | browse tables (TablePlus-style) |
| `npm run db:reset` | `php artisan migrate:fresh` — **local only** |

```bash
npm install
cp .env.example .env   # set YOUR_MAC_USER to `whoami`
npm run db:deploy      # apply committed migrations (same as Render)
```

The first migration already lives in `prisma/migrations/` (like Laravel files in git). Use `npm run db:migrate` later when you *change* `schema.prisma` and need a new migration.

`prisma/migrations/` is committed, same as Laravel’s `database/migrations/`.

### Render

1. Create a **PostgreSQL** instance in the Render dashboard.
2. On the web/API service, set `DATABASE_URL` to the **Internal Database URL** (SSL is included).
3. Release/build should run `npx prisma migrate deploy` (not `migrate dev`), then `npm run build`.

Do not point local Prisma at the production Render URL while developing.
