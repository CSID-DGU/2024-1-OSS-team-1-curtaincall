import React from 'react';
import { TextField, ThemeProvider, Box } from '@mui/material';
import { InputFormMiniTheme } from '../.PublicTheme/InputFormMini'
import {InputFormTheme} from "../.PublicTheme/InputForm";
import Form from "react-bootstrap/Form";
import {motion} from "framer-motion";

function PasswordInputFormMini({ password, onPasswordChange, placeholder }) {
    const buttonVariants = {
        initial: {
            opacity: 0,
            y: 20,
        },
        in: {
            opacity: 1,
            y: 0,
        },
        out: {
            opacity: 0,
            y: -20,
        },
    };

    const buttonTransition = (delay = 0) => ({
        type: 'tween',
        ease: 'anticipate',
        duration: 0.8,
        delay: delay,
    });
    return (
        <ThemeProvider theme={InputFormTheme}>
            <div className="emailInputWrapper" style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'self-start',
                flexDirection: 'column',
                alignItems: 'self-start'
            }}>
                <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={buttonVariants}
                    transition={buttonTransition(0.8)}
                    style={{width: '100%'}}
                >
                    <Form.Label htmlFor="inputPassword5" style={{fontFamily: 'RIDIBatang'}}>{placeholder}</Form.Label>
                </motion.div>
                <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={buttonVariants}
                    transition={buttonTransition(1)}
                    style={{width: '100%'}}
                >
                    <Form.Control
                        type="password"
                        id="inputPassword5"
                        onChange={(e) => onPasswordChange(e.target.value)}
                        aria-describedby="passwordHelpBlock"
                    />
                </motion.div>
            </div>
            {/* <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, contain letters and numbers,
                and must not contain spaces, special characters, or emoji.
            </Form.Text> */}
        </ThemeProvider>
    );
}

export default PasswordInputFormMini;
