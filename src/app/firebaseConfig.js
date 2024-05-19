// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHOJOboA2snlb4Z0wSCnP4lQK-048eXvk",
  authDomain: "etnochem-696d8.firebaseapp.com",
  projectId: "etnochem-696d8",
  storageBucket: "etnochem-696d8.appspot.com",
  messagingSenderId: "1005146496821",
  appId: "1:1005146496821:web:8f3a13a6446e991e96f67c",
  measurementId: "G-NHQMHNT6EV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FIRESTORE = getFirestore(app);