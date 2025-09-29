# ---- build ----
FROM node:20-slim AS build
WORKDIR /app

# deps de build
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

# tailscale + psql (para wait-for-db) + dumb-init
RUN apt-get update && apt-get install -y \
    curl ca-certificates postgresql-client dumb-init \
 && rm -rf /var/lib/apt/lists/* \
 && curl -fsSL https://tailscale.com/install.sh | sh

# app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/prisma ./prisma

ENV PORT=8000
EXPOSE 8000

# VARS esperadas na Render:
# - TS_AUTHKEY              (obrigatória)
# - DATABASE_URL            (usada pelo Prisma)  ex.: postgresql://USER:SENHA@100.x.y.z:5432/DB
# - DB_HOST, DB_PORT, PGUSER, PGPASSWORD, PGDATABASE  (para o wait-for-db)
#   ex.: DB_HOST=100.x.y.z  DB_PORT=5432  PGUSER=USER  PGPASSWORD=SENHA  PGDATABASE=DB

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["/bin/bash","-lc","\
  set -euo pipefail; \
  /usr/sbin/tailscaled --tun=userspace-networking --state=/tmp/ts.state & \
  echo '>> Fazendo tailscale up...'; \
  tailscale up --authkey=\"${TS_AUTHKEY}\" --accept-dns=false --timeout=60s || { echo '!! tailscale up falhou'; exit 1; }; \
  echo '>> Tailscale IPv4:' $(tailscale ip -4 || echo 'desconhecido'); \
  echo '>> DATABASE_URL='\"${DATABASE_URL}\"; \
  echo '>> DB_HOST='\"${DB_HOST}\"' DB_PORT='\"${DB_PORT:-5432}\"' PGUSER='\"${PGUSER}\"' PGDATABASE='\"${PGDATABASE}\"; \
  echo '>> Esperando DB responder...'; \
  for i in {1..30}; do \
    if PGPASSWORD=\"${PGPASSWORD:-}\" psql \
       -h \"${DB_HOST:-100.94.203.110}\" -p \"${DB_PORT:-5432}\" \
       -U \"${PGUSER:-postgres}\" -d \"${PGDATABASE:-postgres}\" \
       -c 'select 1' >/dev/null 2>&1; then echo '>> DB OK'; break; fi; \
    echo \"Aguardando DB ($i/30)\"; sleep 2; \
  done; \
  node dist/main.js \
"]
