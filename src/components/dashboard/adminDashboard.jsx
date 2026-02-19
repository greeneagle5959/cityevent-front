import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./adminDashboard.css";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
    const navigate = useNavigate();
    const deconnexion = () => {
        // Supprime le token
        localStorage.removeItem("token");
        // Redirige vers la page de connexion
        navigate("/connexion");
    };

    return (
        <div>
            <h1>Dashboard Admin</h1>

            <button className="btn btn-danger" onClick={deconnexion}>
                Déconnexion
            </button>
        </div>
    );
}

export default AdminDashboard;
