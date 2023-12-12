import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export const ProtectedRoute = ({ children }: any) => {
  const { currentUser } = useUserContext();
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
};
