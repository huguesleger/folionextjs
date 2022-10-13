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

const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };
const transition2 = { duration: 0.3, ease: [0.6, 0.01, -0.05, 0.9] };

const LastWork = ({
  titre,
  typeProjet,
  slug,
  image,
  target,
}: LastWorkType): JSX.Element => {
  const refImageLink = useRef(null);
  const refInfos = useRef(null);
  const refWrapImg = useRef(null);

  // const { setWidth, setHeight, setX, y, setY } = useContext(Context);
  // const [width, setWidth] = useState(0);
  // const [height, setHeight] = useState(0);
  // const [x, setX] = useState(0);
  // const [y, setY] = useState(0);

  const { setCurrent, current, setValue } = useContext(SharedLayoutDataContext);

  const handleClick = () => {
    const homePage = document.querySelector(".light-mode .homepage");
    homePage.classList.add("in-transition");
    refWrapImg.current.classList.add("is-full");
    const rect = refWrapImg.current.getBoundingClientRect();
    setCurrent(`/projets/${slug}`);

    setValue({
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
    });
  };

  return (
    <>
      <motion.div
        className="col-work-infos"
        ref={refInfos}
        // exit={{
        //   width: "0",
        //   opacity: "0",
        //   transition: { delay: 0, ...transition2 },
        // }}
      >
        <div
          className="wrap-infos"
          data-scroll
          data-scroll-sticky
          data-scroll-target={`#work${target}`}
        >
          <h3 className="title-work">{titre}</h3>
          <p className="type-work">{typeProjet}</p>
          <Link href={`/projets/${slug}`}>
            <a className="wrap-cta">
              <span className="link-underline link-white">Voir le projet</span>
              <span className="link-arrow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="395.36"
                  height="302.4"
                  viewBox="0 0 395.36 302.4"
                >
                  <path d="M220.08,23.52,331,134.4H0V168H331L220.08,278.88l24.08,23.52,151.2-151.2L244.16,0Z" />
                </svg>
              </span>
            </a>
          </Link>
        </div>
      </motion.div>
      <motion.div
        className="col-work"
        // exit={{
        //   width: "100%",
        //   transition: { delay: 0, ...transition2 },
        // }}
      >
        <div
          className="wrap-img"
          ref={refWrapImg}
          // exit={{
          //   width: 380,
          //   height: 500,
          //   scale: 0.9075,
          //   transition: { delay: 0, ...transition2 },
          // }}
        >
          <div className="inner-img">
            <Link href={`/projets/${slug}`}>
              <a
                className="link-img-work"
                ref={refImageLink}
                onClick={handleClick}
              >
                <Image
                  className="img-work"
                  src={image.url}
                  layout="responsive"
                  width={image.width}
                  height={image.height}
                  // layout="fill"
                  // objectFit="cover"
                  // quality={100}
                  alt={image.alt}
                  data-cursor-label="Voir le projet"
                  // data-scroll
                  // data-scroll-speed="-3"
                />
              </a>
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default LastWork;
