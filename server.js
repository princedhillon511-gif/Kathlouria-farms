import fs from 'fs';
import { spawn } from 'child_process';
import path from 'path';

const port = process.env.PORT || '3000';
const hostname = process.env.HOSTNAME || '0.0.0.0';

process.env.PORT = port;
process.env.HOSTNAME = hostname;

const standaloneServer = path.resolve('.next/standalone/server.js');

if (fs.existsSync(standaloneServer)) {
  console.log(`Starting Next.js standalone server on ${hostname}:${port}...`);
  import(standaloneServer);
} else {
  console.log(`Starting Next.js via next start on ${hostname}:${port}...`);
  const child = spawn('./node_modules/.bin/next', ['start', '-p', port, '-H', hostname], {
    stdio: 'inherit',
    env: process.env,
  });
  child.on('exit', (code, sig) => {
    if (sig) process.kill(process.pid, sig);
    else process.exit(code ?? 0);
  });
}
