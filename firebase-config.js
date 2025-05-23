// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABnIftBwih3DbrVhrnpMMnMw1pqlB0_So",
  authDomain: "customer-management-d9ad8.firebaseapp.com",
  projectId: "customer-management-d9ad8",
  storageBucket: "customer-management-d9ad8.firebasestorage.app",
  messagingSenderId: "389287597627",
  appId: "1:389287597627:web:1dee8e121fb0fa3883ee1e",
  measurementId: "G-E3VYSVMFJ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);