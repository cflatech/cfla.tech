#!/usr/bin/env bash
set -eu

# Cron does not inherit the container's environment.
: "${EMAIL:?EMAIL is required}" "${FRONTEND_DOMAIN:?FRONTEND_DOMAIN is required}"
umask 077
printf 'export EMAIL=%q\nexport FRONTEND_DOMAIN=%q\n' \
  "$EMAIL" "$FRONTEND_DOMAIN" > /etc/lego.env

exec "$@"
