import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../context/AppContext";
import { SharedLayoutDataContext } from "../../context/MotionContext";

type LastWorkType = {
  titre: string;
  typeProjet: string;
  slug: string;
  target: number;
  image: {
    id: string;
    alt: string;
    url: string;
    width: string;
    height: string;
  };
};

const LastWorkV2 = ({
  titre,
  typeProjet,
  slug,
  image,
  target,
}: LastWorkType): JSX.Element => {
  return (
    <>
      <div className="img-work">
        <Image
          src={image.url}
          layout="responsive"
          width={image.width}
          height={image.height}
          alt={image.alt}
        />
      </div>
    </>
  );
};

export default LastWorkV2;
