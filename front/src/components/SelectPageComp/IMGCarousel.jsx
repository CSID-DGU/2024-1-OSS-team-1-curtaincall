import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './CarouselCaption.css';
import SingleImageDownloadButton from './SingleImageDownloadButton';
import AllImagesDownloadButton from './AllImagesDownloadButton';

const IMGCarousel = ({ images }) => {
    const quotes = [
        "The best way to pay for a lovely moment is to enjoy it. - Richard Bach",
        "Sometimes you will never know the value of a moment until it becomes a memory. - Dr. Seuss",
        "Memories are the treasures that we keep locked deep within the storehouse of our souls. - Becky Aligada",
        "The heart that truly loves never forgets. - Proverb",
        "We do not remember days, we remember moments. - Cesare Pavese",
        "Memory is the diary that we all carry about with us. - Oscar Wilde",
        "Good times become good memories, but bad times become good lessons. - Unknown",
        "Memories are timeless treasures of the heart. - Unknown",
        "Life brings tears, smiles, and memories. The tears dry, the smiles fade, but the memories last forever. - Unknown",
        "Collect beautiful moments. - Unknown"
    ];


    const [currImage, setCurrImage] = useState(images[0]);

    const handleSelect = (selectedIndex) => {
        setCurrImage(images[selectedIndex]);
    };

    let qidx = 0;

    return (
        <>
            <Carousel onSelect={handleSelect}>
                {images.map((image, index) => (
                    <Carousel.Item key={index}>
                        <img
                            className="d-block w-100"
                            src={image.src}
                            alt={`Your pick ${index + 1}`}
                            style={{ height: '60vh', objectFit: 'contain' }}
                        />
                        <div className="carousel-caption-below">
                            <h5>Memory {index + 1}</h5>
                            <p style={{color: 'gray'}}>{quotes[qidx++ % 10]}</p>
                            <div style={{ width: '100%', height:'4px', marginBottom:'2%'}}></div>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
            <div>
                <SingleImageDownloadButton image={currImage}>현재 이미지 다운로드</SingleImageDownloadButton>
                <AllImagesDownloadButton images={images}>모든 이미지 다운로드</AllImagesDownloadButton>
            </div>
        </>
    );
};

export default IMGCarousel;
