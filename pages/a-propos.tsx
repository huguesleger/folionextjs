import React, { useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap/dist/gsap";
import SplittingWrapperWord from "../components/SplittingWrapperWord";

function APropos() {
  useEffect(() => {
    const char = document.querySelectorAll(".wrapper-word .char");
    const tlSettings = {
      staggerVal: 0.015,
      charsDuration: 0.7,
    };
    const tl = gsap.timeline();
    tl.set(char, {
      yPercent: 100,
      opacity: 0,
    }).to(char, {
      yPercent: 0,
      opacity: 1,
      delay: 1,
      ease: "Power2.easeInOut",
      duration: tlSettings.charsDuration,
      stagger: tlSettings.staggerVal,
    });
  }, []);

  return (
    <div className="about">
      <div className="section section-title" data-scroll-section>
        <div className="container">
          <div className="title-about">
            <h1 className="title">
              <SplittingWrapperWord>A propos</SplittingWrapperWord>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default APropos;
