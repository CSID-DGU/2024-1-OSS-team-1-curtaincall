import { createTheme } from '@mui/material/styles';

export const URLTheme = createTheme({
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    width: '66.66%',
                    height: '70px',
                    borderRadius: '50px',
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    position: 'relative',
                    transition: 'background-color 0.5s ease',
                    margin: 'auto',
                    '@media (max-width: 768px)': {
                        width: '100%',
                        marginTop: '0.25%',
                    },
                },
                notchedOutline: {
                    borderColor: 'black',
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                }
            }
        }
    }
});