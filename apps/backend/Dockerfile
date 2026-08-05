# syntax=docker/dockerfile:1

# better-sqlite3 ships prebuilt native binaries rather than compiling on
# install. The linux-arm64 prebuild needs glibc >= 2.38, which bookworm
# (2.36) doesn't have but trixie does - use it to avoid needing to compile
# from source at all.
FROM node:24-trixie-slim AS base
RUN corepack enable
WORKDIR /app

# Manifests only first, so `pnpm install` is cached until a dependency changes.
# All workspace package.json files are needed for pnpm to trust the lockfile,
# even though this image only ships the backend.
FROM base AS manifests
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/backend/package.json apps/backend/package.json
COPY apps/frontend/package.json apps/frontend/package.json
COPY packages/shared/package.json packages/shared/package.json

# better-sqlite3 has a binding.gyp and no install script, so pnpm implicitly
# runs `node-gyp rebuild` on install (this repo's pnpm-workspace.yaml already
# allowlists that build script). This toolchain is needed for that step to
# succeed, even though its output goes unused - binding.js prefers the
# prebuilt binary in prebuilds/ when one is present, which is why the base
# image's glibc version (see above) is what actually matters at runtime.
FROM manifests AS native-build-tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

FROM native-build-tools AS build
RUN pnpm install --frozen-lockfile
COPY apps/backend apps/backend
COPY packages/shared packages/shared
RUN pnpm --filter @workspace/backend build

# A separate prod-only install, rather than pruning the dev install above
FROM native-build-tools AS prod-deps
RUN pnpm install --frozen-lockfile --prod --filter @workspace/backend...

FROM node:24-trixie-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=prod-deps /app/apps/backend/node_modules ./apps/backend/node_modules
COPY --from=prod-deps /app/packages/shared ./packages/shared
COPY --from=build /app/apps/backend/dist ./apps/backend/dist
COPY --from=build /app/apps/backend/package.json ./apps/backend/package.json

WORKDIR /app/apps/backend
EXPOSE 3000
CMD ["node", "dist/server.js"]
