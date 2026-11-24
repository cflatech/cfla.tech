import createClient from 'openapi-fetch';
import type { paths } from './generated/private';

export function createPrivateApiClient(baseUrl: string, assertion: string) {
  return createClient<paths>({
    baseUrl,
    headers: { 'Cf-Access-Jwt-Assertion': assertion },
    redirect: 'error',
  });
}
