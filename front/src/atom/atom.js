import {atom} from 'recoil';

export const stageState = atom({
    key: 'stageId',
    default: 0,
});

export const sortedImageDataState = atom({
    key: 'sortedImageData',
    default: [],
});

export const totalRoundsState = atom({
    key: 'totalRoundsState',
    default: 0,
});

export const currentRoundState = atom({
    key: 'currentRoundState',
    default: 0,
});

export const guestState = atom({
    key: 'guestslist',
    default: [],
});