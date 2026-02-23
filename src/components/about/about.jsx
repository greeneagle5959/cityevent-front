import Header from "../header/Header.jsx"
import Footer from "../footer/Footer.jsx"
import './about.css'

export default function About() {
    return (
        <div>
            <Header scrolled={false} />
            <div className="about-container">
                <section className="about-hero">
                    <h1>À Propos de Nous</h1>
                    <p>Découvrez notre histoire et notre passion pour les événements</p>
                </section>

                <section className="about-content">
                    <div className="about-section">
                        <h2>Notre Mission</h2>
                        <p>
                            Nous sommes dédiés à créer une plateforme où les organisateurs d'événements 
                            et les participants peuvent se connecter facilement. Notre objectif est de rendre 
                            chaque événement accessible et mémorable.
                        </p>
                    </div>

                    <div className="about-section">
                        <h2>Notre Vision</h2>
                        <p>
                            Créer une communauté vivante d'événements où chacun peut trouver 
                            l'expérience parfaite et partager des moments inoubliables.
                        </p>
                    </div>

                    <div className="about-section">
                        <h2>Nos Valeurs</h2>
                        <ul>
                            <li>Accessibilité - Rendre les événements accessibles à tous</li>
                            <li>Qualité - Garantir une expérience utilisateur exceptionnelle</li>
                            <li>Transparence - Communication honnête avec nos utilisateurs</li>
                            <li>Innovation - Amélioration continue de nos services</li>
                        </ul>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}
