import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RecoilRoot} from "recoil";

const clientId = '614742490862-7dharreoq95g6culheb963uoum3upk1c.apps.googleusercontent.com';
//구글 개발자 콘솔에서 받은 클라이언트 아이디

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
