# ---- build ----
FROM node:20-slim AS build
WORKDIR /app

RUN apt-get update && apt-get install -y python3 build-essential pkg-config \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build
RUN npx prisma generate

# ---- runtime ----
FROM node:20-slim
WORKDIR /app

# tailscale + psql + dumb-init
RUN apt-get update && apt-get install -y \
    curl ca-certificates postgresql-client dumb-init \
 && rm -rf /var/lib/apt/lists/* \
 && curl -fsSL https://tailscale.com/install.sh | sh

# app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/prisma ./prisma

# entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV PORT=8000
EXPOSE 8000

# VARS na Render (obrigatório):
# - TS_AUTHKEY      -> auth key válida do Tailscale (ephemeral e/ou preauthorized)
# - DATABASE_URL    -> ex.: postgresql://USER:SENHA@100.94.203.110:5432/DB?sslmode=prefer

ENTRYPOINT ["/usr/bin/dumb-init","--"]
CMD ["/entrypoint.sh"]
