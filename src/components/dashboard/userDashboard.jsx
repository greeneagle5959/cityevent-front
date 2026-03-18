import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./userDashboard.css";
import { useNavigate } from "react-router-dom";

function UserDashboard() {

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [prenom, setPrenom] = useState('');
    const [message, setMessage] = useState('');

    const tokenId = localStorage.getItem("token");

    const deconnexion = () => {
        localStorage.removeItem("token");
        navigate("/connexion");
    };
    const handleDelete = async (eventId) => {
        try {
            await fetch(`http://127.0.0.1:8000/api/v1/events/${eventId}/delete`,
                {
                    method: "DELETE",
                    headers: { Authorization: "Bearer " + tokenId }
                }
            );

            setData(prev => prev.filter(ev => ev.id !== eventId));

        } catch {
            alert("Erreur serveur");
        }
    };
    const handleEdit = (eventId) => {
        navigate(`/afficheevents?edit=${eventId}`);
    };
    useEffect(() => {

        async function fetchData() {
            const connecterResponse = await fetch(
                "http://127.0.0.1:8000/api/v1/users/connecter",
                {
                    headers: { Authorization: "Bearer " + tokenId }
                }
            );

            if (!connecterResponse.ok) {
                setMessage("Erreur user connecté");
                return;
            }

            const connecterData = await connecterResponse.json();

            setPrenom(connecterData.prenom);
            const userId = connecterData.userId;

            if (!userId) {
                setMessage("Utilisateur connecté invalide");
                return;
            }

            const response = await fetch(
                `http://127.0.0.1:8000/api/v1/events_by_user/${userId}`,
                {
                    headers: { Authorization: "Bearer " + tokenId }
                }
            );
            if (!response.ok) {
                setMessage("Impossible de charger les événements");
                return;
            }
            const data = await response.json();
            setData(Array.isArray(data) ? data : []);
        }
        fetchData();

    }, [tokenId]);
    return (
        <div>
            <header className="ud-hero">
                <div className="ud-hero-text">
                    <p className="ud-kicker">Tableau de bord</p>
                    <h3 className="ud-kicker">{prenom}</h3>
                    <h1 className="ud-title">Dashboard Utilisateur</h1>

                </div>
                <div className="ud-actions">
                    <button className="ud-btn ud-btn-primary" onClick={() => navigate("/createEvenements")}>
                        Ajouter un evenement
                    </button>
                    <button className="ud-btn ud-btn-ghost" onClick={deconnexion}>
                        Deconnexion
                    </button>
                </div>
            </header>

            <section className="ud-grid">
                {message && <div className="alert alert-danger">{message}</div>}
                {data && data.map((event) => (
                    <article key={event.id} className="ud-card">
                        <div className="ud-card-head">
                            <span className="ud-chip">ID {event.id ?? "-"}</span>
                            <h3 className="ud-card-title">{event.nom_evenement}</h3>
                        </div>
                        <div className="ud-card-desc">
                            {event.description_event || "Aucune description"}
                        </div>
                        <div className="ud-meta">
                            <div className="ud-meta-item">
                                <span className="ud-meta-label">Creation</span>
                                <span className="ud-meta-value">{event.date_creation || "-"}</span>
                            </div>
                            <div className="ud-meta-item">
                                <span className="ud-meta-label">Places</span>
                                <span className="ud-meta-value">{event.nbre_place || "-"}</span>
                            </div>
                            <div className="ud-meta-item">
                                <span className="ud-meta-label">Prix</span>
                                <span className="ud-meta-value">{event.price_place || "-"}€</span>
                            </div>
                        </div>
                        <div className="ud-card-actions">
                            <button
                                className="ud-btn ud-btn-danger"
                                onClick={() => handleEdit(event.id)}
                            >
                                Modifier
                            </button>
                            <button
                                className="ud-btn ud-btn-danger"
                                onClick={() => handleDelete(event.id)}
                            >
                                Supprimer
                            </button>
                        </div>
                    </article>
                ))}
                <div className="ud-empty">
                    <div className="ud-empty-icon"></div>
                    <h3>Aucun evenement trouve</h3>
                    <p>Ajoutez votre premier evenement pour le voir ici.</p>
                </div>

            </section>
        </div>
    );
}

export default UserDashboard;