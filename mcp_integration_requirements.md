# Supabase MCP 連携要件とトラブルシューティング

このドキュメントは、Supabase MCP (Model Context Protocol) サーバーとAIアシスタント (例: Cursor) を連携させるための主要な要件と、一般的な問題の解決策をまとめたものです。

## 1. Supabase MCP サーバーの目的

Supabase MCP サーバーは、AIアシスタントが Supabase プロジェクトと直接対話できるようにするためのブリッジです。これにより、AIはテーブルの管理、設定の取得、データのクエリなどのタスクを実行できます。

## 2. 前提条件

*   **Node.js のインストール:** MCP サーバーは Node.js で動作します。
*   **Supabase Personal Access Token (PAT):** Supabase ダッシュボードで PAT を生成し、MCP サーバーの認証に使用します。

## 3. MCP サーバーの起動コマンドと重要なフラグ

MCP サーバーは `npx` コマンドで起動します。AIアシスタントのクライアント設定でこのコマンドを指定します。

```bash
npx -y @supabase/mcp-server-supabase@latest \
  --project-ref=<YOUR_PROJECT_REF> \
  --access-token=<YOUR_SUPABASE_PAT> \
  --features=database,account,docs,debug,development,functions,branching,storage \
  --read-only=false # 必要に応じて書き込みを許可
```

### 重要なフラグ:

*   `--project-ref=<YOUR_PROJECT_REF>`: **必須。** サーバーがアクセスする Supabase プロジェクトの参照IDを指定します。これにより、サーバーのアクセス範囲を特定のプロジェクトに限定し、セキュリティを向上させます。
*   `--access-token=<YOUR_SUPABASE_PAT>`: **必須。** 生成した Supabase PAT を直接渡します。環境変数 `SUPABASE_ACCESS_TOKEN` を使用することも可能ですが、クライアントによっては直接フラグで渡す方が確実な場合があります。
*   `--features=<feature_group1,feature_group2,...>`: **推奨。** AIアシスタントに公開するツールグループを明示的に指定します。
    *   例: `database` (データベース操作), `account` (アカウント管理), `docs` (ドキュメント検索) など。
    *   デフォルトで有効なグループもありますが、明示的に指定することで意図しないツールの公開を防ぎます。
*   `--read-only=false`: **注意。** デフォルトでは `true` (読み取り専用) です。テーブル作成 (DDL) やデータ変更 (DML) を行う場合は、`false` に設定する必要があります。

## 4. MCP クライアント (Cursor など) での設定例

MCP クライアントは、通常 JSON 形式でサーバー設定を受け付けます。

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--project-ref=vigmxhxthgwkntveejtk",
        "--access-token=sbp_YOUR_SUPABASE_PAT",
        "--features=database,account,docs",
        "--read-only=false"
      ],
      "env": {
        // 環境変数で渡す場合 (クライアントがサポートしていれば)
        // "SUPABASE_ACCESS_TOKEN": "sbp_YOUR_SUPABASE_PAT"
      }
    }
  }
}
```

*   `command`: `npx` を指定します。
*   `args`: MCP サーバーの起動に必要な引数を配列で指定します。上記「3.」のフラグをここに含めます。
*   `env`: クライアントが環境変数をサポートしている場合、ここで `SUPABASE_ACCESS_TOKEN` を設定できます。ただし、`--access-token` フラグで直接渡す方が確実です。

### Windows 環境での注意点:

Windows では、`command` を `cmd` に、`args` の先頭に `/c` を追加する必要がある場合があります。

```json
{
  "mcpServers": {
    "supabase": {
      "command": "cmd",
      "args": [
        "/c",
        "npx",
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--project-ref=vigmxhxthgwkntveejtk",
        "--access-token=sbp_YOUR_SUPABASE_PAT",
        "--features=database",
        "--read-only=false"
      ]
    }
  }
}
```

## 5. `execute_sql` と `apply_migration` の使い分け

MCP サーバーには、SQL を実行するための2つの主要なメソッドがあります。

*   `execute_sql`: **スキーマを変更しない** 通常のクエリ (SELECT, INSERT, UPDATE, DELETE など) に使用します。
*   `apply_migration`: **スキーマを変更する** 操作 (CREATE TABLE, ALTER TABLE, DROP TABLE など) に使用します。テーブル作成にはこちらを使用すべきです。

AIアシスタントにテーブル作成を指示する際は、`apply_migration` を使用するように明確に指示するか、AIアシスタントが適切なメソッドを選択できるようにコンテキストを提供してください。

## 6. トラブルシューティングのヒント

*   **`Method not found` エラー:**
    *   `--features` フラグで必要なツールグループ (例: `database`) が有効になっているか確認してください。
    *   メソッド名が正しいか (例: `execute_sql` と `apply_migration` の使い分け) 確認してください。
    *   MCP サーバーのバージョンが古い可能性があります。`@latest` を使用しているか、または明示的に最新バージョンを指定してください。
*   **認証エラー (`SUPABASE_ACCESS_TOKEN` 関連):**
    *   PAT が正しいか、有効期限が切れていないか確認してください。
    *   `--access-token` フラグでPATを直接渡すか、環境変数が正しく設定されているか確認してください。
*   **接続エラー:**
    *   Node.js が正しくインストールされ、パスが通っているか確認してください。
    *   MCP サーバーが正しく起動しているか確認してください。
*   **書き込み操作ができない:**
    *   `--read-only=false` が設定されているか確認してください。

これらの要件とヒントが、MCP連携の成功に役立つことを願います。
