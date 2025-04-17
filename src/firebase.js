import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDU5yIcJKCfWg8LZsBhXoMjtoupD5dxcOQ",
  authDomain: "bicycle-c4115.firebaseapp.com",
  projectId: "bicycle-c4115",
  storageBucket: "bicycle-c4115.firebasestorage.app",
  messagingSenderId: "215313328692",
  appId: "1:215313328692:web:c276936326ebd014113861",
  measurementId: "G-8RTNN9E128"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);