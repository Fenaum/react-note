import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrGrZI4yqfUD8xy7eaSVxFUdnyQZE5lsk",
  authDomain: "react-note-4b55a.firebaseapp.com",
  projectId: "react-note-4b55a",
  storageBucket: "react-note-4b55a.appspot.com",
  messagingSenderId: "982610042783",
  appId: "1:982610042783:web:165ee6d282a0afa77727aa",
  measurementId: "G-WENZS3YJV9",
};

const app = initializeApp(firebaseConfig);
export const db =  getFirestore(app);
export const notescollection = collection(db, "notes");
