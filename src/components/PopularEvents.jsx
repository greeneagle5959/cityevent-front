import { useEffect, useRef, useState } from 'react'
import { Calendar, MapPin, ChevronLeft, ChevronRight, Heart } from 'lucide-react'

const popularEvents = [
  {
    id: 1,
    title: 'Nuit de Jazz sous les Étoiles',
    date: '20 Juillet 2025',
    location: 'Rooftop Garden, Chicago',
    price: '35€',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&h=400&fit=crop',
    liked: false
  },
  {
    id: 2,
    title: 'Marathon 2025',
    date: '3 Août 2025',
    location: 'Downtown, Boston',
    price: '45€',
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=600&h=400&fit=crop',
    liked: true
  },
  {
    id: 3,
    title: 'Conférence IA et Technologie du Futur',
    date: '15 Septembre 2025',
    location: 'Tech Hub, Seattle',
    price: '199€',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop',
    liked: false
  },
  {
    id: 4,
    title: 'Festival de Rue Alimentaire',
    date: '22 Août 2025',
    location: 'Market Square, Austin',
    price: '15€',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop',
    liked: false
  },
  {
    id: 5,
    title: 'Exposition d\u0027Art Moderne',
    date: '1-30 Octobre 2025',
    location: 'MOMA, New York',
    price: '25€',
    image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600&h=400&fit=crop',
    liked: true
  },
  {
    id: 6,
    title: 'Soirée de Pitch Startup',
    date: '28 Juillet 2025',
    location: 'Innovation Lab, Miami',
    price: 'Gratuit',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop',
    liked: false
  }
]

function PopularEvents() {
  const sectionRef = useRef(null)
  const carouselRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [likedEvents, setLikedEvents] = useState(
    popularEvents.reduce((acc, event) => ({ ...acc, [event.id]: event.liked }), {})
  )

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

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 320
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const toggleLike = (id) => {
    setLikedEvents(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section ref={sectionRef} className="popular-events-section">
      <div className="container">
        <div className={`section-header ${isVisible ? 'animate-in' : ''}`}>
          <div className="section-header-left">
            <span className="section-subtitle">TENDANCES ACTUELLES</span>
            <h2 className="section-title">Événements Populaires</h2>
          </div>
          <a href="#" className="view-all-link">
            Voir tous les événements <ChevronRight size={18} />
          </a>
        </div>

        <div className="carousel-container">
          <button 
            className="carousel-btn carousel-btn-prev"
            onClick={() => scroll('left')}
          >
            <ChevronLeft size={24} />
          </button>

          <div ref={carouselRef} className="events-carousel">
            {popularEvents.map((event, index) => (
              <div
                key={event.id}
                className={`carousel-card ${isVisible ? 'animate-in' : ''}`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="carousel-card-image">
                  <img src={event.image} alt={event.title} />
                  <button 
                    className={`like-btn ${likedEvents[event.id] ? 'liked' : ''}`}
                    onClick={() => toggleLike(event.id)}
                  >
                    <Heart size={18} fill={likedEvents[event.id] ? '#ff6c2e' : 'none'} />
                  </button>
                </div>
                
                <div className="carousel-card-content">
                  <h3 className="carousel-card-title">{event.title}</h3>
                  
                  <div className="carousel-card-meta">
                    <span className="carousel-card-date">
                      <Calendar size={14} />
                      {event.date}
                    </span>
                    <span className="carousel-card-location">
                      <MapPin size={14} />
                      {event.location}
                    </span>
                  </div>
                  
                  <div className="carousel-card-footer">
                    <span className="carousel-card-price">{event.price}</span>
                    <button className="btn btn-sm btn-outline">Réserver maintenant</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            className="carousel-btn carousel-btn-next"
            onClick={() => scroll('right')}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default PopularEvents
