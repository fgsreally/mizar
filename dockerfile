FROM node:16 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app


FROM base AS build
RUN  pnpm install --frozen-lockfile
RUN pnpm --filter -r mizar-server run prod


FROM base AS common
COPY --from=build /app/packages/server/dist /app/packages/server/dist
WORKDIR /app/packages/server
EXPOSE 3000
CMD [ "node", "dist/main.js" ]