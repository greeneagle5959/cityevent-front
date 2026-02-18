
import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="row text-center">
        <div className="col-lg-12 text-center">
          <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
            <ul className="d-flex justify-content-center gap-4 nav-list py-3">
              <button className="btn" id="accueil">Accueil</button>
              <button className="btn" id="slader">Slader</button>
              <button className="btn" id="evenements">Événements</button>
              <button className="btn" id="apropos" onClick={() => navigate("/apropos")}>À propos</button>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

