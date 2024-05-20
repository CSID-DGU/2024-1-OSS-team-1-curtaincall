import React from 'react';
import { Carousel } from 'react-bootstrap';

const IMGCarousel = ({ images }) => {
    return (
        <Carousel>
            {images.map((image, index) => (
                <Carousel.Item key={index}>
                    <img
                        className="d-block w-100"
                        src={image.src}
                        alt={`Your pick ${index + 1}`}
                    />
                    <Carousel.Caption>
                        <h3>Round {index + 1} Winner</h3>
                        <p>This is your selection number {index + 1}.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default IMGCarousel;