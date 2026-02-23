import { useState } from 'react'
import { MapPin, Calendar, Search, Music, Dumbbell, Cpu, UtensilsCrossed, Palette, Briefcase, Grid3x3 } from 'lucide-react'

function Hero() {
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')

  const categories = [
    { name: 'Toutes les catégories', icon: Grid3x3 },
    { name: 'Musique', icon: Music },
    { name: 'Sports', icon: Dumbbell },
    { name: 'Technologie', icon: Cpu },
    { name: 'Gastronomie et Boissons', icon: UtensilsCrossed },
    { name: 'Art & Culture', icon: Palette },
    { name: 'Affaires', icon: Briefcase }
  ]

  const handleSearch = () => {
    console.log('Recherche:', { location, category, date })
    // Ajoutez ici votre logique de recherche
  }

  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-image"></div>
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-shape">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#ff6c2e" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-46.3C87.4,-33.5,90,-18,89.2,-2.8C88.4,12.4,84.2,27.3,76.2,40.1C68.2,52.9,56.4,63.6,43.1,70.8C29.8,78,15.1,81.7,-0.4,82.4C-15.9,83.1,-31.8,80.8,-45.7,73.4C-59.6,66,-71.5,53.5,-78.8,39.1C-86.1,24.7,-88.8,8.4,-86.7,-6.9C-84.6,-22.2,-77.7,-36.5,-67.5,-47.8C-57.3,-59.1,-43.8,-67.4,-29.9,-74.2C-16,-81,-2.7,-86.3,10.4,-84.1C23.5,-81.9,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="hero-content">
        <span className="hero-subtitle">DÉCOUVREZ DES EXPÉRIENCES</span>
        <h1 className="hero-title">
          Trouvez des événements exceptionnels<br />
          <span className="highlight">Près de Chez Vous</span>
        </h1>
        <p className="hero-description">
         Découvrez des concerts, des festivals, des ateliers et bien plus encore dans votre ville. Votre prochaine expérience inoubliable est à portée de clic.
        </p>

        <div className="search-bar">
          <div className="search-input-group">
            <MapPin className="search-icon" size={20} style={{ color: '#000000', stroke: '#000000' }} />
            <input
              type="text"
              placeholder="Entrez un lieu..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="search-divider"></div>
          
          <div className="search-input-group">
            <Calendar className="search-icon" size={20} style={{ color: '#000000', stroke: '#000000' }} />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="search-divider"></div>
          
          <div className="search-input-group">
            <Grid3x3 className="search-icon" size={20} style={{ color: '#000000', stroke: '#000000' }} />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="search-select"
            >
              {categories.map((cat, index) => {
                const IconComponent = cat.icon;
                return (
                  <option 
                    key={index} 
                    value={cat.name === 'Toutes les catégories' ? '' : cat.name}
                  >
                    {cat.name}
                  </option>
                );
              })}
            </select>
          </div>
          
          <button className="search-btn" onClick={handleSearch}>
            <Search size={20} />
            <span>Rechercher</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
