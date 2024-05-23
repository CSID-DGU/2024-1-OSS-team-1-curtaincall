import { createTheme } from '@mui/material/styles';

export const GLTheme = createTheme({
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent', // 배경색 변경
                    color: '#333', // 텍스트 색상 변경
                    padding: '20px', // 패딩 조정
                }
            }
        }
    }
});