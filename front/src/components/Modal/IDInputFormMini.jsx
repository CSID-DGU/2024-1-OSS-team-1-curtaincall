import React, {useState} from 'react';
import { TextField, ThemeProvider, Box, Link } from '@mui/material';
import { InputFormMiniTheme } from '../.PublicTheme/InputFormMini';
import { InputFormTheme } from "../.PublicTheme/InputForm";
import Form from "react-bootstrap/Form";
import {useRecoilValue} from "recoil";
import {isModalNameState} from "../../atom/atom";

function IDInputFormMini({ username, onUsernameChange, placeholder, onLinkClick }) {
    const isModalName = useRecoilValue(isModalNameState);
    const isLinkDisabled = isModalName;
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
                    닉네임 수정
                </Link>
            </div>
            <Form.Control
                type="input"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                onChange={(e) => onUsernameChange(e.target.value)}
                style={{ width: '100%' }}
            />
        </ThemeProvider>
    );
}

export default IDInputFormMini;
