import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>CFLA.TECH</title>
      <meta name="description" content="CFLAT Blog" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
    </main>
  </div>
);

export default Home;
