# 進捗管理・TODOリスト

## 1. 進捗管理の基本
- 毎日または作業ごとに「やったこと」「やること」「困っていること」を記録
- タスクごとに優先度・担当・期限を明記
- 定期的に進捗レビュー（週次MTG等）

## 1-2. 進捗・TODOリストの更新・運用ルール（AI主導運用）
- 本リストはAIアシスタントが責任を持って管理・更新する。
- ユーザーは直接ファイルを編集せず、AIに指示・進捗報告・課題申告のみ行う。
- AIは以下のタイミングで必ず内容を更新・反映する：
  - ユーザーからの進捗・課題・新規要件・完了報告を受けたとき
  - タスクの進捗・状態・担当・期限等に変更が生じたとき
  - 日次・週次・月次レビューのタイミング
- タスクの追加・削除・優先度変更・依存関係変更もAIが一元管理し、履歴を残す。
- 進捗・TODOリストの内容は常に最新状態を維持し、ユーザーからの「進捗は？」「TODOは？」等の問いに即時・正確に回答できるようにする。
- 本ルールはユーザーの明示的な指示がない限り継続適用される。

## 2. TODOリスト（WBS例）
| No | タスク | 優先度 | 担当 | 期限 | 状態 |
|----|--------|--------|------|------|------|
| 1 | 要件定義書作成 | 高 | AI | 6/13 | 完了 |
| 2 | 機能仕様書作成 | 高 | AI | 6/13 | 完了 |
| 3 | 技術設計書作成 | 高 | AI | 6/13 | 完了 |
| 4 | Sentry設計書作成 | 高 | AI | 6/13 | 完了 |
| 5 | ソース管理方針作成 | 中 | AI | 6/13 | 完了 |
| 6 | テスト計画書作成 | 中 | AI | 6/13 | 完了 |
| 7 | 課題管理方針作成 | 中 | AI | 6/13 | 完了 |
| 8 | 進捗・TODOリスト作成 | 中 | AI | 6/13 | 完了 |
| 9 | 変更履歴・エラー記録作成 | 中 | AI | 6/13 | 完了 |
|10 | 開発環境セットアップ | 高 | ユーザー | 6/14 | 未着手 |
|11 | GitHubリポジトリ作成 | 高 | ユーザー | 6/14 | 未着手 |
|12 | Supabaseアカウント・プロジェクト作成 | 高 | ユーザー | 6/14 | 進行中 |
|13 | Sentryアカウント・プロジェクト作成 | 高 | ユーザー | 6/14 | 未着手 |
|14 | Supabase CLI/SDKセットアップ | 高 | ユーザー | 6/14 | 未着手 |
|15 | Sentry SDKセットアップ | 高 | ユーザー | 6/14 | 未着手 |
|16 | サンプルアプリでSupabase×Sentry連携 | 高 | ユーザー | 6/15 | 未着手 |
|17 | MCP的自動化（CLI/CI/CD/スクリプト）設計・導入 | 中 | ユーザー | 6/16 | 未着手 |
|18 | 画面遷移図・ER図作成 | 高 | AI | 6/14 | 未着手 |
|19 | フロントエンド初期構築 | 高 | ユーザー | 6/15 | 未着手 |
|20 | バックエンド初期構築 | 高 | ユーザー | 6/15 | 未着手 |
|21 | テスト自動化環境構築 | 中 | ユーザー | 6/16 | 未着手 |
|22 | supabase_sample, sentry_sample, mcp_scriptsディレクトリ作成 | 高 | AI | 6/14 | 完了 |

## 3. 進捗記録テンプレ
| 日付 | やったこと | やること | 困っていること | 備考 |
|------|------------|----------|----------------|------|
| 6/13 | 設計書一式作成 | Supabase/Sentry/MCPセットアップ | 特になし | - |
| 6/14 | ディレクトリ作成 | Supabaseプロジェクト作成 | 特になし | - |

## 4. バーンダウン/ガントチャート運用例
- Googleスプレッドシート等でタスク進捗を可視化
- 残タスク数・進捗率を毎日記録

## 5. リスク・課題管理
- 進捗遅延・技術課題・要件変更等は都度記録
- 重大リスクは即時エスカレーション

## 6. ポイント
- 小さなタスクに分けて管理
- 優先度・期限・担当を明確に
- 定期的な進捗レビューで遅延・課題を早期発見

---

（本ドキュメントは今後の要件追加・変更に応じて随時アップデートします） 