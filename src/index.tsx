import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Users from "./pages/Users/Users";
import Publications from "./pages/Publications/Publications";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
loadDevMessages();
loadErrorMessages();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Users />,
  },
  {
    path: "/publications/:userId",
    element: <Publications />,
  },
]);

export const client = new ApolloClient({
  uri: "https://graphqlzero.almansi.me/api",
  cache: new InMemoryCache(),
});

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
