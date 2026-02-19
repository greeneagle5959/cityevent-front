import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./userDashboard.css";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
    // Supprime le token
    const navigate = useNavigate();
    const deconnexion = () => {
        localStorage.removeItem("token");
        navigate("/connexion");
    };


    return (
        <div>
            <h1>Dashboard Utilisateur</h1>
            <button className="btn btn-primary" onClick={() => navigate("/createEvenements")}>
                Ajouter un Evenements
            </button>
            <button className="btn btn-danger" onClick={deconnexion}>
                Déconnexion
            </button>
        </div>
    );
}

export default UserDashboard;