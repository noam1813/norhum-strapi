FROM node:22-alpine AS builder

RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine

RUN apk add --no-cache vips-dev

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 1337

CMD ["npm", "run", "start"]
