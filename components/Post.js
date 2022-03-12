// import Link from "next/link";
// import Image from "next/image";
// //to use Image with an external url, add some config on next.config.js
// //for more info, check out these docs https://nextjs.org/docs/basic-features/image-optimization

// import { getDate } from "../utils/utils";

// export default function Post({ post, featuredMedia }) {
//   return (
//     <div className="card mb-3" style={{ maxWidth: "540px" }}>
//       <div className="row g-0">
//         <div className="col-md-4">
//           <Image
//             src={featuredMedia["media_details"].sizes.medium["source_url"]}
//             width={600}
//             height={400}
//             alt={featuredMedia["alt_text"]}
//             className="thumb"
//           />
//         </div>
//         <div className="col-md-8">
//           <div className="card-body">
//             <h5 className="card-title">{post.title.rendered}</h5>
//             <div
//               className="card-text"
//               dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
//             ></div>
//             <p>{post.acf.titre}</p>
//             <p className="card-text">
//               <small className="text-muted">Le {getDate(post.modified)}</small>
//             </p>
//             <Link href={`/posts/${post.slug}`}>
//               <a className="btn btn-primary">See more</a>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

const Post = () => {
  // const jsxPosts = posts.map((post) => {
  //   const featuredMedia = post["_embedded"]["wp:featuredmedia"][0];
  //   return <Post post={post} featuredMedia={featuredMedia} key={post.id} />;
  // });

  return (
    <div className="post">
      <div>hello</div>
      {/* <div className="post">{jsxPosts}</div> */}
    </div>
  );
};

export default Post;
