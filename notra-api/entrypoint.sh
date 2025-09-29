#!/usr/bin/env bash
set -eo pipefail

/usr/sbin/tailscaled --tun=userspace-networking --state=/tmp/ts.state &

echo ">> Fazendo tailscale up..."
tailscale up --authkey="${TS_AUTHKEY}" --accept-dns=false --timeout=60s

echo ">> Tailscale IPv4: $(tailscale ip -4 || echo desconhecido)"
echo ">> DATABASE_URL=${DATABASE_URL}"

echo ">> Esperando DB responder (via DATABASE_URL)..."
for i in {1..30}; do
  if psql "${DATABASE_URL}" -c 'select 1' >/dev/null 2>&1; then
    echo ">> DB OK"; break
  fi
  echo "Aguardando DB ($i/30)"; sleep 2
done

exec node dist/main.js
