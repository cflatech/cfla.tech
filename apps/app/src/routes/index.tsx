import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <>
      <p>再構築中</p>
      <Link to="/status">稼働状況</Link>
    </>
  );
}
