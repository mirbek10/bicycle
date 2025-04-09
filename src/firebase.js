import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDEm8Ksy0_-gPBYiC5NfCdV_CkEutiyTyo",
  authDomain: "bicycle-2025.firebaseapp.com",
  projectId: "bicycle-2025",
  storageBucket: "bicycle-2025.firebasestorage.app",
  messagingSenderId: "715950718279",
  appId: "1:715950718279:web:4a2ca48ea62755378f6062",
  measurementId: "G-DWB00NCMME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);