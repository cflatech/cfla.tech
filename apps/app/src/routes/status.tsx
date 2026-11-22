import { createFileRoute, Link } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';

const getServerStatus = createServerFn({ method: 'GET' }).handler(() => ({
  checkedAt: new Date().toISOString(),
}));

export const Route = createFileRoute('/status')({
  loader: () => getServerStatus(),
  component: Status,
});

function Status() {
  const { checkedAt } = Route.useLoaderData();

  return (
    <>
      <h1>稼働状況</h1>
      <p>サーバーは稼働中です。</p>
      <p>確認時刻（UTC） <time dateTime={checkedAt}>{checkedAt}</time></p>
      <Link to="/">トップに戻る</Link>
    </>
  );
}
