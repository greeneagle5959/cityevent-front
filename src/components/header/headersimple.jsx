import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Connexion from '../connexion/connexion';
import { useState, useEffect } from 'react';

export default function Headersimple() {
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
          <label className="form-switch ms-4 headersimple-switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode((v) => !v)}
              className="headersimple-checkbox"
            />
            <span className="headersimple-label">{darkMode ? 'Sombre' : 'Clair'}</span>
          </label>
        </div>
      </div>
    </header>
  );
}