import { Link } from "react-router-dom";
import "./navbar.css";


import "bootstrap/dist/css/bootstrap.min.css";

const categories = [
  { id: "slader", name: "Slader" },
  { id: "evenement", name: "Événements" },
  { id: "a_propos", name: "À propos" },
  { id: "accueil", name: "Accueil" },
];

export default function Navbar() {
  return (
    <div className="container">
      <div className="row text-center">
        <div className="col-lg-12 text-center">
     
          <nav className="navbar">
            <ul className="navbar-categories d-flex justify-content-center align-items-center gap-4 text-center">
              {categories.map((cat) => (
                <li key={cat.id} className="navbar-category-item">
                  {cat.name}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

