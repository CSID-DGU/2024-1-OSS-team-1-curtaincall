import React, { useState, useEffect } from 'react';
import {useRecoilState, useRecoilValue} from "recoil";
import {currentRoundState, sortedImageDataState, totalRoundsState} from "../../atom/atom";
import RoundContainer from "./RoundContainer";

const Tournament = ({onRoundsReady}) => {
    const sortedImages = useRecoilValue(sortedImageDataState);
    const [currentRound, setCurrentRound] = useRecoilState(currentRoundState);
    const [selectedImages, setSelectedImages] = useState([]);
    const [groups, setGroups] = useState([]);
    const [totalRounds, setTotalRounds] = useRecoilState(totalRoundsState);

    useEffect(() => {
        if (Object.keys(sortedImages).length > 0) {
            const newGroups = Object.entries(sortedImages).map(([group_id, images]) => ({
                group_id,
                images: images.map(src => ({ src }))
            }));
            const adjustedGroups = adjustGroups(newGroups);
            console.log(adjustedGroups.length);
            setGroups(adjustedGroups);
            setTotalRounds(adjustedGroups.length);
        }
    }, [sortedImages]);

    const adjustGroups = (groups) => {
        return groups.map(group => {
            const length = group.images.length;
            const remainder = length % 4;
            if (remainder !== 0) {
                const fillers = Array(4 - remainder).fill({
                    src: '../../img/curtainCall.png',
                    group_id: group.group_id,
                    isDummy: true
                });
                return { ...group, images: [...group.images, ...fillers] };
            }
            return group;
        });
    };

    const handleImageSelect = (image, roundIndex) => {
        setSelectedImages(prevSelectedImages => {
            const newSelectedImages = [...prevSelectedImages, image];
            if (roundIndex < totalRounds - 1) {
                setCurrentRound(roundIndex + 1);
            } else {
                onRoundsReady(newSelectedImages);
            }
            return newSelectedImages;
        });
    };

    return (
        <div>
            {groups.map((group, index) => (
                <RoundContainer
                    key={index}
                    group={group}
                    onImageSelect={handleImageSelect}
                />
            ))}
        </div>
    );
};

export default Tournament;
