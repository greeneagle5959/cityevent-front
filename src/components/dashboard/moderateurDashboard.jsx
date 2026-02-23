import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ModerateurDashboard.css";
import { useNavigate } from "react-router-dom";


function ModerateurDashboard() {

    const navigate = useNavigate();
    const deconnexion = () => {
        // Supprime le token
        localStorage.removeItem("token");
        // Redirige vers la page de connexion
        navigate("/connexion");
    };
    return (
        <div>
            <h1>Dashboard Moderateur</h1>

            <button className="btn btn-danger" onClick={deconnexion}>
                Déconnexion
            </button>
        </div>
    );
}

export default ModerateurDashboard;
