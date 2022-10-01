import Layout from "../components/Layout/Layout";
import "../styles/scss/main.scss";
import type { AppProps } from "next/app";
import React, { useContext, useRef, useState } from "react";
import Cursor from "../components/Cursor";
import { useRouter } from "next/router";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { AnimatePresence, motion } from "framer-motion";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { Context } from "../context/AppContext";
import gsap from "gsap";
import Footer from "../components/Layout/Footer";

const variants = {
  hidden: { opacity: 0, x: 0, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 0 },
};

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  const { asPath } = useRouter();
  const containerRef = useRef(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [navBar, setNavBar] = useState(false);

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
        <Layout>
          {router.pathname == "/projets" || router.pathname == "/contact" ? (
            <>
              <AnimatePresence initial={false} exitBeforeEnter>
                <motion.div
                  key={router.pathname}
                  initial="hidden"
                  animate="enter"
                  exit="exit"
                  variants={variants}
                  transition={{ type: "linear" }}
                  className="page-content"
                >
                  <Component {...pageProps} key={router.pathname} />
                  <Footer />
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            <>
              <AnimatePresence initial={false} exitBeforeEnter>
                <motion.div
                  key={router.pathname}
                  initial="hidden"
                  animate="enter"
                  exit="exit"
                  variants={variants}
                  transition={{ type: "linear" }}
                  className="page-content"
                >
                  <LocomotiveScrollProvider
                    options={{
                      smooth: true,
                    }}
                    watch={[]}
                    onUpdate={(scroll: any) => {
                      scroll.on("call", (value: any) => {
                        const home = document.querySelector(".homepage");
                        const tl = gsap.timeline();
                        value === "updateBg" &&
                          home.classList.toggle("bg-dark");
                        if (home.classList.contains("bg-dark")) {
                          tl.to(home, {
                            backgroundColor: "#171717",
                            ease: "Power2.easeInOut",
                            duration: 0.7,
                          });
                        } else {
                          tl.to(home, {
                            backgroundColor: "#ffffff",
                            ease: "Power2.easeInOut",
                            duration: 0.7,
                          });
                        }
                      });
                      const header = document.querySelector(".header");
                      const btnNav = document.querySelector(".wrap-btn-main");
                      const windowWidth = window.innerWidth;
                      if (windowWidth <= 1023) {
                        btnNav.classList.remove("is-hide");
                      }
                      if (windowWidth >= 1024) {
                        if (header && btnNav) {
                          if (scroll) {
                            scroll.on("scroll", () => {
                              if (scroll.scroll.instance.scroll.y > 10) {
                                header.classList.add("is-hide");
                                btnNav.classList.remove("is-hide");
                                btnNav.classList.add("is-show");
                              } else {
                                header.classList.remove("is-hide");
                                btnNav.classList.remove("is-show");
                                btnNav.classList.add("is-hide");
                              }
                            });
                          }
                        }
                      }
                    }}
                    location={asPath}
                    onLocationChange={(scroll: any) => {
                      scroll.scrollTo(0, {
                        duration: 800,
                        disableLerp: true,
                      });
                    }}
                    containerRef={containerRef}
                  >
                    <div data-scroll-container ref={containerRef}>
                      <Component {...pageProps} key={router.pathname} />
                      <Footer />
                    </div>
                  </LocomotiveScrollProvider>
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </Layout>
      </Context.Provider>
    </>
  );
}

export default MyApp;
