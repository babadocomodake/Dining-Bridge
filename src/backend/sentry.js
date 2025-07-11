// Sentry初期設定雛形
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENV || 'development',
  tracesSampleRate: 1.0,
});

module.exports = Sentry; 