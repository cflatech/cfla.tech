## [0.0.2](https://github.com/cflatech/cfla.tech/compare/0.0.1...0.0.2) (2022-12-22)


### Bug Fixes

* **frontend:** 画像のアスペクト比が固定になってたので修正 ([14f52b5](https://github.com/cflatech/cfla.tech/commit/14f52b5d92bab10775fa3e3a2617d6c7d1e1669d))



## 0.0.1 (2022-12-21)


### Bug Fixes

* **frontend:** backendの接続先間違えた ([f4ce8a6](https://github.com/cflatech/cfla.tech/commit/f4ce8a6a05b9cca4c0a92731ccc775d811410783))
* **frontend:** env未設定時にdomainsでコケるので修正 ([5c40067](https://github.com/cflatech/cfla.tech/commit/5c400677db7b2f4b98f3c82eccace0c4c910cc2b))
* **frontend:** Logoの画像パスを修正 ([fc9a2c1](https://github.com/cflatech/cfla.tech/commit/fc9a2c13034fd7025df013ccdadfb284a118e69f))
* **frontend:** 上げるsvg間違えていたので修正 ([638e32f](https://github.com/cflatech/cfla.tech/commit/638e32feba8d9596a5ca24111ab93aa864599ecc))
* **frontend:** 続きを読むの横が押せるようになっていたので修正 ([e50fb7b](https://github.com/cflatech/cfla.tech/commit/e50fb7bef4d70eb9b24a015cc81d325b153fea15))
* **infra:** IMAGE_DOMAIN修正 ([5f71526](https://github.com/cflatech/cfla.tech/commit/5f71526cbbcb9a66fae351a43a71fb10bf55a11b))
* **infra:** next.config.jsをコンテナへコピー ([3c39893](https://github.com/cflatech/cfla.tech/commit/3c39893bbad35e2da686bf6a0e3c7e335702b537))
* 間違って画像あげてたので削除 ([e81e12c](https://github.com/cflatech/cfla.tech/commit/e81e12c6a5b934eb4e65296607a3ab1ca85f81b2))


### Features

* **backend:** @nestjs/testingを更新 ([876a3bc](https://github.com/cflatech/cfla.tech/commit/876a3bc49644801963bb3e6657fde2a8e9b787ae))
* **backend:** article resourceを作成 ([bd8b8b7](https://github.com/cflatech/cfla.tech/commit/bd8b8b7bd3d7361a8c4798c1878a0463230283b6))
* **backend:** articlesのendpointを作成 ([7bf7f7b](https://github.com/cflatech/cfla.tech/commit/7bf7f7b2cdaea0e1467e6369632ef7c483d85238))
* **backend:** articleのcontentをblocksに命名変更 ([d26d29c](https://github.com/cflatech/cfla.tech/commit/d26d29cbdf11f4e9a6a01f5b2de883dbfcd21600))
* **backend:** Cache機構を追加 ([c50d1e5](https://github.com/cflatech/cfla.tech/commit/c50d1e538e3f80362f85fb7c6cd483439bd1e29e))
* **backend:** CORSエラーに対処 ([41b2bb1](https://github.com/cflatech/cfla.tech/commit/41b2bb1b2fb2c11a84f7a6d9fa5f4db0cfb8c6d3))
* **backend:** idのvalue objectを追加 ([da80ab3](https://github.com/cflatech/cfla.tech/commit/da80ab3c5f869c7f91332617f3dfdaf92dfeb44d))
* **backend:** nest/config追加 ([8c8eae3](https://github.com/cflatech/cfla.tech/commit/8c8eae3a61156991ffb7c5ee87f7994173910e6f))
* **backend:** notion clientを追加 ([9b9e12c](https://github.com/cflatech/cfla.tech/commit/9b9e12cc109408b97fa31d376b34c78cda18a3b3))
* **backend:** Notionの設定情報をenvから取得できるようにした ([92cc4bf](https://github.com/cflatech/cfla.tech/commit/92cc4bf7560760991c90269d39e2e97a9f482ae9))
* **backend:** repositoryから該当する記事の内容が取得できる ([33d16c7](https://github.com/cflatech/cfla.tech/commit/33d16c717137140f860fb01d0cc1df6023ffb03e))
* **backend:** バックエンドから画像のURLが取得できる ([89212bb](https://github.com/cflatech/cfla.tech/commit/89212bb603fe32ef06616019a090fd193863ee96))
* **backend:** 不要なHelloWorld削除 ([95e0339](https://github.com/cflatech/cfla.tech/commit/95e0339f87f8d2a29f6de7cefdb2c83da551f125))
* **backend:** 不要なルーティング及びその依存を削除 ([a78b8c1](https://github.com/cflatech/cfla.tech/commit/a78b8c1efb02b3023753fb2ee310035870ec872f))
* **backend:** 記事エンティティからデータ取得できるようにした ([27b5244](https://github.com/cflatech/cfla.tech/commit/27b5244febc3325466d3f111c7c39420cc5dccb4))
* **backend:** 記事のタイトルを取得できる ([a23edfb](https://github.com/cflatech/cfla.tech/commit/a23edfbea9af82c42f4f0e435e0d433f6d826667))
* **backend:** 記事リストを取得するエンドポイントを追加 ([20d7127](https://github.com/cflatech/cfla.tech/commit/20d7127e24ee6cf4a6ef13ccd0b18a71d3d48e1d))
* **frontend:** api削除 ([6623e2b](https://github.com/cflatech/cfla.tech/commit/6623e2b6807a1bcc7284ac88f1042b1ea562bc51))
* **frontend:** ArticleBlockの型追加 ([f56d6d5](https://github.com/cflatech/cfla.tech/commit/f56d6d520c9ed088272e35bf0928f423114fa880))
* **frontend:** backgroundのcolor指定方法変更 ([6bcad5b](https://github.com/cflatech/cfla.tech/commit/6bcad5bdd8ed1b414ae469d3322b963d66fcf481))
* **frontend:** Blockの表示を追加 ([d88c0cb](https://github.com/cflatech/cfla.tech/commit/d88c0cb5a69323baa4ee1710b6ccf1fc58509706))
* **frontend:** front側で画像表示ができる ([456341e](https://github.com/cflatech/cfla.tech/commit/456341e180434afb1943f3355c4fc2a7e2b4b33a))
* **frontend:** HOMEの折り返し対応修正 ([4a2a302](https://github.com/cflatech/cfla.tech/commit/4a2a3028702ec932b1a732d5186e29408897a251))
* **frontend:** Interfaceに公開済み記事取得メソッド追加 ([bfea1c8](https://github.com/cflatech/cfla.tech/commit/bfea1c88c9b2dcc441f11e8b700a126cc7d22177))
* **frontend:** Layout作成してHeader表示 ([087af9c](https://github.com/cflatech/cfla.tech/commit/087af9c457fb7f5f7d0648908adbed9d02fbf056))
* **frontend:** ListにBlockが表示される ([024f462](https://github.com/cflatech/cfla.tech/commit/024f462420e5d07e7dae0bf4a1b492154ce1ee85))
* **frontend:** ListのItemもpage番号をgSSPで受け取るように変更 ([5d41c4f](https://github.com/cflatech/cfla.tech/commit/5d41c4fc38cef05dd0767ed1bea9a8e48fef063e))
* **frontend:** ListのRotatingLinesのサイズ調整 ([c5033bf](https://github.com/cflatech/cfla.tech/commit/c5033bfab79b2e7df81785294f3d0bc711fcda75))
* **frontend:** Logo位置修正 ([384c138](https://github.com/cflatech/cfla.tech/commit/384c1380dafd7a6eebc115edff7112171a44c414))
* **frontend:** mainカラムとsideカラムを作成 ([adc887f](https://github.com/cflatech/cfla.tech/commit/adc887fc8cf7d54d9f20a372a93a294a714d4032))
* **frontend:** mainカラムとサイドバーがそれっぽく動くようになった ([ddfcb62](https://github.com/cflatech/cfla.tech/commit/ddfcb620cbdb61052d26917183f556f1d07585cf))
* **frontend:** paginationのコンポーネント追加 ([7a5bd00](https://github.com/cflatech/cfla.tech/commit/7a5bd00ef762b95338e2b42f414fc034517ebfa0))
* **frontend:** Paginationの表示条件を追加 ([6029699](https://github.com/cflatech/cfla.tech/commit/60296999df4bf1559b06c68950ceae199d289aaa))
* **frontend:** Paragraphが複数のitemから構成されるように変更 ([e5550c0](https://github.com/cflatech/cfla.tech/commit/e5550c0462024de9b26968e81d2f93e1db0a9fcf))
* **frontend:** Paragraphの形式変更に対応 ([5dfd517](https://github.com/cflatech/cfla.tech/commit/5dfd5177c27b77e65f173e87f9204f66d8b5424e))
* **frontend:** Repository生成時にdatabaseIdをプロパティとして持つように変更 ([f668497](https://github.com/cflatech/cfla.tech/commit/f668497db17c69c102f17cc942b61a5dc9c19d92))
* **frontend:** routerがReadyでない場合、リストが表示されない ([36762e3](https://github.com/cflatech/cfla.tech/commit/36762e3e3a3178e25d0869242ac28f221abea521))
* **frontend:** sidebarのコンポーネント追加 ([0b7b327](https://github.com/cflatech/cfla.tech/commit/0b7b32786aa13fd6e8c75ecbcdbd835f525c9fa4))
* **frontend:** タイトルが変な位置で改行される問題を修正 ([787cf5d](https://github.com/cflatech/cfla.tech/commit/787cf5dbbaff5392bd7dc6d044099f6135ef60a8))
* **frontend:** タイトルのスタイル追加 ([f25df59](https://github.com/cflatech/cfla.tech/commit/f25df59b10007403c9279876ea2478573558568f))
* **frontend:** ディレクトリ構造を変更 ([8aa4374](https://github.com/cflatech/cfla.tech/commit/8aa4374d61839e34b07ecefcd85f640c182f5ef9))
* **frontend:** テキストの改行に対応 ([6cc91ac](https://github.com/cflatech/cfla.tech/commit/6cc91ac7fb706bb87279fb6bb43d140f69d614da))
* **frontend:** バックエンドから返ってくるcontentをblocksに修正 ([04fda78](https://github.com/cflatech/cfla.tech/commit/04fda7850914800326d4bdc08f3716752de3e336))
* **frontend:** プロフィール追加 ([78e0bc6](https://github.com/cflatech/cfla.tech/commit/78e0bc6e885c23b15e6a9519befb7261a45250e4))
* **frontend:** ロゴにトップへのリンクつけた ([7415210](https://github.com/cflatech/cfla.tech/commit/7415210a34b6a9a73e8cfa8eb8875e6d855c5549))
* **frontend:** 仮アイコン作成 ([352a5d4](https://github.com/cflatech/cfla.tech/commit/352a5d41189e764b3065c1e698e7252c00efd7fb))
* **frontend:** 画像を中央揃え ([f2b5366](https://github.com/cflatech/cfla.tech/commit/f2b5366a42fe41f47a3b04d7441a5d1db50fcacf))
* **frontend:** 記事にプロパティを追加 ([b4c843f](https://github.com/cflatech/cfla.tech/commit/b4c843f0a0e00cddb7d5aa45db83a2c35d9171cf))
* **frontend:** 記事ページ作成 ([24981a5](https://github.com/cflatech/cfla.tech/commit/24981a52dcd6de1d95f2de89444e161895a62933))
* **frontend:** 記事リストとサイドのサイズ指定を追加 ([e0ec18e](https://github.com/cflatech/cfla.tech/commit/e0ec18e3ae0ba91d5dd54142d56852b4c6a09ced))
* **frontend:** 記事リスト内にアイテムが表示される ([a1e4f7f](https://github.com/cflatech/cfla.tech/commit/a1e4f7f397c54e1544ece71324ef0c71c91816ef))
* **frontend:** 記事情報取得用のhook作成 ([4659b84](https://github.com/cflatech/cfla.tech/commit/4659b84876dfeb89c41c98466020f5e3dce9a599))
* **frontend:** 記事表示前にLoading用のアイコンが表示されるように設定 ([a7bf3eb](https://github.com/cflatech/cfla.tech/commit/a7bf3eb8a9c025d65049fb5cb235fef36d872b28))
* **infra:** legoでIMAGE_DOMAINも対象になるようにした ([57bc5cb](https://github.com/cflatech/cfla.tech/commit/57bc5cbf42100ff3a21d2f5cae59ba28c04d2d7b))
* **infra:** lego実行後にrunが再実行されないようにした ([71feb1f](https://github.com/cflatech/cfla.tech/commit/71feb1f986ba8f2d1353a86849cc725af7ceec2e))
* **infra:** lego用のコンテナ追加 ([33a9f1b](https://github.com/cflatech/cfla.tech/commit/33a9f1b0d2473f6f59cc47ba2703c0bcc6a99a6d))
* **infra:** とりあえずnginxが立ち上がってhttpでサービスが動くようにした ([03b9b1c](https://github.com/cflatech/cfla.tech/commit/03b9b1c55ed3ce455416f4595c43ea5a8d87db59))
* とりあえず画像が上げられるようにした ([435e9f0](https://github.com/cflatech/cfla.tech/commit/435e9f03eff746e8d0cfd08515996d330d8cda54))
* 天伯ネバーランド/website から初期コードをコピー ([e5220de](https://github.com/cflatech/cfla.tech/commit/e5220ded6aea75880e4f97773ea7392525ff4a15))
* 画像用のnginxの設定追加 ([065b3b2](https://github.com/cflatech/cfla.tech/commit/065b3b279f7d555499ddfc44bfa93aebcd5b9217))



