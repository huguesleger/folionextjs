import Image from "next/image";
import Link from "next/link";

type LastWorkType = {
  titre: string;
  typeProjet: string;
  slug: string;
  target: number;
  image: {
    id: string;
    alt: string;
    url: string;
    width: string;
    height: string;
  };
};

const LastWork = ({
  titre,
  typeProjet,
  slug,
  image,
  target,
}: LastWorkType): JSX.Element => {
  return (
    <>
      <div className="col-work-infos">
        <div
          className="wrap-infos"
          data-scroll
          data-scroll-sticky
          data-scroll-target={`#work${target}`}
        >
          <h3 className="title-work">{titre}</h3>
          <p className="type-work">{typeProjet}</p>
          <Link href={`/projets/${slug}`}>
            <a className="wrap-cta">
              <span className="link-underline link-white">Voir le projet</span>
              <span className="link-arrow">
                <Image
                  src="/images/link-arrow-white.svg"
                  layout="intrinsic"
                  width={24}
                  height={24}
                  alt="Voir le site"
                />
              </span>
            </a>
          </Link>
        </div>
      </div>
      <div className="col-work">
        <div className="wrap-img">
          <div className="inner-img">
            <Link href={`/projets/${slug}`}>
              <a className="link-img-work">
                <Image
                  className="img-work"
                  src={image.url}
                  layout="responsive"
                  width={image.width}
                  height={image.height}
                  alt={image.alt}
                  data-cursor-label="Voir le projet"
                  data-scroll
                  data-scroll-speed="-3"
                />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LastWork;
