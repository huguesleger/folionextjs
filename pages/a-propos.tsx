import React, { useEffect, useRef } from "react";
import { gsap } from "gsap/dist/gsap";
import SplittingWrapperWord from "../components/SplittingWrapperWord";
import HoverItem from "../components/HoverItem";
import Image from "next/image";
import CircleText from "../components/CircleText";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import Link from "next/link";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function APropos() {
  const refCursus = useRef(null);
  const refContact = useRef(null);
  const refRoundedContact = useRef(null);
  const refWrapContact = useRef(null);
  const { scroll } = useLocomotiveScroll();

  useEffect(() => {
    const char = document.querySelectorAll(".title-about .wrapper-word .char");
    const titleList = document.querySelectorAll(
      ".section-cursus .wrapper-word .char"
    );
    const revealTxt = document.querySelectorAll(".reveal-txt");

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
    });

    if (refCursus.current.offsetTop > 100) {
      tl.set(titleList, {
        yPercent: 100,
        opacity: 0,
      }).to(titleList, {
        yPercent: 0,
        opacity: 1,
        delay: 1,
        ease: "Power2.easeInOut",
        duration: tlSettings.charsDuration,
        stagger: tlSettings.staggerVal,
        onComplete: () => {
          tl.set(revealTxt, {
            xPercent: 0,
          }).to(revealTxt, {
            xPercent: 101,
            ease: "Power2.easeInOut",
            duration: tlSettings.charsDuration,
            stagger: tlSettings.staggerVal,
          });
        },
      });
    }

    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    };

    let observer = new IntersectionObserver(callbackFunction, options);

    function callbackFunction(entries: any) {
      entries.forEach((entry: any) => {
        console.log(entry);
        if (entry.isIntersecting === true) {
          tl.set(titleList, {
            yPercent: 100,
            opacity: 0,
          }).to(titleList, {
            yPercent: 0,
            opacity: 1,
            delay: 1,
            ease: "Power2.easeInOut",
            duration: tlSettings.charsDuration,
            stagger: tlSettings.staggerVal,
          });
        }
        observer.observe(refCursus.current);
      });
    }
  }, []);

  useEffect(() => {
    const textSvg = document.querySelectorAll(".circles-text");
    const wrapCircleAnim = document.querySelector(".circle-txt-anim");
    if (scroll) {
      scroll.on("scroll", (instance: any) => {
        if (wrapCircleAnim.classList.contains("is-inview")) {
          // gsap.to(textSvg, {
          //   duration: 0.3,
          //   ease: "power1",
          //   rotate: scroll.scroll.instance.scroll.y,
          //   stagger: 0.015,
          //   transformOrigin: "50%, 50%",
          // });
          let tl = gsap.timeline({
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
        }
      });
    }
  }, [scroll]);

  useEffect(() => {
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
            height: 94,
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
              <SplittingWrapperWord>
                Développeur front & webdesigner
              </SplittingWrapperWord>
            </h1>
          </div>
          <div className="wrap-bio">
            <div className="wrap-desc">
              <div className="col-txt">
                <h2 className="section-title">
                  Hey, <span className="icon-emoji">&#128512;</span>
                </h2>
                <p>
                  Hugues Leger, basé sur Montpellier. Toujours amoureux du code
                  et du design, j'aime apprendre de nouvelles choses chaque jour
                  et me lancer des défis avec de nouveaux projets, traduire des
                  concepts en design visuel en prêtant une attention
                  particulière aux détails, et les convertir en expériences
                  hautement interactives.
                </p>
              </div>
              <div className="col-img">
                <div className="inner-img">
                  <Image
                    className="thumb"
                    src={"/images/post-home.jpg"}
                    layout="responsive"
                    width={1280}
                    height={2079}
                    alt="hugues Leger développeur web"
                    data-scroll
                    data-scroll-speed="-3"
                  />
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
        // data-scroll-offset="50%, 70%"
      >
        <div className="container">
          <div className="wrap-circle-txt">
            <CircleText
              txt={"Webdesign Prototypes Animations Interations Visuel"}
              txt2={"Illustrations Vectorielle Tablette Graphique Couleurs"}
              txt3={"Graphisme Design Conception Retouches"}
              txt4={"Logos Chartes graphiques Identitées"}
            />
          </div>
        </div>
      </div>
      <section className="section section-cursus" data-scroll-section>
        <div className="container">
          <h2 className="section-title">
            <SplittingWrapperWord>Cursus & Formations</SplittingWrapperWord>
          </h2>
        </div>
        <div className="container">
          <div className="list-cursus" ref={refCursus}>
            <div className="wrap-list-item">
              <HoverItem
                titre={"Développeur Web"}
                desc={"#BEWEB"}
                annee={"2016"}
                image={"/images/img-intro.jpg"}
              />
            </div>
            <div className="wrap-list-item">
              <HoverItem
                titre={"Webdesign"}
                desc={"#ARIES"}
                annee={"2009"}
                image={"/images/post-home.jpg"}
              />
            </div>
            <div className="wrap-list-item">
              <HoverItem
                titre={"BTS Communication Visuelle"}
                desc={"#ESMA"}
                annee={"2004/2006"}
                image={"/images/img-intro.jpg"}
              />
            </div>
          </div>
        </div>
      </section>
      <div className="section" data-scroll-section>
        <div className="infinite-keywords">
          <h3 className="keywords">
            Compétences
            <span className="separate-keyword">
              <i className="fas fa-circle" aria-hidden></i>
            </span>
            Savoir-faire
            <span className="separate-keyword">
              <i className="fas fa-circle" aria-hidden></i>
            </span>
            Techniques
            <span className="separate-keyword">
              <i className="fas fa-circle" aria-hidden></i>
            </span>
          </h3>
          <p className="keywords">
            Compétences
            <span className="separate-keyword">
              <i className="fas fa-circle" aria-hidden></i>
            </span>
            Savoir-faire
            <span className="separate-keyword">
              <i className="fas fa-circle" aria-hidden></i>
            </span>
            Techniques
            <span className="separate-keyword">
              <i className="fas fa-circle" aria-hidden></i>
            </span>
          </p>
        </div>
      </div>
      <section className="section section-services" data-scroll-section>
        <div className="container container-services">
          <div className="wrap-services">
            <div className="inner-service">
              <p className="number-service">01</p>
              <div className="desc-service">
                <h3>Design</h3>
                <p>
                  Avec une solide expérience dans la conception de sites Web et
                  d'applications, je propose des conceptions numériques solides
                  et conviviales. Une image de marque solide est la base de tout
                  site Web réussi.
                </p>
              </div>
            </div>
            <div className="inner-service">
              <p className="number-service">02</p>
              <div className="desc-service">
                <h3>Développement</h3>
                <p>
                  Je crée des sites Web évolutifs à partir de zéro qui
                  s'intègrent parfaitement au design. Je me concentre sur les
                  micro-animations, les transitions et l'interaction. Pour la
                  gestion de contenu, j'utilise Wordpress et Dato CMS.
                </p>
              </div>
            </div>
            <div className="inner-service">
              <p className="number-service">03</p>
              <div className="desc-service">
                <h3>Techniques</h3>
                <div className="wrap-list">
                  <ul>
                    <li>Photoshop</li>
                    <li>Illustrator</li>
                    <li>Adobe XD</li>
                    <li>Sass</li>
                    <li>Javascript</li>
                  </ul>
                  <ul>
                    <li>Webpack</li>
                    <li>Bootstrap</li>
                    <li>Twig</li>
                    <li>Symfony</li>
                    <li>Wordpress</li>
                  </ul>
                  <ul>
                    <li>React</li>
                    <li>Nextjs</li>
                    <li>Dato CMS</li>
                    <li>Git</li>
                  </ul>
                </div>
              </div>
            </div>
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
              <h2 className="title-contact">Connectons-nous</h2>
            </div>
            <div className="wrap-mail">
              <div className="link-mail">
                <Link href="mailto:contactme@hl-developerz.com">
                  <a data-cursor-big>contactme@hl-developerz.com</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default APropos;
