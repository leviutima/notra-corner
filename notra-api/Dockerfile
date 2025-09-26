# ---- build ----
FROM node:20-slim AS build
WORKDIR /app

# deps necessários para build de libs nativas (se houver)
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

# utilitários de runtime + tailscale + socat
RUN apt-get update && apt-get install -y \
    curl ca-certificates iproute2 procps netcat-openbsd socat tzdata \
  && rm -rf /var/lib/apt/lists/* \
  && curl -fsSL https://tailscale.com/install.sh | sh

# (opcional) init simples para reaper de processos
RUN apt-get update && apt-get install -y dumb-init && rm -rf /var/lib/apt/lists/*

# app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/prisma ./prisma

# scripts
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8000

# Use dumb-init para sinalização adequada
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["/entrypoint.sh"]
