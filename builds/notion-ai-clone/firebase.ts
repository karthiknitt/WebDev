// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "notion-clone-ai.firebaseapp.com",
  projectId: "notion-clone-ai",
  storageBucket: "notion-clone-ai.appspot.com",
  messagingSenderId: "222033160897",
  appId: "1:222033160897:web:163b42adaefd8ee17ec240",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
