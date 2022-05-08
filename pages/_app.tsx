import Layout from "../components/Layout/Layout";
import "../styles/scss/main.scss";
import type { AppProps } from "next/app";
import React, { useRef, useEffect, createRef, useState } from "react";
import Cursor from "../components/Cursor";
import { useRouter } from "next/router";
// import { LocomotiveScrollProvider } from "react-locomotive-scroll";
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
  // const regex = /(?:\/projets[^\/])/g;
  const regex = /(?:\/projets\/)/g;
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleDarkMode = (value: boolean) => {
    setIsDarkTheme(value);
  };

  const appValue = {
    isDarkTheme,
    setIsDarkTheme: handleDarkMode,
  };

  useEffect(() => {
    // window.dispatchEvent(new Event("resize")), [Component];
    // let scroll: any;
    // import("locomotive-scroll").then((locomotiveModule) => {
    //   scroll = new locomotiveModule.default({
    //     el: document.querySelector("[data-scroll-container]"),
    //     smooth: true,
    //     smoothMobile: false,
    //     resetNativeScroll: true,
    //   });
    // });
    // return () => scroll.destroy();
  }, []);

  useEffect(() => {
    // const locomotiveScroll = new LocomotiveScroll({
    //   el: document.querySelector(myScrollContainer)
    // })
    // scroll.on("call", (value) => {
    //   value === "updateBg" && console.log("Scroll function called");
    //   // value === "updateBg" && document.body.classList.add("dark-theme");
    // });
  }, []);

  return (
    // <>
    //   <Cursor />
    //   <Layout>
    //     <LocomotiveScrollProvider
    //       options={{
    //         smooth: true,
    //       }}
    //       watch={[]}
    //       location={asPath}
    //       onLocationChange={(scroll: any) =>
    //         scroll.scrollTo(0, { duration: 0, disableLerp: true })
    //       }
    //       containerRef={containerRef}
    //     >
    //       <div data-scroll-container ref={containerRef}>
    //         <AnimatePresence initial={false} exitBeforeEnter>
    //           <motion.div
    //             key={router.route}
    //             initial="hidden"
    //             animate="enter"
    //             exit="exit"
    //             variants={variants}
    //             transition={{ type: "linear" }}
    //             className="page-content"
    //           >
    //             <Component {...pageProps} key={router.route} />
    //           </motion.div>
    //         </AnimatePresence>
    //       </div>
    //     </LocomotiveScrollProvider>
    //   </Layout>
    // </>

    // <>
    //   <Cursor />
    //   <Layout>
    //     <RLSProvider
    //       options={{
    //         smooth: true,
    //       }}
    //       watch={[]}
    //       location={asPath}
    //       onLocationChange={(scroll: any) =>
    //         scroll.scrollTo(0, { duration: 0, disableLerp: true })
    //       }
    //       containerRef={containerRef}
    //     >
    //       <div data-scroll-container ref={containerRef}>
    //         <AnimatePresence initial={false} exitBeforeEnter>
    //           <motion.div
    //             key={router.route}
    //             initial="hidden"
    //             animate="enter"
    //             exit="exit"
    //             variants={variants}
    //             transition={{ type: "linear" }}
    //             className="page-content"
    //           >
    //             <Component {...pageProps} key={router.route} />
    //           </motion.div>
    //         </AnimatePresence>
    //       </div>
    //     </RLSProvider>
    //   </Layout>
    // </>

    <>
      <Context.Provider value={appValue}>
        <Cursor />
        <Layout>
          {/* {!router.pathname.match(regex) ? ( */}
          {router.pathname == "/projets" ? (
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
                    onUpdate={(scroll: any) =>
                      scroll.on("call", (value) => {
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
                      })
                    }
                    location={asPath}
                    onLocationChange={(scroll: any) =>
                      scroll.scrollTo(0, {
                        duration: 800,
                        disableLerp: true,
                      })
                    }
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
