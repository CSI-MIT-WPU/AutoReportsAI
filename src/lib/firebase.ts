// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiZO9KugnDlY_QqNsaRPgePUkuS5dg7Ks",
  authDomain: "autoreportsai-f6610.firebaseapp.com",
  projectId: "autoreportsai-f6610",
  storageBucket: "autoreportsai-f6610.appspot.com",
  messagingSenderId: "104492755630",
  appId: "1:104492755630:web:7d9263aa3d86fcde1b9b3f",
  measurementId: "G-K4JM1P17WB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
