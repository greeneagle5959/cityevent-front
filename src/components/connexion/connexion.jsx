import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./connexion.css";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/footer";
import HeaderSimple from "../header/headersimple";

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
            <HeaderSimple />
            <br />
            <form onSubmit={formConnexion} className="row mt-5 mb-4 mx-auto">
                <div className="col-lg-5 mx-auto bg-light p-4 rounded shadow">
                    <div className="form-group lg-4  mx-auto">
                        <label className="py-2" htmlFor="email"><h5>Adresse email :</h5></label>
                        <input type="email" className="form-control " onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" />
                        <small id="emailHelp" className="form-text text-muted"></small>
                    </div>
                    <div className="form-group mx-auto ">
                        <label className="py-2" htmlFor="password"><h5>Mot de passe :</h5></label>
                        <input type="password" className="form-control py-2" onChange={(e) => setMdp(e.target.value)} id="password" />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3 mx-auto d-block">Se connecter</button><br />
                    <p className="text-center">Pas encore de compte ? <button onClick={() => navigate("/inscription")} className="inscript btn btn-link p-0 m-0 align-baseline mx-auto">
                        Inscription
                    </button></p>
                </div>
            </form>

            <Footer />
        </>
    );



}