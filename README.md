# Ostane z nájmu

Slovak long-term rental calculator. Laravel API at the repo root, React app in `frontend/`.

## Local setup

PHP 8.3+, Composer, Node, and MySQL.

```bash
composer install
cp .env.example .env
php artisan key:generate
```

Create the database, then:

```bash
php artisan migrate
npm ci --prefix frontend
```

Two processes:

```bash
php artisan serve
npm run dev --prefix frontend
```

The Vite dev server on port 5173 proxies `/api` to `http://127.0.0.1:8000`.

`QUEUE_CONNECTION=sync`. Form posts are handled in the request. A queue worker is not required.

## Production build

The document root is Laravel `public/`.

```bash
composer install --no-dev --optimize-autoloader
npm ci --prefix frontend && npm run build --prefix frontend
php artisan migrate --force
```

`npm run build` inside `frontend/` writes `index.html` and `assets/` into `public/` and does not delete `index.php`. Unknown GET paths fall back to `index.html`. `/api/*` stays on Laravel.

On shared PHP hosting, point the domain at `public/`, set the MySQL credentials in `.env`, and run migrations over SSH when the host provides it.

## API

`php artisan serve`, then:

```bash
curl -X POST http://127.0.0.1:8000/api/waitlist \
  -H 'Content-Type: application/json' \
  -d '{"email":"you@example.com","consent":true}'

curl -X POST http://127.0.0.1:8000/api/feedback \
  -H 'Content-Type: application/json' \
  -d '{"body":"Chcem PDF export","email":"you@example.com"}'
```

Success JSON is `{ "ok": true, "data": null }` (HTTP 201 for waitlist and feedback, HTTP 200 for opt-out). Errors are `{ "ok": false, "error": { "code", "message", "details?" } }`. Hidden field `website` is a honeypot: if it is non-empty, the API returns success and does not write. Duplicate waitlist emails also return success. Rate limit: 3 requests / 15 minutes / IP.
