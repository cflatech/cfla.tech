FROM node:24-alpine AS build

WORKDIR /app
RUN corepack enable pnpm
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/front/package.json apps/front/
COPY apps/app/package.json apps/app/
RUN pnpm --filter @cfla/app install --frozen-lockfile
COPY apps/app/ apps/app/
RUN pnpm --filter @cfla/app build

FROM node:24-alpine

WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=80
COPY --from=build /app/apps/app/.output/ ./
USER node
EXPOSE 80
CMD ["node", "server/index.mjs"]
