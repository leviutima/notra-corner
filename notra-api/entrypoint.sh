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
sleep 2

echo ">> Autenticando no Tailscale..."
: "${TS_AUTHKEY:?Defina TS_AUTHKEY no ambiente (chave preauthorized/ephemeral)}"
until tailscale up \
  --authkey="${TS_AUTHKEY}" \
  --hostname="${RENDER_SERVICE_NAME:-render-app}-$(hostname)" \
  --accept-dns=false \
  --timeout=60s; do
  echo "Aguardando Tailscale..."
  sleep 2
done

echo ">> Tailscale IPv4: $(tailscale ip -4 || true)"

# Limpa variáveis de proxy
unset HTTP_PROXY HTTPS_PROXY http_proxy https_proxy ALL_PROXY all_proxy NO_PROXY no_proxy

echo ">> Abrindo túnel local ${LOCAL_FWD_PORT} -> ${TS_PG_HOST}:${TS_PG_PORT} via SOCKS5 (127.0.0.1:1055)..."
socat TCP-LISTEN:${LOCAL_FWD_PORT},reuseaddr,fork \
      SOCKS5:127.0.0.1:${TS_PG_HOST}:${TS_PG_PORT},socksport=1055 &
SOCAT_PID=$!

# Aguarda mais tempo para o socat estabilizar
sleep 2

# Espera a porta local subir
echo ">> Verificando listener do túnel..."
for i in {1..30}; do
  if nc -z 127.0.0.1 "${LOCAL_FWD_PORT}"; then
    echo ">> Túnel OK em 127.0.0.1:${LOCAL_FWD_PORT}"
    break
  fi
  echo "Aguardando listener do túnel... ($i/30)"
  sleep 1
done

# CRÍTICO: Testa conexão real ao Postgres antes de iniciar a app
echo ">> Testando conexão real com o Postgres..."
if command -v pg_isready >/dev/null 2>&1; then
  for i in {1..30}; do
    if pg_isready -h 127.0.0.1 -p "${LOCAL_FWD_PORT}" -d postgres -t 10 2>&1; then
      echo ">> ✅ Postgres respondeu com sucesso!"
      # Aguarda mais um pouco para garantir estabilidade
      sleep 3
      break
    fi
    echo "Aguardando Postgres responder... ($i/30)"
    sleep 2
  done
  
  # Testa uma query real
  echo ">> Testando query real no Postgres..."
  if PGPASSWORD="${DB_PASSWORD:-}" psql -h 127.0.0.1 -p "${LOCAL_FWD_PORT}" \
       -U "${DB_USER:-postgres}" -d "${DB_NAME:-postgres}" \
       -c "SELECT 1;" >/dev/null 2>&1; then
    echo ">> ✅ Query de teste executada com sucesso!"
  else
    echo ">> ⚠️ Query de teste falhou, mas continuando..."
  fi
else
  echo ">> ⚠️ pg_isready não disponível, pulando verificação"
  # Se não tem pg_isready, aguarda mais tempo
  sleep 5
fi

echo ">> Iniciando API (porta ${PORT})..."
exec node dist/main.js

# Não precisa mais de term_handler se usar exec