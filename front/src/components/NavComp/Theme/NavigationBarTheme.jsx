import { createTheme } from '@mui/material/styles';
import backgroundDots from '../../../img/background_dots.png'; // 이미지 파일 경로

export const NVTheme = createTheme({
    palette: {
    },
    typography: {
        fontFamily: 'Playfair Display',
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    marginBottom: '0.25%',
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    color: '#595959',
                    backgroundColor: '#F5F5F5',
                    backgroundImage: `url(${backgroundDots})`,
                    backgroundSize: 'auto', // 필요에 따라 'contain' 또는 'cover'로 변경 가능
                    backgroundSize: '25px 25px',
                    backgroundRepeat: 'repeat',
                    backgroundPosition: 'center', // 필요에 따라 위치 조정 가능
                },
            },
        },
    },
});