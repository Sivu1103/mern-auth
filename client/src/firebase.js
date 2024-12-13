// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-auth-b6871.firebaseapp.com",
  projectId: "mern-auth-b6871",
  storageBucket: "mern-auth-b6871.firebasestorage.app",
  messagingSenderId: "743932223732",
  appId: "1:743932223732:web:b79e2ae32da27c549a3ea1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

