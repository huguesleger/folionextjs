import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ChangeWord from "./ChangeWord";

const Preloader = () => {
  const refWords = useRef(null);
  useEffect(() => {
    const loaderWrapper = document.querySelector(".loader-wrapper");
    const homepage = document.querySelector(".homepage");
    const intro = document.querySelector(".intro");
    let date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");

    if (localStorage.getItem("preloader") == date.toString()) {
      loaderWrapper.remove();
      intro.classList.add("is-show");
    }

    const tl = gsap.timeline();
    if (localStorage.getItem("preloader") != date.toString()) {
      tl.set(homepage, {
        visibility: "hidden",
      })
        .to(loaderWrapper, {
          opacity: 1,
          visibility: "visible",
          ease: "Power2.easeInOut",
          duration: 0.3,
        })
        .to(refWords.current, {
          yPercent: 100,
          opacity: 0,
          delay: 6,
          ease: "Power2.easeInOut",
          duration: 0.7,
        })
        .to(loaderWrapper, {
          opacity: 0,
          pointerEvents: "none",
          ease: "Power2.easeInOut",
          duration: 0.5,
          visibility: "hidden",
          onComplete: () => {
            intro.classList.add("is-show");
            gsap.to(homepage, {
              visibility: "visible",
            });
          },
        });
      localStorage.setItem("preloader", date.toString());
    }
  }, []);

  return (
    <div className="loader-wrapper">
      <div className="loader">
        <div className="loader-inner">
          <div className="wrap-words" ref={refWords}>
            <ChangeWord
              word1={"Hello"}
              word2={"En cours de chargement"}
              word3={"Salut"}
              word4={"Patience ça arrive"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
