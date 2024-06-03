import { createTheme } from '@mui/material/styles';

export const ButtonTheme = createTheme({
    typography: {
        fontFamily: 'RIDIBatang', // 'RIDIBatang' 폰트를 기본 폰트로 설정
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    border: '1px solid black',
                    width: '40vw',
                    height: '8vh',
                    borderRadius: '0px',
                    fontSize: '3.0vh',
                    position: 'relative',
                    transition: 'background-color 0.5s ease',
                    marginLeft: '0.25vw',
                    '@media (max-width: 1000px)': {
                        fontSize: '1.5vh',
                        marginTop: '0.25vw',
                    },
                    '@media (max-width: 768px)': {
                        fontSize: '2.0vh',
                        height: '5.4vh',
                        width: '66.6vw',
                        marginTop: '0.25vw',
                    },
                    '@media (max-width: 600px)': {
                        fontSize: '2.5vh',
                        height: '5.4vh',
                        width: '66.6vw',
                        marginTop: '0.25vw',
                    }
                }
            }
        }
    }
});