import Layout from "../components/Layout/Layout";
import "../styles/scss/main.scss";
import React from "react";
import type { AppProps } from "next/app";
import Cursor from "../components/Cursor";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Cursor />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
