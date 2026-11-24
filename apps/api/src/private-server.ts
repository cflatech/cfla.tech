import process from 'node:process';
import { serve } from '@hono/node-server';
import { accessVerifierFromEnvironment } from './access.ts';
import { createPrivateApp } from './private.ts';

const verifyAccessToken = accessVerifierFromEnvironment();

if (!verifyAccessToken) {
  throw new Error('ACCESS_TEAM_DOMAIN and ACCESS_AUDIENCE are required.');
}

serve({
  fetch: createPrivateApp(verifyAccessToken).fetch,
  hostname: '0.0.0.0',
  port: Number(process.env.PORT ?? 8788),
});
