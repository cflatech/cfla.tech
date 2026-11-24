import process from 'node:process';
import { serve } from '@hono/node-server';
import { createPublicApp } from './public.ts';

serve({
  fetch: createPublicApp().fetch,
  hostname: '0.0.0.0',
  port: Number(process.env.PORT ?? 8787),
});
