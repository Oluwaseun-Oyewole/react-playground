import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
export const db = getFirestore(app);

// SELECT * FROM Users WHERE UID = 1
// const rootRef = firebase.database().ref();
// const oneRef = rootRef.child("users").child("1");
// users:{
//   "1":{
//     "name":"Seun",
//     "eaml":"ghjkl;"
//   }
// }

// SELECT * FROM Users WHERE email = ""
// const rootRef = firebase.database().ref();
// const emailRef = rootRef
//   .child("Users")
//   .orderByChild("email")
//   .equalTo("findseunoyewole@gmail.");

// // SELECT * FROM Users LIMIT 10
// const limitRef = rootRef.child("Users").orderByKey().limitToFirst(10);

// // SELECT * FROM Users WHERE Name LIKE "D%"
// const nameREf = rootRef
//   .child("Users")
//   .orderByChild("name")
//   .startAt("D")
//   .endAt("D\uf8ff");

// // SELECT * FROM Users WHERE Age < 50
// const ageLessThanRef = rootRef.child("Users").orderByChild("Age").endAt(49);

// // SELECT * FROM Users WHERE Age < 50
// const ageGreaterThanRef = rootRef
//   .child("Users")
//   .orderByChild("Age")
//   .startAt(51);

// const ageRange = rootRef
//   .child("Users")
//   .orderByChild("Age")
//   .startAt(20)
//   .endAt(101);

// const userAgeRef = rootRef.child("Users").orderByChild("Age").equalTo(20);
