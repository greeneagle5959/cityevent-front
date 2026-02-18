
import { Link, useNavigate } from 'react-router-dom';
import "./header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Connexion from '../connexion/connexion';





export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header-main bg-transparent text-white py-3">
      <div className="container">
        <div className="d-flex align-items-center header-gap">
          <Link to="/" className="d-flex align-items-center gap-3 h3 fw-bold text-black text-decoration-none header-link">
            <img id="logoimg" src="/img/logo/logoimg.png" alt="City Event logo" />
            <span>CITY EVENTS</span>
          </Link>
          <nav className="d-flex align-items-center header-nav-gap">
            {/* Thème clair/sombre supprimé */}
            <button onClick={() => navigate("/connexion")} className="btn btn-primary ms-3"> 
              Connexion
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}