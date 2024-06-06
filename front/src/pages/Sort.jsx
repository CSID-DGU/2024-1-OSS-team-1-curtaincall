import React from 'react';
import SortButton from '../components/SortPageComp/SortButton';
import { motion } from 'framer-motion';
import CustomContainer from "../components/ContainerComp/CustomContainer";
import Logo from '../components/GusetPageComp/LogoWrite';
import '../components/GusetPageComp/LogoWrite.css';

function Sort() {
    const buttonVariants = {
        initial: {
            opacity: 0,
            y: 20,
        },
        in: {
            opacity: 1,
            y: 0,
        },
        out: {
            opacity: 0,
            y: -20,
        },
    };

    const buttonTransition = (delay = 0) => ({
        type: 'tween',
        ease: 'anticipate',
        duration: 0.8,
        delay: delay,
    });

    return (
        <CustomContainer>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', width: '100%' }}>
                <Logo />
                <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={buttonVariants}
                    transition={buttonTransition(0.2)}
                >
                    <SortButton>정렬 시작</SortButton>
                </motion.div>
            </div>
        </CustomContainer>
    );
}

export default Sort;
