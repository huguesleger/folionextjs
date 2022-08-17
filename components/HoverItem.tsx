import React, { useRef } from "react";
import gsap from "gsap";
import { clamp, getMousePos, lerp, map } from "./utils";
import SplittingWrapperWord from "./SplittingWrapperWord";
import Link from "next/link";
import { useRouter } from "next/router";

type HoverItemType = {
  titre: string;
  desc?: string;
  image: string;
  annee?: string;
  slug?: string;
  itemNumber?: string;
};

const HoverItem = ({
  titre,
  desc,
  image,
  annee,
  slug,
  itemNumber,
}: HoverItemType): JSX.Element => {
  const refHover = useRef(null);
  const refListItem = useRef(null);
  const refInner = useRef(null);

  const router = useRouter();

  let mousepos = { x: 0, y: 0 };

  let mousePosCache = mousepos;
  let direction = {
    x: mousePosCache.x - mousepos.x,
    y: mousePosCache.y - mousepos.y,
  };

  const mouseMove = (ev: any) => {
    const boundsItem = refListItem.current.getBoundingClientRect();
    const boundsReveal = refHover.current.getBoundingClientRect();

    const mouseDistanceX = clamp(
      Math.abs(mousePosCache.x - mousepos.x),
      0,
      100
    );
    direction = {
      x: mousePosCache.x - mousepos.x,
      y: mousePosCache.y - mousepos.y,
    };
    mousePosCache = { x: mousepos.x, y: mousepos.y };

    let animatableProperties = {
      tx: { previous: 0, current: 0, amt: 0.08 },
      ty: { previous: 0, current: 0, amt: 0.08 },
      rotation: { previous: 0, current: 0, amt: 0.04 },
    };

    const wW = window.innerWidth;

    if (wW >= 1100) {
      mousepos = getMousePos(ev);

      animatableProperties.rotation.current = map(
        mouseDistanceX,
        0,
        20,
        0,
        direction.x < 0 ? 60 : -60
      );

      animatableProperties.rotation.previous = lerp(
        animatableProperties.rotation.previous,
        animatableProperties.rotation.current,
        animatableProperties.rotation.amt
      );

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
        rotation: animatableProperties.rotation.previous,
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
      {slug != null ? (
        <>
          <Link href={`/${slug}`}>
            <a
              className={
                router.pathname === (`/${slug}` as string)
                  ? "item-link item-active"
                  : "item-link"
              }
            >
              <span className="item-number">
                <SplittingWrapperWord>{itemNumber}</SplittingWrapperWord>
              </span>
              <span className="item">
                <SplittingWrapperWord>{titre}</SplittingWrapperWord>
              </span>
            </a>
          </Link>
          <div className="hover-reveal" ref={refHover}>
            <div className="hover-reveal-inner" ref={refInner}>
              <div
                className="hover-reveal-img"
                style={{ backgroundImage: `url(${image})` }}
              ></div>
            </div>
          </div>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default HoverItem;
