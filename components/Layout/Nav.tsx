import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimateSharedLayout } from "framer-motion";
import { useRouter } from "next/router";
import gsap from "gsap";
import HoverItem from "../HoverItem";

export default function Navbar(): JSX.Element {
  const router = useRouter();

  const navMobile = useRef(null);
  const btnMobile = useRef(null);

  const [toggleBtn, setToggleBtn] = useState(false);
  const handleToggleBtn = () => {
    setToggleBtn(!toggleBtn);
  };

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const handleToggle = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const storeUserSetPreference = (pref: any) => {
    localStorage.setItem("theme", pref);
  };

  const getUserSetPreference = () => {
    return localStorage.getItem("theme");
  };

  useEffect(() => {
    const userSetPreference = getUserSetPreference();
    if (userSetPreference !== null) {
      setIsDarkTheme(userSetPreference === "dark-mode");
    }
  }, []);

  useEffect(() => {
    console.log(toggleBtn);

    if (toggleBtn === true) {
      navMobile.current.classList.add("is-show");
      btnMobile.current.classList.add("is-open");
    } else if (navMobile.current.classList.contains("is-show")) {
      setTimeout(() => {
        navMobile.current.classList.remove("is-show");
        btnMobile.current.classList.remove("is-open");
      }, 500);
    }

    const link = document.querySelectorAll(".nav-mobile .item-link");
    const header = document.querySelector(".header");
    const btnNav = document.querySelector(".wrap-btn-main");

    link.forEach((el) => {
      el.addEventListener("click", function () {
        navMobile.current.classList.remove("is-show");
        btnMobile.current.classList.remove("is-open");
        header.classList.remove("is-hide");
        btnNav.classList.add("is-hide");
        btnNav.classList.remove("is-show");
        setToggleBtn(false);
      });
    });

    const char = document.querySelectorAll(
      ".nav-mobile .item-link .item .wrapper-word .char"
    );
    const charNumber = document.querySelectorAll(
      ".nav-mobile .item-link .item-number .wrapper-word .char"
    );

    const linkItem = document.querySelectorAll(
      ".nav-mobile .item-link .item, .nav-mobile .item-link .item-number"
    );

    const innerContact = document.querySelector(".wrap-infos .inner-contact");
    const innerSocial = document.querySelector(".wrap-infos .inner-social");

    const tlSettings = {
      staggerVal: 0.015,
      charsDuration: 0.7,
    };
    const tl = gsap.timeline();

    if (toggleBtn === true) {
      tl.set(linkItem, {
        yPercent: 0,
        opacity: 1,
      })
        .set(innerContact, {
          yPercent: -100,
          opacity: 0,
        })
        .set(innerSocial, {
          yPercent: -100,
          opacity: 0,
        })
        .set(char, {
          yPercent: -100,
          opacity: 0,
        })
        .set(charNumber, {
          yPercent: -100,
          opacity: 0,
        })
        .to(char, {
          yPercent: 0,
          opacity: 1,
          delay: 0.5,
          ease: "Power2.easeInOut",
          duration: tlSettings.charsDuration,
          stagger: tlSettings.staggerVal,
        })
        .to(charNumber, {
          yPercent: 0,
          opacity: 1,
          delay: -1,
          ease: "Power2.easeInOut",
          duration: tlSettings.charsDuration,
          stagger: tlSettings.staggerVal,
        })
        .to(innerContact, {
          yPercent: 0,
          opacity: 1,
          ease: "Power2.easeInOut",
          duration: 0.5,
        })
        .to(innerSocial, {
          yPercent: 0,
          opacity: 1,
          ease: "Power2.easeInOut",
          duration: 0.5,
        });
    } else {
      tl.to(linkItem, {
        yPercent: -100,
        opacity: 0,
        ease: "Power2.easeInOut",
        duration: tlSettings.charsDuration,
        stagger: tlSettings.staggerVal,
      })
        .to(innerContact, {
          yPercent: -100,
          opacity: 0,
          ease: "Power2.easeInOut",
          duration: 0.5,
          delay: -1,
        })
        .to(innerSocial, {
          yPercent: -100,
          opacity: 0,
          ease: "Power2.easeInOut",
          duration: 0.5,
          delay: -1,
        });
    }
  }, [toggleBtn]);

  useEffect(() => {
    if (isDarkTheme !== undefined) {
      if (isDarkTheme) {
        storeUserSetPreference("dark-mode");
        document.body.classList.add("dark-mode");
        document.body.classList.remove("light-mode");
      } else {
        storeUserSetPreference("light-mode");
        document.body.classList.add("light-mode");
        document.body.classList.remove("dark-mode");
      }
    }
  }, [isDarkTheme]);

  return (
    <AnimateSharedLayout>
      <header className="header">
        <div className="header-logo">
          <Link href="/">
            <a className="logo">
              <Image
                src="/logo-hl.svg"
                layout="intrinsic"
                width={35}
                height={35}
              />
            </a>
          </Link>
        </div>
        <div className="header-nav">
          <nav className="nav-items">
            <Link href="/projets">
              <a
                className={
                  router.pathname === "/projets"
                    ? "item-link item-active"
                    : "item-link"
                }
              >
                <div className="item-wrap">
                  <span className="item">Projets</span>
                  <span className="item-hover">Projets</span>
                </div>
              </a>
            </Link>
            <Link href="/a-propos">
              <a
                className={
                  router.pathname === "/a-propos"
                    ? "item-link item-active"
                    : "item-link"
                }
              >
                <div className="item-wrap">
                  <span className="item">A propos</span>
                  <span className="item-hover">A propos</span>
                </div>
              </a>
            </Link>
            <Link href="/contact">
              <a
                className={
                  router.pathname === "/contact"
                    ? "item-link item-active"
                    : "item-link"
                }
              >
                <div className="item-wrap">
                  <span className="item">Contact</span>
                  <span className="item-hover">Contact</span>
                </div>
              </a>
            </Link>
            <button onClick={handleToggle} className="btn-theme-mode item-link">
              <div className="item-wrap">
                {isDarkTheme === true ? (
                  <>
                    <span className="item txt-theme-mode">mode lumière</span>
                    <span className="item-hover txt-theme-mode">
                      mode sombre
                    </span>
                  </>
                ) : (
                  <>
                    <span className="item txt-theme-mode">mode sombre</span>
                    <span className="item-hover txt-theme-mode">
                      mode lumière
                    </span>
                  </>
                )}
              </div>
            </button>
          </nav>
        </div>
        <div className="wrap-btn-main is-hide">
          <div ref={btnMobile} className="btn-main" onClick={handleToggleBtn}>
            <span className="main-bar"></span>
          </div>
        </div>
      </header>
      <div className="wrap-full-nav" ref={navMobile}>
        <div className="container">
          <nav className="nav-mobile">
            <div className="wrap-items">
              <HoverItem
                titre={"accueil"}
                itemNumber={"01"}
                slug={""}
                desc={""}
                annee={""}
                image={"/images/img-intro.jpg"}
              />
              <HoverItem
                titre={"projets"}
                itemNumber={"02"}
                slug={"projets"}
                desc={""}
                annee={""}
                image={"/images/img-intro.jpg"}
              />
              <HoverItem
                titre={"a propos"}
                itemNumber={"03"}
                slug={"a-propos"}
                desc={""}
                annee={""}
                image={"/images/post-home.jpg"}
              />
              <HoverItem
                titre={"contact"}
                itemNumber={"04"}
                slug={"contact"}
                desc={""}
                annee={""}
                image={"/images/img-intro.jpg"}
              />
            </div>
            <div className="wrap-infos">
              <div className="inner-contact">
                <h3 className="title-contact">Entrer en contact</h3>
                {/* <Link href="mailto:contactme@hl-developerz.com">
                <a className="link-email">Envoyez-moi un e-mail</a>
              </Link> */}
                <Link href="mailto:contactme@hl-developerz.com">
                  <a className="wrap-cta">
                    <span className="link-arrow">
                      <Image
                        src="/images/link-arrow-white.svg"
                        layout="intrinsic"
                        width={24}
                        height={24}
                        alt=""
                      />
                    </span>
                    <span className="link-email link-white">
                      Envoyez-moi un e-mail
                    </span>
                  </a>
                </Link>
              </div>
              <div className="wrap-social">
                <div className="inner-social">
                  <h3 className="title-social">Suivez-moi</h3>
                  <div className="items-social">
                    <Link href="#">
                      <a className="item-social">
                        <i className="fab fa-facebook-f" aria-hidden></i>
                      </a>
                    </Link>
                    <Link href="#">
                      <a className="item-social">
                        <i className="fab fa-linkedin-in" aria-hidden></i>
                      </a>
                    </Link>
                    <Link href="#">
                      <a className="item-social">
                        <i className="fab fa-instagram" aria-hidden></i>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </AnimateSharedLayout>
  );
}
