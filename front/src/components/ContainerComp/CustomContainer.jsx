import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { ContainerTheme } from '../.PublicTheme/ContainerTheme';
import { useRecoilValue } from 'recoil';

import {
    useMediaQuery,
    useTheme,
} from "@mui/material";

export default function CustomContainer({ children, style }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const flexDirection = isMobile ? 'column': 'row';
    const justifyContent = isMobile ? 'flex-start' : 'space-around';
    const alignItems = isMobile ? 'center' : 'flex-start';

    return (
        <ThemeProvider theme={ContainerTheme}>
            <CssBaseline />
            <Container
                maxWidth={false} // maxWidth를 false로 설정하여 기본 마진을 제거
                disableGutters // 기본 패딩을 제거
                style={{
                    width: '100%',
                    height: '100%',
                    padding: '4px',
                    marginTop: '0px',
                    display: 'flex',
                    flexDirection: flexDirection,
                    justifyContent: justifyContent,
                    alignItems: alignItems,
                    minHeight: '100%',
                    ...style
                }}
            >
                {children}
            </Container>
        </ThemeProvider>
    );
}
