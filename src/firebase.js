import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHFmvqDUoMmKRFEA3lECK8iVFUydPLDCc",
  authDomain: "campus-connect-baadd.firebaseapp.com",
  projectId: "campus-connect-baadd",
  storageBucket: "campus-connect-baadd.appspot.com",
  messagingSenderId: "882807626383",
  appId: "1:882807626383:web:ef6b6e7178242a0ad92efa"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);