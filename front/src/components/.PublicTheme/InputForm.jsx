import { createTheme } from '@mui/material/styles';

export const InputFormTheme = createTheme({
    typography: {
        fontFamily: 'Playfair Display',
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    width: '80%',
                    maxWidth: '900px',
                    height: '8vh',
                    borderRadius: '0px',
                    fontWeight: 'bold',
                    fontSize: '1.25vw',
                    position: 'relative',
                    transition: 'background-color 0.5s ease',
                    margin: '0px 0px 0px 0px',
                    marginTop: '0.25vw',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    
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
                    fontSize: '1.25vw',
                    '@media (max-width: 1000px)': {
                        fontSize: '1.5vw',
                    },
                    '@media (max-width: 900px)': {
                        fontSize: '2.5vw',
                    },
                    '@media (max-width: 768px)': {
                        fontSize: '3.5vw',
                    },'@media (max-width: 600px)': {
                        fontSize: '4.5vw',
                    },
                }
            }
        }
    }
});