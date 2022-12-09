/* eslint-disable react/jsx-props-no-spreading */
import { Global } from "@emotion/react";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { global } from "../styles/global";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Global styles={[global]} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
