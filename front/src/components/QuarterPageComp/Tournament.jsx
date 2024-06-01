import React, { useState, useEffect } from 'react';
import {useRecoilState, useRecoilValue} from "recoil";
import {currentRoundState, sortedImageDataState, totalRoundsState} from "../../atom/atom";
import RoundContainer from "./RoundContainer";

const Tournament = ({ onRoundsReady }) => {
    const sortedImages = useRecoilValue(sortedImageDataState);
    const [currentRound, setCurrentRound] = useRecoilState(currentRoundState);
    const [selectedImages, setSelectedImages] = useState([]);
    const [groups, setGroups] = useState([]);
    const [totalRounds, setTotalRounds] = useRecoilState(totalRoundsState);
    const [activeGroupIndex, setActiveGroupIndex] = useState(0);  // 현재 활성화된 그룹의 인덱스

    useEffect(() => {
        if (Object.keys(sortedImages).length > 0) {
            const newGroups = Object.entries(sortedImages).map(([group_id, images]) => ({
                group_id,
                images: images.map(src => ({ src }))
            }));
            const adjustedGroups = adjustGroups(newGroups);
            setGroups(adjustedGroups);
            setTotalRounds(adjustedGroups.map(group => group.images.length / 4)); // 각 그룹의 라운드 수
            console.log(adjustedGroups)
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

    const handleImageSelect = (image) => {
        setSelectedImages(prevSelectedImages => [...prevSelectedImages, image]);

        const currentGroup = groups[activeGroupIndex];
        const currentGroupRounds = totalRounds[activeGroupIndex];
        const currentGroupRound = currentRound[currentGroup.group_id] || 0;

        if (currentGroupRound < currentGroupRounds - 1) {
            setCurrentRound(prevCurrentRound => ({
                ...prevCurrentRound,
                [currentGroup.group_id]: currentGroupRound + 1
            }));
        } else if (activeGroupIndex < groups.length - 1) {
            setActiveGroupIndex(prevIndex => prevIndex + 1); // 다음 그룹으로 이동
        } else {
            onRoundsReady(selectedImages); // 모든 토너먼트 완료
        }
    };

    return (
        <div>
            {groups.length > 0 && (
                <RoundContainer
                    key={groups[activeGroupIndex].group_id}
                    group={groups[activeGroupIndex]}
                    onImageSelect={handleImageSelect}
                />
            )}
        </div>
    );
};

export default Tournament;
