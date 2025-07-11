# 設定ファイル利用状況と今後の方針

## .envファイル
- 役割：環境変数としてAPIキーやURLなどの秘密情報を管理
- 利用状況：FastAPI（Python）で直接読み込み、Supabaseクライアントの初期化等に利用

## mcp.jsonファイル
- 役割：CursorやMCPサーバー等、外部ツールの設定ファイル
- 利用状況：Pythonコードからは直接参照されていない。外部ツール用

## 推奨方針
- 秘密情報は.envに統一
- mcp.jsonは外部ツール用のみに限定
- 設定ファイルの役割分担を明確化し、運用ルールを統一

## 調査方法
- Pythonコード全体を検索し、mcp.jsonや.envの利用箇所を確認
- mcp.jsonの直接参照はなし、.envはFastAPIで利用

## 今後の対応
- .envにAPIキーやトークンを集約
- mcp.jsonは必要最小限の外部ツール設定のみ

## セキュリティ担保のためのgitignore運用フロー

1. **.gitignoreに秘密情報・設定ファイルを追加**
   - .env, mcp.json, .cursor/mcp/mcp.json など
2. **Git管理対象外とすることで、リポジトリ経由での漏洩を防止**
3. **ファイルのパーミッションも600などに制限し、不要なユーザーが閲覧できないようにする**
4. **共有が必要な場合は、セキュアな手段（社内ストレージやパスワード管理ツール等）を利用**
5. **漏洩時は該当トークンやキーを即時無効化・再発行し、影響範囲を確認**
6. **定期的にgitignoreやファイル内容を見直し、不要な情報が残っていないか監査する**

## MCPサーバーの権限設定と運用ルール

- 公式ドキュメント（https://supabase.com/docs/guides/getting-started/mcp#cursor）に従い、mcp.jsonの設定で`--read-only`フラグを外すことでSupabaseへの書き込みも許可できる。
- 書き込み権限を付与する場合は、**トークンの管理・漏洩対策をより厳重に行うこと**。
- 誤操作や意図しないデータ変更を防ぐため、運用上は必要な場合のみ書き込み権限を付与し、不要な場合は`--read-only`を付けておくことを推奨。
- 設定例：
```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--project-ref=<project-ref>"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "<personal-access-token>"
      }
    }
  }
}
```
- `--read-only`を外すことで、CursorからSupabaseへの読み書き両方の操作が可能になる。 