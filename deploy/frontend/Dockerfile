FROM node:18-slim as build

ARG NEXT_PUBLIC_BACKEND_URL

ENV NODE_ENV=production
ENV NEXT_PUBLIC_BACKEND_URL $NEXT_PUBLIC_BACKEND_URL
ENV IMAGE_DOMAIN $IMAGE_DOMAIN

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN mkdir ./frontend
COPY ./frontend/package.json ./frontend
RUN npm ci -w frontend

COPY ./frontend ./frontend
RUN npm run -w frontend build


FROM node:18-slim as production

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN mkdir ./frontend
COPY ./frontend/package.json ./frontend
RUN npm ci -w frontend --omit=dev

COPY --from=build /usr/src/app/frontend/.next /usr/src/app/frontend/.next
COPY ./frontend/public /usr/src/app/frontend/public

WORKDIR ./frontend

EXPOSE 8080

ENTRYPOINT ["npm", "run", "start"]
