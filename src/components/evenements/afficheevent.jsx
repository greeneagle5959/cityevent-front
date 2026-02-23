

import { useEffect, useState } from "react";
import "./afficheevent.css";


export default function AfficheEvent() {
    const [data, setData] = useState(null);
    const [openDescriptionId, setOpenDescriptionId] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://127.0.0.1:8000/api/v1/events_list");
            const result = await response.json();
            setData(result);
        }
        fetchData();

    }, []);

    const handleToggle = (id) => {
        setOpenDescriptionId((prevId) => (prevId === id ? null : id));
    };

    return (<div className="blackBag">
      
        <h1 id="evenements">🎉 Événements</h1>
        {data && data.map((event, idx) => {
            const uniqueId = event.id !== undefined && event.id !== null ? event.id : idx;
            const showDescription = openDescriptionId === uniqueId;
            return (
                <div key={event.id}>
                    <div className="container d-flex justify-content-center align-items-center">
                        <div className="card mb-3 m-3 w-100 event-card-maxwidth">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    {event.images && event.images.length > 0 && (
                                        <img src={event.images[0].url} className="img-fluid event-card-img"
                                            alt={event.nom_evenement} />
                                    )}
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <div className="event-main-info mb-3 p-3" >
                                            <h5 className="card-title mb-3">{event.nom_evenement}</h5>
                                            <div className="event-info-item">
                                                <i className="bi bi-calendar-event"></i>
                                                <span>{event.date_debut || "Date à venir"}</span>
                                            </div>
                                            <div className="event-info-item">
                                                <i className="bi bi-geo-alt"></i>
                                                <span>{event.adresse || "Lieu à venir"}</span>
                                            </div>
                                            <div className="event-info-item">
                                                <i className="bi bi-people"></i>
                                                <span>{event.nbre_place ? `${event.nbre_place} places disponibles` : "Places inconnues"}</span>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <div>
                                                <span className="colorWhite" style={{ fontSize: '14px' }}>À partir de</span>
                                                <div style={{ fontSize: '24px', fontWeight: '700', color: '#ffffff' }}>
                                                    {event.price ? event.price.toFixed(2) : "--"}€
                                                </div>
                                            </div>
                                            <button className="btn btn-outline-primary btn-sm mt-2" onClick={() => handleToggle(uniqueId)}>
                                                {showDescription ? "❌ Masquer" : "👁️ Voir détails"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {showDescription && (
                                <div className="border-top pt-4 mt-2 px-4 pb-4 colorWhite description-section">
                                    <div style={{ marginBottom: '20px' }}>
                                        <h6 style={{ color: '#ffffff', fontWeight: '700', fontSize: '18px', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>📝 Description</h6>
                                        <p style={{ lineHeight: '1.8', fontSize: '14px' }}>{event.description_evenement}</p>
                                    </div>
                                    
                                    <div className="practical-info-grid">
                                        <div className="info-block">
                                            <div className="info-block-title">📅 Date & Heure</div>
                                            <div className="info-block-content">
                                                {event.date_debut}<br />
                                                {event.date_fin && <span style={{ fontSize: '12px', opacity: '0.8', color: '#ffffff' }}>Fin: {event.date_fin}</span>}
                                            </div>
                                        </div>
                                        <div className="info-block">
                                            <div className="info-block-title">📍 Localisation</div>
                                            <div className="info-block-content">
                                                {event.adresse}
                                            </div>
                                        </div>
                                        <div className="info-block">
                                            <div className="info-block-title">💰 Tarif</div>
                                            <div className="info-block-content">
                                                <span className="text-success">{event.price_place}€</span> par personne
                                            </div>
                                        </div>
                                        <div className="info-block">
                                            <div className="info-block-title">🎫 Places</div>
                                            <div className="info-block-content">
                                                <span className="text-success">{event.nbre_place}</span> places disponibles
                                            </div>
                                        </div>
                                    </div>

                                    {event.category && (
                                        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                            <span className="colorWhite" style={{ fontSize: '12px', marginRight: '10px' }}>Catégorie:</span>
                                            <span className="category-badge">{event.category}</span>
                                        </div>
                                    )}

                                    <div className="d-flex justify-content-between align-items-center mt-4 pt-3" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
                                        <span className="colorWhite" style={{ fontSize: '13px' }}>✉️ Contactez l'organisateur pour réserver</span>
                                        <button className="btn btn-outline-secondary btn-sm px-3">📤 Partager</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <p></p>

                </div>
            );
        })}
       
    </div>
    );
}


















