# ---- build ----
FROM node:20-slim AS build
WORKDIR /app
RUN apt-get update && apt-get install -y python3 build-essential pkg-config && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npx prisma generate

# ---- runtime ----
FROM node:20-slim
WORKDIR /app
RUN apt-get update && apt-get install -y curl ca-certificates iproute2 procps netcat-openbsd proxychains4 \
  && rm -rf /var/lib/apt/lists/*
RUN curl -fsSL https://tailscale.com/install.sh | sh

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/prisma ./prisma

# proxychains: usar o SOCKS5 local do tailscaled
RUN printf 'strict_chain\nquiet_mode\n[ProxyList]\nsocks5  127.0.0.1 1055\n' > /etc/proxychains.conf

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000
CMD ["/entrypoint.sh"]
