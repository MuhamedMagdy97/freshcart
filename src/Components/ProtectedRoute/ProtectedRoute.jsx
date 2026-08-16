import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function ProtectedRoute({ children }) {
  const { userToken } = useContext(UserContext);

  return userToken ? children : <Navigate to="/login" replace />;
}