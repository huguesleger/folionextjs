import { request } from "../lib/datocms/datocms";
import Query from "../lib/datocms/queries";
import { GraphQLResponse } from "../lib/datocms/types";
import Preloader from "../components/Loader";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import formatTxt from "../lib/functions/formatTxt";
import { useState } from "react";

// const Pixi = dynamic(() => import("../components/Pixi"), {
//   ssr: false,
// });

const Home: (props: { home: GraphQLResponse.Home }) => JSX.Element = (props: {
  home: GraphQLResponse.Home;
}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  return (
    <div className="homepage">
      <Preloader />
      <div className="intro" id="intro" data-scroll-section>
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
              {/* <Image
                src="/images/arrow-enter.svg"
                layout="intrinsic"
                width={90}
                height={90}
                alt="montpellier"
              /> */}
              <svg viewBox="0 0 302.4 395.36">
                <path d="M278.88,220.08,168,331V0H134.4V331L23.52,220.08,0,244.16l151.2,151.2,151.2-151.2Z" />
              </svg>
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
      <div className="section home-works" data-scroll-section>
        <div
          className="wrap-works"
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
            // data-scroll-target="#homeWorks"
            data-scroll-speed="-3"
          >
            <h2
              className="title"
              data-scroll
              data-scroll-sticky
              data-scroll-target="#homeWorks"
            >
              Mes projets récents
            </h2>
          </div>
          <div
            className="wrap-subtitle"
            data-scroll
            data-scroll-direction="horizontal"
            // data-scroll-target="#homeWorks"
            data-scroll-speed="6"
          >
            <h3
              className="subtitle"
              data-scroll
              data-scroll-sticky
              data-scroll-target="#homeWorks"
            >
              Développement front-end - Webdesign - Intégration web - Graphisme
            </h3>
          </div>
          <div className="container">
            <div className="wrap-works" id="wrapWorks">
              <div className="inner-work" id="work1">
                <div className="col-work-infos">
                  <div
                    className="wrap-infos"
                    data-scroll
                    data-scroll-sticky
                    data-scroll-target="#work1"
                  >
                    <h3 className="title-work">Easy Music Project</h3>
                    <p className="type-work">Type d'intervention</p>
                    <Link href="#">
                      <a className="link-work">Voir le projet</a>
                    </Link>
                  </div>
                </div>
                <div className="col-work">
                  <div className="wrap-img">
                    <Link href="#">
                      <a className="link-img-work">
                        <Image
                          className="img-work"
                          src="/images/post-home.jpg"
                          layout="responsive"
                          width={1280}
                          height={2079}
                          alt=""
                          data-cursor-label="Voir le projet"
                        />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="inner-work" id="work2">
                <div className="col-work-infos">
                  <div
                    className="wrap-infos"
                    data-scroll
                    data-scroll-sticky
                    data-scroll-target="#work2"
                  >
                    <h3 className="title-work">Viz360</h3>
                    <p className="type-work">Type d'intervention</p>
                    <Link href="#">
                      <a className="link-work">Voir le projet</a>
                    </Link>
                  </div>
                </div>
                <div className="col-work">
                  <div className="wrap-img" data-cursor-label="a">
                    <Image
                      className="img-work"
                      src="/images/post-home.jpg"
                      layout="responsive"
                      width={1280}
                      height={2079}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="inner-work" id="work3">
                <div className="col-work-infos">
                  <div
                    className="wrap-infos"
                    data-scroll
                    data-scroll-sticky
                    data-scroll-target="#work3"
                  >
                    <h3 className="title-work">Serv'eat</h3>
                    <p className="type-work">Type d'intervention</p>
                    <Link href="#">
                      <a className="link-work">Voir le projet</a>
                    </Link>
                  </div>
                </div>
                <div className="col-work">
                  <div className="wrap-img">
                    <Image
                      className="img-work"
                      src="/images/post-home.jpg"
                      layout="responsive"
                      width={1280}
                      height={2079}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section home-contact" data-scroll-section>
        <div className="container">
          <h2>Connectons-nous</h2>
          <Link href="mailto:contactme@hl-developerz.com">
            <a className="link-mail">contactme@hl-developerz.com</a>
          </Link>
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
