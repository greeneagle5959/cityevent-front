import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./connexion.css";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/Footer.jsx";
import Header from "../header/Header.jsx";

export default function Connexion() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [mdp, setMdp] = useState('');
    const [message, setMessage] = useState('');

    const formConnexion = async (e) => {

        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/users/login", {
                method: 'POST',
                headers: { 'content-Type': 'application/json' },
                body: JSON.stringify({ email_utilisateur: email, mdp_utilisateur: mdp })
            });

            if (!response.ok) {
                setMessage("Email ou mot de passe incorrect");
                return;
            }

            const data = await response.json();
            localStorage.setItem("token", data.token);

            const connecterResponse = await fetch("http://127.0.0.1:8000/api/v1/users/connecter", {
                method: 'GET',
                headers: { Authorization: "Bearer " + data.token }
            });
            if (!connecterResponse.ok) {
                setMessage("Impossible de récupérer l'utilisateur");
                return;
            }
            const connecterData = await connecterResponse.json();
            if (connecterData.roles.includes("ROLE_ADMIN")) {
                navigate("/adminDashboard");
            } else if (connecterData.roles.includes("ROLE_MODERATEUR")) {
                navigate("/moderatorDashboard");
            } else {
                navigate("/userDashboard");
            }


        } catch (erreur) {
            setMessage("erreur de connexion");
        }

    };
    return (
        <>
            <Header scrolled={false} />
            <div className="connexion-container">
                <div className="connexion-wrapper">
                    <div className="connexion-header">
                        <h1 className="connexion-title">Connexion</h1>
                        <p className="connexion-subtitle">Accédez à votre compte CityEvents</p>
                    </div>

                    <form className="connexion-form" onSubmit={formConnexion}>
                        {message && <div className={`form-message ${message.includes('incorrect') ? 'error' : 'success'}`}>{message}</div>}

                        <div className="form-group-wrap">
                            <div className="form-field">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-input"
                                    placeholder="Entrez votre adresse email"
                                    required
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="password" className="form-label">Mot de passe</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={mdp}
                                    onChange={(e) => setMdp(e.target.value)}
                                    className="form-input"
                                    placeholder="Entrez votre mot de passe"
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="connexion-btn">
                            Se connecter
                        </button>

                        <div className="connexion-footer">
                            <p className="connexion-text">
                                Pas encore de compte ? 
                                <button 
                                    type="button"
                                    onClick={() => navigate("/inscription")}
                                    className="connexion-link"
                                >
                                    Inscrivez-vous
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );



}