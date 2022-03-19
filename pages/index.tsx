import { request } from "../lib/datocms/datocms";
import Query from "../lib/datocms/queries";
import { GraphQLResponse } from "../lib/datocms/types";

const Home: (props: { home: GraphQLResponse.Home }) => JSX.Element = (props: {
  home: GraphQLResponse.Home;
}) => {
  return (
    <div className="homepage">
      <h1>{props.home.titre}</h1>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const res = (await request(Query.QUERY_HOME)) as GraphQLResponse.HomePage;
  return {
    props: {
      home: res.home,
    },
  };
}
