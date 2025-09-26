#!/usr/bin/env bash
set -euo pipefail

# 1) Inicia o tailscaled em userspace + SOCKS5
/usr/sbin/tailscaled --tun=userspace-networking --socks5-server=localhost:1055 --state=/tmp/tailscale.state &

# 2) Faz login na tailnet (sem interativo)
tailscale up --authkey="${TS_AUTHKEY}" --hostname="${HOSTNAME:-notra-api-render}" --accept-routes --ssh
echo "Tailscale IPv4: $(tailscale ip -4)"

# 3) Espera o Postgres ficar acessível pelo túnel
echo "Aguardando Postgres via Tailscale..."
until proxychains4 -q bash -lc "nc -vz 100.94.203.110 5432"; do
  echo "sem conexão ainda... tentando de novo em 2s"
  sleep 2
done
echo "DB ok"

# 4) Aplica migrações via proxy
proxychains4 -q npx prisma migrate deploy

# 5) Sobe a API **via proxy**
exec proxychains4 -q node dist/main.js
