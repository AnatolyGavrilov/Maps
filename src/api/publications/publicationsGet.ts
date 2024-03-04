import { gql } from "@apollo/client";

export const publicationsGet = {
  query: gql`
    query {
      user(id: 1) {
        posts {
          data {
            id
            title
          }
        }
      }
    }
  `,
};
