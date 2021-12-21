import Layout from "../components/Layout/Layout";
import "../styles/scss/main.scss";
import React from "react";
import Cursor from "../components/Cursor";

function MyApp({ Component, pageProps }) {
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
