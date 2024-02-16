import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtJtRuo1SxWgTAFES55lm85dBGs-a7iNU",
  authDomain: "chat-application-ada0d.firebaseapp.com",
  projectId: "chat-application-ada0d",
  storageBucket: "chat-application-ada0d.appspot.com",
  messagingSenderId: "1061734872601",
  appId: "1:1061734872601:web:ba17f56696eb80a6921c88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // pass the Firebase app instance to getAuth
const firestore = getFirestore(app); // pass the Firebase app instance to getFirestore
const storage = getStorage(app); // pass the Firebase app instance to getStorage

const db = firestore; // Use firestore as the database reference

export { app, auth, firestore, storage, db };
