import createClient from 'openapi-fetch';
import type { paths } from './generated/public';

export function createPublicApiClient() {
  return createClient<paths>({ baseUrl: '' });
}
