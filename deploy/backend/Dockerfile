FROM node:18-slim as build

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN mkdir ./backend
COPY ./backend/package.json ./backend
RUN npm ci -w backend
RUN ls ./node_modules/.bin

COPY ./backend ./backend
RUN npm run -w backend build


FROM node:18-slim as production

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN mkdir ./backend
COPY ./backend/package.json ./backend
RUN npm ci -w backend --omit=dev

COPY --from=build /usr/src/app/backend/dist /usr/src/app/backend/dist

WORKDIR ./backend

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start:prod"]
