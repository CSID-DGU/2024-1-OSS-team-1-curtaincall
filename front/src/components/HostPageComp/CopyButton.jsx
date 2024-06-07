import React, { useState } from 'react';
import { CircularProgress, Link, styled, ThemeProvider } from '@mui/material';
import { ButtonTheme } from '../.PublicTheme/ButtonTheme';
import { stageState } from "../../atom/atom";
import { useRecoilValue } from "recoil";

const StyledLink = styled(Link)(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
    ...theme.typography.button,
    ...theme.components.MuiButton.styleOverrides.root,
    backgroundColor: '#7f7f7f',
    color: 'white',
    '&:hover': {
        backgroundColor: '#bfbfbf',
    },
    '&[disabled]': {
        backgroundColor: '#bfbfbf',
        cursor: 'not-allowed',
    },
}));

const CopyButton = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const stageId = useRecoilValue(stageState);

    const copyToClipboard = async (e) => {
        e.preventDefault(); // Prevent default link behavior
        setLoading(true);
        setTimeout(async () => {
            try {
                await navigator.clipboard.writeText(stageId);
                alert('URL이 클립보드에 복사되었습니다!');
            } catch (err) {
                console.error('복사 실패: ', err);
            }
            setLoading(false);
        }, 500); // 500ms delay
    };

    return (
        <ThemeProvider theme={ButtonTheme}>
            <StyledLink
                href="#"
                onClick={copyToClipboard}
                disabled={loading ? 'disabled' : undefined}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : children}
            </StyledLink>
        </ThemeProvider>
    );
};

export default CopyButton;
