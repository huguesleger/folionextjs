import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

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
    const title = document.querySelector(".title-project");
    const blockInfo = document.querySelectorAll(".block-info");

    const tl = gsap.timeline();
    tl.set(title, {
      yPercent: 100,
      rotate: 3,
      opacity: 0,
    })
      .set(blockInfo, {
        yPercent: 100,
        opacity: 0,
      })
      .to(title, {
        yPercent: 0,
        rotate: 0,
        opacity: 1,
        delay: 0.6,
        ease: "Power2.easeInOut",
        duration: 0.8,
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
    <div className="container">
      <div className="wrap-title">
        <div className="inner-title">
          <h1 className="title-project">{titre}</h1>
        </div>
      </div>
      <div className="wrap-infos">
        <div className="block-info">
          <p className="title-info">Site web</p>
          <Link href={`https://${siteWeb}`}>
            <a className="wrap-cta">
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
    </div>
  );
};

export default HeaderProject;
