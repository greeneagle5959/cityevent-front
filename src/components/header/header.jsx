
import { Link, useNavigate } from 'react-router-dom';
import "./header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Connexion from '../connexion/connexion';




import { useState, useEffect } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('theme-dark');
    } else {
      document.body.classList.remove('theme-dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <header className="header-main bg-transparent text-white py-3">
      <div className="container">
        <div className="d-flex align-items-center header-gap">
          <Link to="/" className="d-flex align-items-center gap-3 h3 fw-bold text-black text-decoration-none header-link">
            <img id="logoimg" src="/img/logo/logoimg.png" alt="City Event logo" />
            <span>CITY EVENTS</span>
          </Link>
          <nav className="d-flex align-items-center header-nav-gap">
            <label className="form-switch header-switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode((v) => !v)}
                className="header-checkbox"
              />
              <span className="header-label">{darkMode ? 'Sombre' : 'Clair'}</span>
            </label>
            <button onClick={() => navigate("/connexion")} className="btn btn-primary ms-3"> 
              Connexion
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}