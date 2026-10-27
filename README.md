# Arman Hossain Atunu — Portfolio Frontend

A separate Next.js App Router frontend for the existing Express + Prisma portfolio API. Includes a responsive animated public portfolio, dark/light theme, contact form, cookie-based admin login, and admin CRUD for profile, projects, skills, experience, education, and messages.

## Authentication integration verified from the backend source

The backend uses a signed JWT stored in an **HttpOnly cookie** (not Better Auth). Login is `POST /api/auth/login`, session check is `GET /api/auth/me`, logout is `POST /api/auth/logout`. All browser requests use `credentials: "include"` in `lib/api.ts`. The API's CORS `FRONTEND_ORIGIN` must match the frontend origin exactly.

## 1. Requirements

- Node.js 20 or newer (Node 22 LTS is recommended for a new Next.js app)
- Existing portfolio backend running on port 4000
- PostgreSQL migrated and admin account created on the backend

## 2. Install

Open PowerShell inside this frontend folder:

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

`.env.local` should contain:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

The API URL is public by design; do not put passwords, JWT secrets, or database URLs in a `NEXT_PUBLIC_*` variable.

## 3. Configure backend CORS

In the backend `.env`, use:

```env
FRONTEND_ORIGIN="http://localhost:3000"
```

Restart the backend after changing it. Keep frontend and backend on the same local browser profile. Do not change cookie settings to `SameSite=None` just to silence a browser error; cross-site production deployments need HTTPS and a deliberate CSRF/cookie design.

## 4. Create the admin (backend command)

From the **backend folder**, not this frontend folder:

```powershell
npm run admin:create
```

The backend's actual script name is `admin:create` (not `create-admin`). Make sure `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set in backend `.env`, and that database migration has succeeded first.

Then open `http://localhost:3000/admin/login` and sign in with those credentials. The dashboard is at `/admin/dashboard`.

## 5. Dashboard CRUD

- Profile: `GET/PUT /api/profile`
- Projects: `GET /api/projects?all=true`, `POST /api/projects`, `PUT/DELETE /api/projects/:id`
- Skills: `GET /api/skills`, `POST /api/skills`, `PUT/DELETE /api/skills/:id`
- Experience: `GET /api/experience`, `POST /api/experience`, `PUT/DELETE /api/experience/:id`
- Education: `GET /api/education`, `POST /api/education`, `PUT/DELETE /api/education/:id`
- Messages: `GET /api/contact`, `PATCH /api/contact/:id` with `{ "isRead": true }`, `DELETE /api/contact/:id`

The public homepage reads profile/projects/skills/experience/education from the API. If a table is empty, it displays friendly empty states or starter skill suggestions. Add actual portfolio records in the admin dashboard.

## 6. Deployment

Deploy this frontend as its own Next.js project (Vercel works well). Set `NEXT_PUBLIC_API_URL` to your deployed API origin, e.g. `https://your-api.example.com` (no trailing slash). Update the backend `FRONTEND_ORIGIN` to the exact deployed frontend origin. For separate registrable domains, review cookie `SameSite` behavior and CSRF protection before production; use HTTPS on both services.

## Notes

- The backend currently exposes `GET /api/projects?all=true` without `requireAdmin` according to its existing source. This dashboard uses it to list drafts; before public production, consider adding admin middleware to that query or a dedicated protected admin list route. This frontend does not modify the backend.
- Contact form is validated by backend Zod schema and backend rate limit. A failed API request is shown using toast notifications.
- The code has been generated against the backend route/schema source, but it has not been run against your local database from this environment. Install dependencies and test locally; send any TypeScript/build/API error for a targeted fix.

## Biome + shadcn/ui

This project includes Biome configuration and shadcn/ui-compatible configuration for Tailwind CSS 4.
The starter UI components are in `components/ui` (button, badge, card, input, label, separator,
skeleton, and textarea). To install dependencies and run checks:

```powershell
npm install
npm run lint
npm run typecheck
npm run dev
```

To format and automatically fix supported lint issues:

```powershell
npm run lint:fix
npm run format
```

The `components.json` file is configured for shadcn/ui with the existing `app/globals.css` and
`@/components/ui` alias. You can add more official shadcn components later, for example:

```powershell
npx shadcn@latest add dialog dropdown-menu sheet tabs avatar table
```

Review any CLI prompts before allowing it to overwrite existing files. The generated archive has
not been installed or built in your local environment; run `npm install` first and share any errors
if you need help troubleshooting.
