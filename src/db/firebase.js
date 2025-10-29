// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBTGHXXsekuTTlNm7pnnbCwkrDLK2VDkQ",
  authDomain: "playroom-a8d5a.firebaseapp.com",
  projectId: "playroom-a8d5a",
  storageBucket: "playroom-a8d5a.appspot.com", // ✅ fixed here
  messagingSenderId: "237198485447",
  appId: "1:237198485447:web:75e0761720d3dfec26dbe2",
  measurementId: "G-9T7B4RZR5R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const analytics = getAnalytics(app);
export const db = getFirestore(app); // ✅ export Firestore for use elsewhere
