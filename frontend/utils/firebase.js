// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "loginailms-528f0.firebaseapp.com",
  projectId: "loginailms-528f0",
  storageBucket: "loginailms-528f0.firebasestorage.app",
  messagingSenderId: "587592506046",
  appId: "1:587592506046:web:4361babb88924a28ea1cef",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider} 