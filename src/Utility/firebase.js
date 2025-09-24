// Import Firebase core and modules
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyABhgkloQVi6pFs2KKoa7cdDv7s72_h3Sk",
  authDomain: "clone-8a6dc.firebaseapp.com",
  projectId: "clone-8a6dc",
  storageBucket: "clone-8a6dc.appspot.com", // corrected domain
  messagingSenderId: "343893497123",
  appId: "1:343893497123:web:2dea64803f402658cc2896",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Export auth and firestore
export const auth = firebase.auth();
export const db = firebase.firestore();
