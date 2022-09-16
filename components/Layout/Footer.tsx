import Link from "next/link";
import { useRouter } from "next/router";

export default function Footer(): JSX.Element {
  const router = useRouter();
  const regexprojectSlug = /(?:\/projets\/)/g;

  return (
    <div
      className={`footer ${
        router.pathname === "/a-propos" ||
        router.pathname === "/contact" ||
        router.pathname.match(regexprojectSlug)
          ? "footer-dark"
          : ""
      }`}
      data-scroll-section
      data-scroll
    >
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
        <div className="inner-footer">
          <span className="copyright">
            <i className="far fa-copyright" aria-hidden></i> HL Developerz 2022.
            Tous droit réservés
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
      )}
    </div>
  );
}
