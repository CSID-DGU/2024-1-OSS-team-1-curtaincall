import React, { useState } from 'react';
import { CircularProgress, Link, styled, ThemeProvider } from '@mui/material';
import { ButtonTheme } from '../.PublicTheme/ButtonTheme';
import { stageState } from "../../atom/atom";
import { useRecoilValue } from "recoil";

const StyledLink = styled('a')(({ theme, disabled }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    ...theme.typography.button,
    ...theme.components.MuiButton.styleOverrides.root,
    backgroundColor: disabled ? '#E3E3E3' : '#F5F5F5',
    color: '#7D7D7D',
    '&:hover': {
        backgroundColor: disabled ? '#E3E3E3' : '#F5F5F5',
    },
}));

const CopyButton = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const stageId = useRecoilValue(stageState);

    const copyToClipboard = async (e) => {
        e.preventDefault(); // Prevent default link behavior
        if (!loading) {
            setLoading(true);
            setTimeout(async () => {
                try {
                    await navigator.clipboard.writeText(stageId);
                    alert('URL이 클립보드에 복사되었습니다!');
                } catch (err) {
                    fallbackCopyTextToClipboard(stageId);
                }
                setLoading(false);
            }, 500); // 500ms delay
        }
    };

    const fallbackCopyTextToClipboard = (text) => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            alert('URL이 클립보드에 복사되었습니다!');
        } catch (err) {
            alert('복사 실패: ' + err.message);
        }

        document.body.removeChild(textArea);
    };

    return (
        <ThemeProvider theme={ButtonTheme}>
            <StyledLink
                href="#"
                onClick={copyToClipboard}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : children}
            </StyledLink>
        </ThemeProvider>
    );
};

export default CopyButton;
