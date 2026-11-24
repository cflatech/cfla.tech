import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createLocalJWKSet, exportJWK, generateKeyPair, SignJWT } from 'jose';
import { createAccessTokenVerifier } from '../src/access.ts';
import { createPrivateApp } from '../src/private.ts';
import { createPublicApp } from '../src/public.ts';

const issuer = 'https://test.cloudflareaccess.com';
const audience = 'test-app';
const { privateKey, publicKey } = await generateKeyPair('RS256');
const { privateKey: otherPrivateKey } = await generateKeyPair('RS256');
const keys = createLocalJWKSet({ keys: [await exportJWK(publicKey)] });
const privateApp = createPrivateApp(createAccessTokenVerifier(issuer, audience, keys));
const statusPath = '/api/v1/status';
const sitePath = '/api/v1/public/site';

function sign({
  expiration = '5m',
  audienceClaim = audience,
  issuerClaim = issuer,
  notBefore = '0s',
  subject = 'test-user',
  type = 'app',
  key = privateKey,
} = {}) {
  return new SignJWT({ type })
    .setProtectedHeader({ alg: 'RS256' })
    .setIssuer(issuerClaim)
    .setAudience(audienceClaim)
    .setSubject(subject)
    .setExpirationTime(expiration)
    .setNotBefore(notBefore)
    .sign(key);
}

function getStatus(assertion?: string) {
  return privateApp.request(statusPath, {
    headers: assertion ? { 'Cf-Access-Jwt-Assertion': assertion } : {},
  });
}

test('public app serves public site data and has no private status route', async () => {
  const publicApp = createPublicApp();
  const response = await publicApp.request(sitePath);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { state: 'rebuilding' });
  assert.equal((await publicApp.request(statusPath)).status, 404);
});

test('private status accepts a signed Access user assertion and prevents caching', async () => {
  const response = await getStatus(await sign());

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  const { checkedAt } = await response.json();
  assert.equal(new Date(checkedAt).toISOString(), checkedAt);
});

test('private status rejects missing and invalid Access assertions', async (t) => {
  const cases = [
    ['missing assertion', undefined],
    ['wrong signature', await sign({ key: otherPrivateKey })],
    ['wrong audience', await sign({ audienceClaim: 'another-app' })],
    ['wrong issuer', await sign({ issuerClaim: 'https://another.cloudflareaccess.com' })],
    ['expired assertion', await sign({ expiration: '-5m' })],
    ['future assertion', await sign({ notBefore: '5m' })],
    ['service token', await sign({ subject: '' })],
    ['global session token', await sign({ type: 'org' })],
  ] as const;

  for (const [name, assertion] of cases) {
    await t.test(name, async () => {
      const response = await getStatus(assertion);
      assert.equal(response.status, 401);
      assert.equal(response.headers.get('Cache-Control'), 'no-store');
      assert.deepEqual(await response.json(), { code: 'UNAUTHENTICATED' });
    });
  }
});

test('private health check only reports liveness and accepts requests without a user assertion', async () => {
  const response = await privateApp.request('/healthz');

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'ok' });
});
