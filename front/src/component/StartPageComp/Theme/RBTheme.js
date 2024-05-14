import {createTheme} from "@mui/material";

export const RBTheme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    width: '33.33%',
                    height: '70px',
                    borderRadius: '50px',
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    position: 'relative',
                    transition: 'background-color 0.5s ease',
                    marginRight: '0.25%',
                    '@media (max-width: 768px)': {
                        marginBottom: '0.25%',
                        width: '66.6%'
                    }
                },
            }
        }
    }
});