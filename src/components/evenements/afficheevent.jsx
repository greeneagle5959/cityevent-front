

import { useEffect, useState } from "react";


export default function AfficheEvent() {
    const [data, setData] = useState(null);
    const [openDescriptionId, setOpenDescriptionId] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://127.0.0.1:8000/api/v1//events_list");
            let result = null;
            try {
                const text = await response.text();
                result = text ? JSON.parse(text) : null;
            } catch (e) {
                console.error("Erreur lors du parsing JSON:", e);
                result = null;
            }
            setData(result);
        }
        fetchData();
    }, []);

    const handleToggle = (id) => {
        setOpenDescriptionId((prevId) => (prevId === id ? null : id));
    };

    return (<div>
        <h1 id="evenements">Evenements</h1>
        {data && data.map((event) => {
            const showDescription = openDescriptionId === event.id;
            return (
                <div key={event.id}>
                    <div className="container d-flex justify-content-center align-items-center">
                        <div className="card mb-3 m-3 w-100 event-card-maxwidth">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    {event.images && event.images.length > 0 && (
                                        <img src={event.images[0].url} className="img-fluid rounded-start event-card-img"
                                            alt={event.title} />
                                    )}
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <div className="event-main-info mb-2 p-2" style={{ border: '1px solid #ddd', borderRadius: 4 }}>
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <h5 className="card-title mb-0">{event.nom_evenement}</h5>
                                                    <div className="text-muted" style={{ fontSize: '0.95em' }}>
                                                        <i className="bi bi-calendar-event me-1"></i> {event.date_debut || "Date à venir"}<br />
                                                        <i className="bi bi-clock me-1"></i> {event.date_fin || "Heure à venir"}<br />
                                                        <i className="bi bi-geo-alt me-1"></i> {event.adresse || "Lieu à venir"}<br />
                                                        <i className="bi bi-people me-1"></i> {event.nbre_place ? `${event.nbre_place} places disponibles` : "Places inconnues"}
                                                    </div>
                                                </div>
                                                <div className="text-end">
                                                    <span className="text-primary">À partir de <b>{event.price_place}€</b></span><br />
                                                    <button className="btn btn-outline-primary btn-sm mt-2" onClick={() => handleToggle(event.id)}>{showDescription ? "masquer" : "voir"}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {showDescription && (
                                <div className="border-top pt-3 mt-4 px-4 pb-4" style={{ fontFamily: 'inherit' }}>
                                    <div className="mb-3" style={{ fontWeight: 500 }}>Description complète</div>
                                    <div className="mb-3">{event.description_evenement}</div>
                                    <div className="row mb-2 align-items-start">
                                        <div className="col-12">
                                            <div className="row mb-2" style={{ fontWeight: 500 }}>
                                                <div className="col-6">Informations pratiques</div>
                                                <div className="col-6 text-center">Catégorie</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    Date : {event.date_debut}<br />
                                                    Lieu : {event.adresse}<br />
                                                    Prix : {event.price_place}€<br />
                                                    Nombre de places : <span className="text-success">{event.nbre_place}</span>
                                                </div>
                                                <div className="col-6 text-center align-self-start" style={{ fontWeight: 400, marginTop: 0 }}>
                                                    {event.category}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mt-4">
                                        <span className="ms-2">Réservation : mail ou tel ou lien vers site de l'organisateur</span>
                                        <button className="btn btn-outline-secondary px-4">Partager</button>
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


















