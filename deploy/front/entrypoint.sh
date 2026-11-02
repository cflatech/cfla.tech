#!/bin/sh
set -eu

certificate_directory=/etc/acme/data/certificates
certificate="$certificate_directory/www.cfla.tech.crt"
private_key="$certificate_directory/www.cfla.tech.key"

mkdir -p "$certificate_directory" /etc/acme/webroot

# Allow nginx to start before the first Let's Encrypt certificate is issued.
if [ ! -s "$certificate" ] || [ ! -s "$private_key" ]; then
  openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
    -keyout "$private_key" \
    -out "$certificate" \
    -subj "/CN=www.cfla.tech" \
    2>/dev/null
fi

nginx -g 'daemon off;' &
nginx_pid=$!
previous_certificate_mtime=""

cleanup() {
  nginx -s quit 2>/dev/null || true
  wait "$nginx_pid" 2>/dev/null || true
}
trap cleanup INT TERM

# Reload nginx when Lego replaces the certificate in the shared volume.
while kill -0 "$nginx_pid" 2>/dev/null; do
  certificate_mtime=$(stat -c '%Y' "$certificate" 2>/dev/null || printf 'missing')
  if [ -n "$previous_certificate_mtime" ] && [ "$certificate_mtime" != "$previous_certificate_mtime" ]; then
    nginx -s reload
  fi
  previous_certificate_mtime="$certificate_mtime"
  sleep 30
done

wait "$nginx_pid"
