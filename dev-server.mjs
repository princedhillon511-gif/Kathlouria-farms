import { spawn } from 'child_process';
import fs from 'fs';

const args = process.argv.slice(2);
let port = process.env.PORT || '3000';
let hostname = '0.0.0.0';
let mode = 'dev';

// Patch Next.js 15.5 segment-explorer bug in React Server Components bundler
const patchNextDevtoolsBug = () => {
  const targetFiles = [
    './node_modules/next/dist/server/app-render/entry-base.js',
    './node_modules/next/dist/esm/server/app-render/entry-base.js',
  ];
  for (const file of targetFiles) {
    if (fs.existsSync(file)) {
      try {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(
          /let SegmentViewNode = \(\)=>[^;]+;/,
          'let SegmentViewNode = ({ children }) => children;'
        );
        content = content.replace(
          "const mod = require('../../next-devtools/userspace/app/segment-explorer-node');",
          "const mod = { SegmentViewNode: ({ children }) => children, SegmentViewStateNode: () => null };"
        );
        content = content.replace(
          "const mod = { SegmentViewNode: () => null, SegmentViewStateNode: () => null };",
          "const mod = { SegmentViewNode: ({ children }) => children, SegmentViewStateNode: () => null };"
        );
        fs.writeFileSync(file, content, 'utf8');
      } catch (err) {
        console.warn('Could not patch', file, err);
      }
    }
  }

  const stubFile = './node_modules/next/dist/next-devtools/userspace/app/segment-explorer-node.js';
  if (fs.existsSync(stubFile)) {
    try {
      const stub = '"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.SegmentViewNode = ({ children }) => children || null;\nexports.SegmentViewStateNode = () => null;\nexports.SegmentBoundaryTriggerNode = () => null;\nexports.SegmentStateProvider = ({ children }) => children || null;\nexports.useSegmentState = () => ({ boundaryType: null, setBoundaryType: () => {} });\nexports.SEGMENT_EXPLORER_SIMULATED_ERROR_MESSAGE = "";\n';
      fs.writeFileSync(stubFile, stub, 'utf8');
    } catch (err) {
      console.warn('Could not patch stub file', err);
    }
  }
};
patchNextDevtoolsBug();

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--port' || args[i] === '-p') {
    if (args[i + 1]) port = args[i + 1];
    i++;
  } else if (args[i] === '--host' || args[i] === '-H' || args[i] === '--hostname') {
    if (args[i + 1]) hostname = args[i + 1];
    i++;
  } else if (args[i] === 'start' || args[i] === 'dev') {
    mode = args[i];
  }
}

if (mode === 'start' && fs.existsSync('./.next/standalone/server.js')) {
  process.env.PORT = port;
  process.env.HOSTNAME = hostname;
  console.log(`Starting Next.js standalone server on ${hostname}:${port}...`);
  import('./.next/standalone/server.js');
} else {
  let nextBin = './node_modules/.bin/next';
  if (!fs.existsSync(nextBin)) {
    nextBin = 'next';
  }
  const nextArgs = [mode, '-p', port, '-H', hostname];
  console.log(`Starting Next.js: ${nextBin} ${nextArgs.join(' ')}`);

  const child = spawn(nextBin, nextArgs, {
    stdio: 'inherit',
    env: process.env,
  });

  const cleanup = (sig) => {
    try {
      child.kill(sig);
    } catch {}
  };

  process.on('SIGTERM', () => cleanup('SIGTERM'));
  process.on('SIGINT', () => cleanup('SIGINT'));
  process.on('exit', () => cleanup('SIGTERM'));

  child.on('error', (err) => {
    console.error('Failed to start Next.js process:', err);
    process.exit(1);
  });

  child.on('exit', (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
    } else {
      process.exit(code ?? 0);
    }
  });
}
