import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { request } from "../lib/datocms/datocms";
import Query from "../lib/datocms/queries";
import { GraphQLResponse } from "../lib/datocms/types";
import SplittingWrapperWord from "../components/SplittingWrapperWord";
import { clamp, getMousePos, lerp, map } from "../components/utils";
import gsap from "gsap";

const Contact: (props: { contact: GraphQLResponse.Contact }) => JSX.Element =
  (props: { contact: GraphQLResponse.Contact }) => {
    const refHover = useRef(null);
    const refTitle = useRef(null);
    const refInner = useRef(null);
    const refEmail = useRef(null);

    let mousepos = { x: 0, y: 0 };

    let mousePosCache = mousepos;
    let direction = {
      x: mousePosCache.x - mousepos.x,
      y: mousePosCache.y - mousepos.y,
    };

    const mouseMove = (ev: any) => {
      const boundsItem = refTitle.current.getBoundingClientRect();
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

    useEffect(() => {
      const char = document.querySelectorAll(
        ".title-contact .wrapper-word .char"
      );

      const tlSettings = {
        staggerVal: 0.015,
        charsDuration: 0.7,
      };
      const tl = gsap.timeline();

      tl.set(char, {
        yPercent: 100,
        opacity: 0,
      })
        .set(refEmail.current, {
          opacity: 0,
        })
        .to(char, {
          yPercent: 0,
          opacity: 1,
          delay: 1,
          ease: "Power2.easeInOut",
          duration: tlSettings.charsDuration,
          stagger: tlSettings.staggerVal,
          onComplete: () => {
            gsap.to(refEmail.current, {
              opacity: 1,
              ease: "Power2.easeInOut",
              duration: 0.3,
            });
          },
        });
    }, []);

    return (
      <div className="contact bg-dark-grey">
        <div
          className="section section-hero"
          ref={refTitle}
          onMouseMove={mouseMove}
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
        >
          <div className="container">
            <div className="title-contact">
              <h1 className="title">
                <SplittingWrapperWord>
                  {props.contact.titre}
                </SplittingWrapperWord>
              </h1>
            </div>
          </div>
          <div className="hover-reveal" ref={refHover}>
            <div className="hover-reveal-inner" ref={refInner}>
              <div
                className="hover-reveal-img"
                style={{
                  backgroundImage: `url(${props.contact.image.url})`,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="section section-email">
          <div className="container">
            <div className="contact-email">
              <Link href={`mailto:${props.contact.email}`}>
                <a className="wrap-cta" ref={refEmail}>
                  <span className="link-arrow">
                    <Image
                      src="/images/link-arrow-white.svg"
                      layout="intrinsic"
                      width={24}
                      height={24}
                      alt=""
                    />
                  </span>
                  <span className="link-white">{props.contact.email}</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Contact;

export async function getStaticProps() {
  const res = (await request(
    Query.QUERY_CONTACT
  )) as GraphQLResponse.ContactPage;
  return {
    props: {
      contact: res.contact,
    },
  };
}
