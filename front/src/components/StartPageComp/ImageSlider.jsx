import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

import slide1 from '../../img/slide1.jpg';
import slide2 from '../../img/slide2.jpg';

const ImageSlider = ({ interval = 3000, maxhe = '67%' }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        slide1,
        slide2,
        // 추가 이미지 경로를 여기에 입력하세요.
      ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [images.length, interval]);

    return (
        <div className="slider-container" style={{maxHeight: maxhe }}>
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
