import Link from "next/link";
import Image from "next/image";

import { getPost, getSlugs } from "../../utils/wordpress";
import dynamic from "next/dynamic";

const Pixi = dynamic(() => import("../../components/Pixi"), {
  ssr: false,
});

export default function PostPage({ post }) {
  return (
    <>
      <div className="container pt-5">
        <h1 className="text-center pb-5">{post.title.rendered}</h1>
        <Image
          className="img-fluid"
          src={
            post._embedded["wp:featuredmedia"][0].media_details.sizes.full
              .source_url
          }
          width={180}
          height={120}
          layout="responsive"
        />
        <div
          className="card-text pb-5"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        ></div>
        <Link href="/">
          <a className="btn btn-primary">Back to Home</a>
        </Link>
      </div>
      <div className="container">
        <div id="root">
          <Pixi />
        </div>
      </div>
    </>
  );
}

//hey Next, these are the possible slugs
export async function getStaticPaths() {
  const paths = await getSlugs("posts");

  return {
    paths,
    //this option below renders in the server (at request time) pages that were not rendered at build time
    //e.g when a new blogpost is added to the app
    fallback: "blocking",
  };
}

//access the router, get the id, and get the data for that post

export async function getStaticProps({ params }) {
  const post = await getPost(params.slug);

  return {
    props: {
      post,
    },
    revalidate: 10, // In seconds
  };
}
