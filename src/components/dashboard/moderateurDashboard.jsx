import React, { useEffect, useState } from "react";
import "./moderateurDashboard.css";
import { useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:8000/api/v1";

const TABS = [
    { key: "all",     label: "Tous les événements" },
    { key: "pending", label: "En attente" },
];

function ModerateurDashboard() {
    const navigate   = useNavigate();
    const token      = localStorage.getItem("token");

    const [prenom,   setPrenom]   = useState("");
    const [tab,      setTab]      = useState("pending");
    const [events,   setEvents]   = useState([]);
    const [pending,  setPending]  = useState([]);
    const [message,  setMessage]  = useState("");
    const [loading,  setLoading]  = useState(true);
    const [confirm,  setConfirm]  = useState(null); // { id, action }

    const headers = { Authorization: "Bearer " + token };

    const deconnexion = () => {
        localStorage.removeItem("token");
        navigate("/connexion");
    };

    /* ── chargement initial ── */
    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                const me = await fetch(`${API}/users/connecter`, { headers });
                if (me.ok) {
                    const d = await me.json();
                    setPrenom(d.prenom || "");
                }
                const [allRes, pendRes] = await Promise.all([
                    fetch(`${API}/events_list`,     { headers }),
                    fetch(`${API}/events/pending`,  { headers }),
                ]);
                if (allRes.ok)  setEvents(await allRes.json());
                if (pendRes.ok) setPending(await pendRes.json());
            } catch {
                setMessage("Erreur de chargement");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

    /* ── actions ── */
    const applyAction = async (id, endpoint, method = "PATCH", body = null) => {
        try {
            const opts = { method, headers: { ...headers, "Content-Type": "application/json" } };
            if (body) opts.body = JSON.stringify(body);
            const res = await fetch(`${API}/events/${id}/${endpoint}`, opts);
            if (!res.ok) throw new Error();
            /* mise à jour locale */
            const update = (list) => list.map(e =>
                e.id === id
                    ? { ...e,
                        status_validation: endpoint === "validate" ? "valide"
                            : endpoint === "refuse"   ? "refuse"
                            : e.status_validation,
                        is_sponsor: endpoint === "sponsored" ? true
                            : endpoint === "noSponsored" ? false
                            : e.is_sponsor }
                    : e
            );
            setEvents(update);
            setPending(prev => endpoint === "validate" || endpoint === "refuse"
                ? prev.filter(e => e.id !== id)
                : update(prev)
            );
        } catch {
            setMessage("Erreur lors de l'action");
        }
        setConfirm(null);
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`${API}/events/${id}/delete`, { method: "DELETE", headers });
            if (!res.ok) throw new Error();
            setEvents(prev => prev.filter(e => e.id !== id));
            setPending(prev => prev.filter(e => e.id !== id));
        } catch {
            setMessage("Erreur lors de la suppression");
        }
        setConfirm(null);
    };

    /* ── stats ── */
    const total    = events.length;
    const nbPend   = pending.length;
    const nbValid  = events.filter(e => e.status_validation === "valide").length;
    const nbSponsor = events.filter(e => e.is_sponsor).length;

    const displayed = tab === "pending" ? pending : events;

    /* ── modèle de carte ── */
    const EventCard = ({ event }) => {
        const isPending   = event.status_validation === "pending" || !event.status_validation;
        const isValide    = event.status_validation === "valide";
        const isRefused   = event.status_validation === "refuse";
        const isSponsored = event.is_sponsor;

        return (
            <article className="md-card">
                <div className="md-card-head">
                    <div className="md-chips">
                        <span className="md-chip">ID {event.id}</span>
                        {isSponsored && <span className="md-chip md-chip-sponsor">⭐ Sponsorisé</span>}
                        <span className={`md-chip ${
                            isValide   ? "md-chip-valid"
                          : isRefused ? "md-chip-refuse"
                          : "md-chip-pending"
                        }`}>
                            {isValide ? "✓ Validé" : isRefused ? "✕ Refusé" : "⏳ En attente"}
                        </span>
                    </div>
                    <h3 className="md-card-title">{event.nom_evenement}</h3>
                </div>

                <div className="md-card-desc">
                    {event.description_event || "Aucune description"}
                </div>

                <div className="md-meta">
                    <div className="md-meta-item">
                        <span className="md-meta-label">Début</span>
                        <span className="md-meta-value">{event.date_debut?.slice(0, 10) || "-"}</span>
                    </div>
                    <div className="md-meta-item">
                        <span className="md-meta-label">Places</span>
                        <span className="md-meta-value">{event.nbre_place || "-"}</span>
                    </div>
                    <div className="md-meta-item">
                        <span className="md-meta-label">Prix</span>
                        <span className="md-meta-value">{event.price_place || "-"}€</span>
                    </div>
                </div>

                <div className="md-card-actions">
                    {/* Validation */}
                    {isPending && (
                        <>
                            <button className="md-btn md-btn-success"
                                onClick={() => setConfirm({ id: event.id, action: "validate" })}>
                                ✓ Valider
                            </button>
                            <button className="md-btn md-btn-refuse"
                                onClick={() => setConfirm({ id: event.id, action: "refuse" })}>
                                ✕ Refuser
                            </button>
                        </>
                    )}
                    {/* Sponsoring */}
                    {isSponsored ? (
                        <button className="md-btn md-btn-ghost"
                            onClick={() => applyAction(event.id, "noSponsored")}>
                            Retirer sponsor
                        </button>
                    ) : (
                        <button className="md-btn md-btn-sponsor"
                            onClick={() => applyAction(event.id, "sponsored")}>
                            ⭐ Sponsoriser
                        </button>
                    )}
                    {/* Suppression */}
                    <button className="md-btn md-btn-delete"
                        onClick={() => setConfirm({ id: event.id, action: "delete" })}>
                        Supprimer
                    </button>
                </div>
            </article>
        );
    };

    return (
        <div className="md-page">

            {/* ── HERO ── */}
            <header className="md-hero">
                <div className="md-hero-text">
                    <p className="md-kicker">Tableau de bord</p>
                    <h3 className="md-kicker">{prenom}</h3>
                    <h1 className="md-title">Dashboard Modérateur</h1>
                </div>
                <div className="md-actions">
                    <button className="md-btn md-btn-ghost" onClick={deconnexion}>
                        Déconnexion
                    </button>
                </div>
            </header>

            {/* ── STATS ── */}
            <div className="md-stats">
                <div className="md-stat">
                    <span className="md-stat-val">{total}</span>
                    <span className="md-stat-lab">Événements</span>
                </div>
                <div className="md-stat">
                    <span className="md-stat-val md-orange">{nbPend}</span>
                    <span className="md-stat-lab">En attente</span>
                </div>
                <div className="md-stat">
                    <span className="md-stat-val md-green">{nbValid}</span>
                    <span className="md-stat-lab">Validés</span>
                </div>
                <div className="md-stat">
                    <span className="md-stat-val md-star">{nbSponsor}</span>
                    <span className="md-stat-lab">Sponsorisés</span>
                </div>
            </div>

            {/* ── TABS ── */}
            <div className="md-tabs">
                {TABS.map(t => (
                    <button
                        key={t.key}
                        className={`md-tab ${tab === t.key ? "md-tab-active" : ""}`}
                        onClick={() => setTab(t.key)}
                    >
                        {t.label}
                        {t.key === "pending" && nbPend > 0 && (
                            <span className="md-badge">{nbPend}</span>
                        )}
                    </button>
                ))}
            </div>

            {/* ── CONTENU ── */}
            {message && <div className="md-alert">{message}</div>}

            {loading ? (
                <p className="md-loading">Chargement…</p>
            ) : (
                <section className="md-grid">
                    {displayed.length === 0 ? (
                        <div className="md-empty">
                            <div className="md-empty-icon">{tab === "pending" ? "🎉" : "📭"}</div>
                            <h3>{tab === "pending" ? "Aucun événement en attente" : "Aucun événement"}</h3>
                            <p>Tout est à jour&nbsp;!</p>
                        </div>
                    ) : (
                        displayed.map(event => <EventCard key={event.id} event={event} />)
                    )}
                </section>
            )}

            {/* ── MODAL CONFIRMATION ── */}
            {confirm && (
                <div className="md-overlay" onClick={() => setConfirm(null)}>
                    <div className="md-modal" onClick={e => e.stopPropagation()}>
                        <p className="md-modal-msg">
                            {confirm.action === "delete"
                                ? "Supprimer définitivement cet événement ?"
                                : confirm.action === "validate"
                                ? "Valider cet événement ?"
                                : "Refuser cet événement ?"}
                        </p>
                        <div className="md-modal-btns">
                            <button className="md-btn md-btn-ghost" onClick={() => setConfirm(null)}>Annuler</button>
                            <button
                                className={`md-btn ${
                                    confirm.action === "delete"   ? "md-btn-delete"
                                  : confirm.action === "validate" ? "md-btn-success"
                                  : "md-btn-refuse"
                                }`}
                                onClick={() =>
                                    confirm.action === "delete"
                                        ? handleDelete(confirm.id)
                                        : applyAction(confirm.id, confirm.action)
                                }
                            >
                                Confirmer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ModerateurDashboard;
