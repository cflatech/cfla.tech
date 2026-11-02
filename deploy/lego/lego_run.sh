#!/usr/bin/env bash
set -eu

mkdir -p /etc/acme/data /etc/acme/webroot

lego \
  --path /etc/acme/data \
  --accept-tos \
  --http \
  --http.webroot /etc/acme/webroot \
  --email "$EMAIL" \
  --domains "$FRONTEND_DOMAIN" \
  run
