import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./apropos.css";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import Headersimple from "../header/headersimple";


export default function Apropos() {
	return (
		<>
		<Headersimple />
		<Navbar />
			<div className="apropos-container container mt-5 p-4 bg-light rounded shadow ">
				<div className="mb-4 border-bottom pb-3 ">
				<h1 className="mb-3 text-center" >À propos de CityEvent</h1><br />
				<h5 className="text-center">
					CityEvent est une plateforme innovante qui permet de découvrir, créer et gérer des événements dans votre ville. <br /> Notre objectif est de rapprocher les citoyens et de dynamiser la vie locale grâce à une interface simple et accessible.
				</h5><br /></div><div className="mb-4 border-bottom pb-3 ">
				<h2 className="text-center">Notre mission</h2><br />
				<h5 className="text-center">
					Favoriser l'échange, la participation et la visibilité des événements pour tous : habitants, associations, collectivités et organisateurs.
				</h5></div><br />
				<div className="mb-4 border-bottom pb-3 ">
				<h2 className="text-center">Fonctionnalités</h2><br />
				<ul className="text-center">
					<h5>. Explorer les événements par thème ou par quartier</h5>
					<h5>. Créer et promouvoir vos propres événements</h5>
					<h5>. Gérer les inscriptions et suivre les participants</h5>
					<h5>. Accès dédié pour les administrateurs et modérateurs</h5>
				</ul><br />
				</div>
			</div>
			<Footer />
		</>
	);
}
