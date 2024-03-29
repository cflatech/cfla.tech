import { css } from "@emotion/react";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import { Article } from "../../components/Article/Content";
import { Sidebar } from "../../components/Sidebar";
import { styles } from "../../styles/styles";

const content = css`
  display: flex;
  justify-content: center;
  @media (max-width: 900px) {
    flex-wrap: wrap;
  }
  margin-bottom: 10px;
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

type Props = {
  id: string;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Home = ({ id }: Props) => (
  <>
    <Head>
      <title>CFLA.TECH</title>
      <meta name="description" content="CFLAT Blog" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <link rel="icon" href="/cflat.svg" type="image/svg+xml" />
    </Head>
    <div css={content}>
      <main css={main}>
        <Article id={id} />
      </main>
      <aside css={aside}>
        <Sidebar />
      </aside>
    </div>
  </>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  if (typeof id !== "string") {
    return {
      notFound: true,
    };
  }

  const props: Props = {
    id,
  };

  return {
    props,
  };
};

export default Home;
