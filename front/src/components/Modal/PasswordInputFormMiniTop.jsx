import React from 'react';
import { TextField, ThemeProvider, Box, Link } from '@mui/material';
import { InputFormMiniTheme } from '../.PublicTheme/InputFormMini';
import { InputFormTheme } from "../.PublicTheme/InputForm";
import Form from "react-bootstrap/Form";
import {isModalPWState} from "../../atom/atom";
import {useRecoilValue} from "recoil";
import {motion} from "framer-motion";

function PasswordInputFormMini({ password, onPasswordChange, placeholder, onLinkClick }) {
    const isModalPW = useRecoilValue(isModalPWState);
    const isLinkDisabled = !isModalPW;
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
            <div className="emailInputWrapper"
                 style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={buttonVariants}
                    transition={buttonTransition(0.2)}
                >
                    <Form.Label htmlFor="inputPassword5" style={{fontFamily: 'RIDIBatang', marginBottom: 0}}>
                        {placeholder}
                    </Form.Label>
                </motion.div>
                <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={buttonVariants}
                    transition={buttonTransition(0.4)}
                >
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
                </motion.div>
            </div>
            <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={buttonVariants}
                transition={buttonTransition(0.6)}
                style={{width: '100%'}}
            >
                <Form.Control
                    type="password"
                    id="inputPassword5"
                    onChange={(e) => onPasswordChange(e.target.value)}
                    aria-describedby="passwordHelpBlock"
                />
            </motion.div>
        </ThemeProvider>
);
}

export default PasswordInputFormMini;
