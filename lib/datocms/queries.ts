const QUERY_HOME = `
query MyQuery {
    home {
      _modelApiKey
      id
      titre
      image {
        alt
        height
        id
        url
        width
      }
    }
  }
  `;

const QUERY_SLUGS_TEST = `
query MyQuery {
  allTests {
    id
    slug
  }
}
`;

const QUERY_CARD_TEST = `
query MyQuery {
  allTests {
    id
    slug
    titre
  }
}
`;

const QUERY_TEST_BY_SLUG = `
query MyQuery ($slug: String){
  test(filter: {slug: {eq: $slug}}) {
    id
    titre
    description
    annee
  }
}
`;

const QUERY_SLUGS_PROJETS = `
query MyQuery {
  allProjets {
    id
    slug
  }
}
`;

const QUERY_CARD_PROJETS = `
query MyQuery {
  allProjets {
    id
    slug
    titre
    imageHeader {
      alt
      height
      id
      url
      width
    }
  }
}
`;

const QUERY_PROJET_BY_SLUG = `
query MyQuery ($slug: String){
  projet(filter: {slug: {eq: $slug}}) {
    id
    titre
    description
    imageHeader {
      alt
      height
      id
      url
      width
    }
  }
}
`;

const Query = {
  QUERY_HOME,
  QUERY_SLUGS_TEST,
  QUERY_CARD_TEST,
  QUERY_TEST_BY_SLUG,
  QUERY_SLUGS_PROJETS,
  QUERY_CARD_PROJETS,
  QUERY_PROJET_BY_SLUG,
};

export default Query;