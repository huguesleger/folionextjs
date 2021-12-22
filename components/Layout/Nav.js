import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Nav = () => {
  const [btnOpenNav, setBtnOpenNav] = useState(true);
  const handleOnclick = () => {
    const btnNav = document.querySelector(".btn-main");
    const main = document.querySelector(".main");
    setBtnOpenNav(false);
    if (btnOpenNav) {
      btnNav.classList.add("is-open");
      main.classList.add("is-open");
    } else {
      setBtnOpenNav(true);
      btnNav.classList.remove("is-open");
      main.classList.remove("is-open");
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
          <ul className="main-items">
            <li className="item">
              <Link href="/">
                <a className="item-link">Accueil</a>
              </Link>
            </li>
            <li className="item">
              <Link href="/">
                <a className="item-link">Projets</a>
              </Link>
            </li>
            <li className="item">
              <Link href="/">
                <a className="item-link">A propos</a>
              </Link>
            </li>
            <li className="item">
              <Link href="/">
                <a className="item-link">Contact</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Nav;
