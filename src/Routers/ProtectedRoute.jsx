import { React } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { accessToken } = useAuth();
  return accessToken ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
