#!/usr/bin/env bash
set -e

# Inicia tailscaled com tun userspace + SOCKS5 local
/usr/sbin/tailscaled --tun=userspace-networking --socks5-server=localhost:1055 --state=/tmp/tailscale.state &
sleep 2
tailscale up --authkey="${TS_AUTHKEY}" --hostname="notra-api-render" --accept-dns=false

# Espera DB via túnel
for i in {1..30}; do
  if proxychains4 -q bash -lc "nc -vz 100.94.203.110 5432"; then
    echo "DB ok"
    break
  fi
  echo "Aguardando DB via Tailscale... ($i/30)"
  sleep 2
done

# (opcional) npx prisma migrate deploy via proxy
proxychains4 -q npx prisma migrate deploy || true

# ⚠️ O servidor Nest TAMBÉM precisa iniciar via proxy:
exec proxychains4 -q node dist/main.js

