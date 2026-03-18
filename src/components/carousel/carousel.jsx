import React from 'react';
import { useEffect, useState } from "react";
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



const Carousel = () => {

    const [data, setData] = useState(null);
    //const [openDescriptionId, setOpenDescriptionId] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://127.0.0.1:8000/api/v1/events/listEventsSponsored");
            const result = await response.json();
            setData(result);
        }
        fetchData();

    }, []);



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
                {data && data.map((event, id) => (
                    <SwiperSlide key={id}>
                        {/* Injection de la couleur pour l'effet Néon */}
                        <div
                            className="glass-card group"
                            style={{ '--glow-color': event.title }}
                        >

                            {/* Image */}
                            <div className="card-image-wrapper">
                                {event.images && event.images.length > 0 && (
                                    <img
                                        src={event.images[0].url}
                                        className="img-fluid rounded-start event-card-img"
                                        alt={event.nom_evenement}
                                    />
                                )}
                            </div>

                            <div className="flex justify-between items-start">
                                <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/20 uppercase tracking-wide shadow-[0_0_5px_var(--glow-color)] position-relative top-5 left-4" style={{ color: event.nom_evenement }}>
                                    {event.nom_evenement} </span>
                                <div
                                    className="px-3 py-1.5 rounded-lg font-bold text-sm shadow-[0_0_10px_var(--glow-color)] position-absolute top-4 right-4"
                                    style={{ backgroundColor: event.nom_evenement }}
                                >
                                    {event.price_place}
                                </div>


                            </div>
                            {/* Contenu Overlay (Utilisation de Tailwind pour le style) */}
                            <div className="card-content text-white p-6 flex flex-col justify-between h-full">
                                {/* Tags en haut */}

                                {/* Bas de la carte : infos à gauche, bouton à droite */}
                                <div className="flex flex-row items-end justify-end w-full" style={{ position: 'sticky', width: '100%', left: 0, right: 0, bottom: '1.2rem', paddingRight: '1.2rem' }}>
                                    <div className="flex flex-col gap-1 text-gray-300 text-xs font-medium items-end" style={{ maxWidth: '80%' }}>
                                        <h3 className="text-2xl font-extrabold mb-2 drop-shadow-md leading-tight text-white">
                                            {event.nom_evenement}
                                        </h3>
                                        <div className="flex items-center gap-2 position-relative">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>{event.date_debut}</span>
                                        </div>
                                        <div className="flex items-center gap-2 position-relative">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span>{event.date_fin}</span>
                                        </div>
                                    </div>
                                    <button
                                        className="rounded-lg font-bold uppercase text-xs tracking-widest transition-all duration-300 hover:-translate-y-1 shadow-[0_0_10px_var(--glow-color)] hover:bg-white hover:text-[var(--glow-color)] flex items-center justify-center text-white mt-2 position-absolute right-1.2rem bottom-1.2rem"
                                        style={{ backgroundColor: event.nom_evenement, whiteSpace: 'nowrap', fontSize: '0.75rem', justifyContent: 'center', padding: '0.5rem 1rem', position: 'absolute', right: '1.2rem', bottom: '1.2rem' }}
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