// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// console.log(import.meta.VITE_FIREBASE_API_KEY);
// possess.env not accesable need to fix***

const firebaseConfig = {
  apiKey: "AIzaSyCcD9ae7CoMgW57CdKrmhHuIzIx5fwKxR0",
  authDomain: "byteblog-63314.firebaseapp.com",
  projectId: "byteblog-63314",
  storageBucket: "byteblog-63314.firebasestorage.app",
  messagingSenderId: "275852648340",
  appId: "1:275852648340:web:f9eb89f92cf91655d9f981"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);