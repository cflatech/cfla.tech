import { css } from "@emotion/react";
import type { NextPage } from "next";
import Head from "next/head";
import { styles } from "../styles/styles";

const content = css`
  display: flex;
  justify-content: center;
  max-width: ${styles.layouts.maxWidth};
`;

const main = css`
  flex-basis: 2/3;
`;

const aside = css`
  flex-basis: 1/3;
`;

const Home: NextPage = () => (
  <div css={content}>
    <Head>
      <title>CFLA.TECH</title>
      <meta name="description" content="CFLAT Blog" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    </Head>
    <main css={main}>hoge</main>
    <aside css={aside}>fuga</aside>
  </div>
);

export default Home;
