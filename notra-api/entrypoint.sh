#!/usr/bin/env bash
set -e

/usr/sbin/tailscaled --tun=userspace-networking --state=/tmp/tailscale.state &
sleep 2
tailscale up --authkey="${TS_AUTHKEY}" --hostname="notra-api-render" --accept-dns=false

# Debug: IP 100.x do backend e teste de DB (pode remover depois)
tailscale ip -4 || true
nc -vz 100.94.203.110 5432 || true

# Migrations e start
npx prisma migrate deploy || true
node dist/main.js
