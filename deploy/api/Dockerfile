FROM node:24-alpine AS build

WORKDIR /app
RUN corepack enable pnpm
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/api/package.json apps/api/
RUN pnpm --filter @cfla/api install --frozen-lockfile
COPY apps/api/ apps/api/
RUN pnpm --filter @cfla/api build
RUN pnpm --filter @cfla/api --prod deploy --legacy /runtime

FROM node:24-alpine

WORKDIR /app
ENV NODE_ENV=production
COPY --from=build --chown=node:node /runtime/ ./
USER node
EXPOSE 8787 8788
CMD ["node", "dist/public-server.js"]
