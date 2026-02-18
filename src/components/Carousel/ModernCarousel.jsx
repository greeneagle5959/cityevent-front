import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import des modules Swiper
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
// Import des icônes Lucide (déjà présentes dans ton package.json)
import { ArrowLeft, ArrowRight, Calendar, MapPin, Ticket } from 'lucide-react';

// Styles Swiper obligatoires
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import du CSS personnalisé pour les effets 3D et reflets
import './ModernCarousel.css';

const events = [
    { 
        id: 1, 
        title: "OM vs PSG", 
        image: "https://images.unsplash.com/photo-1556690171-96530588d64c?auto=format&fit=crop&q=80&w=600", 
        category: "Sport", 
        price: "65€", 
        date: "24 mars", 
        location: "Stade Vélodrome",
        colorCode: "#00b4d8" 
    },
    { 
        id: 2, 
        title: "Exposition Mucem", 
        image: "https://images.unsplash.com/photo-1566954974723-a50d2459c55b?auto=format&fit=crop&q=80&w=600", 
        category: "Art", 
        price: "12€", 
        date: "10 avr.", 
        location: "Mucem",
        colorCode: "#d63384" 
    },
    { 
        id: 3, 
        title: "Concert de Jazz", 
        image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=600", 
        category: "Musique", 
        price: "25€", 
        date: "15 mars", 
        location: "Sunset Sunside",
        colorCode: "#e01e37" 
    },
    { 
        id: 4, 
        title: "Festival Tech", 
        image: "https://images.unsplash.com/photo-1540575467063-178a50935278?auto=format&fit=crop&q=80&w=600", 
        category: "Tech", 
        price: "Gratuit", 
        date: "20 juin", 
        location: "Station F",
        colorCode: "#06d6a0" 
    },
    { 
        id: 5, 
        title: "Théâtre Royal", 
        image: "https://images.unsplash.com/photo-1503095392269-27528ca38ea4?auto=format&fit=crop&q=80&w=600", 
        category: "Théâtre", 
        price: "40€", 
        date: "02 mai", 
        location: "Comédie Française",
        colorCode: "#ffd60a" 
    },
];

const ModernCarousel = () => {
  return (
    <div className="modern-carousel-wrapper">
      <Swiper
      modules={[ Autoplay]}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={true}
        
        initialSlide={1}
        
        // Configuration boucle infinie
        autoplay={{
            delay: 1500,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
        }}
      

         
            
 
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 2.5,
          slideShadows: false,
        }}
        
        pagination={{ clickable: true, dynamicBullets: true }}
        
        // Navigation connectée aux boutons Lucide customisés
        navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
            clickable: true,
        }}
        
     
        className="swiper_container_modern"
      >
        {events.map((evt,id) => (
          <SwiperSlide key={id}>
             {/* Injection de la couleur pour l'effet Néon */}
             <div 
                className="glass-card group" 
                style={{ '--glow-color': evt.colorCode }}
             >
                
                {/* Image */}
                <div className="card-image-wrapper">
                    <img src={evt.image} alt={evt.title} />
                </div>

                {/* Contenu Overlay (Utilisation de Tailwind pour le style) */}
                <div className="card-content text-white p-6 flex flex-col justify-between h-full">
                    
                    {/* Tags en haut */}
                    <div className="flex justify-between items-start">
                        <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/20 uppercase tracking-wide">
                            {evt.category}
                        </span>
                        <div 
                            className="px-3 py-1.5 rounded-lg font-bold text-sm shadow-[0_0_10px_var(--glow-color)]"
                            style={{ backgroundColor: evt.colorCode }}
                        >
                            {evt.price}
                        </div>
                    </div>

                    {/* Infos en bas */}
                    <div className="mt-auto pt-10">
                        <h3 className="text-2xl font-extrabold mb-2 drop-shadow-md leading-tight">
                            {evt.title}
                        </h3>
                        
                        <div className="flex flex-col gap-1 text-gray-300 text-xs mb-4 font-medium">
                             <div className="flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5" /> 
                                <span>{evt.date}</span>
                             </div>
                             <div className="flex items-center gap-2">
                                <MapPin className="w-3.5 h-3.5" /> 
                                <span>{evt.location}</span>
                             </div>
                        </div>
                        
                        <button 
                            className="w-full py-3 rounded-xl font-bold uppercase text-xs tracking-widest transition-all duration-300 hover:-translate-y-1 shadow-[0_0_15px_var(--glow-color)] hover:bg-white hover:text-[var(--glow-color)] flex items-center justify-center gap-2 text-white"
                            style={{ backgroundColor: evt.colorCode }}
                        >
                            <Ticket className="w-4 h-4" />
                            Réserver
                        </button>
                    </div>
                </div>

                {/* Barre de progression animée */}
                <div className="progress-bar-glow"></div>
             </div>
          </SwiperSlide>
        ))}

        {/* --- NAVIGATION CUSTOM (Flèches Lucide) --- */}
        <div className="slider-controler">
            <div className="custom-prev slider-arrow">
                <ArrowLeft className="w-6 h-6 text-white" />
            </div>
            <div className="custom-next slider-arrow">
                <ArrowRight className="w-6 h-6 text-white" />
            </div>
        </div>

      </Swiper>
    </div>
  );
};

export default ModernCarousel;