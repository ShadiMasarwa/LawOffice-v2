import { createBrowserRouter } from "react-router-dom";

import Layout from "../pages/FrontPages/FpLayout";
import Login from "../pages/FrontPages/Login";
import Register from "../pages/FrontPages/Register";
import Logout from "../pages/FrontPages/Logout";
import FrontPage from "../pages/FrontPages/FrontPage";
import Rules from "../pages/FrontPages/Rules";
import ErrorPage from "../pages/FrontPages/ErrorPage";

const FPRouters = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <FrontPage /> },
      { path: "login", element: <Login /> },
      { path: "logout", element: <Logout /> },
      { path: "register", element: <Register /> },
      { path: "rules", element: <Rules /> },
    ],
  },
]);

export default FPRouters;
