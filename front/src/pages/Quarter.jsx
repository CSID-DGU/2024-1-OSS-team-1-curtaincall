import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import api from '../axios';
import RoundNavBar from "../components/QuarterPageComp/RoundNavBar";
import Tournament from "../components/QuarterPageComp/Tournament";
import RoundContainer from "../components/QuarterPageComp/RoundContainer";

function Quarter() {
    const navigate = useNavigate();
    const [currentRound, setCurrentRound] = useState(0);
    const [selectedImages, setSelectedImages] = useState([]);
    const [groups, setGroups] = useState([]);
    const [totalRounds, setTotalRounds] = useState(0);

    const handleRoundsReady = (loadedGroups, rounds) => {
        setGroups(loadedGroups);
        setTotalRounds(rounds);
    };

    const handleImageSelect = (image, roundIndex) => {
        setSelectedImages(prevSelectedImages => {
            const newSelectedImages = [...prevSelectedImages, image];
            if (currentRound < totalRounds - 1) {
                setCurrentRound(currentRound + 1);
                const nextRoundIndex = roundIndex + 1;
                const nextRound = groups[nextRoundIndex] || [];
                const newGroups = [...groups];
                newGroups[nextRoundIndex] = [...(newGroups[nextRoundIndex] || []), image];
                setGroups(newGroups);
            } else {
                navigate('/choose', { state: { selectedImages: newSelectedImages } });
            }
            return newSelectedImages;
        });
    };

    return (
        <div>
            <RoundNavBar currentRound={currentRound} totalRounds={totalRounds} />
            <Tournament stageId={0} folderNum={0} onRoundsReady={handleRoundsReady} />
            {groups.length > 0 && (
                <RoundContainer
                    round={groups[currentRound]}
                    onImageSelect={handleImageSelect}
                    roundIndex={currentRound}
                />
            )}
        </div>
    );
}


export default Quarter;