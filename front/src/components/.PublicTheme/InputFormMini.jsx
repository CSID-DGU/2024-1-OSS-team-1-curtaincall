import { createTheme } from '@mui/material/styles';

export const InputFormMiniTheme = createTheme({
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    width: '33.33vw',
                    height: '8vh',
                    borderRadius: '50px',
                    fontWeight: 'bold',
                    fontSize: '1.25vw',
                    position: 'relative',
                    transition: 'background-color 0.5s ease',
                    margin: 'auto',
                    marginLeft: '0.25vw',
                    marginTop: '0.25vw',
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