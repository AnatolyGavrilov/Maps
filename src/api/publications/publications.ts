import { gql } from "@apollo/client";

export const GET_PUBLICATIONS = gql`
  query user($userId: ID!) {
    user(id: $userId) {
      posts {
        data {
          id
          body
          title
        }
      }
    }
  }
`;

export const ADD_PUBLICATION = gql`
  mutation ($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      body
    }
  }
`;

export const UPDATE_PUBLICATION = gql`
  mutation ($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      title
      body
    }
  }
`;
