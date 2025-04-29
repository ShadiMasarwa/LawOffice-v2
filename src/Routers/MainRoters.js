import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import AddPerson from "../pages/AddPerson";
import Customers from "../pages/Customers";
import Customer from "../pages/Customer";
import Files from "../pages/Files";
import Manage from "../pages/Manage";
import Calendar from "../pages/Calendar";
import Tasks from "../pages/Tasks";
import Navbar from "../components/Navbar";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../pages/FrontPages/FpLayout";
import Login from "../pages/FrontPages/Login";
import FrontPage from "../pages/FrontPages/FrontPage";
import Rules from "../pages/FrontPages/Rules";
import ErrorPage from "../pages/FrontPages/ErrorPage";
import Register from "../pages/FrontPages/Register";
import Finanace from "../pages/Finanace";

const MainRouters = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    loaderElement: <div>Loading...</div>,
    children: [
      {
        index: true,
        element: (
          <Layout>
            <FrontPage />
          </Layout>
        ),
      },
      {
        path: "login",
        element: (
          <Layout>
            <Login />
          </Layout>
        ),
      },

      {
        path: "register",
        element: (
          <Layout>
            <Register />
          </Layout>
        ),
      },
      {
        path: "rules",
        element: (
          <Layout>
            <Rules />
          </Layout>
        ),
      },
      // Protected route
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Navbar>
              <Home />
            </Navbar>
          </ProtectedRoute>
        ),
      },
      {
        path: "addClient",
        element: (
          <ProtectedRoute>
            <Navbar>
              <AddPerson />
            </Navbar>
          </ProtectedRoute>
        ),
      },
      {
        path: "showClients",
        element: (
          <ProtectedRoute>
            <Navbar>
              <Customers />
            </Navbar>
          </ProtectedRoute>
        ),
      },
      {
        path: "client",
        element: (
          <ProtectedRoute>
            <Navbar>
              <Customer />
            </Navbar>
          </ProtectedRoute>
        ),
      },
      {
        path: "showfiles",
        element: (
          <ProtectedRoute>
            <Navbar>
              <Files />
            </Navbar>
          </ProtectedRoute>
        ),
      },
      {
        path: "calendar",
        element: (
          <ProtectedRoute>
            <Navbar>
              <Calendar />
            </Navbar>
          </ProtectedRoute>
        ),
      },
      {
        path: "manage",
        element: (
          <ProtectedRoute>
            <Navbar>
              <Manage />
            </Navbar>
          </ProtectedRoute>
        ),
      },
      {
        path: "showClient",
        element: (
          <ProtectedRoute>
            <Navbar>
              <Customer />
            </Navbar>
          </ProtectedRoute>
        ),
      },
      {
        path: "tasks",
        element: (
          <ProtectedRoute>
            <Navbar>
              <Tasks />
            </Navbar>
          </ProtectedRoute>
        ),
      },
      {
        path: "finance",
        element: (
          <ProtectedRoute>
            <Navbar>
              <Finanace />
            </Navbar>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default MainRouters;
