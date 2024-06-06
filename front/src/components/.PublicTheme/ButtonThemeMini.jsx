import { createTheme } from '@mui/material/styles';

export const ButtonThemeMini = createTheme({
    typography: {
        fontFamily: 'RIDIBatang',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    border: '1px solid black',
                    width: '33.33vw',
                    height: '5vh',
                    borderRadius: '0px',
                    fontSize: '1.25vw',
                    position: 'relative',
                    transition: 'background-color 0.5s ease',
                    marginLeft: '0.25vw',
                    '&:hover': {
                        boxShadow: 'none',  // 호버 상태에서 그림자 없애기
                    },
                    '@media (max-width: 1000px)': {
                        fontSize: '1.5vw',
                        marginTop: '0.25vw',
                    },
                    '@media (max-width: 768px)': {
                        fontSize: '2.5vw',
                        marginTop: '0.25vw',
                    },
                    '@media (max-width: 600px)': {
                        fontSize: '3.0vw',
                        marginTop: '0.25vw',
                    }

                }
            }
        }
    }
});