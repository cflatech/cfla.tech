#!/bin/sh
set -eu

certificate_directory=/etc/acme/data/certificates
domains="www.cfla.tech"

mkdir -p "$certificate_directory" /etc/acme/webroot

# Allow nginx to start before the first Let's Encrypt certificate is issued.
for domain in $domains; do
  certificate="$certificate_directory/$domain.crt"
  private_key="$certificate_directory/$domain.key"
  if [ ! -s "$certificate" ] || [ ! -s "$private_key" ]; then
    openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
      -keyout "$private_key" \
      -out "$certificate" \
      -subj "/CN=$domain" \
      2>/dev/null
  fi
done

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
  certificate_mtime=$(
    for domain in $domains; do
      stat -c '%Y' "$certificate_directory/$domain.crt" 2>/dev/null || printf 'missing'
    done
  )
  if [ -n "$previous_certificate_mtime" ] && [ "$certificate_mtime" != "$previous_certificate_mtime" ]; then
    nginx -s reload
  fi
  previous_certificate_mtime="$certificate_mtime"
  sleep 30
done

wait "$nginx_pid"
