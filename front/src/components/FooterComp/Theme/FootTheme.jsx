// theme.js
import { createTheme } from '@mui/material/styles';
import backgroundDots from '../../../img/background_dots.png'; // 이미지 파일 경로

const Foottheme = createTheme({
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
    palette: {
        background: {
            default: '#F5F5F5',
        },
    },
});

export default Foottheme;
