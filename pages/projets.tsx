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
  let numberEl = 1;

  return (
    <>
      <div className="projects">
        <div className="wrap-slider">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={2}
            centeredSlides={true}
            loop={true}
            autoHeight={false}
            grabCursor={true}
            observer={true}
            pagination={{
              el: ".progress-bar",
              type: "progressbar",
            }}
            breakpoints={{
              1024: {
                spaceBetween: 150,
                slidesPerView: 3,
              },
            }}
            onSwiper={(swiper) => {
              const numberItem = [];
              for (let i = 0; i < totalProject; i++) {
                const number = totalProject[i];
                numberItem.push(number);
                console.log(numberItem.length, "ee");
                const elDiv = document.querySelector(".number-item");
                let span = document.createElement("span");
                span.classList.add("number");
                span.classList.add("number-" + numberItem.length);
                span.append(numberItem.length.toString());
                elDiv.append(span);
                const numberActive = document.querySelector(".number-1");
                numberActive.classList.add("active");
              }
            }}
            onSlideChangeTransitionStart={(swiper) => {
              const numberActive = document.querySelector(
                ".number-" + numberEl
              );
              if (numberActive) {
                numberActive.classList.remove("active");
              }

              numberEl = swiper.realIndex + 1;

              const currentNumber = document.querySelector(
                ".number-" + numberEl
              );
              if (currentNumber) {
                currentNumber.classList.add("active");
              }
            }}
          >
            <div className="slider-progress-bar">
              <div className="progress-item-first">
                <span className="number-item">0</span>
              </div>
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
