import { createFileRoute, Link } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { readApiStatus } from '../lib/status.server';

const getServerStatus = createServerFn({ method: 'GET' }).handler(() => readApiStatus());

export const Route = createFileRoute('/status')({
  loader: () => getServerStatus(),
  headers: () => ({ 'Cache-Control': 'no-store' }),
  component: Status,
});

function Status() {
  const status = Route.useLoaderData();

  return (
    <>
      <h1>稼働状況</h1>
      {status.state === 'ok' && (
        <>
          <p>API は稼働中です。</p>
          <p>確認時刻（UTC） <time dateTime={status.checkedAt}>{status.checkedAt}</time></p>
        </>
      )}
      {status.state === 'unauthenticated' && <p>稼働状況を確認するには Cloudflare Access でログインしてください。</p>}
      {status.state === 'unavailable' && <p>API の稼働状況を取得できませんでした。</p>}
      <Link to="/">トップに戻る</Link>
    </>
  );
}
