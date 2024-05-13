import { createTheme } from '@mui/material/styles';

export const NVTheme = createTheme({
    palette: {
    },
    typography: {
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    borderRadius: 3,
                    marginBottom: 10,
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    color: '#595959',
                    backgroundColor: '#ffffff',
                },
            },
        },
    },
});