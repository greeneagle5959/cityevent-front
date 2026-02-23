import { useEffect, useRef, useState } from 'react';
import "./eventCard.css";


function EventCards() {
	const sectionRef = useRef(null)
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true)
					observer.disconnect()
				}
			},
			{ threshold: 0.2 }
		)

		if (sectionRef.current) {
			observer.observe(sectionRef.current)
		}

		return () => observer.disconnect()
	}, [])

	return (
		<section ref={sectionRef} className="event-cards-section" id="events">
			<div className="container">
				<div className={`section-header ${isVisible ? 'animate-in' : ''}`}>
					<span className="section-subtitle">ÉVÉNEMENTS EN VEDETTE</span>
					<h2 className="section-title">À Venir Bientôt</h2>
					<p className="section-description">
						Découvrez les événements les plus attendus qui auront lieu prochainement
					</p>
				</div>
			</div>
		</section>
	)
}

export default EventCards
