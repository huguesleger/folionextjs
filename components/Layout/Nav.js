import Link from "next/link";
import Image from "next/image";

function Nav() {
  return (
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
        <div className="btn-main">
          <span className="main-bar"></span>
        </div>
      </div>
    </header>
  );
}

export default Nav;
