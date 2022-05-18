import React from "react";
import Link from "next/link";
import Image from "next/image";
import formatTxt from "../lib/functions/formatTxt";
import { request } from "../lib/datocms/datocms";
import Query from "../lib/datocms/queries";
import { GraphQLResponse } from "../lib/datocms/types";

const Contact: (props: { contact: GraphQLResponse.Contact }) => JSX.Element =
  (props: { contact: GraphQLResponse.Contact }) => {
    return (
      <div className="contact">
        <div className="wrap-content">
          <div className="title">
            <h1>{formatTxt(props.contact.titre)}</h1>
          </div>
        </div>
        <div className="wrap-social">
          <div className="img-contact">
            <Image
              className="thumb"
              src={props.contact.image.url}
              layout="responsive"
              width={props.contact.image.width}
              height={props.contact.image.height}
              alt={props.contact.image.alt}
            />
          </div>
          <div className="email">
            <Link href="mailto:contactme@hl-developerz.com">
              <a className="wrap-cta">
                <span className="link-arrow">
                  <Image
                    src="/images/link-arrow-white.svg"
                    layout="intrinsic"
                    width={24}
                    height={24}
                    alt=""
                  />
                </span>
                <span className="link-white">{props.contact.email}</span>
              </a>
            </Link>
          </div>
          <div className="address">
            <p className="title">Adresse :</p>
            <p>{props.contact.pays}</p>
            <p>{props.contact.ville}</p>
          </div>
        </div>
      </div>
    );
  };

export default Contact;

export async function getStaticProps() {
  const res = (await request(
    Query.QUERY_CONTACT
  )) as GraphQLResponse.ContactPage;
  return {
    props: {
      contact: res.contact,
    },
  };
}
