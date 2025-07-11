// Sentry初期設定雛形（React用）
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.REACT_APP_SENTRY_ENV || 'development',
  tracesSampleRate: 1.0,
}); 