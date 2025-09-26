#!/usr/bin/env bash
set -e

# 1) Sobe tailscaled em modo userspace (não precisa privilégio/TUN)
#    pode remover --socks5-server se quiser menos verboso
/usr/sbin/tailscaled --tun=userspace-networking --socks5-server=localhost:1055 --state=/tmp/tailscale.state &
sleep 2

# 2) Conecta o container na sua tailnet
tailscale up \
  --authkey="${TS_AUTHKEY}" \
  --hostname="notra-api-render" \
  --accept-dns=false

# 3) (debug) mostra IP 100.x e testa DB
tailscale ip -4 || true
nc -vz 100.94.203.110 5432 || true

# 4) Migrations e start
#    (ajuste se seus scripts forem diferentes)
npx prisma migrate deploy || true
node dist/main.js
