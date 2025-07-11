const express = require('express');
const cors = require('cors');
require('dotenv').config();
// const Sentry = require('@sentry/node');
// const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// Sentry.init({
//   dsn: process.env.SENTRY_DSN,
//   environment: process.env.SENTRY_ENV || 'development',
// });

// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const apiRouter = require('./api');
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.send('Dining Bridge backend is running!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
}); 