// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPwXxc1eF7d3gkkgtPy_p4RS3nwkMXp_A",
  authDomain: "devclan-258f9.firebaseapp.com",
  projectId: "devclan-258f9",
  storageBucket: "devclan-258f9.appspot.com",
  messagingSenderId: "672461800328",
  appId: "1:672461800328:web:0efb08036e7ed6656db03d",
  measurementId: "G-S6SJRY4DT6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth =  getAuth()