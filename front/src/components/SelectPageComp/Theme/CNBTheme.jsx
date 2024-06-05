import { createTheme } from '@mui/material/styles';

export const CNBTheme = createTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                elevation: 0,
            },
        },
    },
});
