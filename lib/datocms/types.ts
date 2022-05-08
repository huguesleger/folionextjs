import { StructuredText } from "datocms-structured-text-utils";

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
    imageSlider: Image;
    annee: string;
    titreCharte: string;
    descriptionCharte: string;
    texteProjet: string;
    descriptionProjet: string;
    intervention: string;
    siteWeb: string;
    imageCharte: ImageCharte[];
    imageFull: Image;
    imagePage: ImagePage[];
    imageTemplateDesktop: Image;
    imageTemplateMobile: Image;
    description: StructuredText<any>;
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

interface ImageCharte {
  id: string;
  image: Image;
}

interface ImagePage {
  id: string;
  image: Image;
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
