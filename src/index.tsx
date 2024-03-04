import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Users from "./pages/Users/Users";
import Publications from "./pages/Publication/Publications";
import { Provider } from "react-redux";
import { rootStore } from "store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

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

root.render(
  <React.StrictMode>
    <Provider store={rootStore()}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
