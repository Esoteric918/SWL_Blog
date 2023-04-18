// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";


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
  measurementId: "G-XDG99ZSH38",
  databaseURL: "https://swl-blog-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
// const analytics = getAnalytics(app);

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;
