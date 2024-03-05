import { gql } from "@apollo/client";

export const publicationsGet = (userId: any) => {
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
