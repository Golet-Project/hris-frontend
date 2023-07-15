FROM node:18.16.1-bullseye AS build

WORKDIR /app

COPY pnpm-lock.yaml package.json .

RUN npm i -g pnpm
RUN pnpm install

COPY . .

RUN pnpm run build
RUN pnpm prune --prod

FROM node:18.16.1-bullseye AS runtime

RUN npm i -g pnpm

WORKDIR /app

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/next.config.js ./next.config.js
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

CMD ["pnpm", "run", "start"]
