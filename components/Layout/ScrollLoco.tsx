import React, { ReactNode, useRef } from "react";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { useRouter } from "next/router";
import gsap from "gsap";

type ScrollType = {
  children: ReactNode;
};

const ScrollLoco = ({ children }: ScrollType): JSX.Element => {
  const { asPath } = useRouter();
  const containerRef = useRef(null);

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
      }}
      watch={[]}
      onUpdate={(scroll: any) => {
        scroll.on("call", (value: any) => {
          const home = document.querySelector(".homepage");
          const tl = gsap.timeline();
          value === "updateBg" && home.classList.toggle("bg-dark");
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
        {children}
      </div>
    </LocomotiveScrollProvider>
  );
};

export default ScrollLoco;
