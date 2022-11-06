import { request } from "../../lib/datocms/datocms";
import Query from "../../lib/datocms/queries";
import { GraphQLResponse } from "../../lib/datocms/types";
import Image from "next/image";
import Link from "next/link";
import { StructuredText } from "react-datocms";
import HeaderProject from "../../components/Project/HeaderProject";
import React, { useContext, useEffect, useRef } from "react";
import Parallax from "../../components/Project/ParallaxImg";
import DragGallery from "../../components/Project/DraggableGallery";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import HoverReveal from "../../components/HoverReveal";
import { Context } from "../../context/AppContext";
import { motion } from "framer-motion";
import { SharedLayoutDataContext } from "../../context/MotionContext";

const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };

gsap.registerPlugin(ScrollTrigger);

const CardDetails: (props: {
  projet: GraphQLResponse.Projet;
  projets: GraphQLResponse.Projet[];
}) => JSX.Element = (props: {
  projet: GraphQLResponse.Projet;
  projets: GraphQLResponse.Projet[];
}) => {
  const projets: GraphQLResponse.Projet[] = props.projets;

  const refProjectNav = useRef(null);
  const refRoundedProject = useRef(null);
  const refWrapProject = useRef(null);

  const { scroll } = useLocomotiveScroll();

  const { setNavBar } = useContext(Context);

  const { contextValue } = useContext(SharedLayoutDataContext);
  const { x, y, width, height } = contextValue;

  const { current } = useContext(SharedLayoutDataContext);

  const refImgFull = useRef(null);

  console.log(current, "currentPage");

  useEffect(() => {
    setNavBar(true);
  });

  useEffect(() => {
    if (current === "homepage") {
      const tl = gsap.timeline();
      tl.to(refImgFull.current, {
        delay: 0.2,
        backgroundColor: "#ffffff",
        ease: "Power2.easeInOut",
        duration: 0.5,
      });
    }
  }, []);

  const getNextpost = () => {
    const index = projets.findIndex((el) => el.slug === props.projet.slug);
    if (index === (projets && projets.length) - 1) {
      return projets[0];
    } else {
      if (scroll) scroll.start();
      return projets[index + 1];
    }
  };

  const getPrevpost = () => {
    const index = projets.findIndex((el) => el.slug === props.projet.slug);
    if (index === 0) {
      return projets[(projets && projets.length) - 1];
    } else {
      return projets[index - 1];
    }
  };

  useEffect(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1200) {
      const dragEl = document.querySelector(".is-draggable");
      if (dragEl) {
        dragEl.addEventListener("mouseenter", (e) => {
          document.querySelector(".cursor").classList.add("has-drag");
        });
        dragEl.addEventListener("mouseleave", (e) => {
          document.querySelector(".cursor").classList.remove("has-drag");
        });
      }
    }
  });

  useEffect(() => {
    const windowWidth = window.innerWidth;
    let heightRound: any;
    if (windowWidth >= 1200) {
      heightRound = 94;
    } else {
      heightRound = 35;
    }
    if (scroll) {
      scroll.on("scroll", (instance: any) => {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: refWrapProject.current,
            start: "0% 100%",
            end: "100% 100%",
            scrub: 0,
          },
        });
        tl.set(refRoundedProject.current, {
          height: heightRound,
        });
        tl.to(refRoundedProject.current, {
          height: 0,
          ease: "none",
        });
      });
    }
  }, [scroll]);

  return (
    <>
      <div className="project-content">
        {/* <div className="project-img-full" ref={refImgFull} data-scroll-section> */}
        <div
          className={`project-img-full ${
            current === "homepage" && `bg-dark-grey`
          }`}
          ref={refImgFull}
          data-scroll-section
        >
          <motion.div
            initial={{
              y: y,
              x: 0,
              width: width,
              height: height,
            }}
            animate={{
              y: 0,
              x: 0,
              width: "100%",
              height: "100%",
              transition: { delay: 0, ...transition },
            }}
            className="thumbnail-single"
          >
            <div className="inner-img-full">
              <motion.div
                initial={{ scale: 1.2 }}
                // initial={{ scale: 1 }}
                animate={{
                  scale: 1,
                  transition: { delay: 0, ...transition },
                  // y: -1200,
                }}
                className="content-inner-img"
              >
                <Image
                  className=""
                  src={props.projet.imageFull.url}
                  layout="fill"
                  objectFit="cover"
                  // placeholder="blur"
                  // quality={50}
                  // width={props.projet.imageFull.width}
                  // height={props.projet.imageFull.height}
                  // layout="responsive"
                  alt={props.projet.imageFull.alt}
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
        <div className="project-header" data-scroll-section>
          <HeaderProject
            titre={props.projet.titre}
            siteWeb={props.projet.siteWeb}
            intervention={props.projet.intervention}
            annee={props.projet.annee}
          />
        </div>
        <div
          className="project-section project-description"
          data-scroll-section
        >
          <div className="container">
            <div className="wrap-description">
              <div className="inner-txt">
                <StructuredText data={props.projet.description} />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="project-img-full" data-scroll-section>
          <div className="inner-img-full">
            <Image
              className=""
              src={props.projet.imageFull.url}
              layout="fill"
              objectFit="cover"
              quality={100}
              alt={props.projet.imageFull.alt}
              data-scroll
              data-scroll-speed="-2"
            />
          </div>
        </div> */}
        <div className="project-section project-charte" data-scroll-section>
          <div className="container">
            {props.projet.titreCharte ? (
              <div className="wrap-charte">
                <div className="inner-txt">
                  <div
                    data-scroll
                    data-scroll-sticky
                    data-scroll-target="#imgCharte"
                  >
                    <h2>{props.projet.titreCharte}</h2>
                    {props.projet.descriptionCharte && (
                      <p>{props.projet.descriptionCharte}</p>
                    )}
                  </div>
                </div>
                <div className="wrap-img-charte" id="imgCharte">
                  {props.projet.imageCharte.map((el, index) => {
                    if (index % 2 == 0) {
                      return (
                        <div
                          key={el.id}
                          className="block-img"
                          data-scroll
                          data-scroll-speed="1"
                        >
                          <Image
                            key={el.id}
                            className=""
                            src={el.image.url}
                            layout="responsive"
                            width={el.image.width}
                            height={el.image.height}
                            alt={el.image.alt}
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={el.id}
                          className="block-img"
                          data-scroll
                          data-scroll-speed="-1"
                        >
                          <Image
                            key={el.id}
                            className=""
                            src={el.image.url}
                            layout="responsive"
                            width={el.image.width}
                            height={el.image.height}
                            alt={el.image.alt}
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            ) : (
              <div className="wrap-img-charte">
                {props.projet.imageCharte.map((el, index) => {
                  if (index % 2 == 0) {
                    return (
                      <div
                        key={el.id}
                        className="block-img"
                        data-scroll
                        data-scroll-speed="1"
                      >
                        <Image
                          key={el.id}
                          className=""
                          src={el.image.url}
                          layout="responsive"
                          width={el.image.width}
                          height={el.image.height}
                          alt={el.image.alt}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={el.id}
                        className="block-img"
                        data-scroll
                        data-scroll-speed="-1"
                      >
                        <Image
                          key={el.id}
                          className=""
                          src={el.image.url}
                          layout="responsive"
                          width={el.image.width}
                          height={el.image.height}
                          alt={el.image.alt}
                        />
                      </div>
                    );
                  }
                })}
              </div>
            )}
          </div>
        </div>
        <div
          className="project-section project-template-mobile"
          data-scroll-section
        >
          <Parallax imageTemplateMobile={props.projet.imageTemplateMobile} />
        </div>
        <div
          className="project-section project-template-desktop"
          data-scroll-section
        >
          <div className="container">
            <Image
              key={props.projet.imageTemplateDesktop.id}
              className=""
              src={props.projet.imageTemplateDesktop.url}
              layout="responsive"
              width={props.projet.imageTemplateDesktop.width}
              height={props.projet.imageTemplateDesktop.height}
              alt={props.projet.imageTemplateDesktop.alt}
            />
          </div>
        </div>
        {props.projet.descriptionProjet && (
          <div className="project-section project-text" data-scroll-section>
            <div className="container">
              <div className="wrap-text">
                <div className="inner-text">
                  <h2>{props.projet.texteProjet}</h2>
                  <p>{props.projet.descriptionProjet}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {props.projet.imagePage.length >= 1 && (
          <div
            className="project-section project-template-page"
            data-scroll-section
          >
            <div className="wrap-img-template-page is-draggable">
              <Swiper
                spaceBetween={30}
                slidesPerView={3}
                centeredSlides={false}
                loop={false}
                grabCursor={false}
                observer={true}
                breakpoints={{
                  1024: {
                    spaceBetween: 40,
                    slidesPerView: 4,
                  },
                }}
                onTouchStart={() => {
                  const windowWidth = window.innerWidth;
                  if (windowWidth >= 1200) {
                    document.querySelector("body").classList.add("is-draggy");
                    const item = document.querySelectorAll(
                      ".swiper-slide .inner-img"
                    );
                    const itemImg = document.querySelectorAll(
                      ".swiper-slide .inner-img img"
                    );
                    const tl = gsap.timeline();
                    tl.set(item, {
                      duration: 0.3,
                      scale: 1,
                      ease: "Power2.easeInOut",
                    })
                      .set(itemImg, {
                        duration: 0.3,
                        scale: 1,
                        ease: "Power2.easeInOut",
                      })
                      .to(item, {
                        duration: 0.3,
                        scale: 0.8,
                        ease: "Power2.easeInOut",
                        onStart: () => {
                          gsap.to(itemImg, {
                            duration: 0.3,
                            scale: 1.6,
                            ease: "Power2.easeInOut",
                          });
                        },
                      });
                  }
                }}
                onTouchEnd={() => {
                  const windowWidth = window.innerWidth;
                  if (windowWidth >= 1200) {
                    document
                      .querySelector("body")
                      .classList.remove("is-draggy");
                    const item = document.querySelectorAll(
                      ".swiper-slide .inner-img"
                    );
                    const itemImg = document.querySelectorAll(
                      ".swiper-slide .inner-img img"
                    );
                    const tl = gsap.timeline();
                    tl.set(item, {
                      duration: 0.3,
                      scale: 0.8,
                      ease: "Power2.easeInOut",
                    })
                      .set(itemImg, {
                        duration: 0.3,
                        scale: 1.6,
                        ease: "Power2.easeInOut",
                      })
                      .to(item, {
                        duration: 0.3,
                        scale: 1,
                        ease: "Power2.easeInOut",
                        onStart: () => {
                          gsap.to(itemImg, {
                            duration: 0.3,
                            scale: 1,
                            ease: "Power2.easeInOut",
                          });
                        },
                      });
                  }
                }}
              >
                {props.projet.imagePage.map((el, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="inner-img">
                        <DragGallery imagePage={el.image} />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        )}

        <div className="project-section project-link" data-scroll-section>
          <div className="container">
            <Link href={`https://${props.projet.siteWeb}`}>
              <a className="wrap-cta" target="_blank" rel="noopener noreferrer">
                <span
                  className="link-underline link-dark"
                  data-cursor-label="click"
                  data-cursor-dark
                >
                  Voir le site
                </span>
                <span className="link-arrow">
                  <Image
                    src="/images/link-arrow-dark.svg"
                    layout="intrinsic"
                    width={24}
                    height={24}
                    alt="Voir le site"
                  />
                </span>
              </a>
            </Link>
          </div>
        </div>
        <div
          className="project-rounded"
          data-scroll-section
          data-scroll
          data-scroll-repeat
          ref={refProjectNav}
        >
          <div className="rounded-top" ref={refRoundedProject}>
            <div className="rounded"></div>
          </div>
        </div>
        <div
          className="project-section project-items bg-dark-grey"
          data-scroll-section
          data-scroll
          data-scroll-repeat
          ref={refWrapProject}
        >
          <div
            className="inner-items"
            data-scroll
            data-scroll-speed="-4"
            data-scroll-position="bottom"
          >
            <HoverReveal
              image={getNextpost().imageSlider.url}
              widthImage={"300"}
              heightImage={"400"}
            >
              <div className="container">
                <div className="wrap-next-project">
                  <p className="title-next-project">
                    Projet suivant
                    <span className="link-arrow">
                      <Image
                        src="/images/link-arrow-grey-ultralight.svg"
                        layout="intrinsic"
                        width={24}
                        height={24}
                        alt="Voir le site"
                      />
                    </span>
                  </p>
                </div>
                <Link href={`/projets/${getNextpost().slug}`}>
                  <a className="link-nav-project">
                    <span className="" data-cursor-label="Voir le projet">
                      {getNextpost().titre}
                    </span>
                  </a>
                </Link>
              </div>
            </HoverReveal>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDetails;

export const getStaticPaths = async () => {
  const res = (await request(
    Query.QUERY_SLUGS_PROJETS
  )) as GraphQLResponse.AllProjets;

  const paths = res.allProjets.map((item) => {
    return {
      params: { slug: item.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

// @ts-ignore
export async function getStaticProps({ params }) {
  const res = (await request(Query.QUERY_PROJET_BY_SLUG, {
    slug: params.slug,
  })) as GraphQLResponse.Projet;
  const resAll = (await request(
    Query.QUERY_CARD_PROJETS
  )) as GraphQLResponse.AllProjets;

  if (!res) {
    return {
      redirect: {
        destination: "/projets",
        permanent: false,
      },
    };
  }

  return {
    props: {
      projet: res.projet,
      projets: (resAll && resAll.allProjets) || [],
    },
    revalidate: 1,
  };
}
