#!/usr/bin/env bash
set -euo pipefail

# ========= Config =========
TS_PG_HOST="${TS_PG_HOST:-100.94.203.110}"   # IP Tailscale do seu Postgres
TS_PG_PORT="${TS_PG_PORT:-5432}"
LOCAL_FWD_PORT="${LOCAL_FWD_PORT:-15432}"    # porta local do túnel
PORT="${PORT:-8000}"                         # porta da API Nest

echo ">> Iniciando tailscaled (userspace, SOCKS5 em 127.0.0.1:1055)..."
/usr/sbin/tailscaled --tun=userspace-networking --socks5-server=localhost:1055 --state=/tmp/tailscale.state &

echo ">> Autenticando no Tailscale..."
until tailscale up --authkey="${TS_AUTHKEY}" --ssh --hostname="${RENDER_SERVICE_NAME:-render-app}"; do
  echo "Aguardando Tailscale..."
  sleep 2
done

echo ">> Tailscale IPv4: $(tailscale ip -4 || echo 'desconhecido')"

# Evita que libs HTTP tentem usar a porta SOCKS5 como HTTP
unset HTTP_PROXY HTTPS_PROXY http_proxy https_proxy

# (Opcional) Se precisar para outras libs (não Prisma):
# export ALL_PROXY="socks5://127.0.0.1:1055"
# export NO_PROXY="127.0.0.1,localhost,::1"

# Túnel local via connect-proxy (SOCKS5) controlado pelo socat
# - connect usa: -S <SOCKS_HOST:PORT>, -5 força SOCKS5, -d verboso (remova se quiser), -a none (sem auth)
# - 'EXEC:' faz o socat delegar a conexão ao binário connect-proxy.
echo ">> Abrindo túnel local ${LOCAL_FWD_PORT} -> ${TS_PG_HOST}:${TS_PG_PORT} via SOCKS5 1055..."
socat TCP-LISTEN:${LOCAL_FWD_PORT},fork,reuseaddr \
  EXEC:"connect -5 -a none -S 127.0.0.1:1055 ${TS_PG_HOST} ${TS_PG_PORT}",nofork &

# Aguarda o listener local responder
for i in {1..30}; do
  if nc -z 127.0.0.1 "${LOCAL_FWD_PORT}"; then
    echo ">> Túnel para Postgres OK (127.0.0.1:${LOCAL_FWD_PORT})"
    break
  fi
  echo "Aguardando DB via túnel..."
  sleep 1
done

# Inicia API (garanta que seu Prisma não derrube o servidor no onModuleInit)
echo ">> Iniciando API na porta ${PORT}..."
node dist/main.js
