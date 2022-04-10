import React, { useEffect } from "react";
import CountUp from "react-countup";
import gsap from "gsap";

const Preloader = () => {
  useEffect(() => {
    const loaderWrappper = document.querySelector(".loader-wrapper");
    const loaderNumber = document.querySelector(".loader-number");
    const intro = document.querySelector(".intro");
    const tl = gsap.timeline();

    tl.to(loaderNumber, {
      yPercent: 100,
      opacity: 0,
      delay: 1.5,
      ease: "Power2.easeInOut",
      duration: 0.7,
    }).to(loaderWrappper, {
      opacity: 0,
      pointerEvents: "none",
      ease: "Power2.easeInOut",
      duration: 0.5,
      onComplete: () => {
        intro.classList.add("is-show");
      },
    });
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
