import { createTheme } from '@mui/material/styles';

export const SDTheme = createTheme({
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#f4f4f4',
                }
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#e0e0e0',
                    }
                }
            }
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    color: '#333',
                    fontWeight: 'bold'
                }
            }
        }
    }
});