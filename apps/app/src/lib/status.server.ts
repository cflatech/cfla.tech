import '@tanstack/react-start/server-only';
import { createPrivateApiClient } from '@cfla/api-client/private';
import { getRequestHeader, setResponseHeader } from '@tanstack/react-start/server';

export async function readApiStatus() {
  setResponseHeader('Cache-Control', 'no-store');
  const assertion = getRequestHeader('Cf-Access-Jwt-Assertion');

  if (!assertion) {
    return { state: 'unauthenticated' } as const;
  }

  const baseUrl = process.env.PRIVATE_API_URL ?? 'http://127.0.0.1:8788';

  try {
    const { data, response } = await createPrivateApiClient(baseUrl, assertion).GET('/api/v1/status', {
      signal: AbortSignal.timeout(6000),
    });

    if (data) {
      return { state: 'ok', checkedAt: data.checkedAt } as const;
    }

    if (response.status === 401) {
      return { state: 'unauthenticated' } as const;
    }
  } catch {
    // The API may be down or unreachable.
  }

  return { state: 'unavailable' } as const;
}
