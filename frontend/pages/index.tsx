import { css } from "@emotion/react";
import type { NextPage } from "next";
import Head from "next/head";
import { List } from "../components/ArticleList/List";
import { Sidebar } from "../components/ArticleList/Sidebar";
import { styles } from "../styles/styles";

const content = css`
  display: flex;
  justify-content: center;
`;

const main = css`
  max-width: calc(2 * ${styles.layouts.maxWidth}px / 3);
  flex-basis: calc(2 * 100% / 3);
`;

const aside = css`
  max-width: calc(${styles.layouts.maxWidth}px / 3);
  flex-basis: calc(100% / 3);
`;

const Home: NextPage = () => (
  <>
    <Head>
      <title>CFLA.TECH</title>
      <meta name="description" content="CFLAT Blog" />
      <link rel="icon" href="/cflat.svg" type="image/svg+xml" />
    </Head>
    <div css={content}>
      <main css={main}>
        <List />
      </main>
      <aside css={aside}>
        <Sidebar />
      </aside>
    </div>
  </>
);

export default Home;
