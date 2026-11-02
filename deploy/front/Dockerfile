FROM nginx:1.27-alpine

RUN apk add --no-cache openssl

COPY ./front/ /usr/share/nginx/html/
COPY ./deploy/front/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./deploy/front/entrypoint.sh /usr/local/bin/entrypoint.sh

RUN chmod 0755 /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
