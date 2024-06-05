import { createTheme } from '@mui/material/styles';

export const SideButtonThemeMaxMini = createTheme({
    typography: {
        fontFamily: 'RIDIBatang', // 'RIDIBatang' 폰트를 기본 폰트로 설정
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',  // 호버 상태에서 그림자 없애기
                    },
                    borderRadius: '0',
                    border: '1px solid black',
                    height: '4vh',
                    position: 'relative',
                    transition: 'background-color 0.5s ease',
                    marginLeft: '0.25vw',
                    fontSize: '1vw',
                    width: '98%', // 부모 요소의 너비에 맞춤
                    '@media (max-width: 1200px)': {
                        fontSize: '1.5vw',
                    },
                    '@media (max-width: 1100px)': {
                        fontSize: '1.7vw',
                    },
                    '@media (max-width: 900px)': {
                        fontSize: '2vw',
                    },
                    '@media (max-width: 600px)': {
                        fontSize: '2.5vw',
                    },
                    '@media (max-width: 400px)': {
                        fontSize: '3vw',
                    },
                }
            }
        }
    }
});
