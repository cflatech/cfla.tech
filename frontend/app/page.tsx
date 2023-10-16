export default function Home(): JSX.Element {
  return (
    <div className="md:flex md:justify-center">
      <div className="max-w-screen-lg md:flex md:flex-auto">
        <main className="md:w-3/4">
          <article className="mx-3 my-3 rounded-md bg-white px-4 py-4">
            main
          </article>
        </main>
        <aside className="md:w-1/4">
          <div className="mx-3 my-3 rounded-md bg-white px-4 py-4">side</div>
        </aside>
      </div>
    </div>
  );
}
