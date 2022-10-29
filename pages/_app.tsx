import Layout from "../components/Layout/Layout";
import "../styles/scss/main.scss";
import type { AppProps } from "next/app";
import React, { useState } from "react";
import Cursor from "../components/Cursor";
import { AnimatePresence } from "framer-motion";
import { Context } from "../context/AppContext";
import Footer from "../components/Layout/Footer";
import SharedLayoutData from "../context/MotionContext";
import ScrollLoco from "../components/Layout/ScrollLoco";
import TransitionPage from "../components/Layout/TransitionPage";

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [navBar, setNavBar] = useState(false);
  const regexprojectSlug = /(?:\/projets\/)/g;

  const handleDarkMode = (value: boolean) => {
    setIsDarkTheme(value);
  };

  const handleNavBar = (value: boolean) => {
    setNavBar(value);
  };

  const appValue = {
    isDarkTheme,
    navBar,
    setIsDarkTheme: handleDarkMode,
    setNavBar: handleNavBar,
  };

  return (
    <>
      <Context.Provider value={appValue}>
        <Cursor />
        <SharedLayoutData>
          <Layout>
            {router.pathname == "/projets" || router.pathname == "/contact" ? (
              <>
                <AnimatePresence initial={false} exitBeforeEnter>
                  <main
                    key={router.pathname}
                    className={
                      router.pathname == "/contact"
                        ? "page-content bg-dark-grey"
                        : "page-content"
                    }
                  >
                    <Component {...pageProps} key={router.pathname} />
                    <Footer />
                    <div className="wrap-transition">
                      <TransitionPage key={router.pathname} />
                    </div>
                  </main>
                </AnimatePresence>
              </>
            ) : (
              <>
                <AnimatePresence initial={false} exitBeforeEnter>
                  <main key={router.pathname} className="page-content">
                    <ScrollLoco>
                      <Component {...pageProps} key={router.pathname} />
                      <Footer />
                    </ScrollLoco>

                    {!router.pathname.match(regexprojectSlug) ? (
                      <div className="wrap-transition">
                        <TransitionPage key={router.pathname} />
                      </div>
                    ) : (
                      <></>
                    )}
                  </main>
                </AnimatePresence>
              </>
            )}
          </Layout>
        </SharedLayoutData>
      </Context.Provider>
    </>
  );
}

export default MyApp;
