import { createTheme } from '@mui/material/styles';

const RNBTheme = createTheme({
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#333333', // 원하는 배경색으로 변경
                },
            },
        },
    },
});

export default RNBTheme;
