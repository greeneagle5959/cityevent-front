import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Connexion from '../connexion/connexion';

export default function Headersimple() {

  return (
    <header className="headersimple-header py-4 p-4 mx-auto">
      <div className="container">
        <div className="d-flex justify-content-center align-items-center ">
          <Link
            to="/"
            className="d-flex align-items-center gap-3 h3 fw-bold text-decoration-none headersimple-link"
          >
            <img id="logoimg" src="/img/logo/logoimg.png" alt="City Event logo" />
            <span>CITY EVENTS</span>
          </Link>
          {/* Thème clair/sombre supprimé */}
        </div>
      </div>
    </header>
  );
}