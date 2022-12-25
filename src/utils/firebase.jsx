// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAHNoFJPuJl25Epm1Gl-STt9oDIVRt5Tns",
  authDomain: "chat-react-961f3.firebaseapp.com",
  projectId: "chat-react-961f3",
  storageBucket: "chat-react-961f3.appspot.com",
  messagingSenderId: "295807445739",
  appId: "1:295807445739:web:6875290bada486dd46ecae",
  measurementId: "G-JLYZ9083BR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);