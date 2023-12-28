// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBI6dyNTOpvm_xC1UlbVBqI3XGNbBxDXk",
  authDomain: "intralink-df655.firebaseapp.com",
  projectId: "intralink-df655",
  storageBucket: "intralink-df655.appspot.com",
  messagingSenderId: "548190806570",
  appId: "1:548190806570:web:053b19b2b53b34c3299953",
  measurementId: "G-NVM36YKHL4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
