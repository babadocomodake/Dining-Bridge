# Dining Bridge

## 技術スタック・構成方針

- フロントエンド: React（またはVue）+ TypeScript
- バックエンド: Node.js + Express
- データベース: PostgreSQL（Supabase連携）
- 認証・ストレージ・API: Supabase BaaS
- 監視・品質管理: Sentry
- CI/CD: GitHub Actions
- その他: MCP連携、REST API設計

### Supabase連携理由
- PostgreSQLベースの高機能BaaSで、認証・ストレージ・API等を一元管理
- セキュリティ・ロール管理が容易で、MVP開発やスケールに最適
- CLI/SDK・CI/CD連携が容易

---

## Supabase CLI/SDKセットアップ

### 1. Supabase CLIインストール
```
npm install -g supabase
```

### 2. プロジェクト初期化
```
supabase init
```

### 3. ローカル開発用DB起動
```
supabase start
```

### 4. SDKインストール（フロント/バック共通）
```
npm install @supabase/supabase-js
```

### 5. .envファイルにSupabaseのURL/キーを設定
（.env.exampleを参考に各自作成）

---

（以下、既存のREADME内容があればそのまま残す） 