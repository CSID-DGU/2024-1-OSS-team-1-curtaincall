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

const localStorageEffect = key => ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
    }

    onSet(newValue => {
        localStorage.setItem(key, JSON.stringify(newValue));
    });
};

export const loginState = atom({
    key: 'loginState',
    default: false,
    effects_UNSTABLE: [
        localStorageEffect('loginState')
    ],
});

export const usernameState = atom({
    key: 'usernameState',
    default: '',
    effects_UNSTABLE: [
        localStorageEffect('usernameState')
    ],
});

export const modalState = atom({
    key: 'modalState',
    default: false,
});

export const isHostState = atom({
    key: 'isHostState',
    default: false,
});

export const isInputState = atom({
    key: 'isInputState',
    default: true,
});

export const isModalPWState = atom({
    key: 'isModalPWState',
    default: true,
});

export const isModalNameState = atom({
    key: 'isModalNameState',
    default: true,
});