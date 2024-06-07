import React, { useState } from 'react';
import { Box, Button, styled, ThemeProvider } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ButtonTheme } from '../.PublicTheme/ButtonTheme';

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
        const filesArray = Array.from(event.target.files);
        const renamedFiles = filesArray.map((file, index) => {
            const newFileName = `${index + 1}${file.name.substring(file.name.lastIndexOf('.'))}`;
            return new File([file], newFileName, { type: file.type });
        });
        setFileList(renamedFiles);
        onChange(renamedFiles); // onChange prop을 통해 부모 컴포넌트에 변경된 파일 목록 전달
    };

    return (
        <ThemeProvider theme={ButtonTheme}>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{
                    backgroundColor: '#F5F5F5',
                    color: '#7D7D7D',
                    '&:hover': {
                        backgroundColor: '#F5F5F5'
                    }
                }}
            >
                사진 선택
                <VisuallyHiddenInput type="file" multiple onChange={handleFileChange} />
            </Button>
            <Box id="fileList">
                {fileList.length > 0 && (
                    <Box>{fileList.length} 장의 사진 업로드</Box>
                )}
            </Box>
        </ThemeProvider>
    );
};

export default FileInputButton;
