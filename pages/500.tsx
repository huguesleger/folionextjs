import Link from "next/link";
import React, { useContext, useEffect } from "react";
import ChangeWord from "../components/ChangeWord";
import { Context } from "../context/AppContext";

const Error: () => JSX.Element = () => {
  const { setNavBar } = useContext(Context);

  useEffect(() => {
    setNavBar(false);
  });

  return (
    <div className="page-error">
      <div className="error-infos">
        <ChangeWord
          word1={"Oups !"}
          word2={"C'est la mouise !"}
          word3={"Mince !"}
          word4={"F*** !"}
        />
        <p>une erreur est survenue</p>
      </div>
      <div className="infinite-keywords">
        <p className="keywords">
          <span className="wrap-keyword keyword-bold">
            500
            <span className="separate-keyword">
              <i className="fas fa-circle" aria-hidden></i>
            </span>
          </span>
          <span className="wrap-keyword">
            Le serveur ne répond pas
            <span className="separate-keyword">
              <i className="fas fa-circle" aria-hidden></i>
            </span>
          </span>
        </p>
        <p className="keywords">
          <span className="wrap-keyword keyword-bold">
            500
            <span className="separate-keyword">
              <i className="fas fa-circle" aria-hidden></i>
            </span>
          </span>
          <span className="wrap-keyword">
            Le serveur ne répond pas
            <span className="separate-keyword">
              <i className="fas fa-circle" aria-hidden></i>
            </span>
          </span>
        </p>
      </div>
      <div className="link-home">
        <Link href="/">
          <a className="btn-around bg-dark-grey btn-effect">
            <span>
              <span>
                <i className="fas fa-home" aria-hidden></i>
                Retour à l&apos;accueil
              </span>
            </span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Error;
