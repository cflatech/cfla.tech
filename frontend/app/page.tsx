import { Main } from "../components/modules/article/main";

export default function Home(): JSX.Element {
  return (
    <div className="md:flex md:justify-center">
      {/* この辺にページ名称を入れるべきか */}
      <div className="max-w-screen-lg md:flex md:flex-auto">
        <main className="md:w-3/4">
          <Main />
        </main>
        <aside className="md:w-1/4">
          <div className="mx-3 my-3 rounded-md bg-white px-4 py-4">side</div>
        </aside>
      </div>
    </div>
  );
}
