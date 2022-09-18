import { AnimateSharedLayout } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function NavLogo(): JSX.Element {
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
      </header>
    </AnimateSharedLayout>
  );
}
