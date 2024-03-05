import { gql } from "@apollo/client";

export const publicationsGet = (userId: string) => {
  return {
    query: gql`
      query {
        user(id: ${userId}) {
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
};
