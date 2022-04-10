import { request } from "../../lib/datocms/datocms";
import Query from "../../lib/datocms/queries";
import { GraphQLResponse } from "../../lib/datocms/types";
import Image from "next/image";
import { useEffect } from "react";
// import { useLocomotiveScroll } from "react-locomotive-scroll";

export const getStaticPaths = async () => {
  const res = (await request(
    Query.QUERY_SLUGS_PROJETS
  )) as GraphQLResponse.AllProjets;
  const paths = res.allProjets.map((item) => {
    return {
      params: { slug: item.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

// @ts-ignore
export async function getStaticProps({ params }) {
  const res = (await request(Query.QUERY_PROJET_BY_SLUG, {
    slug: params.slug,
  })) as GraphQLResponse.Projet;

  if (!res) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { projet: res.projet },
    revalidate: 1,
  };
}

export default function CardDetails(props: { projet: GraphQLResponse.Projet }) {
  // const { scroll } = useLocomotiveScroll();
  // useEffect(() => {
  //   const app = document.querySelector(".app");
  //   app.classList.add("overflow-y");
  // });

  const projet: GraphQLResponse.Projet = props.projet;

  if (!projet) return null;
  const { titre, description, imageHeader } = projet;

  return (
    <>
      <div data-scroll-section>
        <p>{titre}</p>
        <p>{description}</p>
        <Image
          className="thumb"
          src={imageHeader.url}
          layout="intrinsic"
          width={1920}
          height={1280}
          alt="montpellier"
        />
        <p data-scroll data-scroll-speed="1">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam
          temporibus quidem laborum ducimus deserunt quae amet dolores
          reiciendis autem veritatis quia, consequatur officia expedita, unde
          odio! Est nulla aspernatur rerum.
        </p>
        <p data-scroll data-scroll-speed="3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quam
          id fugit cupiditate tempora mollitia possimus inventore reiciendis
          repellendus laboriosam praesentium, harum accusantium maiores,
          asperiores sint reprehenderit dolore commodi totam!
        </p>
        <p data-scroll data-scroll-speed="1">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis
          quae distinctio, iusto harum non quia corporis inventore mollitia,
          incidunt soluta ipsum magni nesciunt aut, libero quisquam voluptas
          laboriosam ex fugiat.
        </p>
        <p data-scroll data-scroll-speed="1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A deserunt
          adipisci reiciendis praesentium non repellat quidem quae quaerat nemo
          animi placeat veniam vero laborum tempora, blanditiis molestias
          accusantium mollitia beatae?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A deserunt
          adipisci reiciendis praesentium non repellat quidem quae quaerat nemo
          animi placeat veniam vero laborum tempora, blanditiis molestias
          accusantium mollitia beatae?
        </p>
        <p data-scroll data-scroll-speed="1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A deserunt
          adipisci reiciendis praesentium non repellat quidem quae quaerat nemo
          animi placeat veniam vero laborum tempora, blanditiis molestias
          accusantium mollitia beatae?
        </p>
        <p data-scroll data-scroll-speed="1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A deserunt
          adipisci reiciendis praesentium non repellat quidem quae quaerat nemo
          animi placeat veniam vero laborum tempora, blanditiis molestias
          accusantium mollitia beatae?
        </p>
        <p data-scroll data-scroll-speed="1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A deserunt
          adipisci reiciendis praesentium non repellat quidem quae quaerat nemo
          animi placeat veniam vero laborum tempora, blanditiis molestias
          accusantium mollitia beatae?
        </p>
        <p data-scroll data-scroll-speed="1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A deserunt
          adipisci reiciendis praesentium non repellat quidem quae quaerat nemo
          animi placeat veniam vero laborum tempora, blanditiis molestias
          accusantium mollitia beatae?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A deserunt
          adipisci reiciendis praesentium non repellat quidem quae quaerat nemo
          animi placeat veniam vero laborum tempora, blanditiis molestias
          accusantium mollitia beatae?
        </p>
        <p data-scroll data-scroll-speed="1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A deserunt
          adipisci reiciendis praesentium non repellat quidem quae quaerat nemo
          animi placeat veniam vero laborum tempora, blanditiis molestias
          accusantium mollitia beatae?
        </p>
        <p data-scroll data-scroll-speed="1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A deserunt
          adipisci reiciendis praesentium non repellat quidem quae quaerat nemo
          animi placeat veniam vero laborum tempora, blanditiis molestias
          accusantium mollitia beatae?
        </p>
        <p data-scroll data-scroll-speed="1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A deserunt
          adipisci reiciendis praesentium non repellat quidem quae quaerat nemo
          animi placeat veniam vero laborum tempora, blanditiis molestias
          accusantium mollitia beatae?
        </p>
      </div>
    </>
  );
}
