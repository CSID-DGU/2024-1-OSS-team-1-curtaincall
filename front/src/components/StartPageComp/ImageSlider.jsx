import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

const ImageSlider = ({ images, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [images.length, interval]);

    return (
        <div className="slider-container">
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`slide ${index}`}
                    className={`slider-image ${index === currentIndex ? 'active' : ''}`}
                />
            ))}
        </div>
    );
};

export default ImageSlider;
