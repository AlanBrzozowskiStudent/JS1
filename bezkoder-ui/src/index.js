import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

// Ustawienie globalne URL bazowego dla Axios
axios.defaults.baseURL = 'http://localhost:6868';

// Włączenie wysyłania ciasteczek z każdym żądaniem
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
