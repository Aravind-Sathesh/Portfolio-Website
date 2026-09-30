Pinnacle is the backend for a placement platform built to serve several universities from one deployment. Each request is tied to an organisation resolved from its hostname, and every query is scoped to that tenant, so one college can never see another's students, jobs or applications.

### Key Features
*   **Multi-Tenancy by Design:** The tenant is resolved once per request and carried through the call stack with `AsyncLocalStorage`, so data isolation does not depend on every developer remembering a `WHERE` clause.
*   **Layered Access Control:** Requests pass through a guard chain of rate limiting, JWT authentication, role checks and row-level ownership checks. Google OAuth handles sign-in, and the API issues its own tokens.
*   **Full Placement Workflow:** 144 endpoints (216 operations) cover student profiles and resumes, document verification, companies, placement cycles, jobs with eligibility rules, applications, attendance, announcements and dashboards.
*   **Contract-First API:** `openapi.json` is the source of truth, and CI fails on breaking changes to it, so frontend clients never break silently.
*   **Production Infrastructure:** PostgreSQL 16 via Prisma 7 (32 models), Redis 7, BullMQ background jobs, MinIO object storage with presigned uploads, structured logging with Pino, all run with Docker Compose.
*   **Tested:** Unit tests with a 90% coverage requirement, plus end-to-end tests against real services.
