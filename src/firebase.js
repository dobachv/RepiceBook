// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUJlItYrU6VjRXHtzOk9RG4elEn32FJzA",
  authDomain: "recipe-16c12.firebaseapp.com",
  projectId: "recipe-16c12",
  storageBucket: "recipe-16c12.firebasestorage.app",
  messagingSenderId: "428976553215",
  appId: "1:428976553215:web:e9f828d7aebe0c17efa0ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export  const db = getFirestore(app);


