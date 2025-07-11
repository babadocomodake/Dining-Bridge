const express = require('express');
const router = express.Router();

// POST /api/taste-profiler/submit
router.post('/taste-profiler/submit', (req, res) => {
  // TODO: 回答保存・おすすめ生成ロジック
  res.json({ recommendation: 'おすすめ例', imageUrl: 'https://example.com/image.png' });
});

// POST /api/insight-survey/submit
router.post('/insight-survey/submit', (req, res) => {
  // TODO: 回答保存・感謝メッセージ生成ロジック
  res.json({ message: 'ご協力ありがとうございました' });
});

// POST /api/admin/login
router.post('/admin/login', (req, res) => {
  // TODO: 認証ロジック
  res.json({ token: 'dummy-token' });
});

// GET /api/admin/summary
router.get('/admin/summary', (req, res) => {
  // TODO: 集計データ返却ロジック
  res.json({ stats: {} });
});

// GET /api/admin/qr-download
router.get('/admin/qr-download', (req, res) => {
  // TODO: QRコード画像返却ロジック
  res.type('png').send('');
});

module.exports = router; 