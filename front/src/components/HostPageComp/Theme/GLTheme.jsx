import { createTheme } from '@mui/material/styles';

export const GLTheme = createTheme({
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#f5f5f5', // 배경색 변경
                    color: '#333', // 텍스트 색상 변경
                    padding: '20px', // 패딩 조정
                    '&:hover': {
                        backgroundColor: '#e8e8e8', // 호버 시 배경색 변경
                    }
                }
            }
        }
    }
});