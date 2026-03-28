import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 🔥 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCHFmvqDUoMmKRFEa3lECK8iVFUydPLDCc",
  authDomain: "campus-connect-baadd.firebaseapp.com",
  projectId: "campus-connect-baadd",
  storageBucket: "campus-connect-baadd.firebasestorage.app",
  messagingSenderId: "882807626383",
  appId: "1:882807626383:web:ef6b6e7178242a0ad92efa"
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔥 Initialize Firestore (for chat system)
const db = getFirestore(app);

// ✅ Export both
export { app, db };