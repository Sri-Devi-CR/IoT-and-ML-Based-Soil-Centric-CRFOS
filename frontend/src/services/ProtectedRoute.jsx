// ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return "Loading.."
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;