import { useEffect, useRef, useState } from 'react'
import { Music, Trophy, Cpu, UtensilsCrossed, Palette, Briefcase } from 'lucide-react'

const categories = [
  { name: 'Musique', icon: Music, count: '2 450 événements', color: '#ff6c2e' },
  { name: 'Sports', icon: Trophy, count: '1 280 événements', color: '#3b82f6' },
  { name: 'Technologie', icon: Cpu, count: '890 événements', color: '#8b5cf6' },
  { name: 'Gastronomie', icon: UtensilsCrossed, count: '1 650 événements', color: '#10b981' },
  { name: 'Art', icon: Palette, count: '720 événements', color: '#ec4899' },
  { name: 'Affaires', icon: Briefcase, count: '540 événements', color: '#f59e0b' }
]

function Categories() {
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
    <section ref={sectionRef} className="categories-section" id="categories">
      <div className="container">
        <div className={`section-header light ${isVisible ? 'animate-in' : ''}`}>
          <span className="section-subtitle">PARCOURIR PAR INTÉRÊT</span>
          <h2 className="section-title">Explorer par Catégorie</h2>
          <p className="section-description">
            Trouvez des événements qui correspondent à vos intérêts et passions
          </p>
        </div>

        <div className="categories-grid">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <div
                key={category.name}
                className={`category-card ${isVisible ? 'animate-in' : ''}`}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  '--category-color': category.color 
                }}
              >
                <div className="category-icon" style={{ backgroundColor: `${category.color}20` }}>
                  <Icon size={32} style={{ color: category.color }} />
                </div>
                <h3 className="category-name">{category.name}</h3>
                <span className="category-count">{category.count}</span>
                <div className="category-glow" style={{ backgroundColor: category.color }}></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Categories
