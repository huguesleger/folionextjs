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
import SharedLayoutData from "../context/MotionContext";

const variants = {
  hidden: { opacity: 1, x: 0, y: "0" },
  enter: { opacity: 1, x: 0, y: "0" },
  exit: { opacity: 1, x: 0, y: "0" },
};

// const blackBox = {
//   initial: {
//     opacity: 1,
//     height: "100vh",
//     top: 0,
//   },
//   animate: {
//     height: 0,
//     transition: {
//       duration: 1.5,
//       ease: [0.87, 0, 0.13, 1],
//     },
//   },
// };

const blackBox = {
  hidden: {
    height: "100vh",
    top: 0,
    y: "100%",
    transition: {
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
  enter: {
    y: "-100%",
    height: "100vh",
    transition: {
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
  exit: {
    y: "100%",
    height: "100vh",
    top: 0,
    transition: {
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

const rounded = {
  initial: {
    height: "10vh",
  },
  animate: {
    height: 0,
    transition: {
      delay: 0.4,
      duration: 1.5,
      ease: [0.62, 0.2, 0.29, 1.01],
    },
  },
};

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  const { asPath } = useRouter();
  const containerRef = useRef(null);
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
                  <div
                    className={
                      router.pathname == "/contact"
                        ? "page-content bg-dark-grey"
                        : "page-content"
                    }
                  >
                    <Component {...pageProps} key={router.pathname} />
                    <Footer />
                    <div className="wrap-transition">
                      <motion.div
                        key={router.pathname}
                        initial="hidden"
                        animate="enter"
                        exit="exit"
                        variants={blackBox}
                        className="transition-page"
                      >
                        <motion.div
                          className="rounded-top"
                          initial="initial"
                          animate="animate"
                          variants={rounded}
                        >
                          <div className="rounded"></div>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </AnimatePresence>
              </>
            ) : (
              <>
                <AnimatePresence initial={false} exitBeforeEnter>
                  <div className="page-content">
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
                    {!router.pathname.match(regexprojectSlug) ? (
                      <div className="wrap-transition">
                        <motion.div
                          key={router.pathname}
                          initial="hidden"
                          animate="enter"
                          exit="exit"
                          variants={blackBox}
                          className="transition-page"
                        >
                          <motion.div
                            initial="initial"
                            animate="animate"
                            variants={rounded}
                            className="rounded-top"
                          >
                            <div className="rounded"></div>
                          </motion.div>
                        </motion.div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
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
