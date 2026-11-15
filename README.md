# cfla.tech

## 起動

`www.cfla.tech` と `app.cfla.tech` の DNS を配信サーバーに向け、ポート 80 / 443 を開放してください。

```sh
cp .env.lego.example .env.lego
# .env.lego の EMAIL を設定
docker compose build
docker compose up -d proxy
docker compose run --rm lego /go/lego_run.sh
docker compose run --rm lego-app /go/lego_run.sh
docker compose up -d lego lego-app
```

証明書取得後、以下の URL にアクセスします。

| URL | コンテンツ | 配信コンテナ |
| --- | --- | --- |
| `https://www.cfla.tech` | `front/` | `front`（`proxy` 経由） |
| `https://app.cfla.tech` | `app/` | `app`（`proxy` 経由） |

`proxy` が外部のポート 80 / 443 を受け持ち、両ドメインの HTTPS と HTTP からのリダイレクトを処理します。
`lego` / `lego-app` がそれぞれの証明書を取得・更新し、`proxy` が更新を検知して Nginx を再読み込みします。

ドメイン別の設定は `deploy/proxy/conf.d/front.conf` / `app.conf` に分けています。
`front` と `app` は内部ネットワークのポート 80 で、それぞれ独立してコンテンツを配信します。
各アプリの配信設定は `deploy/front/nginx.conf` / `deploy/app/nginx.conf` で管理します。

コンテンツ変更後は対象のイメージを再ビルドします。

```sh
docker compose up -d --build app
# front を変更した場合
docker compose up -d --build front
```

## 既存構成からの切り替え

以前の `front` がポート 80 / 443 を使用している場合は、停止してから新構成を起動します。
切り替え中は一時的に配信が停止します。取得済みの証明書は既存の `acme` ボリュームを引き継ぎます。

```sh
docker compose build
docker compose stop front
docker compose up -d proxy
docker compose run --rm lego-app /go/lego_run.sh # app の証明書が未取得の場合
docker compose up -d lego lego-app
```

## 証明書取得時に HTTP-01 認証が 403 になる場合

旧版の Lego 起動スクリプトは `umask 077` を証明書取得処理にも引き継ぐため、
認証ファイルを Nginx が読めず、認証に失敗します。
修正版はメール設定ファイルを保護したまま、認証ファイルを読み取り可能な権限で作成し、
共有ボリュームに残っている認証用ディレクトリの権限も補正します。

最新のソースを反映後、イメージを再ビルドして証明書を取得し直してください。

```sh
docker compose build lego lego-app
docker compose run --rm lego-app /go/lego_run.sh
docker compose up -d lego lego-app
```

`www.cfla.tech` の証明書取得も失敗している場合は、`lego` でも `/go/lego_run.sh` を実行します。
取得した証明書は `proxy` が通常 30 秒以内に検知して再読み込みします。
