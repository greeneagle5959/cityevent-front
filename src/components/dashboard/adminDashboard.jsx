import React, { useEffect, useState } from "react";
import "./adminDashboard.css";
import { useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:8000/api/v1";

function AdminDashboard() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const headers = { Authorization: "Bearer " + token };

    const [prenom, setPrenom] = useState("");
    const [message, setMessage] = useState("");
    const [tab, setTab] = useState("moderators");
    const [currentUserId, setCurrentUserId] = useState(null);
    const [moderators, setModerators] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [roleDrafts, setRoleDrafts] = useState({});
    const [form, setForm] = useState({
        nom: "",
        prenom: "",
        email: "",
        tel: "",
        mdp: "",
        role: "ROLE_MODERATEUR",
    });

    const deconnexion = () => {
        localStorage.removeItem("token");
        navigate("/connexion");
    };

    const loadUsers = async () => {
        try {
            const meRes = await fetch(`${API}/users/connecter`, { headers });
            if (!meRes.ok) {
                setMessage("Session invalide, reconnectez-vous");
                return;
            }

            const me = await meRes.json();
            setPrenom(me.prenom || "");
            setCurrentUserId(me.userId ?? null);

            const roles = Array.isArray(me.roles) ? me.roles : [];
            if (!roles.includes("ROLE_ADMIN")) {
                setMessage("Accès réservé aux admins. Connectez-vous avec un compte admin.");
                setModerators([]);
                setAdmins([]);
                return;
            }

            const [modRes, admRes] = await Promise.all([
                fetch(`${API}/users/get_Mode`, { headers }),
                fetch(`${API}/users/get_admin`, { headers }),
            ]);

            if (!modRes.ok || !admRes.ok) {
                setMessage("Impossible de charger la gestion des comptes");
                return;
            }
            const modData = await modRes.json();
            const admData = await admRes.json();
            setModerators(Array.isArray(modData) ? modData : []);
            setAdmins(Array.isArray(admData) ? admData : []);
        } catch {
            setMessage("Erreur de chargement des utilisateurs");
        }
    };

    useEffect(() => {
        const t = setTimeout(() => {
            void loadUsers();
        }, 0);
        return () => clearTimeout(t);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const res = await fetch(`${API}/users/inscrire_moderator`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (!res.ok) {
                setMessage(data.erreur || "Impossible de créer le compte");
                return;
            }

            setMessage(data.success || "Compte créé avec succès");
            setForm({
                nom: "",
                prenom: "",
                email: "",
                tel: "",
                mdp: "",
                role: "ROLE_MODERATEUR",
            });
            loadUsers();
        } catch {
            setMessage("Erreur serveur lors de la création");
        }
    };

    const displayed = tab === "moderators" ? moderators : admins;

    const onRoleDraftChange = (userId, role) => {
        setRoleDrafts((prev) => ({ ...prev, [userId]: role }));
    };

    const handleChangeRole = async (user) => {
        const nextRole = roleDrafts[user.id] || user.role || "ROLE_MODERATEUR";
        try {
            const res = await fetch(`${API}/users/${user.id}/role`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                },
                body: JSON.stringify({ role: nextRole }),
            });
            const data = await res.json();
            if (!res.ok) {
                setMessage(data.erreur || "Impossible de changer le rôle");
                return;
            }
            setMessage(data.success || "Rôle mis à jour");
            loadUsers();
        } catch {
            setMessage("Erreur serveur lors de la mise à jour du rôle");
        }
    };

    const handleDeleteUser = async (user) => {
        if (!window.confirm(`Supprimer ${user.email} ?`)) return;
        try {
            const res = await fetch(`${API}/users/${user.id}`, {
                method: "DELETE",
                headers,
            });
            const data = await res.json();
            if (!res.ok) {
                setMessage(data.erreur || "Impossible de supprimer le compte");
                return;
            }
            setMessage(data.success || "Compte supprimé");
            loadUsers();
        } catch {
            setMessage("Erreur serveur lors de la suppression");
        }
    };

    return (
        <div className="ad-page">
            <header className="ad-hero">
                <div>
                    <p className="ad-kicker">Tableau de bord</p>
                    <h3 className="ad-kicker">{prenom}</h3>
                    <h1 className="ad-title">Dashboard Admin</h1>
                </div>
                <div className="ad-actions">
                    <button className="ad-btn ad-btn-ghost" onClick={() => navigate("/")}>Accueil</button>
                    <button className="ad-btn ad-btn-ghost" onClick={deconnexion}>Déconnexion</button>
                </div>
            </header>

            {message && <div className="ad-alert">{message}</div>}

            <section className="ad-layout">
                <article className="ad-panel">
                    <h3>Ajouter un compte Admin / Modérateur</h3>
                    <form className="ad-form-grid" onSubmit={handleCreate}>
                        <div className="ad-field">
                            <label className="ad-label">Nom</label>
                            <input className="ad-input" value={form.nom} onChange={(e) => onChange("nom", e.target.value)} required />
                        </div>
                        <div className="ad-field">
                            <label className="ad-label">Prénom</label>
                            <input className="ad-input" value={form.prenom} onChange={(e) => onChange("prenom", e.target.value)} required />
                        </div>
                        <div className="ad-field ad-field-full">
                            <label className="ad-label">Email</label>
                            <input type="email" className="ad-input" value={form.email} onChange={(e) => onChange("email", e.target.value)} required />
                        </div>
                        <div className="ad-field">
                            <label className="ad-label">Téléphone</label>
                            <input className="ad-input" value={form.tel} onChange={(e) => onChange("tel", e.target.value)} required />
                        </div>
                        <div className="ad-field">
                            <label className="ad-label">Mot de passe</label>
                            <input type="password" className="ad-input" value={form.mdp} onChange={(e) => onChange("mdp", e.target.value)} required />
                        </div>
                        <div className="ad-field ad-field-full">
                            <label className="ad-label">Rôle</label>
                            <select className="ad-select" value={form.role} onChange={(e) => onChange("role", e.target.value)}>
                                <option value="ROLE_MODERATEUR">Modérateur</option>
                                <option value="ROLE_ADMIN">Admin</option>
                            </select>
                        </div>
                        <div className="ad-field ad-field-full">
                            <button type="submit" className="ad-btn ad-btn-primary">Créer le compte</button>
                        </div>
                    </form>
                </article>

                <article className="ad-panel">
                    <div className="ad-users-head">
                        <h3>Gestion des comptes</h3>
                        <div className="ad-tabs">
                            <button className={`ad-tab ${tab === "moderators" ? "ad-tab-active" : ""}`} onClick={() => setTab("moderators")}>Modérateurs ({moderators.length})</button>
                            <button className={`ad-tab ${tab === "admins" ? "ad-tab-active" : ""}`} onClick={() => setTab("admins")}>Admins ({admins.length})</button>
                        </div>
                    </div>

                    <div className="ad-list">
                        {displayed.length === 0 ? (
                            <div className="ad-empty">Aucun compte trouvé.</div>
                        ) : (
                            displayed.map((user) => (
                                <div className="ad-item" key={user.id || user.email}>
                                    <div className="ad-item-top">
                                        <h4>{user.nom} {user.prenom}</h4>
                                        <span className="ad-chip">ID {user.id ?? "-"}</span>
                                    </div>
                                    <p>{user.email}</p>
                                    <p>{user.telephone}</p>
                                    <div className="ad-item-actions">
                                        <select
                                            className="ad-select ad-select-inline"
                                            value={roleDrafts[user.id] || user.role || "ROLE_MODERATEUR"}
                                            onChange={(e) => onRoleDraftChange(user.id, e.target.value)}
                                        >
                                            <option value="ROLE_MODERATEUR">Modérateur</option>
                                            <option value="ROLE_ADMIN">Admin</option>
                                        </select>
                                        <button className="ad-btn ad-btn-primary" onClick={() => handleChangeRole(user)}>
                                            Modifier rôle
                                        </button>
                                        <button
                                            className="ad-btn ad-btn-danger"
                                            disabled={currentUserId === user.id}
                                            onClick={() => handleDeleteUser(user)}
                                            title={currentUserId === user.id ? "Impossible de supprimer votre propre compte" : "Supprimer ce compte"}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </article>
            </section>
        </div>
    );
}

export default AdminDashboard;
