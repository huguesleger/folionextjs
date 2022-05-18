import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimateSharedLayout } from "framer-motion";
import { useRouter } from "next/router";

export default function Navbar(): JSX.Element {
  const router = useRouter();

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
            <Link href="#">
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
            <button onClick={handleToggle} className="btn-theme-mode">
              {isDarkTheme === true && (
                <>
                  <i className="far fa-lightbulb" aria-hidden></i>
                  <span className="txt-theme-mode">mode lumière</span>
                </>
              )}
              {isDarkTheme === false && (
                <>
                  <i className="fas fa-moon" aria-hidden></i>
                  <span className="txt-theme-mode">mode sombre</span>
                </>
              )}
            </button>
          </nav>
        </div>
      </header>
    </AnimateSharedLayout>
  );
}
