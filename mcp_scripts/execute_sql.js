import { createClient } from '@modelcontextprotocol/sdk';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const mcpServerProcess = spawn('npx', [
    '-y',
    '@supabase/mcp-server-supabase@latest',
    '--project-ref=vigmxhxthgwkntveejtk'
  ], {
    env: { ...process.env, SUPABASE_ACCESS_TOKEN: process.env.SUPABASE_ACCESS_TOKEN },
    stdio: ['pipe', 'pipe', 'inherit'] // Pipe stdin/stdout, inherit stderr
  });

  const client = createClient({
    transport: {
      send: (message) => mcpServerProcess.stdin.write(JSON.stringify(message) + '\n'),
      receive: (callback) => {
        mcpServerProcess.stdout.on('data', (data) => {
          const messages = data.toString().split('\n').filter(Boolean);
          for (const message of messages) {
            callback(JSON.parse(message));
          }
        });
      }
    }
  });

  const sql = fs.readFileSync(path.join(__dirname, 'create_test_table.sql'), 'utf-8');

  try {
    // It seems there is no explicit connection step needed for stdio transport.
    // We can directly send requests.
    const result = await client.request('execute_sql', { sql });
    console.log('SQL execution result:', result);
  } catch (error) {
    console.error('Error executing SQL:', error);
  } finally {
    mcpServerProcess.kill();
  }
}

main();