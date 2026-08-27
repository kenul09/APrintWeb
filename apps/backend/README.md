# A Print — Backend API

Standalone REST API (Express + TypeScript + Prisma + PostgreSQL) for the
`apps/client` and `apps/admin` applications. Handles authentication,
products, portfolio and contact messages.

## 1. Requirements

- Node.js 18+
- PostgreSQL 14+ running locally (or reachable via `DATABASE_URL`)

## 2. Installation

```bash
cd apps/backend
npm install
```

## 3. PostgreSQL setup

If you don't already have PostgreSQL running:

```bash
brew install postgresql@16
brew services start postgresql@16
createdb aprint
```

## 4. Environment variables

Copy the example file and fill in real values:

```bash
cp .env.example .env
```

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret used to sign JWTs (`openssl rand -base64 32`) |
| `JWT_EXPIRES_IN` | Token lifetime, e.g. `8h` |
| `PORT` | Port the API listens on (default `5001` — `5000` is commonly taken by macOS AirPlay Receiver) |
| `CLIENT_URL` / `ADMIN_URL` | Origins allowed by CORS |
| `SEED_ADMIN_NAME` / `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` | Used once by `prisma/seed.ts` to create the first admin **login** account |
| `MAIL_HOST` / `MAIL_PORT` / `MAIL_USER` / `MAIL_PASSWORD` / `MAIL_FROM` | SMTP credentials the contact-form notification is **sent from** — see [§10 Email notifications](#10-email-notifications) |
| `ADMIN_EMAIL` | The business inbox that **receives** every contact-form submission (`asadov_78@mail.ru`) — unrelated to `SEED_ADMIN_EMAIL` above |

## 5. Prisma setup & migration

```bash
npx prisma generate
npx prisma migrate dev --name init
```

## 6. Seed the first admin (+ starter data)

```bash
npm run seed
```

Creates the admin account from `SEED_ADMIN_EMAIL`/`SEED_ADMIN_PASSWORD`, and (only if
those tables are empty) seeds the existing portfolio images and a starter
price list so the client isn't empty on first run.

## 7. Development server

```bash
npm run dev
```

Starts on `http://localhost:<PORT>` (default `5001`) with hot reload.

## 8. API endpoints

Base URL: `/api`

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| GET | `/health` | — | Health check |
| POST | `/auth/login` | — | Admin login, returns JWT |
| GET | `/auth/me` | Bearer | Current admin profile |
| GET | `/products` | — | List products (`?active=true` filters) |
| GET | `/products/:id` | — | Get one product |
| POST | `/products` | Bearer (admin) | Create product |
| PUT | `/products/:id` | Bearer (admin) | Update product |
| DELETE | `/products/:id` | Bearer (admin) | Delete product |
| GET | `/portfolio` | — | List published portfolio items |
| GET | `/portfolio/:id` | — | Get one portfolio item |
| POST | `/portfolio` | Bearer (admin) | Create portfolio item |
| PUT | `/portfolio/:id` | Bearer (admin) | Update portfolio item |
| DELETE | `/portfolio/:id` | Bearer (admin) | Delete portfolio item |
| POST | `/contact` | — | Submit a contact message |
| GET | `/contact` | Bearer (admin) | List messages |
| PATCH | `/contact/:id/read` | Bearer (admin) | Mark a message read |
| DELETE | `/contact/:id` | Bearer (admin) | Delete a message |

All responses follow `{ success, data }` or `{ success, message, errors? }`.

## 9. Production build

```bash
npm run build
npm start
```

For a fresh production database:

```bash
npx prisma migrate deploy
npm run seed
```

## 10. Email notifications

Every `POST /api/contact` submission does two things, in order:

1. Saves a `ContactMessage` row (always — this never depends on email).
2. Sends a notification email to `ADMIN_EMAIL` via `src/services/email.service.ts`
   (best-effort — a failure here is logged and does **not** fail the request
   or roll back the saved record; see `src/controllers/contact.controller.ts`).

The customer's submitted email is used as the `Reply-To` header, never as the
`To` or `From` — so the admin can hit "Reply" in their mail client and it
goes straight to the customer, while the notification itself always arrives
from the configured SMTP account.

### Required environment variables

```env
MAIL_HOST="smtp.mail.ru"
MAIL_PORT=465
MAIL_USER="your-account@mail.ru"
MAIL_PASSWORD="your-mail.ru-app-password"
MAIL_FROM="your-account@mail.ru"
ADMIN_EMAIL="asadov_78@mail.ru"
```

If `MAIL_HOST`/`MAIL_USER`/`MAIL_PASSWORD` are left unset, `email.service.ts`
logs a warning and skips sending — the contact form still works and still
saves to the database, it just won't notify anyone by email yet.

### Mail.ru SMTP setup (application password)

Mail.ru **rejects your normal account password** over SMTP — confirmed
directly against their server while building this: with a placeholder
password it returned `535 5.7.0 Application password is REQUIRED`. You must
generate a separate app password:

1. Log into the Mail.ru account that will send these emails.
2. Go to **Настройки почты → Пароль и безопасность → Пароли для внешних приложений**
   (Settings → Password and security → App passwords) — direct link:
   https://help.mail.ru/mail/security/protection/external
3. Create a new app password (name it something like "A Print backend").
4. Put that generated password in `MAIL_PASSWORD` — **not** your regular
   mailbox password.
5. Use `MAIL_HOST=smtp.mail.ru`, `MAIL_PORT=465` (implicit TLS/SSL).

### Testing email sending

With real Mail.ru credentials in `.env`, restart the server and:

```bash
curl -X POST http://localhost:5001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Əli Həsənov","email":"test@example.com","phone":"+994551234567","service":"Banner","message":"Test müraciəti"}'
```

Check `asadov_78@mail.ru` for a `Yeni sifariş — Banner | A Print` email, and
confirm "Reply" addresses `test@example.com`.

Without real credentials, you can still verify the email-building/sending
code path end-to-end against a disposable inbox (no real account needed) —
in a scratch script: call `nodemailer.createTestAccount()`, set
`MAIL_HOST=smtp.ethereal.email`, `MAIL_PORT=587`, and `MAIL_USER`/`MAIL_PASSWORD`
to the values it returns, then call `sendContactNotification(...)` and open
the URL from `nodemailer.getTestMessageUrl(info)`.

### Troubleshooting SMTP errors

| Error | Cause | Fix |
| --- | --- | --- |
| `535 5.7.0 Application password is REQUIRED` | Using the regular mailbox password | Generate and use an app password (see above) |
| `ETIMEDOUT` / `ECONNREFUSED` | Wrong host/port, or outbound SMTP blocked by network/firewall | Confirm `MAIL_HOST=smtp.mail.ru`, `MAIL_PORT=465`, and that the network allows outbound 465 |
| `EAUTH` with a different message | Wrong `MAIL_USER`, or app password revoked/expired | Regenerate the app password in Mail.ru settings |
| Email never arrives but no error is logged | `MAIL_HOST`/`MAIL_USER`/`MAIL_PASSWORD` unset | Check the `[email.service]` warning in server logs — sending was skipped, not failed |

None of these ever reach the client — `contact.controller.ts` only logs them
server-side; the HTTP response to the browser is unaffected either way.

## 11. How Client and Admin connect

- `apps/client` reads `NEXT_PUBLIC_API_URL` (see `apps/client/.env.example`)
  and calls this API through `apps/client/lib/api/*Service.js` for products,
  portfolio and the contact form.
- `apps/admin` reads `VITE_BACKEND_URL` (see `apps/admin/.env.example`) and
  calls this API through `apps/admin/src/admin/lib/*Service.js`, using a JWT
  stored in `localStorage` (see `lib/backend.js`).

### Known scope boundary

Orders and Customers (`apps/admin`'s "Sifarişlər"/"Müştərilər" pages) and
admin self-registration were **not** migrated — they still run on
`apps/client`'s original Next.js API routes + SQLite (session-cookie auth).
That wasn't part of the requested backend scope, and migrating it wasn't
necessary to avoid breaking those pages. `apps/admin`'s login screen logs
into both systems (this backend is the source of truth; the legacy login is
a best-effort side call) so those two pages keep working unchanged.
