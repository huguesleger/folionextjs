import Navbar from "./Nav";
import React, { ReactNode, useContext } from "react";
import { Context } from "../../context/AppContext";
import NavLogo from "./NavLogo";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const { navBar } = useContext(Context);
  return (
    <>
      <div id="app" className="app">
        {navBar === true ? <Navbar /> : <NavLogo />}
        {children}
      </div>
    </>
  );
}
