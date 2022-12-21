#!/bin/bash
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
  --domains $IMAGE_DOMAIN \
  renew

lego \
  --path /etc/acme/data \
  --accept-tos \
  --http \
  --http.webroot /etc/acme/webroot \
  --email $EMAIL \
  --domains $FRONTEND_DOMAIN \
  --domains $BACKEND_DOMAIN \
  --domains $IMAGE_DOMAIN \
  renew
