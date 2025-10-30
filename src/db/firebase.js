// firebase.js

// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// ✅ Use environment variables properly
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "playroom-a8d5a.firebaseapp.com",
  projectId: "playroom-a8d5a",
  storageBucket: "playroom-a8d5a.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: "G-9T7B4RZR5R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics safely (won’t break in SSR / Node)
let analytics = null;
isSupported().then((yes) => {
  if (yes) analytics = getAnalytics(app);
});

export { analytics };
