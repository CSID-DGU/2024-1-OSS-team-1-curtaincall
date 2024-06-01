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
    const [activeGroupIndex, setActiveGroupIndex] = useState(0);
    const [subGroupIndex, setSubGroupIndex] = useState(0);

    useEffect(() => {
        const testImages = Array.from({ length: 10 }, (_, i) => ({ src: `../../img/image${i+1}.jpg` }));
        const newGroups = [
            { group_id: 1, images: testImages.slice(0, 5) },
            { group_id: 2, images: testImages.slice(5, 10) }
        ];
        const adjustedGroups = adjustGroups(newGroups);
        setGroups(adjustedGroups);
        setTotalRounds(adjustedGroups.map(group => Math.ceil(group.images.length / 4)));
    }, []);

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
        const numSubGroups = Math.ceil(currentGroup.images.length / 4);
        const newSubGroupIndex = (subGroupIndex + 1) % numSubGroups;

        if (newSubGroupIndex === 0) {  // 현재 그룹의 모든 소그룹 선택 완료
            if (activeGroupIndex < groups.length - 1) {
                setActiveGroupIndex(activeGroupIndex + 1);  // 다음 그룹으로 이동
                setSubGroupIndex(0);
            } else {
                const finalImages = selectedImages;
                onRoundsReady(finalImages); // 모든 토너먼트 완료
            }
        } else {
            setSubGroupIndex(newSubGroupIndex);
        }
    };

    return (
        <div>
            {groups.length > 0 && (
                <RoundContainer
                    key={groups[activeGroupIndex].group_id * 100 + subGroupIndex}
                    group={{
                        ...groups[activeGroupIndex],
                        images: groups[activeGroupIndex].images.slice(subGroupIndex * 4, (subGroupIndex + 1) * 4)
                    }}
                    onImageSelect={handleImageSelect}
                />
            )}
        </div>
    );
};

export default Tournament;
