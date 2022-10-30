import { request } from "../lib/datocms/datocms";
import Query from "../lib/datocms/queries";
import { GraphQLResponse } from "../lib/datocms/types";
import Preloader from "../components/Loader";
import Image from "next/image";
import Link from "next/link";
import formatTxt from "../lib/functions/formatTxt";
import LastWork from "../components/Home/LastWork";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../context/AppContext";
import LastWorkV2 from "../components/Home/LastWorkV2";
import dynamic from "next/dynamic";
import { SharedLayoutDataContext } from "../context/MotionContext";
import gsap from "gsap";

const PixiV4 = dynamic(() => import("../components/PixiV4"), {
  ssr: false,
});

const Home: (props: { home: GraphQLResponse.Home }) => JSX.Element = (props: {
  home: GraphQLResponse.Home;
}) => {
  const { setNavBar } = useContext(Context);
  const { setCurrent, current, setValue } = useContext(SharedLayoutDataContext);
  const refHome = useRef(null);

  // const PixiApp = dynamic(() => import("../components/PixiApp"), {
  //   ssr: false,
  // });

  useEffect(() => {
    setNavBar(true);
  });

  useEffect(() => {
    const linkWorks = document.querySelectorAll(".link-work");
    linkWorks.forEach((el) => {
      el.addEventListener("click", function () {
        const canvas = el.querySelector(".work-pixi");
        const canvasRec = canvas.getBoundingClientRect();
        setValue({
          x: canvasRec.x,
          y: canvasRec.y,
          width: canvasRec.width,
          height: canvasRec.height,
        });
      });
    });
  }, []);

  const handleClick = () => {
    const tl = gsap.timeline();
    tl.to(refHome.current, {
      backgroundColor: "#ffffff",
      ease: "Power2.easeInOut",
      duration: 0.5,
      onStart: () => {
        refHome.current.classList.remove("bg-dark");
      },
    });
  };

  return (
    <div className="homepage" ref={refHome}>
      <Preloader />
      <div className="intro container" id="intro" data-scroll-section>
        <div className="intro-title">
          <div className="title-inner">
            <h1 className="title">{formatTxt(props.home.titre)}</h1>
          </div>
        </div>
        <div className="intro-img">
          <div className="inner-img">
            <Image
              className="thumb"
              src={props.home.image.url}
              layout="intrinsic"
              width={1920}
              height={1280}
              alt="montpellier"
              data-scroll
              data-scroll-speed="-1"
            />
          </div>
        </div>
        <div className="intro-name">
          <div className="intro-enter">
            <div className="arrow-enter">
              <svg viewBox="0 0 302.4 395.36">
                <path d="M278.88,220.08,168,331V0H134.4V331L23.52,220.08,0,244.16l151.2,151.2,151.2-151.2Z" />
              </svg>
            </div>
            <div className="content-txt" data-scroll>
              <Link href="#wrapWorks">
                <a href="#works" className="txt btn-enter" data-scroll-to>
                  <span className="hello">
                    {formatTxt(props.home.titreEntrer)}
                  </span>
                  {formatTxt(props.home.texteEntrer)}
                </a>
              </Link>
            </div>
          </div>
          <div className="name-inner">
            <h2 className="name">
              Hugues <span>Leger</span>
            </h2>
            <div className="circle-city">
              <Image
                src="/images/mtp.svg"
                layout="intrinsic"
                width={120}
                height={120}
                alt="montpellier"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="section section-works" id="works" data-scroll-section>
        <div
          className="last-works"
          id="homeWorks"
          data-scroll
          data-scroll-target="#wrapWorks"
          data-scroll-repeat
          data-scroll-call="updateBg"
        >
          <div
            className="wrap-title"
            data-scroll
            data-scroll-direction="horizontal"
            data-scroll-speed="-3"
          >
            <h2
              className="title"
              data-scroll
              data-scroll-sticky
              data-scroll-target="#homeWorks"
            >
              {props.home.titleLastProject}
            </h2>
          </div>
          <div
            className="wrap-subtitle"
            data-scroll
            data-scroll-direction="horizontal"
            data-scroll-speed="6"
          >
            <h3
              className="subtitle"
              data-scroll
              data-scroll-sticky
              data-scroll-target="#homeWorks"
            >
              {props.home.subtitleLastProject}
            </h3>
          </div>
          <div className="container">
            {/* <div className="wrap-works" id="wrapWorks">
              {props.home.lastWork.map((el, index) => {
                index = index + 1;
                return (
                  <div className="inner-work" id={`work${index}`} key={el.id}>
                    <LastWork
                      titre={el.titre}
                      slug={el.slug}
                      image={el.image}
                      typeProjet={el.typeProjet}
                      target={el.target}
                    />
                  </div>
                );
              })}
            </div> */}
            <div className="wrap-works" id="wrapWorks">
              {props.home.lastWork.map((el, index) => {
                index = index + 1;
                return (
                  <div className="inner-work" id={`work${index}`} key={el.id}>
                    <LastWorkV2
                      key={el.id}
                      titre={el.titre}
                      slug={el.slug}
                      image={el.image}
                      typeProjet={el.typeProjet}
                      target={el.target}
                    />
                    <Link href={`/projets/${el.slug}`}>
                      <a
                        className="link-work"
                        key={index}
                        onClick={handleClick}
                      >
                        <div className="work-pixi">
                          <PixiV4 image={el.image} target={el.target}></PixiV4>
                        </div>
                        <div className="wrap-title">
                          <h3
                            className={`title-work title-work${index}`}
                            data-cursor-label="Voir le projet"
                          >
                            {el.titre}
                          </h3>
                        </div>
                      </a>
                    </Link>
                  </div>
                );
              })}
              {/* {props.home.lastWork.map((el, index) => {
                index = index + 1;
                return (
                  <div className="wrap-canvas">
                    <div className="content-work">
                      <Link href={`/projets/${el.slug}`}>
                        <a className="link-work">
                          <PixiV4
                            image={el.image}
                            titre={el.titre}
                            slug={el.slug}
                            target={el.target}
                          ></PixiV4>
                          <div className="wrap-title">
                            <h3 className={`title-work title-work${index}`}>
                              {el.titre}
                            </h3>
                          </div>
                        </a>
                      </Link>
                    </div>
                  </div>
                );
              })} */}
            </div>
          </div>
        </div>
      </div>
      <div className="section section-contact" data-scroll-section>
        <div className="container">
          <div className="wrap-title">
            <h2 className="title-contact" data-scroll data-scroll-speed="2">
              {props.home.titreContact}
            </h2>
          </div>
          <div className="wrap-mail">
            <div className="link-mail" data-scroll data-scroll-speed="6">
              <Link href="mailto:contactme@hl-developerz.com">
                <a data-cursor-big>{props.home.email}</a>
              </Link>
            </div>
          </div>
          <div className="wrap-illu">
            <Image
              src="/images/illu-contact.png"
              width={413}
              height={464}
              layout="responsive"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const res = (await request(Query.QUERY_HOME)) as GraphQLResponse.HomePage;
  return {
    props: {
      home: res.home,
    },
  };
}
