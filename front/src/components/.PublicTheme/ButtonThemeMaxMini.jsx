import { createTheme } from '@mui/material/styles';

export const ButtonThemeMaxMini = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    width: '5vw',
                    height: '3vh',
                    borderRadius: '50px',
                    fontWeight: 'bold',
                    fontSize: '0.75vw',
                    position: 'relative',
                    transition: 'background-color 0.5s ease',
                    marginLeft: '0.25vw',
                }
            }
        }
    }
});