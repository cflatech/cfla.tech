import process from 'node:process';
import { createRemoteJWKSet, jwtVerify, type JWTVerifyGetKey } from 'jose';
import type { AccessTokenVerifier } from './private.ts';

export function createAccessTokenVerifier(
  issuer: string,
  audience: string,
  keys: JWTVerifyGetKey = createRemoteJWKSet(new URL('/cdn-cgi/access/certs', issuer)),
): AccessTokenVerifier {
  return async (token) => {
    try {
      const { payload } = await jwtVerify(token, keys, {
        algorithms: ['RS256'],
        issuer,
        audience,
        requiredClaims: ['exp', 'sub', 'type'],
      });

      return payload.type === 'app' && typeof payload.sub === 'string' && payload.sub.length > 0;
    } catch {
      return false;
    }
  };
}

export function accessVerifierFromEnvironment() {
  const teamDomain = process.env.ACCESS_TEAM_DOMAIN?.trim();
  const audience = process.env.ACCESS_AUDIENCE?.trim();

  if (!teamDomain && !audience) {
    return undefined;
  }

  if (!teamDomain || !/^[a-z0-9][a-z0-9-]*\.cloudflareaccess\.com$/.test(teamDomain) || !audience) {
    throw new Error('Set ACCESS_TEAM_DOMAIN to <team>.cloudflareaccess.com and ACCESS_AUDIENCE to the app AUD.');
  }

  return createAccessTokenVerifier(`https://${teamDomain}`, audience);
}
