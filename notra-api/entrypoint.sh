#!/usr/bin/env bash
set -e

# Inicia tailscaled com tun userspace + SOCKS5 local
/usr/sbin/tailscaled --tun=userspace-networking --socks5-server=localhost:1055 --state=/tmp/tailscale.state &
sleep 2

# Sobe na tailnet
tailscale up --authkey="${TS_AUTHKEY}" --hostname="notra-api-render" --accept-dns=false

echo "Tailscale IPv4: $(tailscale ip -4 || true)"

# Espera DB responder (via proxy, para testar o caminho real)
for i in {1..30}; do
  if proxychains4 -q bash -lc "nc -vz 100.94.203.110 5432"; then
    echo "DB ok"
    break
  fi
  echo "Aguardando DB via Tailscale... ($i/30)"
  sleep 2
done

# Migrações e start via proxy (assim Prisma usa o túnel)
proxychains4 -q npx prisma migrate deploy || true
exec proxychains4 -q node dist/main.js
