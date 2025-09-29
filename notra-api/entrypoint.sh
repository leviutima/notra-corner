#!/usr/bin/env bash
# Sobe Tailscale (userspace), faz forward via SOCKS5 e inicia a app.
set -euo pipefail

TS_PG_HOST="${TS_PG_HOST:-100.94.203.110}"
TS_PG_PORT="${TS_PG_PORT:-5432}"
LOCAL_FWD_PORT="${LOCAL_FWD_PORT:-15432}"
PORT="${PORT:-8000}"

echo ">> Iniciando tailscaled (userspace; SOCKS5 em 127.0.0.1:1055)..."
/usr/sbin/tailscaled \
  --tun=userspace-networking \
  --socks5-server=localhost:1055 \
  --state=/tmp/tailscale.state &

# espere o daemon abrir socket
sleep 1

echo ">> Autenticando no Tailscale..."
: "${TS_AUTHKEY:?Defina TS_AUTHKEY no ambiente (chave preauthorized/ephemeral)}"
# --accept-dns=false evita o warning de DNS base config
until tailscale up \
  --authkey="${TS_AUTHKEY}" \
  --hostname="${RENDER_SERVICE_NAME:-render-app}-$(hostname)" \
  --accept-dns=false \
  --timeout=60s; do
  echo "Aguardando Tailscale..."
  sleep 2
done

echo ">> Tailscale IPv4: $(tailscale ip -4 || true)"

# Limpa variáveis de proxy para não confundir o driver
unset HTTP_PROXY HTTPS_PROXY http_proxy https_proxy ALL_PROXY all_proxy NO_PROXY no_proxy

echo ">> Abrindo túnel local ${LOCAL_FWD_PORT} -> ${TS_PG_HOST}:${TS_PG_PORT} via SOCKS5 (127.0.0.1:1055)..."
# Forma correta com SOCKS5 no socat (NÃO use PROXY:)
socat TCP-LISTEN:${LOCAL_FWD_PORT},reuseaddr,fork \
      SOCKS5:127.0.0.1:${TS_PG_HOST}:${TS_PG_PORT},socksport=1055 &
SOCAT_PID=$!

# Espera a porta local subir
for i in {1..30}; do
  if nc -z 127.0.0.1 "${LOCAL_FWD_PORT}"; then
    echo ">> Túnel OK em 127.0.0.1:${LOCAL_FWD_PORT}"
    break
  fi
  echo "Aguardando listener do túnel... ($i/30)"
  sleep 1
done

# (Opcional) Check do Postgres via túnel, sem derrubar o container se falhar
if command -v pg_isready >/dev/null 2>&1; then
  for i in {1..20}; do
    if pg_isready -h 127.0.0.1 -p "${LOCAL_FWD_PORT}" -d postgres >/dev/null 2>&1; then
      echo ">> Postgres respondeu ao pg_isready."
      break
    fi
    echo "Aguardando Postgres responder pg_isready... ($i/20)"
    sleep 2
  done
fi

echo ">> Iniciando API (porta ${PORT})..."
node dist/main.js &
APP_PID=$!

term_handler() {
  echo ">> Encerrando..."
  kill -TERM "${APP_PID}" 2>/dev/null || true
  kill -TERM "${SOCAT_PID}" 2>/dev/null || true
  # tailscaled sai junto quando o shell termina
}
trap term_handler TERM INT

wait "${APP_PID}"
