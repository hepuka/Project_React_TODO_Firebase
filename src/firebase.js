import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCMlMwx8FNZjzKPmdItXSlxjByVCITP3hY",
  authDomain: "todo-df925.firebaseapp.com",
  projectId: "todo-df925",
  storageBucket: "todo-df925.firebasestorage.app",
  messagingSenderId: "453118726444",
  appId: "1:453118726444:web:07cba940d7f23b38a1dc89",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
