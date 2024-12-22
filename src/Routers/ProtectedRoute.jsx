import { React, useContext } from "react";
import { Navigate } from "react-router-dom";
import GlobalContext from "../Hooks/GlobalContext";

const ProtectedRoute = ({ children }) => {
  const { accessToken } = useContext(GlobalContext);
  return accessToken ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
