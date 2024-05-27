import { createTheme } from '@mui/material/styles';

export const ButtonThemeMini = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    width: '33.33vw',
                    height: '8vh',
                    borderRadius: '50px',
                    fontWeight: 'bold',
                    fontSize: '1.25vw',
                    position: 'relative',
                    transition: 'background-color 0.5s ease',
                    marginLeft: '0.25vw',
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