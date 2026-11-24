# cfla.tech

## 構成

| URL | コンテンツ | 配信コンテナ |
| --- | --- | --- |
| `https://www.cfla.tech` | `apps/front/`（Astro） | `front`（Nginx、`proxy` 経由） |
| `https://app.cfla.tech` | `apps/app/`（TanStack Start） | `app`（Node.js、Cloudflare Access / Tunnel 経由） |
| `https://www.cfla.tech/api/v1/public/site` | `apps/api/`（Hono、公開用） | `api-public`（`proxy` 経由） |
| `http://api-private:8788/api/v1/status`（Compose 内部） | `apps/api/`（Hono、非公開用） | `api-private`（`app` のサーバーから接続） |

pnpm workspace で依存関係と lockfile を管理し、Turborepo でアプリと API のタスクを実行します。
`front` と `app` は `packages/api-client/` の公開用・非公開用クライアントをそれぞれ使います。

`proxy` が外部のポート 80 / 443 を受け持ち、`www` の HTTPS と HTTP からのリダイレクトを処理します。
`lego` が `www` の証明書を取得・更新し、`proxy` が更新を検知して Nginx を再読み込みします。

`app` はホストにポートを公開せず、専用の内部ネットワークで `cloudflared` と接続します。
`cloudflared` は別のネットワークから Cloudflare へ接続し、`http://app:80` に転送します。
公開 `proxy` は `app` を含む `www` 以外のホスト名を拒否します。
`app` の外部向け HTTPS 証明書は Cloudflare が管理するため、`lego-app` は使用しません。

公開 Nginx は公開 API のサイト情報ルートだけを転送します。`app` の Server Function は非公開 API へ Access の JWT を転送し、非公開 API が署名・発行元・AUD・有効期限とユーザー識別子を検証します。非公開 API は専用ネットワークで `app` と接続し、検証用の公開鍵を取得するために Cloudflare へ HTTPS 接続します。

## ローカル開発

Node.js 24 LTS を使用します。Corepack を有効にすると、ルートの `package.json` で指定した pnpm が使われます。

```sh
corepack enable pnpm
pnpm install --frozen-lockfile
pnpm dev
```

既定の URL は front が `http://localhost:4321`、app が `http://localhost:3000` です。
front の既定ポートが使用中の場合は、起動ログに表示されたポートを使います。
ページはそれぞれ `apps/front/src/pages/` と `apps/app/src/routes/` に配置します。
Hono は公開 API を `127.0.0.1:8787`、非公開 API を `127.0.0.1:8788` で起動します。開発中の Astro は `/api/v1/public/site` を公開 API へ転送します。
`app` の `/status` は非公開 API から確認時刻を取得します。ローカルでも非公開 API は有効な Access JWT を要求し、通常のローカルアクセスでは `/status` に認証案内を表示します。`app` の `/healthz` は Docker のヘルスチェック用です。

```sh
pnpm --filter @cfla/front dev
pnpm --filter @cfla/app dev
pnpm --filter @cfla/api dev
pnpm lint
pnpm typecheck
pnpm build
```

`pnpm typecheck` は app のルート定義を生成するため、先に app をビルドします。
`pnpm build` の成果物は front が `apps/front/dist/`、app が `apps/app/.output/`、API が `apps/api/dist/` です。
ビルド後は `pnpm --filter @cfla/front preview` と `pnpm --filter @cfla/app start` で確認できます。
本番用 Docker イメージでは front の静的ファイルを Nginx で配信し、app のサーバーを Node.js で起動します。

### OpenAPI と型の更新

Hono の公開・非公開ルート定義を変更したら、以下を実行し、`apps/api/openapi/` の仕様と `packages/api-client/src/generated/` の型を一緒にコミットします。CI も同じコマンドで生成物を確認します。

```sh
pnpm generate:api
pnpm --filter @cfla/api test
```

### VPN 経由の開発

開発端末を VPN に接続してから、次を実行します。

```sh
pnpm dev:vpn
```

`pnpm dev:vpn` は開発端末に割り当てられた `10.13.13.0/24` 内の IPv4 アドレスを探し、その IP だけで待ち受けます。
VPN に接続した別端末から、起動ログに表示されたポートで開きます。既定では front が `4321`、app が `3000` です。
該当する IP が複数ある場合は、`pnpm dev -- --host 10.13.13.12` のように実際の VPN IP を指定します。
VPN 外からもこの IP に到達できる構成では、受信元を VPN の範囲に絞るためにホスト側のファイアウォールや VPN のアクセス制御を使ってください。

## 環境設定

```sh
cp -n .env.lego.example .env.lego
cp -n .env.cloudflared.example .env.cloudflared
cp -n .env.access.example .env.access
chmod 600 .env.lego .env.cloudflared .env.access
```

`.env.lego` の `EMAIL` と、以下の手順で取得する `.env.cloudflared` の `TUNNEL_TOKEN` を設定します。
`.env.access` の `ACCESS_TEAM_DOMAIN` に `<チーム名>.cloudflareaccess.com` を、`ACCESS_AUDIENCE` に `app.cfla.tech` の Access アプリの AUD を設定します。
`cp -n` は既存の環境ファイルを上書きしません。
これらの環境ファイルは Git と Docker ビルドコンテキストから除外しています。

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
`api-private` は Access の署名鍵取得に HTTPS（TCP 443）の送信接続を使います。

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

旧構成から移行するときも、Tunnel の転送先には `http://app:80` を使います。
初回移行は `.env.access` を設定し、`docker compose up -d --build api-public api-private front app proxy` で API と呼び出し側を更新します。
更新後は `www.cfla.tech` と `/api/v1/public/site`、Access にログインした状態で `app.cfla.tech` のトップページと `/status` を確認します。
切り戻しには、更新前のイメージと、そのイメージに対応する Compose 設定を使います。
