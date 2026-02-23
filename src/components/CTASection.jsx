import { useState, useEffect, useRef } from 'react'
import { Mail, ArrowRight, Check } from 'lucide-react'

function CTASection() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
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
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => {
        setSubscribed(false)
        setEmail('')
      }, 3000)
    }
  }

  return (
    <section ref={sectionRef} className="cta-section" id="contact">
      <div className="cta-bg">
        <div className="cta-image"></div>
      </div>
      
      <div className="cta-content">
        <div className={`cta-text ${isVisible ? 'animate-in' : ''}`}>
          <h2 className="cta-title">
            Ne manquez jamais un<br />
            <span className="highlight">Evénement</span>
          </h2>
          <p className="cta-description">
            Abonnez-vous à notre infolettre et recevez les derniers événements directement 
            dans votre boîte de réception. Soyez le premier à connaître les prochaines expériences.
          </p>
        </div>

        <form 
          className={`cta-form ${isVisible ? 'animate-in' : ''}`}
          style={{ animationDelay: '200ms' }}
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <Mail className="form-icon" size={20} />
            <input
              type="email"
              placeholder="Entrez votre adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <button 
            type="submit" 
            className={`btn btn-primary btn-lg ${subscribed ? 'success' : ''}`}
            disabled={subscribed}
          >
            {subscribed ? (
              <>
                <Check size={20} />
                <span>Abonné!</span>
              </>
            ) : (
              <>
                <span>S'abonner</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className={`cta-features ${isVisible ? 'animate-in' : ''}`} style={{ animationDelay: '400ms' }}>
          <div className="cta-feature">
            <div className="feature-dot"></div>
            <span>Mises à jour hebdomadaires</span>
          </div>
          <div className="cta-feature">
            <div className="feature-dot"></div>
            <span>Réductions exclusives</span>
          </div>
          <div className="cta-feature">
            <div className="feature-dot"></div>
            <span>Recommandations personnalisées</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
