import {atom} from 'recoil';

export const stageState = atom({
    key: 'stageId',
    default: 0,
});