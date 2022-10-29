import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

export default function Footer(): JSX.Element {
  const router = useRouter();
  const regexprojectSlug = /(?:\/projets\/)/g;
  const refFooter = useRef(null);

  useEffect(() => {
    if (
      router.pathname === "/a-propos" ||
      router.pathname === "/contact" ||
      router.pathname.match(regexprojectSlug)
    ) {
      setTimeout(() => {
        refFooter.current.classList.add("footer-dark");
      }, 200);
    } else {
      setTimeout(() => {
        refFooter.current.classList.remove("footer-dark");
      }, 200);
    }
  }, []);

  return (
    <div ref={refFooter} className="footer" data-scroll-section data-scroll>
      {router.pathname === "/a-propos" ||
      router.pathname === "/contact" ||
      router.pathname.match(regexprojectSlug) ? (
        <div className="bg-footer">
          <div className="inner-footer">
            <span className="copyright">
              <i className="far fa-copyright" aria-hidden></i> HL Developerz
              2022. Tous droit réservés
            </span>
            <div className="wrap-social">
              <Link href="#">
                <a className="item-social">
                  <i className="fab fa-facebook-f" aria-hidden></i>
                </a>
              </Link>
              <Link href="#">
                <a className="item-social">
                  <i className="fab fa-linkedin-in" aria-hidden></i>
                </a>
              </Link>
              <Link href="#">
                <a className="item-social">
                  <i className="fab fa-instagram" aria-hidden></i>
                </a>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-footer">
          <div className="inner-footer">
            <span className="copyright">
              <i className="far fa-copyright" aria-hidden></i> HL Developerz
              2022. Tous droit réservés
            </span>
            <div className="wrap-social">
              <Link href="#">
                <a className="item-social">
                  <i className="fab fa-facebook-f" aria-hidden></i>
                </a>
              </Link>
              <Link href="#">
                <a className="item-social">
                  <i className="fab fa-linkedin-in" aria-hidden></i>
                </a>
              </Link>
              <Link href="#">
                <a className="item-social">
                  <i className="fab fa-instagram" aria-hidden></i>
                </a>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
