# syntax=docker.io/docker/dockerfile:1

FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

ARG NEXT_PUBLIC_S3_END_POINT
ARG NEXT_PUBLIC_S3_PORT

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_S3_END_POINT
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_S3_PORT

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY . .

ARG NEXT_PUBLIC_S3_END_POINT
ARG NEXT_PUBLIC_S3_PORT

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_S3_END_POINT
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_S3_PORT

# Build the Next.js app
RUN npm run build && ls -al .next

# Production image, copy all the files and run Next.js
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the production build and dependencies
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

USER nextjs

ENV PORT=3000
EXPOSE $PORT

CMD ["npm", "start"]

