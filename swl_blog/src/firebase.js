// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYyLQmViBCEK6JfnJ8kLEqhNTAXGzkfLE",
  authDomain: "swl-blog.firebaseapp.com",
  projectId: "swl-blog",
  storageBucket: "swl-blog.appspot.com",
  messagingSenderId: "1041417769611",
  appId: "1:1041417769611:web:038e0d55a3113fd9c3fa8e",
  measurementId: "G-XDG99ZSH38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
