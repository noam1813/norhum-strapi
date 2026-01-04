# norhum-strapi

norhum-siteプロジェクト用のStrapi CMSです。

## 🚀 はじめに

### 必要な環境

- Docker & Docker Compose
- Node.js 20+ (Dockerを使わないローカル開発の場合)
- pnpm 10.5.2+ (パッケージマネージャー)

### Dockerを使ったローカル開発

1. **環境変数をコピー:**
   ```bash
   cp .env.example .env
   ```

2. **シークレットを生成:**
   ```bash
   # APP_KEYSを生成（4つのキーが必要）
   openssl rand -base64 32 | tr '\n' ',' && openssl rand -base64 32 | tr '\n' ',' && openssl rand -base64 32 | tr '\n' ',' && openssl rand -base64 32
   
   # その他のシークレットを生成
   openssl rand -base64 32  # API_TOKEN_SALT, ADMIN_JWT_SECRET などに使用
   ```

3. **Dockerコンテナを起動:**
   ```bash
   docker compose up --build
   ```

4. **Strapi管理画面にアクセス:**
   - http://localhost:3002/admin を開く
   - 最初の管理者ユーザーを作成

### Dockerを使わないローカル開発

```bash
pnpm install
pnpm run develop
```

## 📦 プロジェクト構成

```
norhum-strapi/
├── config/              # Strapi設定ファイル
│   ├── database.ts      # データベース設定
│   ├── server.ts         # サーバー設定
│   └── env/
│       └── production/   # 本番環境用設定
├── src/
│   ├── api/             # コンテンツタイプ
│   └── admin/           # 管理画面のカスタマイズ
├── docker/               # Dockerファイル
│   ├── Dockerfile        # 本番用Dockerfile
│   └── Dockerfile.dev    # 開発用Dockerfile
└── docker-compose.yml # ローカル開発用Docker Compose
```

## 🚢 デプロイ

このプロジェクトは、`main`ブランチに変更がプッシュされると自動的にStrapi Cloudにデプロイされるように設定されています。

### GitHubリポジトリのセットアップ

1. **新しいGitHubリポジトリを作成:**
   ```bash
   # GitHub上で "norhum-strapi" という名前のリポジトリを作成
   # その後、ローカルリポジトリを接続:
   git remote add origin https://github.com/YOUR_USERNAME/norhum-strapi.git
   git branch -M main
   git push -u origin main
   ```

### Strapi Cloudのセットアップ

1. https://cloud.strapi.io にアクセス
2. 新しいプロジェクトを作成
3. このGitHubリポジトリ（`norhum-strapi`）を接続
4. **Free**プランを選択
5. **Base directory**: `.` (ルート)
6. **Branch**: `main`

Strapi Cloudは自動的に以下を実行します:
- `main`へのプッシュごとにビルドとデプロイ
- PostgreSQLデータベースの提供
- 本番環境用シークレットの生成

## 🔗 norhum-siteとの連携

### 環境変数（norhum-site側）

**ローカル開発:**
```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:3002
```

**本番環境（AWS Amplify）:**
```bash
NEXT_PUBLIC_STRAPI_URL=https://your-project.strapicloud.com
STRAPI_API_TOKEN=<Strapi管理画面 > 設定 > APIトークン で生成>
```

### 環境変数（Strapi側）

**本番環境（Strapi Cloud）:**

特に追加の環境変数設定は不要です。API TOKEN認証により、セキュリティが確保されています。

## 📝 コンテンツタイプ

### Work（制作実績）

ポートフォリオ用の制作実績コンテンツタイプです。

**フィールド構成:**
- `title` (必須): タイトル
- `slug` (必須): URLスラッグ
- `description`: 説明文
- `thumbnail`: 一覧用サムネイル画像
- `detailImage`: 詳細ページ用画像
- `content`: 詳細本文（Markdown形式・画像埋め込み可）
- `tags`: タグ配列

**APIパーミッション設定:**

パーミッションは**自動的に設定**されます。Strapi起動時に`bootstrap`関数が実行され、`config/permissions.ts`で定義されたパーミッションが自動的に適用されます。

手動で設定する必要はありませんが、必要に応じて`config/permissions.ts`を編集してパーミッション設定を変更できます。

これにより、norhum-siteからWorkデータを取得できるようになります。

## 📚 参考資料

- [Strapi ドキュメント](https://docs.strapi.io)
- [Strapi Cloud ドキュメント](https://docs.strapi.io/cloud)
- [Strapi コミュニティ](https://discord.strapi.io)
