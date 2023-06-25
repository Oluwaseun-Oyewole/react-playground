// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnkqZsoqBZJQXLOZuYuYEcdxaXW1c8p08",
  authDomain: "react-playground-e8d63.firebaseapp.com",
  projectId: "react-playground-e8d63",
  storageBucket: "react-playground-e8d63.appspot.com",
  messagingSenderId: "142739212521",
  appId: "1:142739212521:web:ce115b3c8a2d3e6406c878",
  measurementId: "G-NGRF57XRBM",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
