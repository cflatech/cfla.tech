import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

const statusRoute = createRoute({
  method: 'get',
  path: '/api/v1/status',
  operationId: 'getPrivateStatus',
  security: [{ cloudflareAccess: [] }],
  responses: {
    200: {
      description: 'API status',
      content: {
        'application/json': {
          schema: z.object({ checkedAt: z.iso.datetime() }).openapi('PrivateStatus'),
        },
      },
    },
    401: {
      description: 'Missing or invalid Cloudflare Access assertion',
      content: {
        'application/json': {
          schema: z.object({ code: z.literal('UNAUTHENTICATED') }).openapi('AuthenticationError'),
        },
      },
    },
  },
});

export type AccessTokenVerifier = (token: string) => Promise<boolean>;

export function createPrivateApp(verifyAccessToken: AccessTokenVerifier) {
  const app = new OpenAPIHono();

  app.openAPIRegistry.registerComponent('securitySchemes', 'cloudflareAccess', {
    type: 'apiKey',
    in: 'header',
    name: 'Cf-Access-Jwt-Assertion',
  });

  app.use('*', async (c, next) => {
    c.header('Cache-Control', 'no-store');
    await next();
  });
  app.get('/healthz', (c) => c.json({ status: 'ok' }, 200));

  app.use('*', async (c, next) => {
    const assertion = c.req.header('Cf-Access-Jwt-Assertion');

    if (!assertion || !await verifyAccessToken(assertion)) {
      return c.json({ code: 'UNAUTHENTICATED' }, 401);
    }

    await next();
  });

  app.openapi(statusRoute, (c) => c.json({ checkedAt: new Date().toISOString() }, 200));

  return app;
}
