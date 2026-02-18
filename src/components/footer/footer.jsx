
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./footer.css";

export default function Footer() {
	return (
		<footer className="footer bg-transparent text-center py-3">
			<div className="container">
				<h5 className="text-center">Découvrez les meilleurs événements culturels dans toute la France.</h5>
				<span className="text-muted">&copy; {new Date().getFullYear()} City Events. Tous droits réservés.</span>
			</div>

		</footer>
	);
}
