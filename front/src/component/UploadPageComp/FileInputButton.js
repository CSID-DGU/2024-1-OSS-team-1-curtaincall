import React, {useState} from 'react';
import {Box, Button, styled, ThemeProvider} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {FIBTheme} from "./Theme/FIBTheme";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const FileInputButton = ({ onChange }) => {
    const [fileList, setFileList] = useState([]);

    const handleFileChange = (event) => {
        setFileList(Array.from(event.target.files));
    };

    return (
        <ThemeProvider theme={FIBTheme}>
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
        >
            Upload file
            <VisuallyHiddenInput type="file" multiple onChange={handleFileChange}/>
        </Button>
            <Box id="fileList">
                {fileList.map((file, index) => (
                    <Box key={index}>{file.name}</Box>
                ))}
            </Box>
        </ThemeProvider>
    );
};

export default FileInputButton;