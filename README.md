# cfla.tech

## 構成

| URL | コンテンツ | 配信コンテナ |
| --- | --- | --- |
| `https://www.cfla.tech` | `front/` | `front`（`proxy` 経由） |
| `https://app.cfla.tech` | `app/` | `app`（Cloudflare Access / Tunnel 経由） |

`proxy` が外部のポート 80 / 443 を受け持ち、`www` の HTTPS と HTTP からのリダイレクトを処理します。
`lego` が `www` の証明書を取得・更新し、`proxy` が更新を検知して Nginx を再読み込みします。

`app` はホストにポートを公開せず、専用の内部ネットワークで `cloudflared` と接続します。
`cloudflared` は別のネットワークから Cloudflare へ接続し、`http://app:80` に転送します。
公開 `proxy` は `app` を含む `www` 以外のホスト名を拒否します。
`app` の外部向け HTTPS 証明書は Cloudflare が管理するため、`lego-app` は使用しません。

## 環境設定

```sh
cp -n .env.lego.example .env.lego
cp -n .env.cloudflared.example .env.cloudflared
chmod 600 .env.lego .env.cloudflared
```

`.env.lego` の `EMAIL` と、以下の手順で取得する `.env.cloudflared` の `TUNNEL_TOKEN` を設定します。
`cp -n` は既存の環境ファイルを上書きしません。
両ファイルは Git と Docker ビルドコンテキストから除外しています。

## Cloudflare Access / Tunnel の設定

Cloudflare 管理画面で設定するリモート管理 Tunnel を使用します。
`cfla.tech` を Cloudflare の有効なゾーンとして登録しておきます。
**アプリを認証なしで公開しないよう、Access を先に設定してください。**

1. **Zero Trust > Integrations > Identity providers** で `Cloudflare` を追加し、
   **Restrict to account members** を有効にします。既に登録済みなら設定を確認します。
2. **Zero Trust > Access controls > Applications** で **Self-hosted and private** アプリを作成します。
   公開ホスト名は `app.cfla.tech`、Path は空欄、ログイン方法は `Cloudflare` のみにします。
   `Allow` ポリシーの `Include` に `Cloudflare Account Member` を指定します。
   自分だけに限定する場合は、同じポリシーの `Require` に `Emails` で自分のメールアドレスを追加します。
   保存後、アプリの **Application Audience (AUD) Tag** と Zero Trust のチーム名を控えます。
3. **Networking > Tunnels** で `cloudflared` の Tunnel を作成し、Docker 用の接続トークンを
   `.env.cloudflared` の `TUNNEL_TOKEN` に設定します。管理画面の Docker コマンドの代わりに、この Compose で起動します。
4. Tunnel の **Routes** に公開アプリのルートを追加し、次の値を設定します。

   | 項目 | 値 |
   | --- | --- |
   | Public hostname | `app.cfla.tech` |
   | Path | 空欄 |
   | Service | HTTP / `app:80`（`http://app:80`） |
   | Protect with Access | 有効 |
   | Team name | 自分の Zero Trust チーム名 |
   | Audience / AUD | 手順 2 のアプリの AUD |

   `Protect with Access` で、`cloudflared` が有効な Access トークンを検証してからアプリへ転送します。
   `localhost` は `cloudflared` コンテナ自身を指すため、転送先には `app:80` を使います。
   既存の `app` の A / AAAA / CNAME レコードが競合する場合は、そのレコードを削除してから追加します。
   `app` の DNS は Tunnel の `<UUID>.cfargotunnel.com` を指すプロキシ有効な CNAME にします。

`app` 全体を Access で保護し、HTTP-01 用の Bypass 設定は作成しません。
以前に `app.cfla.tech/.well-known/acme-challenge/*` の Bypass アプリを作成した場合は削除してください。
`www` の DNS は配信サーバーを指したままにします。

公式ドキュメント:
[Cloudflare IdP](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/cloudflare/) /
[Access アプリ](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/) /
[Tunnel 作成](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/) /
[Protect with Access](https://developers.cloudflare.com/tunnel/reference/origin-parameters/#access)

## 起動

環境設定と Cloudflare 側の設定を完了後、`www.cfla.tech` の DNS を配信サーバーに向け、
ポート 80 / 443 を開放してください。Tunnel 用に追加の受信ポートは不要です。
サーバーから Cloudflare への送信ポート 7844（UDP / TCP）は許可します。

```sh
docker compose build
docker compose up -d proxy
docker compose run --rm lego /go/lego_run.sh
docker compose up -d lego cloudflared
```

## コンテンツの更新

コンテンツ変更後は対象のイメージを再ビルドします。

```sh
docker compose up -d --build app
# front を変更した場合
docker compose up -d --build front
```
