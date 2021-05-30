import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyALVxYWapT_dZJ43k9YabUSB7QMj4_Q6a0",
  authDomain: "cart-b07e4.firebaseapp.com",
  projectId: "cart-b07e4",
  storageBucket: "cart-b07e4.appspot.com",
  messagingSenderId: "299389496738",
  appId: "1:299389496738:web:b5457e334bd20f5abfd6fb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

