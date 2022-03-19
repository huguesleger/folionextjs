// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace GraphQLResponse {
  export interface HomePage {
    home: Home;
  }
  export interface Home {
    id: string;
    titre: string;
  }
}
