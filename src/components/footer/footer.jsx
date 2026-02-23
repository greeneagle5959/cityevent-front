import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react'
import "./footer.css";



function Footer() {
	return (<>
		<footer className="footer">
			<div className="footer-top">
				<div className="container">
					<div className="footer-grid">
						<div className="footer-brand">
							<a href="#" className="footer-logo">
								<img src="/image/logo.png" alt="Logo" className="footer-logo-img" />
								<span className="logo-text">CityEvent</span>
							</a>
							<p className="footer-tagline">
								Découvrez des événements incroyables dans votre ville.
								Votre prochaine expérience inoubliable vous attend.
							</p>
							<div className="footer-social">
								<a href="#" className="social-link">
									<Facebook size={18} />
								</a>
								<a href="#" className="social-link">
									<Twitter size={18} />
								</a>
								<a href="#" className="social-link">
									<Instagram size={18} />
								</a>
								<a href="#" className="social-link">
									<Youtube size={18} />
								</a>
							</div>
						</div>

						<div className="footer-links">
							<h4 className="footer-title">Liens Rapides</h4>
							<ul>
								<li><a href="#">Accueil</a></li>
								<li><a href="#events">\u00c9vénements</a></li>
								<li><a href="#categories">Catégories</a></li>
								<li><a href="#">\u00c0 Propos</a></li>
								<li><a href="#contact">Contact</a></li>
							</ul>
						</div>

						<div className="footer-links">
							<h4 className="footer-title">Assistance</h4>
							<ul>
								<li><a href="#">FAQ</a></li>
								<li><a href="#">Conditions d'utilisation</a></li>
								<li><a href="#">Politique de Confidentialité</a></li>
								<li><a href="#">Centre d'Aide</a></li>
							</ul>
						</div>

						<div className="footer-contact">
							<h4 className="footer-title">Nous Contacter</h4>
							<ul>
								<li>
									<MapPin size={16} />
									<span>123 Event Street, New York, NY 10001</span>
								</li>
								<li>
									<Mail size={16} />
									<a href="mailto:hello@cityevent.com">hello@cityevent.com</a>
								</li>
								<li>
									<Phone size={16} />
									<a href="tel:+1234567890">+1 (234) 567-890</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div className="footer-bottom">
				<div className="container">
					<p className="copyright">
						© 2025 CityEvent. All rights reserved.
					</p>
					<div className="footer-bottom-links">
						<a href="#">Conditions</a>
						<a href="#">Confidentialité</a>
						<a href="#">Cookies</a>
					</div>
				</div>
			</div>
		</footer>
	</>
	);
}

export default Footer
