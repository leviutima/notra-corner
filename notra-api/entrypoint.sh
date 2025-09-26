#!/usr/bin/env bash
set -euo pipefail

# ========= Config =========
# IP/porta do Postgres na Tailnet (100.x do seu servidor) e porta local do túnel
TS_PG_HOST="${TS_PG_HOST:-100.94.203.110}"
TS_PG_PORT="${TS_PG_PORT:-5432}"
LOCAL_FWD_PORT="${LOCAL_FWD_PORT:-15432}"

# Porta HTTP da sua API Nest (Render detecta essa porta aberta)
PORT="${PORT:-8000}"

echo ">> Iniciando tailscaled (userspace, SOCKS5 em 127.0.0.1:1055)..."
/usr/sbin/tailscaled --tun=userspace-networking --socks5-server=localhost:1055 --state=/tmp/tailscale.state &

# Autenticação no Tailscale
# Requer TS_AUTHKEY em ambiente (use key ephemeral/preauthorized)
echo ">> Autenticando no Tailscale..."
until tailscale up --authkey="${TS_AUTHKEY}" --ssh --hostname="${RENDER_SERVICE_NAME:-render-app}"; do
  echo "Aguardando Tailscale..."
  sleep 2
done

echo ">> Tailscale IPv4: $(tailscale ip -4 || echo 'desconhecido')"

# Evitar que libs HTTP tentem usar o SOCKS5 (isso causou 'incompatible SOCKS version' nos seus logs)
unset HTTP_PROXY HTTPS_PROXY http_proxy https_proxy

# (Se realmente precisar para outras libs, descomente a linha abaixo; Prisma ignora ALL_PROXY)
# export ALL_PROXY="socks5://127.0.0.1:1055"
# export NO_PROXY="127.0.0.1,localhost,::1"

# Cria um forward local 127.0.0.1:${LOCAL_FWD_PORT} -> (SOCKS5) -> ${TS_PG_HOST}:${TS_PG_PORT}
echo ">> Abrindo túnel local ${LOCAL_FWD_PORT} -> ${TS_PG_HOST}:${TS_PG_PORT} via SOCKS5 1055..."
socat TCP-LISTEN:${LOCAL_FWD_PORT},fork,reuseaddr SOCKS5:127.0.0.1:${TS_PG_HOST}:${TS_PG_PORT},socksport=1055 &

# Aguarda o listener local responder
for i in {1..30}; do
  if nc -z 127.0.0.1 "${LOCAL_FWD_PORT}"; then
    echo ">> Túnel para Postgres OK (127.0.0.1:${LOCAL_FWD_PORT})"
    break
  fi
  echo "Aguardando DB via túnel..."
  sleep 1
done

# Dica: aponte seu DATABASE_URL para 127.0.0.1:${LOCAL_FWD_PORT}
# Exemplo:
#   DATABASE_URL="postgresql://USER:PASSWORD@127.0.0.1:15432/DBNAME?sslmode=disable"
# Se seu Postgres requer TLS, use sslmode=require.

# Subir a API
echo ">> Iniciando API na porta ${PORT}..."
node dist/main.js
