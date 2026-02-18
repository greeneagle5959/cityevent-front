import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./barrecherche.css";



export default function BarreRecherche() {
  return (
    <div className="barre-recherche container d-flex align-items-center justify-content-center" style={{gap: '8px'}}>   
        <input
          type="text"
          className="form-control w-50"
          placeholder="Rechercher un événement part une ville"
        />
        <button className="btn btn-primary btn-sm">Rechercher</button>
    </div>
  );
}