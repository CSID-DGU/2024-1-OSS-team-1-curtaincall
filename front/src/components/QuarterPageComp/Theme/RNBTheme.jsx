import { createTheme } from '@mui/material/styles';

const RNBTheme = createTheme({
    typography: {
        fontFamily: 'Playfair Display',
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#333333', // 원하는 배경색으로 변경
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: 'RIDIBatang', // Typography에 폰트 설정
                },
            },
        },
    },
});

export default RNBTheme;
