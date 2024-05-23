import React, { useState, useEffect } from 'react';
import api from '../../axios';

const Tournament = ({ stageId, folderNum, onRoundsReady }) => {

    const CallImage = () => {
        api.get('/Image/findImageList', {
            params: {
                stageId: stageId, //실제 스테이지 ID를 설정
                folderNum: folderNum //실제 폴더 번호를 설정
            }
        })
            .then(response => {
                const images = response.data.imageList || [];
                const groupedData = groupBy(images, 'group_id');
                const adjustedGroups = adjustGroups(groupedData);
                onRoundsReady(adjustedGroups, adjustedGroups.length);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    };

    useEffect(() => {
        CallImage();
    }, [stageId, folderNum]);

    const groupBy = (array, key) => {
        return array.reduce((result, currentValue) => {
            (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
            return result;
        }, {});
    };

    const adjustGroups = (groupedData) => {
        return Object.values(groupedData).map(group => {
            const length = group.length;
            const remainder = length % 4;
            if (remainder !== 0) {
                const fillers = Array(4 - remainder).fill({ src: 'path/to/placeholder/image.jpg', group_id: group[0].group_id, isDummy: true });
                return [...group, ...fillers];
            }
            return group;
        });
    };

    return null; // 이 컴포넌트는 데이터를 로드하고 부모 컴포넌트로 전달하기 위한 용도
}

export default Tournament;
