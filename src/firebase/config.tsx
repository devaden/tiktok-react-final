// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtvclc2P9yvPSYY7_NT0UZz3ib6PcbuJQ",
  authDomain: "tiktok-connector.firebaseapp.com",
  projectId: "tiktok-connector",
  storageBucket: "tiktok-connector.appspot.com",
  messagingSenderId: "894659552254",
  appId: "1:894659552254:web:0fce76e472dcf18cff96af",
  measurementId: "G-ZRDZW1867K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



export default {
    db,
    app
}