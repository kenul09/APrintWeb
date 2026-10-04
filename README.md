# APrintWeb

Website and admin panel for the A Print printing company.

| App | Path | Stack | Dev URL |
|---|---|---|---|
| Public site | `apps/client` | Next.js 16 (App Router) | http://localhost:3000 |
| REST API | `apps/backend` | Express + Prisma + PostgreSQL | http://localhost:5001/api |
| Admin panel | `apps/admin` | Vite + React | http://localhost:5178 |

Each app has its own `package.json`, `node_modules` and lockfile. The root
`package.json` is not an npm workspace; it only holds scripts that run the
apps together.

## Requirements

- **Node.js 22 or newer** (tested with Node 26.3).
- **PostgreSQL** for the backend (local install or a hosted database).

## First-time setup

```bash
# 1. Install dependencies (root + each app)
npm install
npm install --prefix apps/backend
npm install --prefix apps/client
npm install --prefix apps/admin

# 2. Environment files — copy the examples and fill them in
cp apps/backend/.env.example apps/backend/.env   # DATABASE_URL, JWT_SECRET (required)
cp apps/client/.env.example  apps/client/.env.local
cp apps/admin/.env.example   apps/admin/.env

# 3. Database (first time only, against an empty database)
npm --prefix apps/backend run prisma:deploy
npm --prefix apps/backend run seed               # optional: first admin account
```

The backend refuses to start without `DATABASE_URL` and `JWT_SECRET` and
prints `Missing required environment variable: …`.

## Running

```bash
npm run dev
```

This starts backend, client and admin together with prefixed, colored logs.
If one app crashes, the others keep running. To run one app on its own:

```bash
npm run dev:backend   # http://localhost:5001/api
npm run dev:client    # http://localhost:3000  (redirects to /az, /en or /ru)
npm run dev:admin     # http://localhost:5178
```

The public site still renders when the backend is down: price and portfolio
sections show a "temporarily unavailable" notice with WhatsApp/contact links.

Quick check that the API is up:

```bash
curl http://127.0.0.1:5001/api/products
```

## Other scripts

```bash
npm run lint     # client + admin
npm run build    # client + admin
npm --prefix apps/client run images   # re-optimize public/portfolio and public/logos
```
