import Layout from "./Layout";
import Home from "../services/Home/Home";
import Error from "../Pages/Error/Error";
import { createBrowserRouter } from "react-router";
import CartItems from "../Pages/CartItems/CartItems";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart-items",
        element: <CartItems />,
      },
    ],
  },
]);
