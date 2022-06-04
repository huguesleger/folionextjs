import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import SplittingWrapperWord from "../SplittingWrapperWord";

type HeaderProjectType = {
  titre: string;
  siteWeb: string;
  intervention: string;
  annee: string;
};

const HeaderProject = ({
  titre,
  siteWeb,
  intervention,
  annee,
}: HeaderProjectType): JSX.Element => {
  useEffect(() => {
    const blockInfo = document.querySelectorAll(".block-info");
    const char = document.querySelectorAll(".wrapper-word .char");
    const tlSettings = {
      staggerVal: 0.015,
      charsDuration: 0.7,
    };

    const tl = gsap.timeline();
    tl.set(char, {
      yPercent: 100,
      opacity: 0,
    })
      .set(blockInfo, {
        yPercent: 100,
        opacity: 0,
      })
      .to(char, {
        yPercent: 0,
        opacity: 1,
        delay: 0.6,
        ease: "Power2.easeInOut",
        duration: tlSettings.charsDuration,
        stagger: tlSettings.staggerVal,
      })
      .to(blockInfo, {
        yPercent: 0,
        opacity: 1,
        ease: "Power2.easeInOut",
        duration: 0.8,
        stagger: 0.1,
      });
  });

  return (
    <>
      <div className="wrap-title container">
        <div className="inner-title">
          <h1 className="title-project">
            <SplittingWrapperWord>{titre}</SplittingWrapperWord>
          </h1>
        </div>
      </div>
      <div className="wrap-infos container">
        <div className="block-info">
          <p className="title-info">Site web</p>
          <Link href={`https://${siteWeb}`}>
            <a className="wrap-cta" target="_blank" rel="noopener noreferrer">
              <span className="link-underline link-white">Voir le site</span>
              <span className="link-arrow">
                <Image
                  src="/images/link-arrow-white.svg"
                  layout="intrinsic"
                  width={24}
                  height={24}
                  alt="Voir le site"
                />
              </span>
            </a>
          </Link>
        </div>
        <div className="block-info">
          <p className="title-info">Intervention</p>
          <p>{intervention}</p>
        </div>
        <div className="block-info">
          <p className="title-info">Année</p>
          <p>{annee}</p>
        </div>
      </div>
    </>
  );
};

export default HeaderProject;
