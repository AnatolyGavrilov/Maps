import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { getUsersThunk } from "modules/Users/services";
import { useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const Users = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users);
  // console.log("users", users);

  const client = new ApolloClient({
    uri: "https://graphqlzero.almansi.me/api", //link to our fake server
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    dispatch(getUsersThunk());
    client
      .query({
        query: gql`
          query ($options: PageQueryOptions) {
            users(options: $options) {
              data {
                id
                username
                email
              }
              meta {
                totalCount
              }
            }
          }
        `,
      })
      .then((result) => console.log(result));
  }, []);

  return <div>Страница юзеров</div>;
};

export default Users;
