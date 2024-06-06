import React from 'react';
import { TextField, ThemeProvider, Box, Link } from '@mui/material';
import { InputFormMiniTheme } from '../.PublicTheme/InputFormMini';
import { InputFormTheme } from "../.PublicTheme/InputForm";
import Form from "react-bootstrap/Form";
import {isModalPWState} from "../../atom/atom";
import {useRecoilValue} from "recoil";

function PasswordInputFormMini({ password, onPasswordChange, placeholder, onLinkClick }) {
    const isModalPW = useRecoilValue(isModalPWState);
    const isLinkDisabled = !isModalPW;
    return (
        <ThemeProvider theme={InputFormTheme}>
            <div className="emailInputWrapper" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Form.Label htmlFor="inputPassword5" style={{ fontFamily: 'RIDIBatang', marginBottom: 0 }}>
                    {placeholder}
                </Form.Label>
                <Link
                    component="button"
                    variant="body2"
                    onClick={!isLinkDisabled ? onLinkClick : null}
                    sx={{
                        textDecoration: 'underline',
                        color: isLinkDisabled ? 'gray' : 'black',
                        fontFamily: 'RIDIBatang',
                        cursor: isLinkDisabled ? 'not-allowed' : 'pointer',
                        marginLeft: 'auto',
                        pointerEvents: isLinkDisabled ? 'none' : 'auto'
                    }}
                >
                    비밀번호 수정
                </Link>
            </div>
            <Form.Control
                type="password"
                id="inputPassword5"
                onChange={(e) => onPasswordChange(e.target.value)}
                aria-describedby="passwordHelpBlock"
            />
        </ThemeProvider>
    );
}

export default PasswordInputFormMini;
