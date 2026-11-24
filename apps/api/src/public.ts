import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

const siteRoute = createRoute({
  method: 'get',
  path: '/api/v1/public/site',
  operationId: 'getPublicSite',
  responses: {
    200: {
      description: 'Public site status',
      content: {
        'application/json': {
          schema: z.object({ state: z.enum(['rebuilding', 'online']) }).openapi('PublicSite'),
        },
      },
    },
  },
});

export function createPublicApp() {
  const app = new OpenAPIHono();

  app.get('/healthz', (c) => c.json({ status: 'ok' }, 200, { 'Cache-Control': 'no-store' }));
  app.openapi(siteRoute, (c) => c.json({ state: 'rebuilding' }, 200));

  return app;
}
