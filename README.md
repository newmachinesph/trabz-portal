<p align="center"><img src="public/logo-full.svg" alt="Trabz" height="64"></p>

# Trabz Portal

![License: MIT](https://img.shields.io/badge/license-MIT-green) ![Next.js](https://img.shields.io/badge/Next.js-16-black) ![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

Employer and admin web portal for Trabz, a Philippine job and workforce marketplace. Employers post jobs, review applicants, and manage their team, shifts, payroll, and documents. Admins manage users, companies, and jobs.

The portal is a frontend that talks to a separate REST backend (`NEXT_PUBLIC_API_URL`, default `http://localhost:8000/api/v1`). A development-only mock API is included for working without a backend.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # vitest
npm run lint
npm run build && npm start
```

Configuration (environment variables):

- `NEXT_PUBLIC_API_URL` - backend API base URL
- `ENABLE_MOCK_API=true` - enable the mock API routes (only active when `NODE_ENV=development`)
- UploadThing credentials (`UPLOADTHING_TOKEN`) for file uploads

## Structure

```
src/app/(auth)     login and registration
src/app/dashboard  employer pages (jobs, applicants, team, shifts, payroll, messages, ...)
src/app/admin      admin pages (users, companies, jobs, impersonation)
src/app/api        mock API and UploadThing routes
src/components     sidebar and UI primitives
src/lib            API client, auth context, mock data
```

## License

MIT - see [LICENSE](LICENSE).
