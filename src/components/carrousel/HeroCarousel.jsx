import React from 'react';

const HeroCarousel = () => {
  return (
    // "data-bs-ride" active le défilement automatique
    <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel">
      
      {/* Indicateurs (les petits traits en bas) */}
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>

      {/* Les images du carousel */}
      <div className="carousel-inner">
        
        {/* Slide 1 */}
        <div className="carousel-item active" data-bs-interval="4000">
          <img 
            src="https://placehold.co/1920x600/2980b9/ffffff?text=Bienvenue+sur+CityEvent" 
            className="d-block w-100" 
            alt="Bienvenue" 
            style={{ height: '500px', objectFit: 'cover' }} 
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Découvrez les meilleurs événements</h5>
            <p>Concerts, festivals et théâtres près de chez vous.</p>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="carousel-item" data-bs-interval="4000">
          <img 
            src="https://placehold.co/1920x600/8e44ad/ffffff?text=Soirées+Inoubliables" 
            className="d-block w-100" 
            alt="Soirées"
            style={{ height: '500px', objectFit: 'cover' }} 
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Vivez l'instant</h5>
            <p>Réservez vos places dès maintenant.</p>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="carousel-item" data-bs-interval="4000">
          <img 
            src="https://placehold.co/1920x600/27ae60/ffffff?text=Culture+et+Arts" 
            className="d-block w-100" 
            alt="Culture"
            style={{ height: '500px', objectFit: 'cover' }} 
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Culture & Arts</h5>
            <p>Expositions et musées à ne pas manquer.</p>
          </div>
        </div>

      </div>

      {/* Boutons Précédent / Suivant */}
      <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Précédent</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Suivant</span>
      </button>
    </div>
  );
};

export default HeroCarousel;