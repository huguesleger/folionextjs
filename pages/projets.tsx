import { request } from "../lib/datocms/datocms";
import Query from "../lib/datocms/queries";
import { GraphQLResponse } from "../lib/datocms/types";
import { NextPage } from "next";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";

export async function getServerSideProps() {
  const res = (await request(
    Query.QUERY_CARD_PROJETS
  )) as GraphQLResponse.AllProjets;

  return {
    props: {
      projets: (res && res.allProjets) || [],
    },
  };
}

const ProjetPage: NextPage = (props) => {
  // @ts-ignore
  const projets: [GraphQLResponse.Projet] = props.projets;
  return (
    <>
      <div className="projects">
        <div className="wrap-slider">
          <Swiper
            spaceBetween={150}
            // spaceBetween={0}
            slidesPerView={3}
            centeredSlides={true}
            loop={true}
            // roundLengths={true}
            // loopAdditionalSlides={30}
            autoHeight={false}
            grabCursor={true}
            // onTouchStart={() => {
            //   document.querySelector(".swiper").classList.add("is-draggy");
            // }}
            // onTouchEnd={() =>
            //   document.querySelector(".swiper").classList.remove("is-draggy")
            // }
            // onTransitionStart={() => {
            //   document.querySelector(".swiper").classList.add("is-draggy");
            // }}
            // onTransitionEnd={() =>
            //   document
            //     .querySelector(".swiper-slide-active")
            //     .classList.add("is-hover")
            // }
            // onSlideChangeTransitionStart={() => {
            //   const elActives: any =
            //     document.querySelectorAll(".swiper-slide a");

            //   elActives.forEach((elActive) => {
            //     elActive.style.pointerEvents = "none";
            //   });
            // }}
            // onSlideChangeTransitionEnd={() => {
            //   const elActives: any = document.querySelectorAll(
            //     ".swiper-slide-active a"
            //   );

            //   elActives.forEach((elActive) => {
            //     elActive.style.pointerEvents = "initial";
            //   });
            // }}
            // on={() => {
            //   // document
            //   //   .querySelector(".swiper-slide-active")
            //   //   .classList.add("is-hover");
            // }}
          >
            {projets.map((projet) => {
              return (
                <SwiperSlide key={projet.slug}>
                  <Link href={"/projets/" + projet.slug}>
                    <a>
                      <div className="inner-title title-white">
                        <span className="name">
                          <span>{projet.titre}</span>
                        </span>
                      </div>
                      <div className="inner-img">
                        <Image
                          src={projet.imageHeader.url}
                          layout="fill"
                          objectFit="cover"
                          quality={100}
                          alt="montpellier"
                          // priority
                        />
                        {/* <img src={projet.imageHeader.url} alt="montpellier" /> */}
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
