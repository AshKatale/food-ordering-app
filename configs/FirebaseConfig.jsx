// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVMEMKC89EYPzWXRqUnkepYFrm4DLTNqo",
  authDomain: "food-app-9d3a3.firebaseapp.com",
  projectId: "food-app-9d3a3",
  storageBucket: "food-app-9d3a3.firebasestorage.app",
  messagingSenderId: "820262335966",
  appId: "1:820262335966:web:3f430df2da0e2638d4194f",
  measurementId: "G-SMCQNGGJ63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);