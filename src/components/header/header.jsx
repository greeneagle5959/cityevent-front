
import { Link, useNavigate } from 'react-router-dom';
import "./header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Connexion from '../connexion/connexion';




export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="bg-transparent text-white-transparent-lg py-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/" className="d-flex align-items-center gap-3 h3 fw-bold text-black text-decoration-none">
            <img id="logoimg" src="/img/logo/logoimg.png" alt="City Event logo" />
            <span>CITY EVENTS</span>
          </Link>
          <nav>
            <button onClick={() => navigate("/connexion")} className="btn btn-primary"> 
        Connexion
            </button>
          
          </nav>
        </div>
      </div>
    </header>
  );
}