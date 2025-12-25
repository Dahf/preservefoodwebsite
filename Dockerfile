# syntax=docker/dockerfile:1

FROM node:22-slim AS base
ENV NODE_ENV=production
WORKDIR /app

FROM base AS deps
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci

FROM deps AS builder
ENV NEXT_TELEMETRY_DISABLED=1
COPY . .
RUN npm run build

FROM base AS runner
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

# Kopiere statische Assets direkt aus dem Build-Kontext, damit Portainer-/Build-Caches keine fehlenden Artefakte liefern
COPY public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER node

EXPOSE 3000
CMD ["node", "server.js"]

