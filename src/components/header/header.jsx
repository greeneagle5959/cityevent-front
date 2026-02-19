
import { Link, useNavigate } from 'react-router-dom';
import "./header.css";
import "bootstrap/dist/css/bootstrap.min.css";






export default function Header() {
    const navigate = useNavigate();

    return (
        <header className=" d-flex justify-content-between container  bg-transparent text-white ">
            <div className="d-flex  ">
                <Link to="/" className="d-flex align-items-center gap-3 h3 fw-bold text-black text-decoration-none header-link ">
                    <img id="logoimg" src="/img/logo/logoimg.png" alt="City Event logo" />
                    <span>CITY EVENTS</span>

                </Link>
            </div>
            <nav className="d-flex align-items-center ">
                {/* Thème clair/sombre supprimé */}
                <button onClick={() => navigate("/connexion")} className="btn btn-primary mx-auto">
                    Connexion
                </button>
            </nav>
        </header>
    );
}