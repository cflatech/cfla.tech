#!/usr/bin/env bash
set -eu

# Cron does not inherit the container's environment.
: "${EMAIL:?EMAIL is required}" "${FRONTEND_DOMAIN:?FRONTEND_DOMAIN is required}"
umask 077
printf 'export EMAIL=%q\nexport FRONTEND_DOMAIN=%q\n' \
  "$EMAIL" "$FRONTEND_DOMAIN" > /etc/lego.env

# HTTP-01 tokens must be readable by the unprivileged Nginx worker.
umask 022
challenge_directory=/etc/acme/webroot/.well-known/acme-challenge
mkdir -p "$challenge_directory"
# Repair directories persisted by an earlier run with umask 077.
chmod 0755 /etc/acme/webroot /etc/acme/webroot/.well-known "$challenge_directory"

exec "$@"
