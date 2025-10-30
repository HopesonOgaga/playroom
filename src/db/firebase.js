// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIRE_BASE_TOKEN,
  authDomain: "playroom-a8d5a.firebaseapp.com",
  projectId: "playroom-a8d5a",
  storageBucket: "playroom-a8d5a.appspot.com", // ✅ fixed here
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: "G-9T7B4RZR5R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const analytics = getAnalytics(app);
export const db = getFirestore(app); // ✅ export Firestore for use elsewhere
