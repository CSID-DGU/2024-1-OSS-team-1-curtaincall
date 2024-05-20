import { createTheme } from '@mui/material/styles';

export const ButtonTheme = createTheme({
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
                        fontSize: '2.0vw',
                        marginTop: '0.25vw',
                    },
                    '@media (max-width: 768px)': {
                        fontSize: '2.0vw',
                        width: '66.6vw',
                        marginTop: '0.25vw',
                    }
                }
            }
        }
    }
});