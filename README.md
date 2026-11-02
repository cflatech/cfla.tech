# cfla.tech

## 起動

```sh
cp .env.lego.example .env.lego
# .env.lego の EMAIL を設定
docker compose build
docker compose up -d front
docker compose run --rm lego /go/lego_run.sh
docker compose up -d lego
```

証明書取得後、`https://www.cfla.tech` にアクセスします。
