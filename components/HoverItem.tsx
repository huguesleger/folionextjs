import React, { useRef } from "react";
import gsap from "gsap";
import { getMousePos } from "./utils";
import SplittingWrapperWord from "./SplittingWrapperWord";

type HoverItemType = {
  titre: string;
  desc: string;
  image: string;
  annee: string;
};

const HoverItem = ({
  titre,
  desc,
  image,
  annee,
}: HoverItemType): JSX.Element => {
  const refHover = useRef(null);
  const refListItem = useRef(null);
  const refInner = useRef(null);

  let mousepos = { x: 0, y: 0 };

  const mouseMove = (ev: any) => {
    const boundsItem = refListItem.current.getBoundingClientRect();
    const boundsReveal = refHover.current.getBoundingClientRect();

    const wW = window.innerWidth;

    if (wW >= 1100) {
      mousepos = getMousePos(ev);

      const tl = gsap.timeline({
        onStart: () => {
          gsap.set(refHover.current, {
            opacity: 1,
          });
        },
      });
      gsap.set(refHover.current, {
        x: Math.abs(mousepos.x - boundsItem.left) - boundsReveal.width / 2,
        y: Math.abs(mousepos.y - boundsItem.top) - boundsReveal.height / 2,
      });
      tl.to(refHover.current, {
        duration: 0.2,
        x: Math.abs(mousepos.x - boundsItem.left) - boundsReveal.width / 2,
        y: Math.abs(mousepos.y - boundsItem.top) - boundsReveal.height / 2,
      });
    }
  };

  const mouseEnter = () => {
    const wW = window.innerWidth;

    if (wW >= 1100) {
      gsap.set(refHover.current, {
        opacity: 0,
      });
      const tl = gsap.timeline();
      tl.fromTo(
        refInner.current,
        {
          scale: 0.3,
        },
        {
          duration: 1.2,
          ease: "Power2.easeOut",
          scale: 1,
        }
      );
    }
  };

  const mouseLeave = () => {
    const wW = window.innerWidth;

    if (wW >= 1100) {
      const tl = gsap.timeline();
      tl.to(refHover.current, {
        opacity: 0,
      });
    }
  };

  return (
    <div
      className="list-item"
      ref={refListItem}
      onMouseMove={mouseMove}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <div className="title-list">
        <h3>
          <SplittingWrapperWord>{titre}</SplittingWrapperWord>
        </h3>
        <p className="school-list">
          {desc}
          <span className="reveal-txt"></span>
        </p>
      </div>
      <div className="year-list">
        <p>
          {annee}
          <span className="reveal-txt"></span>
        </p>
      </div>
      <div className="hover-reveal" ref={refHover}>
        <div className="hover-reveal-inner" ref={refInner}>
          <div
            className="hover-reveal-img"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default HoverItem;
