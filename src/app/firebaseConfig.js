// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7xiUWV0lHc0bgOo1QvUZeysQYyUv1_j4",
  authDomain: "perpus-kanesa.firebaseapp.com",
  projectId: "perpus-kanesa",
  storageBucket: "perpus-kanesa.appspot.com",
  messagingSenderId: "818245032696",
  appId: "1:818245032696:web:0ea0acfb384e5d6fa0b90d",
  measurementId: "G-6P8XXT0E2K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FIRESTORE = getFirestore(app);