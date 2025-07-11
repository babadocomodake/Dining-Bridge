
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const sql = fs.readFileSync(path.join(__dirname, 'create_test_table.sql'), 'utf-8');

const command = `npx -y @supabase/mcp-server-supabase@latest --project-ref=vigmxhxthgwkntveejtk --sql="${sql}"`;

try {
  const output = execSync(command, {
    env: { ...process.env, SUPABASE_ACCESS_TOKEN: process.env.SUPABASE_ACCESS_TOKEN },
    stdio: 'inherit'
  });
} catch (error) {
  console.error('Error executing SQL:', error);
}
