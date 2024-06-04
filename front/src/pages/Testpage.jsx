import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoundNavBar from "../components/QuarterPageComp/RoundNavBar";
import Tournament from "../components/QuarterPageComp/Tournament";
import { currentRoundState, totalRoundsState } from "../atom/atom";
import { useRecoilValue } from "recoil";
import TournamentTest from "../components/QuarterPageComp/TournamentTest";
import CustomContainer from "../components/CustomContainer";

function Quarter() {
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
            <RoundNavBar
                currentRound={currentRound}
                totalRounds={totalRounds}
                currentGroup={currentGroup}
                groupRound={groupRound}
                groupTotalRounds={groupTotalRounds}
            />
            <TournamentTest onRoundsReady={handleRoundsComplete} onGroupChange={handleGroupChange} />
        </div>
    );
}

export default Quarter;
