import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RouteProtector: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");

    useEffect(() => {
        if (!token) {
            // If no token, logout and redirect
            localStorage.removeItem("userToken");
            navigate("/"); // or your login path
        }
    }, [token, navigate]);

    // If token exists, render the protected content
    return <>{token ? children : null}</>;
};

export default RouteProtector;