import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export default function AdminRoute({ children }) {
  const { currentUser } = useAuth();

  return currentUser && currentUser.uid === "s7zP0awIr3frjriqiypTF9TeQ003" ? children : <Navigate to="/login" />;
}