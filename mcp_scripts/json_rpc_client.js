

require('dotenv').config();
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function main() {
  const supabaseAccessToken = process.env.SUPABASE_ACCESS_TOKEN;
  const projectId = 'vigmxhxthgwkntveejtk'; // Your Supabase project ID

  if (!supabaseAccessToken) {
    console.error('Error: SUPABASE_ACCESS_TOKEN is not set in .env file.');
    process.exit(1);
  }

  const mcpServerProcess = spawn('node', [
    path.join(__dirname, '../node_modules/@supabase/mcp-server-supabase/dist/index.js'), // Path to installed package
    '--project-ref=' + projectId,
    `--access-token=${supabaseAccessToken}`,
    '--features=database' // Enable database features
  ], {
    stdio: ['pipe', 'pipe', 'inherit']
  });

  const request = {
    jsonrpc: '2.0',
    id: 1,
    method: 'list_extensions',
    params: { 
      project_id: projectId
    }
  };

  mcpServerProcess.stdin.write(JSON.stringify(request) + '\n');

  mcpServerProcess.stdout.on('data', (data) => {
    console.log(`MCP Server Response: ${data}`);
    mcpServerProcess.kill();
  });

  mcpServerProcess.on('exit', (code) => {
    console.log(`MCP Server process exited with code ${code}`);
  });
}

main();

