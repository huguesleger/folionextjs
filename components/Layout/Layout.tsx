import Navbar from "./Nav";
import React, { ReactNode, useContext } from "react";
import { Context } from "../../context/AppContext";
import NavLogo from "./NavLogo";
import Preloader from "../Loader";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const { navBar } = useContext(Context);
  return (
    <>
      <div id="app" className="app">
        <Preloader />
        {navBar === true ? <Navbar /> : <NavLogo />}
        {children}
      </div>
    </>
  );
}
