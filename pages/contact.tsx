import React, { useRef, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { request } from "../lib/datocms/datocms";
import Query from "../lib/datocms/queries";
import { GraphQLResponse } from "../lib/datocms/types";
import SplittingWrapperWord from "../components/SplittingWrapperWord";
import { clamp, getMousePos, lerp, map } from "../components/utils";
import gsap from "gsap";
import { Context } from "../context/AppContext";

const Contact: (props: { contact: GraphQLResponse.Contact }) => JSX.Element =
  (props: { contact: GraphQLResponse.Contact }) => {
    const { setNavBar } = useContext(Context);
    const refEmail = useRef(null);

    useEffect(() => {
      setNavBar(true);
    });

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
          visibility: "visible",
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
        <div className="section section-hero">
          <div className="container">
            <div className="title-contact">
              <h1 className="title">
                <SplittingWrapperWord>
                  {props.contact.titre}
                </SplittingWrapperWord>
              </h1>
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
                  <span className="link-white" data-cursor-label="Click">
                    {props.contact.email}
                  </span>
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
