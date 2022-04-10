export namespace GraphQLResponse {
  export interface HomePage {
    home: Home;
  }

  // export interface Projet {
  //   projet: Projet;
  // }

  export interface AllTests {
    allTests: [Test];
  }

  export interface Test {
    test: Test;
  }

  export interface Test {
    id: string;
    slug: string;
    titre: string;
    description: string;
    annee: string;
  }

  export interface AllProjets {
    allProjets: [Projet];
  }

  export interface Projet {
    projet: Projet;
  }

  export interface Projet {
    id: string;
    slug: string;
    titre: string;
    description: string;
    imageHeader: Image;
  }

  export interface Home {
    id: string;
    titre: string;
    image: Image;
  }

  // export interface Projet {
  //   id: string;
  //   slider: Slider[];
  // }
}

interface Image {
  id: string;
  alt: string;
  url: string;
  width: string;
  height: string;
}

interface Slider {
  id: string;
  _modeApiKey: string;
  titre: string;
  image: Image;
  lien: string;
}
