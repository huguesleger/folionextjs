import { request } from "../../lib/datocms/datocms";
import Query from "../../lib/datocms/queries";
import { GraphQLResponse } from "../../lib/datocms/types";
import Image from "next/image";
import Link from "next/link";
import { StructuredText } from "react-datocms";
import HeaderProject from "../../components/Project/HeaderProject";
import React from "react";

const CardDetails: (props: {
  projet: GraphQLResponse.Projet;
  projets: GraphQLResponse.Projet[];
}) => JSX.Element = (props: {
  projet: GraphQLResponse.Projet;
  projets: GraphQLResponse.Projet[];
}) => {
  const projets: GraphQLResponse.Projet[] = props.projets;

  const getNextpost = () => {
    const index = projets.findIndex((el) => el.slug === props.projet.slug);
    if (index === (projets && projets.length) - 1) {
      return projets[0];
    } else {
      return projets[index + 1];
    }
  };

  const getPrevpost = () => {
    const index = projets.findIndex((el) => el.slug === props.projet.slug);
    if (index === 0) {
      return projets[(projets && projets.length) - 1];
    } else {
      return projets[index - 1];
    }
  };

  return (
    <>
      <div className="project-content">
        <div className="project-header" data-scroll-section>
          <HeaderProject
            titre={props.projet.titre}
            siteWeb={props.projet.siteWeb}
            intervention={props.projet.intervention}
            annee={props.projet.annee}
          />
        </div>
        <div className="project-img-full" data-scroll-section>
          <div className="inner-img-full">
            <Image
              className=""
              src={props.projet.imageFull.url}
              layout="fill"
              objectFit="cover"
              quality={100}
              alt={props.projet.imageFull.alt}
              data-scroll
              data-scroll-speed="-2"
            />
          </div>
        </div>
        <div
          className="project-section project-description"
          data-scroll-section
        >
          <div className="container">
            <div className="inner-txt">
              <StructuredText data={props.projet.description} />
            </div>
          </div>
        </div>
        <div className="project-section project-charte" data-scroll-section>
          <div className="container">
            {props.projet.titreCharte && <h3>{props.projet.titreCharte}</h3>}
            {props.projet.descriptionCharte && (
              <p>{props.projet.descriptionCharte}</p>
            )}
            <div className="wrap-img-charte">
              {props.projet.imageCharte.map((el, index) => {
                if (index % 2 == 0) {
                  return (
                    <div
                      key={el.id}
                      className="block-img"
                      data-scroll
                      data-scroll-speed="1"
                    >
                      <Image
                        key={el.id}
                        className=""
                        src={el.image.url}
                        layout="responsive"
                        width={el.image.width}
                        height={el.image.height}
                        alt={el.image.alt}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={el.id}
                      className="block-img"
                      data-scroll
                      data-scroll-speed="-1"
                    >
                      <Image
                        key={el.id}
                        className=""
                        src={el.image.url}
                        layout="responsive"
                        width={el.image.width}
                        height={el.image.height}
                        alt={el.image.alt}
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
        <div
          className="project-section project-template-mobile"
          data-scroll-section
        >
          <div className="container">
            <div className="wrap-img-mobile">
              <Image
                className=""
                src={props.projet.imageTemplateMobile.url}
                layout="responsive"
                width={props.projet.imageTemplateMobile.width}
                height={props.projet.imageTemplateMobile.height}
                alt={props.projet.imageTemplateMobile.alt}
              />
            </div>
          </div>
        </div>
        <div
          className="project-section project-template-desktop"
          data-scroll-section
        >
          <div className="container">
            <Image
              key={props.projet.imageTemplateDesktop.id}
              className=""
              src={props.projet.imageTemplateDesktop.url}
              layout="responsive"
              width={props.projet.imageTemplateDesktop.width}
              height={props.projet.imageTemplateDesktop.height}
              alt={props.projet.imageTemplateDesktop.alt}
            />
          </div>
        </div>
        <div className="project-section project-text" data-scroll-section>
          <div className="container">
            <h3>{props.projet.texteProjet}</h3>
            <p>{props.projet.descriptionProjet}</p>
          </div>
        </div>
        <div className="project-section project-charte" data-scroll-section>
          <div className="container">
            <div className="wrap-img-charte">
              {props.projet.imagePage.map((el, index) => {
                if (index % 2 == 0) {
                  return (
                    <div
                      key={el.id}
                      className="block-img"
                      data-scroll
                      data-scroll-speed="1"
                    >
                      <Image
                        key={el.id}
                        className=""
                        src={el.image.url}
                        layout="responsive"
                        width={el.image.width}
                        height={el.image.height}
                        alt={el.image.alt}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={el.id}
                      className="block-img"
                      data-scroll
                      data-scroll-speed="-1"
                    >
                      <Image
                        key={el.id}
                        className=""
                        src={el.image.url}
                        layout="responsive"
                        width={el.image.width}
                        height={el.image.height}
                        alt={el.image.alt}
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
        <div className="project-section project-link" data-scroll-section>
          <div className="container">
            <Link href={`https://${props.projet.siteWeb}`}>
              <a className="btn btn-primary">Voir le site</a>
            </Link>
          </div>
        </div>
        <div className="project-section project-items" data-scroll-section>
          <div className="container">
            <div className="prev">
              <Link href={`/projets/${getPrevpost().slug}`}>
                <a className="">
                  <span className="">Prev: </span>
                  <span className="">{getPrevpost().titre}</span>
                </a>
              </Link>
            </div>
            <div className="next">
              <Link href={`/projets/${getNextpost().slug}`}>
                <a className="" rel="prev">
                  <span className="">Next: </span>
                  <span className="">{getNextpost().titre}</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDetails;

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
    fallback: false,
  };
};

// @ts-ignore
export async function getStaticProps({ params }) {
  const res = (await request(Query.QUERY_PROJET_BY_SLUG, {
    slug: params.slug,
  })) as GraphQLResponse.Projet;
  const resAll = (await request(
    Query.QUERY_CARD_PROJETS
  )) as GraphQLResponse.AllProjets;

  if (!res) {
    return {
      redirect: {
        destination: "/projets",
        permanent: false,
      },
    };
  }

  return {
    props: {
      projet: res.projet,
      projets: (resAll && resAll.allProjets) || [],
    },
    revalidate: 1,
  };
}
