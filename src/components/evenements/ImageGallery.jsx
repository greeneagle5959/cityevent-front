import { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import './imageGallery.css'

export default function ImageGallery({ images, eventName, isOpen, onClose }) {
    const [currentIndex, setCurrentIndex] = useState(0)

    if (!isOpen || !images || images.length === 0) return null

    const currentImage = images[currentIndex]

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        )
    }

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        )
    }

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index)
    }

    return (
        <div className="gallery-overlay" onClick={onClose}>
            <div className="gallery-modal" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="gallery-header">
                    <h3>{eventName}</h3>
                    <button className="gallery-close" onClick={onClose}>
                        <X size={28} />
                    </button>
                </div>

                {/* Main Image */}
                <div className="gallery-main">
                    <img src={currentImage.url} alt={`${eventName} ${currentIndex + 1}`} className="gallery-image" />
                    
                    {/* Navigation Buttons */}
                    {images.length > 1 && (
                        <>
                            <button className="gallery-nav prev" onClick={goToPrevious}>
                                <ChevronLeft size={32} />
                            </button>
                            <button className="gallery-nav next" onClick={goToNext}>
                                <ChevronRight size={32} />
                            </button>
                        </>
                    )}

                    {/* Image Counter */}
                    <div className="gallery-counter">
                        {currentIndex + 1} / {images.length}
                    </div>
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                    <div className="gallery-thumbnails">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image.url}
                                alt={`Vignette ${index + 1}`}
                                className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => handleThumbnailClick(index)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
