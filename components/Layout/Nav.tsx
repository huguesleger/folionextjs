import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimateSharedLayout, motion } from "framer-motion";

export default function Navbar(): JSX.Element {
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
              <a className="item-link">Projets</a>
            </Link>
            <Link href="#">
              <a className="item-link">Contact</a>
            </Link>
          </nav>
        </div>
      </header>
    </AnimateSharedLayout>
  );
}
