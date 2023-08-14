import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqOGlX23GC-mM-LWpwTGzU4Zn1tx015PQ",
  authDomain: "real-time-chat-app-6b8ff.firebaseapp.com",
  projectId: "real-time-chat-app-6b8ff",
  storageBucket: "real-time-chat-app-6b8ff.appspot.com",
  messagingSenderId: "592682362271",
  appId: "1:592682362271:web:e23d4fe3fdf4e1479b09aa",
  measurementId: "G-1E7FSYX812"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
