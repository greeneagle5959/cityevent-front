import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./footer.css";

export default function Footer() {

  return (<footer className="footer bg-light text-center py-3">
    <div className="container">
      <span className="text-muted">&copy; {new Date().getFullYear()} City Events. Tous droits réservés.</span>
    </div>
  </footer>

  );
}
