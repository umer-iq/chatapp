import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyA_4s7h33evXQKfixOgbfPlnXuNb4CTDIk",
  authDomain: "chat-3faa1.firebaseapp.com",
  projectId: "chat-3faa1",
  storageBucket: "chat-3faa1.appspot.com",
  messagingSenderId: "450620685101",
  appId: "1:450620685101:web:ca88fddf2c6f63d0fb31a4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();