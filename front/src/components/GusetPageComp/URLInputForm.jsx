import React from 'react';
import { TextField, ThemeProvider } from '@mui/material';
import { InputFormTheme } from '../.PublicTheme/InputForm'
import Form from 'react-bootstrap/Form';

function URLInputForm({ url, onUrlChange, placeholder }) {
    return (
        <ThemeProvider theme={InputFormTheme}>
            <div className="emailInputWrapper" style={{ width: '100%', display: 'flex', justifyContent: 'self-start', flexDirection: 'column', alignItems: 'self-start' }}>
            <Form.Label htmlFor="inputPassword5" style={{fontFamily: 'Playfair Display'}}>{placeholder}</Form.Label>
            <Form.Control
                type="input"
                id="inputPassword5"
                onChange={(e) => onUrlChange(e.target.value)}
                aria-describedby="passwordHelpBlock"
            />
            </div>
            { <Form.Text id="passwordHelpBlock" muted>
                호스트에게 무대 아이디를 요청하세요. 입력하여 무대에 참여할 수 있습니다.
            </Form.Text> }
        </ThemeProvider>
    );
}

export default URLInputForm;