import React from 'react';
import { Box, Typography, keyframes } from "@mui/material";

const fadeInOut = keyframes`
    0% { opacity: 0; }
    40% { opacity: 1; }
    60% { opacity: 1; }
    100% { opacity: 0; }
`;

const LogoBlink = ({ step, fontSize, color = '#7f7f7f' }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {step === 0 && (
                <>
                    <Typography sx={{
                        animation: `${fadeInOut} 2s linear`,
                        color: color,
                        fontFamily: 'Playfair Display',
                        fontSize: fontSize
                    }}>
                        C
                    </Typography>
                    <Typography sx={{
                        opacity: 0,
                        color: color,
                        fontFamily: 'Playfair Display',
                        fontSize: fontSize
                    }}>
                        C
                    </Typography>
                </>
            )}
            {step === 1 && (
                <>
                    <Typography sx={{
                        opacity: 0,
                        color: color,
                        fontFamily: 'Playfair Display',
                        fontSize: fontSize
                    }}>
                        C
                    </Typography>
                    <Typography sx={{
                        animation: `${fadeInOut} 2s linear`,
                        color: color,
                        fontFamily: 'Playfair Display',
                        fontSize: fontSize
                    }}>
                        C
                    </Typography>
                </>
            )}
            {step === 2 && (
                <>
                    <Typography sx={{
                        animation: `${fadeInOut} 2s linear`,
                        color: color,
                        fontFamily: 'Playfair Display',
                        fontSize: fontSize
                    }}>
                        C
                    </Typography>
                    <Typography sx={{
                        animation: `${fadeInOut} 2s linear`,
                        color: color,
                        fontFamily: 'Playfair Display',
                        fontSize: fontSize
                    }}>
                        C
                    </Typography>
                </>
            )}
        </Box>
    );
};

export default LogoBlink;
