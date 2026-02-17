
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";


export default function Header() {
  return (
    <header className="bg-transparent text-white-transparent-lg py-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/" className="d-flex align-items-center gap-3 h3 fw-bold text-black text-decoration-none">
            <img src="/img/logo/logoimg.png" alt="City Event logo" style={{height: '150px', width: '150px', objectFit: 'contain'}} />
            <span>CITY EVENTS</span>
          </Link>
          <nav>
            <button className="btn btn-light text-primary fw-semibold ms-3"><link rel="stylesheet" href="" />
              connexion
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}