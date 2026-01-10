# syntax=docker/dockerfile:1

FROM node:22-slim AS base
ENV NODE_ENV=production
WORKDIR /app

FROM base AS deps
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
# Verwende npm install für mehr Flexibilität
RUN npm install --omit=dev

FROM deps AS builder
ENV NEXT_TELEMETRY_DISABLED=1
COPY . .
RUN npm run build

FROM base AS runner
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
USER node

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
