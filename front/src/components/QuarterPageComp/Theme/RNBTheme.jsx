import { createTheme } from '@mui/material/styles';

const RNBTheme = createTheme({
    typography: {
        fontFamily: 'Playfair Display',
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#7f7f7f', // 원하는 배경색으로 변경
                    border: '1px solid black',
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
