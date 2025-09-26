#!/usr/bin/env bash
# robustez e logging de erros
set -Eeuo pipefail
trap 'code=$?; echo "!! ERRO na linha ${BASH_LINENO[0]}: comando \"${BASH_COMMAND}\" saiu com status $code"; exit $code' ERR

# ========= Config =========
# IP Tailscale do servidor Postgres (ex.: 100.94.203.110)
TS_PG_HOST="${TS_PG_HOST:-100.94.203.110}"
TS_PG_PORT="${TS_PG_PORT:-5432}"          # porta do Postgres remoto
LOCAL_FWD_PORT="${LOCAL_FWD_PORT:-15432}" # porta local do túnel
PORT="${PORT:-8000}"                      # porta HTTP da API (Render detecta essa)

# sanity: evite caracteres ocultos/typos — NÃO edite estas linhas para 'porta', 'Porta', etc.
: "TS_PG_HOST=$TS_PG_HOST" "TS_PG_PORT=$TS_PG_PORT" "LOCAL_FWD_PORT=$LOCAL_FWD_PORT" "PORT=$PORT"

# ========= Tailscale =========
echo ">> Iniciando tailscaled (userspace, SOCKS5 em 127.0.0.1:1055)..."
/usr/sbin/tailscaled --tun=userspace-networking --socks5-server=localhost:1055 --state=/tmp/tailscale.state &

echo ">> Autenticando no Tailscale..."
: "${TS_AUTHKEY:?Defina TS_AUTHKEY no ambiente (use key ephemeral/preauthorized no Tailscale)}"
until tailscale up --authkey="${TS_AUTHKEY}" --ssh --hostname="${RENDER_SERVICE_NAME:-render-app}"; do
  echo "Aguardando Tailscale..."
  sleep 2
done

TS_IP="$(tailscale ip -4 || true)"
echo ">> Tailscale IPv4: ${TS_IP:-desconhecido}"

# ========= Proxies (garantir que nada tente usar 1055 como HTTP) =========
unset HTTP_PROXY HTTPS_PROXY http_proxy https_proxy ALL_PROXY all_proxy NO_PROXY no_proxy

# ========= Túnel local 127.0.0.1:${LOCAL_FWD_PORT} -> (SOCKS5 127.0.0.1:1055) -> ${TS_PG_HOST}:${TS_PG_PORT} =========
echo ">> Abrindo túnel local ${LOCAL_FWD_PORT} -> ${TS_PG_HOST}:${TS_PG_PORT} via SOCKS5 1055..."
# - 'fork' no listener para múltiplas conexões
# - EXEC encapsulado em 'sh -lc' para passar todos os argumentos corretamente
# - '-v' para logar I/O (remova se quiser menos verbosidade)
socat -v TCP-LISTEN:${LOCAL_FWD_PORT},fork,reuseaddr \
  EXEC:'sh -lc '\''exec connect -5 -a none -S 127.0.0.1:1055 "$TS_PG_HOST" "$TS_PG_PORT"'\''' &

# Aguarda o listener local responder
for i in {1..30}; do
  if nc -z 127.0.0.1 "${LOCAL_FWD_PORT}"; then
    echo ">> Túnel para Postgres OK (127.0.0.1:${LOCAL_FWD_PORT})"
    break
  fi
  echo "Aguardando DB via túnel..."
  sleep 1
done

# (Opcional) Teste de disponibilidade do Postgres via túnel (requer postgresql-client)
if command -v pg_isready >/dev/null 2>&1; then
  DB_NAME_CHECK="${DB_NAME_CHECK:-postgres}"  # troque para 'notra_db' se preferir
  echo ">> Testando DB via pg_isready (db=${DB_NAME_CHECK})..."
  for i in {1..20}; do
    if pg_isready -h 127.0.0.1 -p "${LOCAL_FWD_PORT}" -d "${DB_NAME_CHECK}" >/dev/null 2>&1; then
      echo ">> pg_isready OK"
      break
    fi
    echo "Aguardando Postgres responder pg_isready..."
    sleep 1
  done
fi

# ========= Start da API =========
echo ">> Iniciando API na porta ${PORT}..."
exec node dist/main.js
