import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoundNavBar from "../components/QuarterPageComp/RoundNavBar";
import Tournament from "../components/QuarterPageComp/Tournament";
import { currentRoundState, totalRoundsState } from "../atom/atom";
import { useRecoilValue } from "recoil";
import TournamentTest from "../components/QuarterPageComp/TournamentTest";
import CustomContainer from "../components/ContainerComp/CustomContainer";
import {motion} from "framer-motion";

function Quarter() {
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

    const buttonTransition =(delay = 0) => ({
        type: 'tween',
        ease: 'anticipate',
        duration: 0.8,
        delay: delay,
    });
    const navigate = useNavigate();
    const currentRound = useRecoilValue(currentRoundState);
    const totalRounds = useRecoilValue(totalRoundsState);

    const [currentGroup, setCurrentGroup] = useState({});
    const [groupRound, setGroupRound] = useState(1);
    const [groupTotalRounds, setGroupTotalRounds] = useState(1);

    const handleRoundsComplete = (selectedImages) => {
        navigate('/select', { state: { selectedImages } });
    };

    const handleGroupChange = (group, round, totalRounds) => {
        setCurrentGroup(group);
        setGroupRound(round);
        setGroupTotalRounds(totalRounds);
    };

    return (
        <div>
            <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={buttonVariants}
                transition={buttonTransition(0.2)}
            >
                <RoundNavBar
                    currentRound={currentRound}
                    totalRounds={totalRounds}
                    currentGroup={currentGroup}
                    groupRound={groupRound}
                    groupTotalRounds={groupTotalRounds}
                />
            </motion.div>
            <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={buttonVariants}
                transition={buttonTransition(0.6)}
            >
                <Tournament onRoundsReady={handleRoundsComplete} onGroupChange={handleGroupChange}/>
            </motion.div>
        </div>
    );
}

export default Quarter;
