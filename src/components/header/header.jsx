import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import './header.css';

function getDashPath() {
	const token = localStorage.getItem('token')
	if (!token) return null
	try {
		const payload = JSON.parse(atob(token.split('.')[1]))
		const roles   = payload.roles ?? []
		if (roles.includes('ROLE_ADMIN'))           return '/adminDashboard'
		if (roles.includes('ROLE_MODERATEUR'))      return '/moderatorDashboard'
		return '/userDashboard'
	} catch {
		return null
	}
}

function Header({ scrolled }) {
	const [menuOpen, setMenuOpen] = useState(false)
	const navigate  = useNavigate()
	const location  = useLocation()

	// Recalcule à chaque changement de route (connexion/déconnexion)
	// eslint-disable-next-line no-unused-vars
	const dashPath = getDashPath()

	const handleNavClick = (e, sectionId) => {
		e.preventDefault()

		const handleScroll = () => {
			if (sectionId === '') {
				window.scrollTo({ top: 0, behavior: 'smooth' })
			} else {
				const element = document.getElementById(sectionId)
				if (element) {
					element.scrollIntoView({ behavior: 'smooth' })
				}
			}
		}

		if (location.pathname !== '/') {
			navigate('/')
			setTimeout(handleScroll, 100)
		} else {
			handleScroll()
		}

		setMenuOpen(false)
	}

	return (<>
		<header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
			<div className="header-container">
				<a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); setMenuOpen(false); }} className="logo">
					<img src="public/img/logo/logoimg.png" alt="Logo" className="logo-img" />
					<span className="logo-text">CityEvents</span>
				</a>
				<nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
					<a href="#" onClick={(e) => handleNavClick(e, '')} className="nav-link">Accueil</a>
					<a href="#events" onClick={(e) => handleNavClick(e, 'evenements')} className="nav-link">Événements</a>
					<a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="nav-link">A propos</a>
					<a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="nav-link">Contact</a>
				</nav>
				<div className="header-actions">
					{getDashPath() ? (
						<button className="btn btn-dashboard" onClick={() => { navigate(getDashPath()); setMenuOpen(false); }}>
							Mon Dashboard
						</button>
					) : (
						<button className="btn btn-primary" onClick={() => { navigate('/connexion'); setMenuOpen(false); }}>Connexion</button>
					)}
					<button
						className="menu-toggle"
						onClick={() => setMenuOpen(!menuOpen)}
					>
						{menuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</div>
		</header>
	</>)
}

export default Header
