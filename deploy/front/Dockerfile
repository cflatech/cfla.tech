FROM node:24-alpine AS build

WORKDIR /app
RUN corepack enable pnpm
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/front/package.json apps/front/
COPY apps/app/package.json apps/app/
RUN pnpm --filter @cfla/front install --frozen-lockfile
COPY apps/front/ apps/front/
RUN pnpm --filter @cfla/front build

FROM nginx:1.27-alpine

COPY --from=build /app/apps/front/dist/ /usr/share/nginx/html/
COPY ./deploy/front/nginx.conf /etc/nginx/conf.d/default.conf
