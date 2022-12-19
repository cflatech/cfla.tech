FROM golang:latest

RUN apt-get update && apt-get install -y cron
RUN go install github.com/go-acme/lego/v4/cmd/lego@latest

COPY ./deploy/lego/lego.sh ./lego.sh
