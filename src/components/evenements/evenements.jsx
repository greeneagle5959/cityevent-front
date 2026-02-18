import React from "react";
import "./evenements.css";

import { mockEvents } from "./mockEvents";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Evenements() {
  // Fonction fictive pour la réservation
  const handleAddToBooking = (event) => {
    alert(`Réservation pour : ${event.title}`);
  };

  return (
    <>
    <div className="evenements-list">
      {mockEvents.map((event) => (
        <EventCard key={event.id} event={event} onAddToBooking={handleAddToBooking} />
      ))}
    </div>
          <nav aria-label="Page navigation example">
  <ul className="pagination position-relative justify-content-center">
    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item"><a className="page-link" href="#">3</a></li>
    <li className="page-item"><a className="page-link" href="#">Next</a></li>
  </ul>
</nav></>
  );
}








