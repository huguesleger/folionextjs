import Post from "../components/Post";
import { getPosts } from "../utils/wordpress";

const Home = ({ posts }) => {
  // const jsxPosts = posts.map((post) => {
  //   const featuredMedia = post["_embedded"]["wp:featuredmedia"][0];
  //   return <Post post={post} featuredMedia={featuredMedia} key={post.id} />;
  // });

  return (
    <div className="homepage">
      <div>hello</div>
      {/* <div className="post">{jsxPosts}</div> */}
    </div>
  );
};

export default Home;

// export async function getStaticProps({ params }) {
//   const posts = await getPosts();
//   return {
//     props: {
//       posts,
//     },
//     revalidate: 10, // In seconds
//   };
// }
