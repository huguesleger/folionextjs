import React, { useContext, useEffect, useRef } from "react";
import { gsap } from "gsap/dist/gsap";
import SplittingWrapperWord from "../components/SplittingWrapperWord";
import HoverItem from "../components/HoverItem";
import Image from "next/image";
import CircleText from "../components/CircleText";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import Link from "next/link";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { request } from "../lib/datocms/datocms";
import Query from "../lib/datocms/queries";
import { GraphQLResponse } from "../lib/datocms/types";
import { StructuredText } from "react-datocms";
import { Context } from "../context/AppContext";

gsap.registerPlugin(ScrollTrigger);

const APropos: (props: { about: GraphQLResponse.About }) => JSX.Element =
  (props: { about: GraphQLResponse.About }) => {
    const { setNavBar } = useContext(Context);

    useEffect(() => {
      setNavBar(true);
    });

    const refCursus = useRef(null);
    const refSectionCursus = useRef(null);
    const refContact = useRef(null);
    const refRoundedContact = useRef(null);
    const refWrapContact = useRef(null);
    const refRevealImg = useRef(null);
    const { scroll } = useLocomotiveScroll();

    useEffect(() => {
      const char = document.querySelectorAll(
        ".title-about .wrapper-word .char"
      );

      const tlSettings = {
        staggerVal: 0.015,
        charsDuration: 0.7,
      };
      const tl = gsap.timeline();

      tl.set(char, {
        yPercent: 100,
        opacity: 0,
      }).to(char, {
        yPercent: 0,
        opacity: 1,
        delay: 1,
        ease: "Power2.easeInOut",
        duration: tlSettings.charsDuration,
        stagger: tlSettings.staggerVal,
        onComplete: () => {
          gsap.to(refRevealImg.current, {
            yPercent: 100,
            ease: "Power4.easeInOut",
            duration: 0.8,
            delay: 1,
          });
        },
      });
    }, []);

    useEffect(() => {
      const textSvg = document.querySelectorAll(".circles-text");
      const wrapCircleAnim = document.querySelector(".circle-txt-anim");
      const windowWidth = window.innerWidth;

      if (windowWidth >= 1200) {
        if (scroll) {
          scroll.on("scroll", (instance: any) => {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: wrapCircleAnim,
                start: "0% 100%",
                end: "100% 0%",
                scrub: 0,
              },
            });
            tl.set(textSvg, {
              rotate: 0,
            });
            tl.to(textSvg, {
              rotate: -180,
              ease: "power1",
              stagger: 0.015,
              transformOrigin: "50%, 50%",
            });
          });
        }
      } else {
        if (scroll) {
          scroll.on("scroll", (instance: any) => {
            const tl = gsap.timeline();
            tl.set(textSvg, {
              rotate: 0,
            });
            tl.to(textSvg, {
              rotate: scroll.scroll.instance.scroll.y,
              ease: "power1",
              stagger: 0.015,
              transformOrigin: "50%, 50%",
            });
          });
        }
      }
    }, [scroll]);

    useEffect(() => {
      const windowWidth = window.innerWidth;
      let heightRound: any;
      let easeRound: any;
      if (windowWidth >= 1200) {
        heightRound = 94;
      } else {
        heightRound = 35;
      }
      if (scroll) {
        scroll.on("scroll", (instance: any) => {
          if (refContact.current.classList.contains("is-inview")) {
            let tl = gsap.timeline({
              scrollTrigger: {
                trigger: refWrapContact.current,
                start: "0% 100%",
                end: "100% 100%",
                scrub: 0,
              },
            });
            tl.set(refRoundedContact.current, {
              height: heightRound,
            });
            tl.to(refRoundedContact.current, {
              height: 0,
              ease: "none",
            });
          }
        });
      }
    }, [scroll]);

    return (
      <div className="about">
        <div className="section" data-scroll-section>
          <div className="container">
            <div className="title-about">
              <h1 className="title">
                <SplittingWrapperWord>{props.about.titre}</SplittingWrapperWord>
              </h1>
            </div>
            <div className="wrap-bio">
              <div className="wrap-desc">
                <div className="col-txt">
                  <div className="inner-title">
                    <h2
                      className="section-title"
                      data-scroll
                      data-scroll-speed="2"
                    >
                      {props.about.titreBio}
                      <span className="icon-emoji ml-1">
                        {props.about.iconBio}
                      </span>
                    </h2>
                  </div>
                  <div className="inner-txt">
                    <div data-scroll data-scroll-speed="3">
                      <StructuredText data={props.about.texteBio} />
                    </div>
                  </div>
                </div>
                <div className="col-img">
                  <div className="inner-img">
                    <Image
                      className="thumb"
                      src={props.about.imageBio.url}
                      layout="responsive"
                      width={props.about.imageBio.width}
                      height={props.about.imageBio.height}
                      alt={props.about.imageBio.alt}
                      data-scroll
                      data-scroll-speed="-3"
                    />
                    <div className="reveal-img" ref={refRevealImg}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="circle-txt-anim bg-dark-grey"
          data-scroll-section
          data-scroll
          data-scroll-repeat
        >
          <div className="container">
            <div className="wrap-circle-txt">
              <CircleText
                txt={props.about.texteCircle[0].texte}
                txt2={props.about.texteCircle[1].texte}
                txt3={props.about.texteCircle[2].texte}
                txt4={props.about.texteCircle[3].texte}
              />
            </div>
          </div>
        </div>
        <section
          className="section section-cursus"
          data-scroll-section
          ref={refSectionCursus}
        >
          <div className="container">
            <div className="wrap-title">
              <h2 className="section-title" data-scroll data-scroll-speed="2">
                {props.about.titreCursus}
              </h2>
            </div>
          </div>
          <div className="container">
            <div
              className="list-cursus"
              ref={refCursus}
              data-scroll
              data-scroll-speed="6"
            >
              {props.about.listeCursus.map((el) => {
                return (
                  <div className="wrap-list-item" key={el.id}>
                    <HoverItem
                      titre={el.titre}
                      school={el.ecole}
                      annee={el.annee}
                      image={el.image.url}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <div className="section" data-scroll-section>
          <div className="infinite-keywords">
            <h3 className="keywords">
              {props.about.titreCompetence.map((el) => {
                return (
                  <span className="wrap-keyword" key={el.id}>
                    {el.titre}
                    <span className="separate-keyword">
                      <i className={el.icon} aria-hidden></i>
                    </span>
                  </span>
                );
              })}
            </h3>
            <p className="keywords">
              {props.about.titreCompetence.map((el) => {
                return (
                  <span className="wrap-keyword" key={el.id}>
                    {el.titre}
                    <span className="separate-keyword">
                      <i className={el.icon} aria-hidden></i>
                    </span>
                  </span>
                );
              })}
            </p>
          </div>
        </div>
        <section className="section section-services" data-scroll-section>
          <div className="container container-services">
            <div className="wrap-services">
              {props.about.listeCompetence.map((el) => {
                return (
                  <div className="inner-service" key={el.id}>
                    <p className="number-service">{el.number}</p>
                    <div className="desc-service">
                      <h3>
                        <i className={`${el.icon} mr-1`} aria-hidden></i>
                        {el.titre}
                      </h3>
                      <div>
                        <StructuredText data={el.description} />
                      </div>
                    </div>
                  </div>
                );
              })}
              {props.about.listeCompetenceItems.map((el) => {
                return (
                  <div className="inner-service" key={el.id}>
                    <p className="number-service">{el.number}</p>
                    <div className="desc-service">
                      <h3>
                        <i className={`${el.icon} mr-1`} aria-hidden></i>
                        {el.titre}
                      </h3>
                      <div className="wrap-list">
                        <ul>
                          {el.listeServiceLeft.map((item) => {
                            return <li key={item.id}>{item.texte}</li>;
                          })}
                        </ul>
                        <ul>
                          {el.listeServiceCenter.map((item) => {
                            return <li key={item.id}>{item.texte}</li>;
                          })}
                        </ul>
                        <ul>
                          {el.listeServiceRight.map((item) => {
                            return <li key={item.id}>{item.texte}</li>;
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <div
          className="contact-rounded"
          data-scroll-section
          data-scroll
          data-scroll-repeat
          ref={refContact}
        >
          <div className="rounded-top" ref={refRoundedContact}>
            <div className="rounded"></div>
          </div>
        </div>
        <div
          className="wrap-contact bg-dark-grey"
          data-scroll-section
          data-scroll
          data-scroll-repeat
          ref={refWrapContact}
        >
          <div
            className="inner-contact"
            data-scroll
            data-scroll-speed="-4"
            data-scroll-position="bottom"
          >
            <div className="container">
              <div className="wrap-title">
                <h2 className="title-contact">{props.about.titreContact}</h2>
              </div>
              <div className="wrap-mail">
                <div className="link-mail">
                  <Link href={`mailto:${props.about.emailContact}`}>
                    <a data-cursor-big>{props.about.emailContact}</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default APropos;

export async function getStaticProps() {
  const res = (await request(Query.QUERY_ABOUT)) as GraphQLResponse.AboutPage;
  return {
    props: {
      about: res.about,
    },
  };
}
