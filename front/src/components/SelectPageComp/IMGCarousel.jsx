import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SingleImageDownloadButton from './SingleImageDownloadButton';
import AllImagesDownloadButton from './AllImagesDownloadButton';
import './CarouselCaption.css';

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};

const variants = {
    enter: (direction) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
    })
};

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

const IMGCarousel = ({ images }) => {
    const [[page, direction], setPage] = useState([0, 0]);
    const [activeButton, setActiveButton] = useState(null);
    const imageIndex = (page % images.length + images.length) % images.length;
    const currImage = images[imageIndex];

    const paginate = (newDirection) => {
        setPage([page + newDirection, newDirection]);
    };

    const handleButtonClick = (direction) => {
        setActiveButton(direction);
        paginate(direction);
        setTimeout(() => setActiveButton(null), 300); // 클릭 상태를 일정 시간 후에 해제
    };

    const buttonVariants = {
        initial: { opacity: 0, y: 20 },
        in: { opacity: 1, y: 0 },
        out: { opacity: 0, y: -20 },
    };

    const buttonTransition = (delay = 0) => ({
        type: 'tween',
        ease: 'anticipate',
        duration: 0.8,
        delay: delay,
    });

    return (
        <div className="carousel-wrapper">
            <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={buttonVariants}
                transition={buttonTransition(0.2)}
                className="carousel-container"
            >
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{x: {type: "spring", stiffness: 300, damping: 30}, opacity: {duration: 0.2}}}
                        drag="x"
                        dragConstraints={{left: 0, right: 0}}
                        dragElastic={1}
                        onDragEnd={(e, {offset, velocity}) => {
                            const swipe = swipePower(offset.x, velocity.x);
                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                        style={{position: 'absolute', width: '100%'}}
                    >
                        <img
                            src={currImage.src}
                            style={{height: '60vh', objectFit: 'contain', width: '100%'}}
                            alt={`Memory ${imageIndex + 1}`}
                        />
                    </motion.div>
                </AnimatePresence>
                <button
                    onClick={() => handleButtonClick(-1)}
                    className={`carousel-control-prev-icon ${activeButton === -1 ? 'active' : ''}`}
                    style={{position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 10, border: 'none'}}
                >
                </button>
                <button
                    onClick={() => handleButtonClick(1)}
                    className={`carousel-control-next-icon ${activeButton === 1 ? 'active' : ''}`}
                    style={{position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 10, border: 'none'}}
                >
                </button>
            </motion.div>
            <div className="carousel-caption-below">
            <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={buttonVariants}
                transition={buttonTransition(0.8)}
            >
                <h5>Memory {imageIndex + 1}</h5>
                <p style={{color: 'gray'}}>{quotes[imageIndex % quotes.length]}</p>
                <div style={{width: '100%', height: '4px', marginBottom: '2%'}}></div>
            </motion.div>
            </div>
            <div className="download-buttons">
                <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={buttonVariants}
                    transition={buttonTransition(0.4)}
                >
                    <SingleImageDownloadButton image={currImage}>현재 이미지 다운로드</SingleImageDownloadButton>
                </motion.div>
                <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={buttonVariants}
                    transition={buttonTransition(0.6)}
                >
                    <AllImagesDownloadButton images={images}>모든 이미지 다운로드</AllImagesDownloadButton>
                </motion.div>
            </div>
        </div>
    );
};

export default IMGCarousel;
