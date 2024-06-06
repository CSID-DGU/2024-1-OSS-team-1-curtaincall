import { createTheme } from '@mui/material/styles';

export const ButtonThemeMaxMini = createTheme({
    typography: {
        fontFamily: 'RIDIBatang',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    border: '1px solid black',
                    width: '5vw',
                    height: '3vh',
                    borderRadius: '0',
                    fontSize: '0.75vw',
                    position: 'relative',
                    transition: 'background-color 0.5s ease',
                    marginLeft: '0.25vw',
                    '&:hover': {
                        boxShadow: 'none',  // 호버 상태에서 그림자 없애기
                    },
                }
            }
        }
    }
});