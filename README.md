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
e2e/          Playwright tests against the running app
```

Managed as a pnpm workspace.

## Roadmap

### Phase 1 — API & unit tests
- [x] Monorepo scaffolding (pnpm workspaces)
- [x] Backend: Express API + in-memory task store (CRUD)
- [x] Backend: unit tests for the store, with coverage reporting

### Phase 1.5 — CI foundation
- [x] GitHub Actions running backend unit tests on push to main

### Phase 2 — React UI & component tests
- [x] Frontend: task list UI (add/list/delete)
- [x] Frontend wired to backend API
- [x] Component tests with React Testing Library (Vitest)
- [x] CI updated to run component tests alongside API tests

### Phase 3 — Integration & e2e tests
- [x] Integration tests against the API — including sad-path cases (bad
      payloads, missing fields → correct 400/500 responses), not just happy path
      (e.g. PATCH /tasks/:id with only `completed` must not wipe `title`)
- [x] End-to-end tests (Playwright), full flow from UI to API
- [x] CI updated to run the Playwright suite

### Phase 4 — Iterative enhancements
- [x] Teardown strategy for reliable, isolated test data
- [x] Mix of real-API tests and mocked-network tests (network interception),
      to show when each strategy is appropriate
- [x] Parallel test execution across CI workers
- [x] Upload Playwright HTML report / traces / screenshots as CI artifacts
      on failure, for debugging straight from a failed run
- [ ] Swap in-memory store for SQLite, as an isolated, visible change with
      tests staying green throughout
- [ ] README polish: architecture diagram, screenshots of a passing
      pipeline and the Playwright HTML report
- [ ] Extra app features e.g. a basic authentication layer, to show testing of auth flows (login, logout, session
      expiration, etc.)

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
