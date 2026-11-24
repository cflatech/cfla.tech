import console from 'node:console';
import { existsSync } from 'node:fs';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { serve } from '@hono/node-server';
import { accessVerifierFromEnvironment } from './access.ts';
import { createPrivateApp } from './private.ts';
import { createPublicApp } from './public.ts';

const envFile = fileURLToPath(new URL('../../../.env.access', import.meta.url));

if (existsSync(envFile)) {
  process.loadEnvFile(envFile);
}

const verifyAccessToken = accessVerifierFromEnvironment();

if (!verifyAccessToken) {
  console.info('Private API requires Cloudflare Access configuration and a valid JWT.');
}

serve({ fetch: createPublicApp().fetch, hostname: '127.0.0.1', port: 8787 });
serve({
  fetch: createPrivateApp(verifyAccessToken ?? (() => Promise.resolve(false))).fetch,
  hostname: '127.0.0.1',
  port: 8788,
});
