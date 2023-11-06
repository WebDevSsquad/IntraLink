// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-m1vrM2vSZPtYsrwu2xouPRBoxkS3AWo",
  authDomain: "resumeness-e562e.firebaseapp.com",
  projectId: "resumeness-e562e",
  storageBucket: "resumeness-e562e.appspot.com",
  messagingSenderId: "146298282390",
  appId: "1:146298282390:web:7d7f1af013ac4eb07f3db7",
  measurementId: "G-D2YQJ0M6Q8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
