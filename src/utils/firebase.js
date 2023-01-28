// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBo5KwT3KPdYeXEO7bLnO746oH4jYdWCGo",
  authDomain: "codenight-af49a.firebaseapp.com",
  projectId: "codenight-af49a",
  storageBucket: "codenight-af49a.appspot.com",
  messagingSenderId: "922785671021",
  appId: "1:922785671021:web:8a0dbaf3b65ae1eb34dc64",
  measurementId: "G-TK7HKX773Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore(app); 