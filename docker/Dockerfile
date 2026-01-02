FROM node:22-alpine AS builder

RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.5.2 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

FROM node:22-alpine

RUN apk add --no-cache vips-dev

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.5.2 --activate

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 1337

CMD ["pnpm", "run", "start"]
