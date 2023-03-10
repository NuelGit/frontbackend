import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyC21iFbJQmGyQYd8U1Xb9vcf-ardXR0pXQ",
  authDomain: "reactblog-19429.firebaseapp.com",
  projectId: "reactblog-19429",
  storageBucket: "reactblog-19429.appspot.com",
  messagingSenderId: "522317862511",
  appId: "1:522317862511:web:5f323a98c1489fc0121f9a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


