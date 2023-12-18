import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/carousel/styles.css';// Import the UserProvider


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MantineProvider>
        <App />
    </MantineProvider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


