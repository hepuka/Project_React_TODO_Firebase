// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATgN7sjJBEusAayECSilD9gWB3JxyK0ac",
  authDomain: "todo-c6474.firebaseapp.com",
  projectId: "todo-c6474",
  storageBucket: "todo-c6474.appspot.com",
  messagingSenderId: "786873635699",
  appId: "1:786873635699:web:72cab7b231b01cc3a3ab06",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
