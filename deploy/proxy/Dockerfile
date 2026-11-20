FROM nginx:1.30.7-alpine

RUN apk add --no-cache openssl \
    && rm /etc/nginx/conf.d/default.conf

COPY ./deploy/proxy/conf.d/ /etc/nginx/conf.d/
COPY ./deploy/proxy/entrypoint.sh /usr/local/bin/entrypoint.sh

RUN chmod 0755 /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
