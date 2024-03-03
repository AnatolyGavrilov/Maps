import { gql } from "@apollo/client";

export const usersRequest = {
  query: gql`
    query ($options: PageQueryOptions) {
      users(options: $options) {
        data {
          id
          name
          username
          email
          address {
            street
            suite
            city
            zipcode
            geo {
              lat
              lng
            }
          }
          phone
          website
          company {
            name
            catchPhrase
            bs
          }
        }
        meta {
          totalCount
        }
      }
    }
  `,
};
