import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

type ParallaxImageType = {
  imageTemplateMobile: {
    id: string;
    alt: string;
    url: string;
    width: string;
    height: string;
  };
};

const Parallax = ({ imageTemplateMobile }: ParallaxImageType): JSX.Element => {
  const parallaxImg = useRef(null);

  useEffect(() => {
    const img = document.querySelector(".wrap-img-mobile");
    const { clientWidth, clientHeight } = img;
    document.addEventListener("mousemove", (e) => {
      const xPos = e.offsetX / clientWidth - 0.5;
      const yPos = e.offsetY / clientHeight - 0.5;

      gsap.to(img, {
        duration: 1.2,
        x: xPos * 20,
        y: yPos * 60,
        ease: "Power2.easeInOu",
      });
    });
  });

  return (
    <div className="inner-template-mobile">
      <div className="wrap-img-mobile" ref={parallaxImg}>
        <Image
          className=""
          src={imageTemplateMobile.url}
          layout="responsive"
          width={imageTemplateMobile.width}
          height={imageTemplateMobile.height}
          alt={imageTemplateMobile.alt}
          data-scroll
          data-scroll-speed="3"
        />
      </div>
    </div>
  );
};

export default Parallax;
