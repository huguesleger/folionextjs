import { request } from "../lib/datocms/datocms";
import Query from "../lib/datocms/queries";
import { GraphQLResponse } from "../lib/datocms/types";
import { NextPage } from "next";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import React, { useContext, useEffect } from "react";
import { Context } from "../context/AppContext";

const ProjetPage: NextPage = (props) => {
  const { setNavBar } = useContext(Context);

  useEffect(() => {
    setNavBar(true);
  });

  // @ts-ignore
  const projets: [GraphQLResponse.Projet] = props.projets;
  const totalProject = projets.length;

  return (
    <>
      <div className="projects">
        <div className="wrap-slider">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={150}
            slidesPerView={3}
            centeredSlides={true}
            loop={true}
            autoHeight={false}
            grabCursor={true}
            observer={true}
            pagination={{
              el: ".progress-bar",
              type: "progressbar",
            }}
            onSlideChangeTransitionStart={(swiper) => {
              const numberEl = swiper.realIndex + 1;
              const item = document.querySelector(".progress-item-first");
              item.innerHTML = "0" + numberEl.toString();
            }}
          >
            <div className="slider-progress-bar">
              <div className="progress-item-first">01</div>
              <div className="progress-bar"></div>
              <div className="progress-item-last">{`0${totalProject}`}</div>
            </div>
            {projets.map((projet, index) => {
              return (
                <SwiperSlide key={index}>
                  <Link href={"/projets/" + projet.slug}>
                    <a>
                      <div className="inner-title title-white">
                        <span className="name">
                          <span>{projet.titre}</span>
                        </span>
                      </div>
                      <div className="inner-img">
                        <Image
                          src={projet.imageSlider.url}
                          layout="fill"
                          objectFit="cover"
                          quality={100}
                          alt="montpellier"
                        />
                      </div>
                      <div className="outer-title">
                        <div className="name">
                          <span>{projet.titre}</span>
                        </div>
                      </div>
                    </a>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ProjetPage;

export async function getStaticProps() {
  const res = (await request(
    Query.QUERY_CARD_PROJETS
  )) as GraphQLResponse.AllProjets;

  return {
    props: {
      projets: (res && res.allProjets) || [],
    },
  };
}
