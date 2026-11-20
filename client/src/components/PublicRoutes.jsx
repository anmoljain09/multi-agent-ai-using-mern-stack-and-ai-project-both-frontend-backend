import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/userService.jsx";

const PublicRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
            try {
                const user = await getCurrentUser();

                if (user) {
                setIsAuthenticated(true);
                }
            } 
            catch (error) {
                setIsAuthenticated(false);
            } 
            finally {
                setLoading(false);
            }
    };

    checkUser();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return isAuthenticated ? <Navigate to="/home" replace /> : children;
};

export default PublicRoute;