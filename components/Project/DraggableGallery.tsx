import { gsap } from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import React, { useEffect, useRef } from "react";

type DragImageType = {
  imagePage: {
    alt: string;
    url: string;
    width: string;
    height: string;
  };
};

export const DragGallery = ({ imagePage }: DragImageType): JSX.Element => {
  return (
    <Image
      className=""
      src={imagePage.url}
      layout="fill"
      objectFit="cover"
      quality={100}
      alt={imagePage.alt}
    />
  );
};

export default DragGallery;
