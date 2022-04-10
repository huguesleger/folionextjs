import Layout from "../components/Layout/Layout";
import "../styles/scss/main.scss";
import type { AppProps } from "next/app";
import React, { useRef, useEffect } from "react";
import Cursor from "../components/Cursor";
import { useRouter } from "next/router";
// import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, x: 0, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 0 },
};

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  const { asPath } = useRouter();
  const regex = /(?:\/projets)/g;
  const containerRef = useRef(null);

  useEffect(() => {
    let scroll: any;
    import("locomotive-scroll").then((locomotiveModule) => {
      scroll = new locomotiveModule.default({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
        smoothMobile: false,
        resetNativeScroll: true,
      });
    });

    return () => scroll.destroy();
  });

  return (
    <>
      <Cursor />
      <Layout>
        <div data-scroll-container ref={containerRef}>
          <AnimatePresence initial={false} exitBeforeEnter>
            <motion.div
              key={router.route}
              initial="hidden"
              animate="enter"
              exit="exit"
              variants={variants}
              transition={{ type: "linear" }}
              className="page-anim"
            >
              <Component {...pageProps} key={router.route} />
            </motion.div>
          </AnimatePresence>
        </div>
      </Layout>
    </>
  );
}

export default MyApp;
