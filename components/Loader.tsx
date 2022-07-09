import React, { useEffect } from "react";
import CountUp from "react-countup";
import gsap from "gsap";

const Preloader = () => {
  useEffect(() => {
    const loaderWrapper = document.querySelector(".loader-wrapper");
    const loaderNumber = document.querySelector(".loader-number");
    const intro = document.querySelector(".intro");
    let date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
    console.log(date);

    if (localStorage.getItem("preloader") == date.toString()) {
      loaderWrapper.remove();
      intro.classList.add("is-show");
    }

    const tl = gsap.timeline();

    if (localStorage.getItem("preloader") != date.toString()) {
      tl.to(loaderNumber, {
        yPercent: 100,
        opacity: 0,
        delay: 1.5,
        ease: "Power2.easeInOut",
        duration: 0.7,
      }).to(loaderWrapper, {
        opacity: 0,
        pointerEvents: "none",
        ease: "Power2.easeInOut",
        duration: 0.5,
        onComplete: () => {
          intro.classList.add("is-show");
        },
      });
      localStorage.setItem("preloader", date.toString());
    }
  }, []);

  return (
    <div className="loader-wrapper">
      <div className="loader">
        <div className="loader-inner">
          <CountUp
            className="loader-number"
            duration={1}
            end={100}
            suffix="%"
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
