import React, { useContext, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimateSharedLayout, motion } from "framer-motion";
import { Context } from "../../context/AppContext";
import { useState } from "react";

export default function Navbar(): JSX.Element {
  // const { darkMode, setDarkMode } = useContext(Context);

  // const toggleBtn = () => {
  //   setDarkMode(!darkMode);
  // };

  // useEffect(() => {
  //   setDarkMode(false);
  //   if (darkMode) {
  //     document.body.classList.add("light-mode");
  //     document.body.classList.remove("dark-mode");
  //     localStorage.setItem("theme", "light-mode");
  //   } else {
  //     document.body.classList.add("dark-mode");
  //     document.body.classList.remove("light-mode");
  //     localStorage.setItem("theme", "dark-mode");
  //   }
  // });

  // useEffect(() => {
  //   if (localStorage.getItem("theme") === "light-mode") {
  //     document.body.classList.add("light-mode");
  //   } else if (localStorage.getItem("theme") === "dark-mode") {
  //     document.body.classList.add("dark-mode");
  //     setDarkMode(!darkMode);
  //   }
  // }, []);

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
              <a className="item-link">
                <div className="item-wrap">
                  <span className="item">Projets</span>
                  <span className="item-hover">Projets</span>
                </div>
              </a>
            </Link>
            <Link href="#">
              <a className="item-link">
                <div className="item-wrap">
                  <span className="item">A propos</span>
                  <span className="item-hover">A propos</span>
                </div>
              </a>
            </Link>
            <Link href="#">
              <a className="item-link">
                <div className="item-wrap">
                  <span className="item">Contact</span>
                  <span className="item-hover">Contact</span>
                </div>
              </a>
            </Link>
            {/* <button onClick={handleToggle} className="item-link">
              DarkMode
            </button> */}
            {/* <label>
              <input
                type="checkbox"
                checked={isDarkTheme}
                onChange={handleToggle}
              />{" "}
              Dark
            </label> */}
            {/* <input
              id="s1"
              type="checkbox"
              className="switch"
              checked={isDarkTheme}
              onChange={handleToggle}
            />
            <label htmlFor="s1">Switch</label> */}
            {/* <input
              type="checkbox"
              id="switch"
              className="switch"
              checked={isDarkTheme}
              onChange={handleToggle}
            />
            <label htmlFor="switch">Toggle</label> */}
            <button onClick={handleToggle} className="btn-theme-mode">
              {isDarkTheme === true && (
                <>
                  {/* <Image
                    src="/images/sun.svg"
                    layout="intrinsic"
                    width={25}
                    height={25}
                  /> */}
                  <i className="far fa-lightbulb" aria-hidden></i>
                  <span className="txt-theme-mode">mode lumière</span>
                </>
              )}
              {isDarkTheme === false && (
                <>
                  {/* <Image
                    src="/images/moon.svg"
                    layout="intrinsic"
                    width={20}
                    height={20}
                  /> */}
                  <i className="fas fa-moon" aria-hidden></i>
                  <span className="txt-theme-mode">mode sombre</span>
                </>
              )}
              {/* <Image src={sun} layout="intrinsic" width={25} height={25} /> */}
            </button>
            {/* {isDarkTheme === false && (
              <span className="txt-theme-mode">mode lumière</span>
            )}
            {isDarkTheme === true && (
              <span className="txt-theme-mode">mode sombre</span>
            )} */}
          </nav>
        </div>
      </header>
    </AnimateSharedLayout>
  );
}
