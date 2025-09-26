# ---- build stage ----
FROM node:20-slim AS build
WORKDIR /app

# dependências nativas p/ build
RUN apt-get update && apt-get install -y python3 build-essential pkg-config && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
# gera prisma client (se usa Prisma)
RUN npx prisma generate

# ---- runtime stage ----
FROM debian:stable-slim
WORKDIR /app

# deps p/ tailscale e diagnósticos
RUN apt-get update && apt-get install -y curl ca-certificates iproute2 procps netcat-openbsd \
  && rm -rf /var/lib/apt/lists/*

# instala tailscale
RUN curl -fsSL https://tailscale.com/install.sh | sh

# copia artefatos do build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/prisma ./prisma

# script de entrada
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000
CMD ["/entrypoint.sh"]
