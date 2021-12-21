import Link from "next/link";
import Image from "next/image";

function Nav() {
  return (
    <header className="header">
      <Link href="/">
        <a className="logo">
          <Image src="/logo-hl.svg" layout="intrinsic" width={45} height={45} />
        </a>
      </Link>
    </header>
  );
}

export default Nav;
