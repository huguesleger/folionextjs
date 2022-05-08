import Link from "next/link";

export default function Footer(): JSX.Element {
  return (
    <div className="footer" data-scroll-section>
      <div className="inner-footer">
        <span className="copyright">
          &copy; HL Developerz 2022. Tous droit réservés
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
  );
}
