import { Navigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

export default function PublicRoute({ children }) {
    // const { token, loading } = useAuth();


    const token = localStorage.getItem('token');
    
    if (loading) return <div>Loading...</div>;

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
