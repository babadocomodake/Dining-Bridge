# Sentry活用設計書

## 1. Sentry導入の目的
- エラー・パフォーマンスのリアルタイム監視による品質向上
- 障害の早期検知・迅速な対応
- 開発・運用チームの情報共有と改善サイクルの強化

## 2. 設計・導入
- Sentry SDKを全サービス（フロント/バック）に導入
- SourceMap自動アップロード（CI/CD連携）
- カスタムタグ（feature, release_version, user.id等）送信
- 主要API/画面でのtry-catch＋Sentry通知
- ユーザー属性・環境情報も付与
- SDK設定例：
```js
Sentry.init({
  dsn: 'https://example@sentry.io/123',
  release: 'v1.0.0',
  environment: 'production',
  tracesSampleRate: 1.0,
  beforeSend(event) {
    // 個人情報除去など
    return event;
  }
});
```

## 3. 運用・監視
- 新規エラー・パフォーマンス低下時のアラート設定（Slack/メール通知）
- アラート閾値例：
  - 新規エラー発生時
  - 5xxエラーが1分間に3件以上
  - LCP（最大コンテンツ描画）2秒超過
- リリースバージョン連携（デプロイ時にバージョン送信）
- パフォーマンス監視指標：API応答時間、LCP、Crash-Free Users Rate
- Sentryダッシュボードでの定期レビュー

## 4. 品質管理・運用フロー
- 週次エラートリアージ（影響範囲・発生頻度・新規性で優先度付け）
- Sentry→GitHub Issues連携（自動チケット化）
- 障害発生時のエスカレーションフロー：
  1. Sentryアラート受信
  2. 担当者が一次調査・暫定対応
  3. 必要に応じて開発/運用リーダーへ報告
  4. 恒久対応・再発防止策の記録
- Crash-Free Users Rate等の品質指標を定点観測
- 定期的なSentry設定・アラートルールの見直し

## 5. セキュリティ・権限管理
- Sentryプロジェクトへのアクセス権限は最小限に
- 個人情報・機密情報はSentryに送信しない
- Sentry APIキー・DSNは環境変数で安全に管理

---

（本ドキュメントは今後の要件追加・変更に応じて随時アップデートします） 