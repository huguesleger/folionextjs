import Navbar from "./Nav";
import React from "react";

export default function Layout({ children }) {
  return (
    <>
      <div id="app" className="app">
        <Navbar />
        {children}
      </div>
    </>
  );
}
