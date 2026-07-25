# Task Tracker — Test Automation Portfolio

A small full-stack task tracker built to demonstrate test automation skills
across the stack: unit tests, API/integration tests, end-to-end tests, and a
CI pipeline that runs all of it automatically.

The app itself (a task list) is intentionally simple — the point of this repo
is the testing and automation around it, not the app's feature set.

## Stack

- **Frontend** — React + Vite + TypeScript + Tailwind CSS
- **Backend** — Express + TypeScript (in-memory store now, SQLite planned)
- **Testing** — Vitest (unit/integration), Playwright (e2e)
- **CI** — GitHub Actions

## Monorepo layout

```
apps/
  frontend/   React app (Vite, Tailwind)
  backend/    Express API + task store
tests/
  integration/  API tests against the running backend
  e2e/          Playwright tests against the running app
```

Managed as a pnpm workspace.

## Status

- [x] Monorepo scaffolding (pnpm workspaces)
- [x] Backend: Express API + in-memory task store (CRUD)
- [x] Backend: unit tests for the store, with coverage reporting
- [ ] Backend: SQLite persistence
- [ ] Frontend: task list UI (add/list/delete)
- [ ] Frontend wired to backend API
- [ ] Integration tests against the API — including sad-path cases (bad
      payloads, missing fields → correct 400/500 responses), not just happy path
- [ ] End-to-end tests (Playwright)
  - [ ] Seed/teardown strategy for reliable, isolated test data once SQLite lands
  - [ ] Mix of real-API tests and mocked-network tests (network interception),
        to show when each strategy is appropriate
- [ ] CI: GitHub Actions running the full test suite on push
  - [ ] Parallel test execution across workers
  - [ ] Upload Playwright HTML report / traces / screenshots as artifacts on
        failure, for debugging straight from a failed run
- [ ] README polish once the above exists: architecture diagram, Playwright HTML report

## Running locally

```bash
pnpm install

# backend
pnpm --filter @workspace/backend dev      # http://localhost:3000

# frontend
pnpm --filter @workspace/frontend dev     # http://localhost:5173
```

## Testing

```bash
# backend unit tests
pnpm --filter @workspace/backend test

# backend unit tests with coverage
pnpm --filter @workspace/backend test:coverage
```

Integration and e2e test commands will be added here as those layers land.

## Why this exists

Built as a portfolio piece to show practical test automation ability: writing
meaningful unit tests, testing a real API
end-to-end, driving a UI with Playwright, and tying it all together in CI.
