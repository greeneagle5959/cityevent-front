import React from "react";
import "./evenements.css";
import { EventCard } from "./EventCard";
import { mockEvents } from "./mockEvents";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Evenements() {
  // Fonction fictive pour la réservation
  const handleAddToBooking = (event) => {
    alert(`Réservation pour : ${event.title}`);
  };

  return (
    <div className="evenements-list">
      {mockEvents.map((event) => (
        <EventCard key={event.id} event={event} onAddToBooking={handleAddToBooking} />
      ))}
    </div>
  );
}








