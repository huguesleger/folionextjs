import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SplitText } from "@cyriacbr/react-split-text";
import { TextReveal } from "../textReveal";
import { gsap } from "gsap";

const Nav = () => {
  const router = useRouter();

  const [btnOpenNav, setBtnOpenNav] = useState(true);

  useEffect(() => {
    const items = document.querySelectorAll(".item-link");
    items.forEach((el) => {
      const tl = gsap.timeline({
        duration: 1.2,
        ease: "expo",
      });
      tl.set(el, {
        y: "150%",
        rotate: 15,
      });
    });
  });

  const handleOnclick = () => {
    const btnNav = document.querySelector(".btn-main");
    const main = document.querySelector(".main");
    const items = document.querySelectorAll(".item-link");
    setBtnOpenNav(false);
    if (btnOpenNav) {
      btnNav.classList.add("is-open");
      main.classList.add("is-open");
      items.forEach((el) => {
        const tl = gsap.timeline({
          duration: 1.2,
          ease: "expo",
        });
        tl.to(el, {
          y: "0%",
          rotate: 0,
          stagger: 0.03,
        });
      });
    } else {
      setBtnOpenNav(true);
      btnNav.classList.remove("is-open");
      main.classList.remove("is-open");
      items.forEach((el) => {
        const tl = gsap.timeline({
          defaults: {
            duration: 0.7,
            ease: "power2",
          },
        });
        tl.to(el, {
          y: "-150%",
          rotate: -5,
          stagger: 0.03,
        });
      });
    }
  };
  return (
    <>
      <header className="header">
        <div className="wrap-header">
          <Link href="/">
            <a className="logo">
              <Image
                src="/logo-hl.svg"
                layout="intrinsic"
                width={45}
                height={45}
              />
            </a>
          </Link>
          <div className="btn-main" onClick={handleOnclick}>
            <span className="main-bar"></span>
          </div>
        </div>
      </header>
      <nav className="main">
        <div className="wrap-main">
          <div className="inner-main">
            <ul className="main-items">
              {/* <li className="item">
              <Link href="/">
                <a
                  className={`item-link ${
                    router.pathname == "/" ? "item-active" : ""
                  }`}
                >
                  Accueil
                </a>
              </Link>
            </li> */}
              <li className="item">
                <Link href="#">
                  <a className="item-link">
                    <SplitText
                      LineWrapper={({ children }) => (
                        <span className="wrapper-word">
                          {children}
                          <sup>01</sup>
                        </span>
                      )}
                    >
                      Projets
                    </SplitText>
                  </a>
                </Link>
              </li>
              <li className="item">
                <Link href="#">
                  <a className="item-link">
                    <SplitText
                      LineWrapper={({ children }) => (
                        <span className="wrapper-word">
                          {children}
                          <sup>02</sup>
                        </span>
                      )}
                    >
                      A propos
                    </SplitText>
                  </a>
                </Link>
              </li>
              <li className="item">
                <Link href="#">
                  <a className="item-link">
                    <SplitText
                      LineWrapper={({ children }) => (
                        <span className="wrapper-word">
                          {children}
                          <sup>03</sup>
                        </span>
                      )}
                    >
                      Contact
                    </SplitText>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
