#!/bin/bash
if [ ! -e /etc/acme/data ]; then
  mkdir -p /etc/acme/data
  mkdir -p /etc/acme/webroot

  echo lego \
    --path /etc/acme/data \
    --accept-tos \
    --http \
    --http.webroot /etc/acme/webroot \
    --email $EMAIL \
    --domains $FRONTEND_DOMAIN \
    --domains $BACKEND_DOMAIN \
    run

  lego \
    --path /etc/acme/data \
    --accept-tos \
    --http \
    --http.webroot /etc/acme/webroot \
    --email $EMAIL \
    --domains $FRONTEND_DOMAIN \
    --domains $BACKEND_DOMAIN \
    run
fi
