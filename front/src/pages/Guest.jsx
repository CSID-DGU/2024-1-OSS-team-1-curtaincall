import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import URLInputForm from "../components/GusetPageComp/URLInputForm";
import HostPageInputButton from "../components/GusetPageComp/HostPageInputButton";
import ConstantContainer from "../components/ContainerComp/ConstantContainer";

import Logo from '../components/GusetPageComp/LogoWrite';
import '../components/GusetPageComp/LogoWrite.css';

function Guest() {
    const navigate = useNavigate();
    const [hostUrl, setHostUrl] = useState('');
    const [name, setName] = useState('게스트');

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
        <ConstantContainer>
            <Logo />
            <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={buttonVariants}
                transition={buttonTransition(0.2)}
                className="center-div"
                style={{ width: '70%'}}
            >
                <URLInputForm onUrlChange={setHostUrl} placeholder="Stage ID" />
            </motion.div>
            <div style={{ width: '100%', height: '2px', marginBottom: '2%' }}></div>
            <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={buttonVariants}
                transition={buttonTransition(0.4)}
                className="center-div"
            >
                <HostPageInputButton name={name} conststageId={hostUrl}>
                    업로드 페이지 입장
                </HostPageInputButton>
            </motion.div>
        </ConstantContainer>
    );
}

export default Guest;
