// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBTGHXXsekuTTlNm7pnnbCwkrDLK2VDkQ",
  authDomain: "playroom-a8d5a.firebaseapp.com",
  projectId: "playroom-a8d5a",
  storageBucket: "playroom-a8d5a.firebasestorage.app",
  messagingSenderId: "237198485447",
  appId: "1:237198485447:web:75e0761720d3dfec26dbe2",
  measurementId: "G-9T7B4RZR5R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);