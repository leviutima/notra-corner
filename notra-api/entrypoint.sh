#!/usr/bin/env bash
set -euo pipefail

TS_PG_HOST="${TS_PG_HOST:-100.94.203.110}"   # IP Tailscale do Postgres
TS_PG_PORT="${TS_PG_PORT:-5432}"
LOCAL_FWD_PORT="${LOCAL_FWD_PORT:-15432}"    # porta local do túnel
PORT="${PORT:-8000}"                         # porta HTTP do Nest

echo ">> Iniciando tailscaled (userspace, SOCKS5 em 127.0.0.1:1055)..."
/usr/sbin/tailscaled --tun=userspace-networking --socks5-server=localhost:1055 --state=/tmp/tailscale.state &

echo ">> Autenticando no Tailscale..."
until tailscale up --authkey="${TS_AUTHKEY}" --ssh --hostname="${RENDER_SERVICE_NAME:-render-app}"; do
  echo "Aguardando Tailscale..."
  sleep 2
done

TS_IP="$(tailscale ip -4 || true)"
echo ">> Tailscale IPv4: ${TS_IP:-desconhecido}"

# Evita que libs HTTP usem SOCKS5 como HTTP (causa 'incompatible SOCKS version')
unset HTTP_PROXY HTTPS_PROXY http_proxy https_proxy

# Abre túnel local 127.0.0.1:${LOCAL_FWD_PORT} -> (SOCKS5 127.0.0.1:1055) -> ${TS_PG_HOST}:${TS_PG_PORT}
# IMPORTANTE: use 'sh -c' para que o socat trate a linha toda como um único comando.
echo ">> Abrindo túnel local ${LOCAL_FWD_PORT} -> ${TS_PG_HOST}:${TS_PG_PORT} via SOCKS5 1055..."
socat TCP-LISTEN:${LOCAL_FWD_PORT},fork,reuseaddr \
  EXEC:'sh -c "exec connect -5 -a none -S 127.0.0.1:1055 '"${TS_PG_HOST}"' '"${TS_PG_PORT}"'"',nofork &

# Aguarda o listener local responder
for i in {1..30}; do
  if nc -z 127.0.0.1 "${LOCAL_FWD_PORT}"; then
    echo ">> Túnel para Postgres OK (127.0.0.1:${LOCAL_FWD_PORT})"
    break
  fi
  echo "Aguardando DB via túnel..."
  sleep 1
done

# Inicia API (garanta que Prisma não derrube o processo no onModuleInit em caso de erro transitório)
echo ">> Iniciando API na porta ${PORT}..."
node dist/main.js
