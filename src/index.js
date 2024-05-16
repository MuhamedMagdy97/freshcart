import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.min.css'
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import UserContextProvider from './Context/UserContext.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>
);


reportWebVitals();
