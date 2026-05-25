FROM node:22-bookworm-slim AS build
WORKDIR /usr/src/rx

RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm i

COPY . .
RUN npm run build
RUN npm prune --omit=dev

FROM node:22-bookworm-slim AS runtime
WORKDIR /usr/src/rx

COPY --from=build /usr/src/rx/build ./build
COPY --from=build /usr/src/rx/node_modules ./node_modules
COPY --from=build /usr/src/rx/package.json ./package.json
COPY --from=build /usr/src/rx/src/lib/server/db/sqlite.db.init ./sqlite.db

EXPOSE 3000
CMD ["node", "build"]
