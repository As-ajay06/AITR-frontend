import { useEffect } from "react";
import { Navigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
    // const { token, loading } = useAuth();
    const loading = false
    // temprory solution

    // now i need to verify and also need to remove token and chagne the navbar according to role of the user.
    const token = localStorage.getItem('token')

    if (loading) return <div>Loading...</div>;

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
