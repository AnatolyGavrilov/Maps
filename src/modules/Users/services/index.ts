import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../types";
import { ErrorMessageType } from "types";
import { configuredAxios } from "api";
import { Api } from "enum";
import { HandleError } from "common/utils/handleError";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const getUsersThunk = createAsyncThunk<any>(
  "application/get",
  async () => {
    try {
      const client = new ApolloClient({
        uri: "https://graphqlzero.almansi.me/api", //link to our fake server
        cache: new InMemoryCache(),
      });

      const data = client.query({
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
      });

      return data;
    } catch (error) {
      // const errorObject = HandleError(error);
      // return rejectWithValue(errorObject);
    }
  }
);
