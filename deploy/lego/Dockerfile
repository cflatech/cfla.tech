FROM golang:1.25-bookworm

RUN apt-get update \
    && apt-get install --no-install-recommends -y cron ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && go install github.com/go-acme/lego/v4/cmd/lego@latest

COPY ./deploy/lego/lego_run.sh /go/lego_run.sh
COPY ./deploy/lego/lego_renew.sh /go/lego_renew.sh
COPY ./deploy/lego/cron /etc/cron.d/lego

RUN chmod 0644 /etc/cron.d/lego \
    && chmod 0755 /go/lego_run.sh /go/lego_renew.sh \
    && mkdir -p /etc/acme/data /etc/acme/webroot

CMD ["cron", "-f"]
