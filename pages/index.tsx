import { request } from "../lib/datocms/datocms";
import Query from "../lib/datocms/queries";
import { GraphQLResponse } from "../lib/datocms/types";
import Preloader from "../components/Loader";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import formatTxt from "../lib/functions/formatTxt";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// const Pixi = dynamic(() => import("../components/Pixi"), {
//   ssr: false,
// });

const Home: (props: { home: GraphQLResponse.Home }) => JSX.Element = (props: {
  home: GraphQLResponse.Home;
}) => {
  return (
    <div className="homepage">
      <Preloader />
      <div className="intro">
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
            />
            {/* <Pixi /> */}
          </div>
        </div>
        <div className="intro-name">
          <div className="intro-enter">
            <div className="arrow-enter">
              <Image
                src="/images/arrow-enter.svg"
                layout="intrinsic"
                width={90}
                height={90}
                alt="montpellier"
              />
            </div>
            <div className="content-txt">
              <Link href="/projets">
                <a className="txt btn-enter">
                  <span className="hello">Hello</span>cliquez ici, pour
                  découvrir
                  <br />
                  mes projets.
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
      <Swiper
        spaceBetween={150}
        slidesPerView={3}
        centeredSlides={true}
        loop={true}
        autoHeight={false}
        grabCursor={true}
        observer={true}
      >
        <SwiperSlide>
          <Link href="">
            <a>
              <div className="inner-title title-white">
                <span className="name">
                  <span>test</span>
                </span>
              </div>
              <div className="inner-img">
                <Image
                  src={props.home.image.url}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  alt="montpellier"
                />
              </div>
              <div className="outer-title">
                <div className="name">
                  <span>test</span>
                </div>
              </div>
            </a>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="">
            <a>
              <div className="inner-title title-white">
                <span className="name">
                  <span>test</span>
                </span>
              </div>
              <div className="inner-img">
                <Image
                  src={props.home.image.url}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  alt="montpellier"
                />
              </div>
              <div className="outer-title">
                <div className="name">
                  <span>test</span>
                </div>
              </div>
            </a>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="">
            <a>
              <div className="inner-title title-white">
                <span className="name">
                  <span>test</span>
                </span>
              </div>
              <div className="inner-img">
                <Image
                  src={props.home.image.url}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  alt="montpellier"
                />
              </div>
              <div className="outer-title">
                <div className="name">
                  <span>test</span>
                </div>
              </div>
            </a>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="">
            <a>
              <div className="inner-title title-white">
                <span className="name">
                  <span>test</span>
                </span>
              </div>
              <div className="inner-img">
                <Image
                  src={props.home.image.url}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  alt="montpellier"
                />
              </div>
              <div className="outer-title">
                <div className="name">
                  <span>test</span>
                </div>
              </div>
            </a>
          </Link>
        </SwiperSlide>
      </Swiper>
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
