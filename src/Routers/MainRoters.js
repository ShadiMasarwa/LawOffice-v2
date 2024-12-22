import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import AddPerson from "../pages/AddPerson";
import Customers from "../pages/Customers";
import Customer from "../pages/Customer";
import Files from "../pages/Files";
import Manage from "../pages/Manage";
import Calendar from "../pages/Calendar";
// import Footer from "../components/Footer";
import Tasks from "../pages/Tasks";
import Navbar from "../components/Navbar";
import ProtectedRoute from "./ProtectedRoute";

const MainRouters = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <Home />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      }, // Public route
      {
        path: "addClient",
        element: (
          <ProtectedRoute>
            <AddPerson />
          </ProtectedRoute>
        ),
      },
      {
        path: "showClients",
        element: (
          <ProtectedRoute>
            <Customers />
          </ProtectedRoute>
        ),
      },
      {
        path: "client",
        element: (
          <ProtectedRoute>
            <Customer />
          </ProtectedRoute>
        ),
      },
      {
        path: "showfiles",
        element: (
          <ProtectedRoute>
            <Files />
          </ProtectedRoute>
        ),
      },
      {
        path: "calendar",
        element: (
          <ProtectedRoute>
            <Calendar />
          </ProtectedRoute>
        ),
      },
      {
        path: "manage",
        element: (
          <ProtectedRoute>
            <Manage />
          </ProtectedRoute>
        ),
      },
      {
        path: "showClient",
        element: (
          <ProtectedRoute>
            <Customer />
          </ProtectedRoute>
        ),
      },
      {
        path: "tasks",
        element: (
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default MainRouters;
