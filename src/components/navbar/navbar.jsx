

import { useNavigate } from "react-router-dom";
import "./navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";


export default function Navbar() {
    const navigate = useNavigate();
    return (
        <div className="col-lg-10 mx-auto text-center mb-3">
            <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
                <ul className="d-flex justify-content-center gap-4 nav-list py-3">
                    <button className="btn" id="accueil">Accueil</button>
                    <button className="btn" onClick={() => window.scrollTo({ top: document.getElementById('evenements').offsetTop, behavior: 'smooth' })}>Événements</button>
                    <button className="btn" id="apropos" onClick={() => navigate("/about")}>À propos</button>
                </ul>
            </nav>
        </div>
    );
}
