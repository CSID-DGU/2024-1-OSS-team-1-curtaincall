import React from 'react';
import {ThemeProvider, Box, Typography, styled, useMediaQuery, useTheme, Link} from '@mui/material';
import Foottheme from './Theme/FootTheme';
import backgroundDots from '../../img/background_dots.png'; // 이미지 파일 경로
import githubMark from '../../img/github-mark.png';
import githubLogo from '../../img/GitHub_Logo.png';

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    backgroundImage: `url(${backgroundDots})`,
    backgroundSize: '25px 25px', // 필요에 따라 'contain' 또는 'cover'로 변경 가능
    backgroundRepeat: 'repeat',
    backgroundPosition: 'center', // 필요에 따라 위치 조정 가능
    padding: theme.spacing(2),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
    fontFamily: theme.typography.fontFamily,
}));

function Footer() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <ThemeProvider theme={Foottheme}>
            <StyledBox sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <StyledTypography sx={{ color: '#7f7f7f', fontSize: isMobile ? '10px' : '20px', fontFamily: 'RIDIBatang' }}>
                        Team STAFF
                    </StyledTypography>
                    <Link href="https://www.dongguk.edu/main" target="_blank" rel="noopener" underline="none">
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Typography
                                sx={{color: '#7f7f7f', fontSize: isMobile ? '8px' : '16px', fontFamily: 'RIDIBatang'}}>
                                서울특별시 중구 필동로1길 30 동국대학교 신공학관
                            </Typography>
                        </Box>
                    </Link>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <StyledTypography sx={{ color: '#7f7f7f', fontSize: isMobile ? '10px' : '20px', fontFamily: 'RIDIBatang' }}>
                        공개 SW 프로젝트 1팀
                    </StyledTypography>
                    <Link href="https://github.com/CSID-DGU/2024-1-OSS-team-1-curtaincall" target="_blank" rel="noopener" underline="none">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <img src={githubMark} alt="GitHub Mark" style={{ height: isMobile ? '10px' : '18px', marginRight: '8px',opacity: 0.6 }} />
                            <img src={githubLogo} alt="GitHub Logo" style={{ height: isMobile ? '10px' : '18px',opacity: 0.52 }} />
                        </Box>
                    </Link>
                </Box>
            </StyledBox>
        </ThemeProvider>
    );
}

export default Footer;
