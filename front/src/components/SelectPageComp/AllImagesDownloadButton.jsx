import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Button, ThemeProvider, createTheme, CircularProgress } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { ButtonTheme } from '../.PublicTheme/ButtonTheme';


const AllImagesDownloadButton = ({ children, images }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        const zip = new JSZip();
        const imgFolder = zip.folder("images");

        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const response = await fetch(image.src);
            const blob = await response.blob();
            imgFolder.file(`image${i + 1}.jpg`, blob);
        }

        zip.generateAsync({ type: "blob" }).then((content) => {
            saveAs(content, "images.zip");
        });
    };

    return (
        <ThemeProvider theme={ButtonTheme}>
        <Button
            //variant="contained"
            onClick={handleClick}
            disabled={loading}
            sx={{
                backgroundColor: loading ? '#bfbfbf' : '#7f7f7f', // 로딩 상태에 따른 배경색 변경
                color: 'white',
                '&:hover': {
                    backgroundColor: loading ? '#bfbfbf' : '#bfbfbf' // 호버 상태에서의 배경색
                }
            }}
        >
            {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : children}
        </Button>
        </ThemeProvider>
    );
};

export default AllImagesDownloadButton;

