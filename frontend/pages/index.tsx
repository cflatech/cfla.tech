import { css } from "@emotion/react";
import type { NextPage } from "next";
import Head from "next/head";
import { List } from "../components/ArticleList/List";
import { Pagination } from "../components/ArticleList/List/Pagination";
import { Sidebar } from "../components/ArticleList/Sidebar";
import { styles } from "../styles/styles";

const content = css`
  display: flex;
  justify-content: center;
  @media (max-width: 900px) {
    flex-wrap: wrap;
  }
`;

const main = css`
  max-width: calc(2 * ${styles.layouts.maxWidth}px / 3);
  flex-basis: calc(2 * 100% / 3);
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 900px) {
    max-width: none;
    width: 100%;
    flex-basis: auto;
  }
`;

const aside = css`
  max-width: calc(${styles.layouts.maxWidth}px / 3);
  flex-basis: calc(100% / 3);

  @media (max-width: 900px) {
    max-width: none;
    width: 100%;
    flex-basis: auto;
  }
`;

const Home: NextPage = () => (
  <>
    <Head>
      <title>CFLA.TECH</title>
      <meta name="description" content="CFLAT Blog" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <link rel="icon" href="/cflat.svg" type="image/svg+xml" />
    </Head>
    <div css={content}>
      <main css={main}>
        <List />
        <Pagination />
      </main>
      <aside css={aside}>
        <Sidebar />
      </aside>
    </div>
  </>
);

export default Home;
