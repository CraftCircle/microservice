# Stage 1 - Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

# Run Prisma generate
RUN npx prisma generate 

RUN yarn build:auth

# Stage 2 - Run
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

CMD ["node", "dist/apps/auth/main.js"]
