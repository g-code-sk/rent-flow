# Ostane z nájmu

Slovak long-term rental calculator - Express API at the repo root, React app in `frontend/`.

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

| npm                  | Laravel                                                    |
| -------------------- | ---------------------------------------------------------- |
| `npm run db:migrate` | `php artisan migrate` (create + apply)                     |
| `npm run db:deploy`  | `php artisan migrate --force` (apply committed files only) |
| `npm run db:studio`  | browse tables (TablePlus-style)                            |
| `npm run db:reset`   | `php artisan migrate:fresh` - **local only**               |

```bash
npm install
cp .env.example .env   # set YOUR_MAC_USER to `whoami`
npm run db:deploy      # apply committed migrations (same as Render)
```

The first migration already lives in `prisma/migrations/` (like Laravel files in git). Use `npm run db:migrate` later when you _change_ `schema.prisma` and need a new migration.

`prisma/migrations/` is committed, same as Laravel’s `database/migrations/`.

### Render

1. Create a **PostgreSQL** instance in the Render dashboard.
2. Create one **Web Service** at the **repo root** (Root Directory empty — not `src` or `frontend`).
3. Set `DATABASE_URL` to the Postgres **Internal Database URL** (SSL is included).
4. **Build command:** `npm install && npm run build && npm run db:deploy`
5. **Start command:** `npm start`

`npm run build` compiles the API and builds the React app into `frontend/dist`. The API serves that folder in production, so the UI and `/api/*` share one URL (no separate Static Site).

Optional: set `CORS_ORIGIN` to your public `https://….onrender.com` URL if you later call the API from another origin.

Do not point local Prisma at the production Render URL while developing.

## API (waitlist / feedback)

`npm run dev` then:

```bash
curl -X POST http://localhost:3000/api/waitlist \
  -H 'Content-Type: application/json' \
  -d '{"email":"you@example.com","consent":true}'

curl -X POST http://localhost:3000/api/feedback \
  -H 'Content-Type: application/json' \
  -d '{"body":"Chcem PDF export","email":"you@example.com"}'
```

Success JSON is `{ "ok": true, "data": null }` (HTTP 201). Errors are `{ "ok": false, "error": { "code", "message", "details?" } }`. Hidden field `website` is a honeypot: if it is non-empty, the API returns the same success body and does not write. Duplicate waitlist emails also return success. Rate limit: 10 requests / 15 minutes / IP.
