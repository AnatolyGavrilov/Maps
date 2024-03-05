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

export const publicationsCreate = () => {
  return {
    query: gql`
      mutation ($input: CreatePostInput!) {
        createPost(input: $input) {
          id
          title
          body
        }
      }
    `,
  };
};
