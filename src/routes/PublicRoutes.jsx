import { Navigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

export default function PublicRoute({ children }) {
    // const { token, loading } = useAuth();
    const loading = false;
    // temporary solution

    const token = localStorage.getItem('token');
    
    if (loading) return <div>Loading...</div>;

    if (token) {
        return <Navigate to="/" replace />;
    }

    return children;
}
