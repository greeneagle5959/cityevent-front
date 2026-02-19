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
import './carousel.css';

// Exemple de 10 événements récents (à adapter dynamiquement si besoin)
const events = [
    { id: 10, title: "Startup Weekend", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600", category: "Tech", price: "Gratuit", date: "18 fév.", location: "Le Wagon", colorCode: "#00b4d8" },
    { id: 9, title: "Salon du Livre", image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&q=80&w=600", category: "Culture", price: "8€", date: "15 fév.", location: "Parc Chanot", colorCode: "#d63384" },
    { id: 8, title: "Marathon Marseille", image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&q=80&w=600", category: "Sport", price: "20€", date: "12 fév.", location: "Vieux-Port", colorCode: "#e01e37" },
    { id: 7, title: "Expo Photo Nature", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&q=80&w=600", category: "Art", price: "5€", date: "10 fév.", location: "Mucem", colorCode: "#06d6a0" },
    { id: 6, title: "Concert Pop Rock", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600", category: "Musique", price: "30€", date: "8 fév.", location: "Dôme", colorCode: "#ffd60a" },
    { id: 5, title: "Théâtre Royal", image: "https://images.unsplash.com/photo-1503095392269-27528ca38ea4?auto=format&fit=crop&q=80&w=600", category: "Théâtre", price: "40€", date: "02 fév.", location: "Comédie Française", colorCode: "#ff8800" },
    { id: 4, title: "Festival Tech", image: "https://images.unsplash.com/photo-1540575467063-178a50935278?auto=format&fit=crop&q=80&w=600", category: "Tech", price: "Gratuit", date: "28 janv.", location: "Station F", colorCode: "#06d6a0" },
    { id: 3, title: "Concert de Jazz", image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=600", category: "Musique", price: "25€", date: "20 janv.", location: "Sunset Sunside", colorCode: "#e01e37" },
    { id: 2, title: "Exposition Mucem", image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&q=80&w=600", category: "Art", price: "12€", date: "15 janv.", location: "Mucem", colorCode: "#d63384" },
    { id: 1, title: "OM vs PSG", image: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?auto=format&fit=crop&q=80&w=600", category: "Sport", price: "65€", date: "10 janv.", location: "Stade Vélodrome", colorCode: "#00b4d8" },
];

const Carousel = () => {
    return (
        <div className="modern-carousel-wrapper">
            <Swiper
                modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                loop={true}
                initialSlide={0}
                autoplay={{
                    delay: 3500,
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
                navigation={{
                    nextEl: '.custom-next',
                    prevEl: '.custom-prev',
                    clickable: true,
                }}
                className="swiper_container_modern"
            >
                {events.map((evt, id) => (
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

                            <div className="flex justify-between items-start">
                                <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/20 uppercase tracking-wide shadow-[0_0_5px_var(--glow-color)] position-relative top-5 left-4" style={{ color: evt.colorCode }}>
                                    {evt.category} </span>
                                <div
                                    className="px-3 py-1.5 rounded-lg font-bold text-sm shadow-[0_0_10px_var(--glow-color)] position-absolute top-4 right-4"
                                    style={{ backgroundColor: evt.colorCode }}
                                >
                                    {evt.price}
                                </div>


                            </div>
                            {/* Contenu Overlay (Utilisation de Tailwind pour le style) */}
                            <div className="card-content text-white p-6 flex flex-col justify-between h-full">
                                {/* Tags en haut */}

                                {/* Bas de la carte : infos à gauche, bouton à droite */}
                                <div className="flex flex-row items-end justify-end w-full" style={{ position: 'sticky', width: '100%', left: 0, right: 0, bottom: '1.2rem', paddingRight: '1.2rem' }}>
                                    <div className="flex flex-col gap-1 text-gray-300 text-xs font-medium items-end" style={{ maxWidth: '80%' }}>
                                        <h3 className="text-2xl font-extrabold mb-2 drop-shadow-md leading-tight text-white">
                                            {evt.title}
                                        </h3>
                                        <div className="flex items-center gap-2 position-relative">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>{evt.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2 position-relative">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span>{evt.location}</span>
                                        </div>
                                    </div>
                                    <button
                                        className="rounded-lg font-bold uppercase text-xs tracking-widest transition-all duration-300 hover:-translate-y-1 shadow-[0_0_10px_var(--glow-color)] hover:bg-white hover:text-[var(--glow-color)] flex items-center justify-center text-white mt-2 position-absolute right-1.2rem bottom-1.2rem"
                                        style={{ backgroundColor: evt.colorCode, whiteSpace: 'nowrap', fontSize: '0.75rem', justifyContent: 'center', padding: '0.5rem 1rem', position: 'absolute', right: '1.2rem', bottom: '1.2rem' }}
                                    >
                                        <Ticket className="w-4 h-4 " />
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

export default Carousel;