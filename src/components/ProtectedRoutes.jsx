// components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";

export default function ProtectedRoute({ children, allowedRoles }) {
  const role = getUserRole();
  if (!role || !allowedRoles.includes(role)) return <Navigate to="/login" />;
  return children;
}
