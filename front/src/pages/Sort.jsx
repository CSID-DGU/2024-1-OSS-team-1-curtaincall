import React from 'react';
import SortButton from '../components/SortPageComp/SortButton';
import CustomContainer from "../components/CustomContainer"; // 적절한 경로로 변경

function Sort() {
    return (
        <CustomContainer>
            <SortButton>정렬 시작</SortButton>
        </CustomContainer>
    );
}

export default Sort;