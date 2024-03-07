import { gql } from "@apollo/client";

export const GET_PUBLICATIONS = gql`
  query user($userId: ID!) {
    user(id: $userId) {
      posts {
        data {
          id
          title
        }
      }
    }
  }
`;

export const publicationsCreate = () => {
  return {
    query: gql`
      mutation ($input: CreatePostInput!) {
        createPost(input: { title: "test", body: "jest" }) {
          id
          title
          body
        }
      }
    `,
  };
};
