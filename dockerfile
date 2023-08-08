FROM node:16 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app


FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm --filter -r mizar-server run prod
WORKDIR /app/packages/server
EXPOSE 3000
CMD [ "node", "dist/src/main.js" ]



