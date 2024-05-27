import { createTheme } from '@mui/material/styles';

export const SideButtonThemeMaxMini = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    width: '5vw',
                    height: '3vh',
                    fontWeight: 'bold',
                    position: 'relative',
                    transition: 'background-color 0.5s ease',
                    marginLeft: '0.25vw',
                    fontSize: '1vw',
                    '@media (max-width: 1200px)': {
                        fontSize: '1.5vw',
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